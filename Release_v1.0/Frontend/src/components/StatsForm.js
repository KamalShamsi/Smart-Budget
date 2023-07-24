import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const StatsForm = () => {
  // Sample data for demonstration
  const monthlyStatsData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5500, expenses: 4000 },
    { month: 'Mar', income: 6000, expenses: 3800 },
    { month: 'Apr', income: 6500, expenses: 4200 },
    { month: 'May', income: 7000, expenses: 3900 },
    { month: 'Jun', income: 7500, expenses: 4300 },
  ];

  const yearlyStatsData = [
    { year: '2021', income: 50000, expenses: 35000 },
    { year: '2022', income: 55000, expenses: 40000 },
    { year: '2023', income: 60000, expenses: 38000 },
    { year: '2024', income: 65000, expenses: 42000 },
    { year: '2025', income: 70000, expenses: 39000 },
    { year: '2026', income: 75000, expenses: 43000 },
  ];

  const pieChartData = [
    { category: 'Food', amount: 250 },
    { category: 'Transportation', amount: 180 },
    { category: 'Entertainment', amount: 300 },
    { category: 'Utilities', amount: 200 },
    { category: 'Shopping', amount: 150 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ffc658', '#ffc658'];

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Statistics
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

      <Grid container spacing={3} justifyContent="center" marginTop={4}>
        <Grid item xs={12} sm={6} md={2}>
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
        <Grid item xs={12} sm={6} md={2}>
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
                  Add
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
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
        <Grid item xs={12} sm={6} md={2}>
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
        <Grid item xs={12} sm={6} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/stats" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#9c27b0',
                  '&:hover': {
                    bgcolor: '#7b1fa2',
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
      </Grid>

      <Grid container spacing={3} justifyContent="center" marginTop={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a" mb={2}>
                Monthly Statistics
              </Typography>
              {/* Display your statistics here */}
              {monthlyStatsData.map((stat, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {stat.month} Income: ${stat.income} | Expenses: ${stat.expenses}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a" mb={2}>
                Yearly Statistics
              </Typography>
              {/* Display your statistics here */}
              {yearlyStatsData.map((stat, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  Year {stat.year} | Income: ${stat.income} | Expenses: ${stat.expenses}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" marginTop={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a" mb={2}>
                Expense Categories
              </Typography>
              {/* Display your pie chart here */}
              <PieChart width={400} height={300}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="#132c4a" mb={2}>
                Budget Trends
              </Typography>
              {/* Display your line chart here */}
              <LineChart width={500} height={300} data={monthlyStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
              </LineChart>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" marginTop={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              {/* Additional components or information */}
              {/* Example: */}
              <Typography variant="h6" color="#132c4a">
                Additional Component
              </Typography>
              <Typography variant="body1" gutterBottom>
                Additional information or component content.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              {/* Additional components or information */}
              {/* Example: */}
              <Typography variant="h6" color="#132c4a">
                Additional Component
              </Typography>
              <Typography variant="body1" gutterBottom>
                Additional information or component content.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsForm;

