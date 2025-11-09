import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function QuizView() {
  const navigate = useNavigate();
  const { topic, quizData, currentQuestionIndex, setCurrentQuestionIndex, addAnswer } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (quizData.length === 0) {
      navigate('/');
    }
  }, [quizData, navigate]);

  if (quizData.length === 0) return null;

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizData.length) * 100;

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    addAnswer({
      questionIndex: currentQuestionIndex,
      selectedAnswer: selectedOption,
      isCorrect: correct,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Quiz: <span className="text-blue-600 dark:text-blue-400">{topic}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-top-8 duration-700">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
              {Math.round(progress)}% Complete
            </p>
          </div>

          <Card className="border-2 border-blue-200 dark:border-blue-900 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {currentQuestion.options.map((option, index) => {
                const optionLetter = option.charAt(0);
                const isSelected = selectedOption === optionLetter;
                const isCorrectOption = optionLetter === currentQuestion.correctAnswer;

                let cardClasses = 'border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:scale-102';

                if (!showFeedback) {
                  cardClasses += isSelected
                    ? ' border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-500 shadow-md'
                    : ' border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700';
                } else {
                  if (isCorrectOption) {
                    cardClasses += ' border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-500';
                  } else if (isSelected && !isCorrect) {
                    cardClasses += ' border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-500';
                  } else {
                    cardClasses += ' border-gray-200 dark:border-gray-700 opacity-50';
                  }
                }

                return (
                  <Card
                    key={index}
                    className={cardClasses}
                    onClick={() => handleOptionSelect(optionLetter)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="text-lg text-gray-800 dark:text-gray-200">
                        {option}
                      </span>
                      {showFeedback && isCorrectOption && (
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 animate-in zoom-in duration-300" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 animate-in zoom-in duration-300" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          {showFeedback && (
            <Card className={`border-2 animate-in slide-in-from-bottom-4 duration-500 ${
              isCorrect
                ? 'border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-500'
                : 'border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-500'
            }`}>
              <CardContent className="p-6 flex items-center gap-4">
                {isCorrect ? (
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-600 dark:text-red-400 flex-shrink-0" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${
                    isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className={`text-sm ${
                    isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  }`}>
                    {isCorrect
                      ? 'Great job! You got it right.'
                      : `The correct answer is ${currentQuestion.correctAnswer}.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 h-12 px-6"
            >
              <ArrowLeft className="h-5 w-5" />
              Previous
            </Button>

            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className="flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'View Results'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
