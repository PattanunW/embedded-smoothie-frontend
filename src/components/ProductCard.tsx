"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductCard({
  Name,
  imgSrc,
  price,
  provider,
  rating,
  onCompare,
  carId,
}: {
  Name: string;
  imgSrc?: string;
  price?: string | number | null;
  provider?: string | null;
  rating?: number;
  carId?: string;
  onCompare?: Function;
}) {
  const router = useRouter();

  return (
    <InteractiveCard contentName={Name}>
      <div className="w-full h-[200px] relative bg-gray-200 border border-gray-300 ">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="Product Picture"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* ข้อมูล */}
      <div className="p-4 flex flex-col gap-2 text-black">
        <div className="text-left">
          <div className="text-lg font-bold font-robotoMono tracking-wide">
            {Name}
          </div>
          <div className="text-xs text-gray-500 font-robotoMono">
            {provider}
          </div>
        </div>

        {/* ราคา */}
        {price !== null && (
          <div className="text-base font-bold font-robotoMono text-left mt-1">
            ${price}
            <span className="text-[10px] font-normal"> /Day</span>
          </div>
        )}

        {/* Rating & Review */}
        <div className="flex justify-between items-center w-full mt-auto text-sm font-robotoMono">
          {rating ? (
            <div className="flex items-center text-black font-robotoMono">
              <FaStar className="mr-1" />
              <span className="font-semibold font-robotoMono">
                {rating.toFixed(2)}
              </span>
            </div>
          ) : null}
          <div
            className="text-gray-500 cursor-pointer hover:underline whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/car/${carId}/Rating`);
            }}
          >
            view review ➜
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
