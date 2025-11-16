"use client";
import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { useSession } from "next-auth/react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import { CarItem, BookingItem } from "interfaces";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";
import getCar from "@/libs/getCar";
import getRent from "@/libs/getRent";
import getRentsForCar from "@/libs/getRentsForCar";
import { useRouter } from "next/navigation";
import changeRentDate from "@/libs/changeRentDate";
import "./calendar.css";
import { FaCheck } from "react-icons/fa";

export default function ChangeDatePage({
  params,
}: {
  params: { cid: string; bid: string };
}) {
  const router = useRouter();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [formStartDate, setFormStartDate] = useState<dayjs.Dayjs | null>(null);
  const [formEndDate, setFormEndDate] = useState<dayjs.Dayjs | null>(null);
  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [previousRentDates, setPreviousRentDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [renderErrorMessage, setRenderErrorMessage] = useState("");
  const { data: session } = useSession();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [rentItem, setRentItem] = useState<BookingItem | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRentsForCar = async () => {
      try {
        if (!session?.user.token) return;
        const rentJson = await getRentsForCar(session?.user.token, params.cid);
        const unavailableDates = rentJson.data.flatMap(
          (rentItem: BookingItem) => {
            const startDate = new Date(rentItem.startDate);
            const endDate = new Date(rentItem.endDate);
            const dates = [];
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
          }
        );
        setRentedDates(unavailableDates);
      } catch (error) {
        console.error("Failed to fetch rents:", error);
      }
    };

    const fetchRentData = async () => {
      try {
        if (!session?.user.token) return;
        const rentData = await getRent(session.user.token, params.bid);
        setRentItem(rentData.data);
        if (!rentData.success || params.cid !== rentData.data.car_info._id) {
          setRenderErrorMessage("Incorrect URL/Access Denied");
          return;
        }
        if (rentData.data.status === "Finished") {
          setRenderErrorMessage("Do not Change Date of the Finished Renting");
          return;
        }
        if (
          session.user.User_info.role !== "admin" &&
          rentData.data.user_info._id !== session.user.User_info._id
        ) {
          setRenderErrorMessage("Access Denied, You cannot edit this renting");
          return;
        }

        const start = new Date(rentData.data.startDate);
        const end = new Date(rentData.data.endDate);
        const previousDates = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
          previousDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setPreviousRentDates(previousDates);
        setStartDate(dayjs(rentData.data.startDate));
        setEndDate(dayjs(rentData.data.endDate));
      } catch (error) {
        console.error("Failed to fetch rent data:", error);
      }
    };

    fetchCar();
    fetchRentsForCar();
    fetchRentData();
  }, [params.cid, params.bid, session?.user.token]);

  useEffect(() => {
    if (formStartDate && formEndDate && carItem) {
      const days = formEndDate.diff(formStartDate, "day") + 1;
      const price = days * carItem.pricePerDay;
      setTotalPrice(price > 0 ? price : 0);
    } else {
      setTotalPrice(rentItem ? rentItem.totalPrice : 0);
    }
  }, [formStartDate, formEndDate, carItem]);

  const isDateUnavailable = (date: Date) =>
    rentedDates.some(
      (rentedDate) => rentedDate.toDateString() === date.toDateString()
    );

  const isPreviousRentDate = (date: Date) =>
    previousRentDates.some(
      (prevDate) => prevDate.toDateString() === date.toDateString()
    );

  const calculateDiscountedPrice = () => {
    if (!rentItem) return totalPrice;
    const discount = rentItem.discount || 0;
    const maxDiscount = rentItem.maxDiscount || 0;
    const rawDiscount = totalPrice * (discount / 100);
    const finalDiscount = Math.min(rawDiscount, maxDiscount);
    return totalPrice - finalDiscount;
  };

  const calculatePerDay = () => {
    if (!rentItem) return 0;
    const effectiveStart = formStartDate || startDate;
    const effectiveEnd = formEndDate || endDate;
    if (!effectiveStart || !effectiveEnd) return 0;
    const days = effectiveEnd.diff(effectiveStart, "day") + 1;
    if (days <= 0) return 0;
    return calculateDiscountedPrice() / days;
  };

  async function handleUpdateRent(startDate: string, endDate: string) {
    if (!session) return;
    if (startDate === "Invalid Date" || endDate === "Invalid Date") {
      setErrorMessage("You must fill a value for start date and end date");
      return;
    }
    const res = await changeRentDate(
      session.user.token,
      params.bid,
      startDate,
      endDate
    );
    if (res.success) {
      alert("Booking successfully updated");
      router.push("/booking");
    } else {
      setErrorMessage(res.message);
    }
  }

  if (loading)
    return <div className="text-center text-xl text-black p-4">Loading...</div>;
  if (!carItem)
    return (
      <div className="text-center text-xl text-black p-4">Car not found</div>
    );
  if (renderErrorMessage)
    return (
      <div className="text-center text-xl text-red-600 p-4">
        {renderErrorMessage}
      </div>
    );

  return (
    <main className="min-h-screen px-[5vw] py-10 font-robotoMono text-black">
      <div className="flex flex-row gap-20">
        <div className="ml-20">
          <h1 className="text-[45px] tracking-wider mb-4">{carItem.name}</h1>
          <div className="w-[457px] h-[468px] bg-gray-200 overflow-hidden">
            <Image
              src={carItem.picture}
              alt="Car"
              width={457}
              height={468}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="mx-auto">
          <h2 className="text-4xl font-bold my-4 text-center">
            Choose Rental Dates
          </h2>
          <h2 className="text-sm font-semibold mb-4 text-gray-800 text-center">
            Check The Calendar For This Car's Available Date. (Underlined Date
            Means Occupied, Green Means Previous Booking)
          </h2>
          <ReactCalendar
            className="text-black react-calendar"
            tileClassName={({ date }) => {
              if (isPreviousRentDate(date)) return "green-underline";
              if (isDateUnavailable(date)) return "red-underline";
              return "";
            }}
          />
        </div>
      </div>

      <div className="flex flex-row ml-20 gap-12 min-h-[320px] mt-10">
        <div className="w-1/2 max-w-md">
          <h2 className="text-[45px] tracking-wide mb-2">DESCRIPTION</h2>
          <p className="text-sm leading-5 text-black/80 whitespace-pre-line">
            {carItem.description}
          </p>
          <p className="mt-4 text-md font-bold">
            Total:&nbsp;
            {rentItem ? (
              <>
                <span className="text-gray-500 line-through text-xl mr-2">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="text-black font-normal text-2xl">
                  ${calculateDiscountedPrice().toFixed(2)}
                </span>
                <span className="text-sm text-gray-600 font-normal ml-2">
                  (${calculatePerDay().toFixed(2)}/day)
                </span>
              </>
            ) : (
              <>
                <span className="text-black font-normal text-2xl">
                  ${totalPrice}
                </span>
                <span className="text-sm text-gray-600 font-normal ml-2">
                  (${carItem.pricePerDay}/day)
                </span>
              </>
            )}
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          {session && (
            <div className="flex flex-col items-center w-full max-w-sm">
              <DateReserve
                onDateChange={(value) => setFormStartDate(value)}
                label="Check-In Date"
              />
              <DateReserve
                onDateChange={(value) => setFormEndDate(value)}
                label="Check-Out Date"
              />
              <div>
                {rentItem?.couponName === "No coupon applied" ||
                rentItem?.couponName === "No coupon selected" ? (
                  <div className="mt-3 w-[250px] border border-black text-black rounded-full py-1.5 px-6 text-center text-sm flex items-center justify-center gap-4">
                    {rentItem?.couponName}
                  </div>
                ) : (
                  <div className="mt-3 w-[275px] border border-black text-black rounded-full py-1.5 px-6 text-center text-sm flex items-center justify-center gap-4">
                    using {rentItem?.couponName} <FaCheck className="text-sm" />
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  handleUpdateRent(
                    dayjs(formStartDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString(),
                    dayjs(formEndDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString()
                  );
                }}
                className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition"
              >
                Update Booking
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
