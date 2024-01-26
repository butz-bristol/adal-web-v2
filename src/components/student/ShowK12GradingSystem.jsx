import { useDispatch, useSelector } from 'react-redux';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ShowK12GradingSystem = () => {
  const dispatch = useDispatch();

  const { studentRecords } = useSelector((state) => state.academics);
  const {
    studentProfile: { student_yearlevel }
  } = useSelector((state) => state.admissions);
  const filterStudentRecord = studentRecords?.filter((record) => record.level?._id === student_yearlevel?._id)[0];

  const getGradeByPeriod = (grades, period, index) => {
    const grade = grades.find((item) => item.period === period);
    return <Typography variant="body1">{grade.grade}</Typography>;
  };

  const calculateAverage = (grades) => {
    const totalGrades = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return grades.length > 0 ? Math.round((totalGrades / grades.length).toFixed(2)) : '-';
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subjects</TableCell>
            <TableCell align="center">1st</TableCell>
            <TableCell align="center">2nd</TableCell>
            <TableCell align="center">3rd</TableCell>
            <TableCell align="center">4th</TableCell>
            <TableCell align="center">Average</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterStudentRecord?.subjects?.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject.subject_course?.subject_name}</TableCell>
              <TableCell align="center">{getGradeByPeriod(subject.grades, '1st', index)}</TableCell>
              <TableCell align="center">{getGradeByPeriod(subject.grades, '2nd', index)}</TableCell>
              <TableCell align="center">{getGradeByPeriod(subject.grades, '3rd', index)}</TableCell>
              <TableCell align="center">{getGradeByPeriod(subject.grades, '4th', index)}</TableCell>
              <TableCell align="center">
                <Typography variant="body1">{calculateAverage(subject.grades)}</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowK12GradingSystem;
