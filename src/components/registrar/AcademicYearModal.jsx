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

import { toast } from 'react-toastify';
import {
  addAcademicYear,
  clearAcademicYear,
  setAcademicYear,
  toggleAddAcademicYear,
  toggleEditAcademicYear,
  updateAcademicYear,
} from 'src/features/registrarFeatures/registrarSlice';

const AcademicYearModal = () => {
  const dispatch = useDispatch();

  const {
    isAddingAcademicYear,
    isEditingAcademicYear,
    academic_year,
    academic_years,
  } = useSelector((state) => state.registrar);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!academic_year.school_year) {
      toast.error('Please enter a school year');
      return;
    }
    const yearPattern = /^\d{4}-\d{4}$/;
    const [initialYear, endingYear] = academic_year.school_year.split('-');
    const currentYear = new Date().getFullYear();
    const isExist = academic_years.find(
      (year) => year.school_year === academic_year?.school_year
    );
    if (!yearPattern.test(academic_year.school_year)) {
      toast.error('Invalid year format');
      return;
    }
    if (parseInt(initialYear) >= parseInt(endingYear)) {
      toast.error('The initial year must be less than the ending year');
      return;
    }
    if (parseInt(initialYear) + 1 !== parseInt(endingYear)) {
      toast.error('The ending year must be one year after the initial year');
      return;
    }
    if (isExist) {
      toast.error('Academic year already exists');
      return;
    }
    if (isEditingAcademicYear) {
      dispatch(updateAcademicYear({ ...academic_year }));
      return;
    }
    dispatch(addAcademicYear({ ...academic_year }));
  };

  const handleInput = (e) => {
    dispatch(
      setAcademicYear({ ...academic_year, [e.target.name]: e.target.value })
    );
  };

  const handleClose = () => {
    dispatch(clearAcademicYear());
    isAddingAcademicYear
      ? dispatch(toggleAddAcademicYear())
      : dispatch(toggleEditAcademicYear());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingAcademicYear || isEditingAcademicYear}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle fontSize={18}>
          {isAddingAcademicYear ? 'Add Academic Year' : 'Update Academic Year'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="School Year"
                  name="school_year"
                  variant="outlined"
                  onChange={handleInput}
                  value={academic_year?.school_year || ''}
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
            {isAddingAcademicYear ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AcademicYearModal;
