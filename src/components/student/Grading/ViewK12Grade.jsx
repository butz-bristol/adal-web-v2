import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ViewK12Grade = () => {
  const { student_report } = useSelector((state) => state.students);

  const period = [
    { label: '1st', value: 'first_period' },
    { label: '2nd', value: 'second_period' },
    { label: '3rd', value: 'third_period' },
    { label: '4th', value: 'fourth_period' }
  ];
  const PSLevel = ['Nursery 1', 'Nursery 2', 'Kindergarten'];
  const indentSubjects = ['Music', 'Arts', 'Physical Education', 'Health'];
  const rating = [
    {
      grade: '90-100',
      label: 'O'
    },
    {
      grade: '85-89',
      label: 'VS'
    },
    {
      grade: '80-84',
      label: 'S'
    }
  ];

  const getLabelForGrade = (grade) => {
    if (grade >= 90) {
      return 'O';
    } else if (grade >= 85) {
      return 'VS';
    } else if (grade >= 80) {
      return 'S';
    } else if (grade < 80) {
      return 'S';
    } else {
      return ''; // Default label if no match is found
    }
  };

  return (
    <Grid container component={Paper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subjects</TableCell>
              {period.map((item, index) => (
                <TableCell key={index}>{item.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {student_report?.subjects?.map((item, subjectIndex) => (
              <TableRow key={subjectIndex}>
                <TableCell width={500}>
                  <Typography ml={indentSubjects.includes(item.subject?.subject_name) && 5}>{item.subject?.subject_name}</Typography>
                </TableCell>
                {period.map((periodItem, periodIndex) => (
                  <TableCell key={periodIndex} align="center">
                    {PSLevel.includes(student_report?.year_level?.year_level_name)
                      ? getLabelForGrade(student_report?.subjects[subjectIndex][periodItem.value]) || ''
                      : student_report?.subjects[subjectIndex][periodItem.value] || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {PSLevel.includes(student_report.year_level?.year_level_name) && (
        <Grid container item xs={12} spacing={2} m={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Guide for rating:</Typography>
          </Grid>
          {rating.map((item, index) => (
            <Grid item key={index} xs={3}>
              <Typography variant="h5">{item.grade}</Typography>
              <Typography variant="caption">{item.label}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ViewK12Grade;
