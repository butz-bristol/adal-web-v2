import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
  clearStudent,
  setStudent,
  toggleEntranceExamScoreModal,
  updateStudent,
} from 'src/features/admissionsFeatures/admissionsSlice';

const AddEntranceExamScoreModal = () => {
  const dispatch = useDispatch();

  const {
    studentProfile: {
      student_first_name,
      student_last_name,
      student_entrance_exam_date,
    },
    student,
    isAddingEntranceExamScore,
  } = useSelector((state) => state.admissions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.student_entrance_exam_score) {
      toast.error('Please set a Score!');
      return;
    }
    if (e.target.name === 'set-interview-date') {
      if (student.student_interview_date < new Date().toLocaleString()) {
        toast.error('You cannot use a previous date!');
        return;
      }
      if (!student.student_interview_date) {
        toast.error('Please set a Interview Date!');
        return;
      }
    }
    dispatch(updateStudent({ ...student }));
    handleClose();
    return;
  };

  const handleInput = (e) => {
    const data = { ...student, [e.target.name]: e.target.value };
    if (e.target.name === 'student_entrance_exam_score') {
      if (e.target.value > 100) {
        toast.error('Value limit exceeded');
        return;
      }
    }
    if (
      (e.target.name === 'student_entrance_exam_status' &&
        e.target.value === 'Passed') ||
      e.target.value === 'Waived'
    ) {
      dispatch(
        setStudent({
          ...data,
          student_admissions_status: 'eligible for interview',
          student_interview_status: 'Pending',
        })
      );
      return;
    }
    if (
      e.target.name === 'student_entrance_exam_status' &&
      e.target.value === 'Failed'
    ) {
      delete data.student_interview_date;
      dispatch(
        setStudent({
          ...data,
          student_entrance_exam_status: 'Failed',
          student_admissions_status: 'Rejected',
        })
      );
      return;
    }
    dispatch(setStudent({ ...data }));
  };

  const handleClose = () => {
    dispatch(toggleEntranceExamScoreModal());
    dispatch(clearStudent());
  };

  return (
    <Dialog fullWidth open={isAddingEntranceExamScore} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          For Interview
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Grid item xs>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="subtitle1">
              {student_first_name + ' ' + student_last_name}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2">Entrance Exam Date</Typography>
            <Typography variant="subtitle1">
              {student_entrance_exam_date
                ? DateTime.fromISO(student_entrance_exam_date)
                    .setLocale('ph')
                    .toFormat('ff')
                : 'No schedule yet'}
            </Typography>
          </Grid>
        </Grid>
        {student_entrance_exam_date && (
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{ mb: 2 }}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Entrance Exam Score"
                onChange={handleInput}
                name="student_entrance_exam_score"
                value={student.student_entrance_exam_score || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-entrance-exam-status">
                  Entrance Exam Status
                </InputLabel>
                <Select
                  id="select-entrance-exam-status"
                  value={student.student_entrance_exam_status || ''}
                  onChange={handleInput}
                  name="student_entrance_exam_status"
                  label="Entrance Exam Status"
                >
                  <MenuItem value="Passed">Passed</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                  <MenuItem value="Waived">Waived</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Entrance Exam Notes"
                onChange={handleInput}
                name="student_entrance_exam_notes"
                value={student.student_entrance_exam_notes || ''}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            {student.student_entrance_exam_status &&
              student.student_entrance_exam_status != 'Failed' && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      helperText="Date of Interview"
                      onChange={handleInput}
                      name="student_interview_date"
                      value={student.student_interview_date || ''}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        {student.student_entrance_exam_status === 'Passed' ||
        student.student_entrance_exam_status === 'Waived' ? (
          <Button
            variant="contained"
            color="secondary"
            name="set-interview-date"
            onClick={handleSubmit}
          >
            Set Interview Date
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            name="set-reject-admission"
            onClick={handleSubmit}
          >
            Reject Admission
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddEntranceExamScoreModal;
