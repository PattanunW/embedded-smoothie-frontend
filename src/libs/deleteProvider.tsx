import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function deleteProvider(token: string, id: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/providers/${id}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
