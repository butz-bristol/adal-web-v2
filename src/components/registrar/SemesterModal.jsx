import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import {
  addSemester,
  clearSemester,
  setSemester,
  toggleAddSemester,
  toggleEditSemester,
  updateSemester,
} from 'src/features/registrarFeatures/registrarSlice';

import { toast } from 'react-toastify';

const SemesterModal = () => {
  const dispatch = useDispatch();
  const { isAddingSemester, isEditingSemester, semester } = useSelector(
    (state) => state.registrar
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!semester?.semester_term) {
      toast.error('Please input a semester term');
      return;
    }
    if (isEditingSemester) {
      dispatch(updateSemester({ ...semester }));
      return;
    }
    dispatch(addSemester({ ...semester }));
  };

  const handleInput = (e) => {
    dispatch(setSemester({ ...semester, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    dispatch(clearSemester());
    isAddingSemester
      ? dispatch(toggleAddSemester())
      : dispatch(toggleEditSemester());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isAddingSemester || isEditingSemester}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle fontSize={18}>
          {isAddingSemester ? 'Add Semester' : 'Update Semester'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Semester Term"
                  name="semester_term"
                  variant="outlined"
                  onChange={handleInput}
                  value={semester?.semester_term || ''}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            {isAddingSemester ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SemesterModal;
