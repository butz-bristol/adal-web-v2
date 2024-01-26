import {
  Button,
  FormControl,
  Grid,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import {
  clearDynamicData,
  createBankAccountNumber,
  handleChange,
  toggleAddBankNo,
  toggleEditBankNo,
  updateBankAccountNumber,
} from 'src/features/financeFeatures/financeSlice';

const AddBankAccountNumber = () => {
  const dispatch = useDispatch();
  const {
    createBankAccountNo,
    editBankAccountNo,
    bank_account_no,
    bank_account_name,
    bank_account_type,
    bank_account_id,
  } = useSelector((state) => state.finance);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const clearData = () => {
    dispatch(
      clearDynamicData({
        bank_account_no,
        bank_account_name,
        bank_account_type,
        bank_account_id,
      })
    );

    if (editBankAccountNo) {
      dispatch(toggleEditBankNo());
    } else {
      dispatch(toggleAddBankNo());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bank_account_no) {
      return toast.error('Please enter account number');
    }

    const data = {
      bank_account_number: bank_account_no,
      bank_account_name,
      bank_account_type,
      bank_account_id,
    };

    if (editBankAccountNo) {
      dispatch(updateBankAccountNumber({ ...data, id: bank_account_id })).then(
        (res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            clearData();
          }
        }
      );
    } else {
      dispatch(createBankAccountNumber(data)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          clearData();
        }
      });
    }
  };

  return (
    <Modal open={createBankAccountNo || editBankAccountNo} onClose={clearData}>
      <Paper sx={{ ...styles, maxWidth: '500px' }}>
        <Typography mb={2}>
          {editBankAccountNo
            ? 'Edit Bank Account Details'
            : 'Add Bank Account Details'}
        </Typography>

        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Account No."
                  size="small"
                  id="account_number"
                  required
                  onChange={handleInputChange}
                  name="bank_account_no"
                  value={bank_account_no}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Account Name"
                  size="small"
                  id="account_name"
                  onChange={handleInputChange}
                  name="bank_account_name"
                  value={bank_account_name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Account Type"
                  size="small"
                  id="account_type"
                  onChange={handleInputChange}
                  name="bank_account_type"
                  value={bank_account_type}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} mt={1} justifyContent={'flex-end'}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={clearData}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleSubmit}
              type="submit"
            >
              {editBankAccountNo ? 'Edit' : 'Add'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};
export default AddBankAccountNumber;
