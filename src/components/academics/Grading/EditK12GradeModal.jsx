import { useTheme } from '@emotion/react';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconAlertCircle } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import {
  clearStudentReport,
  getAllGradingSchedules,
  getAllVerificationSchedules,
  saveDraftK12Grade,
  setDynamicData,
  setStudentReport,
  toggleEditGrade,
  toggleEditK12Grade,
  updateK12Grade,
} from 'src/features/academicFeatures/academicSlice';
import { intelligences, values } from 'src/utils/helperFunctions';
import GSJHSGradingTabs from './GSJHSGradingTabs';
import PSGradingTabs from './PSGradingTabs';
import SHSGradingTabs from './SHSGradingTabs';

const EditK12GradeModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [quarter, setQuarter] = useState('');
  const [alert, setAlert] = useState('');
  const PSLevel = ['Kindergarten', 'Nursery 1', 'Nursery 2'];
  const GSJHSLevel = [
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 7 - Diamond',
    'Grade 8 - Diamond',
    'Grade 9 - Diamond',
    'Grade 10 - Diamond',
  ];

  const {
    isEditingK12Grade,
    isFetchingStudentReportCard,
    student_report,
    isEditingGrade,
    userProfile,
    section,
  } = useSelector((state) => state.academics);

  const handleSubmit = (e) => {
    if (!isEditingGrade) {
      dispatch(updateK12Grade(student_report));
    } else {
      dispatch(saveDraftK12Grade(student_report));
    }
    handleClose();
    handleLockEdit();
  };

  const handleClose = (e, r) => {
    if (r && r == 'backdropClick') {
      return;
    }
    dispatch(toggleEditK12Grade());
    dispatch(clearStudentReport());
    setAlert('');
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

  useEffect(() => {
    dispatch(getAllVerificationSchedules());
    dispatch(getAllGradingSchedules());
  }, [dispatch]);

  useEffect(() => {
    // Check if student_report.intelligences is empty
    if (student_report !== null) {
      if (student_report.intelligences.length === 0) {
        dispatch(
          setStudentReport({ ...student_report, intelligences: intelligences })
        );
      }
      if (student_report.behaviors.length === 0) {
        dispatch(setStudentReport({ ...student_report, behaviors: values }));
      }
    }
  }, [dispatch, student_report?.intelligences, student_report?.behaviors]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      fullScreen={matchDownMd ? true : false}
      open={isEditingK12Grade}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {isFetchingStudentReportCard
          ? 'Edit Grade'
          : student_report
            ? student_report?.student?.student_first_name +
              ' ' +
              student_report?.student?.student_last_name
            : 'Edit Grade'}
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {isFetchingStudentReportCard ? (
          <LoadingData />
        ) : student_report !== null ? (
          <Fragment>
            {PSLevel.includes(section?.level?.year_level_name) && (
              <PSGradingTabs
                setAlert={setAlert}
                setQuarter={setQuarter}
                quarter={quarter}
              />
            )}
            {GSJHSLevel.includes(section?.level?.year_level_name) && (
              <GSJHSGradingTabs
                setAlert={setAlert}
                setQuarter={setQuarter}
                quarter={quarter}
              />
            )}
            {section?.department?.department_name === 'Senior High School' && (
              <SHSGradingTabs
                setAlert={setAlert}
                setQuarter={setQuarter}
                quarter={quarter}
              />
            )}
          </Fragment>
        ) : (
          <Grid container justifyContent="center" p={5}>
            <Typography variant="overline" fontSize={20}>
              Currently not enrolled
            </Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Grid container sx={{ justifyContent: 'flex-start' }} spacing={1}>
          {alert && (
            <Grid item>
              <Alert
                icon={<IconAlertCircle fontSize="inherit" />}
                severity="error"
              >
                {alert}
              </Alert>
            </Grid>
          )}
        </Grid>
        {student_report !== null ? (
          <Grid container sx={{ justifyContent: 'flex-end' }} spacing={1}>
            {userProfile.admin_designation_toggle && !isEditingGrade && (
              <Grid item>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => dispatch(toggleEditGrade())}
                >
                  Edit
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button variant="contained" color="warning" onClick={handleClose}>
                Close
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {!isEditingGrade ? 'Save Draft' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button variant="contained" color="warning" onClick={handleClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditK12GradeModal;
