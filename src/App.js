import React, { useState, useEffect } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
import LeaderBoard from "./components/LeaderBoard";
import "./App.css";


const apiUrl = "http://localhost:5000/api/quiz"; 

const App = () => {
  const [quizData, setQuizData] = useState([]);   
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);        
  const [quizStarted, setQuizStarted] = useState(false);  
  const [quizCompleted, setQuizCompleted] = useState(false); 
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data?.questions && Array.isArray(data.questions)) {
        const formattedQuestions = data.questions.map((q) => {
          console.log("Full Question Data:", q);  

          const correctAnswer = q?.options?.find(opt => opt.is_correct)?.description;
          console.log("Correct Answer for this Question:", correctAnswer);

          if (!correctAnswer) {
            console.warn("No correct answer found for question:", q.description);
          }

          return {
            question: q.description?.trim() || "No question available",
            options: q.options && Array.isArray(q.options)
              ? q.options.map(opt => opt.description)  
              : ["Option 1", "Option 2", "Option 3", "Option 4"],  
            correctAnswer: correctAnswer || "",  
          };
        });
        console.log("Formatted Questions:", formattedQuestions); 
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

  const handleAnswer = (selectedOptionIndex) => {
    const selectedAnswerText = quizData[currentQuestion]?.options[selectedOptionIndex];
    const isCorrect = selectedAnswerText === quizData[currentQuestion]?.correctAnswer;

    console.log("Selected Answer:", selectedAnswerText);
    console.log("Correct Answer:", quizData[currentQuestion]?.correctAnswer);

    if (isCorrect) {
      setScore((prevScore) => {
        const updatedScore = prevScore + 1;
        console.log("Updated Score:", updatedScore); 
        return updatedScore;
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1); 
    } else {
      setQuizCompleted(true); 
    }
  };

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
            correctAnswer={quizData[currentQuestion]?.correctAnswer || ""}  
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
          <LeaderBoard score={score} /> {}
        </> 
      )}

      {quizCompleted && <QuizResult score={score} totalQuestions={quizData.length} onRestart={() => window.location.reload()} />}
    </div>
  );
};

export default App;
