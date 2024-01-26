import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearBreak,
  handleChange,
  toggleEditBreak,
  updateBreak,
} from 'src/features/hrFeatures/employees/employeeSlice';

const EditBreak = () => {
  const dispatch = useDispatch();
  const {
    break_attendance_date,
    break_start,
    break_end,
    editBreak,
    isUpdatingBreak,
    employeeID,
  } = useSelector((state) => state.employees);

  const startTime = DateTime.fromISO(break_start);
  const endTime = DateTime.fromISO(break_end);
  const totalMinutes = Math.ceil(Math.abs(endTime - startTime) / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!attendance_date || !break_start || !break_end) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editBreak) {
      dispatch(
        updateBreak({
          userId: employeeID,
          attendance_date,
          break_start,
          break_end,
        })
      );
    }
  };

  return (
    <Modal
      open={editBreak}
      onClose={() => {
        dispatch(toggleEditBreak());
        dispatch(clearBreak());
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
          Edit Break
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
                  DateTime.fromISO(break_attendance_date).toFormat(
                    'yyyy-MM-dd'
                  ) || ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Break Start"
                name="break_start"
                type="time"
                onChange={handleInput}
                value={
                  break_start
                    ? DateTime.fromISO(break_start).toFormat('HH:mm')
                    : ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Break End"
                name="break_end"
                onChange={handleInput}
                type="time"
                value={
                  break_end ? DateTime.fromISO(break_end).toFormat('HH:mm') : ''
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Break Hours"
                name="total_break_time"
                onChange={handleInput}
                value={break_end ? `${hours} hours ${minutes} minutes` : ''}
                variant="outlined"
              />
            </Grid>

            <Button
              color="primary"
              sx={{ mt: 2, ml: 2 }}
              disabled={isUpdatingBreak}
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              {isUpdatingBreak ? 'Updating...' : 'Update Break'}
            </Button>

            <Button
              color="error"
              sx={{ mt: 2, ml: 1 }}
              disabled={isUpdatingBreak}
              onClick={() => {
                dispatch(toggleEditBreak());
                dispatch(clearBreak());
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
export default EditBreak;
