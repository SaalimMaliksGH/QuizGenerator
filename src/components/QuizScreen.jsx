const QuizScreen = ({
  questions,
  currentIndex,
  onNext,
  onPrev,
  onAnswer,
  userAnswers,
  onSubmit,
}) => {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  
  // Progress Bar Calculation
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="card quiz-card">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="step-count">Question {currentIndex + 1} of {totalQuestions}</p>

      {/* Split Layout: Question Left, Options Right */}
      <div className="quiz-split-layout">
        {/* Question Section - Left */}
        <div className="question-section">
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>

        {/* Options Section - Right */}
        <div className="options-section">
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => {
              const isSelected = userAnswers[currentQuestion.id] === option;
              return (
                <button
                  key={index}
                  className={`option-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => onAnswer(currentQuestion.id, option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button 
          onClick={onPrev} 
          className="btn secondary-btn" 
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        
        {currentIndex === totalQuestions - 1 ? (
          <button onClick={onSubmit} className="btn success-btn">
            Finish Quiz
          </button>
        ) : (
          <button onClick={onNext} className="btn primary-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;