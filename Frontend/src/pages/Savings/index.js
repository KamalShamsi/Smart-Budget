import React, { useState, useEffect } from 'react';
import AddSavingGoalForm from '../../components/AddSavingGoalForm'
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';
import {Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from "@material-ui/core"
import { Button } from '@mui/material';
import axios from "axios";


export default function Savings() {
  const [savingGoal, setSavingGoal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/savings")
      .then((res) => {
        setSavingGoal(res)
        console.log("Result:", setSavingGoal);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  

  
  return (
    <div>
        <Card color='white' width='40%'>
          <h3>Add Saving Goal</h3>
          <AddSavingGoalForm/>
        </Card>
        <TableContainer component={Paper}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>Goal</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Monthly Payments</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {savingGoal.map((element, pIndex) => (
                        <TableRow>
                            <TableCell align="left">{element.name}</TableCell>
                            <TableCell align="right">{element.total}</TableCell>
                            <TableCell align="right">{element.payment}</TableCell>
                            
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
