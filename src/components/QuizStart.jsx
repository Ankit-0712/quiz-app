// src/components/QuizStart.jsx
import React from 'react';

const QuizStart = ({ onStart }) => {
  return (
    <div className="quiz-start">
      <h1>Welcome to the Quiz!</h1>
      <p>Test your knowledge and earn points!</p>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;