import { constrainedMemory } from "process";
import React, {useState} from "react";

function DepositForm({ goals, setGoals }) {
    const [amount, setAmount] = useState("");
    const [ goal, setGoalId ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const selectedGoal = goals.find(g => g.id === goal);
        if (!selectedGoal) {
            alert("Please select a valid goal.");
            return;
        }
        if (amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const updatedGoal = Number(selectedGoal.amount) + Number(amount);

        fetch('http://localhost:3001/goals/${goalId}', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: updatedGoal }),
        })
            .then(response => response.json())
            .then(updatedGoal => {
                setGoals(prev =>
                    prev.map(g => {
                        if (g.id === goal) {
                            return { ...g, amount: updatedGoal };
                        }
                        return g;
                    })
                );
            });
        }
    
        return (
            <form onSubmit={handleSubmit}>
                <h2>Deposit to a Goal</h2>
                <select value={goal} onChange={e => setGoalId(e.target.value)} required>
                    <option value="" disabled>Select a goal</option>
                    {goals.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Deposit</button>
            </form>
        );
    }

export default DepositForm;