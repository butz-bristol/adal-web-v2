import { useTheme } from '@emotion/react';

import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  IconAlertCircle,
  IconChartLine,
  IconChartRadar,
  IconFileAnalytics,
} from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TabPanel } from 'src/components/OtherComponents';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearStudentReport,
  getAllGradingSchedules,
  getAllVerificationSchedules,
  saveDraftK12Grade,
  setDynamicData,
  setStudentReport,
  toggleEditK12Grade,
  updateK12Grade,
} from 'src/features/academicFeatures/academicSlice';
import {
  calculatePeriodAverage,
  indentSubjects,
  intelligences,
  period,
  tabProps,
  values,
} from 'src/utils/helperFunctions';
import FormK12Grade from './FormK12Grade';
import FormSHSGrade from './FormSHSGrade';
import FormStudentAttendance from './FormStudentAttendance';
import FormStudentBehavior from './FormStudentBehavior';

const SHSGradingTabs = ({ setAlert, setQuarter, quarter }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [value, setValue] = useState(0);

  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [validateGrade, setValidateGrade] = useState(false);
  const [validateBehavior, setValidateBehavior] = useState(false);
  const [validateAttendance, setValidateAttendance] = useState(false);
  const {
    student_report,
    isEditingGrade,
    userProfile,
    section,
    verificationSchedules,
    gradingSchedules,
  } = useSelector((state) => state.academics);

  const isWithinVerificationSchedule = verificationSchedules.some(
    (schedule) => {
      const { start_date_time, end_date_time } = schedule;
      const currentDate = new Date();
      return (
        currentDate >= new Date(start_date_time) &&
        currentDate <= new Date(end_date_time)
      );
    }
  );

  const isWithinGradingSchedule = gradingSchedules.some((schedule) => {
    const { start_date_time, end_date_time } = schedule;
    const currentDate = new Date();
    return (
      currentDate >= new Date(start_date_time) &&
      currentDate <= new Date(end_date_time)
    );
  });

  const handleSubmit = (e) => {
    if (!isEditingGrade) {
      dispatch(updateK12Grade(student_report));
    } else {
      dispatch(saveDraftK12Grade(student_report));
    }
    handleClose();
    handleLockEdit();
  };
  const handleSubmitGrade = () => {
    function validateAttendance(student_report, quarter) {
      if (student_report.attendance) {
        if (quarter === 'first_period') {
          return (
            !student_report.attendance[0] &&
            !student_report.attendance[1] &&
            !student_report.attendance[2]
          );
        }
        if (quarter === 'second_period') {
          return !student_report.attendance[3] && !student_report.attendance[4];
        }
        if (quarter === 'third_period') {
          return (
            !student_report.attendance[5] &&
            !student_report.attendance[6] &&
            !student_report.attendance[7]
          );
        }
        if (quarter === 'fourth_period') {
          return !student_report.attendance[8] && !student_report.attendance[9];
        }
      }
      return false;
    }
    const checkGrades = student_report.subjects.map((item, index) => {
      return item[quarter];
    });
    const checkBehaviors = student_report.behaviors.map((item, index) => {
      return item[quarter];
    });

    let errorCheck1 =
      checkGrades.includes(undefined) ||
      checkGrades.includes(null) ||
      checkGrades.includes('');
    let errorCheck3 =
      checkBehaviors.includes(undefined) ||
      checkBehaviors.includes(null) ||
      checkBehaviors.includes('');
    let errorCheck5 = validateAttendance(student_report, quarter);

    setValidateGrade(errorCheck1);
    setValidateBehavior(errorCheck3);
    setValidateAttendance(validateAttendance(student_report, quarter));

    if (errorCheck1 || errorCheck3 || errorCheck5) {
      setAlert('Please complete your report for specific period.');
    } else {
      setAlert('');
      dispatch(
        updateK12Grade({
          ...student_report,
          [quarter]: {
            status: 'Submitted',
            average: calculatePeriodAverage(
              student_report.subjects,
              quarter,
              indentSubjects
            ).average,
          },
        })
      );
    }
  };

  const handleVerifyGrade = () => {
    dispatch(
      updateK12Grade({
        ...student_report,
        [quarter]: {
          status: 'Verified',
          average: calculatePeriodAverage(
            student_report.subjects,
            quarter,
            indentSubjects
          ).average,
        },
      })
    );
  };

  const handleClose = (e, r) => {
    if (r && r == 'backdropClick') {
      return;
    }
    dispatch(toggleEditK12Grade());
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
    <Fragment>
      <ConfirmationModal
        isOpen={showSubmissionModal}
        title={'Confirm Action'}
        message={
          'Please check if all input for specific grading period has been added. Contact Academics Admin for change requests and other concerns.'
        }
        onConfirm={() => {
          handleSubmitGrade();
          setShowSubmissionModal(false);
        }}
        onCancel={() => {
          setShowSubmissionModal(false);
        }}
      />
      <ConfirmationModal
        isOpen={showVerificationModal}
        title={'Confirm Action'}
        message={
          'Please check if all input for specific grading period are correct. Contact Academics Admin for change requests and other concerns.'
        }
        onConfirm={() => {
          handleVerifyGrade();
          setShowVerificationModal(false);
        }}
        onCancel={() => {
          setShowVerificationModal(false);
        }}
      />
      <Grid container spacing={2} mb={2}>
        {period.map((periodItem, periodIndex) => (
          <Grid item xs={3} key={periodIndex}>
            <Box
              sx={{
                '& > :not(style)': {
                  m: 1,
                  width: 100,
                  height: 100,
                },
              }}
              align="center"
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography variant="h1">
                      {
                        calculatePeriodAverage(
                          student_report?.subjects,
                          periodItem.value,
                          indentSubjects
                        ).average
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">{periodItem.label}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        ))}

        {period.map((periodItem, periodIndex) => {
          return !student_report?.[periodItem.value]?.status ? (
            section?.adviser?._id === userProfile?._id ||
            userProfile.admin_designation_toggle ? (
              <Grid item xs={3} key={periodIndex} align="center">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setQuarter(periodItem.value);
                    setShowSubmissionModal(true);
                  }}
                  disabled={!isWithinGradingSchedule}
                >
                  Submit
                </Button>
              </Grid>
            ) : (
              userProfile?.isVerifier && (
                <Grid item xs={3} key={periodIndex} align="center">
                  <Chip size="small" color="warning" label="Pending" />
                </Grid>
              )
            )
          ) : (
            <Fragment key={periodIndex}>
              {userProfile?.isVerifier ||
              userProfile.admin_designation_toggle ? (
                student_report?.[periodItem.value]?.status === 'Verified' ? (
                  <Grid item xs={3} key={periodIndex} align="center">
                    <Chip size="small" color="success" label="Verified" />
                  </Grid>
                ) : (
                  <Grid item xs={3} key={periodIndex} align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setQuarter(periodItem.value);
                        setShowVerificationModal(true);
                      }}
                      disabled={
                        !isWithinVerificationSchedule ||
                        !userProfile.levels.includes(section.level._id)
                      }
                    >
                      Verify
                    </Button>
                  </Grid>
                )
              ) : (
                <Grid item key={periodIndex} align="center">
                  {student_report?.[periodItem.value]?.status}
                </Grid>
              )}
            </Fragment>
          );
        })}
      </Grid>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(e, newValue) => setValue(newValue)}
        variant={matchDownMd ? 'scrollable' : 'fullWidth'}
        sx={{
          bgcolor: 'whitesmoke',
          '& a': {
            minHeight: 'auto',
            minWidth: 10,
            py: 1.5,
            px: 1,
            mr: 2.25,
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& a.Mui-selected': {
            color: theme.palette.secondary.main,
          },
          '& .MuiTabs-indicator': {
            bottom: 2,
          },
          '& a > svg': {
            marginBottom: '0px !important',
            mr: 1.25,
          },
        }}
      >
        <Tab
          component={Link}
          to="#"
          icon={
            validateGrade ? (
              <Tooltip
                open={validateGrade}
                title="Incomplete"
                placement="top"
                arrow
              >
                <IconAlertCircle />
              </Tooltip>
            ) : (
              <IconChartLine />
            )
          }
          label="Grades"
          {...tabProps(0)}
        />
        <Tab
          component={Link}
          to="#"
          icon={<IconChartHistogram />}
          label="Multiple Intelligence"
          {...tabProps(1)}
        />
        <Tab
          component={Link}
          to="#"
          icon={
            validateBehavior ? (
              <Tooltip
                open={validateBehavior}
                title="Incomplete"
                placement="top"
                arrow
              >
                <IconAlertCircle />
              </Tooltip>
            ) : (
              <IconChartRadar />
            )
          }
          label="Student Behavior"
          {...tabProps(2)}
        />
        <Tab
          component={Link}
          to="#"
          icon={
            validateAttendance ? (
              <Tooltip
                open={validateAttendance}
                title="Incomplete"
                placement="top"
                arrow
              >
                <IconAlertCircle />
              </Tooltip>
            ) : (
              <IconFileAnalytics />
            )
          }
          label="Attendance"
          {...tabProps(4)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {student_report?.department?.department_name !==
        'Senior High School' ? (
          <form onSubmit={handleSubmit}>
            <FormK12Grade />
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormSHSGrade />
          </form>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <form onSubmit={handleSubmit}>
          <FormStudentBehavior />
        </form>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <form onSubmit={handleSubmit}>
          <FormStudentAttendance />
        </form>
      </TabPanel>
    </Fragment>
  );
};

export default SHSGradingTabs;
