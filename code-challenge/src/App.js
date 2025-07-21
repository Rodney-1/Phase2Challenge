import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, use} from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

function App() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/goals')
        .then(response => response.json())
        ,then(setGoals);
    }, []);

    return (
        <div className="App">
            <h1>Goal Tracker</h1>
            <GoalForm setGoals={setGoals} />
            <DepositForm setGoals={setGoals} />
            <Overview goals={goals} />
            <GoalList goals={goals} setGoals={setGoals} />
        </div>
    );
}

const useFetchGoals = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/goals')
            .then(response => response.json())
            .then(setGoals);
    }, []);

    return goals;
};

const API_URL = 'http://localhost:3001/goals';

export default App;