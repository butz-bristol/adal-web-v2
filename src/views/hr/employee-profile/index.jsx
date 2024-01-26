import { useEffect, useState } from 'react';

import { AccountCircle, Email, Person, Phone } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* project imports */
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TabPanel } from 'src/components/OtherComponents';
import {
  fetchAllDepartments,
  fetchAllDesignations,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  fetchAllAdminCompensations,
  fetchAllAttendances,
  fetchAllBreaks,
  fetchAllSpecialCompensations,
  fetchAllTeachingCompensations,
} from 'src/features/hrFeatures/employees/employeeSlice';
import { fetchAllCutOffDates } from 'src/features/hrFeatures/payroll/payrollSlice';
import {
  fetchAllEducationProfiles,
  fetchAllFamilyBackgrounds,
  fetchAllHealthBackgrounds,
  fetchAllLicenseAndCertifications,
  fetchUser,
  fetchUsers,
} from 'src/features/users/userSlice';
import { tabProps } from 'src/utils/helperFunctions';
import Assessments from './Assessments';
import Attendance from './Attendance';
import Employment from './Employment';
import Leaves from './Leaves';
import Payment from './Payment';
import Profile from './Profile';
import Routine from './Routine';
import Salary from './Salary';

const AccountSettings = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { employee_profile, isFetchingUser } = useSelector(
    (state) => state.users
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllFamilyBackgrounds());
    dispatch(fetchAllEducationProfiles());
    dispatch(fetchAllLicenseAndCertifications());
    dispatch(fetchAllHealthBackgrounds());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
    dispatch(fetchAllAdminCompensations());
    dispatch(fetchAllTeachingCompensations());
    dispatch(fetchAllSpecialCompensations());
    dispatch(fetchAllAttendances());
    dispatch(fetchAllBreaks());
    dispatch(fetchAllCutOffDates());
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        {isFetchingUser ? (
          <Grid
            container
            width="100%"
            justifyItems="center"
            alignItems="center"
            minHeight="200px"
          >
            <Box
              sx={{
                margin: '0 auto',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress size="70px" />
            </Box>
          </Grid>
        ) : (
          <Grid container columnSpacing={2}>
            <Grid item lg={3} xs={12} sx={{ mb: 2 }}>
              <Card
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.primary.light,
                  p: 0,
                }}
              >
                <Divider />

                <CardContent sx={{ p: 1 }}>
                  <Grid
                    container
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    sx={{ p: 2 }}
                  >
                    <Grid item>
                      <AccountCircle sx={{ fontSize: '80px' }} />
                      <Typography variant="h2" textTransform="capitalize">
                        {employee_profile.first_name +
                          ' ' +
                          employee_profile.last_name}
                      </Typography>
                      <Typography variant="body1" textTransform="capitalize">
                        {employee_profile.user_role
                          ? employee_profile?.user_role[0]?.role_name
                          : 'N/A'}
                      </Typography>
                      <Typography variant="body1" textTransform="capitalize">
                        ID: {employee_profile.employee_id || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <List>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Person />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Username"
                        secondary={employee_profile.username}
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <WcIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Gender"
                        secondary={employee_profile.gender}
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Email />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Email"
                        secondary={employee_profile.email}
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Phone />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Phone"
                        secondary={employee_profile.phone}
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <CakeIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Birthday"
                        secondary={
                          employee_profile &&
                          DateTime.fromISO(
                            employee_profile.birth_date
                          ).toFormat('dd LLL yyyy')
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={9} xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                  >
                    <Tab label="Profile" {...tabProps(0)} />
                    <Tab label="Employment" {...tabProps(1)} />
                    <Tab label="Salary" {...tabProps(2)} />
                    <Tab label="Payment" {...tabProps(3)} />
                    <Tab label="Leaves" {...tabProps(4)} />
                    <Tab label="Attendance/Timesheet" {...tabProps(5)} />
                    <Tab label="Routine" {...tabProps(6)} />
                    <Tab label="Assessments" {...tabProps(7)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Employment />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Salary />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Payment />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Leaves />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <Attendance />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <Routine />
                </TabPanel>
                <TabPanel value={value} index={7}>
                  <Assessments />
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
