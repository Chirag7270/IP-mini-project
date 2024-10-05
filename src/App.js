import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import './App.css';
import './quiz.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Welcome to the Ultimate Quiz Challenge!</h1>
          <p>Test your knowledge and see how many you can get right!</p>
        </header>
        <main className="quiz-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:category" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;