import {
  IconFolders,
  IconCalendarEvent,
  IconSpeakerphone,
  IconCalendar,
  IconPinned,
  IconShieldLock,
  IconHierarchy2
} from '@tabler/icons-react';

const otherSubmenuItems = {
  id: 'others',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'handbook',
      title: 'Handbook',
      type: 'item',
      url: '/academics/handbook',
      icon: IconFolders,
      breadcrumbs: true
    },
    {
      id: 'announcements',
      title: 'Announcements',
      type: 'collapse',
      icon: IconSpeakerphone,
      children: [
        {
          id: 'notice',
          title: 'Notice',
          type: 'item',
          url: '/academics/announcements/notice',
          icon: IconPinned,
          breadcrumbs: true
        },
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          url: '/academics/announcements/events',
          icon: IconCalendarEvent,
          breadcrumbs: true
        },
        {
          id: 'holidays',
          title: 'Holidays',
          type: 'item',
          url: '/academics/announcements/holidays',
          icon: IconCalendar,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'apply',
      title: 'Apply for Leave',
      type: 'item',
      url: '/academics/leave/apply',
      icon: IconCalendar,
      breadcrumbs: true
    },
    {
      id: 'policies',
      title: 'Policies',
      type: 'item',
      url: '/academics/policies',
      icon: IconShieldLock,
      breadcrumbs: true
    },
    {
      id: 'organizational-structure',
      title: 'Organizational Structure',
      type: 'item',
      url: '/academics/organizational-structure',
      icon: IconHierarchy2,
      breadcrumbs: true
    }
  ]
};

export default otherSubmenuItems;
