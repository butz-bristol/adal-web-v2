import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'src/store/constant';
import MainCard from 'src/ui-component/cards/MainCard';
import BarChart from './BarChart';

// assets
import {
  IconUserBolt,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import LinkComponent from 'src/components/LinkComponent';
import { getStudentApplicants } from 'src/features/registrarFeatures/registrarSlice';
const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { students } = useSelector((state) => state.admissions);

  const countPendingApplicants = students.filter(
    (applicant) => applicant.student_admissions_status === 'pending'
  );
  const countExaminees = students.filter(
    (applicant) => applicant.student_admissions_status === 'eligible for exam'
  );
  const countForInterview = students.filter(
    (applicant) =>
      applicant.student_admissions_status === 'eligible for interview'
  );
  const countForRegistration = students.filter(
    (applicant) =>
      applicant.student_registration_status === 'eligible for registration'
  );
  const countRegistered = students.filter(
    (applicant) => applicant.student_registration_status === 'registered'
  );
  const totalApplicants =
    countPendingApplicants.length +
    countExaminees.length +
    countForInterview.length +
    countForRegistration.length +
    countRegistered.length;

  const blockSX = {
    p: 2.5,
    borderLeft: '1px solid ',
    borderBottom: '1px solid ',
    borderLeftColor:
      theme.palette.mode === 'dark'
        ? theme.palette.dark.main
        : theme.palette.grey[200],
    borderBottomColor:
      theme.palette.mode === 'dark'
        ? theme.palette.dark.main
        : theme.palette.grey[200],
  };

  useEffect(() => {
    dispatch(getStudentApplicants());
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <BarChart
              countPendingApplicants={countPendingApplicants}
              countExaminees={countExaminees}
              countForInterview={countForInterview}
              countForRegistration={countForRegistration}
              countRegistered={countRegistered}
              totalApplicants={totalApplicants}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                '& svg': {
                  width: 50,
                  height: 50,
                  color: theme.palette.secondary.main,
                  borderRadius: '14px',
                  p: 1.25,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.background.default
                      : 'primary.light',
                },
              }}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <LinkComponent to="/admissions/applicants">
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      justifyContent={matchDownXs ? 'space-between' : 'center'}
                    >
                      <Grid item>
                        <IconUsers stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          {countPendingApplicants.length > 0
                            ? countPendingApplicants.length
                            : '0'}
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          PENDING APPLICANTS
                        </Typography>
                      </Grid>
                    </Grid>
                  </LinkComponent>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? 'space-between' : 'center'}
                  >
                    <Grid item>
                      <IconUserEdit stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        {countExaminees.length > 0
                          ? countExaminees.length
                          : '0'}
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        EXAMINEES
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? 'space-between' : 'center'}
                  >
                    <Grid item>
                      <IconUserBolt stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        {countForInterview.length > 0
                          ? countForInterview.length
                          : '0'}
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        INTERVIEWEES
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? 'space-between' : 'center'}
                  >
                    <Grid item>
                      <IconUsersGroup stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        {countForRegistration.length > 0
                          ? countForRegistration.length
                          : '0'}
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        FOR REGISTRATION
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
