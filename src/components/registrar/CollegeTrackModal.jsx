import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import {
  addCollegeTrack,
  clearCollegeTrack,
  setCollegeTrack,
  toggleAddCollegeTrack,
  toggleEditCollegeTrack,
  updateCollegeTrack,
} from 'src/features/registrarFeatures/registrarSlice';

const CollegeTrackModal = () => {
  const dispatch = useDispatch();

  const {
    isAddingCollegeTrack,
    isEditingCollegeTrack,
    college_track,
    departments,
  } = useSelector((state) => state.registrar);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingCollegeTrack) {
      dispatch(updateCollegeTrack({ ...college_track }));
      return;
    }
    dispatch(addCollegeTrack({ ...college_track }));
  };

  const handleChange = (e) => {
    dispatch(
      setCollegeTrack({
        ...college_track,
        [e.target.name]: { _id: e.target.value },
      })
    );
  };

  const handleInput = (e) => {
    dispatch(
      setCollegeTrack({ ...college_track, [e.target.name]: e.target.value })
    );
  };

  const handleClose = () => {
    dispatch(clearCollegeTrack());
    isAddingCollegeTrack
      ? dispatch(toggleAddCollegeTrack())
      : dispatch(toggleEditCollegeTrack());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingCollegeTrack || isEditingCollegeTrack}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle fontSize={18}>
          {isAddingCollegeTrack
            ? 'Add College or Track'
            : 'Update College or Track'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-department">Department</InputLabel>
                <Select
                  id="select-department"
                  label="Department"
                  name="department"
                  value={college_track?.department?._id || ''}
                  onChange={handleChange}
                >
                  {departments
                    .filter((department) => department.remarks === 'Active')
                    .map((department) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department?.department_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="College or Track"
                  name="college_track_name"
                  variant="outlined"
                  onChange={handleInput}
                  value={college_track?.college_track_name || ''}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                type="text"
                label="Description"
                name="college_track_description"
                value={college_track?.college_track_description || ''}
                onChange={handleInput}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            {isAddingCollegeTrack ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CollegeTrackModal;
