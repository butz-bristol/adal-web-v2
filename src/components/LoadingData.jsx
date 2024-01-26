import { Box, Grid, CircularProgress } from '@mui/material';

const LoadingData = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ my: 5 }}>
      <Box sx={{ margin: '0 auto', justifyItems: 'center', alignItems: 'center' }}>
        <CircularProgress size="70px" color="secondary" />
      </Box>
    </Grid>
  );
};

export default LoadingData;
