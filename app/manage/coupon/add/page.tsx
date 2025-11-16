"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createCoupon from "@/libs/createCoupon";

export default function AddCouponPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    maxDiscount: "",
    minSpend: "",
    expirationDate: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      if (!session?.user.token) {
        setError(true);
        setErrorMessage("You must be logged in as an admin to add a coupon.");
        return;
      }

      const response = await createCoupon(
        session.user.token,
        formData.name,
        Number(formData.percentage),
        Number(formData.maxDiscount),
        Number(formData.minSpend),
        new Date(formData.expirationDate)
      );

      if (response.success) {
        alert("Created coupon successfully");
        router.push("/coupon");
      } else {
        setError(true);
        setErrorMessage(response.message || "Failed to add coupon.");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg mb-[150px] mt-[80px] font-robotoMono border border-black">
          <h2 className="text-2xl font-medium mb-6 text-black text-center font-robotoMono">
            Add New Coupon
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="block text-md font-bold text-black mb-1 font-robotoMono">Coupon Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 border-2 text-black bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-md font-bold text-black mb-1 font-robotoMono">Percentage</label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 border-2 text-black bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-md font-bold text-black mb-1 font-robotoMono">Maximum Discount</label>
              <input
                type="number"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 border-2 text-black bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-md font-bold text-black mb-1 font-robotoMono">Minimum Spend</label>
              <input
                type="number"
                name="minSpend"
                value={formData.minSpend}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 border-2 text-black bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-md font-bold text-black mb-1 font-robotoMono">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 border-2 text-black bg-white rounded-md w-full focus:ring focus:ring-indigo-200 font-robotoMono"
              />
            </div>
            <button
              type="submit"
              className="w-full text-green-600 border border-green-600 px-5 py-2 rounded-full text-sm hover:bg-green-600 hover:text-white transition text-center font-robotoMono"
            >
              Add New Coupon
            </button>
            {error && (
              <p className="text-green-500 mt-2 text-center font-robotoMono">{errorMessage}</p>
            )}
          </form>
        </div>
      ) : (
        <div className="text-center text-xl text-red-500 p-4 font-robotoMono">
          You are not an admin. Access denied.
        </div>
      )}
    </>
  );
}
