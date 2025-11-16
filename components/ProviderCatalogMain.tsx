"use client";
import Link from "next/link";
import ProviderCard from "./ProviderCard";
import { ProviderItem, ProviderJson } from "interfaces";
const MAX_PROVIDERS_DISPLAYED = 3;

export default async function ProviderCatalogMain({
  providerJson,
}: {
  providerJson: ProviderJson;
}) {
  const providerJsonReady = await providerJson;

  return (
    <>
      <div className="w-full h-auto flex flex-wrap justify-center gap-10 p-4 overflow-x-hidden font-robotoMono">
        {providerJsonReady.data
          .slice(0, Math.min(providerJsonReady.data.length, 4))
          .map((providerItem: ProviderItem, index) => (
            <Link
              href={`/provider/${providerItem.id}`}
              key={providerItem.id}
              className={`w-[17vw] group opacity-0 transition-transform duration-1000 animate-slide-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="border border-gray-300 bg-white relative group hover:scale-105 transition-all ease-in-out shadow-md hover:shadow-lg">
                <ProviderCard
                  providerName={providerItem.name}
                  imgSrc={providerItem.picture}
                  email={providerItem.email}
                  phoneNum={providerItem.tel}
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
