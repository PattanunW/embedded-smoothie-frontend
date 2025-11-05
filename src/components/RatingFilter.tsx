"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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

export default function RatingCard({
  averageRating,
  totalRating,
  breakdown,
  onFilterSelect,
}: {
  averageRating: number;
  totalRating: number;
  breakdown: { [star: number]: number };
  onFilterSelect?: (star: number) => void;
}) {
  return (
    <div className="w-full max-w-sm p-6 bg-white border border-gray-300 shadow-lg rounded-xl text-sm font-robotoMono space-y-4">
      <h2 className="text-xl font-bold font-robotoMono text-black text-center">
        Filter
      </h2>
      <hr className="border-t border-black/20 my-2 w-full" />
      <div className="w-full flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-black font-robotoMono">
            {averageRating.toFixed(1)} / 5
          </span>
          <span className="text-gray-500 text-xs">
            ({totalRating.toLocaleString()})
          </span>
        </div>
      </div>

      {[5, 4, 3, 2, 1].map((star) => {
        const count = breakdown[star] || 0;
        const percent = totalRating === 0 ? 0 : (count / totalRating) * 100;

        return (
          <div
            key={star}
            onClick={() => onFilterSelect?.(star)}
            className="cursor-pointer flex items-center gap-2 font-robotoMono text-black hover:bg-gray-100 p-1 rounded"
          >
            <div className="w-[50px] text-sm font-robotoMono text-black flex items-center gap-1">
              {star} <FaStar />
            </div>
            <div className="flex-1 h-3 bg-white border border-black rounded overflow-hidden font-robotoMono text-black">
              <div
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="w-[40px] text-right font-robotoMono text-black">
              {count}
            </div>
          </div>
        );
      })}
    </div>
  );
}
