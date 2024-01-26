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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';
import { calculateGWA } from 'src/utils/helperFunctions';

const FormCollegeGrade = () => {
  const dispatch = useDispatch();

  const { section, student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [quarter, setQuarter] = useState('');

  const period = [
    { label: 'Prelim', value: 'prelim' },
    { label: 'Midterm', value: 'midterm' },
    { label: 'Final', value: 'final' },
    { label: 'Final Grade', value: 'finalGrade' },
  ];

  const handleInput = (e, subjectIndex, periodIndex) => {
    const { name, value } = e.target;
    // Create a copy of the student_report object
    const updatedStudentReport = { ...student_report };
    // Find the subject you want to update
    const subjectToUpdate = { ...updatedStudentReport.subjects[subjectIndex] };
    // Add the key-value pair to the subjectToUpdate
    subjectToUpdate[name] = parseFloat(value);
    // Create a new array with the updated subject at the specified index
    const updatedSubjects = [...updatedStudentReport.subjects];
    updatedSubjects[subjectIndex] = subjectToUpdate;
    // Update the student_report object with the modified subjects array
    updatedStudentReport.subjects = updatedSubjects;
    dispatch(setStudentReport(updatedStudentReport));
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <ConfirmationModal
        isOpen={showSubmissionModal}
        title={'Confirm Action'}
        message={
          'This action is irreversible. Confirm your intent to submit, as it cannot be undone'
        }
        onConfirm={() => {
          handleSubmit();
          setShowSubmissionModal(false);
        }}
        onCancel={() => {
          setShowSubmissionModal(false);
        }}
      />
      <ConfirmationModal
        isOpen={showVerificationModal}
        title={'Confirm Action'}
        message={
          'This action is irreversible. Confirm your intent to submit, as it cannot be undone'
        }
        onConfirm={() => {
          handleVerify();
          setShowVerificationModal(false);
        }}
        onCancel={() => {
          setShowVerificationModal(false);
        }}
      />
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell>Units</TableCell>
              {period.map((item, index) => (
                <TableCell key={index}>{item.label}</TableCell>
              ))}
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student_report.subjects?.map((item, subjectIndex) => {
              let prelim = item?.prelim ?? 0;
              let midterm = item?.midterm ?? 0;
              let final = item?.final ?? 0;
              let finalGrade = item?.finalGrade ?? 0;

              return (
                <TableRow key={subjectIndex}>
                  <TableCell width={500}>
                    <Typography>{item.subject?.course_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.subject?.course_unit}</Typography>
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
                    <Chip
                      size="small"
                      color={finalGrade <= 3 ? 'success' : 'error'}
                      label={finalGrade <= 3 ? 'Passed' : 'Failed'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">
                  General Weighted Average
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              {period.map((periodItem, periodIndex) => (
                <TableCell key={periodIndex} align="center">
                  <Typography variant="subtitle1">
                    {calculateGWA(student_report.subjects, periodItem.value)}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="center">
                {/* <Typography variant="subtitle1">{calculateGeneralAverage(student_report.subjects, indentSubjects).average}</Typography> */}
              </TableCell>
              <TableCell align="center">
                {/* <Chip
                  size="small"
                  color={calculateGeneralAverage(student_report.subjects, indentSubjects).passed ? 'success' : 'error'}
                  label={calculateGeneralAverage(student_report.subjects, indentSubjects).passed}
                /> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default FormCollegeGrade;
