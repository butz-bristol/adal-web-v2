import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearGrantAndVoucher,
  createGrantsAndVouchers,
  handleChange,
  updateGrantsAndVouchers,
} from 'src/features/registrarFeatures/registrarSlice';

const AddGrantOrVoucherModal = ({ open, handleClose }) => {
  const {
    grant_or_voucher,
    grant_or_voucher_amount,
    grant_or_voucher_status,
    grant_or_voucher_type,
    editGrantAndVoucher,
    academic_years,
    academic_year_id,
    grant_or_voucher_id,
  } = useSelector((state) => state.registrar);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      grant_or_voucher === '' ||
      grant_or_voucher_amount === '' ||
      grant_or_voucher_type === '' ||
      grant_or_voucher_status === '' ||
      academic_year_id === ''
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editGrantAndVoucher) {
      dispatch(
        updateGrantsAndVouchers({
          name: grant_or_voucher,
          academic_year: academic_year_id,
          amount: grant_or_voucher_amount,
          type: grant_or_voucher_type,
          status: grant_or_voucher_status,
          id: grant_or_voucher_id,
        })
      );
      dispatch(clearGrantAndVoucher());
      handleClose();
      return;
    }

    dispatch(
      createGrantsAndVouchers({
        name: grant_or_voucher,
        academic_year: academic_year_id,
        amount: grant_or_voucher_amount,
        type: grant_or_voucher_type,
        status: grant_or_voucher_status,
      })
    );

    dispatch(clearGrantAndVoucher());
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        dispatch(clearGrantAndVoucher());
      }}
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" mb={1}>
              {editGrantAndVoucher ? 'Edit Grant/Voucher' : 'Add Grant/Voucher'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="grant_or_voucher"
                label="Grant/Voucher Name"
                value={grant_or_voucher}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-grant-or-voucher">Type</InputLabel>
              <Select
                label="Type"
                labelId="select-grant-or-voucher"
                value={grant_or_voucher_type}
                name="grant_or_voucher_type"
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Grant">Grant</MenuItem>
                <MenuItem value="Voucher">Voucher</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="grant_or_voucher_amount"
                label="Amount"
                value={grant_or_voucher_amount}
                onChange={handleInputChange}
                required
                type="number"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="academic-year-select">Academic Year</InputLabel>
              <Select
                id="academic-year-select"
                label="Academic Year"
                name="academic_year_id"
                value={academic_year_id || ''}
                onChange={handleInputChange}
              >
                {academic_years.map((academic_year) => (
                  <MenuItem key={academic_year._id} value={academic_year._id}>
                    {academic_year.school_year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-status">Status</InputLabel>
              <Select
                label="Status"
                labelId="select-status"
                value={grant_or_voucher_status}
                name="grant_or_voucher_status"
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={1}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleClose();
                  dispatch(clearGrantAndVoucher());
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {editGrantAndVoucher ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
export default AddGrantOrVoucherModal;
