"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getMyCoupon from "@/libs/getMyCoupon";
import { CouponJson } from "interfaces";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();
  const [myCoupon, setMyCoupon] = useState<CouponJson>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        if (!session?.user.token) return;
        const coupon = await getMyCoupon(session.user.token);
        setMyCoupon(coupon);
      } catch (err) {
        console.log("Cannot fetch my coupon");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [session]);

  return (
    <div className="mt-[100px] mb-[100px] flex justify-center items-center font-robotoMono">
      <div className="px-6 max-w-3xl w-full bg-white font-robotoMono">
        {loading ? (
          <p className="text-center text-black font-robotoMono">Loading...</p>
        ) : myCoupon?.data.length === 0 ? (
          <div className="text-center text-black font-robotoMono py-10">
            <p className="text-3xl mb-4">You don't have any coupon.</p>
            <Link
              href="/coupon"
              className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
            >
              Redeem Now
            </Link>
          </div>
        ) : (
          myCoupon?.data.map((coupon) => (
            <div
              key={coupon._id}
              className="mb-4 border-b pb-4 rounded-lg border border-black p-5"
            >
              <div className="flex justify-between text-lg text-black">
                <div>
                  <p>
                    <strong>Name:</strong> {coupon.name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {coupon.status === "Available" ? (
                      <span className="text-green-500">Available</span>
                    ) : coupon.status === "Used" ? (
                      <span className="text-blue-500">Used</span>
                    ) : (
                      <span className="text-red-500">Expired</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Minimum Spend:</strong> ${coupon.minSpend}
                  </p>
                  <p>
                    <strong>Max Discount:</strong> ${coupon.maxDiscount}
                  </p>
                  <p>
                    <strong>Discount %:</strong> {coupon.percentage}%
                  </p>
                  <p>
                    <strong>Expiration Date:</strong>{" "}
                    {new Date(coupon.expirationDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
