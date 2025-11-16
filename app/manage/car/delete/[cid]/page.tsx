"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import getCar from "@/libs/getCar";
import deleteCar from "@/libs/deleteCar"; // Import the deleteCar function
import Link from "next/link";
import { CarItem } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";

export default function CarCidDeletePage({
  params,
}: {
  params: { cid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null); // Error state for deletion
  if (!session || session.user.User_info.role !== "admin") {
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        You are not an administrator. Access denied.
      </div>
    );
  }
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
      } catch (err) {
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.cid]);

  const handleDeleteCar = async () => {
    try {
      if (!session?.user.token) {
        return;
      }
      await deleteCar(session.user.token, params.cid); // Call the deleteCar function
      alert("Deleted car successfully");
      router.push("/car");
    } catch (err) {
      setDeleteError("Failed to delete the car."); // Handle deletion error
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
    <main className="text-left p-8 min-h-screen flex flex-col items-center mt-[80px]">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <Image
          src={carItem.picture}
          alt="Car Image"
          width={500}
          height={300}
          className="w-full md:w-1/2 object-cover"
        />
        <div className="p-6 flex flex-col justify-between w-full">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 font-robotoMono">
              {carItem.name}
            </h1>
            <div className="text-lg font-semibold text-gray-700 font-robotoMono">
              {carItem.description}
            </div>
            <div className="text-sm text-gray-600 font-robotoMono">
              VIN: {carItem.vin_plate}
            </div>
            <div className="text-sm text-gray-600 font-robotoMono">
              Provider: {carItem.provider_info.name}
            </div>
            <div className="text-sm text-gray-600 font-robotoMono">
              Capacity: {carItem.capacity} seats
            </div>
            <div className="text-lg font-semibold text-gray-800 font-robotoMono">
              Daily Rental Rate: ${carItem.pricePerDay}
            </div>
          </div>
          {deleteError && (
            <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded font-robotoMono">
              {deleteError}
            </div>
          )}
          <button
            onClick={handleDeleteCar}
            className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition text-center font-robotoMono"
          >
            Delete Car
          </button>
        </div>
      </div>
    </main>
  );
}
