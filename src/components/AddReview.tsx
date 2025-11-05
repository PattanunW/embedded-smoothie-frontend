"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import createRating from "@/libs/createRating";
import { useRouter } from "next/navigation";

export default function AddReview({
  token,
  rentId,
  onSuccess,
}: {
  token: string;
  rentId: string;
  onSuccess?: () => void;
}) {
  const [carRating, setCarRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (carRating === 0 || review.trim() === "") {
      alert("Please provide both a star rating and a review.");
      return;
    }
    try {
      setErrorMessage(""); // reset error ก่อน
      await createRating(token, rentId, carRating, 1, review);
      router.push("/myReview");
      setReview("");
      setCarRating(0);
      setSuccessMessage(true);
      setIsFocused(false);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 2500);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Error submitting rating:", err);

      // ถ้า backend ส่งข้อความมา (เช่น "You already reviewed")
      const message = err?.message || "You have already rated this rent.";

      // สมมุติถ้า backend ส่ง 409 Conflict หรือข้อความเฉพาะ
      if (message == "You have already rated this rent.") {
        setErrorMessage("You have already reviewed this rental.");
      } else {
        setErrorMessage("You have already reviewed this rental.");
      }
    }
  };

  const handleCancel = () => {
    setReview("");
    setCarRating(0);
    setIsFocused(false);
    setErrorMessage("");
  };
  console.log("token:", token, "rentId:", rentId);
  console.log;
  return (
    <div className="space-y-2">
      {successMessage && (
        <div className="text-green-600 text-sm font-medium transition-opacity duration-300">
          Review added successfully!
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 text-sm font-medium transition-opacity duration-300">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !review.trim() && setIsFocused(false)}
          className="bg-transparent focus:outline-none flex-1 placeholder-gray-500"
        />
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            className={`cursor-pointer transition ${
              (hoverRating || carRating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setCarRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>

      <div
        className={`flex items-center border-b transition-colors duration-300 ${
          isFocused ? "border-black" : "border-gray-300"
        }`}
      ></div>
      {isFocused && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="text-black  px-4 py-1 rounded-full text-sm   "
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-black bg-white border border-black px-4 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            Review
          </button>
        </div>
      )}
    </div>
  );
}
