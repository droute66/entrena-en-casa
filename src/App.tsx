import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getWorkout } from "./data/workouts";
import { useProgress } from "./hooks/useProgress";
import { HomeScreen } from "./components/HomeScreen";
import { WorkoutScreen } from "./components/WorkoutScreen";
import { IconBolt, IconDumbbell } from "./components/Icons";
import { supabase } from "./lib/supabase";
import { AuthScreen } from "./components/AuthScreen";
import { ResetPasswordScreen } from "./components/ResetPasswordScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";

type View =
  | { name: "home" }
  | { name: "workout"; week: number; day: number }
  | { name: "forgot-password" };

export default function App() {
  const progress = useProgress();
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [view, setView] = useState<View>(() => {
    if (window.location.pathname === "/forgot-password") {
      return { name: "forgot-password" };
    }

    return { name: "home" };
  });

  const [confirmReset, setConfirmReset] = useState(false);

  const viewKey =
    view.name === "workout"
      ? "workout-" + view.week + "-" + view.day
      : view.name;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [viewKey]);

  useEffect(() => {
    if (!confirmReset) return;

    const timer = window.setTimeout(() => {
      setConfirmReset(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [confirmReset]);

  const goHome = () => {
    window.history.pushState({}, "", "/");
    setView({ name: "home" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const openWorkout = (week: number, day: number) => {
    if (!progress.isWeekDayUnlocked(week, day)) {
      return;
    }

    setView({
      name: "workout",
      week,
      day,
    });
  };

  const handleComplete = (week: number, day: number) => {
    const session = progress.getSessionNumber(week, day);

    if (session !== null) {
      progress.completeSession(session);
    }
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }

    progress.resetAll();
    setConfirmReset(false);
    setView({ name: "home" });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-chalk">
        <p className="font-bold text-ink">Cargando...</p>
      </div>
    );
  }

  if (window.location.pathname === "/reset-password") {
    return <ResetPasswordScreen />;
  }

  if (view.name === "forgot-password") {
    return <ForgotPasswordScreen />;
  }

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fondo ambiental */}
      <div
        className="pointer-events-none fixed inset-0 bg-dots-light opacity-40"
        aria-hidden
      />

      {/* Cabecera */}
      <header className="sticky top-0 z-40 bg-chalk/90 backdrop-blur border-b-2 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-2.5 group"
            aria-label="Ir al menú principal"
          >
            <span className="w-10 h-10 bg-pine border-2 border-ink rounded-lg grid place-items-center text-lime shadow-chalk-sm transition-transform group-hover:-rotate-6 group-hover:-translate-y-0.5">
              <IconDumbbell className="w-6 h-6" />
            </span>

            <span className="font-display text-2xl tracking-[0.06em] leading-none">
              ENTRENA <span className="text-flame">EN CASA</span>
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end min-w-0">
            <button
              type="button"
              onClick={handleLogout}
              className="border-2 border-ink rounded-lg px-3 py-1.5 text-xs font-bold text-ink hover:bg-flame hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>

            <span className="hidden sm:block text-[11px] font-bold tracking-[0.2em] text-ink">
              PROGRESO
            </span>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((week) => {
                let completed = 0;

                for (let day = 1; day <= 4; day++) {
                  if (progress.isWeekDayCompleted(week, day)) {
                    completed++;
                  }
                }

                return (
                  <div
                    key={week}
                    title={`Semana ${week}: ${completed}/4 días`}
                    className={`h-3 w-7 rounded-full border-2 border-ink ${
                      completed === 4
                        ? "bg-flame"
                        : completed > 0
                        ? "bg-lime"
                        : "bg-mist"
                    }`}
                  />
                );
              })}
            </div>

            <span className="font-display text-2xl leading-none text-ink">
              {progress.progressCount}
              <span className="text-smoke text-lg">/16</span>
            </span>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {view.name === "home" ? (
              <HomeScreen
                progress={progress}
                onStart={openWorkout}
              />
            ) : (
              <WorkoutScreen
                workout={getWorkout(view.day)}
                week={view.week}
                isCompleted={progress.isWeekDayCompleted(
                  view.week,
                  view.day
                )}
                completedSessions={progress.completedSessions}
                progressCount={progress.progressCount}
                onBack={goHome}
                onComplete={handleComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pie */}
      <footer className="relative mt-auto bg-pine-deep text-white border-t-2 border-ink">
        <div
          className="absolute inset-0 bg-diag-dark"
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 bg-lime border-2 border-ink rounded-lg grid place-items-center text-ink">
              <IconBolt className="w-5 h-5" />
            </span>

            <div>
              <p className="font-display text-xl leading-none tracking-[0.06em] text-white">
                ENTRENA EN CASA
              </p>

              <p className="text-xs text-white/75 mt-1">
                Reto de 4 semanas · 16 entrenamientos.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                confirmReset
                  ? "bg-flame border-ink text-white animate-pop"
                  : "bg-transparent border-white/50 text-white hover:border-lime hover:text-lime"
              }`}
            >
              {confirmReset
                ? "¿Seguro? Pulsa de nuevo para borrar"
                : "Reiniciar reto"}
            </button>

            <p className="text-[11px] text-white/70">
              Tu progreso se guarda automáticamente en este dispositivo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
