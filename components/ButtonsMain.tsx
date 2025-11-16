"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonsMain(){
    const { data: session } = useSession();

    return (
            <div className="mt-5 flex flex-row text-center items-center justify-center text-white font-semibold text-xl">
              {!session ? (
                <>
              <Link href="/register">
              <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
                Register and Book Now
              </div>
              </Link>
              <Link href="/api/auth/signin">
              <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
                Login and Book Now
              </div>
              </Link>
                </>
              ):(
              <Link href="/booking">
                <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
                View Your Booking
                </div>
              </Link>
              
              )}
            </div>
    )
}