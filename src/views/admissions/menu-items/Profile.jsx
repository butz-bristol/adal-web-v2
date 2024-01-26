import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/admissions/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
