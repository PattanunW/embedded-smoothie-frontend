"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DropDownProfile({
  isLoggedIn,
  Text,
}: {
  isLoggedIn: boolean;
  Text: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex flex-row bg-white py-1 px-2 rounded-xl text-black cursor-pointer hover:text-gray-500 hover:scale-105 transition items-center justify-center text-[13px]">
        {Text}
      </div>

      {isOpen && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-gray-600 bg-opacity-50 backdrop-blur-sm shadow-lg z-40 transition-transform font-[Roboto Mono]">
          <div className="flex flex-col h-full p-6 pr-20 pt-20">
            <div className="flex flex-col justify-start items-end flex-1">
              {!isLoggedIn && (
                <>
                  <Link href="/register">
                    <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                      REGISTER
                    </h2>
                  </Link>
                  <Link href="/api/auth/signin" className="pt-10">
                    <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                      LOGIN
                    </h2>
                  </Link>
                </>
              )}

              {session?.user?.User_info?.role === "user" && (
                <>
                  <Link href="/profile">
                    <h2 className="text-[25px] text-right group hover:underline transition-all duration-300 ease-in-out">
                      PROFILE
                    </h2>
                  </Link>
                  <div className="text-[15px] text-right flex flex-col">
                    <Link href="/booking">
                      <h3 className="pt-5 group hover:underline">MY BOOKING</h3>
                    </Link>
                    <Link href="/mycoupon">
                      <h3 className="pt-2 group hover:underline">MY COUPON</h3>
                    </Link>
                    <Link href="/myReview">
                      <h3 className="pt-2 group hover:underline">MY REVIEW</h3>
                    </Link>
                  </div>
                </>
              )}

              {session?.user?.User_info?.role === "admin" && (
                <>
                  <Link href="/profile">
                    <h2 className="text-[25px] text-right group hover:underline transition-all duration-300 ease-in-out">
                      PROFILE
                    </h2>
                  </Link>

                  <div className="text-[15px] text-right flex flex-col">
                    <Link href="/booking">
                      <h3 className="pt-5 group hover:underline">
                        ALL BOOKINGS
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-10">
                    <h2 className="text-[25px] text-right group hover:underline">
                      MANAGE
                    </h2>
                    <div className="text-[15px] text-right flex flex-col">
                      <Link
                        href="/manage/car"
                        className="pt-5 group hover:underline"
                      >
                        MANAGE CARS
                      </Link>
                      <Link
                        href="/manage/provider"
                        className="pt-2 group hover:underline"
                      >
                        MANAGE PROVIDER
                      </Link>
                      <Link
                        href="/booking"
                        className="pt-2 group hover:underline"
                      >
                        MANAGE BOOKING
                      </Link>
                      <Link
                        href="/manage/coupon"
                        className="pt-2 group hover:underline"
                      >
                        MANAGE COUPON
                      </Link>
                      <Link
                        href="/manage/review"
                        className="pt-2 group hover:underline"
                      >
                        MANAGE REVIEW
                      </Link>
                      <Link
                        href="/auditlog"
                        className="pt-2 group hover:underline"
                      >
                        Audit Log
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {session?.user && (
                <div className="text-right mt-auto">
                  <Link href="/signout">
                    <button className="text-[15px] text-white hover:underline transition-all duration-300 ease-in-out">
                      LOGOUT
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
