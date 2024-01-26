import { IconUserCircle } from '@tabler/icons-react';

const dashboard = {
  id: 'Account',
  title: 'My Account',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/applicant/profile',
      icon: IconUserCircle,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
