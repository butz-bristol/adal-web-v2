import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

import { DateTime } from 'luxon';
import {
  clearStudent,
  setStudent,
  toggleEntranceExamDateModal,
  updateStudent,
} from 'src/features/admissionsFeatures/admissionsSlice';

const AddEntranceExamDateModal = () => {
  const dispatch = useDispatch();

  const {
    studentProfile: {
      student_first_name,
      student_last_name,
      student_admissions_status,
      student_entrance_exam_date,
    },
    student,
    isAddingEntranceExamDate,
  } = useSelector((state) => state.admissions);

  const handleSubmit = () => {
    if (student.student_entrance_exam_date < new Date().toLocaleString()) {
      toast.error('You cannot use a previous date!');
      return;
    } else if (!student.student_entrance_exam_date) {
      toast.error('Please set a Exam Date!');
      return;
    }
    dispatch(
      updateStudent({ ...student, student_entrance_exam_status: 'pending' })
    );
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    dispatch(toggleEntranceExamDateModal());
    dispatch(clearStudent());
  };

  return (
    <Dialog fullWidth open={isAddingEntranceExamDate} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {!student_entrance_exam_date
            ? 'Set a Schedule of Exam'
            : 'Update Schedule of Exam'}
        </Typography>

        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="subtitle2">Name</Typography>
            <Typography textTransform="capitalize" variant="subtitle1">
              {student_first_name + ' ' + student_last_name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Admission Status</Typography>
            <Typography textTransform="capitalize" variant="subtitle1">
              {student_admissions_status}
            </Typography>
          </Grid>
        </Grid>
        <form>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{ mb: 2 }}
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="date"
                  helperText="Date of Exam"
                  onChange={handleInput}
                  name="student_entrance_exam_date"
                  value={
                    !student.student_entrance_exam_date
                      ? DateTime.fromISO(student_entrance_exam_date).toFormat(
                          'yyyy-MM-dd'
                        )
                      : student.student_entrance_exam_date || ''
                  }
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {!student_entrance_exam_date ? 'Set' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntranceExamDateModal;
