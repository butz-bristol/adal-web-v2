import { lazy } from 'react';

// project imports
import Loadable from 'src/ui-component/Loadable';

// login option 3 routing
const AdmissionForm = Loadable(lazy(() => import('src/views/admission-form')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AdmissionFormRoutes = {
  path: '/admission-form',
  element: <AdmissionForm />,
  children: [
    {
      path: '/admission-form',
      element: <AdmissionForm />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default AdmissionFormRoutes;
