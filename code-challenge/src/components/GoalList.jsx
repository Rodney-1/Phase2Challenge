	
import React from 'react';

function GoalList({ goals, setGoals }) {
  function handleDelete(id) {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    });
  }

  return (
    <div>
      <h2>All Goals</h2>
      {goals.map((g) => (
        <div key={g.id}>
          <h3>{g.name}</h3>
          <p>Category: {g.category}</p>
          <p>Target: {g.targetAmount}</p>
          <p>Saved: {g.savedAmount}</p>
          <p>Deadline: {g.deadline}</p>
          <button onClick={() => handleDelete(g.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default GoalList;
