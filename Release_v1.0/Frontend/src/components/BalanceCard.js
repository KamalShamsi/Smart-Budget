import React from 'react';
import Card from './Card';
import { formatNumber } from '../supportFunctions';

// BalanceCard component that displays the available balance.
// It receives the 'balance' prop, which is the current available balance to be shown.
const BalanceCard = ({ balance }) => {
  return (
    // Custom Card component with a blue background color and a height of 10rem.
    <Card color='#064495' height={'10rem'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Section displaying the title "Available Balance" */}
        <div>
          <p style={{ color: 'white', marginBottom: '8px' }}>
            Available Balance
          </p>
          {/* Section displaying the formatted available balance amount */}
          <p
            style={{
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold',
              margin: '0',
            }}
          >
            ${formatNumber(balance) || 0}
          </p>
        </div>
        {/* Link to view more details, directing to '/details' */}
        <a
          style={{
            textDecoration: 'none',
            color: 'white',
            marginTop: 'auto',
            fontSize: '14px',
          }}
          href='/details'
        >
          See Details
        </a>
      </div>
    </Card>
  );
};

export default BalanceCard;
