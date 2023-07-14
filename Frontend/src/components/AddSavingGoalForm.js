import React, { useState } from 'react';
import axios from "axios";

const AddSavingGoalForm = () => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/savings", {
        savingName,
        savingTotal,
        savingPayment,
      });

      if (response.status === 200) {
        console.log("save goal succeed:", response.data);
      } else {
        console.log("save goal failed:", response.data.message);
      }
    } catch (error) {
      console.error("save goal failed:", error.response.data.error);
    }
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
