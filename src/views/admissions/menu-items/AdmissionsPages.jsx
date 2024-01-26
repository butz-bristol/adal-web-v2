import {
  IconLayoutDashboard,
  IconAddressBook,
  IconSchool,
  IconUserPlus,
  IconListDetails,
  IconListCheck,
  IconUserCheck
} from '@tabler/icons-react';

const admissionsDashboard = {
  id: 'AdmissionsPages',
  title: 'Admissions Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admissions/dashboard',
      icon: IconLayoutDashboard,
      breadcrumbs: false
    },
    {
      id: 'create-applicant',
      title: 'Create Applicant',
      type: 'item',
      url: '/admissions/create-applicant',
      icon: IconUserPlus,
      breadcrumbs: true
    },
    {
      id: 'registration',
      title: 'Students',
      type: 'collapse',
      icon: IconAddressBook,
      children: [
        {
          id: 'pre-registrations',
          title: 'Applicants',
          type: 'item',
          url: '/admissions/applicants',
          icon: IconUserCheck,
          breadcrumbs: true
        },
        {
          id: 'students',
          title: 'Registered Students',
          type: 'item',
          url: '/admissions/students',
          icon: IconListCheck,
          breadcrumbs: true
        },
        {
          id: 'pending-requirements',
          title: 'Pending Requirements',
          type: 'item',
          url: '/admissions/pending-requirements',
          icon: IconListDetails,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'student-scholarship',
      title: 'Scholarship',
      type: 'item',
      url: '/admissions/student-scholarship',
      icon: IconSchool,
      breadcrumbs: true
    }
  ]
};

export default admissionsDashboard;
