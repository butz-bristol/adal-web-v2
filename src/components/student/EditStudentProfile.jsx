import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import {
  clearStudent,
  toggleStudentData,
  updateStudent,
} from 'src/features/studentFeatures/studentSlice';

import StudentFamilyBackground from 'src/components/student/StudentForm/StudentFamilyBackground';
import StudentPersonalInformation from 'src/components/student/StudentForm/StudentPersonalInformation';

const EditStudentProfile = () => {
  const dispatch = useDispatch();
  const { studentData, isEditingStudentProfile, studentProfile } = useSelector(
    (state) => state.students
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ ...studentData }));
    handleClose();
  };

  const handleClose = () => {
    dispatch(toggleStudentData());
    dispatch(clearStudent());
  };

  return (
    <Dialog fullWidth open={isEditingStudentProfile} onClose={handleClose}>
      <DialogTitle fontSize={18}>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <StudentPersonalInformation />
        <StudentFamilyBackground />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentProfile;
