import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Home, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function ResultsView() {
  const navigate = useNavigate();
  const { topic, quizData, answers, resetQuiz } = useQuiz();

  useEffect(() => {
    if (answers.length === 0) {
      navigate('/');
    }
  }, [answers, navigate]);

  if (answers.length === 0) return null;

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correctAnswers / quizData.length) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { text: 'Excellent!', color: 'text-green-600 dark:text-green-400', emoji: '🏆' };
    if (percentage >= 70) return { text: 'Great Job!', color: 'text-blue-600 dark:text-blue-400', emoji: '🎉' };
    if (percentage >= 50) return { text: 'Good Effort!', color: 'text-yellow-600 dark:text-yellow-400', emoji: '👍' };
    return { text: 'Keep Practicing!', color: 'text-orange-600 dark:text-orange-400', emoji: '💪' };
  };

  const grade = getGrade();

  const handleRetry = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="flex justify-center">
              <Trophy className="h-24 w-24 text-yellow-500 dark:text-yellow-400 animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              Quiz Complete!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Topic: <span className="font-semibold text-purple-600 dark:text-purple-400">{topic}</span>
            </p>
          </div>

          <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-t-lg text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <span className="text-4xl">{grade.emoji}</span>
                {grade.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <p className="text-2xl text-gray-700 dark:text-gray-300">
                  {correctAnswers} out of {quizData.length} correct
                </p>
              </div>

              <Progress value={percentage} className="h-4" />

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {correctAnswers}
                      </p>
                    </div>
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Incorrect</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {quizData.length - correctAnswers}
                      </p>
                    </div>
                    <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
                Question Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizData.map((question, index) => {
                const answer = answers.find((a) => a.questionIndex === index);
                const isCorrect = answer?.isCorrect;

                return (
                  <Card
                    key={index}
                    className={`border-2 ${
                      isCorrect
                        ? 'border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-700'
                        : 'border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-700'
                    }`}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Your answer:</span>{' '}
                              {answer?.selectedAnswer}
                            </p>
                            {!isCorrect && (
                              <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Correct answer:</span>{' '}
                                {question.correctAnswer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-700 delay-700">
            <Button
              onClick={handleRetry}
              className="h-14 px-8 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Try Another Quiz
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="h-14 px-8 text-lg border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950 font-semibold transition-all duration-300"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
