import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense, expenseCategories }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseValueChange = (e) => {
    setExpenseValue(e.target.value);
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      name: expenseName,
      value: expenseValue,
      category: expenseCategory,
    };

    onAddExpense(newExpense);
    setExpenseName('');
    setExpenseValue('');
    setExpenseCategory('');
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
      <label>
        Expense Category:
        <select value={expenseCategory} onChange={handleExpenseCategoryChange}>
          <option value="">Select Category</option>
          {expenseCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
