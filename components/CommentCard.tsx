"use client";

import dayjs from "dayjs";
import { FaUser } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ExpandableComment from "./ExpandableComment";

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

export default function CommentCard({
  name,
  rating,
  review,
  created,
}: {
  name: string;
  rating: number;
  review: string;
  created: Date;
}) {
  return (
    <div className="w-[390px] border border-black rounded-lg p-4 shadow-sm bg-white flex flex-col space-y-1 h-full">
      <div className="flex items-center justify-start gap-x-4 ">
        <FaUser className="text-gray-700 text-xl" />
        <h3 className="text-[20px]  font-robotoMono">{name}</h3>
        <div className="ml-auto">{renderStars(rating)}</div>
      </div>

      <div className="border-t border-black my-2"></div>

      <div className="pl-[34px] space-y-1">
        {/* <p className="text-[16px] font-robotoMono">{review}</p> */}
        <ExpandableComment text={review} />
        <p className="text-xs text-gray-500 font-robotoMono">
          Posted on {dayjs(created).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
}
