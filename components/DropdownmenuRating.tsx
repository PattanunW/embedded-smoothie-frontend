"use client";

import { useState, useRef, useEffect } from "react";

import { FaUser, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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

export default function DropdownRating({
  averageRating,
  totalRating,
  breakdown,
}: {
  averageRating: number;
  totalRating: number;
  breakdown: { [star: number]: number };
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [animateBars, setAnimateBars] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setAnimateBars(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateBars(false);
    }
  }, [open]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-[20px] font-semibold w-[115px] h-[46px] bg-white rounded-full font-robotoMono border border-black flex items-center justify-center gap-2"
      >
        {averageRating.toFixed(1)}
        <FaStar className="text-black text-[20px]" />
      </button>

      {open && (
        <div
          className={`
          absolute top-[110%] left-0 mt-2 w-[250px] p-4 z-[999]
          bg-white border border-gray-300 shadow-lg rounded-xl text-sm font-robotoMono space-y-2
          transition-all duration-300 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `} //kuy
        >
          <div className="flex flex-col items-start gap-1 font-robotoMono">
            <div className="flex items-center gap-1 font-robotoMono">
              {renderStars(averageRating)}
              <span className="text-[14px] font-robotoMono font-semibold">
                {averageRating.toFixed(1)} / 5
                <span className="text-gray-500 text-[8px] font-robotoMono px-2">
                  ({totalRating.toLocaleString()})
                </span>
              </span>
            </div>
          </div>

          {[5, 4, 3, 2, 1].map((star) => {
            const count = breakdown[star] || 0;
            const percent = totalRating === 0 ? 0 : (count / totalRating) * 100;

            return (
              <div key={star} className="flex items-center gap-1">
                <div className="w-[60px] text-sm whitespace-nowrap font-robotoMono">
                  {star} star
                </div>
                <div className="flex-1 h-3 bg-white border border-black rounded overflow-hidden">
                  <div
                    className="bg-black h-full transition-all duration-500 ease-out"
                    style={{ width: animateBars ? `${percent}%` : "0%" }}
                  />
                </div>
                <div className="w-[40px] text-right text-sm font-robotoMono">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
