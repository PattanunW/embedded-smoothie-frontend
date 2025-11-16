import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function updateCoupon(
  token: string,
  id: string,
  percentage: Number,
  name: String,
  maxDiscount: Number,
  minSpend: Number,
  expirationDate: Date,
  status: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/coupons/${id}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      percentage: percentage,
      name,
      maxDiscount: maxDiscount,
      minSpend: minSpend,
      expirationDate: expirationDate,
      status: status,
    }),
  });

  const updatedCoupon = await response.json();
  return updatedCoupon;
}
