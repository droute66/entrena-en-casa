import { useState } from "react";
import type { Workout } from "../data/workouts";
import { IconCheck, IconRepeat, IconSpark, IconX } from "./Icons";

const LETTERS = ["A", "B", "C"];

interface QuizProps {
  workout: Workout;
  alreadyCompleted: boolean;
  onPassed: () => void;
}

export function Quiz({ workout, alreadyCompleted, onPassed }: QuizProps) {
  const total = workout.quiz.length;
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === total;
  const pending = total - answeredCount;

  const selectOption = (qIdx: number, oIdx: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === qIdx ? oIdx : a)));
    if (submitted) {
      setSubmitted(false);
      setScore(null);
      setWarning(null);
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      setWarning(
        pending === 1
          ? "Te falta 1 respuesta: contesta todas las preguntas para completar el entrenamiento."
          : `Te faltan ${pending} respuestas: contesta todas las preguntas para completar el entrenamiento.`
      );
      setShaking(true);
      window.setTimeout(() => setShaking(false), 550);
      return;
    }
    const s = workout.quiz.reduce(
      (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0),
      0
    );
    setScore(s);
    setSubmitted(true);
    if (s === total) {
      setWarning(null);
      onPassed();
    } else {
      setWarning(
        `${s}/${total} correctas. Las respuestas falladas están marcadas en rojo: corrígelas y vuelve a pulsar «Completar entrenamiento».`
      );
    }
  };

  const resetQuiz = () => {
    setAnswers(Array(total).fill(null));
    setSubmitted(false);
    setScore(null);
    setWarning(null);
  };

  return (
    <section
      aria-label="Quiz del entrenamiento"
      className="bg-paper border-2 border-ink rounded-xl shadow-chalk overflow-hidden"
    >
      {/* Cabecera del quiz */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-ink text-chalk px-6 py-4">
        <div className="flex items-center gap-3">
          <IconSpark className="w-6 h-6 text-lime" />
          <div>
            <h2 className="font-display text-3xl leading-none tracking-wide">QUIZ FINAL</h2>
            <p className="text-xs text-chalk/70 mt-1">
              Acierta las {total} preguntas para completar el Día {workout.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold tracking-widest border border-chalk/30 rounded-full px-3 py-1">
            {answeredCount}/{total} RESPONDIDAS
          </span>
          <button
            type="button"
            onClick={resetQuiz}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-chalk/80 border border-chalk/30 rounded-full px-3 py-1 transition-colors hover:text-lime hover:border-lime"
          >
            <IconRepeat className="w-3.5 h-3.5" /> Reiniciar
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {alreadyCompleted && (
          <p className="flex items-center gap-2 bg-moss/10 border-2 border-moss rounded-lg px-4 py-3 text-sm font-semibold text-pine animate-fade-up">
            <IconCheck className="w-5 h-5 shrink-0" />
            Ya completaste este día. Puedes repetir el quiz para repasar la técnica.
          </p>
        )}

        {workout.quiz.map((q, qIdx) => {
          const chosen = answers[qIdx];
          return (
            <fieldset key={q.prompt} className="border-0">
              <legend className="flex items-start gap-3 font-bold text-lg leading-snug">
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border-2 border-ink font-display text-xl transition-colors ${
                    submitted && chosen === q.correct
                      ? "bg-moss text-chalk"
                      : submitted && chosen !== null
                      ? "bg-flame text-chalk"
                      : "bg-lime text-ink"
                  }`}
                >
                  {qIdx + 1}
                </span>
                <span className="pt-1.5">{q.prompt}</span>
              </legend>

              <div className="grid gap-2.5 mt-4 sm:grid-cols-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = chosen === oIdx;
                  const isCorrect = oIdx === q.correct;
                  let stateCls =
                    "bg-paper border-mist hover:border-ink hover:-translate-y-0.5";
                  if (isSelected && !submitted) {
                    stateCls =
                      "bg-chalk border-ink shadow-[3px_3px_0_0_var(--color-ink)] -translate-y-0.5";
                  }
                  if (submitted && isCorrect) {
                    stateCls = "bg-moss/15 border-moss";
                  } else if (submitted && isSelected && !isCorrect) {
                    stateCls = "bg-flame/10 border-flame animate-shake";
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => selectOption(qIdx, oIdx)}
                      aria-pressed={isSelected}
                      className={`text-left flex items-start gap-2.5 border-2 rounded-lg px-3.5 py-3 transition-all duration-200 ${stateCls}`}
                    >
                      <span
                        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md border-2 border-ink font-display text-base ${
                          submitted && isCorrect
                            ? "bg-moss text-chalk"
                            : submitted && isSelected && !isCorrect
                            ? "bg-flame text-chalk"
                            : isSelected
                            ? "bg-ink text-lime"
                            : "bg-chalk text-ink"
                        }`}
                      >
                        {LETTERS[oIdx]}
                      </span>
                      <span className="text-sm font-medium leading-snug pt-0.5">{opt}</span>
                      {submitted && isCorrect && (
                        <IconCheck className="w-4 h-4 shrink-0 text-moss mt-1 ml-auto" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <IconX className="w-4 h-4 shrink-0 text-flame mt-1 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <p className="flex items-start gap-2 mt-3 text-sm text-pine animate-fade-up">
                  <IconSpark className="w-4 h-4 shrink-0 mt-0.5 text-moss" />
                  <span>
                    <strong className="font-bold">Dato:</strong> {q.fact}
                  </span>
                </p>
              )}
            </fieldset>
          );
        })}

        {/* Mensajes + CTA */}
        <div className="border-t-2 border-dashed border-mist pt-6">
          {warning && (
            <p
              role="alert"
              className={`mb-4 border-2 rounded-lg px-4 py-3 text-sm font-semibold animate-fade-up ${
                submitted && score !== null && score < total
                  ? "border-flame bg-flame/10 text-flame-deep"
                  : "border-ink bg-lime/40 text-ink"
              }`}
            >
              {warning}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className={`inline-flex items-center gap-2.5 bg-flame text-chalk border-2 border-ink rounded-lg px-8 py-4 text-lg font-bold shadow-chalk-sm transition-all hover:bg-flame-deep hover:-translate-y-0.5 active:translate-y-0 active:shadow-none ${
                shaking ? "animate-shake" : ""
              }`}
            >
              <IconCheck className="w-6 h-6" />
              Completar entrenamiento
            </button>
            <p className="text-sm text-smoke">
              {!allAnswered
                ? pending === 1
                  ? "Te falta 1 respuesta para poder completar."
                  : `Te faltan ${pending} respuestas para poder completar.`
                : submitted && score !== null && score < total
                ? "Corrige las respuestas en rojo y reintenta."
                : "Todo listo: pulsa el botón para registrar tu día."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
