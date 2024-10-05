import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../quizdata';

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(quizData[category]);
  }, [category]);

  const handleAnswerOptionClick = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      navigate('/results', { 
        state: { 
          score: newScore, 
          total: questions.length, 
          category: category 
        } 
      });
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="question-box">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{questions[currentQuestion].question}</div>
        </div>
        <div className="answer-section">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerOptionClick(index)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;