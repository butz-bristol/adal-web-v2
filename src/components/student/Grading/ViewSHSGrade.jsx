import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { calculateTotalGrade } from 'src/utils/helperFunctions';

const ViewSHSGrade = () => {
  const { student_report } = useSelector((state) => state.students);

  const indentSubjects = ['Music', 'Arts', 'Physical Education', 'Health'];
  const firstSemesterPeriod = [
    { label: '1st', value: 'first_period' },
    { label: '2nd', value: 'second_period' },
  ];
  const secondSemesterPeriod = [
    { label: '3rd', value: 'third_period' },
    { label: '4th', value: 'fourth_period' },
  ];
  const firstSemesterSubjects = student_report?.subjects.filter(
    (item) => item.subject.semester.semester_term === '1st Semester'
  );
  const secondSemesterSubjects = student_report?.subjects.filter(
    (item) => item.subject.semester.semester_term === '2nd Semester'
  );

  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="h4">1st Semester</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell align="center">1st</TableCell>
              <TableCell align="center">2nd</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firstSemesterSubjects.map((item, subjectIndex) => {
              const totalGradeInfo = calculateTotalGrade(item);
              return (
                <TableRow key={subjectIndex}>
                  <TableCell width={500}>
                    <Typography
                      ml={
                        indentSubjects.includes(item.subject?.subject_name) && 5
                      }
                    >
                      {item.subject?.subject_name}
                    </Typography>
                  </TableCell>
                  {firstSemesterPeriod.map((periodItem, periodIndex) => (
                    <TableCell key={periodIndex} align="center">
                      {student_report.subjects[subjectIndex][
                        periodItem.value
                      ] || ''}
                    </TableCell>
                  ))}
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="h4">2nd Semester</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">3rd</TableCell>
              <TableCell align="center">4th</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {secondSemesterSubjects.map((item, subjectIndex) => {
              const totalGradeInfo = calculateTotalGrade(item);
              return (
                <TableRow key={subjectIndex}>
                  <TableCell width={500}>
                    <Typography
                      ml={
                        indentSubjects.includes(item.subject?.subject_name) && 5
                      }
                    >
                      {item.subject?.subject_name}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  {secondSemesterPeriod.map((periodItem, periodIndex) => (
                    <TableCell key={periodIndex} align="center">
                      {student_report.subjects[subjectIndex][
                        periodItem.value
                      ] || ''}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ViewSHSGrade;
