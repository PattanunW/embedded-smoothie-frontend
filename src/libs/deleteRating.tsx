import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function deleteRating(token: string, id: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/ratings/${id}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete rating");
  }

  return await response.json();
}
