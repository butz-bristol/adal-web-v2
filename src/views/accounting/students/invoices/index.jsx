import {
  Autocomplete,
  FormControl,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import { fetchStudents } from 'src/features/cashierFeatures/cashierSlice';
import { fetchStudentInvoiceByStudent } from 'src/features/financeFeatures/financeSlice';

const Invoices = () => {
  const { singleStudentInvoices, isFetchingStudentInvoiceByStudent } =
    useSelector((state) => state.finance);
  const { students } = useSelector((state) => state.cashier);
  const [student, setStudent] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const options = students
    .filter((student) => student.student_registration_status === 'registered')
    .map((student) => {
      const first_name = student.student_first_name;
      const last_name = student.student_last_name;

      return {
        label: `${first_name} ${last_name}`,
        id: student._id,
      };
    });

  useEffect(() => {
    dispatch(fetchStudents());
    if (student) {
      dispatch(fetchStudentInvoiceByStudent(student.id));
      return;
    }
  }, [student, dispatch]);

  return (
    <Stack>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={9} md={5} lg={3}>
          <FormControl fullWidth>
            <Autocomplete
              id="student"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Student" variant="outlined" />
              )}
              value={student}
              onChange={(event, value) => {
                setStudent(value);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              inputValue={inputValue}
            />
          </FormControl>
        </Grid>
      </Grid>

      {isFetchingStudentInvoiceByStudent ? (
        <LoadingScreen />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice No.</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student?.id &&
                singleStudentInvoices?.map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice?.otherFee?.other_fee}</TableCell>
                    <TableCell>
                      {DateTime.fromISO(invoice.invoiceDate).toFormat(
                        'dd LLL yyyy'
                      )}
                    </TableCell>
                    <TableCell>{invoice.invoice_amount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>
                      {invoice?.dueDate
                        ? DateTime.fromISO(invoice.dueDate).toFormat(
                            'dd LLL yyyy'
                          )
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {invoice?.invoice_balance ? invoice?.invoice_balance : 0}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Invoices;
