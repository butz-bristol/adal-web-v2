import {
  IconAdjustments,
  IconAtom2,
  IconBackpack,
  IconBuildingBank,
  IconCards,
  IconCash,
  IconCpu2,
  IconDashboard,
  IconDatabase,
  IconDeviceLandlinePhone,
  IconDiscount2,
  IconFileInvoice,
  IconGiftCard,
  IconList,
  IconListCheck,
  IconLockCancel,
  IconMask,
  IconReportAnalytics,
  IconSchool,
  IconSeeding,
  IconSettingsCog,
  IconSquareX,
  IconTool,
  IconUserSearch,
  IconUsers
} from '@tabler/icons-react';

const dashboard = {
  id: 'finance module',
  title: 'Finance Module',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/finance/dashboard',
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
          url: '/finance/setup-fees/fee-types',
          icon: IconMask,
          breadcrumbs: true
        },
        {
          id: 'other-fees',
          title: 'Other Payments',
          type: 'item',
          url: '/finance/setup-fees/other-fees',
          icon: IconAtom2,
          breadcrumbs: true
        },
        {
          id: 'k-12',
          title: 'K-12',
          type: 'item',
          url: '/finance/setup-fees/k-12',
          icon: IconBackpack,
          breadcrumbs: true
        },
        {
          id: 'college',
          title: 'College',
          type: 'item',
          url: '/finance/setup-fees/college',
          icon: IconSchool,
          breadcrumbs: true
        },
        {
          id: 'tesda',
          title: 'Tesda',
          type: 'item',
          url: '/finance/setup-fees/tesda',
          icon: IconCpu2,
          breadcrumbs: true
        },
        {
          id: 'tuition-and-fees',
          title: 'Tuition and Fees',
          type: 'item',
          url: '/finance/setup-fees/tuition-and-fees',
          icon: IconSeeding,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'payment-schemes',
      title: 'Payment Schemes',
      type: 'collapse',
      icon: IconListCheck,
      children: [
        {
          id: 'k-12-payment-schemes',
          title: 'K-12 Payment Schemes',
          type: 'item',
          url: '/finance/payment-schemes/k-12',
          icon: IconBackpack,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'credit-memo',
      title: 'Credit Memo',
      type: 'collapse',
      icon: IconDatabase,
      children: [
        {
          id: 'financial-assistance',
          title: 'Financial Assistance',
          type: 'item',
          url: '/finance/financial-assistance',
          icon: IconCards,
          breadcrumbs: true
        },
        {
          id: 'grants-and-vouchers',
          title: 'Grants & Vouchers',
          type: 'item',
          url: '/finance/grants-and-vouchers',
          icon: IconGiftCard,
          breadcrumbs: true
        },
        {
          id: 'discounts',
          title: 'Discounts',
          type: 'item',
          url: '/finance/discounts',
          icon: IconDiscount2,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'assessments',
      title: 'Assessments',
      type: 'item',
      url: '/finance/assessments',
      icon: IconDashboard,
      breadcrumbs: true
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
          url: '/finance/students/accounts',
          icon: IconUserSearch,
          breadcrumbs: true
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/finance/students/invoices',
          icon: IconFileInvoice,
          breadcrumbs: true
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/finance/students/payments',
          icon: IconCash,
          breadcrumbs: true
        },
        {
          id: 'cancel-payments',
          title: 'Cancel Payments',
          type: 'item',
          url: '/finance/students/cancel-payments',
          icon: IconSquareX,
          breadcrumbs: true
        },
        {
          id: 'promissory-notes',
          title: 'Promissory Notes',
          type: 'item',
          url: '/finance/students/promissory-notes',
          icon: IconReportAnalytics,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'finance-settings',
      title: 'Finance Settings',
      type: 'collapse',
      icon: IconSettingsCog,
      children: [
        {
          id: 'bank-accounts',
          title: 'Bank Accounts',
          type: 'item',
          url: '/finance/finance-settings/bank-accounts',
          icon: IconBuildingBank,
          breadcrumbs: true
        },
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/finance/finance-settings/reports',
          icon: IconReportAnalytics,
          breadcrumbs: true
        },
        {
          id: 'reports-account-nos',
          title: 'Reports Account Nos.',
          type: 'item',
          url: '/finance/finance-settings/reports-account-nos',
          icon: IconDeviceLandlinePhone,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'or-settings',
      title: 'OR Settings',
      type: 'collapse',
      icon: IconTool,
      children: [
        {
          id: 'or-summary-list',
          title: 'OR Summary List',
          type: 'item',
          url: '/finance/or-settings/or-summary-list',
          icon: IconList,
          breadcrumbs: true
        },
        {
          id: 'void-or-no',
          title: 'Void Receipts Nos.',
          type: 'item',
          url: '/finance/or-settings/void-or-no',
          icon: IconLockCancel,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'accounting-settings',
      title: 'Accounting Settings',
      type: 'collapse',
      icon: IconTool,
      children: [
        {
          id: 'fiscal-year',
          title: 'Fiscal Year',
          type: 'item',
          url: '/finance/fiscal-year',
          icon: IconUsers,
          breadcrumbs: true
        },
        {
          id: 'chart-of-account',
          title: 'Chart of Account List',
          type: 'item',
          url: '/finance/chart-of-account',
          icon: IconUsers,
          breadcrumbs: true
        },
        {
          id: 'account-configuration',
          title: 'Account configuration',
          type: 'item',
          url: '/finance/account-configuration',
          icon: IconUsers,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
