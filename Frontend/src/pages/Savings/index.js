import React, { useState } from 'react';
import AddSavingGoal from '../../components/AddSavingGoal'
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';

export default function Savings() {
  const [savingGoal, setSavingGoal] = useState([]);

  const handleAddExpense = (expenseData) => {
    setExpenses([...expenses, expenseData]);
    console.log('Expense added:', expenseData);
  };

  const handleAddSavingGoal = (savingData) => {
    setSavingGoal([...savingData, savingData]);
  };

  return (
    <div>
      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
