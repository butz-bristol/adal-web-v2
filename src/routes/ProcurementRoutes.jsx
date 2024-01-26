import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/procurement/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/procurement/dashboard'))
);
const Items = Loadable(
  lazy(() => import('src/views/procurement/items/view-all'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/procurement/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/procurement/announcements/events'))
);
const PRForm = Loadable(
  lazy(() => import('src/views/procurement/users/PRForm'))
);
const DepartmentInventory = Loadable(
  lazy(() => import('src/views/procurement/users/DepartmentInventory'))
);
const UserRequests = Loadable(
  lazy(() => import('src/views/procurement/users/view-all'))
);
const PurchaseRequests = Loadable(
  lazy(() => import('src/views/procurement/admin/view-all'))
);
const EvaluateRequests = Loadable(
  lazy(() => import('src/views/procurement/users/for-evaluation'))
);
const PurchaseOrders = Loadable(
  lazy(() => import('src/views/procurement/admin/purchase-orders'))
);
const ForDelivery = Loadable(
  lazy(() => import('src/views/procurement/users/for-delivery'))
);
const ForQuotation = Loadable(
  lazy(() => import('src/views/procurement/admin/for-quotation'))
);
const ForDeliveryAdmin = Loadable(
  lazy(() => import('src/views/procurement/admin/for-delivery'))
);
const UserItems = Loadable(
  lazy(() => import('src/views/procurement/users/items/view-all'))
);
const Categories = Loadable(
  lazy(() => import('src/views/procurement/categories/view-all'))
);
const SuggestedCategories = Loadable(
  lazy(() => import('src/views/procurement/categories/suggested'))
);
const ViewItemDetails = Loadable(
  lazy(() => import('src/views/procurement/users/view-detail'))
);

const procurementRoutes = {
  path: '/procurement',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/procurement/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '/procurement/dashboard',
      children: [
        {
          path: '/procurement/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },

    {
      path: '/procurement/Items/view-all',
      children: [
        {
          path: '/procurement/Items/view-all',
          element: <Items />,
        },
      ],
    },

    {
      path: '/procurement/purchase-requests',
      children: [
        {
          path: '/procurement/purchase-requests',
          element: <PurchaseRequests />,
        },
      ],
    },

    {
      path: '/procurement/admin/for-quotation',
      children: [
        {
          path: '/procurement/admin/for-quotation',
          element: <ForQuotation />,
        },
      ],
    },
    {
      path: '/procurement/admin/for-delivery',
      children: [
        {
          path: '/procurement/admin/for-delivery',
          element: <ForDeliveryAdmin />,
        },
      ],
    },

    {
      path: '/procurement/announcements/notice',
      children: [
        {
          path: '/procurement/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/procurement/announcements/events',
      children: [
        {
          path: '/procurement/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },

    {
      path: '/procurement/profile',
      children: [
        {
          path: '/procurement/profile',
          element: <Profile />,
        },
      ],
    },

    {
      path: 'procurement/users/DepartmentInventory',
      children: [
        {
          path: 'procurement/users/DepartmentInventory',
          element: <DepartmentInventory />,
        },
      ],
    },
    {
      path: '/procurement/users/view-all',
      children: [
        {
          path: '/procurement/users/view-all',
          element: <UserRequests />,
        },
      ],
    },
    {
      path: '/procurement/users/for-evaluation',
      children: [
        {
          path: '/procurement/users/for-evaluation',
          element: <EvaluateRequests />,
        },
      ],
    },
    {
      path: '/procurement/users/for-delivery',
      children: [
        {
          path: '/procurement/users/for-delivery',
          element: <ForDelivery />,
        },
      ],
    },
    {
      path: '/procurement/admin/purchase-orders',
      children: [
        {
          path: '/procurement/admin/purchase-orders',
          element: <PurchaseOrders />,
        },
      ],
    },
    {
      path: '/procurement/users/items/view-all',
      children: [
        {
          path: '/procurement/users/items/view-all',
          element: <UserItems />,
        },
      ],
    },
    {
      path: '/procurement/items/categories',
      children: [
        {
          path: '/procurement/items/categories',
          element: <Categories />,
        },
      ],
    },
    {
      path: '/procurement/items/categories/suggested',
      children: [
        {
          path: '/procurement/items/categories/suggested',
          element: <SuggestedCategories />,
        },
      ],
    },
    {
      path: '/procurement/users/items/view-detail',
      children: [
        {
          path: '/procurement/users/items/view-detail/:id',
          element: <ViewItemDetails />,
        },
      ],
    },
  ],
};

export default procurementRoutes;
