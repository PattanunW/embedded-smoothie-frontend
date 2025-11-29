"use client";

import { useEffect, useState, useCallback } from "react";
import { ref, onValue, set } from "firebase/database";
import { getFirebaseDb } from "./firebaseClient";

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

export function useFarmData() {
  const [data, setData] = useState<FarmData>(initialData);

  useEffect(() => {
    const db = getFirebaseDb();
    const dbRef = ref(db, "farm/latest"); // path เดิมจาก index.html

    const unsub = onValue(dbRef, (snapshot) => {
      const raw = snapshot.val() || {};
      setData((prev) => ({
        ...prev,
        hum: raw.hum ?? null,
        temp: raw.temp ?? null,
        light: raw.light ?? null,
        soil: raw.soil ?? null,
        rain: raw.rain ?? null,
        uv: raw.uv ?? null,
        alertOn: !!raw.alertOn,
        pumpOn: !!raw.pumpOn,
      }));
    });

    return () => unsub();
  }, []);

  const togglePump = useCallback(() => {
    const db = getFirebaseDb();
    set(ref(db, "farm/latest/pumpOn"), !data.pumpOn);
  }, [data.pumpOn]);

  return { data, togglePump };
}