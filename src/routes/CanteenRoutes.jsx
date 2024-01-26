import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/canteen/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/canteen/dashboard'))
);
// const Profile = Loadable(lazy(() => import('src/components/hr/user/UserProfile')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const UnderConstruction = Loadable(
  lazy(() => import('src/views/maintenance/UnderConstruction'))
);

const Products = Loadable(
  lazy(() => import('src/views/canteen/products/view-all'))
);
const ManageBuyOrder = Loadable(
  lazy(() => import('src/views/canteen/orders/manage/ManageBuyOrder'))
);
const ManageSellOrder = Loadable(
  lazy(() => import('src/views/canteen/orders/manage/ManageSellOrder'))
);
const BuyOrders = Loadable(
  lazy(() => import('src/views/canteen/orders/view-all/BuyOrders'))
);
const SellOrders = Loadable(
  lazy(() => import('src/views/canteen/orders/view-all/SellOrders'))
);
const BuyOrder = Loadable(
  lazy(() => import('src/views/canteen/orders/view-one/BuyOrder'))
);
const SellOrder = Loadable(
  lazy(() => import('src/views/canteen/orders/view-one/SellOrder'))
);

const CanteenRoutes = {
  path: '/canteen',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/canteen/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/canteen/users',
      element: <UnderConstruction />,
    },
    {
      path: '/canteen/sell',
      element: <ManageSellOrder />,
    },
    {
      path: '/canteen/sell/:id',
      element: <ManageSellOrder />,
    },
    {
      path: '/canteen/buy',
      element: <ManageBuyOrder />,
    },
    {
      path: '/canteen/buy/:id',
      element: <ManageBuyOrder />,
    },
    {
      path: '/canteen/orders',
      children: [
        {
          path: 'sales',
          element: <SellOrders />,
        },
        {
          path: 'sales/:id',
          element: <SellOrder />,
        },
        {
          path: 'purchases',
          element: <BuyOrders />,
        },
        {
          path: 'purchases/:id',
          element: <BuyOrder />,
        },
      ],
    },
    {
      path: '/canteen/products',
      element: <Products />,
    },
    {
      path: '/canteen/inventory',
      element: <UnderConstruction />,
    },
    {
      path: '/canteen/canteen-reports',
      children: [
        {
          path: 'reports',
          element: <UnderConstruction />,
        },
        {
          path: 'reports-account-nos',
          element: <UnderConstruction />,
        },
      ],
    },
  ],
};

export default CanteenRoutes;
