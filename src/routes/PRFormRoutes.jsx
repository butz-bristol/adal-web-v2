import { lazy } from 'react';

// project imports
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/procurement/ProtectedRoute';

const PRForm = Loadable(
  lazy(() => import('src/views/procurement/users/PRForm'))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PRFormRoutes = {
  path: '/PRForm',
  element: (
    <ProtectedRoute>
      <PRForm />
    </ProtectedRoute>
  ),
  /*
  children: [
    {
      path: '/PRForm',
      element: <PRForm />
    }
  ]
  */
};

export default PRFormRoutes;
