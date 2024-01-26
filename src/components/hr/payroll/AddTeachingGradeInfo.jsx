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
import {
  createTeachingGradeInfo,
  deleteTeachingGradeInfo,
  handleChange,
  resetTeachingGradeInfoValues,
  toggleCreateTeachingGradeInfo,
  toggleEditTeachingGradeInfo,
  updateTeachingGradeInfo,
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

const AddTeachingGradeInfo = () => {
  const dispatch = useDispatch();
  const {
    editTeachingGradeInfo,
    createTeachingGradeInfoModal,
    editTeachingGradeInfoId,
    available_subjects_k12,
    full_load_per_subject_per_grade,
    minimum_load_per_subject_per_grade,
    isCreatingTeachingGradeInfo,
    isEditingTeachingGradeInfo,
    isDeletingTeachingGradeInfo,
    available_grade_levels,
  } = useSelector((state) => state.payroll);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !available_subjects_k12 ||
      !full_load_per_subject_per_grade ||
      !minimum_load_per_subject_per_grade
    ) {
      toast.error('Please fill all fields');
      return;
    }

    if (editTeachingGradeInfo) {
      dispatch(
        updateTeachingGradeInfo({
          editTeachingGradeInfoId,
          available_subjects_k12,
          full_load_per_subject_per_grade,
          minimum_load_per_subject_per_grade,
          available_grade_levels,
        })
      );
      return;
    }

    dispatch(
      createTeachingGradeInfo({
        editTeachingGradeInfoId,
        available_subjects_k12,
        full_load_per_subject_per_grade,
        minimum_load_per_subject_per_grade,
        available_grade_levels,
      })
    );

    setTimeout(() => {
      dispatch(resetTeachingGradeInfoValues());
    }, 1000);
  };

  return (
    <Modal
      open={createTeachingGradeInfoModal || editTeachingGradeInfo}
      onClose={() => {
        createTeachingGradeInfoModal
          ? dispatch(toggleCreateTeachingGradeInfo())
          : dispatch(toggleEditTeachingGradeInfo());
        dispatch(resetTeachingGradeInfoValues());
      }}
      aria-labelledby="add-teaching-grade-info-modal"
      aria-describedby="teaching-grade-info-modal"
    >
      <Box sx={style}>
        <Typography
          gutterBottom
          variant="h4"
          id="modal-modal-title"
          component="h2"
        >
          {createTeachingGradeInfoModal
            ? 'Create Teaching Grade Info'
            : 'Edit Teaching Grade Info'}
        </Typography>

        <form>
          <Grid container spacing={1} rowGap={1} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="available_subjects_k12"
                  label="Available Subjects K-12"
                  name="available_subjects_k12"
                  value={available_subjects_k12}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="available_grade_levels"
                  label="Available Grade Levels"
                  name="available_grade_levels"
                  value={available_grade_levels}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="full_load_per_subject_per_grade"
                  label="Full Load/Subject/Grade"
                  name="full_load_per_subject_per_grade"
                  value={full_load_per_subject_per_grade}
                  onChange={handleInput}
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="minimum_load_per_subject_per_grade"
                  label="Minimum Load/Subject/Grade"
                  name="minimum_load_per_subject_per_grade"
                  value={minimum_load_per_subject_per_grade}
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
                  isCreatingTeachingGradeInfo ||
                  isEditingTeachingGradeInfo ||
                  isDeletingTeachingGradeInfo
                }
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                {createTeachingGradeInfoModal ? 'Create' : 'Update'}
              </Button>

              {editTeachingGradeInfo && (
                <Button
                  variant="contained"
                  disabled={
                    isCreatingTeachingGradeInfo ||
                    isEditingTeachingGradeInfo ||
                    isDeletingTeachingGradeInfo
                  }
                  color="secondary"
                  type="button"
                  sx={{ ml: 2 }}
                  onClick={() =>
                    dispatch(deleteTeachingGradeInfo(editTeachingGradeInfoId))
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

export default AddTeachingGradeInfo;
