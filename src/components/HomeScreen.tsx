import { useState } from "react";
import { motion } from "framer-motion";
import { WARMUPS, WORKOUTS } from "../data/workouts";
import type { ProgressApi } from "../hooks/useProgress";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconLock,
  IconRepeat,
  IconTarget,
  IconTimer,
  IconTrophy,
} from "./Icons";

interface HomeScreenProps {
  progress: ProgressApi;
  onStart: (week: number, day: number) => void;
}

export function HomeScreen({ progress, onStart }: HomeScreenProps) {
  const {
    progressCount,
    totalSessions,
    currentWeek,
    currentDay,
    isChallengeComplete,
    isWeekDayCompleted,
    isWeekDayUnlocked,
    resetAll,
  } = progress;

  const [activeWarmup, setActiveWarmup] = useState<number | null>(null);

  const getSessionNumber = (week: number, day: number) => {
    return (week - 1) * 4 + day;
  };

  const progressPercent =
    totalSessions > 0
      ? Math.min((progressCount / totalSessions) * 100, 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-10 sm:pt-14"
      >
        <div className="grid gap-6 lg:grid-cols-5">

          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
              Reto fitness · 30 días
            </p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.84] mt-3 text-white">
              ENTRENA
              <br />
              <span className="text-lime text-neon">
                EN CASA
              </span>
            </h1>

            <p className="mt-5 text-lg text-smoke max-w-2xl leading-relaxed">
              Un recorrido de 4 semanas para entrenar en casa, avanzar
              progresivamente y completar cada sesión en orden.
            </p>
          </div>

          {/* PROGRESO */}

          <div className="lg:col-span-2">
            <div className="relative overflow-hidden bg-pine-deep border-2 border-lime/30 rounded-xl shadow-chalk p-6 sm:p-7 h-full">

              <div className="absolute inset-0 bg-diag-dark" aria-hidden />

              <div className="relative">

                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-lime">
                    <IconBolt className="w-4 h-4" />
                    TU PROGRESO
                  </span>

                  <span className="font-display text-3xl text-white">
                    {progressCount}
                    <span className="text-lime text-xl">
                      /{totalSessions}
                    </span>
                  </span>
                </div>

                <div className="h-4 bg-black border-2 border-white/20 rounded-full mt-5 overflow-hidden">
                  <div
                    className="h-full bg-lime transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] font-bold">
                  <span className="text-white/80">
                    {progressCount} completadas
                  </span>

                  <span className="text-lime">
                    {Math.round(progressPercent)}%
                  </span>
                </div>

                {isChallengeComplete ? (
                  <>
                    <p className="mt-5 text-xs font-bold tracking-[0.2em] text-lime uppercase">
                      Reto completado
                    </p>

                    <p className="mt-2 text-sm text-white/85 leading-relaxed">
                      Completaste las 4 semanas. Podés volver a empezar el
                      reto desde el Día 1.
                    </p>

                    <button
                      type="button"
                      onClick={resetAll}
                      className="mt-5 inline-flex items-center gap-2 bg-lime text-black border-2 border-black rounded-lg px-5 py-2.5 font-extrabold text-sm shadow-chalk-sm transition-all hover:bg-white hover:-translate-y-0.5"
                    >
                      <IconRepeat className="w-4 h-4" />
                      Volver a empezar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-5 text-xs font-bold tracking-[0.2em] text-lime uppercase">
                      Semana {currentWeek} · Día {currentDay}
                    </p>

                    <p className="mt-2 text-sm text-white/85">
                      Tu próxima sesión está marcada para continuar el reto.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          ENTRADA EN CALOR
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
        className="mt-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">

          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
              Antes de entrenar
            </p>

            <h2 className="font-display text-5xl sm:text-6xl leading-none mt-1 text-white">
              ENTRADA EN CALOR
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 border-2 border-lime/40 rounded-full bg-pine px-3.5 py-1.5 text-xs font-bold text-white">
            <IconTimer className="w-4 h-4 text-lime" />
            4 OPCIONES · 5 MIN
          </span>
        </div>

        <p className="mt-3 text-sm text-smoke max-w-2xl">
          Elegí una de estas opciones antes de realizar tu entrenamiento.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-6">

          {WARMUPS.map((warmup, index) => (
            <motion.article
              key={warmup.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 + index * 0.05,
                duration: 0.4,
              }}
              className="bg-paper border-2 border-white/10 rounded-xl shadow-chalk-sm overflow-hidden"
            >
              <div className="p-5">

                <div className="flex items-start gap-4">

                  <span className="shrink-0 w-10 h-10 grid place-items-center bg-lime text-black border-2 border-black rounded-lg font-display text-xl">
                    {String(warmup.id).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">

                    <p className="text-xs font-bold tracking-[0.18em] text-flame uppercase">
                      Entrada en calor
                    </p>

                    <h3 className="font-display text-2xl leading-none mt-1 text-white">
                      {warmup.title}
                    </h3>

                  </div>
                </div>

                <p className="mt-4 text-sm text-smoke leading-relaxed">
                  {warmup.description}
                </p>

                <div className="flex items-center justify-between gap-3 mt-5">

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/75">
                    <IconTimer className="w-4 h-4 text-lime" />
                    {warmup.duration}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveWarmup(warmup.id)}
                    className="inline-flex items-center gap-2 bg-flame text-black border-2 border-black rounded-lg px-4 py-2 text-sm font-extrabold transition-all hover:bg-white hover:-translate-y-0.5 shadow-chalk-sm"
                  >
                    Ver video
                    <IconArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>

              {/* VIDEO */}

              {activeWarmup === warmup.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t-2 border-white/10 bg-black"
                >

                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-black">

                    <span className="text-xs font-bold tracking-[0.16em] text-lime uppercase truncate">
                      VIDEO · {warmup.title}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveWarmup(null)}
                      className="shrink-0 text-xs font-extrabold text-white bg-black border-2 border-white/50 rounded-md px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                    >
                      Cerrar video
                    </button>

                  </div>

                  <div className="relative aspect-video bg-black">

                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={
                        "https://www.youtube-nocookie.com/embed/" +
                        warmup.videoId +
                        "?rel=0&modestbranding=1"
                      }
                      title={"Entrada en calor - " + warmup.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />

                  </div>

                  <div className="px-4 py-3 bg-black text-white/75 text-xs border-t border-white/10">
                    Video integrado en la aplicación · {warmup.duration}
                  </div>

                </motion.div>
              )}

            </motion.article>
          ))}

        </div>
      </motion.section>

      {/* =====================================================
          PROGRAMA
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.5 }}
        className="mt-14"
      >

        <div>

          <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
            Programa de entrenamiento
          </p>

          <h2 className="font-display text-5xl sm:text-6xl leading-none mt-1 text-white">
            RETO · SEMANAS 1-4
          </h2>

          <p className="mt-3 text-sm text-smoke max-w-2xl">
            Completá cada entrenamiento y su quiz para desbloquear el
            siguiente. El recorrido continúa de una semana a la siguiente sin
            saltos.
          </p>

        </div>

        <div className="space-y-6 mt-7">

          {[1, 2, 3, 4].map((week) => {

            const weekCompleted = [1, 2, 3, 4].every((day) =>
              isWeekDayCompleted(week, day)
            );

            const weekUnlocked = isWeekDayUnlocked(week, 1);

            return (
              <section
                key={week}
                className={
                  "border-2 rounded-xl overflow-hidden " +
                  (weekCompleted
                    ? "border-lime/50 bg-pine-deep shadow-chalk-lime"
                    : weekUnlocked
                    ? "border-white/15 bg-paper shadow-chalk"
                    : "border-white/5 bg-black/20")
                }
              >

                {/* HEADER SEMANA */}

                <div
                  className={
                    "px-5 py-4 border-b-2 flex flex-wrap items-center justify-between gap-3 " +
                    (weekCompleted
                      ? "border-lime/30 bg-pine text-white"
                      : weekUnlocked
                      ? "border-lime/30 bg-pine-deep text-white"
                      : "border-white/5 bg-black/20 text-white/60")
                  }
                >

                  <div>

                    <p
                      className={
                        "text-xs font-bold tracking-[0.2em] uppercase " +
                        (weekUnlocked
                          ? "text-lime"
                          : "text-white/60")
                      }
                    >
                      {week <= 2 ? "Primera etapa" : "Segunda etapa"}
                    </p>

                    <h3
                      className={
                        "font-display text-4xl leading-none " +
                        (weekUnlocked
                          ? "text-white"
                          : "text-white/60")
                      }
                    >
                      SEMANA {week}
                    </h3>

                  </div>

                  <div className="flex items-center gap-2">

                    {weekCompleted ? (
                      <span className="inline-flex items-center gap-1.5 bg-lime text-black border-2 border-black rounded-full px-3 py-1 text-xs font-extrabold">
                        <IconCheck className="w-3.5 h-3.5" />
                        COMPLETADA
                      </span>
                    ) : !weekUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 bg-black text-white border-2 border-white/20 rounded-full px-3 py-1 text-xs font-bold">
                        <IconLock className="w-3.5 h-3.5" />
                        BLOQUEADA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-lime text-black border-2 border-black rounded-full px-3 py-1 text-xs font-extrabold">
                        <IconTarget className="w-3.5 h-3.5" />
                        EN CURSO
                      </span>
                    )}

                  </div>

                </div>

                <div className="p-5">

                  <p className="text-sm text-smoke mb-4">
                    {week <= 2
                      ? "Comenzá con el nivel inicial y familiarizate con los ejercicios y el circuito."
                      : "Mantené los mismos 4 entrenamientos y aumentá progresivamente la cantidad de trabajo."}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">

                    {[1, 2, 3, 4].map((day) => {

                      const workout = WORKOUTS[day - 1];
                      const session = getSessionNumber(week, day);
                      const completed = isWeekDayCompleted(week, day);
                      const unlocked = isWeekDayUnlocked(week, day);

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={!unlocked}
                          onClick={() => onStart(week, day)}
                          className={
                            "text-left border-2 rounded-lg p-4 transition-all " +
                            (completed
                              ? "border-lime/50 bg-pine text-white shadow-[4px_4px_0_#b8ff35]"
                              : unlocked
                              ? "border-white/15 bg-black/20 text-white hover:border-lime/50 hover:bg-pine-deep hover:-translate-y-0.5 shadow-chalk-sm"
                              : "border-white/5 bg-black/20 text-white/50 cursor-not-allowed opacity-70")
                          }
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div className="flex items-start gap-3 min-w-0">

                              <span
                                className={
                                  "shrink-0 w-9 h-9 grid place-items-center border-2 rounded-md font-display text-lg " +
                                  (completed
                                    ? "border-black bg-lime text-black"
                                    : unlocked
                                    ? "border-lime/50 bg-pine text-white"
                                    : "border-white/10 bg-black text-white/50")
                                }
                              >
                                {completed ? (
                                  <IconCheck className="w-5 h-5" />
                                ) : unlocked ? (
                                  day
                                ) : (
                                  <IconLock className="w-4 h-4" />
                                )}
                              </span>

                              <div className="min-w-0">

                                <p
                                  className={
                                    "text-[10px] font-bold tracking-[0.18em] uppercase " +
                                    (completed || unlocked
                                      ? "text-lime"
                                      : "text-white/50")
                                  }
                                >
                                  Día {day} · Sesión {session}
                                </p>

                                <h4
                                  className={
                                    "font-display text-2xl leading-none mt-1 " +
                                    (completed || unlocked
                                      ? "text-white"
                                      : "text-white/50")
                                  }
                                >
                                  {workout.title}
                                </h4>

                                <p
                                  className={
                                    "text-xs mt-1 " +
                                    (completed || unlocked
                                      ? "text-white/70"
                                      : "text-white/40")
                                  }
                                >
                                  {workout.focus}
                                </p>

                              </div>

                            </div>

                            <div className="shrink-0">

                              {completed ? (
                                <IconCheck className="w-5 h-5 text-lime" />
                              ) : unlocked ? (
                                <IconArrowRight className="w-5 h-5 text-lime" />
                              ) : (
                                <IconLock className="w-5 h-5 text-white/40" />
                              )}

                            </div>

                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-4">

                            {workout.muscles.map((muscle) => (
                              <span
                                key={muscle}
                                className={
                                  "text-[10px] font-bold border rounded-full px-2 py-0.5 " +
                                  (completed
                                    ? "border-lime/30 text-lime bg-black/20"
                                    : unlocked
                                    ? "border-white/15 text-white/70"
                                    : "border-white/5 text-white/40")
                                }
                              >
                                {muscle}
                              </span>
                            ))}

                          </div>

                        </button>
                      );
                    })}

                  </div>
                </div>

              </section>
            );
          })}

        </div>
      </motion.section>

      {/* =====================================================
          RETO COMPLETADO
      ===================================================== */}

      {isChallengeComplete && (
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-pine-deep border-2 border-lime/40 rounded-xl shadow-chalk-lime p-7 text-center"
        >

          <IconTrophy className="w-12 h-12 mx-auto text-lime" />

          <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase mt-4">
            16 sesiones completadas
          </p>

          <h2 className="font-display text-5xl leading-none mt-1 text-white">
            RETO COMPLETADO
          </h2>

          <p className="mt-3 text-sm text-white/80 max-w-xl mx-auto">
            Terminaste las cuatro semanas. Si querés volver a realizar el
            reto desde el principio, reiniciá tu progreso.

          </p>

          <button
            type="button"
            onClick={resetAll}
            className="mt-5 inline-flex items-center gap-2 bg-lime text-black border-2 border-black rounded-lg px-6 py-3 font-extrabold shadow-chalk-sm transition-all hover:bg-white hover:-translate-y-0.5"
          >
            <IconRepeat className="w-5 h-5" />
            Reiniciar reto
          </button>

        </motion.section>
      )}

    </div>
  );
}