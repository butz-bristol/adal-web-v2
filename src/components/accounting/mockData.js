const preSchool = [
  {
    id: 1,
    name: 'Nursery 1',
    category: 'Pre-School'
  },
  {
    id: 2,
    name: 'Nursery 2',
    category: 'Pre-School'
  },
  {
    id: 3,
    name: 'Kindergarten',
    category: 'Pre-School'
  }
];

const gradeSchool = [
  {
    id: 1,
    name: 'Grade 1',
    category: 'Grade School'
  },
  {
    id: 2,
    name: 'Grade 2',
    category: 'Grade School'
  },
  {
    id: 3,
    name: 'Grade 3',
    category: 'Grade School'
  },
  {
    id: 4,
    name: 'Grade 4',
    category: 'Grade School'
  },
  {
    id: 5,
    name: 'Grade 5',
    category: 'Grade School'
  },
  {
    id: 6,
    name: 'Grade 6',
    category: 'Grade School'
  }
];

const juniorHighSchool = [
  {
    id: 1,
    name: 'Grade 7',
    category: 'JHS'
  },
  {
    id: 2,
    name: 'Grade 8',
    category: 'JHS'
  },
  {
    id: 3,
    name: 'Grade 9',
    category: 'JHS'
  },
  {
    id: 4,
    name: 'Grade 10',
    category: 'JHS'
  },
  {
    id: 5,
    name: 'Grade 7 Diamond',
    category: 'JHS'
  },
  {
    id: 6,
    name: 'Grade 8 Diamond',
    category: 'JHS'
  },
  {
    id: 7,
    name: 'Grade 9 Diamond',
    category: 'JHS'
  },
  {
    id: 8,
    name: 'Grade 10 Diamond',
    category: 'JHS'
  }
];

const seniorHighSchool = [
  {
    id: 1,
    name: 'Grade 11 - ABM',
    category: 'SHS'
  },
  {
    id: 2,
    name: 'Grade 11 - HUMSS',
    category: 'SHS'
  },
  {
    id: 3,
    name: 'Grade 11 - STEM',
    category: 'SHS'
  },
  {
    id: 4,
    name: 'Grade 11 - TECHVOC (HOME ECONOMICS)',
    category: 'SHS'
  },
  {
    id: 5,
    name: 'Grade 11 - Techvoc (Information Communication Technology)',
    category: 'SHS'
  },
  {
    id: 6,
    name: 'Grade 12 - ABM',
    category: 'SHS'
  },
  {
    id: 7,
    name: 'Grade 12 - HUMSS',
    category: 'SHS'
  },
  {
    id: 8,
    name: 'Grade 12 - STEM',
    category: 'SHS'
  },
  {
    id: 9,
    name: 'Grade 12 - TECHVOC (HOME ECONOMICS)',
    category: 'SHS'
  },
  {
    id: 10,
    name: 'Grade 12 - Techvoc (Information Communication Technology)',
    category: 'SHS'
  }
];

const college = [
  {
    id: 1,
    name: 'Collge of Business and Accountancy',
    category: 'College'
  },
  {
    id: 2,
    name: 'College of Computer Studies',
    category: 'College'
  },
  {
    id: 3,
    name: 'College of Engineering',
    category: 'College'
  },
  {
    id: 4,
    name: 'College of Hospitality and Tourism Management',
    category: 'College'
  },
  {
    id: 5,
    name: 'College of Industrial Technology',
    category: 'College'
  }
];

export const allLevels = [...preSchool, ...gradeSchool, ...juniorHighSchool, ...seniorHighSchool, ...college];

// {
//   applies_to === 'Grade School' &&
//     gradeSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'JHS' &&
//     juniorHighSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'SHS' &&
//     seniorHighSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'College' &&
//     college.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }

// {
//   applies_to === 'Pre-School' &&
//     preSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }

// {
//   applies_to === 'Grade School' &&
//     gradeSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'JHS' &&
//     juniorHighSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'SHS' &&
//     seniorHighSchool.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
// {
//   applies_to === 'College' &&
//     college.map((section) => (
//       <MenuItem key={section.id} value={section.name}>
//         {section.name}
//       </MenuItem>
//     ));
// }
