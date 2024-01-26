import {
  IconBuildingWarehouse,
  IconBuilding,
  IconListDetails,
  IconBooks,
  IconBrandFirebase,
  IconCalendar,
  IconNews,
  IconCalendarEvent,
  IconTimelineEvent,
  IconUserCog
} from '@tabler/icons-react';

const PlanningSetup = {
  id: 'academics-module',
  title: 'Planning Setup',
  type: 'group',
  children: [
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
      id: 'subjects',
      title: 'Subjects',
      type: 'item',
      url: '/academics/subjects',
      icon: IconBooks,
      breadcrumbs: true
    },
    {
      id: 'scheduler',
      title: 'Scheduler',
      type: 'item',
      url: '/academics/scheduler',
      icon: IconCalendar,
      breadcrumbs: true
    },
    {
      id: 'sections',
      title: 'Sections',
      type: 'item',
      url: '/academics/sections',
      icon: IconBuilding,
      breadcrumbs: true
    },
    {
      id: 'teaching-load',
      title: 'Teaching Load',
      type: 'item',
      url: '/academics/teaching-load',
      icon: IconUserCog,
      breadcrumbs: true
    },
    {
      id: 'announcements',
      title: 'Announcements',
      type: 'item',
      url: '/academics/announcements',
      icon: IconNews,
      breadcrumbs: true
    },
    {
      id: 'academic-calendar',
      title: 'Academic Calendar',
      type: 'item',
      url: '/academics/academic-calendar',
      icon: IconCalendarEvent,
      breadcrumbs: true
    },
    {
      id: 'events',
      title: 'Events',
      type: 'item',
      url: '/academics/events',
      icon: IconTimelineEvent,
      breadcrumbs: true
    }
  ]
};

export default PlanningSetup;
