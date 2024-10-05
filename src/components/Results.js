import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import quotes from '../quotes';

function Results() {
  const location = useLocation();
  const { score, total, category } = location.state || {};

  const getRandomQuote = () => {
    if (!category || !quotes[category]) {
      return "Great job on completing the quiz!";
    }

    const percentage = (score / total) * 100;
    let quoteCategory;
    if (percentage >= 80) {
      quoteCategory = 'high';
    } else if (percentage >= 50) {
      quoteCategory = 'medium';
    } else {
      quoteCategory = 'low';
    }
    const categoryQuotes = quotes[category][quoteCategory];
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  };

  const data = [
    { name: 'Correct', value: score },
    { name: 'Incorrect', value: total - score },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p>You scored {score} out of {total}</p>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <p className="quote">{getRandomQuote()}</p>
      <div className="button-container">
        <Link to="/" className="home-button">Back to Home</Link>
        {category && (
          <Link to={`/quiz/${category}`} className="retry-button">Try Again</Link>
        )}
      </div>
    </div>
  );
}

export default Results;