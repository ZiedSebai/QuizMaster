import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Brain, Zap, AlertCircle } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function HomeView() {
  const [inputTopic, setInputTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setTopic, setQuizData, resetQuiz } = useQuiz();

  const handleGenerateQuiz = async () => {
    if (!inputTopic.trim()) return;

    setIsGenerating(true);
    setError('');
    resetQuiz();

    try {
      const response = await fetch('http://localhost:3000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: inputTopic.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const quizData = await response.json();

      setTopic(inputTopic);
      setQuizData(quizData);
      navigate('/quiz');
    } catch (err) {
      setError('Failed to generate quiz. Please make sure the backend server is running.');
      console.error('Error generating quiz:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Brain className="h-20 w-20 text-orange-500 dark:text-orange-400 animate-pulse" />
                <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-spin-slow" />
              </div>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              QuizMaster
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Test your knowledge on any topic! Enter a subject below and challenge yourself with our interactive quiz.
            </p>
          </div>

          <Card className="border-2 border-orange-200 dark:border-orange-900 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  Choose Your Topic
                </label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., Cars, Space, History, Science..."
                  value={inputTopic}
                  onChange={(e) => setInputTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                  className="h-14 text-lg border-2 focus:border-orange-400 dark:focus:border-orange-500"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={handleGenerateQuiz}
                disabled={!inputTopic.trim() || isGenerating}
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Quiz...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Quiz
                  </span>
                )}
              </Button>

              {error && (
                <Card className="border-2 border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-700 animate-in slide-in-from-top-2 duration-300">
                  <CardContent className="p-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            {[
              { icon: Brain, text: '5 Questions', color: 'text-orange-500' },
              { icon: Zap, text: 'Instant Feedback', color: 'text-amber-500' },
              { icon: Sparkles, text: 'Fun & Interactive', color: 'text-yellow-500' },
            ].map((item, index) => (
              <Card
                key={index}
                className="border border-orange-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
