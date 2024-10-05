import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>Select a category:</h2>
      <div className="category-buttons">
        <Link to="/quiz/programming" className="category-button">Programming</Link>
        <Link to="/quiz/sports" className="category-button">Sports</Link>
      </div>
    </div>
  );
}

export default Home;