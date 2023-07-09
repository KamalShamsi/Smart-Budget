import React from 'react';
import AddIncomeForm from '../../components/AddIncomeForm';
import AddExpenseForm from '../../components/AddExpenseForm';
import BottomBar from '../../components/BottomBar';

export default function Add() {
  const handleAddIncome = (incomeData) => {
    // Handle adding income
    console.log('Adding income:', incomeData);
  };

  const handleAddExpense = (expenseData) => {
    // Handle adding expense
    console.log('Adding expense:', expenseData);
  };

  return (
    <div>
      <h3>Add Income</h3>
      <AddIncomeForm onAddIncome={handleAddIncome} />
      <h3>Add Expense</h3>
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <BottomBar />
    </div>
  );
}
