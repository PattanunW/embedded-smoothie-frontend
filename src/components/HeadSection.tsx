"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClassNames } from "@emotion/react";

export default function HeadSection() {
  const { data: session } = useSession();
  const [headingAnimation, setHeadingAnimation] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [logoAnimation, setLogoAnimation] = useState(false);

  console.log("HeroSection Mounted!"); // Debugging log

  useEffect(() => {
    setHeadingAnimation(true);
    setTimeout(() => setWelcomeAnimation(true), 200);
    setTimeout(() => setLogoAnimation(true), 200);
  }, []);

  return (
    <div className="flex flex-col justify-start pt-5 px-4 snap-start ">
      <div className="flex justify-center items-center w-full">
        <Image
          src="/img/carbe.png"
          alt="Rental Car FrontShot Logo"
          width={1225.2}
          height={387}
          className=" object-fit m-5 transition-opacity transition-transform duration-500 ease-in-out"
          quality={100}
          priority
        />
      </div>

      <div className=" flex flex-col justify-start px-[128.5px] text-right">
        <h1
          className={`text-[45px] text-left font-[Roboto Mono] text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
            welcomeAnimation ? "opacity-100 translate-y-0" : ""
          }`}
        >
          Car Rental
        </h1>

        <div
          className={`text-[13px] text-left font-[Roboto Mono] text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
            headingAnimation ? "opacity-100 translate-y-0" : ""
          }`}
        >
          <div className="font-light">
            <span>
              Experience hassle-free travel with our wide selection of quality
              vehicles
            </span>
            <br />
            <span>
              — perfect for business trips, vacations, or long-term use.
            </span>
            <br />
            <span>
              Affordable rates, safety assurance, and friendly service to make
              every ride smooth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
