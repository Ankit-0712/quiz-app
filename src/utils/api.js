// src/utils/api.js
import axios from 'axios';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    console.log('API Response:', response.data); // Log the API response

    // Map the API response to the expected structure
    const quizData = response.data.questions.map((question) => {
      if (!question.description || !question.detailed_solution) {
        console.error('Invalid question format:', question);
        return null;
      }
      return {
        question: question.description, // Use 'description' as the question
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], // Mock options
        correctAnswer: question.detailed_solution, // Use 'detailed_solution' as the correct answer
      };
    }).filter(Boolean); // Remove null values

    return { questions: quizData }; // Return the mapped data
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return null;
  }
};