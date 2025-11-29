const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function fetchFarmStatus() {
  const res = await fetch(`${API_BASE_URL}/api/status`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch farm status");
  }

  return res.json();
}

export async function sendPumpCommand(command: "on" | "off") {
  const res = await fetch(`${API_BASE_URL}/api/pump`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  });

  if (!res.ok) {
    throw new Error("Failed to control pump");
  }

  return res.json();
}