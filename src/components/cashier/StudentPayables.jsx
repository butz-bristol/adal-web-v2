import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleChange,
  setOtherFee1,
  setOtherFee2,
  setOtherFee3,
} from 'src/features/cashierFeatures/cashierSlice';
import { fetchStudentInvoiceByStudent } from 'src/features/financeFeatures/financeSlice';

const StudentPayable = () => {
  const dispatch = useDispatch();
  const { singleStudentInvoices } = useSelector((state) => state.finance);
  const {
    student,
    otherFee1,
    other_fee_1_id,
    other_fee_1_amount,
    other_fee_1_note,
    otherFee2,
    other_fee_2_id,
    other_fee_2_amount,
    other_fee_2_note,
    otherFee3,
    other_fee_3_id,
    other_fee_3_amount,
    other_fee_3_note,
  } = useSelector((state) => state.cashier);

  const studentInvoices = singleStudentInvoices?.filter(
    (invoice) => invoice?.status !== 'Paid'
  );

  const handleInputChange = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  useEffect(() => {
    if (!student?._id) return;
    dispatch(fetchStudentInvoiceByStudent(student?._id));
  }, [dispatch, student?._id]);

  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '200px' }}>Invoice Fee</TableCell>
              <TableCell sx={{ width: '200px' }}>Amount</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    name="other_fee_1_id"
                    value={other_fee_1_id}
                    onChange={(e) => {
                      dispatch(
                        handleChange({
                          name: 'other_fee_1_id',
                          value: e.target.value,
                        })
                      );
                      dispatch(
                        setOtherFee1({ id: e.target.value, type: 'invoice' })
                      );
                    }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    {studentInvoices?.map((invoice) => (
                      <MenuItem key={invoice._id} value={invoice._id}>
                        {invoice?.otherFee?.other_fee?.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_1_amount"
                    value={other_fee_1_amount || 0}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_1_note"
                    value={other_fee_1_note}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    name="other_fee_2_id"
                    value={other_fee_2_id}
                    onChange={(e) => {
                      dispatch(
                        handleChange({
                          name: 'other_fee_2_id',
                          value: e.target.value,
                        })
                      );
                      dispatch(
                        setOtherFee2({ id: e.target.value, type: 'invoice' })
                      );
                    }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    {studentInvoices
                      ?.filter((invoice) => invoice?._id !== other_fee_1_id)
                      .map((invoice) => (
                        <MenuItem key={invoice._id} value={invoice._id}>
                          {invoice?.otherFee?.other_fee?.toUpperCase()}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_2_amount"
                    value={other_fee_2_amount || 0}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_2_note"
                    value={other_fee_2_note}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    name="other_fee_3_id"
                    value={other_fee_3_id}
                    onChange={(e) => {
                      dispatch(
                        handleChange({
                          name: 'other_fee_3_id',
                          value: e.target.value,
                        })
                      );
                      dispatch(
                        setOtherFee3({ id: e.target.value, type: 'invoice' })
                      );
                    }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    {studentInvoices
                      ?.filter(
                        (invoice) =>
                          invoice?._id !== other_fee_1_id &&
                          invoice?._id !== other_fee_2_id
                      )
                      .map((invoice) => (
                        <MenuItem key={invoice._id} value={invoice._id}>
                          {invoice?.otherFee?.other_fee?.toUpperCase()}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_3_amount"
                    value={other_fee_3_amount || 0}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField
                    name="other_fee_3_note"
                    value={other_fee_3_note}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default StudentPayable;
