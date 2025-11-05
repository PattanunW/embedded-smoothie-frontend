"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { RatingItem } from "interfaces";
import Link from "next/link";
import getMyRatings from "@/libs/getMyRatings";
import MyReviewCard from "@/components/MyReviewCard";

export default function Page() {
  const { data: session } = useSession();
  const [myRating, setMyRating] = useState<RatingItem>();
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [color, setColor] = useState<string>("text-black");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (!session?.user.token) return;
        const rating = await getMyRatings(session.user.token);
        setMyRating(rating);
      } catch (err) {
        console.log("Cannot fetch my coupon");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [session]);
  
    const refreshRatings = async () => {
      if (session?.user.token) {
        const ratingsResponse = await getMyRatings(session.user.token);
        if (ratingsResponse.success) {
          setMyRating(ratingsResponse);
        }
      }
    };

  return (
    <div className="mt-[75px] mb-[100px] flex justify-center items-center font-robotoMono">
      <div className="relative px-6 max-w-3xl w-full bg-white font-robotoMono flex flex-col items-center">
        <h1 className="text-black text-2xl font-semibold">
          My Review
        </h1>
        {confirmationMessage && (
          <div className={`absolute top-6 text-center ${color} text-sm mt-2 z-10`}>
            {confirmationMessage}
          </div>
        )}

        <div className="mt-8">
          {loading ? (
            <p className="text-center text-black font-robotoMono">Loading...</p>
          ) : myRating?.data?.length === 0 ? (
            <div className="text-center text-black font-robotoMono py-10">
              <p className="text-3xl mb-4">You don't have any Rating.</p>
              <Link
                href="/booking"
                className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
              >
                Review Now
              </Link>
            </div>
          ) : (
            myRating?.data?.map((ratingItem) => (
              <div key={ratingItem._id}>
                <MyReviewCard
                  rating={ratingItem}
                  editingId={editingId}
                  onSelect={(selectedRatingId) => {
                    setEditingId(selectedRatingId);
                  }}
                  setConfirmationMessage={setConfirmationMessage}
                  setColor={setColor}
                  refreshRatings={refreshRatings}
                ></MyReviewCard>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
