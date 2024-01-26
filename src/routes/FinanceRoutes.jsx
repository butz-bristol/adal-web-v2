import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/finance/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/finance/dashboard'))
);
const EmployeeHandbook = Loadable(
  lazy(() => import('src/views/finance/employees/handbook'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/finance/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/finance/announcements/events'))
);
const AnnouncementHoliday = Loadable(
  lazy(() => import('src/views/finance/announcements/holidays'))
);
const LeaveApply = Loadable(
  lazy(() => import('src/views/finance/leave/apply'))
);
const FeeTypes = Loadable(
  lazy(() => import('src/views/finance/setup-fees/fee-types'))
);
const OtherFees = Loadable(
  lazy(() => import('src/views/finance/setup-fees/other-fees'))
);
const OtherFee = Loadable(
  lazy(() => import('src/components/finance/OtherFee'))
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
  lazy(() => import('src/views/finance/setup-fees/tuition-and-fees'))
);
const Fee = Loadable(
  lazy(() => import('src/views/finance/setup-fees/tuition-and-fees/fees'))
);
const InvoiceNumberFormats = Loadable(
  lazy(() => import('src/components/finance/InvoiceNumberFormats'))
);
const Assessments = Loadable(
  lazy(() => import('src/views/finance/assessments'))
);
const Policies = Loadable(lazy(() => import('src/views/finance/policies')));
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/finance/organizational-structure'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const SingleK12Fee = Loadable(
  lazy(() => import('src/components/finance/SingleK12Fee'))
);
const GrantsAndVouchers = Loadable(
  lazy(() => import('src/views/finance/grants-and-vouchers'))
);
const GrantNumberFormat = Loadable(
  lazy(() => import('src/components/registrar/GrantsOrVoucherFormat'))
);
const StudentsGrantsAndVouchersPage = Loadable(
  lazy(() => import('src/components/finance/StudentsGrantsAndVouchers'))
);
const K12PaymentScheme = Loadable(
  lazy(() => import('src/views/finance/k-12-payment-scheme'))
);
const FinancialAssistance = Loadable(
  lazy(() => import('src/views/finance/financial-assistance'))
);
const Discounts = Loadable(lazy(() => import('src/views/finance/discounts')));
const BankAccountNos = Loadable(
  lazy(() => import('src/views/finance/bank-accounts'))
);
const VoidORNumbers = Loadable(lazy(() => import('src/views/finance/void-or')));
const Accounts = Loadable(
  lazy(() => import('src/views/finance/students/accounts'))
);
const Invoices = Loadable(
  lazy(() => import('src/views/finance/students/invoices'))
);
const Payments = Loadable(
  lazy(() => import('src/views/finance/students/payments'))
);
const CancelPayments = Loadable(
  lazy(() => import('src/views/finance/students/cancel-payments'))
);
const Reports = Loadable(lazy(() => import('src/views/finance/reports')));
const ReportAccountNos = Loadable(
  lazy(() => import('src/views/finance/reports-account-nos'))
);
const ORSummaryList = Loadable(
  lazy(() => import('src/views/finance/or-summary-list'))
);
const PromissoryNotes = Loadable(
  lazy(() => import('src/views/finance/promissory-note'))
);
const SinglePromissoryNote = Loadable(
  lazy(() => import('src/components/finance/SinglePromissoryNote'))
);
const FiscalYear = Loadable(
  lazy(() => import('src/views/finance/fiscal-year'))
);
const ChartOfAccount = Loadable(
  lazy(() => import('src/views/finance/chart-of-account'))
);
const Account = Loadable(
  lazy(() => import('src/views/finance/chart-of-account/account'))
);
const AccountConfiguration = Loadable(
  lazy(() => import('src/views/finance/account-configuration'))
);

const FinanceRoutes = {
  path: '/finance',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/finance/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/finance/dashboard',
      children: [
        {
          path: '/finance/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/finance/handbook',
      children: [
        {
          path: '/finance/handbook',
          element: <EmployeeHandbook />,
        },
      ],
    },
    {
      path: '/finance/announcements/notice',
      children: [
        {
          path: '/finance/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/finance/announcements/events',
      children: [
        {
          path: '/finance/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/finance/announcements/holidays',
      children: [
        {
          path: '/finance/announcements/holidays',
          element: <AnnouncementHoliday />,
        },
      ],
    },
    {
      path: '/finance/leave/apply',
      children: [
        {
          path: '/finance/leave/apply',
          element: <LeaveApply />,
        },
      ],
    },
    {
      path: '/finance/policies',
      children: [
        {
          path: '/finance/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/finance/organizational-structure',
      children: [
        {
          path: '/finance/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/finance/policies',
      children: [
        {
          path: '/finance/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/fee-types',
      children: [
        {
          path: '/finance/setup-fees/fee-types',
          element: <FeeTypes />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/other-fees',
      children: [
        {
          path: '/finance/setup-fees/other-fees',
          element: <OtherFees />,
        },
      ],
    },
    {
      path: '/finance/other-fees/invoice-formats',
      children: [
        {
          path: '/finance/other-fees/invoice-formats',
          element: <InvoiceNumberFormats />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/other-fee/:id',
      children: [
        {
          path: '/finance/setup-fees/other-fee/:id',
          element: <OtherFee />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/k-12',
      children: [
        {
          path: '/finance/setup-fees/k-12',
          element: <K12FeeSetup />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/college',
      children: [
        {
          path: '/finance/setup-fees/college',
          element: <CollegeFeeSetup />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/tesda',
      children: [
        {
          path: '/finance/setup-fees/tesda',
          element: <TesdaFeeSetup />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/tuition-and-fees',
      children: [
        {
          path: '/finance/setup-fees/tuition-and-fees',
          element: <TuitionAndFees />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/fee',
      children: [
        {
          path: '/finance/setup-fees/fee',
          element: <Fee />,
        },
      ],
    },
    {
      path: '/finance/setup-fees/fees/:id',
      children: [
        {
          path: '/finance/setup-fees/fees/:id',
          element: <SingleK12Fee />,
        },
      ],
    },
    {
      path: '/finance/assessments',
      children: [
        {
          path: '/finance/assessments',
          element: <Assessments />,
        },
      ],
    },
    {
      path: '/finance/profile',
      children: [
        {
          path: '/finance/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/finance/grants-and-vouchers',
      children: [
        {
          path: '/finance/grants-and-vouchers',
          element: <GrantsAndVouchers />,
        },
      ],
    },
    {
      path: '/finance/grants-and-vouchers/grant-number-format',
      children: [
        {
          path: '/finance/grants-and-vouchers/grant-number-format',
          element: <GrantNumberFormat />,
        },
      ],
    },
    {
      path: '/finance/grant-and-vouchers/students/:id',
      children: [
        {
          path: '/finance/grant-and-vouchers/students/:id',
          element: <StudentsGrantsAndVouchersPage />,
        },
      ],
    },
    {
      path: '/finance/payment-schemes/k-12',
      children: [
        {
          path: '/finance/payment-schemes/k-12',
          element: <K12PaymentScheme />,
        },
      ],
    },
    {
      path: '/finance/financial-assistance',
      children: [
        {
          path: '/finance/financial-assistance',
          element: <FinancialAssistance />,
        },
      ],
    },
    {
      path: '/finance/discounts',
      children: [
        {
          path: '/finance/discounts',
          element: <Discounts />,
        },
      ],
    },
    {
      path: '/finance/finance-settings/bank-accounts',
      children: [
        {
          path: '/finance/finance-settings/bank-accounts',
          element: <BankAccountNos />,
        },
      ],
    },
    {
      path: '/finance/or-settings/void-or-no',
      children: [
        {
          path: '/finance/or-settings/void-or-no',
          element: <VoidORNumbers />,
        },
      ],
    },
    {
      path: '/finance/students/accounts',
      children: [
        {
          path: '/finance/students/accounts',
          element: <Accounts />,
        },
      ],
    },
    {
      path: '/finance/students/invoices',
      children: [
        {
          path: '/finance/students/invoices',
          element: <Invoices />,
        },
      ],
    },
    {
      path: '/finance/students/payments',
      children: [
        {
          path: '/finance/students/payments',
          element: <Payments />,
        },
      ],
    },
    {
      path: '/finance/finance-settings/reports',
      children: [
        {
          path: '/finance/finance-settings/reports',
          element: <Reports />,
        },
      ],
    },
    {
      path: '/finance/finance-settings/reports-account-nos',
      children: [
        {
          path: '/finance/finance-settings/reports-account-nos',
          element: <ReportAccountNos />,
        },
      ],
    },
    {
      path: '/finance/or-settings/or-summary-list',
      children: [
        {
          path: '/finance/or-settings/or-summary-list',
          element: <ORSummaryList />,
        },
      ],
    },
    {
      path: '/finance/students/cancel-payments',
      children: [
        {
          path: '/finance/students/cancel-payments',
          element: <CancelPayments />,
        },
      ],
    },
    {
      path: '/finance/students/promissory-notes',
      children: [
        {
          path: '/finance/students/promissory-notes',
          element: <PromissoryNotes />,
        },
        {
          path: '/finance/students/promissory-notes/:id',
          element: <SinglePromissoryNote />,
        },
      ],
    },
    {
      path: '/finance/fiscal-year',
      children: [
        {
          path: '/finance/fiscal-year',
          element: <FiscalYear />,
        },
      ],
    },
    {
      path: '/finance/chart-of-account',
      children: [
        {
          path: '/finance/chart-of-account',
          element: <ChartOfAccount />,
        },
      ],
    },
    {
      path: '/finance/chart-of-account/account',
      children: [
        {
          path: '/finance/chart-of-account/account',
          element: <Account />,
        },
      ],
    },
    {
      path: '/finance/account-configuration',
      children: [
        {
          path: '/finance/account-configuration',
          element: <AccountConfiguration />,
        },
      ],
    },
  ],
};

export default FinanceRoutes;
