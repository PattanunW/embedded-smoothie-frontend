"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchPlants, Plant } from "./api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

export type FarmData = {
  hum: number | null;
  temp: number | null;
  light: number | null;
  soil: string | null;
  rain: string | null;
  uv: string | null;
  alertOn: boolean;
  pumpOn: boolean;
};

const initialData: FarmData = {
  hum: null,
  temp: null,
  light: null,
  soil: null,
  rain: null,
  uv: null,
  alertOn: false,
  pumpOn: false,
};

// Adapter: convert plant list from backend -> dashboard FarmData
function plantsToFarmData(plants: Plant[]): FarmData {
  const first = plants[0] ?? {};

  return {
    hum:
      typeof (first as any).hum === "number"
        ? (first as any).hum
        : null,
    temp:
      typeof (first as any).temp === "number"
        ? (first as any).temp
        : null,
    light:
      typeof (first as any).light === "number"
        ? (first as any).light
        : null,
    soil:
      typeof (first as any).soil === "string"
        ? (first as any).soil
        : null,
    rain:
      typeof (first as any).rain === "string"
        ? (first as any).rain
        : null,
    uv:
      typeof (first as any).uv === "string"
        ? (first as any).uv
        : null,
    alertOn: Boolean((first as any).alertOn) || false,
    pumpOn: Boolean((first as any).pumpOn) || false,
  };
}

export function useFarmData() {
  const [data, setData] = useState<FarmData>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const plants = await fetchPlants();
      const farmData = plantsToFarmData(plants);
      setData(farmData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Cannot fetch farm status from backend");
      setData(initialData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  // For now we keep togglePump as a no-op to avoid breaking components.
  const togglePump = useCallback(async () => {
    // If you later add /api/pump back, implement it here.
    return;
  }, []);

  return { data, loading, error, togglePump };
}