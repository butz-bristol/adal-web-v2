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
  createSalaryGradeGuide,
  handleChange,
  resetSalaryGradeGuideValues,
  toggleCreateSalaryGradeGuide,
  toggleEditSalaryGradeGuide,
  updateSalaryGradeGuide,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const AddSalaryGradeGuide = () => {
  const dispatch = useDispatch();
  const {
    editSalaryGradeGuide,
    isCreatingSalaryGradeGuide,
    isEditingSalaryGradeGuide,
    salary_grade,
    basic_salary,
    overtime_salary,
    basic_salary_max,
    basic_salary_min,
    editSalaryGradeGuideId,
    createSalaryGradeGuideStatus,
  } = useSelector((state) => state.payroll);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !basic_salary ||
      !overtime_salary ||
      !basic_salary_max ||
      !basic_salary_min
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editSalaryGradeGuide) {
      dispatch(
        updateSalaryGradeGuide({
          salary_grade,
          basic_salary,
          overtime_salary,
          basic_salary_max,
          basic_salary_min,
          editSalaryGradeGuideId,
        })
      );
      return;
    }

    dispatch(
      createSalaryGradeGuide({
        salary_grade,
        basic_salary,
        overtime_salary,
        basic_salary_max,
        basic_salary_min,
      })
    );

    setTimeout(() => {
      dispatch(resetSalaryGradeGuideValues());
    }, 1500);
  };

  return (
    <Modal
      open={createSalaryGradeGuideStatus || editSalaryGradeGuide}
      onClose={() => {
        createSalaryGradeGuideStatus
          ? dispatch(toggleCreateSalaryGradeGuide())
          : dispatch(toggleEditSalaryGradeGuide());
        dispatch(resetSalaryGradeGuideValues());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <Typography variant="h3">
          {editSalaryGradeGuide
            ? 'Edit Salary Template'
            : 'Add Salary Template'}
        </Typography>
        <form>
          <Grid container mt={5} spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Salary Grade"
                  name="salary_grade"
                  value={salary_grade}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Basic Salary"
                  name="basic_salary"
                  value={basic_salary}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Overtime Rate"
                  name="overtime_salary"
                  value={overtime_salary}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Minimum Salary"
                  name="basic_salary_min"
                  value={basic_salary_min}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Maximum Salary"
                  name="basic_salary_max"
                  value={basic_salary_max}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  disabled={
                    isCreatingSalaryGradeGuide || isEditingSalaryGradeGuide
                  }
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                  sx={{ mt: 0.85 }}
                >
                  {editSalaryGradeGuide ? 'Update' : 'Create'}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AddSalaryGradeGuide;
