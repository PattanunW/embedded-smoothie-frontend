// lib/useBaseUrl.js
export const useBaseUrl = () => {
  if (typeof window !== "undefined") {
    // ถ้าอยู่ใน client-side (browser)
    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"; // ใช้ localhost ในเครื่อง
  } else {
    // ถ้าอยู่ใน server-side (Node.js server)
    return process.env.BACKEND_URL || "http://backend:5000"; // ใช้ backend ใน Docker
  }
};
