import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getRatingsForCar(carId: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/cars/${carId}/ratings`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
