import { Link } from 'react-router-dom';

// material-ui
import {
  Divider,
  Grid,
  List,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import Logo from 'src/ui-component/Logo';
import BackgroundPattern1 from 'src/ui-component/cards/BackgroundPattern1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './AuthLogin';
import AuthWrapper1 from './AuthWrapper1';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid
          item
          container
          justifyContent="center"
          md={6}
          lg={7}
          sx={{ my: 3 }}
        >
          <AuthCardWrapper>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid
                  container
                  direction={matchDownSM ? 'column-reverse' : 'row'}
                  alignItems={matchDownSM ? 'center' : 'inherit'}
                  justifyContent={matchDownSM ? 'center' : 'space-between'}
                >
                  <Grid item>
                    <Stack
                      justifyContent={matchDownSM ? 'center' : 'flex-start'}
                      textAlign={matchDownSM ? 'center' : 'inherit'}
                    >
                      <Typography
                        color={theme.palette.secondary.main}
                        gutterBottom
                        variant={matchDownSM ? 'h3' : 'h2'}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography color="textPrimary" gutterBottom variant="h4">
                        Applicants
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin loginProp={1} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item alignItems="flex-start" xs={6}>
                    <Typography
                      component={Link}
                      to="/enroll"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none' }}
                    >
                      Enroll Now!
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-end" xs={6}>
                    <Typography
                      component={Link}
                      to="/"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none' }}
                    >
                      Forgot your reference no?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
        <Grid
          item
          md={6}
          lg={5}
          sx={{
            position: 'relative',
            alignSelf: 'stretch',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <BackgroundPattern1>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} p={2}>
                <Stack mb={2}>
                  <Typography variant="h3">
                    Online Enrollment for Incoming Freshmen, Transferee, New
                    Graduate School
                  </Typography>
                  <Typography variant="body1">
                    (Pre-School & Grade School, Junior High School, Senior High
                    School, Collge, or TESDA)
                  </Typography>
                </Stack>
                <Stack mb={2}>
                  <Typography variant="body1">
                    What does the future hold? Discover how you can start your
                    journey at BEC! <br />
                    <br />
                    ADAL is committed in providing assistance to all those who
                    yearn to dream big and discover the realities and
                    possibilities of their future.
                    <br />
                    As you prepare your application to become part of our
                    learning community, we would like to know more about you.
                    <br />
                    Tell us your story - how you would like to seize your
                    academic opportunities! <br />
                    We want to hear your voice because at BEC, we promote a
                    Beacon's individuality and strongly encourage professional
                    growth.
                    <br />
                    <br />
                    To apply, here are the admission checklist you have to do.
                  </Typography>
                </Stack>
                <Stack mb={2}>
                  <Typography variant="h3">
                    Steps for On-site Application
                  </Typography>
                  <List>
                    <ListItemText>
                      Acquire "Routing Slip" at the Guard Station near the
                      Entrance Gate
                    </ListItemText>
                    <ListItemText>
                      Request for Admission Form at the Guidance and Counseling
                      Office
                    </ListItemText>
                    <ListItemText>
                      Next stage will be the Eveluation of Credentials, to be
                      processed at the Registrar's Office
                    </ListItemText>
                    <ListItemText>
                      It will be followed by the Assessment Page
                    </ListItemText>
                    <ListItemText>
                      Once done with the previos evaluation and assessment, you
                      may now process payment at the Cashier's Office
                    </ListItemText>
                  </List>
                </Stack>
                <Stack mb={2}>
                  <Typography variant="h3">
                    Steps for Online Application
                  </Typography>
                  <List>
                    <ListItemText>
                      Incoming Freshment and Transferee Students may sign-up for
                      our Online Enrollment Registration on your
                      department/level
                    </ListItemText>
                  </List>
                </Stack>
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Typography variant="h1" color="secondary">
                  BATANGAS EASTERN COLLEGES EMS
                </Typography>
              </Grid>
            </Grid>
          </BackgroundPattern1>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
