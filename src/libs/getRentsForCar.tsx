import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getRentsForCar(token: string, cid: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/cars/${cid}/rents`, {
    cache: "no-store",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
