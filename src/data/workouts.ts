export type DayId = 1 | 2 | 3;

export interface QuizQuestion {
  prompt: string;
  options: [string, string, string];
  correct: number; // índice de la respuesta correcta (0-2)
  fact: string;
}

export interface Exercise {
  name: string;
  reps: string;
}

export interface Workout {
  id: DayId;
  title: string;
  focus: string;
  tagline: string;
  duration: string;
  calories: string;
  level: "Fácil" | "Medio" | "Intenso";
  muscles: string[];
  videoId: string;
  videoLabel: string;
  description: string;
  exercises: Exercise[];
  quiz: QuizQuestion[];
}

export const WORKOUTS: Workout[] = [
  {
    id: 1,
    title: "Tren inferior",
    focus: "Piernas y glúteos",
    tagline: "Fuerza de cimientos: sentadillas, zancadas y glúteos de acero.",
    duration: "20 min",
    calories: "~190 kcal",
    level: "Fácil",
    muscles: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
    videoId: "sTANio_2E0Q",
    videoLabel: "Rutina de piernas sin material",
    description:
      "El tren inferior es el motor de tu cuerpo: concentra los músculos más grandes y, al entrenarlos, disparas tu fuerza y tu metabolismo. Este circuito combina sentadillas, zancadas y trabajo de glúteo en 3 rondas, sin ningún material. Mantén un ritmo controlado, baja en 2 segundos y sube con potencia. Si sientes ardor muscular, vas por buen camino.",
    exercises: [
      { name: "Sentadillas", reps: "3 × 15" },
      { name: "Zancadas alternas", reps: "3 × 12 / pierna" },
      { name: "Puente de glúteo", reps: "3 × 15" },
      { name: "Sentadilla sumo", reps: "3 × 12" },
      { name: "Patada de glúteo", reps: "3 × 15 / pierna" },
      { name: "Elevación de talones", reps: "3 × 20" },
      { name: "Plancha baja (finisher)", reps: "2 × 30 s" },
    ],
    quiz: [
      {
        prompt: "Antes de empezar las sentadillas, ¿qué es imprescindible?",
        options: [
          "Estirar en frío durante 10 minutos",
          "Calentar movilidad y articulaciones",
          "Comer algo pesado para tener energía",
        ],
        correct: 1,
        fact: "Un calentamiento dinámico eleva la temperatura muscular y prepara las articulaciones, reduciendo el riesgo de lesión.",
      },
      {
        prompt: "En una sentadilla correcta, las rodillas…",
        options: [
          "Se juntan hacia adentro al bajar",
          "Deben superar mucho la punta del pie",
          "Siguen la línea de la punta del pie",
        ],
        correct: 2,
        fact: "Las rodillas deben apuntar en la misma dirección que los pies. Si colapsan hacia dentro, trabaja más la articulación que el músculo.",
      },
      {
        prompt: "¿Qué músculo NO es protagonista del tren inferior?",
        options: ["Bíceps braquial", "Glúteo mayor", "Cuádriceps"],
        correct: 0,
        fact: "El bíceps braquial está en el brazo. Glúteos, cuádriceps e isquiotibiales son los reyes del tren inferior.",
      },
    ],
  },
  {
    id: 2,
    title: "Tren superior",
    focus: "Pecho, espalda y brazos",
    tagline: "Flexiones, remos y fondos para un torso fuerte y estable.",
    duration: "22 min",
    calories: "~170 kcal",
    level: "Medio",
    muscles: ["Pectorales", "Dorsales", "Hombros", "Tríceps"],
    videoId: "IODxDxX7oi4",
    videoLabel: "Rutina de tren superior en casa",
    description:
      "Un tren superior fuerte mejora tu postura, tu equilibrio y hasta tu confianza al caminar. Aquí no hay mancuernas: tu peso corporal y una mochila cargada hacen el trabajo. La clave está en la técnica — cuerpo rígido como una tabla en las flexiones y espalda neutra en los remos. Descansa 45 segundos entre rondas y prioriza siempre la forma sobre las repeticiones.",
    exercises: [
      { name: "Flexiones clásicas", reps: "3 × 10" },
      { name: "Flexiones inclinadas (sofá)", reps: "3 × 12" },
      { name: "Remo con mochila", reps: "3 × 12 / brazo" },
      { name: "Fondos en silla", reps: "3 × 10" },
      { name: "Pike press (hombros)", reps: "3 × 8" },
      { name: "Superman (espalda baja)", reps: "3 × 12" },
      { name: "Plancha tocando hombros", reps: "3 × 20" },
    ],
    quiz: [
      {
        prompt: "En una flexión correcta, el cuerpo debe…",
        options: [
          "Arquear la zona lumbar hacia abajo",
          "Formar una línea recta de cabeza a talones",
          "Bajar primero la cadera que el pecho",
        ],
        correct: 1,
        fact: "Core y glúteos activados mantienen el cuerpo en bloque. Si la cadera se hunde, la lumbar paga la factura.",
      },
      {
        prompt: "¿Qué músculo trabaja MÁS en las flexiones?",
        options: ["El pectoral", "El gemelo", "El abductor"],
        correct: 0,
        fact: "Las flexiones son el ejercicio rey de pecho en casa; también participan tríceps y hombros como secundarios.",
      },
      {
        prompt: "Al hacer remo con mochila, la espalda debe estar…",
        options: ["Encorvada hacia delante", "Totalmente arqueada", "Neutra, con el core firme"],
        correct: 2,
        fact: "Espalda neutra y codo pegado al cuerpo: así el dorsal trabaja y la columna se mantiene segura.",
      },
    ],
  },
  {
    id: 3,
    title: "Cuerpo completo",
    focus: "Full body + cardio",
    tagline: "El reto final: circuitos que encienden todo el cuerpo.",
    duration: "25 min",
    calories: "~240 kcal",
    level: "Intenso",
    muscles: ["Todo el cuerpo", "Core", "Cardio"],
    videoId: "2pLT-olgUJs",
    videoLabel: "Circuito full body de ejemplo",
    description:
      "Llegaste al día que lo junta todo: fuerza, resistencia y corazón a tope. Los burpees, jumping jacks y mountain climbers mantienen tus pulsaciones altas, mientras las sentadillas con salto y las flexiones rematan los músculos trabajados durante la semana. Trabaja 40 segundos, descansa 20, y repite el circuito 3 veces. Termina con estiramientos suaves: te lo has ganado.",
    exercises: [
      { name: "Burpees", reps: "3 × 10" },
      { name: "Sentadilla con salto", reps: "3 × 12" },
      { name: "Mountain climbers", reps: "3 × 30 s" },
      { name: "Flexiones", reps: "3 × 10" },
      { name: "Zancada alterna con salto", reps: "3 × 12 / pierna" },
      { name: "Jumping jacks", reps: "3 × 40 s" },
      { name: "Plancha lateral", reps: "2 × 20 s / lado" },
    ],
    quiz: [
      {
        prompt: "El burpee combina en un solo movimiento…",
        options: [
          "Solo saltos verticales",
          "Sentadilla, plancha y salto",
          "Solo trabajo de abdominales",
        ],
        correct: 1,
        fact: "El burpee es un ejercicio compuesto total: sentadilla, plancha, flexión opcional y salto final. Pocos mueven tanto en tan poco.",
      },
      {
        prompt: "En el mountain climber, el core debe estar…",
        options: ["Firme, sin hundir la cadera", "Relajado por completo", "Arqueado hacia arriba"],
        correct: 0,
        fact: "Imagina una línea recta desde los hombros a las rodillas: si la cadera se hunde o sube, pierdes eficacia y fuerzas la lumbar.",
      },
      {
        prompt: "¿Cuál es el gran beneficio de un circuito de cuerpo completo?",
        options: [
          "Sustituye la necesidad de calentar",
          "Solo trabaja las piernas",
          "Entrena todo el cuerpo y quema más en menos tiempo",
        ],
        correct: 2,
        fact: "Al alternar grupos musculares sin pausas largas, el corazón trabaja más y el gasto calórico se dispara. Calentar sigue siendo obligatorio.",
      },
    ],
  },
];

export const getWorkout = (day: number): Workout =>
  WORKOUTS.find((w) => w.id === day) ?? WORKOUTS[0];
