import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createAdminSalary,
  deleteAdminSalary,
  handleChange,
  resetAdminSalaryValues,
  toggleCreateAdminSalary,
  toggleEditAdminSalary,
  updateAdminSalary,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '5px',

  '@media (min-width: 700px)': {
    width: 600,
  },
};

const AddAdminSalary = () => {
  const {
    isCreatingAdminSalary,
    createAdminSalaryModal,
    isEditingAdminSalary,
    editAdminSalaryId,
    editAdminSalary,
    isDeletingAdminSalary,
    no_of_days_per_year,
    days_per_month,
    no_of_hours_per_year,
    school_year,
    semester,
  } = useSelector((state) => state.payroll);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !no_of_days_per_year ||
      !days_per_month ||
      !no_of_hours_per_year ||
      !school_year ||
      !semester
    ) {
      toast.error('Please fill all fields');
      return;
    }

    if (editAdminSalary) {
      dispatch(
        updateAdminSalary({
          no_of_days_per_year,
          days_per_month,
          no_of_hours_per_year,
          school_year,
          semester,
          editAdminSalaryId,
        })
      );
      return;
    }

    dispatch(
      createAdminSalary({
        no_of_days_per_year,
        days_per_month,
        no_of_hours_per_year,
        semester,
        school_year,
      })
    );

    setTimeout(() => {
      dispatch(resetAdminSalaryValues());
    }, 1000);
  };

  return (
    <Modal
      open={createAdminSalaryModal || editAdminSalary}
      onClose={() => {
        createAdminSalaryModal
          ? dispatch(toggleCreateAdminSalary())
          : dispatch(toggleEditAdminSalary());
        dispatch(resetAdminSalaryValues());
      }}
      aria-labelledby="add-admin-salary-modal"
      aria-describedby="admin-salary-modal"
    >
      <Box sx={style}>
        <Typography
          gutterBottom
          variant="h4"
          id="modal-modal-title"
          component="h2"
        >
          {createAdminSalaryModal ? 'Create Admin Salary' : 'Edit Admin Salary'}
        </Typography>

        <form>
          <Grid container spacing={1} rowGap={1} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="school_year"
                  label="School Year"
                  name="school_year"
                  value={school_year}
                  onChange={handleInput}
                  variant="outlined"
                  placeholder="2022/2023"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="semester"
                  label="Semester"
                  name="semester"
                  value={semester}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="no_of_days_year"
                  label="No of Days/Year"
                  name="no_of_days_per_year"
                  value={no_of_days_per_year}
                  onChange={handleInput}
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="days_per_month"
                  label="No of Days/Month"
                  name="days_per_month"
                  value={days_per_month}
                  onChange={handleInput}
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="no_of_hours_per_year"
                  label="No of Total Hours/Year"
                  name="no_of_hours_per_year"
                  value={no_of_hours_per_year}
                  onChange={handleInput}
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                disabled={
                  isCreatingAdminSalary ||
                  isEditingAdminSalary ||
                  isDeletingAdminSalary
                }
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                {createAdminSalaryModal ? 'Create' : 'Update'}
              </Button>

              {editAdminSalary && (
                <Button
                  variant="contained"
                  disabled={
                    isCreatingAdminSalary ||
                    isEditingAdminSalary ||
                    isDeletingAdminSalary
                  }
                  color="secondary"
                  type="button"
                  sx={{ ml: 2 }}
                  onClick={() => dispatch(deleteAdminSalary(editAdminSalaryId))}
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AddAdminSalary;
