import React, { useState } from 'react';

const AddIncomeForm = ({ onAddIncome }) => {
  // State variables to store the input values for income name, value, and category
  const [incomeName, setIncomeName] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');

  // Event handler for income name input change
  const handleIncomeNameChange = (e) => {
    setIncomeName(e.target.value);
  };

  // Event handler for income value input change
  const handleIncomeValueChange = (e) => {
    setIncomeValue(e.target.value);
  };

  // Event handler for income category selection change
  const handleIncomeCategoryChange = (e) => {
    setIncomeCategory(e.target.value);
  };

  // Event handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new income object with the input values
    const newIncome = {
      name: incomeName,
      value: incomeValue,
      category: incomeCategory,
    };

    // Call the onAddIncome function with the new income object to add it to the incomes list
    onAddIncome(newIncome);

    // Clear the input fields after adding the income
    setIncomeName('');
    setIncomeValue('');
    setIncomeCategory('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Income Name:
        <input type="text" value={incomeName} onChange={handleIncomeNameChange} />
      </label>
      <br />
      <label>
        Income Value:
        <input type="text" value={incomeValue} onChange={handleIncomeValueChange} />
      </label>
      <label>
        Income Category:
        {/* Dropdown select for income category */}
        <select value={incomeCategory} onChange={handleIncomeCategoryChange}>
          <option value="">Select Category</option>
          {/* Map through the incomeCategories array to generate options for each category */}
          {incomeCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {/* Display category name along with its icon */}
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      {/* Submit button to add the income */}
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncomeForm;
