import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

export default function BottomBar({ onAddButtonClick }) { // Accept onAddButtonClick as a prop
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Stats" value="stats" icon={<InsertChartIcon />} />
      <BottomNavigationAction
        label="Add"
        value="add"
        icon={<AddCircleIcon fontSize="large" />}
        onClick={onAddButtonClick} // Call the provided click handler
      />
      <BottomNavigationAction label="Balance" value="balance" icon={<AccountBalanceWalletIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
