import { createContext, useContext, useState, ReactNode } from 'react';
import { QuizQuestion } from '@/data/quizData';

interface Answer {
  questionIndex: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;
  quizData: QuizQuestion[];
  setQuizData: (data: QuizQuestion[]) => void;
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  resetQuiz: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [topic, setTopic] = useState('');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const addAnswer = (answer: Answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const resetQuiz = () => {
    setTopic('');
    setQuizData([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <QuizContext.Provider
      value={{
        topic,
        setTopic,
        quizData,
        setQuizData,
        answers,
        addAnswer,
        resetQuiz,
        currentQuestionIndex,
        setCurrentQuestionIndex,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
