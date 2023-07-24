import React from 'react';
import Card from './Card';
import { formatNumber } from '../supportFunctions';

export default function CashCard({ income, expenses }) {
  return (
    <div>
      <span
        style={{
          marginLeft: '10px',
          fontWeight: 'bold',
          color: 'gray',
        }}
      >
        Cash
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >
        <Card color='white' width='40%'>
          <div
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              background: 'gray',
              marginBottom: '2rem',
            }}
          ></div>
          <div style={{ fontWeight: '600', marginBottom: '1rem' }}>
            ${formatNumber(income) || 0}
          </div>
          <div>Income</div>
        </Card>
        <div style={{ width: '10px' }}></div>
        <Card color='white' width='40%'>
          <div
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              background: 'gray',
              marginBottom: '2rem',
            }}
          ></div>
          <div style={{ fontWeight: '600', marginBottom: '1rem' }}>
            ${formatNumber(expenses) || 0}
          </div>
          <div>Expenses</div>
        </Card>
      </div>
    </div>
  );
}
