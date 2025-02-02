import React from "react";
import { motion } from "framer-motion";

const QuizStart = ({ onStart }) => {
  return (
    <motion.div
      className="quiz-start"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to the Quiz! 🎉
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Test your knowledge, challenge yourself, and earn points!
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={onStart}
      >
        Start Quiz 🚀
      </motion.button>
    </motion.div>
  );
};

export default QuizStart;
