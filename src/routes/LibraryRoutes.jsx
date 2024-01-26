import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/library/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/library/dashboard'))
);
const Books = Loadable(lazy(() => import('src/views/library/books/view-all')));
const Issues = Loadable(
  lazy(() => import('src/views/library/books/view-requested'))
);
const EPublications = Loadable(
  lazy(() => import('src/views/library/epublications/view-all'))
);
const RequestBook = Loadable(
  lazy(() => import('src/views/library/books/request_book'))
);
const BorrowedBooks = Loadable(
  lazy(() => import('src/views/library/books/borrowed_books'))
);
const BooksOverdueList = Loadable(
  lazy(() => import('src/views/library/books/overdue_books_all'))
);
const OverdueBooks = Loadable(
  lazy(() => import('src/views/library/books/overdue_books'))
);
const OverduePayments = Loadable(
  lazy(() => import('src/views/library/books/overdue_book_payments'))
);
const ReviewOverDuePayments = Loadable(
  lazy(() => import('src/views/library/books/review_overdue_payment'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const LibraryHandbook = Loadable(
  lazy(() => import('src/views/library/handbook'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/library/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/library/announcements/events'))
);
const AnnouncementHolidays = Loadable(
  lazy(() => import('src/views/library/announcements/holidays'))
);
const Policies = Loadable(lazy(() => import('src/views/library/policies')));
const AllBorrowedBooks = Loadable(
  lazy(() => import('src/views/library/books/borrowed_all'))
);
const TransactionHistory = Loadable(
  lazy(() => import('src/views/library/books/transaction-history'))
);
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/library/organizational-structure'))
);
//const LeaveApply = Loadable(lazy(() => import('src/views/library/leave/apply')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));

const LibraryRoutes = {
  path: '/library',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/library/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/library/dashboard',
      children: [
        {
          path: '/library/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },

    {
      path: '/library/books/view-all',
      children: [
        {
          path: '/library/books/view-all',
          element: <Books />,
        },
      ],
    },
    {
      path: '/library/books/transaction-history',
      children: [
        {
          path: '/library/books/transaction-history/:id',
          element: <TransactionHistory />,
        },
      ],
    },
    {
      path: '/library/policies',
      children: [
        {
          path: '/library/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/library/handbook',
      children: [
        {
          path: '/library/handbook',
          element: <LibraryHandbook />,
        },
      ],
    },

    {
      path: '/library/books/view-requested',
      children: [
        {
          path: '/library/books/view-requested',
          element: <Issues />,
        },
      ],
    },

    {
      path: '/library/announcements/notice',
      children: [
        {
          path: '/library/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/library/announcements/events',
      children: [
        {
          path: '/library/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/library/announcements/holidays',
      children: [
        {
          path: '/library/announcements/holidays',
          element: <AnnouncementHolidays />,
        },
      ],
    },

    {
      path: '/library/books/epublications',
      children: [
        {
          path: '/library/books/epublications',
          element: <EPublications />,
        },
      ],
    },

    {
      path: '/library/books/request_book',
      children: [
        {
          path: '/library/books/request_book',
          element: <RequestBook />,
        },
      ],
    },

    {
      path: '/library/books/borrowed_books',
      children: [
        {
          path: '/library/books/borrowed_books',
          element: <BorrowedBooks />,
        },
      ],
    },

    {
      path: '/library/books/overdue_books',
      children: [
        {
          path: '/library/books/overdue_books',
          element: <OverdueBooks />,
        },
      ],
    },
    {
      path: '/library/books/overdue_books_all',
      children: [
        {
          path: '/library/books/overdue_books_all',
          element: <BooksOverdueList />,
        },
      ],
    },
    {
      path: '/library/books/review_overdue_payment',
      children: [
        {
          path: '/library/books/review_overdue_payment',
          element: <ReviewOverDuePayments />,
        },
      ],
    },
    {
      path: '/library/books/borrowed_all',
      children: [
        {
          path: '/library/books/borrowed_all',
          element: <AllBorrowedBooks />,
        },
      ],
    },
    {
      path: '/library/profile',
      children: [
        {
          path: '/library/profile',
          element: <Profile />,
        },
      ],
    },

    {
      path: '/library/organizational-structure',
      children: [
        {
          path: '/library/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/library/handbook',
      children: [
        {
          path: '/library/handbook',
          element: <LibraryHandbook />,
        },
      ],
    },
  ],
};

export default LibraryRoutes;
