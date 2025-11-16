import { useBaseUrl } from "@/utils/useBaseUrl";

export default async function userRegister(
  userEmail: string,
  userPassword: string,
  userTel: string,
  userName: string
) {
  const baseUrl = useBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
      tel: userTel,
      name: userName,
      role: "user",
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to register");
  }
  return await response.json();
}
