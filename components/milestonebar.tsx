"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import CouponCard from "./CouponCard";
import { useSession } from "next-auth/react";
import { useBaseUrl } from "@/utils/useBaseUrl";

const CARD_WIDTH = 270;

type Coupon = {
  percentage: number;
  name: string;
  maxDiscount: number;
  minSpend: number;
  spent: number;
  valid: number;
};

type Props = {
  coupon: Coupon[];
};

const SpendingMilestoneBar: React.FC<Props> = ({ coupon }) => {
  const [paymentThisYear, setpaymentThisYear] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);
  const [redeemStatus, setRedeemStatus] = useState<boolean[]>([]); // สถานะการรีดีมของคูปอง
  const milestones = coupon.map((c) => c.spent);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { data: session } = useSession();

  const baseUrl = useBaseUrl();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.token) return;

      const res = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setpaymentThisYear(data.data.totalPaymentThisYear);
        setRedeemStatus(data.data.redeemCouponStatus);
        setPayment(data.data.totalPayment);
      }
      console.log(data.data.totalPayment);
    };

    fetchUser();
  }, [session?.user?.token]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const progressPx = useMemo(() => {
    let progress = 0;
    for (let i = 0; i < milestones.length; i++) {
      if (paymentThisYear >= milestones[i]) {
        progress = (i + 1) * CARD_WIDTH;
      } else if (i === 0) {
        progress = (paymentThisYear / milestones[i]) * CARD_WIDTH;
        break;
      } else {
        const prev = milestones[i - 1];
        const next = milestones[i];
        const ratio = (paymentThisYear - prev) / (next - prev);
        progress = i * CARD_WIDTH + ratio * CARD_WIDTH;
        break;
      }
    }
    return Math.min(progress, milestones.length * CARD_WIDTH);
  }, [paymentThisYear, milestones]);

  return (
    <div className="w-full py-10 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 items-center">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="relative overflow-x-auto scrollbar-hide"
        >
          <div
            className="relative flex flex-row items-start justify-center gap-6 pb-16 pt-10"
            style={{ width: "100%" }}
          >
            <div
              className="absolute top-5 left-0 h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-300 z-0"
              style={{
                width: `${coupon.length * CARD_WIDTH + 100}px`,
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="h-full bg-gray-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPx}px` }}
              />
            </div>

            {coupon.map((item, index) => {
              const reached = paymentThisYear >= item.spent;

              return (
                <div
                  key={index}
                  className="flex-shrink-0 relative z-10"
                  style={{ width: CARD_WIDTH }}
                >
                  <div className="flex justify-center">
                    <div
                      className={`absolute top-2 w-[10px] h-[75px] transform -translate-y-1/2 rounded-full ${
                        reached ? "bg-black" : "bg-gray-300"
                      }`}
                      style={{
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>

                  {reached ? (
                    <div className="flex justify-center mt-6">
                      <CouponCard
                        couponName={item.name}
                        percentage={item.percentage}
                        minDisc={item.maxDiscount}
                        minSp={item.minSpend}
                        spent={item.spent}
                        valid={item.valid}
                        redeemStatus={redeemStatus}
                        index={index}
                        updateDetails={(updatedStatus) =>
                          setRedeemStatus(updatedStatus)
                        }
                      />
                    </div>
                  ) : (
                    <div
                      style={{ width: CARD_WIDTH }}
                      className="rounded-xl border-dashed border-2 border-gray-300 bg-white shadow px-4 py-6 text-center mt-6 h-[260px] flex flex-col justify-center"
                    >
                      <div className="text-xl font-bold text-gray-400 mb-2">
                        {item.percentage}%
                      </div>
                      <p className="text-xs text-gray-400">
                        Spend ${item.spent} to unlock
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          This year you've spent{" "}
          <span className="font-bold text-gray-700">
            $
            {Number.isFinite(paymentThisYear)
              ? paymentThisYear.toFixed(2)
              : "0.00"}
          </span>
        </p>

        {/* <p className="text-center text-sm text-gray-600 mt-4">
          You've spent{" "}
          <span className="font-bold text-gray-700">
            ${Number.isFinite(payment) ? payment.toFixed(2) : "0.00"}
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default SpendingMilestoneBar;
