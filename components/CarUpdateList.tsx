import Link from "next/link";
import ProductCard from "./ProductCard";
import { CarItem, CarJson } from "interfaces";

export default async function CarUpdateList({ carJson }: { carJson: CarJson }) {
  const carJsonReady = await carJson;
  return (
    <>
      <div className="text-2xl font-medium mb-6 text-black text-center font-robotoMono">
        Explore {carJsonReady.data.length} models in our catalog to be updated.
      </div>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {carJsonReady.data.map((carItem: CarItem) => (
          <Link
            href={`/manage/car/update/${carItem.id}`}
            key={carItem.id}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group"
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
              <ProductCard
                Name={carItem.name}
                imgSrc={carItem.picture}
                price={carItem.pricePerDay.toString()}
                provider={carItem.provider_info.name}
              />

              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold text-white">Update</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
