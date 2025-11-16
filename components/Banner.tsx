"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import styles from "./banner.module.css"

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover6.jpg"];
  const [index, setIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [index]);

  // Function to go to the next image (Stops at last slide)
  const nextSlide = () => {
    if (index < covers.length - 1) {
      setIndex(index + 1);
    }
  };

  // Function to go to the previous image (Stops at first slide)
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative w-[97vw] h-[80vh] mx-auto rounded-lg overflow-hidden">
      {/* Image Sliding Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {covers.map((cover, i) => (
          <div key={i} className="min-w-full h-full relative">
        <Image
          src={cover}
          alt="cover"
          width={0}
          height={0}
          className="object-cover"
          style={{ width: "auto", height: "100%" }}
        />
          </div>
        ))}
      </div>

      {/* Overlay Text */}
      <div className={styles.bannerText}>
        <h1 className="text-4xl font-bold drop-shadow-lg">Your Car Renting Partner</h1>
        <h4 className="text-xl font-medium drop-shadow-md">Explore Your World With Us</h4>
      </div>

      {/* Left Button (Disabled if on the first slide) */}
      <button
        onClick={prevSlide}
        disabled={index === 0}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition ${
          index === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Right Button (Disabled if on the last slide) */}
      <button
        onClick={nextSlide}
        disabled={index === covers.length - 1}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition ${
          index === covers.length - 1 ? "bg-gray-500 cursor-not-allowed" : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}
