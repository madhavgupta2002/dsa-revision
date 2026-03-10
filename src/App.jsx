import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const sheets = [
    { name: 'Monster', file: 'monster.md' },
    { name: 'Fraz', file: 'fraz.md' },
    { name: 'Striver 79', file: 'striver79.md' },
    { name: 'Amazon 300', file: 'amazon300.md' },
  ];

  // Get URL parameters
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      sheet: params.get('sheet'),
      question: parseInt(params.get('question')) || 0,
    };
  };

  // Update URL based on sheet and question
  const updateUrl = (sheetName, questionIndex) => {
    const url = sheetName
      ? `?sheet=${sheetName}&question=${questionIndex}`
      : '/';
    window.history.pushState({}, '', url);
  };

  const loadSheet = (sheet) => {
    setSelectedSheet(sheet);
    setLoading(true);
    setCurrentIndex(0);
    updateUrl(sheet.name.toLowerCase(), 0);

    fetch(`/${sheet.file}`)
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
        console.error('Error loading sheet:', error);
        setLoading(false);
      });
  };

  const goBackToSelection = () => {
    setSelectedSheet(null);
    setQuestions([]);
    setCurrentIndex(0);
    updateUrl(null, 0);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateUrl(selectedSheet.name.toLowerCase(), newIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateUrl(selectedSheet.name.toLowerCase(), newIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle initial load from URL and back button navigation
  useEffect(() => {
    const params = getUrlParams();

    if (params.sheet) {
      // Find and load the sheet based on URL parameter
      const sheet = sheets.find(s => s.name.toLowerCase() === params.sheet);
      if (sheet) {
        setSelectedSheet(sheet);
        setLoading(true);

        fetch(`/${sheet.file}`)
          .then(response => response.text())
          .then(text => {
            const questionBlocks = text
              .split(/(?=###\s*Q\d+\))/)
              .map(q => q.trim())
              .filter(q => q.length > 0 && q.startsWith('###'));
            setQuestions(questionBlocks);
            setCurrentIndex(Math.min(params.question, questionBlocks.length - 1));
            setLoading(false);
          })
          .catch(error => {
            console.error('Error loading sheet:', error);
            setLoading(false);
          });
      }
    }
  }, []); // Only run on mount

  // Handle back button (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      const params = getUrlParams();

      if (params.sheet) {
        const sheet = sheets.find(s => s.name.toLowerCase() === params.sheet);
        if (sheet && selectedSheet?.file === sheet.file) {
          // Same sheet, just update question index
          setCurrentIndex(params.question);
        } else if (sheet) {
          // Different sheet
          setSelectedSheet(sheet);
          setLoading(true);

          fetch(`/${sheet.file}`)
            .then(response => response.text())
            .then(text => {
              const questionBlocks = text
                .split(/(?=###\s*Q\d+\))/)
                .map(q => q.trim())
                .filter(q => q.length > 0 && q.startsWith('###'));
              setQuestions(questionBlocks);
              setCurrentIndex(Math.min(params.question, questionBlocks.length - 1));
              setLoading(false);
            })
            .catch(error => {
              console.error('Error loading sheet:', error);
              setLoading(false);
            });
        }
      } else {
        // No sheet in URL, go back to selection
        setSelectedSheet(null);
        setQuestions([]);
        setCurrentIndex(0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedSheet]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (!swipeEnabled) return;

      const swipeThreshold = 50; // Minimum distance to trigger swipe
      const difference = touchStartX - touchEndX;

      // Swipe left (next question)
      if (difference > swipeThreshold) {
        handleNext();
      }
      // Swipe right (previous question)
      else if (difference < -swipeThreshold) {
        handlePrevious();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, questions.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentIndex < questions.length - 1) {
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          updateUrl(selectedSheet?.name.toLowerCase(), newIndex);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          setCurrentIndex(newIndex);
          updateUrl(selectedSheet?.name.toLowerCase(), newIndex);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, questions.length, selectedSheet]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading sheet...</p>
      </div>
    );
  }

  if (!selectedSheet) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>🚀 DSA Revision Hub</h1>
        </header>
        <main className="content-container selection-container">
          <div className="selection-card">
            <h2>Select a Sheet</h2>
            <p>Choose which sheet you want to practice:</p>
            <div className="sheet-buttons">
              {sheets.map((sheet) => (
                <button
                  key={sheet.file}
                  className="sheet-button"
                  onClick={() => loadSheet(sheet)}
                >
                  <span className="sheet-icon">📄</span>
                  <span className="sheet-name">{sheet.name}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-container">
        <h2>No questions found</h2>
        <p>Please make sure the sheet exists.</p>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ '--zoom-level': zoomLevel }}>
      <header className="app-header">
        <h1 className="clickable-title" onClick={goBackToSelection}>🚀 DSA Revision Hub</h1>
        <div className="sheet-indicator">
          <strong>{selectedSheet.name}</strong>
        </div>
        <div className="header-controls">
          <button
            className="swipe-toggle-button"
            onClick={() => setSwipeEnabled(!swipeEnabled)}
            title={swipeEnabled ? 'Disable swipe navigation' : 'Enable swipe navigation'}
          >
            {swipeEnabled ? '👆 Swipe ON' : '👆 Swipe OFF'}
          </button>
          <div className="zoom-control">
            <span className="zoom-label">🔍 Zoom:</span>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="zoom-slider"
              title={`Current zoom: ${Math.round(zoomLevel * 100)}%`}
            />
            <span className="zoom-percent">{Math.round(zoomLevel * 100)}%</span>
          </div>
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
                updateUrl(selectedSheet.name.toLowerCase(), index);
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

      <div className="mobile-nav-left">
        <button
          className="mobile-nav-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          title="Previous"
        >
          ←
        </button>
      </div>

      <div className="mobile-nav-right">
        <button
          className="mobile-nav-button"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          title="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default App;
