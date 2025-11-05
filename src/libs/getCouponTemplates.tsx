import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getCouponTemplates() {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/coupon-templates`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
