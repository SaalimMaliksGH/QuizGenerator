import { createContext, useContext, useState, useEffect } from 'react';
import { generateAIFeedback, generateQuizQuestions } from '../ai-service';

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  // Quiz state
  const [screen, setScreen] = useState("start");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Actions
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

  const handleSubmit = async () => {
    // Calculate Score
    let newScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    
    // Switch to result screen
    setScreen("result");
    setIsFeedbackLoading(true);

    // Fetch AI feedback
    const aiFeedback = await generateAIFeedback(topic, newScore, questions.length);
    
    setFeedback(aiFeedback);
    setIsFeedbackLoading(false);
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

  const value = {
    // State
    screen,
    topic,
    questions,
    currentQuestionIndex,
    userAnswers,
    score,
    feedback,
    isFeedbackLoading,
    theme,
    
    // Actions
    toggleTheme,
    startQuiz,
    handleAnswer,
    handleNext,
    handlePrev,
    handleSubmit,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
