import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  Assessment as AssessmentIcon,
  ViewList as ViewListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../../components/Footer";
import { Input } from "@mui/material";

const AddTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [transactionCategory, setTransactionCategory] = useState("food");
  const [transactionName, setTransactionName] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] =
    useState("income");
  const [budget, setBudget] = useState({ amount: 0, id: null });
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const [isBudgetSet, setIsBudgetSet] = useState(false);

  const [transactionLoaded, setTransactionLoaded] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);


  useEffect(() => {
    const fetchBudget = async () => {
      try {
        let user_id = Cookies.get("user_id");
        const response = await axios.get(
          `http://localhost:8000/budget/${user_id}`
        );

        if (response.status === 200 && response.data.length > 0) {
          setBudget({
            amount: response.data[0].amount,
            id: response.data[0].id,
          });
          setIsBudgetSet(true);
          return response.data[0];
        }
        return { amount: 0, id: null };
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        let user_id = Cookies.get("user_id");
        const incomeRes = await axios.get(
          `http://localhost:8000/incomes/${user_id}`
        );
        const expenseRes = await axios.get(
          `http://localhost:8000/expenses/${user_id}`
        );
        const incomeData = incomeRes.data.map((transaction) => ({
          ...transaction,
          type: "income",
        }));

        const expenseData = expenseRes.data.map((transaction) => ({
          ...transaction,
          type: "expense",
        }));

        let allTransactions = incomeData
          .concat(expenseData)
          .map((transaction) => ({
            name: transaction.name,
            value: transaction.amount,
            type: transaction.type,
            date: transaction.date_added,
            category: transaction.category,
            id: transaction.id,
          }));
        setTransactionLoaded(true);
        return allTransactions;
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    if (!transactionLoaded) {
      fetchBudget();
      fetchTransactions().then((allTransactions) => {
        if (allTransactions.length === 0) {
          setIncome(0);
          setExpense(0);
          return;
        }
        getCurrentMonthTotal("income", allTransactions);
        getCurrentMonthTotal("expense", allTransactions);
        setTransactions(allTransactions);
      });
    }
  }, [transactionLoaded]);

  const handleAddIncome = async () => {
    try {
      let user_id = Cookies.get("user_id");
      const response = await axios.post("http://localhost:8000/add-income", {
        name: transactionName,
        amount: transactionValue,
        date_added: new Date().toLocaleDateString(),
        user_id: user_id,
      });
      if (response.status === 201) {
        console.log("income success:", response.data);
        setTransactionLoaded(false);
      } else {
        console.log("income failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExpense = async () => {
    try {
      let user_id = Cookies.get("user_id");
      const response = await axios.post("http://localhost:8000/add-expense", {
        name: transactionName,
        amount: transactionValue,
        date_added: new Date().toLocaleDateString(),
        user_id: user_id,
      });
      if (response.status === 201) {
        console.log("expense success:", response.data);
        setTransactionLoaded(false);
      } else {
        console.log("expense failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleAddTransaction = async () => {
    if (transactionType === "income") {
      await handleAddIncome();
    } else {
      await handleAddExpense();
    }

    const newTransaction = {
      name: transactionName,
      value: transactionValue,
      type: transactionType,
      date: new Date().toLocaleDateString(),
      category: transactionCategory,
    };

    setTransactions([newTransaction, ...transactions]);
    setTransactionName("");
    setTransactionValue("");
    setOpen(false);
  };

  const handleDeleteTransaction = async (id, type) => {
    let user_id = Cookies.get("user_id");

    try {
      if (type === "income") {
        await axios.post("http://localhost:8000/del-income", {
          user_id: user_id,
          id: id,
        });
      } else {
        await axios.post("http://localhost:8000/del-expense", {
          user_id: user_id,
          id: id,
        });
      }
      setTransactionLoaded(false);
    } catch (error) {
      console.log(error);
    }

    setTransactions((prevTransactions) =>
      prevTransactions.filter((item) => item.id !== id && item.type === type)
    );
  };

  const getCurrentMonthTotal = (type, trans) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const filteredTransactions = trans.filter(
      (transaction) =>
        transaction.type === type &&
        new Date(transaction.date).getMonth() + 1 === currentMonth &&
        new Date(transaction.date).getFullYear() === currentYear
    );

    let total = filteredTransactions.reduce(
      (sum, transaction) => sum + parseFloat(transaction.value),
      0
    );

    total = total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    if (type === "income") {
      setIncome(total);
    } else {
      setExpense(total);
    }
  };

  const handleBudgetDialogOpen = () => {
    setBudgetDialogOpen(true);
  };

  const handleBudgetDialogClose = () => {
    setBudgetDialogOpen(false);
    setBudgetError(false);
  };

  const handleBudgetInputChange = (event) => {
    setBudget({ amount: parseFloat(event.target.value), id: budget.id });
  };

  const handleSetBudget = async () => {
    if (budget.amount < 0) {
      setBudgetError(true);
      return;
    }

    try {
      if (budget.id) {
        // If the budget already exists, update it.
        await axios.put(`http://localhost:8000/budget/${budget.id}`, {
          amount: budget.amount,
        });
      } else {
        // If the budget does not exist, create a new one.
        await axios.post("http://localhost:8000/add-budget", {
          user_id: Cookies.get("user_id"),
          amount: budget.amount,
        });
      }
      setIsBudgetSet(true);
      setTransactionLoaded(false);
    } catch (error) {
      console.log(error);
    }

    setBudgetDialogOpen(false);
  };

  const handleDeleteBudget = async () => {
    if (budget.id) {
      try {
        await axios.delete(`http://localhost:8000/del-budget`, {
          data: { user_id: user_id, id: budget.id },
        });
        setIsBudgetSet(false);
        setBudget({ amount: 0, id: null });
        console.log('Budget deleted successfully');
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  };

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Management
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
      <Box display="flex" justifyContent="center" mb={3}>
        <Link
          component={RouterLink}
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{
              marginRight: "10px",
              height: 60,
              width: 130,
              fontSize: "1.2rem",
              bgcolor: "#FFC107",
            }}
          >
            Home
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{
              marginRight: "10px",
              height: 60,
              width: 200,
              fontSize: "1.2rem",
              bgcolor: "#03A9F4",
            }}
          >
            Management
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/savings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<MonetizationOnIcon />}
            sx={{
              marginRight: "10px",
              height: 60,
              width: 130,
              fontSize: "1.2rem",
              bgcolor: "#FF9800",
            }}
          >
            Savings
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon />}
            sx={{
              fontSize: "1.2rem",
              height: 60,
              width: 130,
              bgcolor: "#4CAF50",
            }}
          >
            Profile
          </Button>
        </Link>
      </Box>
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
                onClick={() => handleViewAllTransactions("income")}
                sx={{ marginRight: 2 }}
              >
                View All Incomes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleViewAllTransactions("expense")}
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              maxWidth: "500px",
              width: "100%",
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
              {transactionType === "expense" && (
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
              {transactionType === "income" && (
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
                      {incomeCategories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                      <MenuItem value="salary">salary</MenuItem>
                      <MenuItem value="freelance">freelance</MenuItem>
                      <MenuItem value="investment">investment</MenuItem>
                      <MenuItem value="business">business</MenuItem>
                      <MenuItem value="gift/bonus">gift/bonus</MenuItem>
                      <MenuItem value="donation">donation</MenuItem>
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <Typography variant="h5" color="primary" align="center" mb={3}>
              View All{" "}
              {selectedTransactionType === "income" ? "Incomes" : "Expenses"}
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 400, overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h6"
                        color={
                          selectedTransactionType === "income"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        color={
                          selectedTransactionType === "income"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Value
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        color={
                          selectedTransactionType === "income"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Date
                      </Typography>
                    </TableCell>
                    {selectedTransactionType === "expense" && (
                      <TableCell>
                        <Typography
                          variant="h6"
                          color={
                            selectedTransactionType === "income"
                              ? "primary"
                              : "secondary"
                          }
                        >
                          Category
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Typography
                        variant="h6"
                        color={
                          selectedTransactionType === "income"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Action
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    .filter(
                      (transaction) =>
                        transaction.type === selectedTransactionType
                    )
                    .map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>${transaction.value}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        {transaction.type === "expense" && (
                          <TableCell>{transaction.category}</TableCell>
                        )}
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleDeleteTransaction(
                                transaction.id,
                                transaction.type
                              )
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                    .reverse()}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3} mt={2}>
  {!isBudgetSet ? (
    <Button
      variant="contained"
      color="primary"
      onClick={handleBudgetDialogOpen}
    >
      Set Budget
    </Button>
  ) : (
    <Box>
      <Typography variant="h6" color="white" mb={1}>
        Budget: ${budget.amount}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteBudget}
      >
        Delete Budget
      </Button>
    </Box>
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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <Typography variant="h5" color="primary" align="center" mb={3}>
        Set Budget
      </Typography>
      <FormControl fullWidth error={budgetError}>
        <InputLabel htmlFor="budget-amount-input">Budget Amount</InputLabel>
        <Input
          id="budget-amount-input"
          type="number"
          value={budget.amount}
          onChange={handleBudgetInputChange}
        />
        {budgetError && (
          <FormHelperText>Amount must be a positive number</FormHelperText>
        )}
      </FormControl>
      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSetBudget}
        >
          Set Budget
        </Button>
      </Box>
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
        <Box
          bgcolor="#43a047"
          p={2}
          m={2}
          borderRadius={5}
          textAlign="center"
          width={200}
        >
          <Typography variant="h6" color="white">
            Total Income
          </Typography>
          <Typography variant="h4" color="white">
            {income}
          </Typography>
        </Box>

        <Box
          bgcolor="#e53935"
          p={2}
          m={2}
          borderRadius={5}
          textAlign="center"
          width={200}
        >
          <Typography variant="h6" color="white">
            Total Expenses
          </Typography>
          <Typography variant="h4" color="white">
            {expense}
          </Typography>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "30px", maxHeight: 400, overflow: "auto"}}
      >
        <Table>
          <TableHead>
          <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6" color="primary">
                  All Transactions History
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Value</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice() // create a copy of the array
              .reverse() // reverse the order
              .map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>${transaction.value}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        handleDeleteTransaction(transaction.id, transaction.type)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer/>
    </Box>
  );
};

export default AddTransaction;
