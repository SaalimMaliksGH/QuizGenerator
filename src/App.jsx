import { useState, useEffect } from 'react'
import './App.css'

import TopicSelection from './components/TopicSelection'
import Loader from './components/Loader'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import { generateAIFeedback, generateQuizQuestions } from './ai-service'

function App() {
  
  const [screen, setScreen] = useState("start");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const startQuiz = async (selectedTopic) => {
    setTopic(selectedTopic);
    setScreen("loading");
    try {
      const data = await generateQuizQuestions(selectedTopic);
      setQuestions(data);
      setScreen("quiz");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error generating quiz. Please try again.");
      setScreen("start");
    }
  };

  const handleAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // UPDATED: Handle Submit with Async Feedback
  const handleSubmit = async () => {
    // 1. Calculate Score Locally
    let newScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    
    // 2. Switch screen immediately so user sees the score
    setScreen("result");
    setIsFeedbackLoading(true); // Start loading feedback

    // 3. Fetch specific feedback from Gemini
    const aiFeedback = await generateAIFeedback(topic, newScore, questions.length);
    
    setFeedback(aiFeedback);
    setIsFeedbackLoading(false); // Stop loading feedback
  };

  const resetQuiz = () => {
    setScreen("start");
    setTopic("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setFeedback("");
    setIsFeedbackLoading(false);
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      
      {screen === "start" && <TopicSelection onStartQuiz={startQuiz} />}
      
      
      {screen === "loading" && <Loader topic={topic} />}


      {screen === "quiz" && (
        <QuizScreen
          questions={questions}
          currentIndex={currentQuestionIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onAnswer={handleAnswer}
          userAnswers={userAnswers}
          onSubmit={handleSubmit}
        />
      )}


      {screen === "result" && (
        <ResultScreen 
          score={score} 
          total={questions.length} 
          feedback={feedback}
          loading={isFeedbackLoading} 
          onRetry={resetQuiz} 
        />
      )}
    </div>
  )
}

export default App
