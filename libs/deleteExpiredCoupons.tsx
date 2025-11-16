import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function deleteExpiredCoupons(token: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/coupons/expired`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
