"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";
import { CarItem } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import updateCar from "@/libs/updateCar";

export default function CarCidUpdatePage({
  params,
}: {
  params: { cid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  if (!session || session.user.User_info.role !== "admin") {
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        You are not an administrator. Access denied.
      </div>
    );
  }
  const [formData, setFormData] = useState({
    name: "",
    vin_plate: "",
    provider_info: "",
    picture: "",
    capacity: 1,
    description: "",
    pricePerDay: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "pricePerDay" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
        let extractedProviderID = carDetail;
        extractedProviderID.data.provider_info =
          carDetail.data.provider_info._id;
        setFormData(carDetail.data);
      } catch (err) {
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.cid]);

  const handleUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user.token) {
        return;
      }
      const res = await updateCar(
        session.user.token,
        params.cid,
        formData.name,
        formData.vin_plate,
        formData.provider_info,
        formData.picture,
        formData.capacity,
        formData.description,
        formData.pricePerDay
      );
      if (res.success) {
        alert("Updated car successfully");
        router.push(`/car/${params.cid}`);
      } else {
        setUpdateError(res.message);
      }
    } catch (err) {
      setUpdateError(
        "Failed to update the car. Check if provider id exist in database and/or VIN must be unique"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        {error}
      </div>
    );
  }

  if (!carItem) {
    return <div>No car details found.</div>;
  }

  return (
    <main className="text-center p-8 min-h-screen flex flex-col items-center mt-10">
      <div className="flex flex-col md:flex-row p-6 w-full max-w-3xl border border-black pl-[100px]">
        <Image
          src={carItem.picture}
          alt="Car Image"
          width={500}
          height={300}
          className="w-full md:w-1/2 object-cover"
        />
        <div className="mt-4 md:mt-0 flex flex-col items-start w-full p-2 justify-center ml-[100px] border-l border-black pl-[70px]">
          <div>
            <div className="text-lg font-medium text-gray-700 text-left">
              {carItem.description}
            </div>
            <div className="text-lg text-black font-robotoMono">
              VIN: {carItem.vin_plate}
            </div>
            <div className="text-lg text-black font-robotoMono">
              Provider: {carItem.provider_info.name}
            </div>
            <div className="text-lg text-black font-robotoMono">
              Capacity: {carItem.capacity} seats
            </div>
            <div className="text-lg text-black font-robotoMono font-semibold">
              Daily Rental Rate: ${carItem.pricePerDay}
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 text-2xl font-bold text-white">Update Data</div>

      <form className="space-y-4" onSubmit={handleUpdateCar}>
        <div className="bg-white rounded-lg p-3 flex flex-row">
          <div className="flex flex-col m-5">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Car Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter car name"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="vin_plate"
              >
                VIN
              </label>
              <input
                type="text"
                required
                name="vin_plate"
                value={formData.vin_plate}
                onChange={handleChange}
                placeholder="Enter VIN"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="provider_info"
              >
                Car Provider ID
              </label>
              <input
                type="text"
                required
                name="provider_info"
                value={formData.provider_info}
                onChange={handleChange}
                placeholder="Enter provider's ID"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="picture"
              >
                Car Picture URL
              </label>
              <input
                type="text"
                required
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="Enter picture URL"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="flex flex-col m-5">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="capacity"
              >
                Car Capacity
              </label>
              <input
                type="number"
                required
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Enter capacity"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="description"
              >
                Car Description
              </label>
              <input
                type="text"
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="pricePerDay"
              >
                Daily Rental Rate
              </label>
              <input
                type="number"
                required
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Enter daily rate"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition text-center font-robotoMono"
        >
          Update Car
        </button>
        {updateError && (
          <p className="text-red-500 mt-2 text-center">{updateError}</p>
        )}
      </form>
    </main>
  );
}
