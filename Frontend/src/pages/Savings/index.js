import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
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
  LinearProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const Savings = () => {
  const [savingGoals, setSavingGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    setSelectedGoalIndex(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedGoalIndex !== null) {
      const updatedGoal = {
        goalName,
        totalAmount,
        monthlyAmount,
        createdAt: savingGoals[selectedGoalIndex].createdAt,
      };
      const updatedGoals = [...savingGoals];
      updatedGoals[selectedGoalIndex] = updatedGoal;
      setSavingGoals(updatedGoals);
    } else {
      const newGoal = {
        goalName,
        totalAmount,
        monthlyAmount,
        createdAt: new Date().toLocaleDateString(),
      };
      setSavingGoals([...savingGoals, newGoal]);
    }
    handleCloseModal();
  };

  const handleDeleteGoal = (index) => {
    setSavingGoals(savingGoals.filter((_, i) => i !== index));
  };

  const handleEditGoal = (index) => {
    const goal = savingGoals[index];
    setGoalName(goal.goalName);
    setTotalAmount(goal.totalAmount);
    setMonthlyAmount(goal.monthlyAmount);
    setSelectedGoalIndex(index);
    handleOpenModal();
  };

  const resetForm = () => {
    setGoalName('');
    setTotalAmount('');
    setMonthlyAmount('');
  };

  const calculateProgress = (goal) => {
    const progress = (goal.monthlyAmount / goal.totalAmount) * 100;
    return progress.toFixed(2);
  };

  const calculateEstimatedTime = (goal) => {
    const months = Math.ceil(goal.totalAmount / goal.monthlyAmount);
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    return today.toLocaleDateString();
  };

  const calculateProgressBarColor = (goal) => {
    const progress = (goal.monthlyAmount / goal.totalAmount) * 100;
    return progress >= 100 ? 'primary' : 'secondary';
  };

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
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Link to="/add" style={{ textDecoration: 'none' }}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Link to="/savings" style={{ textDecoration: 'none' }}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{ borderRadius: 20, textTransform: 'none' }}
              >
                Add Saving Goal
              </Button>
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                  {selectedGoalIndex !== null ? 'Edit' : 'Add'} Saving Goal
                </DialogTitle>
                <DialogContent>
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      label="Goal Name"
                      fullWidth
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Total Amount"
                      fullWidth
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Monthly Amount"
                      fullWidth
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    variant="contained"
                    color="primary"
                  >
                    {selectedGoalIndex !== null ? 'Update' : 'Create'} Goal
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">
                Saving Goals
              </Typography>
              {savingGoals.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Goal Name</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Monthly Amount</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Estimated Time</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {savingGoals.map((goal, index) => (
                        <TableRow key={index}>
                          <TableCell>{goal.goalName}</TableCell>
                          <TableCell>${goal.totalAmount}</TableCell>
                          <TableCell>${goal.monthlyAmount}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box width="100%" mr={1}>
                                <LinearProgress
                                  variant="determinate"
                                  value={calculateProgress(goal)}
                                  color={calculateProgressBarColor(goal)}
                                />
                              </Box>
                              <Box minWidth={35}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {calculateProgress(goal)}%
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {calculateEstimatedTime(goal)}
                          </TableCell>
                          <TableCell>
                            {new Date(goal.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditGoal(index)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => handleDeleteGoal(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" mt={2}>
                  No saving goals found.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Savings;
