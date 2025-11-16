import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getProvider(id: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/providers/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
