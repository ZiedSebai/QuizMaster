import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { QuizProvider } from '@/context/QuizContext';
import { HomeView } from '@/views/HomeView';
import { QuizView } from '@/views/QuizView';
import { ResultsView } from '@/views/ResultsView';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="quiz-theme">
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/quiz" element={<QuizView />} />
            <Route path="/results" element={<ResultsView />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </ThemeProvider>
  );
}

export default App;
