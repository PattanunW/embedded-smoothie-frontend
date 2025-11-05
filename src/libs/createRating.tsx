import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function createRating(
  token: string,
  rent_info: string,
  car_rating: number,
  provider_rating: number,
  review: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/ratings`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      rent_info: rent_info,
      car_rating: car_rating,
      provider_rating: provider_rating,
      review: review,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend Error:", errorText);
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
