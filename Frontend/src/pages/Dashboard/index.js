import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Link, Button } from "@mui/material";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Cookies from "js-cookie";
import { Link as RouterLink } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");

  const getCashFlow = async () => {
    try {
      const userId = Cookies.get("user_id");

      const incomeRes = await axios.get(`http://localhost:8000/incomes/${userId}`);

      const expenseRes = await axios.get(`http://localhost:8000/expenses/${userId}`);

      let incomes = incomeRes.data;
      let expenses = expenseRes.data;

      // Calculate the total income
      let totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);

      // Calculate the total expenses
      let totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      setCashFlow(totalIncome - totalExpense);
      setIncome(totalIncome);
      setExpenses(totalExpense);
    } catch (error) {
      console.error("Failed to retrieve cashFlow:", error);
    }
  };

  const getBalance = async () => {
    try {
      const userId = Cookies.get("user_id");

      const balanceRes = await axios.get(`http://localhost:8000/balance/${userId}`);
      let balance = balanceRes.data[0];
      setBalance(balance ? balance.amount : 0);
    } catch (error) {
      console.error("Failed to retrieve balance:", error);
    }
  };

  const loadData = async () => {
    await getCashFlow();
    await getBalance();
  };

  useEffect(() => {
    loadData();
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  // Sample data for demonstration
  const monthlyStatsData = [
    { month: "Jan", income: 5000, expenses: 3500 },
    { month: "Feb", income: 5500, expenses: 4000 },
    { month: "Mar", income: 6000, expenses: 3800 },
    { month: "Apr", income: 6500, expenses: 4200 },
    { month: "May", income: 7000, expenses: 3900 },
    { month: "Jun", income: 7500, expenses: 4300 },
  ];

  const pieChartData = [
    { category: "Food", amount: 250 },
    { category: "Transportation", amount: 180 },
    { category: "Entertainment", amount: 300 },
    { category: "Utilities", amount: 200 },
    { category: "Shopping", amount: 150 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ffc658", "#ffc658"];

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Dashboard
        </Typography>
        <Box bgcolor="#1565c0" height={2} width={150} mx="auto" my={2} borderRadius={5} />
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Link component={RouterLink} to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{ marginRight: '10px', height: 60, width: 130, fontSize: '1.2rem', bgcolor: '#FFC107' }}
          >
            Home
          </Button>
        </Link>
        <Link component={RouterLink} to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{ marginRight: '10px', height: 60, width: 200, fontSize: '1.2rem', bgcolor: '#03A9F4 ' }}
          >
            Management
          </Button>
        </Link>
        <Link component={RouterLink} to="/savings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MonetizationOnIcon />}
            sx={{ marginRight: '10px', height: 60, width: 130, fontSize: '1.2rem', bgcolor: '#FF9800' }}
          >
            Savings
          </Button>
        </Link>
        <Link component={RouterLink} to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={8} sm={5} md={5}>
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
        <Grid item xs={8} sm={5} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Monthly Budget
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                $3,500
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                July Budget
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8} sm={5} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Monthly Income & Expenses
              </Typography>
              <Box display="flex" justifyContent="space-around">
                <Box>
                  <Typography variant="h5" color="#132c4a" mt={1}>
                    ${income}
                  </Typography>
                  <Typography variant="body2" color="#132c4a" mt={1}>
                    {currentMonth} Income
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" color="#132c4a" mt={1}>
                    ${expenses}
                  </Typography>
                  <Typography variant="body2" color="#132c4a" mt={1}>
                    {currentMonth} Expenses
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8} sm={5} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Cash Flow
              </Typography>
              <Typography variant="h5" color="#132c4a" mt={1}>
                ${cashFlow}
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                Cash Flow = Income - Expense
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8} sm={5} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Monthly Income & Expenses
              </Typography>
              <LineChart width={650} height={300} data={monthlyStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
              </LineChart>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8} sm={6} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a">
                Expense Categories Breakdown
              </Typography>
              <Box display="flex" justifyContent="center">
                <PieChart width={250} height={300}>
                  <Pie
                    data={pieChartData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Box textAlign="left" ml={4}>
                  {pieChartData.map((entry, index) => (
                    <Typography key={index} variant="body2" color="#132c4a">
                      {entry.category}: ${entry.amount}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
