import React, { useState } from 'react';

const AddIncomeForm = ({ onAddIncome, totalIncomes }) => {
  const [incomeName, setIncomeName] = useState('');
  const [incomeValue, setIncomeValue] = useState('');

  const handleIncomeNameChange = (e) => {
    setIncomeName(e.target.value);
  };

  const handleIncomeValueChange = (e) => {
    setIncomeValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      name: incomeName,
      value: incomeValue,
    };

    onAddIncome(newIncome);
    setIncomeName('');
    setIncomeValue('');
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
      <br />
      <br />
      <button type="submit">Add Income</button>
      <p>Total Incomes: {totalIncomes}</p>
    </form>
  );
};

export default AddIncomeForm;
