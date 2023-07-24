import React, { useState } from 'react';

const AddIncomeForm = ({ onAddIncome }) => {
  const [incomeName, setIncomeName] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');

  const handleIncomeNameChange = (e) => {
    setIncomeName(e.target.value);
  };

  const handleIncomeValueChange = (e) => {
    setIncomeValue(e.target.value);
  };

  const handleIncomeCategoryChange = (e) => {
    setIncomeCategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      name: incomeName,
      value: incomeValue,
      category: incomeCategory,
    };

    onAddIncome(newIncome);
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
        Expense Category:
        <select value={incomeCategory} onChange={handleIncomeCategoryChange}>
          <option value="">Select Category</option>
          {incomeCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncomeForm;
