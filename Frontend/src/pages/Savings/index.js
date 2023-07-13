import React, { useState } from 'react';
import AddSavingGoalForm from '../../components/AddSavingGoalForm'
import BottomBar from '../../components/BottomBar';
import Card from '../../components/Card';
import {Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from "@material-ui/core"
import { Button } from '@mui/material';

export default function Savings() {
  const [savingGoal, setSavingGoal] = useState([]);

  const handleAddSavingGoal = (savingData) => {
    setSavingGoal([...savingGoal, savingData])
  };

  const handleDelete = (pIndex) => {
    setSavingGoal((savingGoal) =>
      savingGoal.filter((_, index) => index !== pIndex)
    );
  };

  return (
    <div>

        <Card color='white' width='40%'>
          <h3>Add Saving Goal</h3>
          <AddSavingGoalForm onAddSaving={handleAddSavingGoal} />
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
                            <TableCell align="right" width="100">
                              <Button onClick={() => handleDelete(pIndex)}>
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
