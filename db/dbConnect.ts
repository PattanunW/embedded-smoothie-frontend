const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// GET data
export const getData = async (path: string) => {
  const res = await fetch(`${API_BASE}/data?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

// SET data
export const setData = async (path: string, data: any) => {
  const res = await fetch(`${API_BASE}/data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, data }),
  });
  if (!res.ok) throw new Error("Failed to set data");
  return res.json();
};

// PUSH data
export const pushData = async (path: string, data: any) => {
  const res = await fetch(`${API_BASE}/data/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, data }),
  });
  if (!res.ok) throw new Error("Failed to push data");
  return res.json();
};
