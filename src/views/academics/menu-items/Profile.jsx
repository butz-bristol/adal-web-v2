import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'Profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/academics/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
