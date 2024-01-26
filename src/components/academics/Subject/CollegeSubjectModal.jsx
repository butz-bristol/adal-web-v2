import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Fragment } from 'react';
import LoadingData from 'src/components/LoadingData';
import {
  addCollegeSubject,
  clearCollegeSubject,
  toggleAddCollegeSubject,
  toggleEditCollegeSubject,
  updateCollegeSubject,
} from 'src/features/academicFeatures/academicSlice';
import FormCollegeSubject from './FormCollegeSubject';

const CollegeSubjectModal = () => {
  const dispatch = useDispatch();

  const {
    collegeSubject,
    isAddingCollegeSubject,
    isEditingCollegeSubject,
    isFetchingCollegeSubject,
  } = useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collegeSubject.college_track) {
      toast.error('Please select a College or Track');
      return;
    }
    if (!collegeSubject.program) {
      toast.error('Please select a program');
      return;
    }
    if (!collegeSubject.semester) {
      toast.error('Please select a semester');
      return;
    }
    if (!collegeSubject.year_level) {
      toast.error('Please select a level');
      return;
    }
    if (!collegeSubject.course_name) {
      toast.error('Please enter a Course Name');
      return;
    }
    if (!collegeSubject.course_type) {
      toast.error('Please enter a Course Type');
      return;
    }
    if (!collegeSubject.course_code) {
      toast.error('Please enter a Course Code');
      return;
    }
    if (!collegeSubject.remarks) {
      toast.error('Please select a remarks');
      return;
    }
    if (isEditingCollegeSubject) {
      dispatch(updateCollegeSubject(collegeSubject));
      handleClose();
      return;
    }
    dispatch(addCollegeSubject(collegeSubject));
    handleClose();
  };

  const handleClose = () => {
    isEditingCollegeSubject
      ? dispatch(toggleEditCollegeSubject())
      : dispatch(toggleAddCollegeSubject());
    dispatch(clearCollegeSubject());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isAddingCollegeSubject || isEditingCollegeSubject}
      onClose={handleClose}
    >
      {isFetchingCollegeSubject ? (
        <LoadingData />
      ) : (
        <Fragment>
          <DialogTitle fontSize={18}>
            {isAddingCollegeSubject
              ? 'Add College Subject'
              : 'Update College Subject'}
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <FormCollegeSubject />
            </form>
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
              {isAddingCollegeSubject ? 'Submit' : 'Update'}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

export default CollegeSubjectModal;
