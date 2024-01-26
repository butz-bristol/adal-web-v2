import { useTheme } from '@emotion/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  IconAnalyze,
  IconBriefcase,
  IconClock,
  IconList,
  IconMoneybag,
  IconReceipt,
  IconUser,
  IconUserOff,
} from '@tabler/icons-react';
import { getUserProfile } from 'src/features/academicFeatures/academicSlice';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { IconEdit } from '@tabler/icons-react';
import User1 from 'src/assets/images/users/user-logo.png';
import LoadingScreen from 'src/components/LoadingScreen';
import { TabPanel } from 'src/components/OtherComponents';
import { tabProps } from 'src/utils/helperFunctions';
import UserInformation from './UserInformation';

const UserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userProfile, isFetchingUser } = useSelector(
    (state) => state.academics
  );

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Stack>
      {isFetchingUser ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                borderTop: 10,
                borderTopColor: theme.palette.secondary.main,
              }}
            >
              <CardContent>
                <Grid
                  container
                  sx={{
                    justifyContent: { xs: 'center', md: 'space-between' },
                    [theme.breakpoints.down('md')]: { textAlign: 'center' },
                  }}
                  spacing={2}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{
                      justifyContent: { xs: 'center', lg: 'flex-start' },
                      alignItems: { md: 'center' },
                      [theme.breakpoints.down('xs')]: { textAlign: 'center' },
                    }}
                    spacing={2}
                  >
                    <Grid item xs={12} md="auto">
                      <Avatar
                        alt="User 1"
                        src={User1}
                        sx={{
                          width: { xs: 140, sm: 140, md: 140 },
                          height: { xs: 140, sm: 140, md: 140 },
                          border: '1px solid',
                          color: 'gray',
                          margin: '0 auto 0',
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      md={10}
                      justifyContent="space-between"
                    >
                      <Grid item xs={12} md="auto" p={1}>
                        <Typography variant="h2">
                          {userProfile.first_name +
                            ' ' +
                            (userProfile.middle_name ?? '') +
                            ' ' +
                            userProfile.last_name}
                        </Typography>
                        <Typography variant="subtitle1">
                          {userProfile.employee_id
                            ? userProfile.employee_id
                            : 'Unavailable'}
                        </Typography>
                        <Typography variant="subtitle2">
                          {userProfile.email
                            ? userProfile.email
                            : 'No email address'}
                        </Typography>
                        <Typography variant="subtitle2" mb={1}>
                          {userProfile.phone
                            ? userProfile.phone
                            : 'No phone number'}
                        </Typography>
                        <Grid
                          container
                          sx={{
                            justifyContent: { xs: 'center', md: 'flex-start' },
                          }}
                          spacing={2}
                        >
                          <Grid item>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              startIcon={<IconEdit />}
                            >
                              Edit Profile
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} md="auto" lg={4} spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="overline">Role: </Typography>
                          <Typography variant="overline">
                            {userProfile.role_id?.role_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="overline">
                            Department:{' '}
                          </Typography>
                          <Typography variant="overline">
                            {userProfile.admin_department?.department_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="overline">
                            Designation:{' '}
                          </Typography>
                          <Typography variant="overline">
                            {userProfile.admin_designation?.designation_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="overline">
                            Created At:{' '}
                          </Typography>
                          <Typography variant="overline">
                            {DateTime.fromISO(userProfile.createdAt).toFormat(
                              'LLLL dd, yyyy HH:mm'
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                sx={{
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
                  icon={<IconUser />}
                  iconPosition="start"
                  label="Profile"
                  {...tabProps(0)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconBriefcase />}
                  iconPosition="start"
                  label="Employment"
                  {...tabProps(1)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconMoneybag />}
                  iconPosition="start"
                  label="Salary"
                  {...tabProps(2)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconReceipt />}
                  iconPosition="start"
                  label="Payment"
                  {...tabProps(3)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconUserOff />}
                  iconPosition="start"
                  label="Leaves"
                  {...tabProps(4)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconClock />}
                  iconPosition="start"
                  label="Attendance/Timesheet"
                  {...tabProps(5)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconAnalyze />}
                  iconPosition="start"
                  label="Routine"
                  {...tabProps(6)}
                />
                <Tab
                  component={Link}
                  to="#"
                  icon={<IconList />}
                  iconPosition="start"
                  label="Assessments"
                  {...tabProps(7)}
                />
              </Tabs>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              <Stack component={Paper} p={3}>
                <UserInformation />
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
            <TabPanel value={value} index={2}></TabPanel>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default UserProfile;
