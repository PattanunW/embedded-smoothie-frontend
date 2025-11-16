"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 font-robotoMono">Sign Out</h1>
      <p className="mb-6 text-gray-600 font-robotoMono">Are you sure you want to sign out?</p>
      <div className="flex space-x-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-black border border-black px-5 py-2 rounded-full text-sm hover:bg-black hover:text-white transition text-center font-robotoMono"
        >
          Sign Out
        </button>
        <button
          onClick={() => router.back()}
          className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition text-center font-robotoMono"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}