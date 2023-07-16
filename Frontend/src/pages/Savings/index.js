import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import axios from "axios";


const Savings = () => {
  const [savingGoals, setSavingGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');

  const handleDeleteSavingGoal = async (index) => {
    try {
      const response = await axios.delete('http://localhost:8000/savings', {data: {
        goal:savingGoals[index].goalname,
        total:savingGoals[index].totalamount,
        monthly:savingGoals[index].monthlyamount
      }});
      if (response.status === 200) {
        console.log("delete success:", response.data);
      } else {
        console.log("delete failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const calculateMonthsToGoal = (totalAmount, monthlyAmount) => {
    if (monthlyAmount <= 0) {
      return 'Infinity';
    }
    return Math.ceil(totalAmount / monthlyAmount);
  };

  //send data to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:8000/savings", {goalName:goalName, totalAmount:totalAmount, monthlyAmount:monthlyAmount});

      if (response.status === 200) {
        console.log("save goal succeed:", response.data);
      } else {
        console.log("save goal failed:", response.data.message);
      }
      setGoalName('');
      setTotalAmount('');
      setMonthlyAmount('');

    } catch (error) {
      console.error("save goal failed:", error.response.data.error);
    }

  };
  
  //get goals from db and setgoals
  useEffect(() => {
    axios
      .get("http://localhost:8000/savings")
      .then((res) => {
        setSavingGoals(res.data.saving.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Savings
        </Typography>
        <Box
          bgcolor="#1565c0"
          height={2}
          width={150}
          mx="auto"
          my={2}
          borderRadius={5}
        />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/dashboard" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
                <HomeIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Home
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/add" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#0d47a1',
                  '&:hover': {
                    bgcolor: '#0a3b8d',
                  },
                }}
              >
                <AddCircleIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                Money Management
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/profile" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#1b5e20',
                  '&:hover': {
                    bgcolor: '#145214',
                  },
                }}
              >
                <AccountCircleIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Profile
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/savings" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#ff6f00',
                  '&:hover': {
                    bgcolor: '#e65100',
                  },
                }}
              >
                <MonetizationOnIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Savings
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box mb={2}>
              <form onSubmit={handleFormSubmit}>
                <Typography variant="h6" color="primary">
                  Add Saving Goal
                </Typography>
                <Box display="flex" mt={2}>
                  <Box mr={2}>
                    <Typography variant="body1">Goal Name:</Typography>
                    <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                  </Box>
                  <Box mr={2}>
                    <Typography variant="body1">Total Amount:</Typography>
                    <input type="text" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                  </Box>
                  <Box mr={2}>
                    <Typography variant="body1">Monthly Amount:</Typography>
                    <input type="text" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} />
                  </Box>
                  <Button type="submit" variant="contained" color="primary">
                    Add Goal
                  </Button>
                </Box>
              </form>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">
                Saving Goals
              </Typography>

              <TableContainer component={Paper} mt={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Goal Name</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Monthly Amount</TableCell>
                      <TableCell>Months to Reach Goal</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savingGoals.map((goal, index) => (
                      <TableRow key={index}>
                        <TableCell>{goal.goalname}</TableCell>
                        <TableCell>${goal.totalamount}</TableCell>
                        <TableCell>${goal.monthlyamount}</TableCell>
                        <TableCell>{calculateMonthsToGoal(goal.totalamount, goal.monthlyamount)}</TableCell>
                        <TableCell>
                          <IconButton color="secondary" onClick={() => handleDeleteSavingGoal(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    
  );
};

export default Savings;