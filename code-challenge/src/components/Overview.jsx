	
import React from 'react';

function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount);
  const now = new Date();

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: {totalSaved}</p>
      <p>Completed Goals: {completed.length}</p>

  <ul>
    {goals.map((g) => {
      const deadline = new Date(g.deadline);
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      let status = '';

      if (g.savedAmount >= g.targetAmount) {
        status = 'Completed';
      } else if (daysLeft < 0) {
        status = 'Overdue';
      } else if (daysLeft <= 30) {
        status = 'Approaching Deadline';
      }

      return (
        <li key={g.id}>
          {g.name} - {status} ({daysLeft} days left)
        </li>
      );
    })}
  </ul>
</div>
  );
}

export default Overview;