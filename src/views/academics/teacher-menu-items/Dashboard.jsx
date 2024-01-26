import { IconBooks, IconCalendarCheck, IconCalendarCode, IconLayoutDashboard, IconSchool, IconSection } from '@tabler/icons-react';

const Dashboard = {
  id: 'academics-module',
  title: 'Dashboard',
  caption: 'Current Term',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/academics/dashboard',
      icon: IconLayoutDashboard,
      breadcrumbs: true
    },
    {
      id: 'sections',
      title: 'Sections',
      type: 'item',
      url: '/academics/sections',
      icon: IconSection,
      breadcrumbs: true
    },
    {
      id: 'subjects',
      title: 'Teaching Load',
      type: 'item',
      url: '/academics/teaching-loads',
      icon: IconCalendarCheck,
      breadcrumbs: true
    }
  ]
};

export default Dashboard;
