import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import Logo from 'src/ui-component/Logo';
import MegaMenuSection from './MegaMenu';

// assets
import MenuIcon from '@mui/icons-material/Menu';
import {
  IconBook,
  IconCreditCard,
  IconDashboard,
  IconHome2,
} from '@tabler/icons-react';

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

const AppBar = ({ ...others }) => {
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
      <MuiAppBar>
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Logo />
            </Typography>

            <Stack
              direction="row"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              spacing={2}
            >
              <MegaMenuSection />
              <Button color="inherit" component={Link} href="/about-us">
                About Us
              </Button>
              <Button color="inherit" component={Link} href="/contact-us">
                Contact Us
              </Button>
              <Button
                component={Link}
                href="/management"
                disableElevation
                variant="contained"
                color="secondary"
              >
                Management
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                color="inherit"
                onClick={drawerToggler(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
              >
                {drawerToggle && (
                  <Box
                    sx={{ width: 'auto' }}
                    role="presentation"
                    onClick={drawerToggler(false)}
                    onKeyDown={drawerToggler(false)}
                  >
                    <List>
                      <Link
                        style={{ textDecoration: 'none' }}
                        href="/"
                        target="_blank"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <IconHome2 />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItemButton>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        href="/about-us"
                        target="_blank"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <IconDashboard />
                          </ListItemIcon>
                          <ListItemText primary="About Us" />
                        </ListItemButton>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        href="/contact-us"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <IconBook />
                          </ListItemIcon>
                          <ListItemText primary="Contact Us" />
                        </ListItemButton>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        href="/management"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <IconCreditCard />
                          </ListItemIcon>
                          <ListItemText primary="Management" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
