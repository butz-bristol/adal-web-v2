import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { formatSalary } from 'src/utils/helperFunctions';

const Salary = () => {
  const dispatch = useDispatch();
  const {
    userProfile: { isHrAdmin },
  } = useSelector((state) => state.users);

  return (
    <Grid container p={1}>
      {isHrAdmin && (
        <Stack>
          <Button variant="contained" size="small" color="primary">
            Generate Payslip
          </Button>
        </Stack>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payslip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2021-01-01</TableCell>
              <TableCell>{formatSalary(10000)}</TableCell>
              <TableCell>{formatSalary(15000)}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small">
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Salary;
