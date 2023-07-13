import React, { useState } from 'react';

const AddSavingGoalForm = ({ onAddSaving }) => {
  const [savingName, setSavingName] = useState('');
  const [savingTotal, setSavingTotal] = useState('');
  const [savingPayment, setSavingPayment] = useState('');

  const handleSavingName = (e) => {
    setSavingName(e.target.value);
  };

  const handleSavingTotal = (e) => {
    setSavingTotal(e.target.value);
  }

  const handleSavingPayment = (e) => {
    setSavingPayment(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newSaving = {
        name:savingName,
        total:savingTotal,
        payment:savingPayment,
    };

    onAddSaving(newSaving)
    setSavingName('');
    setSavingTotal('');
    setSavingPayment('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Saving Name:
        <input type="text" value={savingName} onChange={handleSavingName} />
      </label>
      <br />
      <label>
        Saving Total:
        <input type="text" value={savingTotal} onChange={handleSavingTotal} />
      </label>
      <br />
      <label>
        Saving Payment:
        <input type="text" value={savingPayment} onChange={handleSavingPayment} />
      </label>
      <br />
      <button type="submit">Add Saving Goal</button>
    </form>
  );
};

export default AddSavingGoalForm;
