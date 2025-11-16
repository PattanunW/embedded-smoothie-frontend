import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getCoupons(token: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/coupons`, {
    cache: "no-store",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
