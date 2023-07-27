import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense, expenseCategories }) => {
  // State variables to store the input values for expense name, value, and category
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  // Event handler for expense name input change
  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  // Event handler for expense value input change
  const handleExpenseValueChange = (e) => {
    setExpenseValue(e.target.value);
  };

  // Event handler for expense category selection change
  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  // Event handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new expense object with the input values
    const newExpense = {
      name: expenseName,
      value: expenseValue,
      category: expenseCategory,
    };

    // Call the onAddExpense function with the new expense object to add it to the expenses list
    onAddExpense(newExpense);

    // Clear the input fields after adding the expense
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
        {/* Dropdown select for expense category */}
        <select value={expenseCategory} onChange={handleExpenseCategoryChange}>
          <option value="">Select Category</option>
          {/* Map through the expenseCategories array to generate options for each category */}
          {expenseCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {/* Display category name along with its icon */}
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      {/* Submit button to add the expense */}
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
