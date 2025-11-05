"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { CarItem, CarJson } from "interfaces";
export default async function CarCatalog({ carJson }: { carJson: CarJson }) {
  const carJsonReady = await carJson;
  return (
    <>
      {/* Header */}
      <div className="w-full max-w-screen-xl mx-auto px-4 mb-6 flex justify-between items-center font-robotoMono text-left">
        <h2 className="text-black text-2xl  tracking-widest font-robotoMono">
          PICK YOUR CAR FOR NEW EXPERIENCE
        </h2>
        <div className="border-t border-black w-8 px-4 mr-auto"></div>
        <Link
          href="/car"
          className="text-black border border-black px-4 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
        >
          View all
        </Link>
      </div>

      {/* Card Layout */}
      <div className="w-full h-auto flex flex-wrap justify-center gap-10 p-4 overflow-x-hidden font-robotoMono">
        {carJsonReady.data
          .slice(0, Math.min(carJsonReady.data.length, 4))
          .map((carItem: CarItem, index) => (
            <Link
              href={`/car/${carItem.id}`}
              key={carItem.id}
              className={`w-[17vw] group opacity-0 transition-transform duration-1000 animate-slide-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="border border-gray-300 bg-white relative group hover:scale-105 transition-all ease-in-out shadow-md hover:shadow-lg">
                <ProductCard
                  Name={carItem.name}
                  imgSrc={carItem.picture}
                  price={carItem.pricePerDay.toString()}
                  provider={carItem.provider_info.name}
                  rating={carItem.averageRating}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xl font-bold text-white">Explore</span>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Global animation styles */}
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
