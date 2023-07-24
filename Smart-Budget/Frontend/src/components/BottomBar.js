import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function BottomBar({ onAddButtonClick }) {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHomeClick = () => {
    navigate('/dashboard'); // Navigate to the Dashboard page
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the Profile page
  };

  return (
    <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} onClick={handleHomeClick} />
      <BottomNavigationAction label="Stats" value="stats" icon={<InsertChartIcon />} />
      <BottomNavigationAction
        label="Add"
        value="add"
        icon={<AddCircleIcon fontSize="large" />}
        onClick={onAddButtonClick}
      />
      <BottomNavigationAction label="Balance" value="balance" icon={<AccountBalanceWalletIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} onClick={handleProfileClick} />
    </BottomNavigation>
  );
}