import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense, totalExpenses }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseValueChange = (e) => {
    setExpenseValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      name: expenseName,
      value: expenseValue,
    };

    onAddExpense(newExpense);
    setExpenseName('');
    setExpenseValue('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Expense Name:
        <input type="text" value={expenseName} onChange={handleExpenseNameChange} />
      </label>
      <br />
      <label>
        Expense Value:
        <input type="text" value={expenseValue} onChange={handleExpenseValueChange} />
      </label>
      <br />
      <button type="submit">Add Expense</button>
      <p>Total Expenses: {totalExpenses}</p>
    </form>
  );
};

export default AddExpenseForm;
