const express = require("express");
const userController = require("../controllers/userController");
const expenseController = require("../controllers/ExpenseController");
const incomeController = require("../controllers/IncomeController");

const router = express.Router();

// // Register route
// router.post("/register", userController.register);

// // Login route
// router.post("/login", userController.login);

//Income routes
router.post("/add-income", incomeController.addIncome);
router.get("/incomes/:user_id", incomeController.getIncome);
router.delete("/incomes/:id", incomeController.removeIncome);

//Expense routes
router.post("/add-expense", expenseController.addExpense);
router.get("/expenses/:user_id", expenseController.getExpense);
router.delete("/expenses/:id", expenseController.removeExpense);

module.exports = router;
