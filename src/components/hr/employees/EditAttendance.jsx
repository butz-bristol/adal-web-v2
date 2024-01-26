import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAttendance,
  handleChange,
  toggleEditAttendance,
  updateAttendance,
} from 'src/features/hrFeatures/employees/employeeSlice';

const EditAttendance = () => {
  const dispatch = useDispatch();
  const {
    attendance_date,
    clock_in,
    clock_out,
    editAttendance,
    isUpdatingAttendance,
    employeeID,
  } = useSelector((state) => state.employees);

  const startTime = DateTime.fromISO(clock_in);
  const endTime = DateTime.fromISO(clock_out);
  const totalMinutes = Math.ceil(Math.abs(endTime - startTime) / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!attendance_date || !clock_in || !clock_out) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editAttendance) {
      dispatch(
        updateAttendance({
          userId: employeeID,
          attendance_date,
          clock_in,
          clock_out,
        })
      );
    }
  };

  return (
    <Modal
      open={editAttendance}
      onClose={() => {
        dispatch(toggleEditAttendance());
        dispatch(clearAttendance());
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
          padding: '20px',
          overflow: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Edit Attendance
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Attendance Date"
                name="attendance_date"
                onChange={handleInput}
                type="date"
                value={
                  DateTime.fromISO(attendance_date).toFormat('yyyy-MM-dd') || ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Clock In"
                name="clock_in"
                type="time"
                onChange={handleInput}
                value={
                  clock_in ? DateTime.fromISO(clock_in).toFormat('HH:mm') : ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Clock Out"
                name="clock_out"
                onChange={handleInput}
                type="time"
                value={
                  clock_out ? DateTime.fromISO(clock_out).toFormat('HH:mm') : ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Hours Worked"
                name="total_hours_worked"
                onChange={handleInput}
                value={clock_out ? `${hours} hours ${minutes} minutes` : ''}
                variant="outlined"
              />
            </Grid>

            <Button
              color="primary"
              sx={{ mt: 2, ml: 2 }}
              disabled={isUpdatingAttendance}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              {isUpdatingAttendance ? 'Updating...' : 'Update Attendance'}
            </Button>

            <Button
              color="error"
              sx={{ mt: 2, ml: 1 }}
              disabled={isUpdatingAttendance}
              onClick={() => {
                dispatch(toggleEditAttendance());
                dispatch(clearAttendance());
              }}
              type="submit"
              variant="contained"
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default EditAttendance;
