import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import {
  clearStudentReport,
  saveDraftCollegeGrade,
  setDynamicData,
  toggleEditCollegeGrade,
  toggleEditGrade,
  updateCollegeGrade,
} from 'src/features/academicFeatures/academicSlice';
import FormCollegeGrade from './FormCollegeGrade';

const EditCollegeGradeModal = () => {
  const dispatch = useDispatch();

  const {
    isEditingCollegeGrade,
    isFetchingStudentReportCard,
    student_report,
    isEditingGrade,
    userProfile,
  } = useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditingGrade) {
      dispatch(updateCollegeGrade(student_report));
    } else {
      dispatch(saveDraftCollegeGrade(student_report));
    }
    handleClose();
    handleLockEdit();
  };

  const handleClose = (e, r) => {
    if (r && r == 'backdropClick') {
      return;
    }
    dispatch(toggleEditCollegeGrade());
    dispatch(clearStudentReport());
    handleLockEdit();
  };

  const handleLockEdit = () => {
    if (isEditingGrade) {
      dispatch(
        setDynamicData({
          isEditingGrade: false,
        })
      );
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isEditingCollegeGrade}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {isFetchingStudentReportCard ? (
          'Edit Grade'
        ) : student_report ? (
          <>
            <Typography variant="h4">
              {student_report?.student?.student_first_name +
                ' ' +
                student_report?.student?.student_last_name}
            </Typography>
            <Typography variant="caption">
              {student_report?.student?.student_number}
            </Typography>
          </>
        ) : (
          'Edit Grade'
        )}
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {isFetchingStudentReportCard ? (
          <LoadingData />
        ) : student_report !== null ? (
          <Fragment>
            <form onSubmit={handleSubmit}>
              <FormCollegeGrade />
            </form>
          </Fragment>
        ) : (
          <Grid container justifyContent="center" p={5}>
            <Typography variant="overline" fontSize={20}>
              Currently not enrolled
            </Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {student_report !== null ? (
          <Fragment>
            {userProfile.admin_designation_toggle && !isEditingGrade && (
              <Button
                variant="contained"
                color="info"
                onClick={() => dispatch(toggleEditGrade())}
              >
                Edit
              </Button>
            )}
            <Button variant="contained" color="warning" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              {!isEditingGrade ? 'Save Draft' : 'Update'}
            </Button>
          </Fragment>
        ) : (
          <Button variant="contained" color="warning" onClick={handleClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditCollegeGradeModal;
