import { Box, CircularProgress, Grid, Modal, Typography } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Modal open={true}>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <CircularProgress size="70px" color="secondary" />
        <Box
          sx={{
            top: 120,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography color="white">Loading... Please wait</Typography>
        </Box>
      </Grid>
    </Modal>
  );
};

export default LoadingScreen;
