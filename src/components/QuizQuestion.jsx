import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const QuizQuestion = ({ question, options, correctAnswer, onAnswer, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    
    setSelectedOption(null);
    setIsCorrect(null);
  }, [question, options]);

  if (!question || !options.length) {
    return <div className="no-data">No question data available.</div>;
  }

  const handleAnswer = () => {
    if (selectedOption !== null && correctAnswer !== undefined && correctAnswer !== "") {
      const selectedAnswerText = options[selectedOption]; 
      const correct = selectedAnswerText === correctAnswer; 
  
      console.log("Selected Option:", selectedAnswerText);
      console.log("Correct Answer from API:", correctAnswer);
      console.log("Is Correct:", correct);
  
      setIsCorrect(correct);
      onAnswer(correct);
  
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
        onNext();
      }, 1000);
    } else {
      console.log("Error: correctAnswer is undefined or empty.");
    }
  };
  

  return (
    <motion.div
      className="quiz-question"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{question}</h2>

      <ul>
        {options.map((option, index) => (
          <motion.li
            key={index}
            className={`option ${selectedOption === index ? "selected" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedOption(index)} 
          >
            <label>
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                readOnly 
              />
              {option}
            </label>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="submit-btn"
        onClick={handleAnswer}
        disabled={selectedOption === null}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Submit Answer
      </motion.button>

      {isCorrect !== null && (
        <motion.div
          className={`feedback ${isCorrect ? "correct" : "incorrect"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? "🎉 Correct!" : "😢 Incorrect!"}
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizQuestion;
