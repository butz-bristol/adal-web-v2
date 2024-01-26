import { lazy } from 'react';

import StudentLayout from 'src/layout/StudentLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/student/ProtectedRoute';

const Dashboard = Loadable(lazy(() => import('src/views/student/dashboard')));
const Announcements = Loadable(
  lazy(() => import('src/views/student/announcements'))
);
const Grades = Loadable(lazy(() => import('src/views/student/grades')));
const Schedule = Loadable(lazy(() => import('src/views/student/schedule')));
const Calendar = Loadable(lazy(() => import('src/views/student/calendar')));
const Profile = Loadable(lazy(() => import('src/views/student/profile')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
// Added Library
const EPublications = Loadable(
  lazy(() => import('src/views/library/epublications/view-all'))
);
const RequestBook = Loadable(
  lazy(() => import('src/views/library/books/request_book/index'))
);
const OverdueBooks = Loadable(
  lazy(() => import('src/views/library/books/overdue_books'))
);
const BorrowedBooks = Loadable(
  lazy(() => import('src/views/library/books/borrowed_books'))
);
// End
const StudentRoutes = {
  path: '/student',
  element: (
    <ProtectedRoute>
      <StudentLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/student/',
      children: [
        {
          path: '/student/dashboard',
          element: <Dashboard />,
        },

        {
          path: '/student/announcements',
          children: [
            {
              path: '/student/announcements',
              element: <Announcements />,
            },
          ],
        },
        {
          path: '/student/grades',
          children: [
            {
              path: '/student/grades',
              element: <Grades />,
            },
          ],
        },
        {
          path: '/student/schedule',
          children: [
            {
              path: '/student/schedule',
              element: <Schedule />,
            },
          ],
        },
        {
          path: '/student/calendar',
          children: [
            {
              path: '/student/calendar',
              element: <Calendar />,
            },
          ],
        },
        {
          path: '/student/profile',
          children: [
            {
              path: '/student/profile',
              element: <Profile />,
            },
          ],
        },
        {
          path: '/student/epublications',
          children: [
            {
              path: '/student/epublications',
              element: <EPublications />,
            },
          ],
        },
        {
          path: '/student/request_book',
          children: [
            {
              path: '/student/request_book',
              element: <RequestBook />,
            },
          ],
        },
        {
          path: '/student/overdue_books',
          children: [
            {
              path: '/student/overdue_books',
              element: <OverdueBooks />,
            },
          ],
        },
        {
          path: '/student/borrowed_books',
          children: [
            {
              path: '/student/borrowed_books',
              element: <BorrowedBooks />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
};

export default StudentRoutes;
