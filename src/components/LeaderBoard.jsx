import React from 'react';

const LeaderBoard = ({ score }) => {
  return (
    <div className="leaderBoard">
      <h2>Leaderboard</h2>
      <p>Your Rank: 1st 🏆</p>
      <p>Your Score: {score}</p>
    </div>
  );
};

export default LeaderBoard;
