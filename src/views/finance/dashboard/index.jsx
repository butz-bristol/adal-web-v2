import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFeeTypes,
  fetchAllOtherFees,
} from 'src/features/financeFeatures/financeSlice';
import { gridSpacing } from 'src/store/constant';
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
];

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { isFetchingUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFeeTypes());
    dispatch(fetchAllOtherFees());
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EmployeeCard isLoading={isFetchingUsers} />
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
    </Grid>
  );
};

export default Dashboard;
