"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import DropDownProfile from "./dropdownProfile";

export default function TopMenu() {
  const { data: session, status } = useSession();

  return (
    <div className="h-[104px] bg-white fixed top-0 left-0 right-0 z-30 flex items-center justify-between ">
      <div className="flex gap-6 ml-[2vw]">
        <img className="flex h-[100px] left-0" src="img/logo.jpg" />
        <TopMenuItem title="PROVIDER" pageRef="/provider" />
        <TopMenuItem title="SELECT CAR" pageRef="/car" />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href={"/"}>
          <div className="text-[32px] text-black font-medium hover:text-gray-700">
            ARM SPEED BUS
          </div>
        </Link>
      </div>

      <div className="flex gap-6 px-[140px]">
        <TopMenuItem title="COUPON" pageRef="/coupon" />
        {status === "authenticated" ? (
          <DropDownProfile isLoggedIn={true} Text="PROFILE" />
        ) : (
          <DropDownProfile isLoggedIn={false} Text="LOGIN" />
        )}
      </div>
    </div>
  );
}
