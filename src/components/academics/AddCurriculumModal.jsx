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
  clearCurriculum,
  createCurriculum,
  setCurriculum,
  toggleAddCurriculum,
  toggleEditCurriculum,
  updateCurriculum,
} from 'src/features/academicFeatures/academicSlice';

const AddCurriculumModal = () => {
  const dispatch = useDispatch();

  const { isAddingCurriculum, isEditingCurriculum, curriculum } = useSelector(
    (state) => state.academics
  );
  const { academic_years } = useSelector((state) => state.registrar);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingCurriculum) {
      dispatch(updateCurriculum({ ...curriculum }));
      handleClose();
      return;
    }
    dispatch(createCurriculum({ ...curriculum }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(setCurriculum({ ...curriculum, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    isAddingCurriculum
      ? dispatch(toggleAddCurriculum())
      : dispatch(toggleEditCurriculum());
    dispatch(clearCurriculum());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingCurriculum || isEditingCurriculum}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingCurriculum ? 'Add Curriculum' : 'Update Curriculum'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Curriculum Name"
                placeholder="Revised2023"
                name="curriculum_name"
                variant="outlined"
                onChange={handleInput}
                value={curriculum.curriculum_name || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="academic_year-select">Academic Year</InputLabel>
              <Select
                id="academic_year-select"
                label="Academic Year"
                name="academic_year"
                value={curriculum.academic_year || ''}
                onChange={handleInput}
              >
                {academic_years.map((academic_year) => (
                  <MenuItem key={academic_year._id} value={academic_year._id}>
                    {academic_year.school_year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="curriculum_description"
                variant="outlined"
                onChange={handleInput}
                value={curriculum.curriculum_description || ''}
                rows={3}
                multiline
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="select-remarks">Remarks</InputLabel>
              <Select
                id="select-remarks"
                label="Remarks"
                name="remarks"
                value={curriculum.remarks || ''}
                onChange={handleInput}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingCurriculum ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurriculumModal;
