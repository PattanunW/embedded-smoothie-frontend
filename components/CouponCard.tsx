"use client";

import createCoupon from "@/libs/createCoupon";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import updateRedeemStatusInUser from "@/libs/updateRedeemStatusInUser"; // ฟังก์ชันอัปเดตสถานะคูปอง

export default function CouponCard({
  couponName,
  percentage,
  minDisc,
  minSp,
  spent,
  valid,
  redeemStatus,
  index,
  updateDetails, // ฟังก์ชันอัปเดตสถานะจาก parent component
}: {
  couponName: string;
  percentage: number;
  minDisc: number;
  minSp: number;
  spent: number;
  valid: number;
  redeemStatus: boolean[];
  index: number;
  updateDetails: (updatedStatus: boolean[]) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleRedeem = async () => {
    if (redeemStatus[index]) {
      alert("This coupon has already been redeemed.");
      return;
    }

    setLoading(true);
    const session = await getSession();
    if (!session?.user?.token) {
      alert("You must be logged in to redeem a coupon.");
      setLoading(false);
      return;
    }

    const token = session.user.token;

    try {
      const response = await createCoupon(
        token,
        couponName,
        percentage,
        minDisc,
        minSp,
        new Date(Date.now() + valid * 24 * 60 * 60 * 1000)
      );

      console.log(response);

      // อัปเดต redeemCouponStatus ที่ index ที่ผู้ใช้เลือก
      const updatedStatus = [...redeemStatus];
      updatedStatus[index] = true;

      // อัปเดตข้อมูลใน backend
      const result = await updateRedeemStatusInUser(token, updatedStatus);

      // อัปเดตสถานะใน UI
      updateDetails(result.data.redeemCouponStatus);

      alert("Coupon redeemed successfully!");
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      alert("There was an error redeeming the coupon.");
    }

    setLoading(false);
  };

  return (
    <div
      className={`w-[230px] h-[333px] rounded-[24px] ${
        redeemStatus[index] === true
          ? "bg-gray-400"
          : "bg-black hover:scale-105 transition-transform duration-300"
      } text-white overflow-hidden relative`}
    >
      <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
        <span className="text-white text-[96px] leading-none mt-4 font-rockwellCondensed">
          {percentage}%
        </span>
      </div>

      <div className="relative w-full flex items-center justify-between px-4 my-4">
        <div className="absolute left-[-10px] h-6 w-6 bg-white rounded-full"></div>
        <div className="w-full"></div>
        <div className="absolute right-[-10px] h-6 w-6 bg-white rounded-full"></div>
      </div>

      <div className="px-6 mt-3 pb-2 text-[11px] space-y-3 text-white text-left leading-[12px]">
        <div className="text-[18px] font-bold tracking-wide text-center font-rockwellCondensed">
          {couponName}
        </div>

        <p>
          Maximum Discount:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${minDisc}
          </span>
        </p>
        <p>
          Min. spend:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${minSp}
          </span>
        </p>
        <p>
          Spent:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${spent}
          </span>
        </p>
        <p>
          Valid:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            {valid > 1 ? valid + " days" : valid + " day"}
          </span>
        </p>
        <div className="text-center">
          <button
            className={`px-4 py-2 mt-1 rounded font-semibold transition-transform duration-300 ${
              redeemStatus[index] === true
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-300 hover:scale-105"
            }`}
            disabled={redeemStatus[index] === true || loading}
            onClick={handleRedeem}
          >
            {loading
              ? "Processing..."
              : redeemStatus[index] === true
              ? "REDEEMED"
              : "REDEEM"}
          </button>
        </div>
      </div>
    </div>
  );
}
