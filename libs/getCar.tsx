import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getCar(id: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/cars/${id}`, {
    next: { tags: ["car"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
