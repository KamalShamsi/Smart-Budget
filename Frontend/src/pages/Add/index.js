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
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Card>
        <Card color='white' width='40%'>
          <h3>Add Expense</h3>
          <AddExpenseForm onAddExpense={handleAddExpense} />
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
