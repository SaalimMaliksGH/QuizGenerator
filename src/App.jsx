import { useState } from 'react'
import './App.css'

import TopicSelection from './components/TopicSelection'
import Loader from './components/Loader'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  
  const [screen, setScreen] = useState("start");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  


  return (
    <div className="app-container">
      
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
