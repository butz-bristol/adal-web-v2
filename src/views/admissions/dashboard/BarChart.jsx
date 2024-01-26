import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import MainCard from 'src/ui-component/cards/MainCard';

import {
  IconUserBolt,
  IconUserCheck,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';

const Analytics = ({
  countPendingApplicants,
  countExaminees,
  countForInterview,
  countForRegistration,
  countRegistered,
  totalApplicants,
}) => {
  const theme = useTheme();

  const dataPendingApplicants = countPendingApplicants.reduce(
    (accumulator, applicant) => {
      const date = new Date(applicant.createdAt);
      const yyyy = date.toISOString().substring(0, 4);
      const mm = date.toISOString().substring(5, 7);
      const dd = date.toISOString().substring(8, 10);
      const formattedDateString = `${yyyy}-${mm}-${dd}`;
      const dateRegistered = formattedDateString;
      if (!accumulator[dateRegistered]) {
        accumulator[dateRegistered] = 1;
      } else {
        accumulator[dateRegistered] += 1;
      }
      return accumulator;
    },
    {}
  );

  const dataExaminees = countExaminees.reduce((accumulator, applicant) => {
    const date = new Date(applicant.createdAt);
    const yyyy = date.toISOString().substring(0, 4);
    const mm = date.toISOString().substring(5, 7);
    const dd = date.toISOString().substring(8, 10);
    const formattedDateString = `${yyyy}-${mm}-${dd}`;
    const dateRegistered = formattedDateString;
    if (!accumulator[dateRegistered]) {
      accumulator[dateRegistered] = 1;
    } else {
      accumulator[dateRegistered] += 1;
    }
    return accumulator;
  }, {});

  const dataInterviewees = countForInterview.reduce(
    (accumulator, applicant) => {
      const date = new Date(applicant.createdAt);
      const yyyy = date.toISOString().substring(0, 4);
      const mm = date.toISOString().substring(5, 7);
      const dd = date.toISOString().substring(8, 10);
      const formattedDateString = `${yyyy}-${mm}-${dd}`;
      const dateRegistered = formattedDateString;
      if (!accumulator[dateRegistered]) {
        accumulator[dateRegistered] = 1;
      } else {
        accumulator[dateRegistered] += 1;
      }
      return accumulator;
    },
    {}
  );

  const dataForRegistration = countForRegistration.reduce(
    (accumulator, applicant) => {
      const date = new Date(applicant.createdAt);
      const yyyy = date.toISOString().substring(0, 4);
      const mm = date.toISOString().substring(5, 7);
      const dd = date.toISOString().substring(8, 10);
      const formattedDateString = `${yyyy}-${mm}-${dd}`;
      const dateRegistered = formattedDateString;
      if (!accumulator[dateRegistered]) {
        accumulator[dateRegistered] = 1;
      } else {
        accumulator[dateRegistered] += 1;
      }
      return accumulator;
    },
    {}
  );

  const dataRegisteredApplicants = countRegistered.reduce(
    (accumulator, applicant) => {
      const date = new Date(applicant.createdAt);
      const yyyy = date.toISOString().substring(0, 4);
      const mm = date.toISOString().substring(5, 7);
      const dd = date.toISOString().substring(8, 10);
      const formattedDateString = `${yyyy}-${mm}-${dd}`;
      const dateRegistered = formattedDateString;
      if (!accumulator[dateRegistered]) {
        accumulator[dateRegistered] = 1;
      } else {
        accumulator[dateRegistered] += 1;
      }
      return accumulator;
    },
    {}
  );

  const pending = Object.entries(dataPendingApplicants).map(([x, y]) => ({
    x,
    y,
  }));
  const examinees = Object.entries(dataExaminees).map(([x, y]) => ({ x, y }));
  const interviewees = Object.entries(dataInterviewees).map(([x, y]) => ({
    x,
    y,
  }));
  const registration = Object.entries(dataForRegistration).map(([x, y]) => ({
    x,
    y,
  }));
  const registered = Object.entries(dataRegisteredApplicants).map(([x, y]) => ({
    x,
    y,
  }));

  const chartData = {
    height: 200,
    type: 'area',
    options: {
      chart: {
        id: 'applicants-area-chart',
        toolbar: {
          show: true,
        },
      },
      legend: {
        show: true,
      },
      xaxis: {
        type: 'datetime',
      },
    },
    series: [
      {
        name: 'Pending',
        data: pending,
      },
      {
        name: 'Examinees',
        data: examinees,
      },
      {
        name: 'Interviewees',
        data: interviewees,
      },
      {
        name: 'For Registration',
        data: registration,
      },
      {
        name: 'Registered',
        data: registered,
      },
    ],
  };

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h3">Applicant Analytics</Typography>
            </Grid>
            <Grid item xs zeroMinWidth />
            <Grid item>Total Registered Applicants:</Grid>
            <Grid item>
              <Typography variant="h3">
                {countRegistered.length > 0 ? countRegistered.length : '0'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ mt: -2.5, fontWeight: 400 }}
              color="inherit"
              variant="h5"
            >
              Number of Applicants this Year
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item>
              <Tooltip title="Pending Applicants">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.secondary.main,
                        borderRadius: '12px',
                        padding: 1,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : theme.palette.secondary.light,
                      }}
                    >
                      <IconUsers stroke={1.5} />
                    </Typography>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">
                      {(
                        (countPendingApplicants.length / totalApplicants) *
                        100
                      ).toFixed(2) + '%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Examinees">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.primary.main,
                        borderRadius: '12px',
                        padding: 1,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : theme.palette.primary.light,
                      }}
                    >
                      <IconUserEdit stroke={1.5} />
                    </Typography>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">
                      {(
                        (countExaminees.length / totalApplicants) *
                        100
                      ).toFixed(2) + '%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Interviewees">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.error.main,
                        borderRadius: '12px',
                        padding: 1,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : '#ffe9e9',
                      }}
                    >
                      <IconUserBolt stroke={2} />
                    </Typography>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">
                      {(
                        (countForInterview.length / totalApplicants) *
                        100
                      ).toFixed(2) + '%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="For Registration">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.error.main,
                        borderRadius: '12px',
                        padding: 1,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : '#ffe9e9',
                      }}
                    >
                      <IconUsersGroup stroke={2} />
                    </Typography>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">
                      {(
                        (countForRegistration.length / totalApplicants) *
                        100
                      ).toFixed(2) + '%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Registered Applicants">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.success.main,
                        borderRadius: '12px',
                        padding: 1,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : theme.palette.primary.light,
                      }}
                    >
                      <IconUserCheck stroke={2} />
                    </Typography>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">
                      {(
                        (countRegistered.length / totalApplicants) *
                        100
                      ).toFixed(2) + '%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Tooltip>
            </Grid>
            <Grid item xs zeroMinWidth />
          </Grid>
        </Grid>
      </Box>
      <Chart {...chartData} />
    </MainCard>
  );
};
export default Analytics;
