import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const STORAGE_KEY = "entrena-en-casa:reto-30-dias:v2";
const TOTAL_SESSIONS = 16;

function loadCompleted(): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (n): n is number =>
          typeof n === "number" &&
          Number.isInteger(n) &&
          n >= 1 &&
          n <= TOTAL_SESSIONS
      )
      .filter((n, index, array) => array.indexOf(n) === index)
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

export function useProgress() {
  const [completedSessions, setCompletedSessions] =
    useState<number[]>(loadCompleted);

  const [loadingProgress, setLoadingProgress] = useState(true);

  // Cargar progreso del usuario desde Supabase
  useEffect(() => {
    let active = true;

    async function loadProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (active) setLoadingProgress(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_progress")
        .select("session")
        .eq("user_id", user.id)
        .order("session", { ascending: true });

      if (!error && data && active) {
        const sessions = data
          .map((row) => row.session)
          .filter(
            (session): session is number =>
              typeof session === "number" &&
              Number.isInteger(session) &&
              session >= 1 &&
              session <= TOTAL_SESSIONS
          );

        setCompletedSessions(sessions);

        try {
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(sessions)
          );
        } catch {
          // Ignore storage errors.
        }
      }

      if (active) setLoadingProgress(false);
    }

    loadProgress();

    return () => {
      active = false;
    };
  }, []);

  // Guardar una sesión completada
  const completeSession = useCallback(async (session: number) => {
    if (
      !Number.isInteger(session) ||
      session < 1 ||
      session > TOTAL_SESSIONS
    ) {
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setCompletedSessions((prev) => {
      const nextSession = prev.length + 1;

      if (session !== nextSession) {
        return prev;
      }

      return [...prev, session];
    });

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        session,
      },
      {
        onConflict: "user_id,session",
      }
    );

    if (error) {
      console.error("Error guardando progreso:", error);
    }
  }, []);

  // Guardar progreso actualizado en localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(completedSessions)
      );
    } catch {
      // Ignore storage errors.
    }
  }, [completedSessions]);

  const resetAll = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("user_progress")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error eliminando progreso:", error);
      }
    }

    setCompletedSessions([]);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const isCompleted = useCallback(
    (session: number) => completedSessions.includes(session),
    [completedSessions]
  );

  const isUnlocked = useCallback(
    (session: number) => {
      if (session === 1) return true;
      return completedSessions.includes(session - 1);
    },
    [completedSessions]
  );

  const nextSession =
    completedSessions.length < TOTAL_SESSIONS
      ? completedSessions.length + 1
      : null;

  const currentWeek: 1 | 2 | 3 | 4 =
    nextSession === null
      ? 4
      : (Math.ceil(nextSession / 4) as 1 | 2 | 3 | 4);

  const currentDay =
    nextSession === null ? 4 : ((nextSession - 1) % 4) + 1;

  const progressCount = completedSessions.length;

  const isChallengeComplete =
    completedSessions.length === TOTAL_SESSIONS;

  const getSessionNumber = useCallback(
    (week: number, day: number) => {
      if (
        !Number.isInteger(week) ||
        !Number.isInteger(day) ||
        week < 1 ||
        week > 4 ||
        day < 1 ||
        day > 4
      ) {
        return null;
      }

      return (week - 1) * 4 + day;
    },
    []
  );

  const isWeekDayCompleted = useCallback(
    (week: number, day: number) => {
      const session = getSessionNumber(week, day);

      if (session === null) return false;

      return completedSessions.includes(session);
    },
    [completedSessions, getSessionNumber]
  );

  const isWeekDayUnlocked = useCallback(
    (week: number, day: number) => {
      const session = getSessionNumber(week, day);

      if (session === null) return false;

      return isUnlocked(session);
    },
    [getSessionNumber, isUnlocked]
  );

  return {
    completedSessions,
    progressCount,
    currentWeek,
    currentDay,
    nextSession,
    isChallengeComplete,
    completeSession,
    resetAll,
    isCompleted,
    isUnlocked,
    getSessionNumber,
    isWeekDayCompleted,
    isWeekDayUnlocked,
    totalSessions: TOTAL_SESSIONS,
    loadingProgress,
  };
}

export type ProgressApi = ReturnType<typeof useProgress>;