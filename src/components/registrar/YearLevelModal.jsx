import { useEffect, useState } from 'react';
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
  addYearLevel,
  clearYearLevel,
  setYearLevel,
  toggleAddYearLevel,
  toggleEditYearLevel,
  updateYearLevel,
} from 'src/features/registrarFeatures/registrarSlice';

const YearLevelModal = () => {
  const dispatch = useDispatch();

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);

  const {
    isAddingYearLevel,
    isEditingYearLevel,
    year_level,
    departments,
    college_tracks,
  } = useSelector((state) => state.registrar);

  const selectedDepartment = departments.find(
    (department) => department?._id === year_level.department?._id
  )?.department_name;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingYearLevel) {
      dispatch(updateYearLevel({ ...year_level }));
      return;
    }
    dispatch(addYearLevel({ ...year_level }));
  };

  const handleChange = (e) => {
    const data = { ...year_level };
    if (e.target.name === 'department') {
      const filteredCollegeTrack = college_tracks?.filter(
        (college_track) => college_track.department._id === e.target.value
      );
      data.college_or_track = null;

      setFilteredCollegeTrack(filteredCollegeTrack);
    }
    dispatch(
      setYearLevel({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleInput = (e) => {
    dispatch(setYearLevel({ ...year_level, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    dispatch(clearYearLevel());
    isAddingYearLevel
      ? dispatch(toggleAddYearLevel())
      : dispatch(toggleEditYearLevel());
  };

  useEffect(() => {
    if (isEditingYearLevel) {
      const filteredCollegeTrack = college_tracks.filter(
        (college_or_track) =>
          college_or_track.department._id === year_level?.department?._id
      );
      if (year_level?.department) {
        setFilteredCollegeTrack(filteredCollegeTrack);
      }
    }
  }, [year_level]);

  return (
    <Dialog
      fullWidth
      open={isAddingYearLevel || isEditingYearLevel}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle fontSize={18}>
          {isAddingYearLevel ? 'Add Level' : 'Update Level'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-department">Department</InputLabel>
                <Select
                  id="select-department"
                  label="Department"
                  name="department"
                  value={year_level?.department?._id || ''}
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
            {selectedDepartment && selectedDepartment === 'K-12' && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-college-track">
                    College/Track
                  </InputLabel>
                  <Select
                    id="select-college-track"
                    label="College/Track"
                    name="college_or_track"
                    value={
                      (filteredCollegeTrack.length > 0 &&
                        year_level?.college_or_track?._id) ||
                      ''
                    }
                    onChange={handleChange}
                  >
                    {filteredCollegeTrack &&
                      filteredCollegeTrack.map((college_track) => (
                        <MenuItem
                          key={college_track._id}
                          value={college_track._id}
                        >
                          {college_track.college_track_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Year/Level"
                  name="year_level_name"
                  variant="outlined"
                  onChange={handleInput}
                  value={year_level?.year_level_name || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  type="number"
                  label="Position"
                  name="year_level_position"
                  variant="outlined"
                  onChange={handleInput}
                  value={year_level?.year_level_position || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-remarks">Remarks</InputLabel>
                <Select
                  id="select-remarks"
                  label="Remarks"
                  name="remarks"
                  value={year_level?.remarks || ''}
                  onChange={handleInput}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Under Review">Under Review</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                type="text"
                label="Description"
                name="year_level_description"
                value={year_level?.year_level_description || ''}
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
            {isAddingYearLevel ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default YearLevelModal;
