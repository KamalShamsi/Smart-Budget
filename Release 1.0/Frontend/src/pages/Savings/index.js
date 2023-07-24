import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from "../../components/Footer";
import backgroundImg from '../../images/background.jpg';

const Savings = () => {
  const [savingGoals, setSavingGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTotal, setGoalTotal] = useState('');
  const [payment, setPayment] = useState('');
  const [savingsLoaded, setSavingsLoaded] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    setSelectedGoalIndex(null);
  };

  const addSavingGoal = async () => {
    if (selectedGoalIndex != null) {
      try {
        const response = await axios.put('http://localhost:8000/edit-saving', {
          goal: goalName,
          total: goalTotal,
          payment: payment,
          id: savingGoals[selectedGoalIndex].id,
        });
        if (response.status === 200) {
          console.log('edit success');
          setSavingsLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let user_id = Cookies.get('user_id');
        const response = await axios.post('http://localhost:8000/add-saving', {
          goal: goalName,
          total: goalTotal,
          payment: payment,
          date_added: new Date().toLocaleDateString(),
          user_id: user_id,
        });
        if (response.status === 201) {
          console.log('saving goal success:', response.data);
          setSavingsLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleCloseModal();
  };

  const handleDeleteGoal = async (id) => {
    let user_id = Cookies.get('user_id');
    try {
      const response = await axios.post('http://localhost:8000/del-saving', {
        user_id: user_id,
        id: id,
      });
      console.log(response.status);
      if (response.status === 200) {
        console.log('delete success');
        setSavingsLoaded(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSavings = async () => {
      try {
        let user_id = Cookies.get('user_id');
        const response = await axios.get(`http://localhost:8000/savings/${user_id}`);
        if (response.status === 200) {
          setSavingGoals(response.data);
        }
      } catch (error) {
        console.log('failed to get savings');
      }
    };
    getSavings();
    setSavingsLoaded(true);
  }, [savingsLoaded]);

  const handleEditGoal = (index) => {
    const goal = savingGoals[index];
    setGoalName(goal.goal);
    setGoalTotal(goal.total);
    setPayment(goal.payment);
    setSelectedGoalIndex(index);
    handleOpenModal();
  };

  const resetForm = () => {
    setGoalName('');
    setGoalTotal('');
    setPayment('');
  };

  const calculateDateToReachGoal = (total, payment, createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const monthsPassed = (today.getFullYear() - createdDate.getFullYear()) * 12 + today.getMonth() - createdDate.getMonth();
    const remainingAmount = total - monthsPassed * payment;
    const monthsToReachGoal = Math.ceil(remainingAmount / payment);
    if (monthsToReachGoal > 0) {
      const targetDate = new Date(createdAt);
      targetDate.setMonth(targetDate.getMonth() + monthsPassed + monthsToReachGoal);
      return targetDate.toLocaleDateString();
    } else {
      return "Goal Reached";
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 3, backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Savings
        </Typography>
        <Box height={2} width={150} mx="auto" my={2} borderRadius={5} />
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{ marginRight: '10px', height: 60, width: 130, fontSize: '1.2rem', bgcolor: '#FFC107' }}
          >
            Home
          </Button>
        </Link>
        <Link to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{ marginRight: '10px', height: 60, width:200, fontSize: '1.2rem', bgcolor: '#03A9F4 ' }}
          >
            Management
          </Button>
        </Link>
        <Link to="/savings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MonetizationOnIcon />}
            sx={{ marginRight: '10px', height:60, width: 130, fontSize: '1.2rem', bgcolor: '#FF9800' }}
          >
            Savings
          </Button>
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon />}
            sx={{ fontSize: '1.2rem', height: 60, width: 130, bgcolor: '#4CAF50' }}
          >
            Profile
          </Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleOpenModal}
      >
        Add Saving Goal
      </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginBottom: 2, mt: 3, width: '80%', mx: 'auto', bgcolor: '#E1F5FE', }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Goal Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Monthly Amount</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Date to Reach Goal</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savingGoals.map((goal, index) => (
              <TableRow key={index}>
                <TableCell>{goal.goal}</TableCell>
                <TableCell>${goal.total}</TableCell>
                <TableCell>${goal.payment}</TableCell>
                <TableCell>{new Date(goal.date_added).toLocaleDateString()}</TableCell>
                <TableCell>{calculateDateToReachGoal(goal.total, goal.payment, goal.date_added)}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary" onClick={() => handleEditGoal(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteGoal(goal.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedGoalIndex !== null ? 'Edit Goal' : 'Add Goal'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Name"
            fullWidth
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Total"
            type="number"
            fullWidth
            value={goalTotal}
            onChange={(e) => setGoalTotal(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Payment"
            type="number"
            fullWidth
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={addSavingGoal} color="primary">
            {selectedGoalIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Box position="fixed" bottom={0} left={0} right={0} p={2}>
          <Footer />
        </Box>
    </Box>
  );
};

export default Savings;
