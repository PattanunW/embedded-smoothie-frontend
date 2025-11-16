import deleteRating from "@/libs/deleteRating";
import updateRating from "@/libs/updateRating";
import dayjs from "dayjs";
import { Rating } from "interfaces";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function renderStars(ratingScore: number) {
  const fullStars = Math.floor(ratingScore);
  const hasHalfStar = ratingScore - fullStars > 0;
  const emptyStars = 5 - Math.ceil(ratingScore);

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

export default function MyReviewCard({
  rating,
  editingId,
  onSelect,
  setConfirmationMessage,
  setColor,
  refreshRatings
}: {
  rating: Rating;
  editingId: string | null;
  onSelect: (selectedRatingId: string | null) => void;
  setConfirmationMessage: (message: string | null) => void;
  setColor: (color: string) => void;
  refreshRatings: () => void;
}) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carRating, setCarRating] = useState(rating.car_rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(rating.review);

  const buttonStyle =
    "text-black text-[12px] rounded-lg bg-white border border-black py-1 px-3 hover:bg-black hover:text-white transition duration-300";

  const handleEdit = async () => {
    if (!session) return;
    if (rating.car_rating === carRating && rating.review === review) return;

    const response = await updateRating(
      session.user.token,
      rating._id,
      carRating,
      rating.provider_rating,
      review
    );

    if (response.success) {
      refreshRatings();
      setColor("text-green-600");
      setConfirmationMessage("Review updated successfully!");
      setTimeout(() => setConfirmationMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!session) return;

    const response = await deleteRating(session.user.token, rating._id);

    if (response.success) {
      setIsModalOpen(false);
      refreshRatings();
      setColor("text-red-600");
      setConfirmationMessage("Review deleted successfully!");
      setTimeout(() => setConfirmationMessage(null), 3000);
    }
  };

  return (
    <div className="mb-4 w-[750px] h-full pb-4 rounded-lg border border-black p-5">
      <div className="flex flex-col">
        <div className="flex">
          <div className="text-black text-[16px]">RentId : {rating.rent_info}</div>
          {editingId === rating._id ? (
            <div className="flex justify-end ml-auto">
              {[1, 2, 3, 4, 5].map((star) =>
                (hoverRating || carRating) >= star ? (
                  <FaStar
                    key={star}
                    size={20}
                    className={`cursor-pointer transition text-yellow-500`}
                    onClick={() => setCarRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ) : (
                  <FaRegStar
                    key={star}
                    size={20}
                    className={`cursor-pointer transition text-yellow-500`}
                    onClick={() => setCarRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                )
              )}
            </div>
          ) : (
            <div className="ml-auto">{renderStars(carRating)}</div>
          )}
        </div>
        <span className="text-black text-[16px]">Car : {rating.car_info.name}</span>
      </div>

      <div className="border-t border-black my-2"></div>

      {editingId === rating._id ? (
        <>
          <textarea
            className="bg-white border border-black text-gray-800 rounded-lg p-2 w-full h-full resize-none focus:outline-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            defaultValue={review}
            onChange={(e) => setReview(e.target.value)}
            aria-label="Edit Review"
          ></textarea>

          <div className="flex flex-row items-center justify-between mt-2">
            <div className="text-gray-500 text-[12px]">
              Posted on : {dayjs(rating.createdAt).format("DD/MM/YYYY HH:mm:ss")}{" "}
              {rating.isEdited && <span className="text-gray-500 text-[12px]">(Edited)</span>}
            </div>
            <div className="flex gap-2">
              <button
                className={`${buttonStyle} border-green-600 text-green-600 hover:bg-green-600 hover:text-white`}
                onClick={() => {
                  handleEdit();
                  onSelect(null);
                }}
              >
                Confirm
              </button>
              <button
                className={`${buttonStyle} border-red-600 text-red-600 hover:bg-red-600 hover:text-white`}
                onClick={() => {
                  onSelect(null);
                  setReview(rating.review);
                  setCarRating(rating.car_rating);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-black text-[16px]">{rating.review}</div>

          <div className="flex flex-row items-center justify-between mt-2">
            <div className="text-gray-500 text-[12px]">
              Posted on : {dayjs(rating.createdAt).format("DD/MM/YYYY HH:mm:ss")}{" "}
              {rating.isEdited && <span className="text-gray-500 text-[12px]">(Edited)</span>}
            </div>
            <div className="flex gap-2">
              <button className={buttonStyle} onClick={() => onSelect(rating._id)}>
                Edit
              </button>
              <button
                className={`${buttonStyle} border-red-600 text-red-600 hover:bg-red-600 hover:text-white`}
                onClick={() => {setIsModalOpen(true);}}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
           <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg">
             <h2 className="text-lg font-bold mb-4 text-black font-robotoMono">Confirm Deletion</h2>
             <p className="text-sm text-black mb-6 font-robotoMono">
               Are you sure you want to delete this review? This action cannot be
               undone.
             </p>
             <div className="flex justify-end gap-4">
               <button
                 className="px-3 py-1 bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-robotoMono transition duration-300"
                 onClick={handleDelete}
               >
                 Delete
               </button>
               <button
                 className="px-3 py-1 bg-white border border-black text-black hover:bg-black hover:text-white rounded-lg font-robotoMono transition duration-300"
                 onClick={() => setIsModalOpen(false)}
               >
                 Cancel
               </button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
