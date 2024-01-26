import PropTypes from 'prop-types';

// material-ui
import { Divider, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useSelector } from 'react-redux';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const { activeAcademicYear, activeSemester } = useSelector((state) => state.registrar);
  const { userProfile } = useSelector((state) => state.academics);

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title == 'Dashboard'
                ? userProfile?.admin_designation_toggle
                  ? userProfile?.admin_designation.designation_name + ' Dashboard'
                  : 'Teacher Dashboard'
                : item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption ? 'Current Term (' + activeAcademicYear?.school_year + ') ' + activeSemester?.semester_term : item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
