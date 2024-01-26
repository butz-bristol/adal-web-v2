import { useDispatch, useSelector } from 'react-redux';

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconSquarePlus } from '@tabler/icons-react';
import {
  setGrade,
  toggleAddGrade,
  toggleEditGrade,
} from 'src/features/academicFeatures/academicSlice';
import SubjectGradeModal from './SubjectGradeModal';

const K12GradingSystem = () => {
  const dispatch = useDispatch();

  const { studentRecord } = useSelector((state) => state.academics);

  const getGradeByPeriod = (grades, period, index) => {
    const grade = grades.find((item) => item.period === period);
    return grade ? (
      grade.status === 'Completed' ? (
        <Typography variant="body1">{grade.grade}</Typography>
      ) : (
        <Tooltip title="Edit Grade">
          <Typography
            variant="body1"
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(toggleEditGrade());
              dispatch(
                setGrade({
                  period: period,
                  subjectIndex: index,
                  _id: studentRecord?._id,
                  grade: grade.grade,
                  status: grade.status,
                  gradeIndex: grades.indexOf(grade),
                })
              );
            }}
          >
            {grade.grade}
          </Typography>
        </Tooltip>
      )
    ) : (
      <Tooltip title="Add Grade">
        <IconButton
          color="secondary"
          onClick={() => {
            dispatch(toggleAddGrade());
            dispatch(
              setGrade({
                period: period,
                subjectIndex: index,
                _id: studentRecord?._id,
              })
            );
          }}
        >
          <IconSquarePlus />
        </IconButton>
      </Tooltip>
    );
  };

  const calculateAverage = (grades) => {
    const totalGrades = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return grades.length > 0
      ? Math.round((totalGrades / grades.length).toFixed(2))
      : '-';
  };

  return (
    <>
      <SubjectGradeModal />
      <TableContainer>
        <Table size="small">
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
            {studentRecord?.subjects?.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{subject.subject_course?.subject_name}</TableCell>
                <TableCell align="center">
                  {getGradeByPeriod(subject.grades, '1st', index)}
                </TableCell>
                <TableCell align="center">
                  {getGradeByPeriod(subject.grades, '2nd', index)}
                </TableCell>
                <TableCell align="center">
                  {getGradeByPeriod(subject.grades, '3rd', index)}
                </TableCell>
                <TableCell align="center">
                  {getGradeByPeriod(subject.grades, '4th', index)}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    {calculateAverage(subject.grades)}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default K12GradingSystem;
