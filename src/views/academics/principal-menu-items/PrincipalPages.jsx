import { IconDashboard, IconUsers, IconFriends, IconAbacusOff, IconAffiliate, IconCalendar, IconListDetails, IconBrandFirebase, IconBuildingWarehouse } from '@tabler/icons-react';

const dashboard = {
  id: 'academics-module',
  title: 'Principal Dashboard',
  type: 'group',
  children: [
    {
      id: 'principal-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/academics/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'curriculum',
      title: 'Curriculum',
      type: 'item',
      url: '/academics/curriculum',
      icon: IconListDetails,
      breadcrumbs: true
    },
    {
      id: 'programs',
      title: 'Programs',
      type: 'item',
      url: '/academics/programs',
      icon: IconBrandFirebase,
      breadcrumbs: true
    },
    {
      id: 'rooms',
      title: 'Rooms',
      type: 'item',
      url: '/academics/rooms',
      icon: IconBuildingWarehouse,
      breadcrumbs: true
    },
    {
      id: 'principal-subjects',
      title: 'Subjects',
      type: 'item',
      url: '/academics/subject/k12-subjects',
      icon: IconAbacusOff,
      breadcrumbs: true
    },
    {
      id: 'class-scheduler',
      title: 'Class Scheduler',
      type: 'item',
      url: '/academics/class-scheduler',
      icon: IconCalendar,
      breadcrumbs: true
    },
    {
      id: 'principal-sections',
      title: 'Sections',
      type: 'item',
      url: '/academics/sections',
      icon: IconAffiliate,
      breadcrumbs: true
    },
    {
      id: 'principal-students',
      title: 'Students',
      type: 'item',
      url: '/academics/students',
      icon: IconFriends,
      breadcrumbs: true
    },
    {
      id: 'principal-teachers',
      title: 'Teachers',
      type: 'item',
      url: '/academics/teachers',
      icon: IconUsers,
      breadcrumbs: true
    },


  ]
};

export default dashboard;
