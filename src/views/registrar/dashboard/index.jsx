import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IconUserBolt,
  IconUserCheck,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import MainCard from 'src/ui-component/cards/MainCard';
import {
  countPendingStudents,
  countRegisteredStudents,
  k12Departments,
} from 'src/utils/helperFunctions';

import LinkComponent from 'src/components/LinkComponent';
import { getStudents } from 'src/features/registrarFeatures/registrarSlice';
import BarChart from './BarChart';
import PieChart from './PieChart';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const { students } = useSelector((state) => state.registrar);

  const totalStudents =
    countPendingStudents?.length + countRegisteredStudents(students)?.length;

  const countCollegeStudents = students?.filter(
    (student) =>
      student.student_registration_status === 'registered' &&
      student.student_admissions_status === 'admitted' &&
      student.student_department?.department_name === 'College'
  );
  const countTESDAStudents = students?.filter(
    (student) =>
      student.student_registration_status === 'registered' &&
      student.student_admissions_status === 'admitted' &&
      student.student_department?.department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
  );
  const countK12Students = students?.filter(
    (student) =>
      student.student_registration_status === 'registered' &&
      student.student_admissions_status === 'admitted' &&
      k12Departments.includes(student.student_department?.department_name)
  );

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
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8} md={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BarChart
              countPendingStudents={countPendingStudents(students)}
              countRegistered={countRegisteredStudents(students)}
              totalStudents={totalStudents}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} md={6}>
        <Grid container spacing={3}>
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
                  <LinkComponent to="/registrar/pre-registrations">
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
                          {countPendingStudents(students).length > 0
                            ? countPendingStudents(students).length
                            : '0'}
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          PENDING
                        </Typography>
                      </Grid>
                    </Grid>
                  </LinkComponent>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <LinkComponent to="/registrar/students">
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      justifyContent={matchDownXs ? 'space-between' : 'center'}
                    >
                      <Grid item>
                        <IconUserCheck stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          {countRegisteredStudents(students).length > 0
                            ? countRegisteredStudents(students).length
                            : '0'}
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          REGISTERED
                        </Typography>
                      </Grid>
                    </Grid>
                  </LinkComponent>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <>
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
                          0
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          ???
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
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
                        0
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        ???
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PieChart
            countK12Students={countK12Students}
            countTESDAStudents={countTESDAStudents}
            countCollegeStudents={countCollegeStudents}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Index;
