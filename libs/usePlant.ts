"use client";

import { useState, useCallback, useEffect } from "react";
import { fetchPlants, fetchPlant, createPlant, updatePlant, deletePlant } from "./api";
import type { Plant } from "./api";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlants = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPlants();
      setPlants(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Cannot fetch plants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlants();
  }, [loadPlants]);

  return {
    plants,
    loading,
    error,
    refresh: loadPlants,
  };
}

// Hook สำหรับ plant เดี่ยว
export function usePlant(id: string) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlant = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPlant(id);
      setPlant(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Cannot fetch plant");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPlant();
  }, [loadPlant]);

  return {
    plant,
    loading,
    error,
    refresh: loadPlant,
  };
}

// CRUD actions
export function usePlantActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: Omit<Plant, "id">) => {
    try {
      setLoading(true);
      await createPlant(payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create plant");
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, payload: Partial<Plant>) => {
    try {
      setLoading(true);
      await updatePlant(id, payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update plant");
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deletePlant(id);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete plant");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    create,
    update,
    remove,
    loading,
    error,
  };
}