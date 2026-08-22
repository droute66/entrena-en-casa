import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getWorkout } from "./data/workouts";
import { useProgress } from "./hooks/useProgress";
import { HomeScreen } from "./components/HomeScreen";
import { WorkoutScreen } from "./components/WorkoutScreen";
import { IconBolt, IconDumbbell } from "./components/Icons";

type View = { name: "home" } | { name: "workout"; day: number };

export default function App() {
  const progress = useProgress();
  const [view, setView] = useState<View>({ name: "home" });
  const [confirmReset, setConfirmReset] = useState(false);

  const viewKey = view.name === "workout" ? `workout-${view.day}` : "home";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [viewKey]);

  useEffect(() => {
    if (!confirmReset) return;
    const t = window.setTimeout(() => setConfirmReset(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmReset]);

  const goHome = () => setView({ name: "home" });
  const openDay = (day: number) => {
    if (progress.isUnlocked(day)) setView({ name: "workout", day });
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

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fondo ambiental */}
      <div className="pointer-events-none fixed inset-0 bg-dots-light opacity-40" aria-hidden />

      {/* Cabecera */}
      <header className="sticky top-0 z-40 bg-chalk/90 backdrop-blur border-b-2 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-2.5 group"
            aria-label="Ir a la pantalla de inicio"
          >
            <span className="w-10 h-10 bg-pine border-2 border-ink rounded-lg grid place-items-center text-lime shadow-chalk-sm transition-transform group-hover:-rotate-6 group-hover:-translate-y-0.5">
              <IconDumbbell className="w-6 h-6" />
            </span>
            <span className="font-display text-2xl tracking-[0.06em] leading-none">
              ENTRENA <span className="text-flame">EN CASA</span>
            </span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-[11px] font-bold tracking-[0.2em] text-smoke">
              PROGRESO
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => openDay(d)}
                  disabled={!progress.isUnlocked(d)}
                  title={
                    progress.isCompleted(d)
                      ? `Día ${d} completado`
                      : progress.isUnlocked(d)
                      ? `Ir al Día ${d}`
                      : `Día ${d} bloqueado`
                  }
                  aria-label={`Día ${d}`}
                  className={`h-3 w-8 rounded-full border-2 border-ink transition-all duration-500 ${
                    progress.isCompleted(d)
                      ? "bg-flame"
                      : progress.isUnlocked(d)
                      ? "bg-lime hover:-translate-y-0.5"
                      : "bg-mist cursor-not-allowed"
                  }`}
                />
              ))}
            </div>
            <span className="font-display text-2xl leading-none">
              {progress.progressCount}
              <span className="text-smoke text-lg">/3</span>
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
              <HomeScreen progress={progress} onStart={openDay} />
            ) : (
              <WorkoutScreen
                workout={getWorkout(view.day)}
                isCompleted={progress.isCompleted(view.day)}
                completedDays={progress.completedDays}
                progressCount={progress.progressCount}
                onBack={goHome}
                onComplete={progress.completeDay}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pie */}
      <footer className="relative mt-auto bg-pine-deep text-chalk border-t-2 border-ink">
        <div className="absolute inset-0 bg-diag-dark" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 bg-lime border-2 border-ink rounded-lg grid place-items-center text-ink">
              <IconBolt className="w-5 h-5" />
            </span>
            <div>
              <p className="font-display text-xl leading-none tracking-[0.06em]">
                ENTRENA EN CASA
              </p>
              <p className="text-xs text-chalk/60 mt-1">
                Hecho para moverte sin salir de tu salón.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                confirmReset
                  ? "bg-flame border-ink text-chalk animate-pop"
                  : "border-chalk/35 text-chalk/80 hover:border-lime hover:text-lime"
              }`}
            >
              {confirmReset ? "¿Seguro? Pulsa de nuevo para borrar" : "Reiniciar progreso"}
            </button>
            <p className="text-[11px] text-chalk/50">
              Tu progreso se guarda automáticamente en este dispositivo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
