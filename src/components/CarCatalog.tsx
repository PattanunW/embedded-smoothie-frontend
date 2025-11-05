"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { CarItem, CarJson } from "interfaces";
import { ClassNames } from "@emotion/react";
import { FaFilter } from "react-icons/fa";

export default async function CarCatalog({ carJson }: { carJson: CarJson }) {
  const carJsonReady = await carJson;
  return (
    <>
      <div className="flex text-3xl font-robotoMono text-left mt-4 mb-8 text-[#333] opacity-0 transition-opacity duration-1000 animate-fade-in ml-20 pl-10">
        Rent All_
      </div>

      <div className="flex text-m font-[Verdana,Geneva,Tahoma,sans-serif] text-left mt-4 mb-8 text-[#333] opacity-0 transition-opacity duration-1000 animate-fade-in pl-20 ml-10 mr-10 pr-20">
        <div className="flex-1">_items</div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 px-4 ">
        {carJsonReady.data.map((carItem: CarItem, index) => (
          <div
            key={carItem.id}
            className={`w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group opacity-0 transition-transform duration-1000 animate-slide-up`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <Link
              href={`/car/${carItem.id}`}
              key={carItem.id}
              className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group"
            >
              <div className="border border-gray  bg-white relative group hover:scale-105 transition-all ease-in-out">
                <ProductCard
                  Name={carItem.name}
                  imgSrc={carItem.picture}
                  price={carItem.pricePerDay}
                  provider={carItem.provider_info.name}
                  rating={parseFloat(carItem.averageRating?.toFixed(2))}
                  carId={carItem._id}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideUp 1s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
