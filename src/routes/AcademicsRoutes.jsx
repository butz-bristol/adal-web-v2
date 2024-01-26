import { lazy } from 'react';
// project imports
import CollegeStudentGrades from 'src/components/academics/Teacher/CollegeStudentGrades';
import AdminLayout from 'src/layout/AdminLayout';
import Loadable from 'src/ui-component/Loadable';
import ProtectedRoute from 'src/views/academics/ProtectedRoute';
import ComingSoon1 from 'src/views/maintenance/ComingSoon/ComingSoon1';

// routing
const DashboardDefault = Loadable(
  lazy(() => import('src/views/academics/dashboard'))
);
const Curriculum = Loadable(
  lazy(() => import('src/views/academics/curriculum'))
);
const Programs = Loadable(lazy(() => import('src/views/academics/programs')));
const Subjects = Loadable(lazy(() => import('src/views/academics/subjects')));
const Rooms = Loadable(lazy(() => import('src/views/academics/rooms')));
const EmployeeHandbook = Loadable(
  lazy(() => import('src/views/academics/employees/handbook'))
);
const AnnouncementNotice = Loadable(
  lazy(() => import('src/views/academics/announcements/notice'))
);
const AnnouncementEvents = Loadable(
  lazy(() => import('src/views/academics/announcements/events'))
);
const AnnouncementHoliday = Loadable(
  lazy(() => import('src/views/academics/announcements/holidays'))
);
const LeaveApply = Loadable(
  lazy(() => import('src/views/academics/leave/apply'))
);
const Policies = Loadable(lazy(() => import('src/views/academics/policies')));
const OrganizationalStructure = Loadable(
  lazy(() => import('src/views/academics/organizational-structure'))
);
const Profile = Loadable(
  lazy(() => import('src/components/hr/user/UserProfile'))
);
const Sections = Loadable(lazy(() => import('src/views/academics/sections')));
const ClassScheduler = Loadable(
  lazy(() => import('src/views/academics/class-scheduler'))
);
const Section = Loadable(
  lazy(() => import('src/components/academics/Section'))
);
const Students = Loadable(lazy(() => import('src/views/academics/students')));
const StudentProfile = Loadable(
  lazy(() => import('src/components/admissions/StudentProfile'))
);
const Teachers = Loadable(lazy(() => import('src/views/academics/teachers')));
const NotFound = Loadable(lazy(() => import('src/views/maintenance')));
const TeachingLoad = Loadable(
  lazy(() => import('src/views/academics/teacher-assignment'))
);
const TeacherClass = Loadable(
  lazy(() => import('src/views/academics/teacher/classes'))
);
const GradingSchedule = Loadable(
  lazy(() => import('src/views/academics/grading/GradingSchedule'))
);
const VerificationSchedule = Loadable(
  lazy(() => import('src/views/academics/grading/VerificationSchedule'))
);
const ViewingSchedule = Loadable(
  lazy(() => import('src/views/academics/grading/ViewingSchedule'))
);
const TeachingLoads = Loadable(
  lazy(() => import('src/components/academics/Teacher/TeachingLoad'))
);
const K12StudentGrades = Loadable(
  lazy(() => import('src/components/academics/Teacher/K12StudentGrades'))
);

const AcademicsRoutes = {
  path: '/academics',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    //Admin
    {
      path: '/academics/analytics',
      element: <ComingSoon1 />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/academics/dashboard',
      children: [
        {
          path: '/academics/dashboard',
          element: <ComingSoon1 />,
        },
      ],
    },
    {
      path: '/academics/curriculum',
      children: [
        {
          path: '/academics/curriculum',
          element: <Curriculum />,
        },
      ],
    },
    {
      path: '/academics/programs',
      children: [
        {
          path: '/academics/programs',
          element: <Programs />,
        },
      ],
    },
    {
      path: '/academics/sections',
      children: [
        {
          path: '/academics/sections',
          element: <Sections />,
        },
        {
          path: '/academics/sections/:id',
          element: <Section />,
        },
        {
          path: '/academics/sections/:id/:id',
          element: <Section />,
        },
      ],
    },
    {
      path: '/academics/scheduler',
      children: [
        {
          path: '/academics/scheduler',
          element: <ClassScheduler />,
        },
      ],
    },
    {
      path: '/academics/teachers',
      children: [
        {
          path: '/academics/teachers',
          element: <Teachers />,
        },
      ],
    },
    {
      path: '/academics/teaching-load',
      children: [
        {
          path: '/academics/teaching-load',
          element: <TeachingLoad />,
        },
      ],
    },
    {
      path: '/academics/students',
      children: [
        {
          path: '/academics/students',
          element: <Students />,
        },
        {
          path: '/academics/students/:id',
          element: <StudentProfile />,
        },
      ],
    },
    {
      path: '/academics/subjects',
      children: [
        {
          path: '/academics/subjects',
          element: <Subjects />,
        },
      ],
    },
    {
      path: '/academics/rooms',
      children: [
        {
          path: '/academics/rooms',
          element: <Rooms />,
        },
      ],
    },
    {
      path: '/academics/handbook',
      children: [
        {
          path: '/academics/handbook',
          element: <EmployeeHandbook />,
        },
      ],
    },
    {
      path: '/academics/announcements/notice',
      children: [
        {
          path: '/academics/announcements/notice',
          element: <AnnouncementNotice />,
        },
      ],
    },
    {
      path: '/academics/announcements/events',
      children: [
        {
          path: '/academics/announcements/events',
          element: <AnnouncementEvents />,
        },
      ],
    },
    {
      path: '/academics/announcements/holidays',
      children: [
        {
          path: '/academics/announcements/holidays',
          element: <AnnouncementHoliday />,
        },
      ],
    },
    {
      path: '/academics/leave/apply',
      children: [
        {
          path: '/academics/leave/apply',
          element: <LeaveApply />,
        },
      ],
    },
    {
      path: '/academics/policies',
      children: [
        {
          path: '/academics/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/academics/organizational-structure',
      children: [
        {
          path: '/academics/organizational-structure',
          element: <OrganizationalStructure />,
        },
      ],
    },
    {
      path: '/academics/policies',
      children: [
        {
          path: '/academics/policies',
          element: <Policies />,
        },
      ],
    },
    {
      path: '/academics/profile',
      children: [
        {
          path: '/academics/profile',
          element: <Profile />,
        },
      ],
    },
    //Teachers
    {
      path: '/academics/teacher/classes',
      children: [
        {
          path: '/academics/teacher/classes',
          element: <TeacherClass />,
        },
      ],
    },
    {
      path: '/academics/teacher/students',
      children: [
        {
          path: '/academics/teacher/students',
          element: <Students />,
        },
      ],
    },
    {
      path: '/academics/teacher/class-schedule',
      children: [
        {
          path: '/academics/teacher/class-schedule',
          element: <ClassScheduler />,
        },
      ],
    },
    {
      path: '/academics/grading/grading-schedule',
      children: [
        {
          path: '/academics/grading/grading-schedule',
          element: <GradingSchedule />,
        },
      ],
    },
    {
      path: '/academics/grading/verification-schedule',
      children: [
        {
          path: '/academics/grading/verification-schedule',
          element: <VerificationSchedule />,
        },
      ],
    },
    {
      path: '/academics/grading/viewing-schedule',
      children: [
        {
          path: '/academics/grading/viewing-schedule',
          element: <ViewingSchedule />,
        },
      ],
    },
    {
      path: '/academics/announcements',
      element: <ComingSoon1 />,
    },
    {
      path: '/academics/academic-calendar',
      element: <ComingSoon1 />,
    },
    {
      path: '/academics/events',
      element: <ComingSoon1 />,
    },
    {
      path: '/academics/teaching-loads',
      element: <TeachingLoads />,
    },
    {
      path: '/academics/teaching-loads',
      children: [
        {
          path: '/academics/teaching-loads',
          element: <TeachingLoads />,
        },
        {
          path: '/academics/teaching-loads/k12/:id',
          element: <K12StudentGrades />,
        },
        {
          path: '/academics/teaching-loads/college/:id',
          element: <CollegeStudentGrades />,
        },
      ],
    },
  ],
};

export default AcademicsRoutes;
