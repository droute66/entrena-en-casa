import { useState } from "react";
import { WORKOUTS, getWorkout, type Workout } from "../data/workouts";
import type { ProgressApi } from "../hooks/useProgress";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconFlame,
  IconLock,
  IconRepeat,
  IconTarget,
  IconTimer,
  IconTrophy,
} from "./Icons";

/* ---------- Cinta transportadora de ejercicios ---------- */

const MARQUEE_WORDS = [
  "Sentadillas",
  "Flexiones",
  "Burpees",
  "Zancadas",
  "Planchas",
  "Remo con mochila",
  "Puente de glúteo",
  "Jumping jacks",
  "Mountain climbers",
  "Pike press",
];

function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((w) => (
        <span key={`${key}-${w}`} className="flex items-center">
          <span className="font-display text-xl tracking-[0.12em] text-chalk px-5">
            {w}
          </span>
          <IconBolt className="w-4 h-4 text-ink" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="bg-flame border-y-2 border-ink py-2.5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ---------- Insignia giratoria ---------- */

function RotatingBadge() {
  return (
    <div
      className="absolute -top-9 -right-4 sm:-right-7 w-24 h-24 sm:w-28 sm:h-28 animate-spin-slower"
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[3px_3px_0_rgba(26,31,27,0.9)]">
        <defs>
          <path
            id="badge-circle"
            d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          />
        </defs>
        <circle cx="50" cy="50" r="48" className="fill-ink stroke-lime" strokeWidth="2.5" />
        <text
          className="fill-lime"
          style={{ fontSize: "10px", letterSpacing: "1.8px", fontWeight: 700 }}
        >
          <textPath href="#badge-circle">
            SIN GIMNASIO · SIN EXCUSAS · 3 DÍAS ·
          </textPath>
        </text>
      </svg>
      <IconBolt className="absolute inset-0 m-auto w-8 h-8 text-lime" />
    </div>
  );
}

/* ---------- Tarjeta de día ---------- */

interface DayCardProps {
  workout: Workout;
  index: number;
  completed: boolean;
  unlocked: boolean;
  onStart: (day: number) => void;
}

function DayCard({ workout, index, completed, unlocked, onStart }: DayCardProps) {
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const lockedClick = () => {
    setShake(true);
    setShowHint(true);
    window.setTimeout(() => setShake(false), 550);
  };

  const num = String(workout.id).padStart(2, "0");

  return (
    <DayCardShell
      index={index}
      shake={shake}
      locked={!unlocked}
      onActivate={() => (unlocked ? onStart(workout.id) : lockedClick())}
    >
      <div
        className={`grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center p-5 sm:p-6 transition-colors duration-300 ${
          unlocked ? "group-hover:bg-lime/10" : ""
        }`}
      >
        {/* Número gigante */}
        <div className="flex items-center gap-4 md:block">
          <span
            className={`font-display text-[88px] leading-[0.78] transition-colors duration-300 select-none ${
              completed
                ? "text-pine"
                : unlocked
                ? "text-mist group-hover:text-flame"
                : "text-mist/60"
            }`}
          >
            {num}
          </span>
        </div>

        {/* Información */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-xs font-bold tracking-[0.22em] text-flame uppercase">
              Día {workout.id} · {workout.focus}
            </p>
            <StatusPill completed={completed} unlocked={unlocked} />
          </div>
          <h3
            className={`font-display text-4xl sm:text-[44px] leading-[0.95] mt-1 ${
              unlocked ? "text-ink" : "text-smoke/70"
            }`}
          >
            {workout.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {workout.muscles.map((m) => (
              <span
                key={m}
                className="text-[11px] font-semibold uppercase tracking-wide border border-mist bg-chalk rounded-full px-2.5 py-0.5 text-smoke"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm font-medium text-smoke">
            <span className="inline-flex items-center gap-1.5">
              <IconTimer className="w-4 h-4 text-pine" /> {workout.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconFlame className="w-4 h-4 text-flame" /> {workout.calories}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconTarget className="w-4 h-4 text-pine" /> Nivel {workout.level.toLowerCase()}
            </span>
          </div>
          {showHint && !unlocked && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-deep animate-fade-up">
              <IconLock className="w-4 h-4" /> Completa el Día {workout.id - 1} para desbloquear
            </p>
          )}
        </div>

        {/* Acción */}
        <div className="md:pl-4">
          {completed ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStart(workout.id);
              }}
              className="group/btn inline-flex items-center gap-2 bg-paper border-2 border-ink rounded-lg px-6 py-3 font-bold text-ink shadow-chalk-sm transition-all hover:bg-lime hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              <IconRepeat className="w-5 h-5" />
              Repasar
            </button>
          ) : unlocked ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStart(workout.id);
              }}
              className="inline-flex items-center gap-2 bg-flame text-chalk border-2 border-ink rounded-lg px-7 py-3 font-bold shadow-chalk-sm transition-all hover:bg-flame-deep hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Comenzar
              <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                lockedClick();
              }}
              className="inline-flex items-center gap-2 bg-chalk text-smoke border-2 border-dashed border-smoke/50 rounded-lg px-6 py-3 font-bold cursor-not-allowed"
            >
              <IconLock className="w-5 h-5" />
              Bloqueado
            </button>
          )}
        </div>
      </div>
    </DayCardShell>
  );
}

/* Envoltorio con animación de entrada + clic en toda la tarjeta */
import { motion } from "framer-motion";

function DayCardShell({
  index,
  shake,
  locked,
  onActivate,
  children,
}: {
  index: number;
  shake: boolean;
  locked: boolean;
  onActivate: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.09, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      aria-label={`Entrenamiento día ${index + 1}`}
      className={`group relative bg-paper border-2 border-ink rounded-xl shadow-chalk transition-all duration-300 ${
        shake ? "animate-shake" : ""
      } ${
        locked
          ? "cursor-not-allowed bg-chalk"
          : "cursor-pointer hover:-translate-y-1.5 hover:shadow-[9px_9px_0_0_var(--color-ink)]"
      }`}
    >
      {children}
    </motion.article>
  );
}

function StatusPill({ completed, unlocked }: { completed: boolean; unlocked: boolean }) {
  if (completed) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-pine text-lime border-2 border-ink rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
        <IconCheck className="w-3.5 h-3.5" /> COMPLETADO
      </span>
    );
  }
  if (unlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-lime text-ink border-2 border-ink rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
        <span className="w-2 h-2 rounded-full bg-ink animate-blink" /> DISPONIBLE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-chalk text-smoke border-2 border-smoke/50 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
      <IconLock className="w-3.5 h-3.5" /> BLOQUEADO
    </span>
  );
}

/* ---------- Pantalla de inicio ---------- */

export function HomeScreen({
  progress,
  onStart,
}: {
  progress: ProgressApi;
  onStart: (day: number) => void;
}) {
  const { progressCount, nextDay, isCompleted, isUnlocked } = progress;
  const allDone = progressCount === 3;
  const nextWorkout = nextDay ? getWorkout(nextDay) : null;

  const goToPlan = () =>
    document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Masthead */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1] }}
        className="relative mt-6 overflow-hidden bg-pine-deep text-chalk border-2 border-ink rounded-xl shadow-chalk-lime"
      >
        <div className="absolute inset-0 bg-diag-dark" aria-hidden />
        <div className="absolute inset-0 bg-dots-dark opacity-60" aria-hidden />
        <IconBolt
          className="absolute right-[6%] top-8 w-24 h-24 text-lime/15 animate-float"
          style={{ "--fl-rot": "14deg" } as React.CSSProperties}
          aria-hidden
        />
        <div
          className="absolute -left-14 -bottom-16 w-52 h-52 rounded-full border-[16px] border-lime/10"
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] p-6 sm:p-10 lg:p-12">
          <div>
            <p className="inline-flex items-center gap-2 border-2 border-lime/70 text-lime rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em]">
              <IconBolt className="w-4 h-4" /> RUTINA SEMANAL · 3 DÍAS · SIN MATERIAL
            </p>
            <h1 className="font-display leading-[0.85] mt-5 text-[clamp(4rem,11vw,7.5rem)]">
              ENTRENA
              <br />
              <span className="text-hollow">EN CASA</span>
            </h1>
            <p className="mt-5 max-w-lg text-chalk/80 text-base sm:text-lg leading-relaxed">
              Tres sesiones cortas para construir fuerza de verdad: piernas, torso y un
              reto final de cuerpo completo. Mira el video, completa el circuito y
              demuestra lo que sabes en el quiz.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-chalk/75">
              {[
                ["01", "Mira la técnica"],
                ["02", "Haz el circuito"],
                ["03", "Supera el quiz"],
              ].map(([n, label]) => (
                <span key={n} className="inline-flex items-center gap-2">
                  <span className="font-display text-xl text-lime">{n}</span> {label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {!allDone && nextWorkout ? (
                <button
                  type="button"
                  onClick={() => onStart(nextWorkout.id)}
                  className="inline-flex items-center gap-2 bg-lime text-ink border-2 border-ink rounded-lg px-7 py-3.5 font-bold shadow-[5px_5px_0_0_rgba(26,31,27,0.85)] transition-all hover:-translate-y-0.5 hover:bg-lime-deep active:translate-y-0 active:shadow-none"
                >
                  Comenzar Día {nextWorkout.id} — {nextWorkout.title}
                  <IconArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 bg-lime text-ink border-2 border-ink rounded-lg px-6 py-3.5 font-bold shadow-[5px_5px_0_0_rgba(26,31,27,0.85)]">
                  <IconTrophy className="w-5 h-5" /> ¡Rutina completa!
                </span>
              )}
              <button
                type="button"
                onClick={goToPlan}
                className="inline-flex items-center gap-2 text-chalk border-2 border-chalk/40 rounded-lg px-6 py-3.5 font-bold transition-colors hover:border-lime hover:text-lime"
              >
                Ver el plan
              </button>
            </div>
          </div>

          {/* Sticker de progreso */}
          <div className="relative flex lg:justify-end items-start lg:pt-2">
            <div className="relative w-full max-w-xs rotate-2 bg-lime text-ink border-2 border-ink rounded-xl shadow-chalk p-6 bg-diag-lime transition-transform duration-300 hover:rotate-0">
              <RotatingBadge />
              <p className="text-xs font-bold tracking-[0.22em]">PROGRESO SEMANAL</p>
              <p className="font-display text-[88px] leading-[0.85] mt-2">
                {progressCount}
                <span className="text-5xl text-ink/60">/3</span>
              </p>
              <div className="flex gap-1.5 mt-4" role="img" aria-label={`${progressCount} de 3 días completados`}>
                {[1, 2, 3].map((d) => (
                  <div
                    key={d}
                    className={`h-3.5 flex-1 rounded-full border-2 border-ink transition-colors duration-500 ${
                      isCompleted(d)
                        ? "bg-pine"
                        : nextDay === d
                        ? "bg-paper animate-pulse"
                        : "bg-paper/60"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink/80">
                {allDone
                  ? "Los 3 días completados. ¡Eres imparable!"
                  : nextWorkout
                  ? `Siguiente parada: Día ${nextWorkout.id} — ${nextWorkout.title}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      </div>

      <div className="mt-8">
        <Marquee />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* El plan */}
      <section id="plan" className="scroll-mt-24 mt-12 sm:mt-14 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
              Elige tu día
            </p>
            <h2 className="font-display text-5xl sm:text-6xl leading-[0.9] mt-1">
              EL PLAN DE LA SEMANA
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 border-2 border-ink rounded-full bg-paper px-4 py-1.5 text-sm font-bold shadow-chalk-sm">
            <IconCheck className="w-4 h-4 text-pine" />
            {progressCount}/3 completados
          </span>
        </motion.div>

        <div className="space-y-5 mt-8">
          {WORKOUTS.map((w, i) => (
            <DayCard
              key={w.id}
              workout={w}
              index={i}
              completed={isCompleted(w.id)}
              unlocked={isUnlocked(w.id)}
              onStart={onStart}
            />
          ))}
        </div>

        <p className="mt-8 text-sm text-smoke flex items-center gap-2">
          <IconLock className="w-4 h-4" />
          Cada día se desbloquea al completar el anterior. El quiz exige 3/3 para dar el día por hecho.
        </p>
      </section>
      </div>
    </div>
  );
}
