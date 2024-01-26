// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'src/store/constant';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <h1>Canteen Dashboard</h1>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
