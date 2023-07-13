import React, { useState } from 'react';
import AddSavingGoalForm from '../../components/AddSavingGoalForm'
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';

export default function Savings() {
  const [savingGoal, setSavingGoal] = useState([]);

  const handleAddSavingGoal = (savingData) => {
    setSavingGoal([savingGoal, savingData])
  };

  savingGoal.forEach(function(entry) {
    console.log(entry);
  });

  return (
    <div>

        <Card color='white' width='40%'>
          <h3>Add Saving Goal</h3>
          <AddSavingGoalForm onAddSaving={handleAddSavingGoal} />
        </Card>

      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
