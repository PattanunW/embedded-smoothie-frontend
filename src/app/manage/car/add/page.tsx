"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createCar from "@/libs/createCar";
import { ClassNames } from "@emotion/react";

export default function AddCarPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    vin_plate: "",
    provider_info: "",
    picture: "",
    capacity: 1,
    description: "",
    pricePerDay: 1,
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "pricePerDay" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      if (!session?.user.token) {
        setError(true);
        setErrorMessage("You must be logged in as an admin to add a car.");
        return;
      }
      console.log(formData.picture);
      const response = await createCar(
        session.user.token,
        formData.name,
        formData.vin_plate,
        formData.provider_info,
        formData.picture,
        formData.capacity,
        formData.description,
        formData.pricePerDay
      );

      if (response.success) {
        alert("Created car successfully");
        router.push("/car");
      } else {
        setError(true);
        setErrorMessage(response.message || "Failed to add car.");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg mb-[150px] mt-[80px] font-robotoMono border border-black">
          <p className="mt-3"></p>
          <h2 className="text-2xl font-medium mb-6 text-black text-center font-robotoMono">
            Add New Car
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col font-robotoMono">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-md font-bold text-gray-700 mb-1 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
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
                className="mt-1 p-2 border border-gray-300 border-2 bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300"
            >
              Add New Car
            </button>
            {error && (
              <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
            )}
          </form>
        </div>
      ) : (
        <div className="text-center text-xl text-red-500 p-4">
          You are not an admin. Access denied.
        </div>
      )}
    </>
  );
}
