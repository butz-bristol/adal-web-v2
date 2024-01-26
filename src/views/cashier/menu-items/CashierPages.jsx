import {
  IconDashboard,
  IconUsers,
  IconUserSearch,
  IconFileInvoice,
  IconCash,
  IconReportAnalytics,
  IconSettingsCog,
  IconDeviceLandlinePhone,
  IconLockCancel,
  IconList,
  IconTool
} from '@tabler/icons-react';

const dashboard = {
  id: 'CashierPages',
  title: 'Cashier Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/cashier/dashboard',
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
          url: '/cashier/students/accounts',
          icon: IconUserSearch,
          breadcrumbs: true
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/cashier/students/invoices',
          icon: IconFileInvoice,
          breadcrumbs: true
        },
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/cashier/students/payments',
          icon: IconCash,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'cashier-reports',
      title: 'Cashier Reports',
      type: 'collapse',
      icon: IconSettingsCog,
      children: [
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/cashier/cashier-reports/reports',
          icon: IconReportAnalytics,
          breadcrumbs: true
        },
        {
          id: 'reports-account-nos',
          title: 'Reports Account Nos.',
          type: 'item',
          url: '/cashier/cashier-reports/reports-account-nos',
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
          url: '/cashier/or-settings/or-summary-list',
          icon: IconList,
          breadcrumbs: true
        },
        {
          id: 'void-or-no',
          title: 'Void Receipts Nos.',
          type: 'item',
          url: '/cashier/or-settings/void-or-no',
          icon: IconLockCancel,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
