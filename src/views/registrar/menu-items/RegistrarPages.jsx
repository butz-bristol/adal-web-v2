import {
  IconAddressBook,
  IconDashboard,
  IconFileSpreadsheet,
  IconForms,
  IconListCheck,
  IconListDetails,
  IconListSearch,
  IconSettingsCog,
  IconTransferIn,
  IconUserCheck,
  IconUserPlus,
  IconUsers,
  IconGiftCard,
  IconApps,
  IconLayoutList,
  IconCalendar,
  IconBuilding,
  IconTrack,
  IconDeviceAnalytics,
  IconCalendarTime,
  IconArchive,
  IconFolders
} from '@tabler/icons-react';
import Groups3Icon from '@mui/icons-material/Groups3';

const registrarDashboard = {
  id: 'RegistrarPages',
  title: 'Registrar Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/registrar/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'applications',
      title: 'Applications',
      type: 'collapse',
      icon: IconApps,
      children: [
        {
          id: 'create-applicant',
          title: 'Create Applicant',
          type: 'item',
          url: '/registrar/create-applicant',
          icon: IconUserPlus,
          breadcrumbs: true
        },
        {
          id: 'applicants',
          title: 'Applicants',
          type: 'item',
          url: '/registrar/applicants',
          icon: IconListSearch,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'registration',
      title: 'Registration',
      type: 'collapse',
      icon: IconAddressBook,
      children: [
        {
          id: 'pre-registrations',
          title: 'Pre-Registrations',
          type: 'item',
          url: '/registrar/pre-registrations',
          icon: IconUserCheck,
          breadcrumbs: true
        },
        {
          id: 'students',
          title: 'Registered Students',
          type: 'item',
          url: '/registrar/students',
          icon: IconListCheck,
          breadcrumbs: true
        },
        {
          id: 'pending-requirements',
          title: 'Pending Requirements',
          type: 'item',
          url: '/registrar/pending-requirements',
          icon: IconListDetails,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'enrollment',
      title: 'Enrollment',
      type: 'collapse',
      icon: IconTransferIn,
      children: [
        {
          id: 'pre-enrollments',
          title: 'Pre-Enrollments',
          type: 'item',
          url: '/registrar/pre-enrollments',
          icon: IconFileSpreadsheet,
          breadcrumbs: true
        },
        {
          id: 'enlistments',
          title: 'Enlistments',
          type: 'item',
          url: '/registrar/enlistments',
          icon: IconForms,
          breadcrumbs: true
        },
        {
          id: 'assessments',
          title: 'Assessments',
          type: 'item',
          url: '/registrar/assessments',
          icon: Groups3Icon,
          breadcrumbs: true
        },
        {
          id: 'enrolled-students',
          title: 'Enrolled Students',
          type: 'item',
          url: '/registrar/enrolled-students',
          icon: IconLayoutList,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'students',
      title: 'Student Records',
      type: 'collapse',
      icon: IconUsers,
      children: [
        {
          id: 'grants-and-vouchers',
          title: 'Grants & Vouchers',
          type: 'item',
          url: '/registrar/grants-and-vouchers',
          icon: IconGiftCard,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'RegistrarSettings-page',
      title: 'Registrar Settings',
      type: 'collapse',
      icon: IconSettingsCog,
      children: [
        {
          id: 'academic-year',
          title: 'Academic Year',
          type: 'item',
          url: '/registrar/academic-year',
          icon: IconCalendar,
          breadcrumbs: true
        },
        {
          id: 'department',
          title: 'Departments',
          type: 'item',
          url: '/registrar/department',
          icon: IconBuilding,
          breadcrumbs: true
        },
        {
          id: 'college-and-track',
          title: 'College & Track',
          type: 'item',
          url: '/registrar/college-and-track',
          icon: IconTrack,
          breadcrumbs: true
        },
        {
          id: 'year-level',
          title: 'Year & Levels',
          type: 'item',
          url: '/registrar/year-level',
          icon: IconDeviceAnalytics,
          breadcrumbs: true
        },
        {
          id: 'semesters',
          title: 'Semesters',
          type: 'item',
          url: '/registrar/semesters',
          icon: IconCalendarTime,
          breadcrumbs: true
        },
        {
          id: 'sections',
          title: 'Sections',
          type: 'item',
          url: '/registrar/sections',
          icon: IconBuilding,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'collapse',
      icon: IconFileSpreadsheet,
      children: [
        {
          id: 'enrollment-reports',
          title: 'Enrollment',
          type: 'item',
          url: '/registrar/reports/enrollment-reports',
          icon: IconGiftCard,
          breadcrumbs: true
        },
        {
          id: 'student-directory',
          title: 'Student Directory',
          type: 'item',
          url: '/registrar/reports/student-directory',
          icon: IconFolders,
          breadcrumbs: true
        },
        {
          id: 'transcripts-of-records',
          title: 'TOR',
          type: 'item',
          url: '/registrar/reports/transcripts-of-records',
          icon: IconArchive,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default registrarDashboard;
