import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { getWorkout, type Workout } from "../data/workouts";
import { Quiz } from "./Quiz";
import {
  IconArrowLeft,
  IconCheck,
  IconFlame,
  IconTarget,
  IconTimer,
  IconTrophy,
  IconUnlock,
} from "./Icons";

const CONFETTI_COLORS = ["#c6f04d", "#f04a1d", "#1f4d38", "#f9faf4", "#2e6b4e"];

function celebrate() {
  confetti({
    particleCount: 130,
    spread: 80,
    origin: { y: 0.6 },
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  });
  window.setTimeout(
    () =>
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      }),
    250
  );
  window.setTimeout(
    () =>
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      }),
    450
  );
}

interface WorkoutScreenProps {
  workout: Workout;
  isCompleted: boolean;
  completedDays: number[];
  progressCount: number;
  onBack: () => void;
  onComplete: (day: number) => void;
}

export function WorkoutScreen({
  workout,
  isCompleted,
  completedDays,
  progressCount,
  onBack,
  onComplete,
}: WorkoutScreenProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  // Recuerda si el día ya estaba completado al entrar (antes de abrir el overlay)
  const [wasAlreadyCompleted] = useState(isCompleted);

  const handlePassed = () => {
    onComplete(workout.id);
    celebrate();
    setShowOverlay(true);
  };

  const nextId = (workout.id + 1) as number;
  const nextUnlocked =
    nextId <= 3 && !completedDays.includes(nextId) && completedDays.includes(workout.id);
  const isFinalDay = workout.id === 3;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Fila superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 border-2 border-ink rounded-lg bg-paper px-4 py-2 font-bold text-sm shadow-chalk-sm transition-all hover:bg-lime hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
        >
          <IconArrowLeft className="w-4 h-4" />
          Volver al plan
        </button>
        <span
          className={`inline-flex items-center gap-1.5 border-2 border-ink rounded-full px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] ${
            isCompleted ? "bg-pine text-lime" : "bg-lime text-ink"
          }`}
        >
          {isCompleted ? (
            <>
              <IconCheck className="w-3.5 h-3.5" /> DÍA COMPLETADO
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-ink animate-blink" /> EN CURSO
            </>
          )}
        </span>
      </div>

      {/* Cabecera del día */}
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 0.9, 0.3, 1] }}
        className="mt-8"
      >
        <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
          Día {workout.id} · {workout.focus}
        </p>
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] mt-2">
          {workout.title.toUpperCase()}
        </h1>
        <p className="mt-3 text-lg text-smoke max-w-2xl">{workout.tagline}</p>
        <div className="flex flex-wrap gap-2.5 mt-5">
          <span className="inline-flex items-center gap-2 border-2 border-ink rounded-full bg-paper px-4 py-1.5 text-sm font-semibold shadow-chalk-sm">
            <IconTimer className="w-4 h-4 text-pine" /> {workout.duration}
          </span>
          <span className="inline-flex items-center gap-2 border-2 border-ink rounded-full bg-paper px-4 py-1.5 text-sm font-semibold shadow-chalk-sm">
            <IconFlame className="w-4 h-4 text-flame" /> {workout.calories}
          </span>
          <span className="inline-flex items-center gap-2 border-2 border-ink rounded-full bg-paper px-4 py-1.5 text-sm font-semibold shadow-chalk-sm">
            <IconTarget className="w-4 h-4 text-pine" /> Nivel {workout.level.toLowerCase()}
          </span>
          {workout.muscles.map((m) => (
            <span
              key={m}
              className="inline-flex items-center border-2 border-mist rounded-full bg-chalk px-3.5 py-1.5 text-sm font-medium text-smoke"
            >
              {m}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Video + descripción */}
      <div className="grid gap-6 mt-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
          className="lg:col-span-3 bg-paper border-2 border-ink rounded-xl shadow-chalk overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 bg-ink text-chalk px-4 py-2.5">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em]">
              <span className="w-2.5 h-2.5 rounded-full bg-flame animate-blink" />
              VIDEO GUÍA · EJEMPLO
            </span>
            <span className="text-xs text-chalk/70 truncate">{workout.videoLabel}</span>
          </div>
          <div className="relative aspect-video bg-ink">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${workout.videoId}?rel=0`}
              title={`Video de ejemplo: ${workout.videoLabel}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="px-4 py-3 text-xs text-smoke border-t-2 border-mist">
            Reproductor de YouTube de ejemplo — sustitúyelo por la rutina grabada que
            prefieras seguir.
          </p>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
          className="lg:col-span-2 relative overflow-hidden bg-pine-deep text-chalk border-2 border-ink rounded-xl shadow-chalk p-6 sm:p-7"
        >
          <div className="absolute inset-0 bg-diag-dark" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl text-lime leading-none">
              ¿POR QUÉ ESTE DÍA?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-chalk/85">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {workout.muscles.map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-bold uppercase tracking-wide border border-lime/50 text-lime rounded-full px-2.5 py-1"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Circuito */}
      <motion.section
        aria-label="Circuito de ejercicios"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
        className="bg-paper border-2 border-ink rounded-xl shadow-chalk p-6 sm:p-7 mt-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-4xl leading-none">EL CIRCUITO</h2>
          <span className="text-xs font-bold tracking-widest border-2 border-ink rounded-full bg-lime px-3.5 py-1.5">
            3 RONDAS · 45 S DE DESCANSO
          </span>
        </div>
        <ol className="grid gap-2.5 sm:grid-cols-2 mt-5">
          {workout.exercises.map((ex, i) => (
            <li
              key={ex.name}
              className="flex items-center gap-3 border-2 border-mist rounded-lg px-3.5 py-2.5 bg-chalk transition-colors hover:border-ink"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 bg-lime border-2 border-ink rounded-md font-display text-lg">
                {i + 1}
              </span>
              <span className="font-semibold">{ex.name}</span>
              <span className="ml-auto text-sm font-bold text-smoke whitespace-nowrap">
                {ex.reps}
              </span>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
        className="mt-6"
      >
        <Quiz
          workout={workout}
          alreadyCompleted={isCompleted}
          onPassed={handlePassed}
        />
      </motion.div>

      {/* Overlay de éxito */}
      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Entrenamiento completado"
        >
          <div
            className="absolute inset-0 bg-ink/85"
            onClick={() => setShowOverlay(false)}
          />
          <motion.div
            initial={{ scale: 0.85, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.05 }}
            className="relative bg-chalk border-2 border-ink rounded-xl shadow-chalk-lime max-w-md w-full p-8 text-center animate-pop"
          >
            <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto" aria-hidden>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="rgba(198,240,77,0.4)"
                stroke="#2e6b4e"
                strokeWidth="6"
                className="draw-circle"
              />
              <path
                d="M38 62 l16 16 l30 -34"
                fill="none"
                stroke="#1f4d38"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="draw-check"
              />
            </svg>

            <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase mt-4">
              Día {workout.id} · {workout.focus}
            </p>
            <h2 className="font-display text-6xl leading-[0.9] mt-1">
              ¡COMPLETADO!
            </h2>
            <p className="mt-3 text-smoke text-sm leading-relaxed">
              Circuito hecho y quiz superado{wasAlreadyCompleted ? " otra vez" : ""}. Tu
              progreso quedó guardado en este dispositivo.
            </p>

            <div className="mt-4 flex flex-col items-center gap-2.5">
              {nextUnlocked && (
                <span className="inline-flex items-center gap-2 bg-lime border-2 border-ink rounded-lg px-4 py-2 font-bold text-sm animate-fade-up">
                  <IconUnlock className="w-5 h-5" />
                  Día {nextId} desbloqueado: {getWorkout(nextId).title}
                </span>
              )}
              {isFinalDay && (
                <span className="inline-flex items-center gap-2 bg-pine text-lime border-2 border-ink rounded-lg px-4 py-2 font-bold text-sm animate-fade-up">
                  <IconTrophy className="w-5 h-5" />
                  Rutina semanal completa: 3 de 3
                </span>
              )}
              <p className="text-xs font-bold tracking-widest text-smoke">
                PROGRESO: {progressCount}/3 DÍAS
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 bg-flame text-chalk border-2 border-ink rounded-lg px-6 py-3 font-bold shadow-chalk-sm transition-all hover:bg-flame-deep hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                Volver al plan
              </button>
              <button
                type="button"
                onClick={() => setShowOverlay(false)}
                className="inline-flex items-center gap-2 border-2 border-ink rounded-lg bg-paper px-6 py-3 font-bold transition-colors hover:bg-lime"
              >
                Revisar el día
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
