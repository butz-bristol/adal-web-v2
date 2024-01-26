import {
  Button,
  FormControl,
  FormHelperText,
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
  clearDynamicData,
  createScholarship,
  handleChange,
  toggleEditScholarship,
  updateScholarship,
} from 'src/features/admissionsFeatures/admissionsSlice';
import {
  clearDynamicData as clearRegistrarState,
  handleChange as handleRegistrarChange,
} from 'src/features/registrarFeatures/registrarSlice';

const AddScholarship = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { academic_years, semesters, academic_year_id, semester_id } =
    useSelector((state) => state.registrar);
  const {
    editScholarship,
    scholarship_name,
    scholarship_amount,
    scholarship_status,
    maintaining_grades_required,
    scholarship_id,
  } = useSelector((state) => state.admissions);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const closeModal = () => {
    dispatch(
      clearDynamicData({
        scholarship_name,
        scholarship_amount,
        scholarship_status,
        maintaining_grades_required,
      })
    );
    dispatch(clearRegistrarState({ academic_year_id, semester_id }));

    if (editScholarship) {
      dispatch(toggleEditScholarship());
    } else {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !(
        scholarship_name &&
        scholarship_amount &&
        scholarship_status &&
        academic_year_id &&
        maintaining_grades_required
      )
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    const data = {
      scholarship_name,
      scholarship_amount,
      scholarship_status,
      academic_year_id,
      maintaining_grades_required,
    };

    if (semester_id) {
      data.semester_id = semester_id;
    }

    if (editScholarship) {
      dispatch(updateScholarship({ id: scholarship_id, ...data }));
      closeModal();
      return;
    }

    dispatch(createScholarship(data));
    dispatch(clearDynamicData(data));
    handleClose();
  };

  return (
    <Modal open={open || editScholarship} onClose={closeModal}>
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
              {editScholarship ? 'Edit Scholarship' : 'Add Scholarship'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="scholarship_name"
                label="Scholarship Name"
                value={scholarship_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="scholarship_amount"
                type="number"
                label="Amount"
                value={scholarship_amount}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-academic-year">Academic Year</InputLabel>
              <Select
                label="Academic Year"
                labelId="select-academic-year"
                value={academic_year_id}
                name="academic_year_id"
                onChange={(e) =>
                  dispatch(
                    handleRegistrarChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
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
            <FormControl fullWidth>
              <InputLabel id="select-semester">Semester</InputLabel>
              <Select
                label="Semester"
                labelId="select-semester"
                value={semester_id}
                name="semester_id"
                onChange={(e) =>
                  dispatch(
                    handleRegistrarChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester._id} value={semester._id}>
                    {semester.semester_term}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Required for College/TESDA</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-status">Status</InputLabel>
              <Select
                label="Status"
                labelId="select-status"
                value={scholarship_status}
                name="scholarship_status"
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <TextField
                name="maintaining_grades_required"
                type="number"
                label="Grades Required (in %)"
                value={maintaining_grades_required}
                onChange={handleInputChange}
              />
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
                  dispatch(
                    clearDynamicData({
                      scholarship_name,
                      scholarship_amount,
                      scholarship_status,
                      academic_year_id,
                      semester_id,
                      maintaining_grades_required,
                    })
                  );
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {editScholarship ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddScholarship;
