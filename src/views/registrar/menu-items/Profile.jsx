import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'profile',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/registrar/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
