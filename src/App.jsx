import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the questions.md file
    fetch('/questions.md')
      .then(response => response.text())
      .then(text => {
        // Split by question headers (### Q1), ### Q2), etc.)
        const questionBlocks = text
          .split(/(?=###\s*Q\d+\))/)
          .map(q => q.trim())
          .filter(q => q.length > 0 && q.startsWith('###'));
        setQuestions(questionBlocks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrevious();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, questions.length]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading DSA Questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-container">
        <h2>No questions found</h2>
        <p>Please make sure questions.md exists in the public folder.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 DSA Revision Hub</h1>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="question-counter">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </header>

      <main className="content-container">
        <div className="question-card">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {questions[currentIndex]}
          </ReactMarkdown>
        </div>
      </main>

      <footer className="navigation-footer">
        <button
          className="nav-button prev-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <span className="arrow">←</span>
          <span className="button-text">Previous</span>
        </button>

        <div className="dots-container">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={`Go to question ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="nav-button next-button"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          <span className="button-text">Next</span>
          <span className="arrow">→</span>
        </button>
      </footer>

      <div className="keyboard-hint">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
}

export default App;
