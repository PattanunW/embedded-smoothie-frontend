import CarCatalog from "@/components/CarCatalog";
import getCars from "@/libs/getCars";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
export default async function Car() {
  const cars = await getCars();
  revalidateTag("cars");
  return (
    <main className="text-center p-5">
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <CarCatalog carJson={cars} />
      </Suspense>
    </main>
  );
}
