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
  toggleAdmissionStatusModal,
  updateStudent,
} from 'src/features/admissionsFeatures/admissionsSlice';

const EditAdmissionStatusModal = () => {
  const dispatch = useDispatch();

  const {
    studentProfile: {
      student_first_name,
      student_last_name,
      student_admissions_status,
      student_registration_status,
    },
    student,
    isEditingAdmissionStatus,
  } = useSelector((state) => state.admissions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.student_interview_status) {
      toast.error('Please provide an interview status');
      return;
    }

    dispatch(updateStudent({ ...student }));
    handleClose();
  };

  const handleInput = (e) => {
    if (e.target.value === 'rejected') {
      dispatch(
        setStudent({
          ...student,
          student_admissions_status: 'rejected',
          [e.target.name]: e.target.value,
        })
      );
      return;
    }
    const data = { ...student };
    delete data.student_interview_notes;
    dispatch(
      setStudent({
        ...data,
        student_registration_status: 'eligible for registration',
        student_admissions_status: 'admitted',
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleClose = () => {
    dispatch(toggleAdmissionStatusModal());
    dispatch(clearStudent());
  };

  return (
    <>
      <Dialog fullWidth open={isEditingAdmissionStatus} onClose={handleClose}>
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
            <Grid item>
              <Typography variant="subtitle2">Name</Typography>
              <Typography variant="subtitle1">
                {student_first_name + ' ' + student_last_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Admission Status</Typography>
              <Typography variant="subtitle1" textTransform="capitalize">
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
                  <InputLabel id="select-interview-status">
                    Interview Status
                  </InputLabel>
                  <Select
                    id="select-interview-status"
                    value={student.student_interview_status || ''}
                    onChange={handleInput}
                    name="student_interview_status"
                    label="Interview Status"
                  >
                    <MenuItem value="passed">Passed</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                    <MenuItem value="probation">Probation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {student.student_interview_status === 'rejected' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    type="text"
                    label="Interview Notes"
                    onChange={handleInput}
                    name="student_interview_notes"
                    value={student.student_interview_notes || ''}
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditAdmissionStatusModal;
