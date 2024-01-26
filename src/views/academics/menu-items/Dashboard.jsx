import {
  IconBuildingWarehouse,
  IconBuilding,
  IconUsers,
  IconUsersGroup,
  IconLayoutDashboard,
  IconListDetails,
  IconAbacusOff,
  IconBooks,
  IconBrandAsana,
  IconBrandFirebase,
  IconToolsKitchen,
  IconFountain,
  IconCalendar,
  IconSchool
} from '@tabler/icons-react';

const Dashboard = {
  id: 'academics-dashboard',
  title: 'Dashboard',
  caption: true,
  type: 'group',
  children: [
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/academics/analytics',
      icon: IconLayoutDashboard,
      breadcrumbs: true
    }
  ]
};

export default Dashboard;
