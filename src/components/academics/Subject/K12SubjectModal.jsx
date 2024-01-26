import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearK12Subject,
  createK12Subject,
  toggleAddK12Subject,
  toggleEditK12Subject,
  updateK12Subject,
} from 'src/features/academicFeatures/academicSlice';
import FormK12Subject from './FormK12Subject';

const K12SubjectModal = () => {
  const dispatch = useDispatch();

  const { k12Subject, isAddingK12Subject, isEditingK12Subject } = useSelector(
    (state) => state.academics
  );
  const { departments } = useSelector((state) => state.registrar);
  const departmentName = departments.find(
    (department) => department?._id === k12Subject?.department?._id
  )?.department_name;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!k12Subject.subject_name) {
      toast.error('Please enter a Subject name');
      return;
    }
    if (!k12Subject.department) {
      toast.error('Please select a department');
      return;
    }
    if (departmentName === 'Senior High School') {
      if (!k12Subject.college_track) {
        toast.error('Please select a track');
        return;
      }
      if (!k12Subject.program) {
        toast.error('Please select a program');
        return;
      }
      if (!k12Subject.semester) {
        toast.error('Please select a semester');
        return;
      }
    }
    if (!k12Subject.level) {
      toast.error('Please select a level');
      return;
    }
    if (!k12Subject.remarks) {
      toast.error('Please select a remarks');
      return;
    }
    if (isEditingK12Subject) {
      dispatch(updateK12Subject(k12Subject));
      handleClose();
      return;
    }
    dispatch(createK12Subject(k12Subject));
    handleClose();
  };

  const handleClose = () => {
    isEditingK12Subject
      ? dispatch(toggleEditK12Subject())
      : dispatch(toggleAddK12Subject());
    dispatch(clearK12Subject());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingK12Subject || isEditingK12Subject}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {isAddingK12Subject ? 'Add K-12 Subject' : 'Update K-12 Subject'}
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <FormK12Subject />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingK12Subject ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default K12SubjectModal;
