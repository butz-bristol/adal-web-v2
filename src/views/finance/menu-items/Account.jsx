import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'profile',
  // title: 'Account',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/finance/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
