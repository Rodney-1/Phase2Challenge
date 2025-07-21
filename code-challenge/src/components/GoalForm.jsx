import React, { useState } from 'react';

function GoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...formData,
      savedAmount: 0,
      targetAmount: Number(formData.targetAmount),
    };

fetch('http://localhost:3001/goals', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newGoal),
})
  .then((res) => res.json())
  .then((newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
  });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Goal name" required />
      <input name="targetAmount" type="number" value={formData.targetAmount} onChange={handleChange} placeholder="Target Amount" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
