import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingData from 'src/components/LoadingData';
import {
  clearTesdaCourse,
  createTesdaCourse,
  toggleAddTesdaCourse,
  toggleEditTesdaCourse,
  updateTesdaCourse,
} from 'src/features/academicFeatures/academicSlice';
import FormTesdaCourse from './FormTesdaCourse';

const AddTesdaCourseModal = () => {
  const dispatch = useDispatch();

  const {
    tesdaCourse,
    isAddingTesdaCourse,
    isEditingTesdaCourse,
    isFetchingTesdaCourse,
  } = useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tesdaCourse.college_track) {
      toast.error('Please select a College or Track');
      return;
    }
    if (!tesdaCourse.program) {
      toast.error('Please select a program');
      return;
    }
    if (!tesdaCourse.semester) {
      toast.error('Please select a semester');
      return;
    }
    if (!tesdaCourse.year_level) {
      toast.error('Please select a level');
      return;
    }
    if (!tesdaCourse.course_name) {
      toast.error('Please enter a Course Name');
      return;
    }
    if (!tesdaCourse.course_type) {
      toast.error('Please enter a Course Type');
      return;
    }
    if (!tesdaCourse.course_code) {
      toast.error('Please enter a Course Code');
      return;
    }
    if (!tesdaCourse.course_total_hours) {
      toast.error('Please enter a Total Hours');
      return;
    }
    if (!tesdaCourse.remarks) {
      toast.error('Please select a remarks');
      return;
    }
    if (isEditingTesdaCourse) {
      dispatch(updateTesdaCourse(tesdaCourse));
      handleClose();
      return;
    }
    dispatch(createTesdaCourse(tesdaCourse));
    handleClose();
  };

  const handleClose = () => {
    isEditingTesdaCourse
      ? dispatch(toggleEditTesdaCourse())
      : dispatch(toggleAddTesdaCourse());
    dispatch(clearTesdaCourse());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingTesdaCourse || isEditingTesdaCourse}
      onClose={handleClose}
    >
      {isFetchingTesdaCourse ? (
        <LoadingData />
      ) : (
        <Fragment>
          <DialogTitle fontSize={18}>
            {isAddingTesdaCourse
              ? 'Add Course'
              : tesdaCourse?.course_name
                ? tesdaCourse?.course_name
                : 'Update Course'}
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <FormTesdaCourse />
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
              {isAddingTesdaCourse ? 'Submit' : 'Update'}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

export default AddTesdaCourseModal;
