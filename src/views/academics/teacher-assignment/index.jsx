import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@mui/material';

import TeacherClassSubjects from 'src/components/academics/TeachingLoad';
import {
  getAllCollegeSubjects,
  getAllInstructors,
  getAllK12Subjects,
  getAllSections,
  getAllSubjectAssignments,
  getAllTesdaCourses,
} from 'src/features/academicFeatures/academicSlice';

const TeacherAssignment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(getAllSubjectAssignments());
    dispatch(getAllInstructors());
    dispatch(getAllK12Subjects());
    dispatch(getAllCollegeSubjects());
    dispatch(getAllTesdaCourses());
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TeacherClassSubjects />
      </Grid>
    </Grid>
  );
};

export default TeacherAssignment;
