import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import AuthSlider from 'src/ui-component/cards/AuthSlider';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './AuthLogin';
import AuthWrapper1 from './AuthWrapper1';

import AuthBlueCard from 'src/assets/images/auth/auth-blue-card.svg';
import AuthPurpleCard from 'src/assets/images/auth/auth-purple-card.svg';
import NewAppBar from 'src/ui-component/extended/NewAppBar';

import BECPhoto from 'src/assets/images/bec/_BEC0157.jpg';
import { TabPanel } from 'src/components/OtherComponents';
import { tabProps } from 'src/utils/helperFunctions';

const PurpleWrapper = styled('span')({
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '32%',
    left: '40%',
    width: 313,
    backgroundSize: 380,
    height: 280,
    backgroundImage: `url(${AuthPurpleCard})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    animation: '15s wings ease-in-out infinite',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '23%',
    left: '37%',
    width: 243,
    height: 210,
    backgroundSize: 380,
    backgroundImage: `url(${AuthBlueCard})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    animation: '15s wings ease-in-out infinite',
    animationDelay: '1s',
  },
});

const items = [
  {
    title: 'Annoucements',
    description: 'All Annoucements',
  },
  {
    title: 'Academic Calendar',
    description: 'Show Academic Calendar',
  },
  {
    title: 'Events',
    description: 'Display all events',
  },
];

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <AuthWrapper1>
      <NewAppBar />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item container justifyContent="center" lg={7}>
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
                        Login in to your account
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="flex-end"
                  xs={12}
                >
                  <Typography
                    component={Link}
                    to="/enroll"
                    variant="subtitle1"
                    sx={{ textDecoration: 'none' }}
                  >
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
        <Grid
          direction="row"
          container
          item
          lg={5}
          component={Paper}
          alignItems="center"
          justifyContent="center"
          sx={{ alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                sx={{
                  '& a': {
                    minHeight: 'auto',
                    minWidth: 10,
                    py: 1.5,
                    px: 1,
                    mr: 2.25,
                    color: theme.palette.grey[600],
                    backgroundColor: theme.palette.secondary,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  '& a.Mui-selected': {
                    color: theme.palette.secondary.main,
                  },
                  '& .MuiTabs-indicator': {
                    bottom: 2,
                  },
                  '& a > svg': {
                    marginBottom: '0px !important',
                    mr: 1.25,
                  },
                }}
              >
                <Tab
                  component={Link}
                  to="#"
                  label="Announcements"
                  {...tabProps(0)}
                />
                <Tab
                  component={Link}
                  to="#"
                  label="Academic Calendar"
                  {...tabProps(1)}
                />
                <Tab component={Link} to="#" label="Events" {...tabProps(2)} />
              </Tabs>
            </Grid>
            <Grid container item>
              <TabPanel value={value} index={0}>
                <Grid item xs={12}>
                  <img src={BECPhoto} width="100%" alt="preview" />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid item xs={12}></Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid item xs={12}></Grid>
              </TabPanel>
            </Grid>
            <Grid container item justifyContent="center" xs={12}>
              <Grid item xs={10}>
                <AuthSlider items={items} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
