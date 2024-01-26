import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import {
  clearStudent,
  toggleStudentProfile,
  updateStudent,
} from 'src/features/admissionsFeatures/admissionsSlice';
import StudentAcademicInformation from './StudentForm/StudentAcademicInformation';
import StudentFamilyBackground from './StudentForm/StudentFamilyBackground';
import StudentPersonalInformation from './StudentForm/StudentPersonalInformation';

const EditStudentProfile = () => {
  const dispatch = useDispatch();
  const user_role =
    useSelector((state) => state.users?.user?.user_role) ?? null;
  const { student, isEditingStudentProfile } = useSelector(
    (state) => state.admissions
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      student.student_first_name === '' &&
      student.student_last_name === '' &&
      student.student_permanent_address === '' &&
      student.student_gender === '' &&
      student.student_birthdate === '' &&
      student.student_contact_number === '' &&
      student.student_personal_email === '' &&
      student.student_civil_status === '' &&
      student.student_nationality === ''
    ) {
      toast.error('Please fill your details...');
      return;
    }
    dispatch(updateStudent({ ...student }));
    handleClose();
  };

  const handleClose = () => {
    dispatch(toggleStudentProfile());
    dispatch(clearStudent());
  };

  return (
    <Dialog fullWidth open={isEditingStudentProfile} onClose={handleClose}>
      <DialogTitle fontSize={18}>Edit Profile</DialogTitle>
      <DialogContent dividers>
        {(user_role === 'registrar admin' ||
          user_role === 'admissions admin') && <StudentAcademicInformation />}
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
