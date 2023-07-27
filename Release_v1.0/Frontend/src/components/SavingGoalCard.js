import React from 'react';
import Card from './Card';
import { formatNumber } from '../supportFunctions';

// Function to compute the progress percentage based on the goal and balance
const computeProgressPercentage = (goal, balance) => {
  if (!goal || !balance) return 0; // Preventing division by 0
  const progress = (balance / goal) * 100;
  return progress.toFixed(2); // Limiting the decimal places to 2
};

const SavingGoalCard = ({ goal, balance }) => {
  return (
    <Card color='white'>
      {/* Display the goal and balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: '600' }}>Budget for:</span>
        <span style={{ fontWeight: '600' }}>${formatNumber(balance) || 0}</span>
      </div>

      {/* Display the progress percentage */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '600' }}>Progress: </span>
        <span style={{ fontSize: '12px', fontWeight: '600' }}>
          ${formatNumber(balance) || 0} (
          {computeProgressPercentage(goal, balance)}%)
        </span>
      </div>
    </Card>
  );
};

export default SavingGoalCard;
