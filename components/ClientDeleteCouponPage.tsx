"use client";

import { useState } from "react";
import CouponDeleteList from "@/components/CouponDeleteList";
import deleteExpiredCoupons from "@/libs/deleteExpiredCoupons";
import { useRouter } from "next/navigation";
import { CouponJson } from "interfaces";

export default function ClientDeleteCouponPage({
  coupons,
  token,
}: {
  coupons: CouponJson;
  token: string;
}) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteCoupon = async () => {
    try {
      const res = await deleteExpiredCoupons(token);
      alert(res.message);
      router.refresh(); // ✅ รีเฟรชหน้าเมื่อสำเร็จ
    } catch (err) {
      setDeleteError("Failed to delete the coupon.");
    }
  };

  return (
    <main className="text-center p-5">
      <CouponDeleteList couponJson={coupons} />

      <button
        onClick={handleDeleteCoupon}
        className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition mt-6"
      >
        Delete Expired Coupons
      </button>

      {deleteError && (
        <p className="text-red-600 text-sm mt-2 font-robotoMono">
          {deleteError}
        </p>
      )}
    </main>
  );
}
