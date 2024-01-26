import { IconUserCircle } from '@tabler/icons-react';

// ===========|| HR MENU ITEMS ||=========== //

const dashboard = {
  id: 'Account',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/hr/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
