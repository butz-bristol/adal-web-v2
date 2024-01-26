import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/accounting/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/accounting/dashboard'))
);
const EmployeeHandbook = Loadable(
  lazy(() => import('src/views/accounting/employees/handbook'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/accounting/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/accounting/announcements/events'))
);
const AnnouncementHoliday = Loadable(
  lazy(() => import('src/views/accounting/announcements/holidays'))
);
const LeaveApply = Loadable(
  lazy(() => import('src/views/accounting/leave/apply'))
);
const FeeTypes = Loadable(
  lazy(() => import('src/views/accounting/setup-fees/fee-types'))
);
const OtherFees = Loadable(
  lazy(() => import('src/views/finance/setup-fees/other-fees'))
);
const K12FeeSetup = Loadable(
  lazy(() => import('src/views/finance/setup-fees/k12'))
);
const CollegeFeeSetup = Loadable(
  lazy(() => import('src/views/finance/setup-fees/college'))
);
const TesdaFeeSetup = Loadable(
  lazy(() => import('src/views/finance/setup-fees/tesda'))
);
const TuitionAndFees = Loadable(
  lazy(() => import('src/views/accounting/setup-fees/tuition-and-fees'))
);
const Fee = Loadable(
  lazy(() => import('src/views/accounting/setup-fees/tuition-and-fees/fees'))
);
const OtherFee = Loadable(
  lazy(() => import('src/components/finance/OtherFee'))
);
const Policies = Loadable(lazy(() => import('src/views/accounting/policies')));
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/accounting/organizational-structure'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const InvoiceNumberFormats = Loadable(
  lazy(() => import('src/components/finance/InvoiceNumberFormats'))
);

const AccountingRoutes = {
  path: '/accounting',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/accounting/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/accounting/dashboard',
      children: [
        {
          path: '/accounting/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/accounting/handbook',
      children: [
        {
          path: '/accounting/handbook',
          element: <EmployeeHandbook />,
        },
      ],
    },
    {
      path: '/accounting/announcements/notice',
      children: [
        {
          path: '/accounting/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/accounting/announcements/events',
      children: [
        {
          path: '/accounting/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/accounting/announcements/holidays',
      children: [
        {
          path: '/accounting/announcements/holidays',
          element: <AnnouncementHoliday />,
        },
      ],
    },
    {
      path: '/accounting/leave/apply',
      children: [
        {
          path: '/accounting/leave/apply',
          element: <LeaveApply />,
        },
      ],
    },
    {
      path: '/accounting/policies',
      children: [
        {
          path: '/accounting/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/accounting/organizational-structure',
      children: [
        {
          path: '/accounting/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/accounting/policies',
      children: [
        {
          path: '/accounting/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/fee-types',
      children: [
        {
          path: '/accounting/setup-fees/fee-types',
          element: <FeeTypes />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/other-fees',
      children: [
        {
          path: '/accounting/setup-fees/other-fees',
          element: <OtherFees />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/other-fee/:id',
      children: [
        {
          path: '/accounting/setup-fees/other-fee/:id',
          element: <OtherFee />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/k-12',
      children: [
        {
          path: '/accounting/setup-fees/k-12',
          element: <K12FeeSetup />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/college',
      children: [
        {
          path: '/accounting/setup-fees/college',
          element: <CollegeFeeSetup />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/tesda',
      children: [
        {
          path: '/accounting/setup-fees/tesda',
          element: <TesdaFeeSetup />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/tuition-and-fees',
      children: [
        {
          path: '/accounting/setup-fees/tuition-and-fees',
          element: <TuitionAndFees />,
        },
      ],
    },
    {
      path: '/accounting/setup-fees/fee',
      children: [
        {
          path: '/accounting/setup-fees/fee',
          element: <Fee />,
        },
      ],
    },
    {
      path: '/accounting/profile',
      children: [
        {
          path: '/accounting/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/accounting/other-fees/invoice-formats',
      children: [
        {
          path: '/accounting/other-fees/invoice-formats',
          element: <InvoiceNumberFormats />,
        },
      ],
    },
  ],
};

export default AccountingRoutes;
