import React, { useState } from 'react';
import AddIncomeForm from '../../components/AddIncomeForm';
import AddExpenseForm from '../../components/AddExpenseForm';
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';
import {Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from "@material-ui/core"
import { Button } from '@mui/material';

export default function Add() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddIncome = (incomeData) => {
    setIncomes([...incomes, incomeData]);
    console.log('Income added:', incomeData);
  };

  const handleAddExpense = (expenseData) => {
    setExpenses([...expenses, expenseData]);
    console.log('Expense added:', expenseData);
  };

  const handleDeleteExpense = (pIndex) => {
    setExpenses(() =>
      expenses.filter((_, index) => index !== pIndex)
    );
  };

  const handleDeleteIncome = (pIndex) => {
    setIncomes(() =>
      incomes.filter((_, index) => index !== pIndex)
    );
  };

  const totalIncomes = incomes.reduce((total, income) => total + parseFloat(income.value), 0);
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.value), 0);

  console.log('Total Incomes:', totalIncomes);
  console.log('Total Expenses:', totalExpenses);

  return (
    <div>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >

        <Card color='white' width='40%'>
          <h3>Add Income</h3>
          <AddIncomeForm onAddIncome={handleAddIncome} totalIncomes={totalIncomes} />
        </Card>
        <Card color='white' width='40%'>
          <h3>Add Expense</h3>
          <AddExpenseForm onAddExpense={handleAddExpense} totalExpenses={totalExpenses} />
        </Card>
      </div>
      
      <TableContainer component={Paper}>
          <Table>

              <TableHead>
                  <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align='right'>Name</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell></TableCell>
                  </TableRow>
              </TableHead>

              <TableBody>
                  {incomes.map((element, pIndex) => (
                      <TableRow>
                          <TableCell align='left'>income</TableCell>
                          <TableCell align="right">{element.name}</TableCell>
                          <TableCell align="right">{element.value}</TableCell>
                          <TableCell align="right" width="100">
                            <Button onClick={() => handleDeleteIncome(pIndex)}>
                            delete
                            </Button>
                          </TableCell>
                      </TableRow>
                  ))}
                  {expenses.map((element, pIndex) => (
                      <TableRow>
                          <TableCell align='left'>expense</TableCell>
                          <TableCell align="right">{element.name}</TableCell>
                          <TableCell align="right">{element.value}</TableCell>
                          <TableCell align="right" width="100">
                            <Button onClick={() => handleDeleteExpense(pIndex)}>
                            delete
                            </Button>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>

          </Table>
      </TableContainer>

      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
