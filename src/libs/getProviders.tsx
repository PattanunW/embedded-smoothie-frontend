import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getProviders() {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/providers`, {
    next: { tags: ["providers"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
