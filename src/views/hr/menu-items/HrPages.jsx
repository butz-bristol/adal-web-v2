import {
  IconDashboard,
  IconBuildingCommunity,
  IconClipboardCheck,
  IconFolders,
  IconUsers,
  IconCalendarEvent,
  IconSpeakerphone,
  IconCalendar,
  IconPinned,
  IconLayoutGrid,
  IconUserCheck,
  IconBox,
  IconShieldLock,
  IconHierarchy2,
  IconBriefcase,
  IconUserExclamation,
  IconCirclePlus,
  IconListDetails,
  IconCash,
  IconChartCandle,
  IconReport,
  IconFileAnalytics,
  IconClock,
  IconAlarm,
  IconCashBanknote
} from '@tabler/icons-react';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

// =====|| HR MENU ITEMS ||=====//

const dashboard = {
  id: 'HrPages',
  title: 'HR Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/hr/dashboard',
      icon: IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'departments',
      title: 'Departments',
      type: 'item',
      url: '/hr/departments',
      icon: IconBuildingCommunity,
      breadcrumbs: true
    },
    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      icon: IconUsers,
      children: [
        {
          id: 'designations',
          title: 'Designations',
          type: 'item',
          url: '/hr/employees/designations',
          icon: IconClipboardCheck,
          breadcrumbs: true
        },
        {
          id: 'handbook',
          title: 'Handbook',
          type: 'item',
          url: '/hr/employees/handbook',
          icon: IconFolders,
          breadcrumbs: true
        },
        {
          id: 'view-employees',
          title: 'View All',
          type: 'item',
          url: '/hr/employees/view-all',
          icon: IconUsers,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'announcements',
      title: 'Announcements',
      type: 'collapse',
      icon: IconSpeakerphone,
      children: [
        {
          id: 'notice',
          title: 'Notice',
          type: 'item',
          url: '/hr/announcements/notice',
          icon: IconPinned,
          breadcrumbs: true
        },
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          url: '/hr/announcements/events',
          icon: IconCalendarEvent,
          breadcrumbs: true
        },
        {
          id: 'holidays',
          title: 'Holidays',
          type: 'item',
          url: '/hr/announcements/holidays',
          icon: IconCalendar,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'leave-application',
      title: 'Leave Application',
      type: 'collapse',
      icon: IconBox,
      children: [
        {
          id: 'category',
          title: 'Leave Category',
          type: 'item',
          url: '/hr/leave/category',
          icon: IconLayoutGrid,
          breadcrumbs: true
        },
        {
          id: 'assign',
          title: 'Assign Leave Allocation',
          type: 'item',
          url: '/hr/leave/assign',
          icon: IconUserCheck,
          breadcrumbs: true
        },
        {
          id: 'apply',
          title: 'Apply for Leave',
          type: 'item',
          url: '/hr/leave/apply',
          icon: IconCalendar,
          breadcrumbs: true
        },
        {
          id: 'application',
          title: 'Leave Application',
          type: 'item',
          url: '/hr/leave/application',
          icon: IconBox,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'policies',
      title: 'Policies',
      type: 'item',
      url: '/hr/policies',
      icon: IconShieldLock,
      breadcrumbs: true
    },
    {
      id: 'organizational-structure',
      title: 'Organizational Structure',
      type: 'item',
      url: '/hr/organizational-structure',
      icon: IconHierarchy2,
      breadcrumbs: true
    },
    {
      id: 'job-openings',
      title: 'Job Openings',
      type: 'collapse',
      icon: IconBriefcase,
      children: [
        {
          id: 'jobs',
          title: 'View Job',
          type: 'item',
          url: '/hr/job-opening/jobs',
          icon: IconListDetails,
          breadcrumbs: true
        },
        {
          id: 'create-job',
          title: 'Create Job',
          type: 'item',
          url: '/hr/job-opening/create',
          icon: IconCirclePlus,
          breadcrumbs: true
        },
        {
          id: 'job-applicants',
          title: 'Job Applicants',
          type: 'item',
          url: '/hr/job-opening/job-applicants',
          icon: IconUserExclamation,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'payroll',
      title: 'Payroll',
      type: 'collapse',
      icon: IconCash,
      children: [
        {
          id: 'cutoffs',
          title: 'Cut Offs',
          type: 'item',
          url: '/hr/payroll/cut-offs',
          icon: IconChartCandle,
          breadcrumbs: true
        },
        {
          id: 'timesheet',
          title: 'Time Sheet',
          type: 'item',
          url: '/hr/payroll/timesheet',
          icon: IconReport,
          breadcrumbs: true
        },
        {
          id: 'salary-grade-guide',
          title: 'Salary Grade Guide',
          type: 'item',
          url: '/hr/payroll/salary-grade-guide',
          icon: IconFileAnalytics,
          breadcrumbs: true
        },
        {
          id: 'salary-cutoff',
          title: 'Set up Salary Cut Offs',
          type: 'item',
          url: '/hr/payroll/salary-cutoff',
          icon: IconClock,
          breadcrumbs: true
        },
        {
          id: 'manage-compensations',
          title: 'Manage compensations',
          type: 'item',
          url: '/hr/payroll/manage-compensations',
          icon: IconCash,
          breadcrumbs: true
        },
        {
          id: 'setup-salary',
          title: 'Setup Salary',
          type: 'item',
          url: '/hr/payroll/setup-salary',
          icon: PointOfSaleIcon,
          breadcrumbs: true
        },
        {
          id: 'paygroups',
          title: 'Paygroups',
          type: 'item',
          url: '/hr/payroll/paygroups',
          icon: Diversity2Icon,
          breadcrumbs: true
        },
        {
          id: 'payslips',
          title: 'Payslips',
          type: 'item',
          url: '/hr/payroll/payslips',
          icon: IconCashBanknote,
          breadcrumbs: true
        },
        {
          id: 'overtime',
          title: 'Overtime',
          type: 'item',
          url: '/hr/payroll/overtime',
          icon: IconAlarm,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default dashboard;
