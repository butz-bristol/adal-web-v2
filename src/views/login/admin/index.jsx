import { Link } from 'react-router-dom';

// material-ui
import {
  Alert,
  AlertTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import Logo from 'src/assets/images/logo.png';
import AuthCardWrapper from './AuthCardWrapper';
import AuthWrapper1 from './AuthWrapper';
import FormLogin from './FormLogin';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: 'calc(100vh - 68px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Grid container alignItems="center" justifyContent="center">
                <Alert severity="error">
                  <AlertTitle variant="title1">New User?</AlertTitle>
                  <Typography variant="title1">
                    Please contact system administrator for your account.
                  </Typography>
                </Alert>
              </Grid>
              <AuthCardWrapper>
                <Grid container columnSpacing={{ lg: 2 }}>
                  <Grid item lg={6} className="bg-landing"></Grid>
                  <Grid item lg={6}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ p: 4 }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item sx={{ mb: 2 }}>
                        <img src={Logo} alt="Berry" width="100" />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          container
                          direction={matchDownSM ? 'column-reverse' : 'row'}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item>
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              spacing={1}
                            >
                              <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                              >
                                Hi, Welcome Back
                              </Typography>
                              <Typography
                                variant="caption"
                                fontSize="16px"
                                textAlign={matchDownSM ? 'center' : 'inherit'}
                              >
                                Enter your credentials to continue
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <FormLogin />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          direction="column"
                          alignItems="center"
                          xs={12}
                        >
                          <Typography
                            sx={{ textDecoration: 'none' }}
                            align="center"
                          >
                            Online Admissions?{' '}
                            <Link to="/admission-form">Sign up</Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;