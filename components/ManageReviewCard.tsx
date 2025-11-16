"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import deleteRating from "@/libs/deleteRating";
import updateRating from "@/libs/updateRating";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars > 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
      ))}
    </div>
  );
}

export default function ManageReviewCard({
  ratingId,
  userName,
  carName,
  carRating,
  providerRating,
  review,
  posted,
  refreshRatings,
}: {
  ratingId: string;
  userName?: string;
  carName?: string;
  carRating: number;
  providerRating: number;
  review?: string;
  posted: Date;
  refreshRatings: () => void; // Function to refresh ratings after deletion
}) {
  dayjs.locale("th");
  const formattedDate = dayjs(posted).format("DD/MM/YYYY HH:mm:ss");

  const { data: session } = useSession();
  if (!session) return null; // Ensure session is available

  const [isEditing, setIsEditing] = useState(false); // To toggle between edit and view modes

  const buttonStyle =
    "text-black text-[12px] rounded-lg bg-white border border-black py-1 px-3 hover:bg-black hover:text-white transition duration-300";

  // Validate and Update Rating Function
  // const handleCarRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value);
  //   if (value >= 1 && value <= 5 && Number.isInteger(value)) {
  //     setNewCarRating(value);
  //   } else {
  //     alert("Rating must be an integer between 1 and 5.");
  //   }
  // };

  // const handleProviderRatingChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = parseInt(e.target.value);
  //   if (value >= 1 && value <= 5 && Number.isInteger(value)) {
  //     setNewProviderRating(value);
  //   } else {
  //     alert("Rating must be an integer between 1 and 5.");
  //   }
  // };

  // Update review function
  // const handleUpdate = async () => {
  //   try {
  //     // Call the updateRating function with the new values
  //     console.log("Updating review with values:", {
  //       ratingId,
  //       newCarRating,
  //       newProviderRating,
  //       newReview,
  //     });
  //     await updateRating(
  //       session.user.token,
  //       ratingId,
  //       newCarRating,
  //       newProviderRating,
  //       newReview
  //     );
  //     setIsEditing(false); // Close the editing mode after update
  //     alert("Review updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating review:", error);
  //     alert("Error updating review.");
  //   }
  // };

  // Delete review function
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      // Call the deleteRating function with the ratingId
      await deleteRating(session.user.token, ratingId);
      alert("Review deleted successfully!");
      refreshRatings(); // Refresh the ratings after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review.");
    }
  };

  return (
    <div className="mb-4 pb-4 rounded-lg border border-black p-5 relative bg-white">
      <div className="flex flex-col">
        <span className="text-black text-[16px]">ReviewId : {ratingId}</span>
        <span className="text-black text-[16px] mt-1">User : {userName}</span>
        <span className="text-black text-[16px] mt-1">Car : {carName}</span>
      </div>

      <div className="absolute top-0 right-0 flex items-center mt-5 mr-6">
        <span className="mr-2 text-black">Car Rating:</span>
        {isEditing ? (
          <input
            type="number"
            min="1"
            max="5"
            value={carRating}
            // onChange={handleCarRatingChange}
            className="w-16 text-center bg-gray-100 rounded"
          />
        ) : (
          renderStars(carRating)
        )}
      </div>

      <div className="border-t border-black my-3"></div>

      <div className="text-black text-[16px]">
        {isEditing ? (
          <textarea
            value={review}
            // onChange={(e) => setNewReview(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : (
          review
        )}
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-500 text-[12px]">
          Posted on : {formattedDate}
        </div>
        <div className="flex gap-2 mt-8">
          {isEditing ? (
            <>
              <button
                className={buttonStyle}
                // onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className={buttonStyle}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className={buttonStyle} onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
