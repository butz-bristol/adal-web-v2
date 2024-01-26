import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { toast } from 'react-toastify';
import {
  clearTeacherDesignation,
  createTeacherDesignation,
  setTeacherDesignation,
  toggleAddTeacherDesignation,
  toggleEditTeacherDesignation,
  updateTeacherDesignationById,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const AddTeacherDesignationModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    isAddingTeacherDesignation,
    isEditingTeacherDesignation,
    teacherDesignation,
  } = useSelector((state) => state.coreHr);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teacherDesignation.designation_name) {
      toast.error('Please enter a designation name');
      return;
    }
    if (isEditingTeacherDesignation) {
      dispatch(updateTeacherDesignationById({ ...teacherDesignation }));
      handleClose();
      return;
    }
    dispatch(createTeacherDesignation({ ...teacherDesignation }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(
      setTeacherDesignation({
        ...teacherDesignation,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChange = (e) => {
    dispatch(
      setTeacherDesignation({
        ...teacherDesignation,
        [e.target.name]: { _id: e.target.value },
      })
    );
  };

  const handleClose = () => {
    isAddingTeacherDesignation
      ? dispatch(toggleAddTeacherDesignation())
      : dispatch(toggleEditTeacherDesignation());
    dispatch(clearTeacherDesignation());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingTeacherDesignation || isEditingTeacherDesignation}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingTeacherDesignation
            ? 'Add Designation'
            : 'Update Designation'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Designation Name"
                placeholder="Teacher"
                name="designation_name"
                variant="outlined"
                onChange={handleInput}
                value={teacherDesignation?.designation_name || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                onChange={handleInput}
                value={teacherDesignation?.description || ''}
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
          {isAddingTeacherDesignation ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeacherDesignationModal;
