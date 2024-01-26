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
  IconCheckbox,
  IconClipboardList,
  IconShoppingCart,
  IconCreditCard,
  IconShoppingCartPlus,
  IconScale,
  IconShoppingBag,
  IconTruckDelivery,
  IconNotes,
  IconCategory
} from '@tabler/icons-react'; //https://tabler-icons.io/

// constant
const icons = {
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
  IconCheckbox,
  IconClipboardList,
  IconShoppingCart,
  IconCreditCard,
  IconShoppingCartPlus,
  IconScale,
  IconShoppingBag,
  IconTruckDelivery,
  IconNotes,
  IconCategory
};

// ==============================|| HR MENU ITEMS ||============================== //

const dashboard = {
  id: 'ProcurementPages',
  title: 'Procurement Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/procurement/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },

    {
      id: 'Procurement_administration',
      title: 'Administration',
      type: 'collapse',
      icon: icons.IconGavel,
      children: [
        {
          id: 'inventory',
          title: 'Inventory',
          type: 'item',
          url: '/procurement/items/view-all',
          icon: icons.IconClipboardList,
          breadcrumbs: true
        },
        {
          id: 'category',
          title: 'Categories',
          type: 'collapse',
          icon: icons.IconCategory,
          children: [
            {
              id: 'official_categories',
              title: 'Official Categories',
              type: 'item',
              url: '/procurement/items/categories',
              breadcrumbs: true
            },
            {
              id: 'suggested_categories',
              title: 'Suggested Categories',
              type: 'item',
              url: '/procurement/items/categories/suggested',
              breadcrumbs: true
            }
          ]
        },
        {
          id: 'purchase_requests',
          title: 'Purchase Requests',
          type: 'item',
          url: '/procurement/purchase-requests',
          icon: icons.IconShoppingCart,
          breadcrumbs: true
        },
        {
          id: 'for_quotation',
          title: 'For Quotation',
          type: 'item',
          url: '/procurement/admin/for-quotation',
          icon: icons.IconNotes,
          breadcrumbs: true
        },
        {
          id: 'purchase_orders',
          title: 'Purchase Orders',
          type: 'item',
          url: '/procurement/admin/purchase-orders',
          icon: icons.IconShoppingBag,
          breadcrumbs: true
        },
        {
          id: 'for_delivery',
          title: 'For Delivery',
          type: 'item',
          icon: icons.IconTruckDelivery,
          url: '/procurement/admin/for-delivery'
        }
      ]
    },
    {
      id: 'announcements',
      title: 'Announcements',
      type: 'collapse',
      icon: icons.IconSpeakerphone,
      children: [
        {
          id: 'notice',
          title: 'Notice',
          type: 'item',
          url: '/procurement/announcements/notice',
          icon: icons.IconPinned,
          breadcrumbs: true
        },
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          url: '/procurement/announcements/events',
          icon: icons.IconCalendarEvent,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'Procurement',
      title: 'Procurement',
      type: 'collapse',
      icon: icons.IconCreditCard,
      children: [
        {
          id: 'request_item',
          title: 'Request Item',
          type: 'item',
          icon: icons.IconShoppingCartPlus,
          url: '/pRForm'
        },
        {
          id: 'user_requests',
          title: 'Purchase Requests',
          type: 'item',
          icon: icons.IconShoppingCart,
          url: '/procurement/users/view-all'
        },
        {
          id: 'for_evaluation',
          title: 'For Evaluation',
          type: 'item',
          icon: icons.IconScale,
          url: '/procurement/users/for-evaluation'
        },
        {
          id: 'for_delivery',
          title: 'For Delivery',
          type: 'item',
          icon: icons.IconTruckDelivery,
          url: '/procurement/users/for-delivery'
        },
        {
          id: 'inventory',
          title: 'Inventory',
          type: 'item',
          url: '/procurement/users/items/view-all',
          icon: icons.IconClipboardList,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
