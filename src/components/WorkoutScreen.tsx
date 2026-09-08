import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Workout } from "../data/workouts";
import { Quiz } from "./Quiz";
import {
  IconArrowLeft,
  IconCheck,
  IconDumbbell,
  IconPlay,
  IconRepeat,
  IconTarget,
  IconTimer,
  IconTrophy,
} from "./Icons";

interface WorkoutScreenProps {
  workout: Workout;
  week: number;
  isCompleted: boolean;
  completedSessions?: number[];
  progressCount: number;
  onBack: () => void;
  onComplete: (week: number, day: number) => void;
}

export function WorkoutScreen({
  workout,
  week,
  isCompleted,
  progressCount,
  onBack,
  onComplete,
}: WorkoutScreenProps) {
  const [showVideo, setShowVideo] = useState(true);

  const safeWeek = Math.min(
    4,
    Math.max(1, Math.floor(week))
  ) as 1 | 2 | 3 | 4;

  const weekConfig = useMemo(() => {
    return workout?.weeks?.[safeWeek] ?? null;
  }, [workout, safeWeek]);

  const exercises = workout?.exercises ?? [];
  const quiz = workout?.quiz ?? [];

  const sessionNumber =
    (safeWeek - 1) * 4 + (workout?.id ?? 1);

  const handlePassed = () => {
    if (!isCompleted) {
      onComplete(safeWeek, workout.id);
    }
  };

  const videoUrl = weekConfig?.videoId
    ? `https://www.youtube-nocookie.com/embed/${weekConfig.videoId}?rel=0&modestbranding=1`
    : "";

  if (!workout || !weekConfig) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="pt-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-lime transition-colors"
            >
              <IconArrowLeft className="w-5 h-5" />
              Volver al programa
            </button>
          </div>

          <div className="mt-10 bg-black border-2 border-flame rounded-xl p-6">
            <h1 className="font-display text-4xl text-white">
              ENTRENAMIENTO NO DISPONIBLE
            </h1>

            <p className="text-sm text-white/80 mt-2">
              No se pudo cargar la configuración de esta sesión.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* VOLVER */}

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="pt-6"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-lime transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
            Volver al programa
          </button>
        </motion.div>

        {/* CABECERA */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-5">

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-1.5 bg-lime text-black border-2 border-black rounded-full px-3 py-1 text-xs font-extrabold">
                  <IconTarget className="w-3.5 h-3.5" />
                  SEMANA {safeWeek}
                </span>

                <span className="inline-flex items-center gap-1.5 bg-white text-black border-2 border-black rounded-full px-3 py-1 text-xs font-extrabold">
                  DÍA {workout.id}
                </span>

                {isCompleted && (
                  <span className="inline-flex items-center gap-1.5 bg-black text-white border-2 border-lime rounded-full px-3 py-1 text-xs font-bold">
                    <IconCheck className="w-3.5 h-3.5 text-lime" />
                    COMPLETADO
                  </span>
                )}
              </div>

              <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase mt-5">
                Sesión {sessionNumber} de 16
              </p>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.84] mt-2 text-white">
                {workout.title}
              </h1>

              <p className="mt-5 text-lg text-white/80 max-w-3xl leading-relaxed">
                {workout.tagline}
              </p>

            </div>

            {/* PROGRESO */}

            <div className="shrink-0 bg-black text-white border-2 border-lime rounded-xl shadow-chalk p-5 min-w-[190px]">

              <div className="flex items-center gap-2">
                <IconDumbbell className="w-5 h-5 text-lime" />

                <span className="text-xs font-bold tracking-[0.18em] text-lime">
                  PROGRESO
                </span>
              </div>

              <p className="font-display text-4xl mt-2 text-white">
                {progressCount}
                <span className="text-xl text-white">
                  /16
                </span>
              </p>

              <div className="h-2 bg-black border border-white/30 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-lime transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        (progressCount / 16) * 100
                      )
                    )}%`,
                  }}
                />
              </div>

              <p className="text-xs text-white mt-2">
                {progressCount} de 16 sesiones completadas
              </p>

            </div>
          </div>
        </motion.section>

        {/* INFORMACIÓN RÁPIDA */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.08,
            duration: 0.45,
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
        >

          <div className="bg-white text-black border-2 border-black rounded-lg p-4">
            <p className="text-[10px] font-bold tracking-[0.18em] text-black/60 uppercase">
              Enfoque
            </p>

            <p className="font-bold text-sm mt-1 text-black">
              {workout.focus}
            </p>
          </div>

          <div className="bg-white text-black border-2 border-black rounded-lg p-4">
            <p className="text-[10px] font-bold tracking-[0.18em] text-black/60 uppercase">
              Nivel
            </p>

            <p className="font-bold text-sm mt-1 text-black">
              {workout.level}
            </p>
          </div>

          <div className="bg-white text-black border-2 border-black rounded-lg p-4">
            <p className="text-[10px] font-bold tracking-[0.18em] text-black/60 uppercase">
              Vueltas
            </p>

            <p className="font-bold text-sm mt-1 text-black">
              {weekConfig.rounds} vueltas
            </p>
          </div>

          <div className="bg-white text-black border-2 border-black rounded-lg p-4">
            <p className="text-[10px] font-bold tracking-[0.18em] text-black/60 uppercase">
              Descanso
            </p>

            <p className="font-bold text-sm mt-1 text-black">
              {weekConfig.rest}
            </p>
          </div>

        </motion.section>

        {/* VIDEO */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.14,
            duration: 0.45,
          }}
          className="mt-8"
        >

          <div className="bg-black border-2 border-white/20 rounded-xl shadow-chalk overflow-hidden">

            <div className="bg-black border-b-2 border-lime/30 px-5 py-4">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <span className="shrink-0 w-10 h-10 grid place-items-center bg-lime text-black border-2 border-black rounded-lg">
                    <IconPlay className="w-5 h-5" />
                  </span>

                  <div className="min-w-0">

                    <p className="text-xs font-bold tracking-[0.18em] text-lime uppercase">
                      Video del entrenamiento
                    </p>

                    <h2 className="font-display text-2xl text-white leading-none mt-1 truncate">
                      {weekConfig.videoLabel}
                    </h2>

                  </div>
                </div>

                {showVideo && videoUrl && (
                  <button
                    type="button"
                    onClick={() => setShowVideo(false)}
                    className="shrink-0 inline-flex items-center gap-2 bg-white text-black border-2 border-black rounded-lg px-4 py-2 text-sm font-extrabold hover:bg-lime transition-all"
                  >
                    Cerrar video
                  </button>
                )}

              </div>
            </div>

            {showVideo && videoUrl ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-video bg-black"
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoUrl}
                  title={`${workout.title} - Semana ${safeWeek}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </motion.div>
            ) : (
              <div className="bg-black px-5 py-8 text-center">

                <IconPlay className="w-10 h-10 mx-auto text-lime" />

                <p className="font-bold text-white mt-3">
                  Video oculto
                </p>

                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="mt-4 inline-flex items-center gap-2 bg-lime text-black border-2 border-black rounded-lg px-5 py-2.5 font-extrabold shadow-chalk-sm hover:bg-white hover:-translate-y-0.5 transition-all"
                >
                  <IconPlay className="w-4 h-4" />
                  Mostrar video
                </button>

              </div>
            )}

            <div className="bg-black px-5 py-3 text-xs text-white border-t border-white/20">
              Video integrado en la aplicación · Semana {safeWeek}
            </div>

          </div>
        </motion.section>

        {/* DESCRIPCIÓN */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.45,
          }}
          className="mt-8"
        >

          <div className="bg-white text-black border-2 border-black rounded-xl shadow-chalk-sm p-6">

            <div className="flex items-start gap-4">

              <span className="shrink-0 w-11 h-11 grid place-items-center bg-lime text-black border-2 border-black rounded-lg">
                <IconDumbbell className="w-6 h-6" />
              </span>

              <div>

                <p className="text-xs font-bold tracking-[0.2em] text-flame uppercase">
                  Sobre este entrenamiento
                </p>

                <p className="mt-2 text-sm text-black leading-relaxed max-w-4xl">
                  {workout.description}
                </p>

              </div>
            </div>

          </div>
        </motion.section>

        {/* EJERCICIOS */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.26,
            duration: 0.45,
          }}
          className="mt-8"
        >

          <div className="flex flex-wrap items-end justify-between gap-3">

            <div>

              <p className="text-xs font-bold tracking-[0.24em] text-flame uppercase">
                Plan de trabajo
              </p>

              <h2 className="font-display text-5xl sm:text-6xl leading-none text-white">
                EJERCICIOS
              </h2>

            </div>

            <span className="inline-flex items-center gap-2 bg-lime text-black border-2 border-black rounded-full px-3.5 py-1.5 text-xs font-extrabold">
              <IconRepeat className="w-4 h-4" />
              {weekConfig.rounds} VUELTAS
            </span>

          </div>

          {exercises.length > 0 ? (
            <div className="grid gap-3 mt-6">

              {exercises.map((exercise, index) => {

                const reps =
                  exercise?.[
                    `week${safeWeek}` as keyof typeof exercise
                  ];

                return (
                  <motion.div
                    key={`${exercise.name}-${index}`}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.04,
                      duration: 0.3,
                    }}
                    className="bg-white text-black border-2 border-black rounded-lg p-4 sm:p-5 shadow-chalk-sm"
                  >

                    <div className="flex items-center gap-4">

                      <span className="shrink-0 w-10 h-10 grid place-items-center bg-lime text-black border-2 border-black rounded-lg font-display text-xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">

                        <h3 className="font-bold text-base sm:text-lg leading-tight text-black">
                          {exercise.name}
                        </h3>

                        <p className="text-xs text-black/70 mt-1">
                          {typeof reps === "string"
                            ? reps
                            : "Según indicaciones del entrenamiento"}
                        </p>

                      </div>

                      <div className="shrink-0 hidden sm:flex items-center gap-1.5 text-xs font-bold text-black/70">

                        <IconRepeat className="w-4 h-4 text-black" />

                        {weekConfig.rounds}x

                      </div>

                    </div>

                  </motion.div>
                );
              })}

            </div>
          ) : (
            <div className="mt-6 bg-white text-black border-2 border-black rounded-xl p-5 text-sm">
              No hay ejercicios configurados para este entrenamiento.
            </div>
          )}

        </motion.section>

        {/* RESUMEN */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.32,
            duration: 0.45,
          }}
          className="mt-8"
        >

          <div className="bg-black text-white border-2 border-lime rounded-xl shadow-chalk p-6">

            <div className="grid gap-5 sm:grid-cols-3">

              <div>
                <div className="flex items-center gap-2">
                  <IconRepeat className="w-5 h-5 text-lime" />

                  <span className="text-xs font-bold tracking-[0.18em] text-lime">
                    VUELTAS
                  </span>
                </div>

                <p className="font-display text-4xl mt-1 text-white">
                  {weekConfig.rounds}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <IconTimer className="w-5 h-5 text-lime" />

                  <span className="text-xs font-bold tracking-[0.18em] text-lime">
                    DESCANSO
                  </span>
                </div>

                <p className="font-display text-4xl mt-1 text-white">
                  {weekConfig.rest}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <IconTarget className="w-5 h-5 text-lime" />

                  <span className="text-xs font-bold tracking-[0.18em] text-lime">
                    EJERCICIOS
                  </span>
                </div>

                <p className="font-display text-4xl mt-1 text-white">
                  {exercises.length}
                </p>
              </div>

            </div>
          </div>
        </motion.section>

        {/* QUIZ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.38,
            duration: 0.45,
          }}
          className="mt-10"
        >

          {quiz.length > 0 ? (
            <Quiz
              workout={workout}
              alreadyCompleted={isCompleted}
              onPassed={handlePassed}
            />
          ) : (
            <div className="bg-black border-2 border-flame rounded-xl p-6">

              <div className="flex items-start gap-4">

                <IconTrophy className="w-8 h-8 shrink-0 text-flame" />

                <div>

                  <h2 className="font-display text-3xl leading-none text-white">
                    QUIZ NO CONFIGURADO
                  </h2>

                  <p className="text-sm text-white/80 mt-2">
                    Este entrenamiento todavía no tiene preguntas cargadas.
                  </p>

                </div>

              </div>

            </div>
          )}

        </motion.section>

        {/* SESIÓN COMPLETADA */}

        {isCompleted && (
          <motion.section
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="mt-8 bg-black text-white border-2 border-lime rounded-xl shadow-chalk-lime p-6 text-center"
          >

            <IconTrophy className="w-10 h-10 mx-auto text-lime" />

            <p className="text-xs font-bold tracking-[0.2em] text-lime uppercase mt-3">
              Sesión completada
            </p>

            <h2 className="font-display text-4xl leading-none text-white">
              DÍA {workout.id} COMPLETADO
            </h2>

            <p className="text-sm text-white/80 mt-2">
              Tu progreso quedó guardado. Puedes volver al programa para continuar con la siguiente sesión.
            </p>

            <button
              type="button"
              onClick={onBack}
              className="mt-5 inline-flex items-center gap-2 bg-lime text-black border-2 border-black rounded-lg px-6 py-3 font-extrabold shadow-chalk-sm hover:bg-white hover:-translate-y-0.5 transition-all"
            >
              <IconArrowLeft className="w-5 h-5" />
              Volver al programa
            </button>

          </motion.section>
        )}

      </div>
    </div>
  );
}