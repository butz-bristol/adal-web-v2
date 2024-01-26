import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createTuitionAndFee,
  handleChange,
  resetTuitionAndFee,
  toggleCreateTuitionAndFee,
  toggleEditTuitionAndFee,
  updateTuitionAndFee,
} from 'src/features/financeFeatures/financeSlice';

const AddTuitionAndFee = () => {
  const {
    editTuitionAndFee,
    editTuitionAndFeeId,
    createTuitionAndFeeStatus,
    isUpdatingTuitionAndFee,
    isCreatingTuitionAndFee,
    academic_year,
    academicYears,
  } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!academic_year) {
      toast.error('Tuition is required');
      return;
    }

    if (editTuitionAndFee) {
      dispatch(updateTuitionAndFee({ academic_year, id: editTuitionAndFeeId }));
      return;
    }

    dispatch(createTuitionAndFee({ academic_year }));

    setTimeout(() => {
      dispatch(resetTuitionAndFee());
    }, 1000);
  };

  return (
    <Modal
      open={createTuitionAndFeeStatus || editTuitionAndFee}
      onClose={() => {
        createTuitionAndFeeStatus
          ? dispatch(toggleCreateTuitionAndFee())
          : dispatch(toggleEditTuitionAndFee());
        dispatch(resetTuitionAndFee());
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {editTuitionAndFee ? 'Edit Tuition Label' : 'Add Tuition Label'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="fee">Academic Year</InputLabel>
                <Select
                  id="academic_year-select"
                  label="Academic Year"
                  name="academic_year"
                  value={academic_year || ''}
                  onChange={handleInputChange}
                >
                  {academicYears?.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={editTuitionAndFee ? false : !academic_year}
              >
                {editTuitionAndFee ? (
                  isUpdatingTuitionAndFee ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : (
                    'Update'
                  )
                ) : isCreatingTuitionAndFee ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  'Add New'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddTuitionAndFee;
