import { lazy } from 'react';

// project imports
import MinimalLayout from 'src/layout/MinimalLayout';
import Loadable from 'src/ui-component/Loadable';

// login option 3 routing
const AuthAdmin = Loadable(lazy(() => import('src/views/login/admin')));
const AuthStudent = Loadable(lazy(() => import('src/views/login/student')));
const AuthApplicant = Loadable(lazy(() => import('src/views/login/applicant')));
const Application = Loadable(lazy(() => import('src/views/admission-form')));

const IndividualAdmissionsForm = Loadable(
  lazy(() => import('src/components/applicant/IndividualAdmissionsForm'))
);
const MultipleAdmissionsForm = Loadable(
  lazy(() => import('src/components/applicant/MultipleAdmissionsForm'))
);

const Homepage = Loadable(lazy(() => import('src/views/homepage')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/login',
      element: <AuthStudent />,
    },
    {
      path: '/about-us',
      element: <Homepage />,
    },
    {
      path: '/contact-us',
      element: <Homepage />,
    },
    {
      path: '/management',
      element: <AuthAdmin />,
    },
    {
      path: '/applicants',
      element: <AuthApplicant />,
    },
    {
      path: '/enroll',
      element: <Application />,
    },
    {
      path: '/enroll/individual',
      element: <IndividualAdmissionsForm />,
    },
    {
      path: '/enroll/applications',
      element: <MultipleAdmissionsForm />,
    },
  ],
};

export default AuthenticationRoutes;
