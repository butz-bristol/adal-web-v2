import { Button, Grid, TextField, Typography } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import { gridSpacing } from 'src/store/constant';

const ChangePassword = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid container item alignItems="center" spacing={gridSpacing}>
        <Grid item xs sx={{ mt: 1 }}>
          <Typography variant="h3">Change Password</Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <TextField type="password" fullWidth label="Current Password" />
        </Grid>
      </Grid>
      <Grid container item spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <TextField type="password" fullWidth label="New Password" />
        </Grid>
      </Grid>
      <Grid container item spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <TextField type="password" fullWidth label="Confirm Password" />
        </Grid>
      </Grid>
      <Grid container item spacing={gridSpacing}>
        <Grid item>
          <AnimateButton>
            <Button variant="contained">Change Password</Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
