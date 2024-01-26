import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import {
  clearSection,
  createSection,
  toggleAddSection,
  toggleEditSection,
  updateSection,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import FormSection from './Section/FormSection';

const AddSectionModal = () => {
  const dispatch = useDispatch();

  const { isAddingSection, isEditingSection, isFetchingSection, section } =
    useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingSection) {
      dispatch(updateSection({ ...section }));
      handleClose();
      return;
    }
    dispatch(createSection({ ...section }));
    handleClose();
  };

  const handleClose = () => {
    isAddingSection
      ? dispatch(toggleAddSection())
      : dispatch(toggleEditSection());
    dispatch(clearSection());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingSection || isEditingSection}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {isAddingSection ? 'Add Section' : 'Edit Section'}
      </DialogTitle>
      <DialogContent dividers>
        {isFetchingSection ? <LoadingData /> : <FormSection />}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingSection ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSectionModal;
