import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDepartments,
  fetchAllDesignations,
  fetchAllEvents,
  fetchAllHandbooks,
  fetchAllHolidays,
  fetchAllLeaveApplications,
  fetchAllLeaveAssigns,
  fetchAllLeaveCategories,
  fetchAllNotices,
  fetchAllOrganizationalStructureFiles,
  fetchAllPolicies,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  fetchAllAdminCompensations,
  fetchAllSpecialCompensations,
  fetchAllTeachingCompensations,
} from 'src/features/hrFeatures/employees/employeeSlice';
import {
  fetchAllCutOffDates,
  fetchAllPaygroups,
  fetchAllSalaryGradeGuides,
  fetchAllTimesheets,
} from 'src/features/hrFeatures/payroll/payrollSlice';
import {
  fetchAllEducationProfiles,
  fetchAllFamilyBackgrounds,
  fetchAllHealthBackgrounds,
  fetchAllLicenseAndCertifications,
} from 'src/features/users/userSlice';
import { gridSpacing } from 'src/store/constant';
import BarStyleChart from '../../../components/hr/charts/BarChart';
import Applicants from './Applicants';
import EmployeeCard from './EmployeesCard';
import PositionCard from './Positions';
import Resigned from './Resigned';

// =======|| DEFAULT DASHBOARD |======== //

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { userProfile, isFecthingUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    if (userProfile) {
      dispatch(fetchAllDepartments());
      dispatch(fetchAllDesignations());
      dispatch(fetchAllHandbooks());
      dispatch(fetchAllPolicies());
      dispatch(fetchAllNotices());
      dispatch(fetchAllEvents());
      dispatch(fetchAllHolidays());
      dispatch(fetchAllLeaveCategories());
      dispatch(fetchAllLeaveAssigns());
      dispatch(fetchAllLeaveApplications());
      dispatch(fetchAllCutOffDates());
      dispatch(fetchAllTimesheets());
      dispatch(fetchAllSalaryGradeGuides());
      dispatch(fetchAllHandbooks());
      dispatch(fetchAllPolicies());
      dispatch(fetchAllOrganizationalStructureFiles());
      dispatch(fetchAllAdminCompensations());
      dispatch(fetchAllTeachingCompensations());
      dispatch(fetchAllSpecialCompensations());
      dispatch(fetchAllFamilyBackgrounds());
      dispatch(fetchAllEducationProfiles());
      dispatch(fetchAllLicenseAndCertifications());
      dispatch(fetchAllHealthBackgrounds());
      dispatch(fetchAllPaygroups());
    }
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EmployeeCard isLoading={isFecthingUsers} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <PositionCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Resigned isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Applicants isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <BarStyleChart data={data} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
