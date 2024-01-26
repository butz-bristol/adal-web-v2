import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import {
  addPromissoryNote,
  clearPromissoryNote,
  toggleAddPromissoryNote,
  toggleEditPromissoryNote,
  updatePromissoryNote,
} from 'src/features/studentFeatures/studentSlice';

import { clearFile } from 'src/features/fileUploadFeatures/fileUploadSlice';

import StudentPromissoryNoteForm from './StudentForm/StudentPromissoryNoteForm';

const PromissoryNoteModal = () => {
  const dispatch = useDispatch();

  const {
    isAddingPromissoryNote,
    isEditingPromissoryNote,
    promissoryNote,
    student,
  } = useSelector((state) => state.students);
  const { promissory_note_document } = useSelector((state) => state.fileUpload);

  const handleSubmit = (e) => {
    e.preventDefault();
    isAddingPromissoryNote
      ? dispatch(
          addPromissoryNote({
            ...promissoryNote,
            student: student.student_id,
            file: promissory_note_document,
          })
        )
      : dispatch(
          updatePromissoryNote({
            ...promissoryNote,
            file: promissory_note_document,
          })
        );
    handleClose();
  };

  const handleClose = () => {
    isAddingPromissoryNote
      ? dispatch(toggleAddPromissoryNote())
      : dispatch(toggleEditPromissoryNote());
    dispatch(clearPromissoryNote());
    dispatch(clearFile());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingPromissoryNote || isEditingPromissoryNote}
      onClose={handleClose}
    >
      {promissoryNote.status === 'pending' ? (
        <>
          <DialogTitle fontSize={18}>Promissory Note</DialogTitle>
          <DialogContent>
            <Typography variant="h4" textAlign="center">
              Approval In Process. Please wait.
            </Typography>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle fontSize={18}>Promissory Note</DialogTitle>
          <DialogContent dividers>
            <StudentPromissoryNoteForm />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              {isAddingPromissoryNote ? 'Submit' : 'Update'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default PromissoryNoteModal;
