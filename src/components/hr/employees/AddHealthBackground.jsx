import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearHealthBackground,
  createHealthBackground,
  deleteHealthBackground,
  handleChange,
  toggleAddHealthBackgroundModal,
  toggleEditHealthBackgroundModal,
  updateHealthBackground,
} from 'src/features/users/userSlice';

const AddHealthBackground = () => {
  const dispatch = useDispatch();
  const {
    isCreatingHealthBackground,
    isUpdatingHealthBackground,
    createHealthBackgroundModal,
    editHealthBackground,
    editHealthBackgroundId,
    existing_illness,
    previous_illness,
    medications,
    allergies,
    hospitalizations,
    smoking,
    alcohol,
    frequencies,
    isDeletingHealthBackground,
  } = useSelector((state) => state.users);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !existing_illness ||
      !previous_illness ||
      !medications ||
      !allergies ||
      !hospitalizations ||
      !smoking ||
      !alcohol ||
      !frequencies
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editHealthBackground) {
      dispatch(
        updateHealthBackground({
          editHealthBackgroundId,
          existing_illness,
          previous_illness,
          medications,
          allergies,
          hospitalizations,
          smoking,
          alcohol,
          frequencies,
        })
      );
      return;
    }

    dispatch(
      createHealthBackground({
        existing_illness,
        previous_illness,
        medications,
        allergies,
        hospitalizations,
        smoking,
        alcohol,
        frequencies,
      })
    );

    setTimeout(() => {
      dispatch(clearHealthBackground());
    }, 1500);
  };

  return (
    <Modal
      open={createHealthBackgroundModal || editHealthBackground}
      onClose={() => {
        createHealthBackgroundModal
          ? dispatch(toggleAddHealthBackgroundModal())
          : dispatch(toggleEditHealthBackgroundModal());
        dispatch(clearHealthBackground());
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
        <form>
          <Grid container p={2} rowGap={1} columnSpacing={1}>
            <Typography gutterBottom variant="h4">
              {editHealthBackground
                ? 'Edit Health Background'
                : 'Add Health Background'}
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Existing Illness"
                  name="existing_illness"
                  value={existing_illness}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Previous Illness"
                  name="previous_illness"
                  value={previous_illness}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Allergies"
                  name="allergies"
                  value={allergies}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Medications"
                  name="medications"
                  value={medications}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Hospitalizations"
                  name="hospitalizations"
                  value={hospitalizations}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="smoking">Smoking</InputLabel>
                <Select
                  label="Smoking"
                  name="smoking"
                  value={smoking}
                  onChange={handleInput}
                  id="smoking"
                  labelId="smoking"
                >
                  {frequencies.map((frequency) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
                      key={frequency}
                      value={frequency}
                    >
                      {frequency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="alcohol">Alcohol</InputLabel>
                <Select
                  label="Alcohol"
                  name="alcohol"
                  value={alcohol}
                  onChange={handleInput}
                  id="alcohol"
                  labelId="alcohol"
                >
                  {frequencies.map((frequency) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
                      key={frequency}
                      value={frequency}
                    >
                      {frequency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  isCreatingHealthBackground ||
                  isUpdatingHealthBackground ||
                  isDeletingHealthBackground
                }
              >
                {isCreatingHealthBackground || isUpdatingHealthBackground ? (
                  <CircularProgress size="1.5rem" />
                ) : createHealthBackgroundModal ? (
                  'Submit'
                ) : (
                  'Update'
                )}
              </Button>

              {editHealthBackground && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: '0.7rem' }}
                  onClick={() => {
                    dispatch(deleteHealthBackground(editHealthBackgroundId));
                    dispatch(toggleEditHealthBackgroundModal());
                  }}
                  disabled={isDeletingHealthBackground}
                >
                  {isDeletingHealthBackground ? (
                    <CircularProgress size="1.5rem" />
                  ) : (
                    'Delete'
                  )}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AddHealthBackground;
