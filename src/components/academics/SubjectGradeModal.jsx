import { useDispatch, useSelector } from 'react-redux';

import {
  Alert,
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

import { toast } from 'react-toastify';
import {
  addSubjectGrade,
  clearGrade,
  setGrade,
  toggleAddGrade,
  toggleEditGrade,
  updateSubjectGrade,
} from 'src/features/academicFeatures/academicSlice';

const SubjectGradeModal = () => {
  const dispatch = useDispatch();

  const { grade, isAddingGrade, isEditingGrade } = useSelector(
    (state) => state.academics
  );
  const {
    studentProfile: { _id },
  } = useSelector((state) => state.admissions);

  const handleInput = (e) => {
    dispatch(
      setGrade({ ...grade, period: e.target.name, grade: e.target.value })
    );
  };

  const handleChange = (e) => {
    dispatch(setGrade({ ...grade, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (grade.grade > 100) {
      toast.error('Value limit exceeded');
      return;
    }
    if (grade.grade < 70) {
      toast.error('No lower grade than 70');
      return;
    }
    if (!grade.grade || !grade.status) {
      toast.error('Please provide all required values');
      return;
    }
    if (isEditingGrade) {
      dispatch(updateSubjectGrade({ ...grade, student: _id }));
      handleClose();
      return;
    }
    dispatch(addSubjectGrade({ ...grade, student: _id }));
    handleClose();
  };

  const handleClose = () => {
    isAddingGrade ? dispatch(toggleAddGrade()) : dispatch(toggleEditGrade());
    dispatch(clearGrade());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingGrade || isEditingGrade}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingGrade ? 'Add Grade' : 'Edit Grade'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity="info">
              As soon as status is completed, you cannot change or alter the
              grade.
            </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label={grade?.period}
                placeholder="80"
                type="number"
                name={grade?.period}
                variant="outlined"
                onChange={handleInput}
                value={grade?.grade || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-status">Status</InputLabel>
              <Select
                id="select-status"
                label="Status"
                name="status"
                value={grade?.status || ''}
                onChange={handleChange}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
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
          {isAddingGrade ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubjectGradeModal;
