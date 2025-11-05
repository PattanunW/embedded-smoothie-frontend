"use client";
import deleteRent from "@/libs/deleteRent";
import finishRent from "@/libs/finishRent";
import getRents from "@/libs/getRents";
import dayjs from "dayjs";
import { BookingItem, BookingJson, Rating } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getMyRatings from "@/libs/getMyRatings";

import AddReview from "@/components/AddReview";
import { dividerClasses } from "@mui/material";

export default function RentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [rentJson, setRentJson] = useState<BookingJson>({
    success: false,
    count: 0,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [userReviews, setUserReviews] = useState<Rating[]>([]);

  if (!session?.user.token) {
    return;
  }
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await getRents(session?.user.token);
        setRentJson(response);
      } catch (err) {
        setError("Could not fetch rents.");
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, [refresh]);
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await getMyRatings(session?.user.token);
        setUserReviews(res.data);
      } catch (err) {
        setError("Could not fetch rents.");
      }
    };

    fetchRatings();
  }, [refresh]);
  const reviewedRentIds = userReviews.map((r) => r.rent_info);

  const handleDelete = async (rentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmed) return;

    if (!session?.user.token) return;

    const res = await deleteRent(session.user.token, rentId);
    if (res.success) {
      alert("Deleted Booking Successfully");
      setRefresh((prev) => prev + 1);
    } else {
      setEditError(res.message);
    }
  };
  const handleFinish = async (rentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark as finished?"
    );
    if (!confirmed) return;
    if (!session.user.token) return;
    const res = await finishRent(session.user.token, rentId);
    if (res.success) {
      alert("Marked Renting as Finished Successfully");
      setRefresh((prev) => prev + 1);
    } else {
      setEditError(res.message);
    }
  };
  if (loading)
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        {error}
      </div>
    );

  return (
    <main className="p-6 min-h-screen font-robotoMono mt-10 bg-gray-100">
      <h1 className="text-4xl font-semibold text-gray-800 font-robotoMono text-center mb-6 mt-3">
        All Rent Booking History
      </h1>
      {session.user.User_info.role === "admin" ? (
        <div className="mb-8 text-center">
          <h2 className="text-lg text-black font-robotoMono mt-3">
            Manage and modify rental bookings for all users.
          </h2>
        </div>
      ) : (
        <div className="mb-8 text-center">
          <h2 className="text-lg text-black font-robotoMono mt-3">
            A user can have up to 3 active bookings.
          </h2>
        </div>
      )}
      <div className="max-w-4xl mx-auto font-robotoMono border border-black">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* booking section */}
          {rentJson?.data?.length === 0 ? (
            <div className="p-6 text-center text-gray-500 font-robotoMono">
              No rental history found.
            </div>
          ) : (
            <div className="divide-y divide-black">
              {rentJson?.data?.map((rentItem) => (
                <div key={rentItem._id} className="p-6 font-robotoMono">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-md font-semibold text-gray-700 font-robotoMono">
                        Renting ID:{" "}
                        <span className="text-gray-700 font-extrabold font-robotoMono text-xl">
                          {rentItem._id}
                        </span>
                      </div>
                      <div className="text-md text-gray-600 font-robotoMono">
                        Car:{" "}
                        <span className="text-gray-700 font-extrabold font-robotoMono text-xl">
                          {rentItem.car_info?.name}
                        </span>
                      </div>
                      <div className="text-md text-gray-600 font-robotoMono">
                        User:{" "}
                        <span className="text-gray-700 font-extrabold font-robotoMono text-xl">
                          {rentItem.user_info?.name}
                        </span>
                      </div>
                      {rentItem.discount > 0 ? (
                        <div className="text-md text-green-500 font-robotoMono">
                          Discount:{" "}
                          <span className="text-green-500 font-extrabold font-robotoMono text-xl">
                            {rentItem.discount}% (up to ${rentItem.maxDiscount})
                          </span>
                        </div>
                      ) : null}
                      {rentItem.status == "Confirmed" ? (
                        <div className="text-md text-blue-600 font-robotoMono">
                          Status:{" "}
                          <span className="text-blue-600 font-extrabold font-robotoMono text-xl">
                            Confirmed
                          </span>
                        </div>
                      ) : (
                        <div className="text-md text-green-600 font-robotoMono">
                          Status:{" "}
                          <span className="text-green-600 font-extrabold font-robotoMono text-xl">
                            Finished
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-gray-600 font-robotoMono">
                        Start Date:{" "}
                        <span className="text-black font-extrabold font-robotoMono">
                          {" "}
                          {rentItem.startDate?.split("T")[0]}
                        </span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        End Date:{" "}
                        <span className="text-black font-extrabold font-robotoMono">
                          {rentItem.endDate?.split("T")[0]}{" "}
                        </span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Status:{" "}
                        <span className="text-black font-extrabold font-robotoMono">
                          {rentItem.status}
                        </span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Daily Cost:{" "}
                        <span className="text-black font-extrabold font-robotoMono">
                          ${rentItem.car_info.pricePerDay}
                        </span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Confirmation Date:{" "}
                        <span className="text-black font-extrabold font-robotoMono">
                          {rentItem.iDate}
                        </span>
                      </div>
                      <br />
                      <div className="text-gray-600 text-xl font-bold font-robotoMono">
                        Total Day: {rentItem.totalDays}
                      </div>
                      <div className="text-gray-600 text-xl font-bold text-green-600 font-robotoMono">
                        Total Cost: ${rentItem.totalPrice}
                      </div>
                    </div>
                  </div>

                  {/* button section */}
                  <div className="flex flex-row justify-between font-robotoMono">
                    <div className="flex flex-row justify-start font-robotoMono">
                      {" "}
                      {session.user.User_info.role === "admin" &&
                      rentItem.status === "Confirmed" ? (
                        <div className="mt-4 flex justify-start font-robotoMono">
                          <button
                            onClick={() => handleFinish(rentItem._id)}
                            className="text-green-600 border border-green-600 px-5 py-2 rounded-full text-sm hover:bg-green-600 hover:text-white transition text-center"
                          >
                            Mark as Finished
                          </button>
                        </div>
                      ) : session.user.User_info.role === "user" &&
                        rentItem.status === "Finished" &&
                        !reviewedRentIds.includes(rentItem._id) ? (
                        <div className="mt-4 flex justify-end text-black font-robotoMono">
                          <div className="items-center font-robotoMono">
                            <AddReview
                              token={session?.user.token}
                              rentId={rentItem._id}
                              onSuccess={() => setRefresh((prev) => prev + 1)}
                            ></AddReview>
                          </div>
                        </div>
                      ) : rentItem.status !== "Confirmed" ? (
                        <div className="text-gray-500 font-robotoMono text-center">
                          You have already reviewed this booking.
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 flex justify-end items-center gap-2 font-robotoMono">
                      {rentItem.status === "Confirmed" && (
                        <button
                          onClick={() =>
                            router.push(
                              `/booking/${rentItem.car_info._id}/${rentItem._id}`
                            )
                          }
                          className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition text-center"
                        >
                          Change Date
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(rentItem._id)}
                        className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition text-center"
                      >
                        Delete
                      </button>
                    </div>
                    {editError && (
                      <div className="text-red-500 mt-2 font-robotoMono">
                        {editError}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
