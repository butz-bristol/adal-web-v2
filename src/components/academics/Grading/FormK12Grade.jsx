import {
  Chip,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';
import {
  calculateGeneralAverage,
  calculatePeriodAverage,
  calculateTotalGrade,
  indentSubjects,
  period,
} from 'src/utils/helperFunctions';

const FormK12Grade = () => {
  const dispatch = useDispatch();

  const { student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );

  const handleInput = (e, subjectIndex, periodIndex) => {
    const { name, value } = e.target;
    // Create a copy of the student_report object
    const updatedStudentReport = { ...student_report };
    // Find the subject you want to update
    const subjectToUpdate = { ...updatedStudentReport.subjects[subjectIndex] };
    // Add the key-value pair to the subjectToUpdate
    subjectToUpdate[name] = value;
    // Create a new array with the updated subject at the specified index
    const updatedSubjects = [...updatedStudentReport.subjects];
    updatedSubjects[subjectIndex] = subjectToUpdate;
    // Update the student_report object with the modified subjects array
    updatedStudentReport.subjects = updatedSubjects;
    dispatch(setStudentReport(updatedStudentReport));
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell>1st</TableCell>
              <TableCell>2nd</TableCell>
              <TableCell>3rd</TableCell>
              <TableCell>4th</TableCell>
              <TableCell>Average</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student_report.subjects?.map((item, subjectIndex) => {
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
                  {period.map((periodItem, periodIndex) => (
                    <TableCell key={periodIndex} width={100}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          type="text"
                          id={
                            periodItem.value +
                            '_' +
                            subjectIndex +
                            '_' +
                            periodIndex
                          }
                          name={periodItem.value}
                          value={
                            student_report.subjects[subjectIndex][
                              periodItem.value
                            ] || ''
                          }
                          onChange={(e) => {
                            handleInput(e, subjectIndex, periodIndex);
                          }}
                          disabled={
                            (student_report?.[periodItem.value]?.status ===
                              'Submitted' &&
                              !userProfile?.isVerifier &&
                              !userProfile.admin_designation_toggle) ||
                            (student_report?.[periodItem.value]?.status ===
                              'Verified' &&
                              !isEditingGrade)
                          }
                        />
                      </FormControl>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {totalGradeInfo?.total}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      color={totalGradeInfo?.passed ? 'success' : 'error'}
                      label={totalGradeInfo?.passed ? 'Passed' : 'Failed'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Average</Typography>
              </TableCell>
              {period.map((periodItem, periodIndex) => (
                <TableCell key={periodIndex} align="center">
                  <Typography variant="subtitle1">
                    {
                      calculatePeriodAverage(
                        student_report.subjects,
                        periodItem.value,
                        indentSubjects
                      ).average
                    }
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="center">
                <Typography variant="subtitle1">
                  {
                    calculateGeneralAverage(
                      student_report.subjects,
                      indentSubjects
                    ).average
                  }
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  size="small"
                  color={
                    calculateGeneralAverage(
                      student_report.subjects,
                      indentSubjects
                    ).passed
                      ? 'success'
                      : 'error'
                  }
                  label={
                    calculateGeneralAverage(
                      student_report.subjects,
                      indentSubjects
                    ).passed
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default FormK12Grade;
