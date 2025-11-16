"use client";

import { useState } from "react";
import RatingCard from "@/components/RatingFilter";
import Comment from "@/components/Comment";
import { Rating } from "interfaces";

export default function CarReviewClient({
  carName,
  ratings,
  averageRating,
  breakdown,
}: {
  carName: string;
  ratings: Rating[];
  averageRating: number;
  breakdown: { [star: number]: number };
}) {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const filteredRatings = selectedStar
    ? ratings.filter((r) => Math.round(r.car_rating) === selectedStar)
    : ratings;

  return (
    <div className="w-full px-10 py-10" data-testid="rating-section">
      <h1 className="text-3xl mb-10 font-robotoMono text-black text-center">
        {carName} Reviews
      </h1>

      <div className="flex w-full gap-8">
        <div className="w-[350px] border-r border-black/20 pr-6">
          <RatingCard
            averageRating={averageRating}
            totalRating={ratings.length}
            breakdown={breakdown}
            onFilterSelect={(star) =>
              setSelectedStar((prev) => (prev === star ? null : star))
            }
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col">
            {filteredRatings.map((rating, index) => (
              <div
                key={rating._id}
                className={`opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Comment
                  key={rating._id}
                  name={rating.user_info.name}
                  rating={rating.car_rating}
                  review={rating.review || ""}
                  created={new Date(rating.createdAt)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
