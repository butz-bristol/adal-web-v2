// assets
import {
  IconDashboard,
  IconBuildingCommunity,
  IconClipboardCheck,
  IconFolders,
  IconUsers,
  IconCalendarEvent,
  IconSpeakerphone,
  IconCalendar,
  IconPinned,
  IconCalendarStats,
  IconLayoutGrid,
  IconUserCheck,
  IconBox,
  IconShieldLock,
  IconHierarchy,
  IconHierarchy2,
  IconBriefcase,
  IconUserExclamation,
  IconCirclePlus,
  IconListDetails,
  IconCash,
  IconChartCandle,
  IconReport,
  IconFileAnalytics,
  IconClock,
  IconAlarm,
  IconCashBanknote,
  IconUserCircle,
  IconBooks,
  IconBookDownload,
  IconBook,
  IconBookmark,
  IconExclamationMark,
  IconGavel,
  IconBook2,
  IconCheckbox
} from '@tabler/icons-react'; //https://tabler-icons.io/

// ==============================|| HR MENU ITEMS ||============================== //

const dashboard = {
  id: 'LibraryPages',
  title: 'Library Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/library/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'library_administration',
      // Changes Administration to Librarian
      title: 'Librarian',
      type: 'collapse',
      icon: IconGavel,
      children: [
        {
          id: 'books',
          title: 'Books',
          type: 'item',
          url: '/library/books/view-all',
          icon: IconBooks,
          breadcrumbs: true
        },
        {
          id: 'Issue',
          title: 'Issue Books',
          type: 'item',
          url: '/library/books/view-requested',
          icon: IconUsers
        },
        {
          id: 'All_Borrowed_Books',
          title: 'Borrowed Books',
          type: 'item',
          url: '/library/books/borrowed_all',
          icon: IconBookmark
        },
        {
          id: 'Overdue_Books_All',
          title: 'Overdue Books List',
          type: 'item',
          url: '/library/books/overdue_books_all',
          icon: IconExclamationMark
        },
        {
          id: 'approve_overdue_payment',
          title: 'Review Overdue Payments',
          type: 'item',
          url: '/library/books/review_overdue_payment',
          icon: IconCheckbox
        }
      ]
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
          url: '/library/announcements/notice',
          icon: IconPinned,
          breadcrumbs: true
        },
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          url: '/library/announcements/events',
          icon: IconCalendarEvent,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'library',
      title: 'Library',
      type: 'collapse',
      icon: IconBook2,
      children: [
        {
          id: 'epublications',
          title: 'E-Book',
          type: 'item',
          icon: IconBookDownload,
          url: '/library/books/epublications'
        },
        {
          id: 'request_book',
          title: 'Request Book',
          type: 'item',
          icon: IconBook,
          url: '/library/books/request_book'
        },

        {
          id: 'overdue_books',
          title: 'Overdue Books',
          type: 'item',
          icon: IconExclamationMark,
          url: '/library/books/overdue_books'
        },
        {
          id: 'borrowed_books',
          title: 'Borrowed Books',
          type: 'item',
          icon: IconBookmark,
          url: '/library/books/borrowed_books'
        }
      ]
    }
  ]
};

export default dashboard;
