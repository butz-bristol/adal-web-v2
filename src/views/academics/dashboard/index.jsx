import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'src/store/constant';
import Applicants from './Applicants';
import EmployeeCard from './EmployeesCard';
import PositionCard from './Positions';
import Resigned from './Resigned';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { isFetchingUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

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
