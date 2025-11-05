import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function getAugitLogs(token: string) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/auditlogs`, {
    next: { tags: ["auditlogs"] },
    cache: "no-store",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
