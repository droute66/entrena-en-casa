export type DayId = 1 | 2 | 3 | 4;
export type WeekNumber = 1 | 2 | 3 | 4;

export interface QuizQuestion {
  prompt: string;
  options: [string, string, string];
  correct: number;
  fact: string;
}

export interface Exercise {
  name: string;
  week1: string;
  week2: string;
  week3: string;
  week4: string;
}

export interface WeekConfig {
  week: WeekNumber;
  rounds: number;
  rest: string;
  videoId: string;
  videoLabel: string;
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

  // Video de las semanas 1 y 2
  videoId12: string;
  videoLabel12: string;

  // Video de las semanas 3 y 4
  videoId34: string;
  videoLabel34: string;

  description: string;

  // Configuración de cada semana
  weeks: Record<WeekNumber, WeekConfig>;

  // Ejercicios y progresión semanal
  exercises: Exercise[];

  // Se mantienen para incorporarlos después
  quiz: QuizQuestion[];
}

export interface Warmup {
  id: number;
  title: string;
  videoId: string;
  duration: string;
  description: string;
}

export const WARMUPS: Warmup[] = [
  {
    id: 1,
    title: "Step Touch combinado con rodillas al pecho",
    videoId: "6ny6sgGJLJc",
    duration: "5 min",
    description:
      "Realiza 30 segundos de Step Touch y 30 segundos de rodillas al pecho en el sitio hasta completar los 5 minutos.",
  },
  {
    id: 2,
    title: "Patadas al frente con brazo contrario",
    videoId: "kxYKgEYNcXI",
    duration: "5 min",
    description:
      "Realiza 45 segundos de ejecución y 15 segundos de descanso. Durante los descansos realiza una pequeña marcha en el sitio.",
  },
  {
    id: 3,
    title: "Dobles rodillas arriba con las manos en la nuca",
    videoId: "n4hIvR8rymI",
    duration: "5 min",
    description:
      "Realiza 45 segundos de ejecución y 15 segundos de descanso. Durante los descansos realiza una pequeña marcha en el sitio.",
  },
  {
    id: 4,
    title: "Talones al glúteo",
    videoId: "CXPzXu4oQPU",
    duration: "5 min",
    description:
      "Realiza 45 segundos de ejecución y 15 segundos de descanso. Durante los descansos realiza una pequeña marcha en el sitio.",
  },
];

export const WORKOUTS: Workout[] = [
  {
    id: 1,
    title: "Circuito Full Body",
    focus: "Piernas, glúteos y core",
    tagline:
      "Un circuito completo para activar fuerza, estabilidad y resistencia.",
    duration: "Según ritmo",
    calories: "Circuito",
    level: "Medio",
    muscles: ["Piernas", "Glúteos", "Core", "Tríceps"],

    videoId12: "XT0IDiHjF0k",
    videoLabel12: "Rutina semanas 1 y 2",

    videoId34: "T1c98w05Q78",
    videoLabel34: "Rutina semanas 3 y 4",

    description:
      "Circuito de 7 ejercicios utilizando principalmente el peso corporal. En las semanas 3 y 4 aumenta el número de vueltas y la cantidad de trabajo.",

    weeks: {
      1: {
        week: 1,
        rounds: 2,
        rest: "30 segundos",
        videoId: "XT0IDiHjF0k",
        videoLabel: "Rutina · Semanas 1 y 2",
      },
      2: {
        week: 2,
        rounds: 3,
        rest: "30 segundos",
        videoId: "XT0IDiHjF0k",
        videoLabel: "Rutina · Semanas 1 y 2",
      },
      3: {
        week: 3,
        rounds: 3,
        rest: "30 segundos",
        videoId: "T1c98w05Q78",
        videoLabel: "Rutina · Semanas 3 y 4",
      },
      4: {
        week: 4,
        rounds: 4,
        rest: "30 segundos",
        videoId: "T1c98w05Q78",
        videoLabel: "Rutina · Semanas 3 y 4",
      },
    },

    exercises: [
      {
        name: "Sentadilla estática pies",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Fondos de tríceps en una silla",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Elevación de tronco con piernas",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Puente de glúteos",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Patada de glúteo cuadrupedia",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Abducción de cadera cuadrupedia",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Plancha lateral isométrica",
        week1: "15 s por lado",
        week2: "15 s por lado",
        week3: "45 s total",
        week4: "45 s total",
      },
    ],

    quiz: [
      {
        prompt: "¿Qué ejercicio trabaja principalmente los tríceps en este circuito?",
        options: [
          "Fondos de tríceps en una silla",
          "Puente de glúteos",
          "Plancha lateral",
        ],
        correct: 0,
        fact:
          "Los fondos en silla utilizan principalmente los tríceps, además de involucrar hombros y pecho.",
      },
      {
        prompt: "¿Qué ejercicio se realiza en posición cuadrúpeda?",
        options: [
          "Sentadilla estática",
          "Patada de glúteo",
          "Puente de glúteos",
        ],
        correct: 1,
        fact:
          "La patada de glúteo se realiza apoyando manos y rodillas, manteniendo el tronco estable.",
      },
      {
        prompt: "¿Qué ejercicio del circuito es isométrico?",
        options: [
          "Plancha lateral",
          "Puente de glúteos",
          "Fondos de tríceps",
        ],
        correct: 0,
        fact:
          "La plancha lateral es un ejercicio isométrico porque se mantiene una posición mientras los músculos trabajan sin realizar repeticiones.",
      },
    ],
  },

  {
    id: 2,
    title: "Cardio HIIT",
    focus: "Cardio, piernas y core",
    tagline:
      "Un circuito dinámico para elevar pulsaciones y trabajar todo el cuerpo.",
    duration: "Según ritmo",
    calories: "Circuito",
    level: "Intenso",
    muscles: ["Piernas", "Glúteos", "Core", "Cardio"],

    videoId12: "uM07nyJiml8",
    videoLabel12: "Cardio HIIT · Semanas 1 y 2",

    videoId34: "DcGvV_FNogU",
    videoLabel34: "Cardio HIIT · Semanas 3 y 4",

    description:
      "Circuito HIIT de 7 ejercicios combinando trabajo de piernas, tren superior, abdomen y cardio.",

    weeks: {
      1: {
        week: 1,
        rounds: 2,
        rest: "30 segundos",
        videoId: "uM07nyJiml8",
        videoLabel: "Cardio HIIT · Semana 1",
      },
      2: {
        week: 2,
        rounds: 3,
        rest: "30 segundos",
        videoId: "uM07nyJiml8",
        videoLabel: "Cardio HIIT · Semana 2",
      },
      3: {
        week: 3,
        rounds: 3,
        rest: "15 segundos",
        videoId: "DcGvV_FNogU",
        videoLabel: "Cardio HIIT · Semana 3",
      },
      4: {
        week: 4,
        rounds: 4,
        rest: "15 segundos",
        videoId: "DcGvV_FNogU",
        videoLabel: "Cardio HIIT · Semana 4",
      },
    },

    exercises: [
      {
        name: "Zancadas alternas cruzadas",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Fondos para tríceps",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Sentadilla con pies juntos",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Flexiones con apoyo de rodillas",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Double crunches",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Zancadas con rebote",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Sentadilla sumo con salto",
        week1: "30 segundos",
        week2: "30 segundos",
        week3: "45 segundos",
        week4: "45 segundos",
      },
    ],

    quiz: [
      {
        prompt: "¿Qué caracteriza principalmente a un entrenamiento HIIT?",
        options: [
          "Alterna periodos de trabajo intenso con descansos o recuperaciones",
          "Consiste únicamente en estiramientos",
          "Se realiza siempre a intensidad muy baja",
        ],
        correct: 0,
        fact:
          "HIIT significa entrenamiento interválico de alta intensidad y combina periodos exigentes con intervalos de recuperación.",
      },
      {
        prompt: "¿Qué ejercicio del circuito trabaja directamente el abdomen?",
        options: [
          "Double crunches",
          "Sentadilla con pies juntos",
          "Zancadas con rebote",
        ],
        correct: 0,
        fact:
          "El double crunch combina la flexión del tronco y de las piernas, involucrando especialmente la musculatura abdominal.",
      },
      {
        prompt: "¿Qué ejercicio incluye un salto?",
        options: [
          "Flexiones con apoyo de rodillas",
          "Sentadilla sumo con salto",
          "Fondos para tríceps",
        ],
        correct: 1,
        fact:
          "La sentadilla sumo con salto añade un componente explosivo al trabajo de piernas y eleva la demanda cardiovascular.",
      },
    ],
  },

  {
    id: 3,
    title: "Total Body",
    focus: "Piernas, glúteos y cardio",
    tagline:
      "Trabajo completo de tren inferior con fuerza, estabilidad y cardio.",
    duration: "Según ritmo",
    calories: "Circuito",
    level: "Medio",
    muscles: ["Piernas", "Glúteos", "Core", "Cardio"],

    videoId12: "hKiAD4NPNqw",
    videoLabel12: "Total Body · Semanas 1 y 2",

    videoId34: "tAyigZOEUVs",
    videoLabel34: "Total Body · Semanas 3 y 4",

    description:
      "Circuito de 7 ejercicios que utiliza una silla y una esterilla para trabajar piernas, glúteos y acondicionamiento general.",

    weeks: {
      1: {
        week: 1,
        rounds: 2,
        rest: "30 segundos",
        videoId: "hKiAD4NPNqw",
        videoLabel: "Total Body · Semana 1",
      },
      2: {
        week: 2,
        rounds: 3,
        rest: "30 segundos",
        videoId: "hKiAD4NPNqw",
        videoLabel: "Total Body · Semana 2",
      },
      3: {
        week: 3,
        rounds: 3,
        rest: "30 segundos",
        videoId: "tAyigZOEUVs",
        videoLabel: "Total Body · Semana 3",
      },
      4: {
        week: 4,
        rounds: 4,
        rest: "30 segundos",
        videoId: "tAyigZOEUVs",
        videoLabel: "Total Body · Semana 4",
      },
    },

    exercises: [
      {
        name: "Zancadas al frente alternas",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Sentadilla sumo",
        week1: "15 repeticiones",
        week2: "15 repeticiones",
        week3: "20 repeticiones",
        week4: "20 repeticiones",
      },
      {
        name: "Abducción de cadera tumbada",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Puente de glúteos a 1 pierna",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Flexión y extensión de rodillas",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "12 repeticiones",
        week4: "12 repeticiones",
      },
      {
        name: "Burpee sin salto",
        week1: "10 repeticiones",
        week2: "10 repeticiones",
        week3: "12 repeticiones",
        week4: "12 repeticiones",
      },
      {
        name: "Zancada búlgara",
        week1: "10 repeticiones por pierna",
        week2: "10 repeticiones por pierna",
        week3: "12 repeticiones por pierna",
        week4: "12 repeticiones por pierna",
      },
    ],

    quiz: [
      {
        prompt: "¿Qué ejercicio trabaja de forma unilateral los glúteos y piernas?",
        options: [
          "Puente de glúteos a 1 pierna",
          "Sentadilla sumo",
          "Burpee sin salto",
        ],
        correct: 0,
        fact:
          "El puente a una pierna aumenta la demanda sobre cada lado de forma individual y requiere estabilidad de la cadera.",
      },
      {
        prompt: "¿Cuál de estos ejercicios es una variante de zancada?",
        options: [
          "Zancada búlgara",
          "Abducción de cadera tumbada",
          "Puente de glúteos",
        ],
        correct: 0,
        fact:
          "La zancada búlgara utiliza una posición dividida y permite trabajar cada pierna de manera independiente.",
      },
      {
        prompt: "¿Qué ejercicio aporta un componente cardiovascular al circuito?",
        options: [
          "Abducción de cadera tumbada",
          "Burpee sin salto",
          "Puente de glúteos a 1 pierna",
        ],
        correct: 1,
        fact:
          "El burpee sin salto combina varios movimientos y puede elevar notablemente las pulsaciones aunque se elimine el salto.",
      },
    ],
  },

  {
    id: 4,
    title: "Circuito en sofá",
    focus: "Piernas, glúteos y cardio",
    tagline:
      "Un circuito para entrenar en casa utilizando un sofá como apoyo.",
    duration: "Según ritmo",
    calories: "Circuito",
    level: "Medio",
    muscles: ["Piernas", "Glúteos", "Core", "Cardio"],

    videoId12: "qOxwOWavX-M",
    videoLabel12: "Circuito en sofá · Semanas 1 y 2",

    videoId34: "4El_6369KzQ",
    videoLabel34: "Circuito en sofá · Semanas 3 y 4",

    description:
      "Circuito de 7 ejercicios utilizando un sofá para trabajar piernas, glúteos y acondicionamiento cardiovascular.",

    weeks: {
      1: {
        week: 1,
        rounds: 2,
        rest: "30 segundos",
        videoId: "qOxwOWavX-M",
        videoLabel: "Circuito en sofá · Semana 1",
      },
      2: {
        week: 2,
        rounds: 3,
        rest: "30 segundos",
        videoId: "qOxwOWavX-M",
        videoLabel: "Circuito en sofá · Semana 2",
      },
      3: {
        week: 3,
        rounds: 3,
        rest: "30 segundos",
        videoId: "4El_6369KzQ",
        videoLabel: "Circuito en sofá · Semana 3",
      },
      4: {
        week: 4,
        rounds: 4,
        rest: "30 segundos",
        videoId: "4El_6369KzQ",
        videoLabel: "Circuito en sofá · Semana 4",
      },
    },

    exercises: [
      {
        name: "Sentadilla levantando pies",
        week1: "12 repeticiones",
        week2: "12 repeticiones",
        week3: "15 repeticiones",
        week4: "15 repeticiones",
      },
      {
        name: "Hip Thrust",
        week1: "15 repeticiones",
        week2: "15 repeticiones",
        week3: "20 repeticiones",
        week4: "20 repeticiones",
      },
      {
        name: "Sentadilla con elevación de rodillas",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Tocar punta del pie",
        week1: "12 repeticiones por pierna",
        week2: "12 repeticiones por pierna",
        week3: "15 repeticiones por pierna",
        week4: "15 repeticiones por pierna",
      },
      {
        name: "Patada de glúteo",
        week1: "10 repeticiones por pierna",
        week2: "10 repeticiones por pierna",
        week3: "12 repeticiones por pierna",
        week4: "12 repeticiones por pierna",
      },
      {
        name: "Sentadilla con salto",
        week1: "10 repeticiones",
        week2: "10 repeticiones",
        week3: "12 repeticiones",
        week4: "12 repeticiones",
      },
      {
        name: "Mountain climber",
        week1: "10 repeticiones por pierna",
        week2: "10 repeticiones por pierna",
        week3: "12 repeticiones por pierna",
        week4: "12 repeticiones por pierna",
      },
    ],

    quiz: [
      {
        prompt: "¿Qué ejercicio utiliza principalmente el sofá como apoyo?",
        options: [
          "Hip Thrust",
          "Mountain climber",
          "Tocar punta del pie",
        ],
        correct: 0,
        fact:
          "El sofá puede utilizarse como apoyo para realizar el Hip Thrust, aumentando el rango de movimiento de la cadera.",
      },
      {
        prompt: "¿Cuál de estos ejercicios trabaja especialmente los glúteos?",
        options: [
          "Patada de glúteo",
          "Mountain climber",
          "Tocar punta del pie",
        ],
        correct: 0,
        fact:
          "La patada de glúteo tiene como objetivo principal la extensión de la cadera y la activación de los glúteos.",
      },
      {
        prompt: "¿Qué ejercicio del circuito tiene un componente de carrera en el suelo?",
        options: [
          "Hip Thrust",
          "Mountain climber",
          "Sentadilla levantando pies",
        ],
        correct: 1,
        fact:
          "El mountain climber alterna las piernas en posición de apoyo y combina trabajo de core con una demanda cardiovascular elevada.",
      },
    ],
  },
];

export const getWorkout = (day: number): Workout =>
  WORKOUTS.find((w) => w.id === day) ?? WORKOUTS[0];

export const getWorkoutForWeek = (
  day: number,
  week: WeekNumber
): Workout | undefined => {
  const workout = WORKOUTS.find((w) => w.id === day);
  return workout;
};

export const getWeekConfig = (
  workout: Workout,
  week: WeekNumber
): WeekConfig => {
  return workout.weeks[week];
};

export const getExerciseReps = (
  exercise: Exercise,
  week: WeekNumber
): string => {
  return exercise[`week${week}` as keyof Exercise] as string;
};