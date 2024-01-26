import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NavGroup from './NavGroup';

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

const MenuList = () => {
  const user_role =
    useSelector((state) => state.users?.user?.user_role) ?? null;
  const {
    userProfile: {
      teaching_department,
      teaching_designation,
      admin_designation_toggle,
      teaching_designation_toggle,
    },
  } = useSelector((state) => state.academics);

  const teacherNavigation = () => {
    if (admin_designation_toggle && teaching_designation_toggle) {
      return academicNavigation.items;
    }
    if (admin_designation_toggle && !teaching_designation_toggle) {
      return academicNavigation.items;
    }
    if (!admin_designation_toggle && teaching_designation_toggle) {
      return teachingDesignation.items;
    }
  };
  const navigationByRole = {
    'hr admin': hrNavigation.items,
    'admissions admin': admissionNavigation.items,
    'registrar admin': registrarNavigation.items,
    'academics admin': teacherNavigation(),
    'accounting admin': accountingNavigation.items,
    'cashier admin': cashierNavigation.items,
    'canteen admin': canteenNavigation.items,
    'finance admin': financeNavigation.items,
    'library admin': libraryNavigation.items,
    'procurement admin': procurementNavigation.items,
    // Add more roles and their corresponding navigation items here
  };

  const navItems = navigationByRole[user_role] || [];

  return (
    <>
      {navItems.map((item) => {
        if (item.type === 'group') {
          return <NavGroup key={item.id} item={item} />;
        } else {
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
        }
      })}
    </>
  );
};

export default MenuList;
