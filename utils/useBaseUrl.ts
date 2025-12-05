// lib/useBaseUrl.ts
export const useBaseUrl = () => {
  if (typeof window !== "undefined") {
    // client-side
    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"; 
  } else {
    // server-side
    return process.env.BACKEND_URL || "http://backend:5001";
  }
};
