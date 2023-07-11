import React, { useState } from 'react';
import AddIncomeForm from '../../components/AddIncomeForm';
import AddExpenseForm from '../../components/AddExpenseForm';
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';

export default function Add() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddIncome = (incomeData) => {
    setIncomes([...incomes, incomeData]);
    console.log('Income added:', incomeData);
  };

  const handleAddExpense = (expenseData) => {
    setExpenses([...expenses, expenseData]);
    console.log('Expense added:', expenseData);
  };

  const totalIncomes = incomes.reduce((total, income) => total + parseFloat(income.value), 0);
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.value), 0);

  console.log('Total Incomes:', totalIncomes);
  console.log('Total Expenses:', totalExpenses);

  return (
    <div>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >

        <Card color='white' width='40%'>
          <h3>Add Income</h3>
          <AddIncomeForm onAddIncome={handleAddIncome} totalIncomes={totalIncomes} />
        </Card>
        <Card color='white' width='40%'>
          <h3>Add Expense</h3>
          <AddExpenseForm onAddExpense={handleAddExpense} totalExpenses={totalExpenses} />
        </Card>
      </div>

      <div 
        style={{
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >
        <Card color='white' width='40%'>
          <h3>Add Saving Goal</h3>
        </Card>
        <Card color='white' width='40%'>
          <h3>Change Budget</h3>
        </Card>

      </div>

      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
