import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/cashier/ProtectedRoute';
import VoidORNumbers from 'src/views/cashier/void-or';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/cashier/dashboard'))
);
const EmployeeHandbook = Loadable(
  lazy(() => import('src/views/cashier/employees/handbook'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/cashier/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/cashier/announcements/events'))
);
const AnnouncementHoliday = Loadable(
  lazy(() => import('src/views/cashier/announcements/holidays'))
);
const LeaveApply = Loadable(
  lazy(() => import('src/views/cashier/leave/apply'))
);
const Policies = Loadable(lazy(() => import('src/views/cashier/policies')));
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/cashier/organizational-structure'))
);
const Accounts = Loadable(
  lazy(() => import('src/views/cashier/students/accounts'))
);
const Invoices = Loadable(
  lazy(() => import('src/views/cashier/students/invoices'))
);
const Payments = Loadable(
  lazy(() => import('src/views/cashier/students/payments'))
);
const Reports = Loadable(lazy(() => import('src/views/cashier/reports')));
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const ReportAccountNos = Loadable(
  lazy(() => import('src/views/cashier/reports-account-nos'))
);
const ORSummaryList = Loadable(
  lazy(() => import('src/views/cashier/or-summary-list'))
);

const CashierRoutes = {
  path: '/cashier',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/cashier/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/cashier/dashboard',
      children: [
        {
          path: '/cashier/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/cashier/handbook',
      children: [
        {
          path: '/cashier/handbook',
          element: <EmployeeHandbook />,
        },
      ],
    },
    {
      path: '/cashier/announcements/notice',
      children: [
        {
          path: '/cashier/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/cashier/announcements/events',
      children: [
        {
          path: '/cashier/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/cashier/announcements/holidays',
      children: [
        {
          path: '/cashier/announcements/holidays',
          element: <AnnouncementHoliday />,
        },
      ],
    },
    {
      path: '/cashier/leave/apply',
      children: [
        {
          path: '/cashier/leave/apply',
          element: <LeaveApply />,
        },
      ],
    },
    {
      path: '/cashier/policies',
      children: [
        {
          path: '/cashier/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/cashier/organizational-structure',
      children: [
        {
          path: '/cashier/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/cashier/students/accounts',
      children: [
        {
          path: '/cashier/students/accounts',
          element: <Accounts />,
        },
      ],
    },
    {
      path: '/cashier/students/invoices',
      children: [
        {
          path: '/cashier/students/invoices',
          element: <Invoices />,
        },
      ],
    },
    {
      path: '/cashier/students/payments',
      children: [
        {
          path: '/cashier/students/payments',
          element: <Payments />,
        },
      ],
    },
    {
      path: '/cashier/cashier-reports/reports',
      children: [
        {
          path: '/cashier/cashier-reports/reports',
          element: <Reports />,
        },
      ],
    },
    {
      path: '/cashier/profile',
      children: [
        {
          path: '/cashier/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/cashier/cashier-reports/reports-account-nos',
      children: [
        {
          path: '/cashier/cashier-reports/reports-account-nos',
          element: <ReportAccountNos />,
        },
      ],
    },
    {
      path: '/cashier/or-settings/void-or-no',
      children: [
        {
          path: '/cashier/or-settings/void-or-no',
          element: <VoidORNumbers />,
        },
      ],
    },
    {
      path: '/cashier/or-settings/or-summary-list',
      children: [
        {
          path: '/cashier/or-settings/or-summary-list',
          element: <ORSummaryList />,
        },
      ],
    },
  ],
};

export default CashierRoutes;
