import { IconUsers, IconSchool } from '@tabler/icons-react';

const Users = {
  id: 'academics-users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'students',
      title: 'Learners',
      type: 'item',
      url: '/academics/students',
      icon: IconSchool,
      breadcrumbs: true
    },
    {
      id: 'teachers',
      title: 'Teachers',
      type: 'item',
      url: '/academics/teachers',
      icon: IconUsers,
      breadcrumbs: true
    }
  ]
};

export default Users;
