import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ViewCollegeGrade = () => {
  const { student_report } = useSelector((state) => state.students);

  const period = [
    { label: 'Prelim', value: 'prelim' },
    { label: 'Midterm', value: 'midterm' },
    { label: 'Final', value: 'final' },
    { label: 'Final Grade', value: 'finalGrade' }
  ];

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
                  <Typography>{item.subject?.course_name}</Typography>
                </TableCell>
                {period.map((periodItem, periodIndex) => (
                  <TableCell key={periodIndex} align="center">
                    {student_report?.subjects[subjectIndex][periodItem.value]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ViewCollegeGrade;
