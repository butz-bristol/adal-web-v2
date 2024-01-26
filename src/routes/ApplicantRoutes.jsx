import { lazy } from 'react';

import ApplicantLayout from 'src/layout/ApplicantLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/applicant/ProtectedRoute';

const Profile = Loadable(
  lazy(() => import('src/views/applicant/account-settings'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));

const ApplicantRoutes = {
  path: '/applicant',
  element: (
    <ProtectedRoute>
      <ApplicantLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/applicant/profile',
      children: [
        {
          path: '/applicant/profile',
          element: <Profile />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
};

export default ApplicantRoutes;
