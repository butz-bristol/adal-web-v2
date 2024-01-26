import { lazy } from 'react';
// project imports
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/hr/ProtectedRoute';

// routing
const DashboardDefault = Loadable(lazy(() => import('src/views/hr/dashboard')));
const DepartmentsDefault = Loadable(
  lazy(() => import('src/views/hr/departments'))
);
const EmployeeDesignations = Loadable(
  lazy(() => import('src/views/hr/employees/designations'))
);
const EmployeeHandbook = Loadable(
  lazy(() => import('src/views/hr/employees/handbook'))
);
const Employees = Loadable(
  lazy(() => import('src/views/hr/employees/view-all'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/hr/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/hr/announcements/events'))
);
const AnnouncementHoliday = Loadable(
  lazy(() => import('src/views/hr/announcements/holidays'))
);
const LeaveCategory = Loadable(
  lazy(() => import('src/views/hr/leave/category'))
);
const LeaveAssign = Loadable(lazy(() => import('src/views/hr/leave/assign')));
const LeaveApply = Loadable(lazy(() => import('src/views/hr/leave/apply')));
const LeaveApplication = Loadable(
  lazy(() => import('src/views/hr/leave/application'))
);
const Policies = Loadable(lazy(() => import('src/views/hr/policies')));
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/hr/organizational-structure'))
);
const Jobs = Loadable(lazy(() => import('src/views/hr/job-openings/jobs')));
const CreateJob = Loadable(
  lazy(() => import('src/views/hr/job-openings/create'))
);
const JobApplicants = Loadable(
  lazy(() => import('src/views/hr/job-openings/job-applicants'))
);
const CutOffs = Loadable(lazy(() => import('src/views/hr/payroll/cut-offs')));
const TimeSheet = Loadable(
  lazy(() => import('src/views/hr/payroll/timesheet'))
);
const SalaryGradeGuide = Loadable(
  lazy(() => import('src/views/hr/payroll/salary-grade-guide'))
);
const SalaryCutOff = Loadable(
  lazy(() => import('src/views/hr/payroll/salary-cutoff'))
);
const ManageCompensation = Loadable(
  lazy(() => import('src/views/hr/payroll/manage-compensation'))
);
const SetupSalary = Loadable(
  lazy(() => import('src/views/hr/payroll/setup-salary'))
);
const Paygroups = Loadable(
  lazy(() => import('src/views/hr/payroll/paygroups'))
);
const Payslips = Loadable(lazy(() => import('src/views/hr/payroll/payslips')));
const Overtime = Loadable(lazy(() => import('src/views/hr/payroll/overtime')));
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const EmployeeProfile = Loadable(
  lazy(() => import('src/views/hr/employee-profile'))
);

const NotFound = Loadable(lazy(() => import('src/views/maintenance')));

const HrRoutes = {
  path: '/hr',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/hr/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/hr/dashboard',
      children: [
        {
          path: '/hr/dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: '/hr/departments',
      children: [
        {
          path: '/hr/departments',
          element: <DepartmentsDefault />,
        },
      ],
    },
    {
      path: '/hr/employees/designations',
      children: [
        {
          path: '/hr/employees/designations',
          element: <EmployeeDesignations />,
        },
      ],
    },
    {
      path: '/hr/employees/handbook',
      children: [
        {
          path: '/hr/employees/handbook',
          element: <EmployeeHandbook />,
        },
      ],
    },
    {
      path: '/hr/employees/view-all',
      children: [
        {
          path: '/hr/employees/view-all',
          element: <Employees />,
        },
      ],
    },
    {
      path: '/hr/announcements/notice',
      children: [
        {
          path: '/hr/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/hr/announcements/events',
      children: [
        {
          path: '/hr/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/hr/announcements/holidays',
      children: [
        {
          path: '/hr/announcements/holidays',
          element: <AnnouncementHoliday />,
        },
      ],
    },
    {
      path: '/hr/leave/category',
      children: [
        {
          path: '/hr/leave/category',
          element: <LeaveCategory />,
        },
      ],
    },
    {
      path: '/hr/leave/assign',
      children: [
        {
          path: '/hr/leave/assign',
          element: <LeaveAssign />,
        },
      ],
    },
    {
      path: '/hr/leave/apply',
      children: [
        {
          path: '/hr/leave/apply',
          element: <LeaveApply />,
        },
      ],
    },
    {
      path: '/hr/leave/application',
      children: [
        {
          path: '/hr/leave/application',
          element: <LeaveApplication />,
        },
      ],
    },
    {
      path: '/hr/policies',
      children: [
        {
          path: '/hr/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/hr/organizational-structure',
      children: [
        {
          path: '/hr/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/hr/job-opening/jobs',
      children: [
        {
          path: '/hr/job-opening/jobs',
          element: <Jobs />,
        },
      ],
    },
    {
      path: '/hr/job-opening/create',
      children: [
        {
          path: '/hr/job-opening/create',
          element: <CreateJob />,
        },
      ],
    },
    {
      path: '/hr/job-opening/job-applicants',
      children: [
        {
          path: '/hr/job-opening/job-applicants',
          element: <JobApplicants />,
        },
      ],
    },
    {
      path: '/hr/payroll/cut-offs',
      children: [
        {
          path: '/hr/payroll/cut-offs',
          element: <CutOffs />,
        },
      ],
    },
    {
      path: '/hr/payroll/timesheet',
      children: [
        {
          path: '/hr/payroll/timesheet',
          element: <TimeSheet />,
        },
      ],
    },
    {
      path: '/hr/payroll/salary-grade-guide',
      children: [
        {
          path: '/hr/payroll/salary-grade-guide',
          element: <SalaryGradeGuide />,
        },
      ],
    },
    {
      path: '/hr/payroll/salary-cutoff',
      children: [
        {
          path: '/hr/payroll/salary-cutoff',
          element: <SalaryCutOff />,
        },
      ],
    },

    {
      path: '/hr/payroll/setup-salary',
      children: [
        {
          path: '/hr/payroll/setup-salary',
          element: <SetupSalary />,
        },
      ],
    },
    {
      path: '/hr/payroll/paygroups',
      children: [
        {
          path: '/hr/payroll/paygroups',
          element: <Paygroups />,
        },
      ],
    },
    {
      path: '/hr/payroll/payslips',
      children: [
        {
          path: '/hr/payroll/payslips',
          element: <Payslips />,
        },
      ],
    },
    {
      path: '/hr/payroll/overtime',
      children: [
        {
          path: '/hr/payroll/overtime',
          element: <Overtime />,
        },
      ],
    },
    {
      path: '/hr/payroll/manage-compensations',
      children: [
        {
          path: '/hr/payroll/manage-compensations',
          element: <ManageCompensation />,
        },
      ],
    },
    {
      path: '/hr/profile',
      element: <Profile />,
    },
    {
      path: '/hr/employee-profile/:id',
      children: [
        {
          path: '/hr/employee-profile/:id',
          element: <EmployeeProfile />,
        },
      ],
    },
  ],
};

export default HrRoutes;
