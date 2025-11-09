export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const staticQuizData: QuizQuestion[] = [
  {
    question: "What is the primary function of a car's alternator?",
    options: [
      "A) Start the engine",
      "B) Charge the battery and power electrical systems",
      "C) Pump the brakes",
      "D) Cool the engine"
    ],
    correctAnswer: "B"
  },
  {
    question: "Which car manufacturer is famously known for producing the '911' sports car model?",
    options: [
      "A) Ferrari",
      "B) Lamborghini",
      "C) Porsche",
      "D) Aston Martin"
    ],
    correctAnswer: "C"
  },
  {
    question: "What does 'SUV' stand for in the context of car types?",
    options: [
      "A) Super Utility Vehicle",
      "B) Sport Under Vehicle",
      "C) Standard Utility Van",
      "D) Sport Utility Vehicle"
    ],
    correctAnswer: "D"
  },
  {
    question: "Which system in a car is designed to prevent the wheels from locking up during hard braking?",
    options: [
      "A) Traction Control System (TCS)",
      "B) Anti-lock Braking System (ABS)",
      "C) Electronic Stability Control (ESC)",
      "D) Cruise Control"
    ],
    correctAnswer: "B"
  },
  {
    question: "The first mass-produced automobile, the Model T, was introduced by which company?",
    options: [
      "A) Daimler",
      "B) Mercedes-Benz",
      "C) Ford",
      "D) Peugeot"
    ],
    correctAnswer: "C"
  }
];
