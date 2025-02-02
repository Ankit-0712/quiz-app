import React, { useState } from "react";
import { motion } from "framer-motion";

const QuizQuestion = ({ question, options, onAnswer, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Handle missing data
  if (!question || !options.length) {
    return <div>No question data available.</div>;
  }

  const handleAnswer = () => {
    if (selectedOption !== null) {
      // Compare the selected option value with the correct answer value
      const correct = selectedOption === question.correctAnswer;
 // Fix comparison here
      setIsCorrect(correct);
      onAnswer(correct);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
        onNext();
      }, 1000);
    }
  };

  return (
    <div className="quiz-question">
      <h2>{question}</h2> {/* Render the question text */}
      <ul>
        {options.map((option, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <label>
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          </motion.li>
        ))}
      </ul>
      <button onClick={handleAnswer} disabled={selectedOption === null}>
        Submit Answer
      </button>
      {isCorrect !== null && (
        <motion.div
          className="feedback"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? "Correct! 🎉" : "Incorrect! 😢"}
        </motion.div>
      )}
    </div>
  );
};

export default QuizQuestion;
