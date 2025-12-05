const Loader = ({ topic }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Preparing questions for: <strong>{topic}</strong>...</p>
    </div>
  );
};

export default Loader;