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
import Footer from "../../components/Footer";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [budget, setBudget] = useState(0);

  const [monthlyStatsData, setMonthlyStatsData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  //gets data 
  const getData = async () => {
    try {
      const userId = Cookies.get("user_id");

      const incomeRes = await axios.get(`http://localhost:8000/incomes/${userId}`);

      const expenseRes = await axios.get(`http://localhost:8000/expenses/${userId}`);

      let incomes = incomeRes.data;
      let expenses = expenseRes.data;
      var temp = [];

      //get month totals
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

      // Calculate data for expenses pie chart
      const indexing = ["food", "housing", "entertainment", "utilities", "transportation"];
      var temp = [{category:"food", amount:0}, {category:"housing", amount:0}, {category:"entertainment", amount:0},
                    {category:"utilities", amount:0}, {category:"transportation", amount:0}];
      const thisMonthExpenses = expenses.filter(
        (i) =>
        new Date(i.date_added).getMonth() + 1 === currentMonthNumber
      );
      for (let i = 0; i < thisMonthExpenses.length; i++) {
        var item = thisMonthExpenses[i]
        var index = indexing.indexOf(item.category);
        temp[index].amount = temp[index].amount + Number(item.amount);
      };
      setPieChartData(temp);

      setCashFlow(totalIncome - totalExpense);
      setIncome(totalIncome);
      setExpenses(totalExpense);
    } catch (error) {
      console.error("Failed to retrieve cashFlow:", error);
    }
  };

  //gets the balance from the db
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

  //gets the budget from the db
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

  //calls all getters async
  const loadData = async () => {
    await getData();
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

  //gets dates and data on page render
  useEffect(() => {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
    loadData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#D88484", "#D884D1"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bgcolor='white' sx={{ border: '1px solid black' }}>
          <p className="label">{`${payload[0].name} : ${Math.round((payload[0].value / expenses) * 10000)/100}%`}</p>
        </Box>
      );
    }
  
    return null;
  };


  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>

      {
        //dashboard
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
        {
          //balance card
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
          // monthly budget card
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
          //cash flow card
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
          //cartesian graph
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
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
              </LineChart>
            </Box>
          </Paper>
        </Grid>

        {
          //pie chart
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
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={CustomTooltip}/>
                </PieChart>
                <Box textAlign="left" ml={8} mt={8}>
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
      <Footer/>
    </Box>
  );
};

export default Dashboard;