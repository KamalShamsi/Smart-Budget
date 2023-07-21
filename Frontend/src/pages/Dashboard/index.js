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
  const [budget, setBudget] = useState(0);

  const [monthlyStatsData, setMonthlyStatsData] = useState([]);

  let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const getData = async () => {
    try {
      const userId = Cookies.get("user_id");

      const incomeRes = await axios.get(`http://localhost:8000/incomes/${userId}`);

      const expenseRes = await axios.get(`http://localhost:8000/expenses/${userId}`);

      let incomes = incomeRes.data;
      let expenses = expenseRes.data;
      var temp = [];
      for (let i = 1; i < 13; i++) {
        let monthIncome = getMonthTotal(i, incomes);
        let monthExpense = getMonthTotal(i, expenses);
        temp.push({month:monthNames[i-1], income:monthIncome, expenses:monthExpense});
      }
      setMonthlyStatsData(temp);

      const currentDate = new Date();
      const currentMonthNumber = currentDate.getMonth() + 1;
      
      // Calculate the total income
      let totalIncome = getMonthTotal(currentMonthNumber, incomes);

      // Calculate the total expenses
      let totalExpense = getMonthTotal(currentMonthNumber, expenses);

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

  const getBudget = async () => {
    try {
      const userId = Cookies.get("user_id");

      const res = await axios.get(
        `http://localhost:8000/budget/${userId}`
      );
      if (res.status == 200) {
        if (res.data.length > 0) {
          setBudget(res.data[0].amount)
        }
      }
      
    } catch (error) {
      console.error("Failed to retrieve budget:", error);
    }
  };

  const loadData = async () => {
    getCashFlow();
    await getBalance();
    await getBudget();
  };

  //gets the total income/expense of the target month given in number
  const getMonthTotal = (target_month, items) => {
    const filteredItems = items.filter(
      (i) =>
      new Date(i.date_added).getMonth() + 1 === target_month
    );
    let total = filteredItems.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    return total;
  }

  useEffect(() => {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
    getData();
  }, []);

  // Sample data for demonstration
  /*
  const monthlyStatsData = [
    { month: "Jan", income: 5000, expenses: 3500 },
    { month: "Feb", income: 5500, expenses: 4000 },
    { month: "Mar", income: 6000, expenses: 3800 },
    { month: "Apr", income: 6500, expenses: 4200 },
    { month: "May", income: 7000, expenses: 3900 },
    { month: "Jun", income: 7500, expenses: 4300 },
  ];
  */

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

      {
        //Page Title
      }
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
                ${budget}
              </Typography>
              <Typography variant="body2" color="#132c4a" mt={1}>
                July Budget
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {
          //monthly income & expenses
        }
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
