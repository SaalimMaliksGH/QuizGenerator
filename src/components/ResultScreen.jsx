const ResultScreen = ({ score, total, feedback, loading, onRetry }) => {
  return (
    <div className="card result-card">
      <h1>Quiz Completed!</h1>
      
      <div className="score-circle">
        {score} / {total}
      </div>

      <div className="feedback-section">
        {loading ? (
          <p className="loading-text">Analyzing your performance...</p>
        ) : (
          <p className="feedback-text">"{feedback}"</p>
        )}
      </div>

      <button onClick={onRetry} className="btn primary-btn">
        Try New Topic
      </button>
    </div>
  );
};

export default ResultScreen;