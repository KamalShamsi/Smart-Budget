import React from 'react'
import { useNavigate } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function StatsPage() {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/add');
  };
  const data = [{date: 'June', savings: 1000}, {date: 'August', savings: 2400}, {date:'September', savings:5000}, {date:'October', savings:3200}];

  return (
    <div className='stats-page'>
      Stats-Page
      <div className='savings-graph'>
        Savings Graph
        <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <Line type="monotone" dataKey="savings" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Savings', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
        </LineChart>
        <div className="bottomBar">
          <BottomBar onAddButtonClick={handleAddButtonClick} />
        </div>
      </div>
    </div>
  )
}

export default StatsPage