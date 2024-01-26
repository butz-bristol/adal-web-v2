import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/admissions/ProtectedRoute';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/admissions/dashboard'))
);
const AdmissionsApplicants = Loadable(
  lazy(() => import('src/views/admissions/applicants'))
);
const StudentProfile = Loadable(
  lazy(() => import('src/components/admissions/StudentProfile'))
);
const Students = Loadable(
  lazy(() => import('src/views/registrar/registration/students'))
);
const PendingRequirements = Loadable(
  lazy(() => import('src/views/registrar/registration/pending-requirements'))
);

const CreateApplicant = Loadable(
  lazy(() => import('src/views/admissions/create-applicant'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const Scholarships = Loadable(
  lazy(() => import('src/views/admissions/scholarships'))
);
const StudentScholarships = Loadable(
  lazy(() => import('src/views/admissions/student-scholarships'))
);

const AdmissionsRoutes = {
  path: '/admissions',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/admissions/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/admissions/dashboard',
      children: [
        {
          path: '/admissions/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/admissions/applicants',
      children: [
        {
          path: '/admissions/applicants',
          element: <AdmissionsApplicants />,
        },
        {
          path: '/admissions/applicants/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/admissions/create-applicant',
      children: [
        {
          path: '/admissions/create-applicant',
          element: <CreateApplicant />,
        },
      ],
    },
    {
      path: '/admissions/students',
      children: [
        {
          path: '/admissions/students',
          element: <Students />,
        },
        {
          path: '/admissions/students/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/admissions/pending-requirements',
      children: [
        {
          path: '/admissions/pending-requirements',
          element: <PendingRequirements />,
        },
        {
          path: '/admissions/pending-requirements/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/admissions/profile',
      children: [
        {
          path: '/admissions/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/admissions/student-scholarship',
      children: [
        {
          path: '/admissions/student-scholarship',
          element: <Scholarships />,
        },
        {
          path: '/admissions/student-scholarship/:id',
          element: <StudentScholarships />,
        },
      ],
    },
  ],
};

export default AdmissionsRoutes;
