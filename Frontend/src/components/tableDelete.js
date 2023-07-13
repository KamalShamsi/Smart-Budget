import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
     
const BasicTable = ({elements}) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-aria-label="table">

                <TableHead>
                    <TableRow>
                        <TableCell>Goal</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Monthly Payments</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {elements.map((elements) => (
                        <TableRow key={row.number}>

                            <TableCell component="th" scope="row">
                                {row.number}
                            </TableCell>  

                            <TableCell align="right">{elements.goal}</TableCell>
                            <TableCell align="right">{elements.total}</TableCell>
                            <TableCell align="right">{elements.payment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
};

export default BasicTable;