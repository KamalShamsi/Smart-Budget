import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Link } from "@mui/material";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      const userId = Cookies.get("user_id");

      const incomeRes = await axios.get(
        `http://localhost:8000/incomes/${userId}`
      );

      const expenseRes = await axios.get(
        `http://localhost:8000/expenses/${userId}`
      );

      let incomes = incomeRes.data;
      let expenses = expenseRes.data;

      // Calculate the total income
      let totalIncome = incomes.reduce(
        (sum, income) => sum + parseFloat(income.amount),
        0
      );

      // Calculate the total expenses
      let totalExpense = expenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );

      // Calculate the balance
      let balance = totalIncome - totalExpense;
      setBalance(balance);
    } catch (error) {
      console.error("Failed to retrieve balance:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Dashboard
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
                  bgcolor: "#1976d2",
                  "&:hover": {
                    bgcolor: "#1565c0",
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
                  bgcolor: "#0d47a1",
                  "&:hover": {
                    bgcolor: "#0a3b8d",
                  },
                }}
              >
                <AddCircleIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Add
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
                  bgcolor: "#1b5e20",
                  "&:hover": {
                    bgcolor: "#145214",
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
                  bgcolor: "#ff6f00",
                  "&:hover": {
                    bgcolor: "#e65100",
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
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/stats" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: "#9c27b0",
                  "&:hover": {
                    bgcolor: "#7b1fa2",
                  },
                }}
              >
                <AssessmentIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Stats
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Balance
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                ${balance}
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                Available Balance
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Monthly Budget
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                $3,500
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                January Budget
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Savings Goal
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                $9,800
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                Progress towards $15,000 goal
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Cash Flow
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                $2,030
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                $4,530 income - $2,500 expenses
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" color="#132c4a" mb={2}>
              Recent Transactions
            </Typography>
            {/* Place your recent transactions component here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
