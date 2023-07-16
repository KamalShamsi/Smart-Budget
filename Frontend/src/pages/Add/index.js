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
  Modal,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Assessment as AssessmentIcon,
  ViewList as ViewListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const AddTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const [transactionCategory, setTransactionCategory] = useState('food');
  const [transactionName, setTransactionName] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState('income');
  const [budget, setBudget] = useState(0);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [budgetError, setBudgetError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewAllTransactions = (type) => {
    setSelectedTransactionType(type);
    setShowAllTransactions(true);
  };

  const handleViewTransactionsClose = () => {
    setShowAllTransactions(false);
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      name: transactionName,
      value: transactionValue,
      type: transactionType,
      date: new Date().toLocaleDateString(),
      category: transactionCategory,
    };

    setTransactions([...transactions, newTransaction]);
    setTransactionName('');
    setTransactionValue('');
    setOpen(false);
  };

  const handleDeleteTransaction = (index) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, i) => i !== index)
    );
  };

  const getCurrentMonthTotal = (type) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.type === type &&
        new Date(transaction.date).getMonth() + 1 === currentMonth &&
        new Date(transaction.date).getFullYear() === currentYear
    );

    const total = filteredTransactions.reduce(
      (sum, transaction) => sum + parseFloat(transaction.value),
      0
    );

    return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handleBudgetDialogOpen = () => {
    setBudgetDialogOpen(true);
  };

  const handleBudgetDialogClose = () => {
    setBudgetDialogOpen(false);
    setBudgetError(false);
  };

  const handleBudgetInputChange = (event) => {
    setBudget(parseFloat(event.target.value));
  };

  const handleSetBudget = () => {
    if (budget < 0) {
      setBudgetError(true);
      return;
    }

    setBudgetDialogOpen(false);
  };

  const handleDeleteBudget = () => {
    setBudget(0);
  };

  return (
    <>
      <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" color="white">
            Money Management
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
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={3}
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ marginRight: 2 }}
              >
                Add Transaction
              </Button>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewAllTransactions('income')}
                  sx={{ marginRight: 2 }}
                >
                  View All Incomes
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleViewAllTransactions('expense')}
                >
                  View All Expenses
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <Typography variant="h5" color="primary" align="center" mb={3}>
                Add Transaction
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="transaction-type-label">
                      Transaction Type
                    </InputLabel>
                    <Select
                      labelId="transaction-type-label"
                      id="transaction-type-select"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      <MenuItem value="income">Income</MenuItem>
                      <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {transactionType === 'expense' && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="transaction-category-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="transaction-category-label"
                        id="transaction-category-select"
                        value={transactionCategory}
                        onChange={(e) => setTransactionCategory(e.target.value)}
                      >
                        <MenuItem value="food">Food</MenuItem>
                        <MenuItem value="utilities">Utilities</MenuItem>
                        <MenuItem value="housing">Housing</MenuItem>
                        <MenuItem value="transportation">Transportation</MenuItem>
                        <MenuItem value="entertainment">Entertainment</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={transactionName}
                    onChange={(e) => setTransactionName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Value"
                    variant="outlined"
                    fullWidth
                    value={transactionValue}
                    onChange={(e) => setTransactionValue(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTransaction}
                >
                  Add Transaction
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        <Modal
          open={showAllTransactions}
          onClose={handleViewTransactionsClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showAllTransactions}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                maxWidth: '800px',
                width: '100%',
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                align="center"
                mb={3}
              >
                View All {selectedTransactionType === 'income' ? 'Incomes' : 'Expenses'}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color={selectedTransactionType === 'income' ? 'primary' : 'secondary'}
                        >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color={selectedTransactionType === 'income' ? 'primary' : 'secondary'}
                        >
                          Value
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color={selectedTransactionType === 'income' ? 'primary' : 'secondary'}
                        >
                          Date
                        </Typography>
                      </TableCell>
                      {selectedTransactionType === 'expense' && (
                        <TableCell>
                          <Typography
                            variant="h6"
                            color={selectedTransactionType === 'income' ? 'primary' : 'secondary'}
                          >
                            Category
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography
                          variant="h6"
                          color={selectedTransactionType === 'income' ? 'primary' : 'secondary'}
                        >
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions
                      .filter((transaction) => transaction.type === selectedTransactionType)
                      .map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{transaction.name}</TableCell>
                          <TableCell>${transaction.value}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          {transaction.type === 'expense' && <TableCell>{transaction.category}</TableCell>}
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
            </Box>
          </Fade>
        </Modal>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={3}
          mt={2}
        >
          {budget === 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBudgetDialogOpen}
              startIcon={<EditIcon />}
            >
              Set Budget
            </Button>
          ) : (
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" color="primary" align="center">
                Monthly Budget ({new Date().toLocaleString('en-us', { month: 'long' })})
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="baseline"
                mt={2}
              >
                <Typography variant="h4" color="primary" align="center">
                  {budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteBudget}
                  startIcon={<DeleteIcon />}
                  sx={{ ml: 2 }}
                >
                  Delete Budget
                </Button>
              </Box>
            </Paper>
          )}
        </Box>

        <Modal
          open={budgetDialogOpen}
          onClose={handleBudgetDialogClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={budgetDialogOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <Typography variant="h5" color="primary" align="center" mb={3}>
                Set Budget
              </Typography>
              <Typography variant="body1" align="center" mb={3}>
                Set the budget for the month of {new Date().toLocaleString('en-us', { month: 'long' })}.
              </Typography>
              <TextField
                label="Budget Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={budget}
                onChange={handleBudgetInputChange}
                error={budgetError}
                helperText={budgetError && 'Invalid budget amount'}
              />
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSetBudget}
                >
                  Save Budget
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" color="primary" align="center">
                Total Income
              </Typography>
              <Typography variant="h4" color="primary" align="center">
                {getCurrentMonthTotal('income')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" color="secondary" align="center">
                Total Expenses
              </Typography>
              <Typography variant="h4" color="secondary" align="center">
                {getCurrentMonthTotal('expense')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddTransaction;
