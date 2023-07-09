import React from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceCard from '../../components/BalanceCard';
import MonthlyBudgetCard from '../../components/MonthlyBudgetCard';
import SanvingGoalCard from '../../components/SavingGoalCard';
import './styles.css';
import CashCard from '../../components/CashCard';
import BottomBar from '../../components/BottomBar';

export default function Dashboard({ balance, month, goal, income, expenses }) {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/add');
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h3 style={{ margin: 0 }}>Dashboard</h3>
      </div>
      <hr />
      <div className="dashboard-card-container">
        <BalanceCard balance="3500" />
        <MonthlyBudgetCard balance="3500" month="January" />
        <SanvingGoalCard goal="15000" balance="9800" />
        <CashCard income="4530" expenses="2500" />
      </div>
      <div className="bottomBar">
        <BottomBar onAddButtonClick={handleAddButtonClick} />
      </div>
    </div>
  );
}
