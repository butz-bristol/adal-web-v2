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
  createViewingSchedule,
  getAllViewingSchedules,
  handleChange,
  setDynamicData,
  toggleAddViewingSchedule,
  toggleEditViewingSchedule,
  updateViewingSchedule,
} from 'src/features/academicFeatures/academicSlice';

const AddViewingSchedule = () => {
  const dispatch = useDispatch();
  const {
    start_date_time,
    end_date_time,
    addViewingSchedule,
    editViewingSchedule,
    grade_schedule_id,
    isCreatingViewingSchedule,
    isUpdatingViewingSchedule,
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

    if (editViewingSchedule) {
      dispatch(
        updateViewingSchedule({
          id: grade_schedule_id,
          start_date_time,
          end_date_time,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAllViewingSchedules());
          clearData();
        }
      });
      return;
    }

    dispatch(createViewingSchedule({ start_date_time, end_date_time })).then(
      (res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAllViewingSchedules());
          clearData();
        }
      }
    );
  };

  const clearData = () => {
    dispatch(
      setDynamicData({
        start_date_time: '',
        end_date_time: '',
        grade_schedule_id: '',
      })
    );

    if (addViewingSchedule) {
      dispatch(toggleAddViewingSchedule());
    } else if (editViewingSchedule) {
      dispatch(toggleEditViewingSchedule());
    }
  };

  return (
    <Modal open={addViewingSchedule || editViewingSchedule} onClose={clearData}>
      <Paper sx={{ ...styles, width: 400 }}>
        <Typography variant="h4" gutterBottom>
          {addViewingSchedule
            ? 'Add Viewing Schedule'
            : 'Edit Viewing Schedule'}
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
              disabled={isCreatingViewingSchedule || isUpdatingViewingSchedule}
            >
              {isCreatingViewingSchedule || isUpdatingViewingSchedule ? (
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
export default AddViewingSchedule;
