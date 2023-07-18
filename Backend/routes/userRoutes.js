const express = require('express');
const expenseController = require('../controllers/ExpenseController');
const incomeController = require('../controllers/IncomeController');
const balanceController = require('../controllers/BalanceController');
const budgetController = require('../controllers/BudgetController');
const savingsController = require('../controllers/savingsController');

const router = express.Router();

// Income routes
router.post('/add-income', incomeController.addIncome);
router.get('/incomes/:user_id', incomeController.getIncome);
router.post('/del-income', incomeController.removeIncome);

// Expense routes
router.post('/add-expense', expenseController.addExpense);
router.get('/expenses/:user_id', expenseController.getExpense);
router.post('/del-expense', expenseController.removeExpense);

// Balance routes
router.get('/balance/:user_id', balanceController.getBalance);
router.post('/add-balance', balanceController.addBalance);
router.put('/update-balance', balanceController.updateBalance);

// Budget routes
router.get('/budget/:user_id', budgetController.getBudget);
router.post('/add-budget', budgetController.addBudget);
router.post('/del-budget', budgetController.removeBudget);

// Savings routes
router.post('/add-saving', savingsController.addSaving);
router.get('/savings/:user_id', savingsController.getSaving);
router.delete('/del-saving/:id', savingsController.removeSaving);
router.put('/update-saving/:id', savingsController.updateSaving);

module.exports = router;
