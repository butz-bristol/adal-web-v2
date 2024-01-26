// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';

import menuItemApplicant from 'src/views/student/menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

//create switch function for different user navigation
const MenuList = () => {
  const navItems = menuItemApplicant.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
