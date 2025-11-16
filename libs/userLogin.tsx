import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return await response.json();
}
