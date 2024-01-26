import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { weekdays } from 'src/utils/helperFunctions';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  clearSchedule,
  createSchedule,
  setSchedule,
  toggleAddSchedule,
  toggleEditSchedule,
  updateSchedule,
} from 'src/features/academicFeatures/academicSlice';

const AddSectionScheduleModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    isAddingSchedule,
    isEditingSchedule,
    section,
    schedule,
    rooms,
    subjectAssignments,
  } = useSelector((state) => state.academics);

  const { departments } = useSelector((state) => state.registrar);

  const selectedDepartment = departments?.find(
    (department) => department?._id === section.department?._id
  )?.department_name;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...schedule,
      section: section._id,
    };

    if (!updatedData?.subject_assignment?._id) {
      toast.error('Please Select a Subject');
      return;
    }
    if (!updatedData?.room?._id) {
      toast.error('Please Select a Room');
      return;
    }
    if (updatedData?.schedule.length === 0) {
      toast.error('Please Select at least one Weekday');
      return;
    }
    if (!updatedData?.start_time || !updatedData?.end_time) {
      toast.error('Please choose a start time and end time');
      return;
    }

    if (isEditingSchedule) {
      dispatch(updateSchedule(updatedData));
      dispatch(clearSchedule());
      return;
    }

    dispatch(createSchedule(updatedData));
    dispatch(clearSchedule());
  };

  const handleChange = (e) => {
    dispatch(
      setSchedule({ ...schedule, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleInput = (e) => {
    dispatch(setSchedule({ ...schedule, [e.target.name]: e.target.value }));
  };

  const handleWeekdayChange = (weekday) => {
    const currentSchedule = [...schedule.schedule];
    const index = currentSchedule.indexOf(weekday);
    if (index === -1) {
      currentSchedule.push(weekday);
    } else {
      currentSchedule.splice(index, 1);
    }
    dispatch(setSchedule({ ...schedule, schedule: currentSchedule }));
  };

  const handleClose = () => {
    isAddingSchedule
      ? dispatch(toggleAddSchedule())
      : dispatch(toggleEditSchedule());
    dispatch(clearSchedule());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingSchedule || isEditingSchedule}
      onClose={handleClose}
    >
      <form>
        <DialogContent>
          <Grid container mb={2}>
            <Grid item xs={12} mb={2}>
              <Typography variant="h4" color="secondary">
                {isAddingSchedule ? 'Add Schedule' : 'Edit Schedule'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="subject-id">Subject</InputLabel>
                <Select
                  labelId="subject-id"
                  id="subject_assignment"
                  name="subject_assignment"
                  value={schedule?.subject_assignment?._id || ''}
                  onChange={handleChange}
                  label="Subject"
                >
                  {subjectAssignments ? (
                    subjectAssignments
                      ?.filter((item) => section?._id === item?.section?._id)
                      .map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.subject_course.subject_name ||
                            item.subject_course.course_name}{' '}
                          - {item.instructor?.first_name}{' '}
                          {item.instructor?.last_name}
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem value="">
                      <em>No Subjects Found</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="room-id">Room</InputLabel>
                <Select
                  labelId="room-id"
                  id="room"
                  value={schedule?.room?._id || ''}
                  name="room"
                  onChange={handleChange}
                  label="Room"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {rooms &&
                    rooms.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.building} - {room.room_number}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Choose a schedule</Typography>
              <Typography variant="caption">
                Select the weekdays in order.
              </Typography>
            </Grid>
            <Grid container item justifyContent="center">
              {weekdays.map((weekday, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={schedule?.schedule?.includes(weekday) || false}
                        onChange={() => handleWeekdayChange(weekday)}
                        name="schedule"
                        value={weekday}
                      />
                    }
                    label={weekday}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <TextField
                  type="time"
                  helperText="Start At"
                  onChange={handleInput}
                  name="start_time"
                  value={schedule.start_time || ''}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <TextField
                  type="time"
                  helperText="End At"
                  onChange={handleInput}
                  name="end_time"
                  value={schedule.end_time || ''}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {isAddingSchedule ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSectionScheduleModal;
