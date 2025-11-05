import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function updateRating(
  token: string,
  id: string,
  car_rating: number,
  provider_rating: number,
  review: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/ratings/${id}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car_rating: car_rating,
      provider_rating: provider_rating,
      review: review,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update rating");
  }

  return await response.json();
}
