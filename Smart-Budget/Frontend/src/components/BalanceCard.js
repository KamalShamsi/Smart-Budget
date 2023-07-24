import React from 'react';
import Card from './Card';
import { formatNumber } from '../supportFunctions';
const BalanceCard = ({ balance }) => {
  return (
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
        <div>
          <p style={{ color: 'white', marginBottom: '8px' }}>
            Available Balance
          </p>
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
