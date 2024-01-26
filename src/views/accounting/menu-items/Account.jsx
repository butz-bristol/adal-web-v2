import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'Account',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/accounting/profile',
      icon: IconUserCircle,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
