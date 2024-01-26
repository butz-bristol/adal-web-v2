import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import {
  clearStudentRecord,
  toggleEditStudentRecord,
} from 'src/features/academicFeatures/academicSlice';

import K12GradingSystem from './K12GradingSystem';

const EditStudentRecordModal = () => {
  const dispatch = useDispatch();

  const { isEditingStudentRecord } = useSelector((state) => state.academics);

  const handleClose = () => {
    dispatch(toggleEditStudentRecord());
    dispatch(clearStudentRecord());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={isEditingStudentRecord}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>View Record</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <K12GradingSystem />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentRecordModal;
