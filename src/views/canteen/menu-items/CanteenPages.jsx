import {
  IconDashboard,
  IconReportAnalytics,
  IconSettingsCog,
  IconDeviceLandlinePhone,
  IconShoppingCart,
  IconClipboard,
  IconTag,
  IconTruckDelivery,
  IconUsers,
  IconNews
} from '@tabler/icons-react';

const dashboard = {
  id: 'CanteenPages',
  title: 'canteen Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/canteen/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/canteen/users',
      icon: IconUsers,
      breadcrumbs: true
    },
    {
      id: 'sell',
      title: 'Sell',
      type: 'item',
      url: '/canteen/sell',
      icon: IconShoppingCart,
      breadcrumbs: true
    },
    {
      id: 'buy',
      title: 'Buy',
      type: 'item',
      url: '/canteen/buy',
      icon: IconTruckDelivery,
      breadcrumbs: true
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'collapse',
      icon: IconNews,
      children: [
        {
          id: 'sales',
          title: 'Sales Orders',
          type: 'item',
          url: '/canteen/orders/sales',
          icon: IconShoppingCart,
          breadcrumbs: true
        },
        {
          id: 'purchases',
          title: 'Purchase Orders',
          type: 'item',
          url: '/canteen/orders/purchases',
          icon: IconTruckDelivery,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/canteen/products',
      icon: IconTag,
      breadcrumbs: true
    },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/canteen/inventory',
      icon: IconClipboard,
      breadcrumbs: true
    },
    {
      id: 'canteen-reports',
      title: 'Canteen Reports',
      type: 'collapse',
      icon: IconSettingsCog,
      children: [
        {
          id: 'reports',
          title: 'Reports',
          type: 'item',
          url: '/canteen/canteen-reports/reports',
          icon: IconReportAnalytics,
          breadcrumbs: true
        },
        {
          id: 'reports-account-nos',
          title: 'Reports Account Nos.',
          type: 'item',
          url: '/canteen/canteen-reports/reports-account-nos',
          icon: IconDeviceLandlinePhone,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
