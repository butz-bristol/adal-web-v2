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
  createTeachingLoad,
  deleteTeachingLoad,
  handleChange,
  resetTeachingLoadValues,
  toggleCreateTeachingLoad,
  toggleEditTeachingLoad,
  updateTeachingLoad,
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

const AddTeachingLoad = () => {
  const dispatch = useDispatch();
  const {
    editTeachingLoad,
    createTeachingLoadModal,
    editTeachingLoadId,
    full_load_college_faculty,
    minimum_load_college_faculty,
    full_load_tesda_faculty,
    minimum_load_tesda_faculty,
    isDeletingTeachingLoad,
    isCreatingTeachingLoad,
    isEditingTeachingLoad,
  } = useSelector((state) => state.payroll);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !full_load_college_faculty ||
      !minimum_load_college_faculty ||
      !full_load_tesda_faculty ||
      !minimum_load_tesda_faculty
    ) {
      toast.error('Please fill all fields');
      return;
    }

    if (editTeachingLoad) {
      dispatch(
        updateTeachingLoad({
          editTeachingLoadId,
          full_load_college_faculty,
          minimum_load_college_faculty,
          full_load_tesda_faculty,
          minimum_load_tesda_faculty,
        })
      );
      return;
    }

    dispatch(
      createTeachingLoad({
        editTeachingLoadId,
        full_load_college_faculty,
        minimum_load_college_faculty,
        full_load_tesda_faculty,
        minimum_load_tesda_faculty,
      })
    );

    setTimeout(() => {
      dispatch(resetTeachingLoadValues());
    }, 1000);
  };

  return (
    <Modal
      open={createTeachingLoadModal || editTeachingLoad}
      onClose={() => {
        createTeachingLoadModal
          ? dispatch(toggleCreateTeachingLoad())
          : dispatch(toggleEditTeachingLoad());
        dispatch(resetTeachingLoadValues());
      }}
      aria-labelledby="add-teaching-load-modal"
      aria-describedby="teaching-load-modal"
    >
      <Box sx={style}>
        <Typography
          gutterBottom
          variant="h4"
          id="modal-modal-title"
          component="h2"
        >
          {createTeachingLoadModal
            ? 'Create Teaching Load'
            : 'Edit Teaching Load'}
        </Typography>

        <form>
          <Grid container spacing={1} rowGap={1} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="full_load_college_faculty"
                  label="Full Load/Subject College"
                  name="full_load_college_faculty"
                  value={full_load_college_faculty}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="minimum_load_college_faculty"
                  label="Minimum Load/Subject College"
                  name="minimum_load_college_faculty"
                  value={minimum_load_college_faculty}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="full_load_tesda_faculty"
                  label="Full Load TESDA Faculty"
                  name="full_load_tesda_faculty"
                  value={full_load_tesda_faculty}
                  onChange={handleInput}
                  variant="outlined"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="minimum_load_tesda_faculty"
                  label="Minimum Load TESDA Faculty"
                  name="minimum_load_tesda_faculty"
                  value={minimum_load_tesda_faculty}
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
                  isCreatingTeachingLoad ||
                  isEditingTeachingLoad ||
                  isDeletingTeachingLoad
                }
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                {createTeachingLoadModal ? 'Create' : 'Update'}
              </Button>

              {editTeachingLoad && (
                <Button
                  variant="contained"
                  disabled={
                    isCreatingTeachingLoad ||
                    isEditingTeachingLoad ||
                    isDeletingTeachingLoad
                  }
                  color="secondary"
                  type="button"
                  sx={{ ml: 2 }}
                  onClick={() =>
                    dispatch(deleteTeachingLoad(editTeachingLoadId))
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
export default AddTeachingLoad;
