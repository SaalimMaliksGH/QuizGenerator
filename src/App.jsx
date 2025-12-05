import './App.css'
import { useQuiz } from './context/QuizContext'
import TopicSelection from './components/TopicSelection'
import Loader from './components/Loader'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  const {
    screen,
    topic,
    questions,
    currentQuestionIndex,
    userAnswers,
    score,
    feedback,
    isFeedbackLoading,
    theme,
    toggleTheme,
    startQuiz,
    handleAnswer,
    handleNext,
    handlePrev,
    handleSubmit,
    resetQuiz,
  } = useQuiz();

  return (
    <>
      <h1 className="app-header">Quiz Generator</h1>
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
    </>
  )
}

export default App
