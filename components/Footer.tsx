"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  return (
    <footer className="w-full bg-gray-100 text-black font-mono px-10 py-[4vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">ARM SPEED BUS</h2>
          <p className="text-gray-700 leading-relaxed">
            ARM SPEED BUS is a modern car rental service offering flexible and
            reliable options for every journey. Whether you're planning a
            weekend trip or need a ride for your daily commute — we've got you
            covered.
          </p>
          <div>
            <p className="font-semibold underline">Social</p>
            <Link href="https://www.instagram.com/boon_baworntatt/">
              Instagram
            </Link>
            <div>
              <Link href="https://www.instagram.com/p/C7oEIispaPd/?img_index=1">
                Outstagram
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-2">
          <p className="font-semibold underline">Information</p>
          <p>Rental Guide</p>
          <p>FAQ</p>
          <p>
            <Link href="https://www.facebook.com/profile.php?id=100016896722458">
              Partner With Us
            </Link>
          </p>
          <p>Contact</p>
          <p>Terms & Conditions</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <p className="font-semibold">
            Subscribe to our newsletter for the latest rental deals and updates.
          </p>

          <div className="flex border-b border-black pb-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent focus:outline-none flex-1 placeholder-gray-500"
            />
            <button className="text-gray-700" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

          <label className="flex items-center space-x-2 text-xs text-gray-600">
            <input type="checkbox" className="form-checkbox" />
            <span>
              I have read and accept the{" "}
              <span className="underline">terms and conditions</span>.
            </span>
          </label>
        </div>
      </div>
    </footer>
  );
}
