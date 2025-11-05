import getCars from "@/libs/getCars";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import CarCatalogOfProvider from "@/components/CarCatalogOfProvider";
export default async function CarOfProvider({params}:{params:{pid:string}}) {
  const cars = await getCars();
  revalidateTag("cars");
  return (
    <main className="text-center p-5 pt-0">
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <CarCatalogOfProvider carJson={cars} pid={params.pid}/>
      </Suspense>
    </main>
  );
}
