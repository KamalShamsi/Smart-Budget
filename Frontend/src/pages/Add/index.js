import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const AddTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('income');

  const handleAddTransaction = () => {
    const newTransaction = {
      name,
      value,
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);
    setName('');
    setValue('');
  };

  const handleDeleteTransaction = (index) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, i) => i !== index)
    );
  };

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Add Transaction
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
        <Grid item xs={6} sm={3} md={2}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Link href="/stats" color="inherit" underline="none">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                transition="background-color 0.3s ease-in-out"
                sx={{
                  bgcolor: '#6a1b9a',
                  '&:hover': {
                    bgcolor: '#4a148c',
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

      <Box mt={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Value"
              variant="outlined"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color={type === 'income' ? 'primary' : 'secondary'}
              onClick={() => setType('income')}
              fullWidth
            >
              Income
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color={type === 'expense' ? 'primary' : 'secondary'}
              onClick={() => setType('expense')}
              fullWidth
            >
              Expense
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTransaction}
              fullWidth
            >
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      Income
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      Value
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .filter((transaction) => transaction.type === 'income')
                  .map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>${transaction.value}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteTransaction(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="secondary">
                      Expense
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="secondary">
                      Value
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="secondary">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="secondary">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .filter((transaction) => transaction.type === 'expense')
                  .map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>${transaction.value}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteTransaction(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTransaction;
