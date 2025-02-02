// src/components/QuizResult.jsx
import React from 'react';

const QuizResult = ({ score, totalQuestions, streak, onRestart }) => {
  return (
    <div className="quiz-result">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Longest Streak: {streak} 🔥</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default QuizResult;