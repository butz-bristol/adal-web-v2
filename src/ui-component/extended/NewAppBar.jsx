import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';

// material-ui
import {
  Container,
  Grid,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import Logo from 'src/ui-component/Logo';

// assets

// elevation scroll
function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });
  const darkBorder =
    theme.palette.mode === 'dark'
      ? theme.palette.dark.dark
      : theme.palette.grey[200];

  return cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor: theme.palette.background.default,
      borderBottom: trigger ? 'none' : '1px solid',
      borderColor: trigger ? '' : darkBorder,
      color: theme.palette.text.dark,
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node,
  window: PropTypes.object,
};

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const NewAppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = useState(false);
  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar position="static">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Logo />
            </Typography>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
            >
              <Grid item>
                <Typography color="inherit" href="/about-us">
                  BEC HOME |
                </Typography>
              </Grid>

              <Grid item>
                <Typography color="inherit" href="/about-us">
                  info@bec.edu.ph |
                </Typography>
              </Grid>

              <Grid item>
                <Typography color="inherit" href="/about-us">
                  043-575-3616
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default NewAppBar;
