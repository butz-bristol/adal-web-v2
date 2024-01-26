import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  clearProgram,
  createProgram,
  setProgram,
  toggleAddProgram,
  toggleEditProgram,
  updateProgram,
} from 'src/features/academicFeatures/academicSlice';

const AddProgramModal = () => {
  const dispatch = useDispatch();

  const { college_tracks } = useSelector((state) => state.registrar);
  const { isAddingProgram, isEditingProgram, program, curriculums } =
    useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingProgram) {
      dispatch(updateProgram({ ...program }));
      handleClose();
      return;
    }
    dispatch(createProgram({ ...program }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(setProgram({ ...program, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    dispatch(
      setProgram({ ...program, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleClose = () => {
    isAddingProgram
      ? dispatch(toggleAddProgram())
      : dispatch(toggleEditProgram());
    dispatch(clearProgram());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingProgram || isEditingProgram}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingProgram ? 'Add Program' : 'Update Program'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-curriculum">Curriculum</InputLabel>
              <Select
                id="select-curriculum"
                label="Curriculum"
                name="curriculum_ref"
                value={program.curriculum_ref?._id || ''}
                onChange={handleChange}
              >
                {curriculums?.map((curriculum) => (
                  <MenuItem key={curriculum._id} value={curriculum._id}>
                    {curriculum.curriculum_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-college-track">College/Track</InputLabel>
              <Select
                id="select-college-track"
                label="College/Track"
                name="college_track"
                value={program.college_track?._id || ''}
                onChange={handleChange}
              >
                {college_tracks.map((college_track) => (
                  <MenuItem key={college_track._id} value={college_track._id}>
                    {college_track.college_track_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              fullWidth
              type="text"
              label="Program Name"
              name="program_name"
              value={program.program_name || ''}
              onChange={handleInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="program_description"
                variant="outlined"
                onChange={handleInput}
                value={program.program_description || ''}
                rows={3}
                multiline
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
          {isAddingProgram ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProgramModal;
