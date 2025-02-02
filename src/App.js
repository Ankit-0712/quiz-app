import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
import LeaderBoard from "./components/LeaderBoard";
import "./App.css";

const apiUrl = "http://localhost:5000/api/quiz"; // Ensure API is running

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Quiz Data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      console.log("✅ API Full Response:", JSON.stringify(data, null, 2));

      if (data?.questions && Array.isArray(data.questions)) {
        const formattedQuestions = data.questions.map((q, index) => {
          console.log(`🔹 Processing Question ${index + 1}:`, q);

          return {
            question: q?.description?.trim() || "No question available",
            options: q?.options && Array.isArray(q.options)
              ? q.options.map(opt => opt.description)
              : ["Option 1", "Option 2", "Option 3", "Option 4"], // Fallback options
            correctAnswer: q?.options?.find(opt => opt.is_correct)?.description || "",
          };
        });

        console.log("📌 Formatted Questions:", formattedQuestions);
        setQuizData(formattedQuestions);
      } else {
        throw new Error("Invalid API format: 'questions' array not found.");
      }
    } catch (error) {
      console.error("🚨 Error fetching data:", error);
      setError(`Failed to load quiz data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="app">Loading quiz data...</div>;
  if (error) return <div className="app error">{error}</div>;

  return (
    <div className="app">
      {!quizStarted && !quizCompleted && <QuizStart onStart={() => setQuizStarted(true)} />}
      
      {quizStarted && !quizCompleted && quizData.length > 0 && (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}></div>
          </div>
          
          <QuizQuestion
            question={quizData[currentQuestion]?.question || "Question not found"}
            options={quizData[currentQuestion]?.options || []}
            onAnswer={(selectedOption) => {
              const isCorrect = selectedOption === quizData[currentQuestion].correctAnswer;
              if (isCorrect) {
                setScore((prev) => prev + 1);
                setStreak((prev) => prev + 1);
                setMaxStreak((prevMax) => Math.max(prevMax, streak + 1));
              } else {
                setStreak(0);
              }
            }}
            onNext={() => {
              if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
              } else {
                setQuizCompleted(true);
              }
            }}
          />
          <LeaderBoard score={score} />
        </>
      )}

      {quizCompleted && <QuizResult score={score} totalQuestions={quizData.length} streak={maxStreak} onRestart={() => window.location.reload()} />}
    </div>
  );
};

export default App;
