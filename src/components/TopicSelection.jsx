
import {useState} from "react"

const TopicSelection = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartQuiz(topic);
    }
  };

  return (
    <div className="card">
      <h1>QUIZ GENERATOR</h1>
      <p>Enter a topic to create a quiz!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g., React, Wellness, History"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn primary-btn" disabled={!topic}>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default TopicSelection;