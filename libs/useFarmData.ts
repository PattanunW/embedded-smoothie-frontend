"use client";

import { useEffect, useState, useCallback } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

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

async function fetchFarmStatus(): Promise<FarmData> {
  const res = await fetch(`${API_BASE_URL}/api/status`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch farm status");
  }

  return res.json();
}

async function sendPumpCommand(command: "on" | "off") {
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

export function useFarmData() {
  const [data, setData] = useState<FarmData>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const status = await fetchFarmStatus();
      setData(status);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Cannot fetch farm status from backend");
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

  const togglePump = useCallback(async () => {
    try {
      const newCommand = data.pumpOn ? "off" : "on";
      await sendPumpCommand(newCommand);
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to toggle pump");
    }
  }, [data.pumpOn, loadData]);

  return { data, loading, error, togglePump };
}