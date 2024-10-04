import React from "react";
import Quiz from "./Quiz";
import './App.css';
import './quiz.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Welcome to the Ultimate Quiz Challenge!</h1>
        <p>Test your knowledge and see how many you can get right!</p>
      </header>
      <main className="quiz-wrapper">
        <Quiz />
      </main>
    </div>
  );
}

export default App;
