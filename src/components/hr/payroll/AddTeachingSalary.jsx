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
  createTeachingSalary,
  deleteTeachingSalary,
  handleChange,
  resetTeachingSalaryValues,
  toggleCreateTeachingSalary,
  toggleEditTeachingSalary,
  updateTeachingSalary,
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

const AddTeachingSalary = () => {
  const {
    isCreatingTeachingSalary,
    createTeachingSalaryModal,
    isEditingTeachingSalary,
    editTeachingSalaryId,
    editTeachingSalary,
    isDeletingTeachingSalary,
    no_of_days_per_year,
    days_per_month,
    no_of_hours_per_year,
    school_year,
    semester,
    primary_designation,
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

    if (editTeachingSalary) {
      dispatch(
        updateTeachingSalary({
          no_of_days_per_year,
          days_per_month,
          no_of_hours_per_year,
          school_year,
          semester,
          editTeachingSalaryId,
        })
      );
      return;
    }

    dispatch(
      createTeachingSalary({
        no_of_days_per_year,
        days_per_month,
        no_of_hours_per_year,
        semester,
        school_year,
      })
    );

    setTimeout(() => {
      dispatch(resetTeachingSalaryValues());
    }, 1000);
  };

  return (
    <Modal
      open={createTeachingSalaryModal || editTeachingSalary}
      onClose={() => {
        createTeachingSalaryModal
          ? dispatch(toggleCreateTeachingSalary())
          : dispatch(toggleEditTeachingSalary());
        dispatch(resetTeachingSalaryValues());
      }}
      aria-labelledby="add-teaching-salary-modal"
      aria-describedby="teaching-salary-modal"
    >
      <Box sx={style}>
        <Typography
          gutterBottom
          variant="h4"
          id="modal-modal-title"
          component="h2"
        >
          {createTeachingSalaryModal
            ? 'Create Teaching Salary'
            : 'Edit Teaching Salary'}
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
                  isCreatingTeachingSalary ||
                  isEditingTeachingSalary ||
                  isDeletingTeachingSalary
                }
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                {createTeachingSalaryModal ? 'Create' : 'Update'}
              </Button>

              {editTeachingSalary && (
                <Button
                  variant="contained"
                  disabled={
                    isCreatingTeachingSalary ||
                    isEditingTeachingSalary ||
                    isDeletingTeachingSalary
                  }
                  color="secondary"
                  type="button"
                  sx={{ ml: 2 }}
                  onClick={() =>
                    dispatch(deleteTeachingSalary(editTeachingSalaryId))
                  }
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
export default AddTeachingSalary;
