import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Link } from "@mui/material";
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

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");

  const [ allIncome, setAllIncome ] = useState([])
  const [ allExpense, setAllExpense ] = useState([])

  //getters
  const getCashFlow = async () => {
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

      setAllIncome(incomeRes.data)
      setAllExpense(expenseRes.data)

      console.log("incomes:",allIncome)
      console.log("expenses:",allExpense)

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

      const balanceRes = await axios.get(
        `http://localhost:8000/balance/${userId}`
      );
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

  //gets the total income/expense of the target month given in number
  const getMonthTotalExpense = (target_month) => {
    const filteredItems = allExpense.filter(
      (i) =>
      new Date(i.date_added).getMonth() + 1 === target_month
    );
    let total = filteredItems.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    return total;
  }

  const getMonthTotalIncome = (target_month) => {
    const filteredItems = allIncome.filter(
      (i) =>
      new Date(i.date_added).getMonth() + 1 === target_month
    );
    const total = filteredItems.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    return total;
  }

  const loadData = async () => {
    await getBudget();
    await getCashFlow();
    await getBalance();
  };

  useEffect(() => {
    loadData();
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const currentMonth = today.getMonth() + 1;
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
        {
          // The start of the navigation bar
        }
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
                  Money Management
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
                  bgcolor: "#1b5e20",
                  "&:hover": {
                    bgcolor: "#145214",
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
            <Link href="/profile" color="inherit" underline="none">
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
                <AccountCircleIcon fontSize="large" color="white" />
                <Typography variant="body1" color="white" mt={1}>
                  Profile
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        
        {
          //balance card start
        }
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

        {
          //monthly budget card
        }
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

        {
          //cashflow card
        }
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

        {
          //monthly income & expenses graph
        }
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
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#82ca9d"
                  name="Expenses"
                />
              </LineChart>
            </Box>
          </Paper>
        </Grid>

        {
          //expenses categories breakdown
        }
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