import ProviderCatalog from "@/components/ProviderCatalog";
import getProviders from "@/libs/getProviders";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
export default async function Provider() {
  const providers = await getProviders();
  // console.log(providers)
  revalidateTag("providers");
  return (
    <main className="text-center p-5">
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <ProviderCatalog providerJson={providers} />
      </Suspense>
    </main>
  );
}
