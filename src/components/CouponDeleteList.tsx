"use client";
import Link from "next/link";
import { useEffect } from "react";
import { CouponJson } from "interfaces";
import updateCoupon from "@/libs/updateCoupon";
import { getSession } from "next-auth/react";

export default function CouponDeleteList({
  couponJson,
}: {
  couponJson: CouponJson;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
      {couponJson.data.map((coupon) => {
        const isExpired = coupon.status === "Expired";
        const formattedDate = new Date(
          coupon.expirationDate
        ).toLocaleDateString("en-GB");
        const textColor = isExpired ? "text-red-600" : "text-black";
        const borderColor = isExpired
          ? "border-red-600 hover:bg-red-100"
          : "border-black hover:bg-gray-100";

        return (
          <div
            key={coupon._id}
            className={`${textColor} p-4 rounded-lg shadow transition-all border ${borderColor}`}
          >
            <h2 className="text-xl font-semibold font-robotoMono">
              {coupon.name}
            </h2>
            <p className="text-sm">Discount: {coupon.percentage}%</p>
            <p className="text-sm">Max: ${coupon.maxDiscount}</p>
            <p className="text-sm">Min Spend: ${coupon.minSpend}</p>
            <p className="text-sm">Status: {coupon.status}</p>
            <p className="text-sm mt-1">Expires: {formattedDate}</p>
          </div>
        );
      })}
    </div>
  );
}
