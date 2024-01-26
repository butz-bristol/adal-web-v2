import { IconCalendarPlus, IconStarsFilled, IconCalendarStats, IconCalendarEvent } from '@tabler/icons-react';

const Grading = {
  id: 'grading-setup',
  title: 'Grading',
  type: 'group',
  icon: IconStarsFilled,
  children: [
    {
      id: 'grading-schedule',
      title: 'Grading Schedule',
      type: 'item',
      url: '/academics/grading/grading-schedule',
      icon: IconCalendarPlus
    },
    {
      id: 'verification-schedule',
      title: 'Verification Schedule',
      type: 'item',
      url: '/academics/grading/verification-schedule',
      icon: IconCalendarStats
    },
    {
      id: 'viewing-schedule',
      title: 'Viewing Schedule',
      type: 'item',
      url: '/academics/grading/viewing-schedule',
      icon: IconCalendarEvent
    }
  ]
};

export default Grading;
