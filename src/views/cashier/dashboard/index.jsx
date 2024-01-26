import { useEffect } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import { fetchAllPayments } from 'src/features/cashierFeatures/cashierSlice';
import { gridSpacing } from 'src/store/constant';
import Enrolled from './EnrolledStudents';
import NewStudents from './NewStudents';
import TotalDailyTransaction from './TotalDailyTransaction';
import TotalMonthlyTransaction from './TotalMonthlyTransaction';

const Dashboard = () => {
  const { isFetchingPayments } = useSelector((state) => state.cashier);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  if (isFetchingPayments) return <LoadingScreen />;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalDailyTransaction isLoading={isFetchingPayments} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalMonthlyTransaction isLoading={isFetchingPayments} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Enrolled />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <NewStudents />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
