import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "entrena-en-casa:progreso:v1";
const VALID_DAYS = [1, 2, 3];

function loadCompleted(): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (n): n is number => typeof n === "number" && VALID_DAYS.includes(n)
    );
  } catch {
    return [];
  }
}

export function useProgress() {
  const [completedDays, setCompletedDays] = useState<number[]>(loadCompleted);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
    } catch {
      /* almacenamiento no disponible: la app sigue funcionando en memoria */
    }
  }, [completedDays]);

  const completeDay = useCallback((day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev : [...prev, day].sort((a, b) => a - b)
    );
  }, []);

  const resetAll = useCallback(() => {
    setCompletedDays([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const isCompleted = useCallback(
    (day: number) => completedDays.includes(day),
    [completedDays]
  );

  /** Un día se desbloquea al completar el día anterior (el Día 1 siempre está abierto). */
  const isUnlocked = useCallback(
    (day: number) => day === 1 || completedDays.includes(day - 1),
    [completedDays]
  );

  const progressCount = completedDays.length;
  const nextDay = [1, 2, 3].find((d) => !completedDays.includes(d)) ?? null;

  return {
    completedDays,
    progressCount,
    nextDay,
    completeDay,
    resetAll,
    isCompleted,
    isUnlocked,
  };
}

export type ProgressApi = ReturnType<typeof useProgress>;
