import { useTheme } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  getSection,
  setStudent,
  toggleEditStudent,
} from 'src/features/academicFeatures/academicSlice';
import { updateStudent } from 'src/features/registrarFeatures/registrarSlice';

const EditStudentModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const theme = useTheme();
  const { student, isEditingStudent } = useSelector((state) => state.academics);
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !student.student_learners_reference_no ||
      student.student_learners_reference_no === ''
    ) {
      toast.error('Please enter Learners Reference Number ');
      return;
    }
    if (!student.student_first_name || student.student_first_name === '') {
      toast.error('Please enter first name');
      return;
    }
    if (!student.student_middle_name || student.student_middle_name === '') {
      toast.error('Please enter middle name');
      return;
    }
    if (!student.student_last_name || student.student_last_name === '') {
      toast.error('Please enter last name');
      return;
    }
    dispatch(updateStudent(student));
    dispatch(getSection(id));
    handleClose();
  };
  const handleInput = (e) => {
    dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
  };
  const handleClose = () => {
    dispatch(toggleEditStudent());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={matchDownMd ? true : false}
      open={isEditingStudent}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {student?.student_first_name + ' ' + student?.student_last_name}
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Learners Reference Number"
                helperText="Please enter your Learners Reference Number"
                value={student?.student_learners_reference_no ?? ''}
                onChange={handleInput}
                name="student_learners_reference_no"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                type="text"
                label="Last name"
                onChange={handleInput}
                name="student_last_name"
                value={student?.student_last_name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                type="text"
                label="First name"
                onChange={handleInput}
                name="student_first_name"
                value={student?.student_first_name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                type="text"
                label="Middle name"
                onChange={handleInput}
                name="student_middle_name"
                value={student?.student_middle_name || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentModal;
