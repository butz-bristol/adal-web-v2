import { lazy } from 'react';
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/registrar/ProtectedRoute';

const DashboardDefault = Loadable(
  lazy(() => import('src/views/registrar/dashboard'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);

// ** Registration **

const PreRegistrations = Loadable(
  lazy(() => import('src/views/registrar/registration/pre-registrations'))
);
const PendingRequirements = Loadable(
  lazy(() => import('src/views/registrar/registration/pending-requirements'))
);
const Students = Loadable(
  lazy(() => import('src/views/registrar/registration/students'))
);

// ** Enrollment **

const PreEnrollments = Loadable(
  lazy(() => import('src/views/registrar/enrollment/pre-enrollments'))
);
const Enlistments = Loadable(
  lazy(() => import('src/views/registrar/enrollment/enroll'))
);
const StudentAssessments = Loadable(
  lazy(() => import('src/views/registrar/enrollment/assessments'))
);
const Enrollments = Loadable(
  lazy(() => import('src/views/registrar/enrollment/students'))
);
const StudentWithPendingRequirements = Loadable(
  lazy(() => import('src/components/registrar/StudentWithPendingRequirements'))
);
const K12EnrollmentFormPreview = Loadable(
  lazy(() => import('src/components/registrar/K12EnrollmentFormPreview'))
);
const CollegeEnrollmentFormPreview = Loadable(
  lazy(() => import('src/components/registrar/PDFPreviewCollegeEnrollmentForm'))
);
const EnrolledStudents = Loadable(
  lazy(() => import('src/views/registrar/enrollment/enrolled-students'))
);

// ** Admissions/Student Profiles **

const StudentProfile = Loadable(
  lazy(() => import('src/components/admissions/StudentProfile'))
);
const AdmissionsApplicants = Loadable(
  lazy(() => import('src/views/admissions/applicants'))
);
const CreateApplicant = Loadable(
  lazy(() => import('src/views/admissions/create-applicant'))
);

// ** Registrar Settings **

const Semesters = Loadable(lazy(() => import('src/views/registrar/semesters')));
const AcademicYear = Loadable(
  lazy(() => import('src/views/registrar/academic-year'))
);
const YearLevel = Loadable(
  lazy(() => import('src/views/registrar/year-level'))
);
const CollegeTrack = Loadable(
  lazy(() => import('src/views/registrar/college-and-track'))
);
const Department = Loadable(
  lazy(() => import('src/views/registrar/departments'))
);
const Sections = Loadable(lazy(() => import('src/views/academics/sections')));
const Section = Loadable(
  lazy(() => import('src/components/academics/Section'))
);

const StudentGrantsAndVouchers = Loadable(
  lazy(() => import('src/views/finance/grants-and-vouchers'))
);
const StudentsGrantsAndVouchersPage = Loadable(
  lazy(() => import('src/components/finance/StudentsGrantsAndVouchers'))
);
const GrantsOrVoucherFormatPage = Loadable(
  lazy(() => import('src/components/registrar/GrantsOrVoucherFormat'))
);
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));

// ** Reports **

const EnrollmemtReports = Loadable(
  lazy(() => import('src/views/registrar/reports/enrollment-report'))
);

const RegistrarRoutes = {
  path: '/registrar',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/registrar/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/registrar/create-applicant',
      children: [
        {
          path: '/registrar/create-applicant',
          element: <CreateApplicant />,
        },
      ],
    },
    {
      path: '/registrar/applicants',
      children: [
        {
          path: '/registrar/applicants',
          element: <AdmissionsApplicants />,
        },
        {
          path: '/registrar/applicants/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/registrar/dashboard',
      children: [
        {
          path: '/registrar/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/registrar/pre-registrations',
      children: [
        {
          path: '/registrar/pre-registrations',
          element: <PreRegistrations />,
        },
        {
          path: '/registrar/pre-registrations/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/registrar/pending-requirements',
      children: [
        {
          path: '/registrar/pending-requirements',
          element: <PendingRequirements />,
        },
        {
          path: '/registrar/pending-requirements/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/registrar/students',
      children: [
        {
          path: '/registrar/students',
          element: <Students />,
        },
        {
          path: '/registrar/students/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/registrar/department',
      children: [
        {
          path: '/registrar/department',
          element: <Department />,
        },
      ],
    },
    {
      path: '/registrar/year-level',
      children: [
        {
          path: '/registrar/year-level',
          element: <YearLevel />,
        },
      ],
    },

    {
      path: '/registrar/semesters',
      children: [
        {
          path: '/registrar/semesters',
          element: <Semesters />,
        },
      ],
    },
    {
      path: '/registrar/academic-year',
      children: [
        {
          path: '/registrar/academic-year',
          element: <AcademicYear />,
        },
      ],
    },
    {
      path: '/registrar/sections',
      children: [
        {
          path: '/registrar/sections',
          element: <Sections />,
        },
        {
          path: '/registrar/sections/:id',
          element: <Section />,
        },
      ],
    },
    {
      path: '/registrar/college-and-track',
      children: [
        {
          path: '/registrar/college-and-track',
          element: <CollegeTrack />,
        },
      ],
    },
    {
      path: '/registrar/profile',
      children: [
        {
          path: '/registrar/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/registrar/pre-enrollments',
      children: [
        {
          path: '/registrar/pre-enrollments',
          element: <PreEnrollments />,
        },
      ],
    },
    {
      path: '/registrar/assessments',
      children: [
        {
          path: '/registrar/assessments',
          element: <StudentAssessments />,
        },
      ],
    },
    {
      path: '/registrar/enrollments',
      children: [
        {
          path: '/registrar/enrollments',
          element: <Enrollments />,
        },
      ],
    },
    {
      path: '/registrar/enrolled-students',
      children: [
        {
          path: '/registrar/enrolled-students',
          element: <EnrolledStudents />,
        },
      ],
    },
    {
      path: '/registrar/grant-and-vouchers/students/:id',
      children: [
        {
          path: '/registrar/grant-and-vouchers/students/:id',
          element: <StudentsGrantsAndVouchersPage />,
        },
      ],
    },
    {
      path: '/registrar/grants-and-vouchers',
      children: [
        {
          path: '/registrar/grants-and-vouchers',
          element: <StudentGrantsAndVouchers />,
        },
        {
          path: '/registrar/grants-and-vouchers/grant-number-format',
          element: <GrantsOrVoucherFormatPage />,
        },
      ],
    },
    {
      path: '/registrar/enlistments',
      children: [
        {
          path: '/registrar/enlistments',
          element: <Enlistments />,
        },
        {
          path: '/registrar/enlistments/k-12-preview',
          element: <K12EnrollmentFormPreview />,
        },
        {
          path: '/registrar/enlistments/college-preview',
          element: <CollegeEnrollmentFormPreview />,
        },
      ],
    },
    {
      path: '/registrar/reports/enrollment-reports',
      children: [
        {
          path: '/registrar/reports/enrollment-reports',
          element: <EnrollmemtReports />,
        },
      ],
    },
  ],
};

export default RegistrarRoutes;
