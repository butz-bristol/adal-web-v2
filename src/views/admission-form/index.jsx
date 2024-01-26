import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import Logo from 'src/assets/images/BEABEC.png';
import LinkComponent from 'src/components/LinkComponent';
import AnimateButton from 'src/ui-component/extended/AnimateButton';
import Wrapper from './Wrapper';

const Admission = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Wrapper sx={{ p: 2 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item container justifyContent="center">
          <Card>
            <CardHeader
              sx={{ backgroundColor: '#9e1313', height: '80px', mb: 2 }}
              action={
                <CardMedia
                  component="img"
                  image={Logo}
                  sx={{ width: 80 }}
                ></CardMedia>
              }
            ></CardHeader>
            <CardContent>
              <Grid container direction="column" spacing={2} sx={{ pb: 5 }}>
                <Grid item>
                  <Typography variant="h1" color="secondary">
                    Enroll now!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" color="secondary">
                    Online Enrollment for Incoming Freshmen, Transferee, New
                    Graduate School
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    (Pre-School & Grade School, Junior High School, Senior High
                    School, Collge, or TESDA)
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="secondary">
                    What does the future hold? Discover how you can start your
                    journey at ADAL! <br />
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
                    We want to hear your voice because at ADAL, we promote a
                    Beacon's individuality and strongly encourage professional
                    growth.
                    <br />
                    <br />
                    To apply, here are the admission checklist you have to do.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item>
                  <Typography variant="body1">I'm applying as:</Typography>
                </Grid>
                <Grid item>
                  <LinkComponent to="/enroll/applications">
                    <AnimateButton type="slide">
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        Are you a parent/guardian?
                      </Button>
                    </AnimateButton>
                  </LinkComponent>
                </Grid>
                <Grid item>
                  <LinkComponent to="/enroll/individual">
                    <AnimateButton type="slide">
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        Individual Applicant
                      </Button>
                    </AnimateButton>
                  </LinkComponent>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Admission;
