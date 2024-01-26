import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from 'src/features/cashierFeatures/cashierSlice';

const Dashboard = () => {
  const { userProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile.isCashierAdmin) {
      dispatch(fetchStudents());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <Grid></Grid>;
};

export default Dashboard;
