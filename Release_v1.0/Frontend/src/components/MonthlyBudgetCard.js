import React from 'react';
import Card from './Card';
import { formatNumber } from '../supportFunctions';

// Define the Month enum
const Month = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December',
};

const MonthlyBudgetCard = ({ balance, month }) => {
  return (
    <Card color='white'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: '600' }}>Budget for {Month[month]}:</span>
        <span style={{ fontWeight: '600' }}>${formatNumber(balance) || 0}</span>
      </div>
    </Card>
  );
};

export default MonthlyBudgetCard;
