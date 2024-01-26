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
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addFiscalYear,
  clearFiscalYear,
  handleChange,
  toggleAddFiscalYear,
  toggleEditFiscalYear,
  updateFiscalYear,
} from 'src/features/accountingFeatures/accountingSlice';
import { getAllAcademicYears } from 'src/features/registrarFeatures/registrarSlice';

const AddFiscalYearModal = () => {
  const dispatch = useDispatch();
  const { academic_years } = useSelector((state) => state.registrar);
  const { user } = useSelector((state) => state.users);
  const {
    isAddingFiscalYear,
    isEditingFiscalYear,
    fiscal_start_date,
    fiscal_end_date,
    academic_year_id,
    fiscal_years,
    fiscal_year,
  } = useSelector((state) => state.accounting);

  const fiscalYearExists = fiscal_years.find((year) => {
    const formattedStartDate =
      DateTime.fromISO(year.start_date).toFormat('yyyy-MM-dd') ===
      fiscal_start_date;
    const formattedEndDate =
      DateTime.fromISO(year.end_date).toFormat('yyyy-MM-dd') ===
      fiscal_end_date;
    const academicYear = year.academic_year?._id === academic_year_id;

    return formattedStartDate && formattedEndDate && academicYear;
  });

  const handleClose = () => {
    isAddingFiscalYear
      ? dispatch(toggleAddFiscalYear())
      : dispatch(toggleEditFiscalYear());
    dispatch(clearFiscalYear());
  };

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!fiscal_start_date || !fiscal_end_date || !academic_year_id) {
        toast.error('Please enter a Fiscal year');
        return;
      }
      if (fiscal_start_date > fiscal_end_date) {
        return toast.error('Start date should not be a future date ');
      }
      if (fiscal_start_date === fiscal_end_date) {
        return toast.error('Start Date should not be equal to End Date ');
      }

      if (fiscalYearExists) {
        toast.error('Fiscal year already exists');
        return;
      }

      if (isEditingFiscalYear) {
        dispatch(
          updateFiscalYear({
            ...fiscal_year,
            start_date: fiscal_start_date,
            end_date: fiscal_end_date,
            academic_year: academic_year_id,
            createdBy: user?.userId,
          })
        );
        return handleClose();
      }
      dispatch(
        addFiscalYear({
          start_date: fiscal_start_date,
          end_date: fiscal_end_date,
          academic_year: academic_year_id,
          createdBy: user?.userId,
        })
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getAllAcademicYears());
  }, [dispatch]);

  return (
    <Dialog
      fullWidth
      open={isAddingFiscalYear || isEditingFiscalYear}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="h4" gutterBottom mb={3}>
            {isAddingFiscalYear ? 'Add Fiscal Year' : 'Update Fiscal Year'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="start_date"
                  label="Start Date"
                  type="date"
                  name="fiscal_start_date"
                  value={
                    DateTime.fromISO(fiscal_start_date).toFormat(
                      'yyyy-MM-dd'
                    ) || ''
                  }
                  onChange={handleInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="end_date"
                  type="date"
                  label="End Date"
                  name="fiscal_end_date"
                  value={
                    DateTime.fromISO(fiscal_end_date).toFormat('yyyy-MM-dd') ||
                    ''
                  }
                  onChange={handleInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="academic-year-select">School Year</InputLabel>
                <Select
                  id="academic-year-select"
                  label="Academic years"
                  value={academic_year_id || ''}
                  onChange={handleInput}
                  required
                  name="academic_year_id"
                >
                  {academic_years.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year?.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item>
            <Button variant="contained" color="secondary" type="submit">
              {isAddingFiscalYear ? 'Submit' : 'Update'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFiscalYearModal;
