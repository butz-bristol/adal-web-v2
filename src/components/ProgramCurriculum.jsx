import { Divider, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styles from './modalBoxStyle';
import { useSelector } from 'react-redux';
import React from 'react';

const Curriculum = ({ open, close }) => {
  const { collegeSubjects, tesdaCourses } = useSelector((state) => state.academics);
  const { studentProfile } = useSelector((state) => state.registrar);

  const collegeStudent = studentProfile?.student_department?.department_name === 'College';
  const studentProgramId = studentProfile?.student_program?._id;
  const filteredSubjects = collegeStudent
    ? collegeSubjects.filter((subject) => subject?.program?._id === studentProgramId)
    : tesdaCourses.filter((course) => course?.program?._id === studentProgramId);

  const groupedSubjects = {};
  filteredSubjects.forEach((course) => {
    const year = course?.year_level?.year_level_name;
    const semester = course?.semester?.semester_term;

    if (!groupedSubjects[year]) {
      groupedSubjects[year] = {};
    }
    if (!groupedSubjects[year][semester]) {
      groupedSubjects[year][semester] = [];
    }
    groupedSubjects[year][semester].push(course);
  });

  const semesterOrder = (semester) => {
    if (semester === '1st Semester') return 1;
    if (semester === '2nd Semester') return 2;
    if (semester === '3rd Semester') return 3;
    if (semester === 'Summer') return 4;
    return 5;
  };

  const renderSemesterCourses = (year, semester) => {
    const courses = groupedSubjects[year]?.[semester];
    if (!courses) {
      return null;
    }
    return courses.map((course) => (
      <TableRow key={course?._id}>
        <TableCell>{course?.course_code}</TableCell>
        <TableCell>{course?.course_name}</TableCell>
        <TableCell>{course?.course_unit}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, width: 950, maxHeight: '80vh', overflowY: 'auto' }}>
        <Stack justifyContent={'center'}>
          <Typography variant="h4" textAlign={'center'}>
            Course Checklist
          </Typography>
          <Typography textAlign={'center'}>for</Typography>
          <Typography textAlign={'center'} variant="body1">
            {studentProfile?.student_program?.program_name}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CODE</TableCell>
                <TableCell>DESC</TableCell>
                <TableCell>UNIT</TableCell>
                <TableCell>GRADE</TableCell>
                <TableCell>REMARKS</TableCell>
                <TableCell>PRE-REQUISITE/CO-REQUISITE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(groupedSubjects)
                .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
                .map(([year, semesters]) =>
                  Object.entries(semesters)
                    .sort(([semA], [semB]) => semesterOrder(semA) - semesterOrder(semB))
                    .map(([semester, courses]) => (
                      <React.Fragment key={`${year}-${semester}`}>
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Typography variant="body1" fontWeight={900}>
                              {`${year} - ${semester}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        {renderSemesterCourses(year, semester)}
                      </React.Fragment>
                    ))
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
};

export default Curriculum;
