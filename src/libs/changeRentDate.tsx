import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function changeRentDate(
  token: string,
  id: string,
  startDate: string,
  endDate: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/rents/${id}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: startDate,
      endDate: endDate,
    }),
  });

  const updatedReservation = await response.json();
  return updatedReservation;
}
