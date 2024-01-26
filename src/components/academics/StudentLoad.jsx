import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { updateSubjectGrade } from 'src/features/academicFeatures/academicSlice';
import NotFound from 'src/views/maintenance';

const StudentLoad = () => {
  const dispatch = useDispatch();

  const { academic_years, activeAcademicYear, k12StudentLoad } = useSelector(
    (state) => state.registrar
  );
  const [schoolYear, setSchoolYear] = useState(activeAcademicYear._id);

  let subjectsWithGrades;

  if (k12StudentLoad?.subjects.every((subject) => subject.grade.length === 0)) {
    // Load subjectsWithGrades when grade array is empty
    subjectsWithGrades = k12StudentLoad.subjects.map((item) => ({
      subject: item.subject,
      grade: [
        { period: '1st', grade: '' },
        { period: '2nd', grade: '' },
        { period: '3rd', grade: '' },
        { period: '4th', grade: '' },
      ],
    }));
  } else {
    // Load original subjects if grade array is not empty
    if (k12StudentLoad) subjectsWithGrades = k12StudentLoad.subjects;
  }

  const [subjectData, setSubjectData] = useState(subjectsWithGrades);

  const handleInput = (e, subjectIndex, period) => {
    const updatedSubjectData = [...subjectData];

    const subjectToUpdate = updatedSubjectData[subjectIndex];
    const updatedGrade = subjectToUpdate.grade.map((gradeData) => {
      if (gradeData.period === period) {
        return { ...gradeData, grade: e.target.value };
      }
      return gradeData;
    });

    updatedSubjectData[subjectIndex] = {
      ...subjectToUpdate,
      grade: updatedGrade,
    };

    setSubjectData(updatedSubjectData);
  };

  const handleSaveDraft = () => {
    // Create a new object to hold the merged data
    const mergedData = { ...k12StudentLoad };
    delete mergedData.checked_full_payment;
    delete mergedData.college_track;
    delete mergedData.createdAt;
    delete mergedData.createdBy;
    delete mergedData.department;
    delete mergedData.paymentScheme;
    delete mergedData.payment_status;
    delete mergedData.program;
    delete mergedData.student_fees;
    delete mergedData.total_amount;
    delete mergedData.updatedAt;
    delete mergedData.year_level;
    delete mergedData.enrolled;
    delete mergedData.__v;
    mergedData.academic_year = mergedData.academic_year?._id;
    mergedData.student = mergedData.student?._id;
    // Loop through subjects in k12StudentLoad
    mergedData.subjects = k12StudentLoad.subjects.map((subjectInK12) => {
      // Find the corresponding subject in subjectData using _id
      const matchingSubject = subjectData.find(
        (subjectInData) =>
          subjectInData.subject._id === subjectInK12.subject._id
      );

      // If a matching subject is found, merge the grade data
      if (matchingSubject) {
        return {
          ...subjectInK12,
          grade: matchingSubject.grade,
        };
      }

      // If no matching subject is found, return the original subject from k12StudentLoad
      return subjectInK12;
    });

    // Dispatch the merged data
    dispatch(updateSubjectGrade(mergedData));
  };

  const calculateAverage = (grades) => {
    const totalGrades = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return grades.length > 0
      ? Math.round((totalGrades / grades.length).toFixed(2))
      : '-';
  };

  useEffect(() => {
    setSubjectData(subjectsWithGrades);
  }, [k12StudentLoad]);

  return (
    <Stack>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={1}
      >
        <Grid container item xs={12} md={6} spacing={1}>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-year">Academic Year</InputLabel>
              <Select
                id="select-year"
                label="Academic Year"
                onChange={setSchoolYear}
                value={schoolYear || null}
              >
                {academic_years.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.school_year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} md spacing={1} justifyContent="flex-end">
          <Grid item xs={12} md="auto">
            <Button
              variant="contained"
              color="warning"
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
          </Grid>
          <Grid item xs={12} md="auto">
            <Button variant="contained" color="secondary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {k12StudentLoad ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>1st</TableCell>
                    <TableCell>2nd</TableCell>
                    <TableCell>3rd</TableCell>
                    <TableCell>4th</TableCell>
                    <TableCell width={150}>Average</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectData.map((item, subjectIndex) => (
                    <TableRow key={item.subject.subject_name}>
                      <TableCell>{item.subject.subject_name}</TableCell>
                      {item.grade.map((gradeData) => (
                        <TableCell key={gradeData.period}>
                          <TextField
                            type="text"
                            name={gradeData.period}
                            value={gradeData.grade ?? ''}
                            onChange={(e) =>
                              handleInput(e, subjectIndex, gradeData.period)
                            }
                          />
                        </TableCell>
                      ))}
                      <TableCell>{calculateAverage(item.grade)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <NotFound />
      )}
    </Stack>
  );
};

export default StudentLoad;
