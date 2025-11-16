import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function finishRent(token: string, id: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/rents/finish/${id}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
