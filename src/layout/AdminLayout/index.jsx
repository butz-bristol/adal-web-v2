import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { drawerWidth } from 'src/store/constant';
import Breadcrumbs from 'src/ui-component/extended/Breadcrumbs';
import Customization from '../Customization';
import Header from './Header';
import Sidebar from './Sidebar';

//navigation
import academicNavigation from 'src/views/academics/menu-items';
import teachingDesignation from 'src/views/academics/teacher-menu-items';
import accountingNavigation from 'src/views/accounting/menu-items';
import admissionNavigation from 'src/views/admissions/menu-items';
import canteenNavigation from 'src/views/canteen/menu-items';
import cashierNavigation from 'src/views/cashier/menu-items';
import financeNavigation from 'src/views/finance/menu-items';
import hrNavigation from 'src/views/hr/menu-items';
import libraryNavigation from 'src/views/library/menu-items';
import procurementNavigation from 'src/views/procurement/menu-items';
import registrarNavigation from 'src/views/registrar/menu-items';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import {
  getAllPrograms,
  getUserProfile,
} from 'src/features/academicFeatures/academicSlice';
import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';
import { toggleMenu } from 'src/store/customizationSlice';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
      },
    }),
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const customization = useSelector((state) => state.customization);

  const user_role =
    useSelector((state) => state.users?.user?.user_role) ?? null;
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const {
    userProfile: {
      admin_designation_toggle,
      teaching_designation_toggle,
      role_id,
    },
  } = useSelector((state) => state.academics);

  const teacherNavigation = () => {
    if (admin_designation_toggle && teaching_designation_toggle) {
      return academicNavigation;
    }
    if (admin_designation_toggle && !teaching_designation_toggle) {
      return academicNavigation;
    }
    if (!admin_designation_toggle && teaching_designation_toggle) {
      return teachingDesignation;
    }
  };

  const roleNavigationMap = {
    'hr admin': hrNavigation,
    'admissions admin': admissionNavigation,
    'registrar admin': registrarNavigation,
    'library admin': libraryNavigation,
    'cashier admin': cashierNavigation,
    'canteen admin': canteenNavigation,
    'finance admin': financeNavigation,
    'accounting admin': accountingNavigation,
    'academics admin': teacherNavigation(),
    'procurement and inventory admin': procurementNavigation,
    // Add more roles and their corresponding navigation items here
  };
  const userRoleNavigation = roleNavigationMap[user_role];

  const handleLeftDrawerToggle = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (role_id?.role_name === 'academics admin') {
      dispatch(getAllAcademicYears());
      dispatch(getAllSemesters());
      dispatch(getAllDepartments());
      dispatch(getAllCollegeTracks());
      dispatch(getAllPrograms());
      dispatch(getAllYearLevels());
    }
  }, [dispatch, role_id]);

  useEffect(() => {
    dispatch(toggleMenu());
    if (matchDownMd) {
      dispatch(toggleMenu());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <Main
        theme={theme}
        sx={{
          backgroundColor:
            customization.navType === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.light,
        }}
        open={leftDrawerOpened}
      >
        {userRoleNavigation ? (
          <Breadcrumbs
            separator={IconChevronRight}
            path={location.pathname}
            navigation={userRoleNavigation}
            icon
            title
            rightAlign
          />
        ) : null}

        <Outlet />
      </Main>

      <Customization />
    </Box>
  );
};

export default MainLayout;
