"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { CarItem, CarJson } from "interfaces";
import getProvider from "@/libs/getProvider";

export default async function CarCatalogOfProvider({ carJson, pid}: { carJson: CarJson,pid: string}) {
  const carJsonReady = await carJson;
  const provider = await getProvider(pid);
  if(!provider.success){
    return <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">Incorrect URL</div>
  }
  carJsonReady.data = carJsonReady.data.filter(car => car.provider_info._id === pid);
  return (
    <>
      <div className="text-3xl font-[Verdana,Geneva,Tahoma,sans-serif] text-center mb-8 text-[#333] text-[#FFF2F2] opacity-0 transition-opacity duration-1000 animate-fade-in">
        Explore {carJsonReady.data.length} models from provider {provider.data.name}
      </div>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {carJsonReady.data.map((carItem: CarItem, index) => (
          <Link
            href={`/car/${carItem.id}`}
            key={carItem.id}
            className={`w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group opacity-0 transition-transform duration-1000 animate-slide-up`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="border border-gray-300 shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
              <ProductCard
                Name={carItem.name}
                imgSrc={carItem.picture}
                price={carItem.pricePerDay.toString()}
                provider={carItem.provider_info.name}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold text-white">Explore</span>
              </div>
            </div>
          </Link>
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
