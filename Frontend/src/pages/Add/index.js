import React from 'react';
import AddIncomeForm from '../../components/AddIncomeForm';
import AddExpenseForm from '../../components/AddExpenseForm';
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';


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
      <Card color='white' width='40%'>
        <h3>Add Income</h3>
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Card>
      <Card color='white' width='40%'>
        <h3>Add Expense</h3>
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Card>
      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
