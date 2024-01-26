import {
  Button,
  CircularProgress,
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
  createVerificationSchedule,
  getAllVerificationSchedules,
  handleChange,
  setDynamicData,
  toggleAddVerificationSchedule,
  toggleEditVerificationSchedule,
  updateVerificationSchedule,
} from 'src/features/academicFeatures/academicSlice';

const AddVerificationSchedule = () => {
  const dispatch = useDispatch();
  const {
    start_date_time,
    end_date_time,
    addVerificationSchedule,
    editVerificationSchedule,
    verification_schedule_id,
    isCreatingVerificationSchedule,
    isUpdatingVerificationSchedule,
  } = useSelector((state) => state.academics);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = () => {
    if (!(start_date_time && end_date_time))
      return toast.error('All Fields are required');

    if (start_date_time > end_date_time)
      return toast.error(
        'Start Date/Time cannot be greater than End Date/Time'
      );

    if (start_date_time === end_date_time)
      return toast.error('Start Date/Time cannot be equal to End Date/Time');

    if (editVerificationSchedule) {
      dispatch(
        updateVerificationSchedule({
          id: verification_schedule_id,
          start_date_time,
          end_date_time,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAllVerificationSchedules());
          clearData();
        }
      });
      return;
    }

    console.log(verification_schedule_id);

    dispatch(
      createVerificationSchedule({ start_date_time, end_date_time })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(getAllVerificationSchedules());
        clearData();
      }
    });
  };

  const clearData = () => {
    dispatch(
      setDynamicData({
        start_date_time: '',
        end_date_time: '',
        verification_schedule_id: '',
      })
    );

    if (addVerificationSchedule) {
      dispatch(toggleAddVerificationSchedule());
    } else if (editVerificationSchedule) {
      dispatch(toggleEditVerificationSchedule());
    }
  };

  return (
    <Modal
      open={addVerificationSchedule || editVerificationSchedule}
      onClose={clearData}
    >
      <Paper sx={{ ...styles, width: 400 }}>
        <Typography variant="h4" gutterBottom>
          {addVerificationSchedule
            ? 'Add Verification Schedule'
            : 'Edit Verification Schedule'}
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="datetime-local"
                  name="start_date_time"
                  value={start_date_time}
                  onChange={handleInputChange}
                  helperText="Start Date/Time"
                  error={
                    start_date_time > end_date_time ||
                    start_date_time === end_date_time ||
                    !start_date_time
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="datetime-local"
                  name="end_date_time"
                  value={end_date_time}
                  onChange={handleInputChange}
                  helperText="End Date/Time"
                  error={
                    end_date_time < start_date_time ||
                    end_date_time === start_date_time ||
                    !end_date_time
                  }
                />
              </FormControl>
            </Grid>
          </Grid>

          <Stack
            direction={'row'}
            spacing={1}
            justifyContent={'flex-end'}
            mt={2}
          >
            <Button variant="contained" color="warning" onClick={clearData}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={
                isCreatingVerificationSchedule || isUpdatingVerificationSchedule
              }
            >
              {isCreatingVerificationSchedule ||
              isUpdatingVerificationSchedule ? (
                <CircularProgress color="inherit" />
              ) : (
                'Submit'
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};
export default AddVerificationSchedule;
