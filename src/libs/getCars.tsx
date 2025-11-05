import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getCars() {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/cars`, {
    next: { tags: ["cars"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  return await response.json();
}
