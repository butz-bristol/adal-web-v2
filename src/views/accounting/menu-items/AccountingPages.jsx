import {
  IconDashboard,
  IconAdjustments,
  IconBackpack,
  IconSchool,
  IconCpu2,
  IconMask,
  IconAtom2,
  IconSeeding,
  IconUsers,
  IconUserSearch,
  IconFileInvoice,
  IconCash,
  IconSettingsCog,
  IconBuildingBank,
  IconReportAnalytics,
  IconDeviceLandlinePhone
} from '@tabler/icons-react';

const dashboard = {
  id: 'accounting module',
  title: 'Accounting Module',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/accounting/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'setup-fees',
      title: 'Setup Fees',
      type: 'collapse',
      icon: IconAdjustments,
      children: [
        {
          id: 'fee-types',
          title: 'Fee Types',
          type: 'item',
          url: '/accounting/setup-fees/fee-types',
          icon: IconMask,
          breadcrumbs: true
        },
        {
          id: 'other-fees',
          title: 'Other Fees',
          type: 'item',
          url: '/accounting/setup-fees/other-fees',
          icon: IconAtom2,
          breadcrumbs: true
        },
        {
          id: 'k-12',
          title: 'K-12',
          type: 'item',
          url: '/accounting/setup-fees/k-12',
          icon: IconBackpack,
          breadcrumbs: true
        },
        {
          id: 'college',
          title: 'College',
          type: 'item',
          url: '/accounting/setup-fees/college',
          icon: IconSchool,
          breadcrumbs: true
        },
        {
          id: 'tesda',
          title: 'Tesda',
          type: 'item',
          url: '/accounting/setup-fees/tesda',
          icon: IconCpu2,
          breadcrumbs: true
        },
        {
          id: 'tuition-and-fees',
          title: 'Tuition and Fees',
          type: 'item',
          url: '/accounting/setup-fees/tuition-and-fees',
          icon: IconSeeding,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'students',
      title: 'Students',
      type: 'collapse',
      icon: IconUsers,
      children: [
        {
          id: 'accounts',
          title: 'Accounts',
          type: 'item',
          url: '/accounting/students/accounts',
          icon: IconUserSearch,
          breadcrumbs: true
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/accounting/students/invoices',
          icon: IconFileInvoice,
          breadcrumbs: true
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/accounting/students/payments',
          icon: IconCash,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'accounting-settings',
      title: 'Accounting Settings',
      type: 'collapse',
      icon: IconSettingsCog,
      children: [
        {
          id: 'bank-accounts',
          title: 'Bank Accounts',
          type: 'item',
          url: '/accounting/accounting-settings/bank-accounts',
          icon: IconBuildingBank,
          breadcrumbs: true
        },
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/accounting/accounting-reports/reports',
          icon: IconReportAnalytics,
          breadcrumbs: true
        },
        {
          id: 'reports-account-nos',
          title: 'Reports Account Nos.',
          type: 'item',
          url: '/accounting/accounting-reports/reports-account-nos',
          icon: IconDeviceLandlinePhone,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
