import ButtonsMain from "@/components/ButtonsMain";
import PlantCatalogMain from "@/components/CarCatalogMain";
import HeadSection from "@/components/HeadSection";
import getPlants from "@/libs/getCars";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import Footer from "@/components/Footer";

export default async function Home() {
  const plants = await getPlants();
  revalidateTag("providers");

  return (
    <main className="bg-white min-h-screen">
      <HeadSection />

      <div className="py-10 white">
        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
          <PlantCatalogMain carJson={plants} />
        </Suspense>
      </div>

      <div className="w-full h-[490px] bg-[#800000]"></div>

      <div className="text-center py-20 items-center bg-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 mb-6 flex justify-between items-center font-robotoMono">
          <h2 className="text-black text-2xl  tracking-widest font-robotoMono">
            PICK YOUR PROVIDER FOR NEW EXPERIENCE
          </h2>
          <div className="border-t border-black w-8 px-4 mr-auto"></div>
          <Link
            href="/provider"
            className="text-black border border-black px-4 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            View all
          </Link>
        </div>

        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
        </Suspense>
      </div>
    </main>
  );
}
