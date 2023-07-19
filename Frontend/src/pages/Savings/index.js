import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Home as HomeIcon, AddCircle as AddCircleIcon, AccountCircle as AccountCircleIcon, MonetizationOn as MonetizationOnIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import MenuBar from "../../components/MenuBar";

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
        const response = await axios.put("http://localhost:8000/edit-saving", {
          goal: goalName,
          total: goalTotal,
          payment: payment,
          id: savingGoals[selectedGoalIndex].id
        });
        if (response.status == 200) {
          console.log("edit success");
          setSavingsLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {
        let user_id = Cookies.get("user_id");
        const response = await axios.post("http://localhost:8000/add-saving",{
          goal: goalName,
          total: goalTotal,
          payment: payment,
          date_added: new Date().toLocaleDateString(),
          user_id: user_id,
        });
        if (response.status == 201) {
          console.log("saving goal success:", response.data);
          setSavingsLoaded(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleCloseModal();
  };
  

  const handleDeleteGoal = async (id) => {
    let user_id = Cookies.get("user_id");
    try {
      const response = await axios.post("http://localhost:8000/del-saving", {
        user_id: user_id,
        id: id,
      });
      console.log(response.status)
      if (response.status == 200) {
        console.log("delete success");
        setSavingsLoaded(false);
      }
      
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    const getSavings = async () => {
      try {
        let user_id = Cookies.get("user_id");
        const response = await axios.get(
          `http://localhost:8000/savings/${user_id}`
        );
        if (response.status == 200) {
          setSavingGoals(response.data)
        }
      } catch (error) {
        console.log("failed to get savings");
      };
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

  return (
    <Box bgcolor="#f9766c" minHeight="100vh" p={3}>
      <div display="inline">
        <Typography variant="h6" color="white">$mart Budget</Typography>
        <Typography variant="h4" color="white" paddingBottom="30px" textAlign="center" >Savings</Typography>
      </div>
      <Grid container spacing={3} justifyContent="center">
        <MenuBar/>
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleOpenModal}
              >
                Add Saving Goal
              </Button>
            </Box>
            {savingGoals.length > 0 ? (
              <Grid container spacing={2}>
                {savingGoals.map((goal, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        height: '100%',
                        backgroundColor: '#fafafa',
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h6" component="div">
                          {goal.goal}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditGoal(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteGoal(savingGoals[index].id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        Total Amount: ${goal.total}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Monthly Amount: ${goal.payment}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Created At: {new Date(goal.date_added).toLocaleDateString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No saving goals found. Start by adding a new goal.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
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
    </Box>
  );
};

export default Savings;
