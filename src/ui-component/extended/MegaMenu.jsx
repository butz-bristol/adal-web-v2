import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import {
  Button,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'src/ui-component/cards/MainCard';
import Transitions from 'src/ui-component/extended/Transitions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { drawerWidth, gridSpacing } from 'src/store/constant';

// ==============================|| SEARCH INPUT - MEGA MENu||============================== //

const MegaMenuSection = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (matchDownMd && open) setOpen(false);
    // eslint-disable-next-line
  }, [matchDownMd]);

  return (
    <>
      <Button
        color="secondary"
        ref={anchorRef}
        onClick={handleToggle}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Academics
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        sx={{ zIndex: 10 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [150, 20],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 10, // apply 10px padding around the popper
            },
          },
          {
            name: 'flip',
            options: {
              padding: 10, // apply 10px padding around the popper
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper
                sx={{
                  width: {
                    md: `calc(100vw - 100px)`,
                    lg: `calc(100vw - ${drawerWidth + 100}px)`,
                    xl: `calc(100vw - ${drawerWidth + 140}px)`,
                  },
                  maxWidth: 500,
                }}
              >
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                    sx={{ p: 1, overflow: { xs: 'visible', md: 'hidden' } }}
                  >
                    <Grid container spacing={gridSpacing}>
                      <Grid item md={12}>
                        <Grid
                          container
                          spacing={gridSpacing}
                          sx={{
                            pt: 3,
                            '& .MuiListItemButton-root:hover': {
                              background: 'transparent',
                              '& .MuiTypography-root': {
                                color: 'secondary.main',
                              },
                            },
                            '& .MuiListItemIcon-root': {
                              minWidth: 16,
                            },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-user"
                              subheader={
                                <ListSubheader id="nested-list-user">
                                  <Typography
                                    color="secondary"
                                    variant="subtitle1"
                                  >
                                    {' '}
                                    Login
                                  </Typography>
                                </ListSubheader>
                              }
                            >
                              <ListItemButton
                                disableRipple
                                component={Link}
                                to="/login"
                              >
                                <ListItemIcon>
                                  <FiberManualRecordIcon
                                    color="secondary"
                                    sx={{ fontSize: '0.5rem' }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary="Student" />
                              </ListItemButton>
                              <ListItemButton component={Link} to="/applicants">
                                <ListItemIcon>
                                  <FiberManualRecordIcon
                                    color="secondary"
                                    sx={{ fontSize: '0.5rem' }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary="Applicants" />
                              </ListItemButton>
                            </List>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-application"
                              subheader={
                                <ListSubheader id="nested-list-application">
                                  <Typography
                                    color="secondary"
                                    variant="subtitle1"
                                  >
                                    {' '}
                                    Admissions{' '}
                                  </Typography>
                                </ListSubheader>
                              }
                            >
                              <ListItemButton component={Link} to="/">
                                <ListItemIcon>
                                  <FiberManualRecordIcon
                                    color="secondary"
                                    sx={{ fontSize: '0.5rem' }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary="Enrollment Procedures" />
                              </ListItemButton>
                              <ListItemButton component={Link} to="/">
                                <ListItemIcon>
                                  <FiberManualRecordIcon
                                    color="secondary"
                                    sx={{ fontSize: '0.5rem' }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary="Admission Requirements" />
                              </ListItemButton>
                              <ListItemButton component={Link} to="/enroll">
                                <ListItemIcon>
                                  <FiberManualRecordIcon
                                    color="secondary"
                                    sx={{ fontSize: '0.5rem' }}
                                  />
                                </ListItemIcon>
                                <ListItemText primary="Admission Form" />
                              </ListItemButton>
                            </List>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default MegaMenuSection;
