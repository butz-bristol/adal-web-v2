import {
  IconDashboard,
  IconCalendar,
  IconSpeakerphone,
  IconCalendarCheck,
  IconTextIncrease,
  IconBook2,
  IconBookDownload,
  IconBook,
  IconExclamationMark,
  IconBookmark
} from '@tabler/icons-react';

const dashboard = {
  id: 'Dashboard',
  title: 'Dashboard',
  caption: 'Current Term',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/student/dashboard',
      icon: IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'announcements',
      title: 'Announcements',
      type: 'item',
      url: '/student/announcements',
      icon: IconSpeakerphone,
      breadcrumbs: false
    },
    {
      id: 'grades',
      title: 'My Grades',
      type: 'item',
      url: '/student/grades',
      icon: IconTextIncrease,
      breadcrumbs: false
    },
    {
      id: 'schedule',
      title: 'My Schedule',
      type: 'item',
      url: '/student/schedule',
      icon: IconCalendarCheck,
      breadcrumbs: false
    },
    {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      url: '/student/calendar',
      icon: IconCalendar,
      breadcrumbs: false
    }
    //Temporary Comment
    // {
    //   id: 'library',
    //   title: 'Library',
    //   type: 'collapse',
    //   icon: IconBook2,
    //   children: [
    //     {
    //       id: 'epublications',
    //       title: 'E-Book',
    //       type: 'item',
    //       icon: IconBookDownload,
    //       url: '/student/epublications'
    //     },
    //     {
    //       id: 'request_book',
    //       title: 'Request Book',
    //       type: 'item',
    //       icon: IconBook,
    //       url: '/student/request_book'
    //     },

    //     {
    //       id: 'overdue_books',
    //       title: 'Overdue Books',
    //       type: 'item',
    //       icon: IconExclamationMark,
    //       url: '/student/overdue_books'
    //     },
    //     {
    //       id: 'borrowed_books',
    //       title: 'Borrowed Books',
    //       type: 'item',
    //       icon: IconBookmark,
    //       url: '/student/borrowed_books'
    //     }
    //   ]
    // }
  ]
};

export default dashboard;
