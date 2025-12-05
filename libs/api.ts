const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

export interface Plant {
  id: string;
  [key: string]: any;
}

// Get all plants
export async function fetchPlants(): Promise<Plant[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/plants`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch plants");
  }

  const body = await res.json();
  return body.data as Plant[];
}

// Get a single plant by ID
export async function fetchPlant(id: string): Promise<Plant> {
  const res = await fetch(`${API_BASE_URL}/api/v1/plants/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch plant with id ${id}`);
  }

  const body = await res.json();
  return body.data as Plant;
}

// Create a new plant
export async function createPlant(payload: Omit<Plant, "id">) {
  const res = await fetch(`${API_BASE_URL}/api/v1/plants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create plant");
  }

  return res.json();
}

// Update an existing plant
export async function updatePlant(id: string, payload: Partial<Plant>) {
  const res = await fetch(`${API_BASE_URL}/api/v1/plants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to update plant with id ${id}`);
  }

  return res.json();
}

// Delete a plant
export async function deletePlant(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/plants/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete plant with id ${id}`);
  }

  return res.json();
}