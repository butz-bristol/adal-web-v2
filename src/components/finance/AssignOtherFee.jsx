import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStudentInvoice,
  handleChange,
} from 'src/features/financeFeatures/financeSlice';

const AssignOtherFee = ({ open, handleClose, feeId }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.registrar);
  const {
    isCreatingStudentInvoice,
    invoice_date,
    invoiceNumberFormats,
    invoice_number_format,
  } = useSelector((state) => state.finance);
  const [student, setStudent] = useState('');
  const [inputValue, setInputValue] = useState('');

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

  const handleAssignOtherFee = (e) => {
    e.preventDefault();

    if (student === '' || invoice_number_format === '') {
      return;
    }

    dispatch(
      createStudentInvoice({
        student: student.id,
        otherFee: feeId,
        invoiceDate: invoice_date,
        invoiceNumberFormat: invoice_number_format,
      })
    );

    handleClose();
    setStudent('');
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setStudent('');
        dispatch(handleChange({ name: 'invoice_date', value: '' }));
        dispatch(handleChange({ name: 'invoice_number_format', value: '' }));
      }}
      aria-labelledby="assign-other-fee-modal"
      aria-describedby="assign-other-fee-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Assign Other Fee
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="invoice_date"
                  label="Invoice Date"
                  type="date"
                  name="invoice_date"
                  value={invoice_date}
                  onChange={(e) =>
                    dispatch(
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="invoice_number_format">
                  Invoice Number Format
                </InputLabel>
                <Select
                  id="invoice_number_format"
                  label="Invoice Number Format"
                  name="invoice_number_format"
                  value={invoice_number_format}
                  onChange={(e) =>
                    dispatch(
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {invoiceNumberFormats.map((format) => (
                    <MenuItem key={format._id} value={format.format}>
                      {format.format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAssignOtherFee}
                disabled={
                  student === '' ||
                  isCreatingStudentInvoice ||
                  invoice_number_format === '' ||
                  invoice_date === ''
                }
              >
                Assign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AssignOtherFee;
