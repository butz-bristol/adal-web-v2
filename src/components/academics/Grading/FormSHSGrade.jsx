import {
  Button,
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
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  setStudentReport,
  updateK12Grade,
} from 'src/features/academicFeatures/academicSlice';
import {
  calculateGeneralAverage,
  calculatePeriodAverage,
  calculateTotalGrade,
} from 'src/utils/helperFunctions';

const FormSHSGrade = () => {
  const dispatch = useDispatch();

  const { section, student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [quarter, setQuarter] = useState('');
  const firstSemesterPeriod = [
    { label: '1st', value: 'first_period' },
    { label: '2nd', value: 'second_period' },
  ];
  const secondSemesterPeriod = [
    { label: '3rd', value: 'third_period' },
    { label: '4th', value: 'fourth_period' },
  ];

  const indentSubjects = ['Music', 'Arts', 'Physical Education', 'Health'];
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

  const handleSubmit = () => {
    dispatch(
      updateK12Grade({
        ...student_report,
        [quarter]: {
          status: 'Submitted',
          average: calculatePeriodAverage(
            student_report.subjects,
            quarter,
            indentSubjects
          ).average,
        },
      })
    );
  };

  const handleVerify = () => {
    dispatch(
      updateK12Grade({
        ...student_report,
        [quarter]: {
          status: 'Verified',
          average: calculatePeriodAverage(
            student_report.subjects,
            quarter,
            indentSubjects
          ).average,
        },
      })
    );
  };

  const firstSemesterSubjects = student_report.subjects.filter(
    (subject) => subject.subject.semester.semester_term === '1st Semester'
  );
  const secondSemesterSubjects = student_report.subjects.filter(
    (subject) => subject.subject.semester.semester_term === '2nd Semester'
  );

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
              <TableCell colSpan={7}>
                <Typography variant="h4">1st Semester</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell align="center">1st</TableCell>
              <TableCell align="center">2nd</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell>Average</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firstSemesterSubjects.map((item, subjectIndex) => {
              const totalGradeInfo = calculateTotalGrade(item);
              return (
                <TableRow key={subjectIndex}>
                  <TableCell>
                    <Typography
                      ml={
                        indentSubjects.includes(item.subject?.subject_name) && 5
                      }
                    >
                      {item.subject?.subject_name}
                    </Typography>
                  </TableCell>
                  {firstSemesterPeriod.map((periodItem, periodIndex) => (
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
                            ] || 0
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
                  <TableCell colSpan={2}></TableCell>
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
                <Typography variant="subtitle1">First Sem Average</Typography>
              </TableCell>
              {firstSemesterPeriod.map((periodItem, periodIndex) => (
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
              <TableCell colSpan={2}></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">
                  {
                    calculateGeneralAverage(
                      firstSemesterSubjects,
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
                      firstSemesterSubjects,
                      indentSubjects
                    ).passed
                      ? 'success'
                      : 'error'
                  }
                  label={
                    calculateGeneralAverage(
                      firstSemesterSubjects,
                      indentSubjects
                    ).passed
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {firstSemesterPeriod.map((periodItem, periodIndex) => {
                return !student_report?.[periodItem.value]?.status ? (
                  section?.adviser?._id === userProfile?._id ||
                  userProfile.admin_designation_toggle ? (
                    <TableCell key={periodIndex} align="center">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setQuarter(periodItem.value);
                          setShowSubmissionModal(true);
                        }}
                      >
                        Submit
                      </Button>
                    </TableCell>
                  ) : (
                    userProfile?.isVerifier && (
                      <TableCell key={periodIndex} align="center">
                        <Chip size="small" color="warning" label="Pending" />
                      </TableCell>
                    )
                  )
                ) : (
                  <Fragment key={periodIndex}>
                    {userProfile?.isVerifier ||
                    userProfile.admin_designation_toggle ? (
                      student_report?.[periodItem.value]?.status ===
                      'Verified' ? (
                        <TableCell key={periodIndex} align="center">
                          <Chip size="small" color="success" label="Verified" />
                        </TableCell>
                      ) : (
                        <TableCell key={periodIndex} align="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              setQuarter(periodItem.value);
                              setShowVerificationModal(true);
                            }}
                          >
                            Lock
                          </Button>
                        </TableCell>
                      )
                    ) : (
                      <TableCell key={periodIndex} align="center">
                        {student_report?.[periodItem.value]?.status}
                      </TableCell>
                    )}
                  </Fragment>
                );
              })}
              <TableCell colSpan={4}></TableCell>
            </TableRow>
          </TableBody>

          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant="h4">2nd Semester</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subjects</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">3rd</TableCell>
              <TableCell align="center">4th</TableCell>
              <TableCell>Average</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {secondSemesterSubjects.map((item, subjectIndex) => {
              const totalGradeInfo = calculateTotalGrade(item);
              return (
                <TableRow key={subjectIndex}>
                  <TableCell>
                    <Typography
                      ml={
                        indentSubjects.includes(item.subject?.subject_name) && 5
                      }
                    >
                      {item.subject?.subject_name}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  {secondSemesterPeriod.map((periodItem, periodIndex) => {
                    let secondSemesterSubjectIndex =
                      firstSemesterSubjects.length + subjectIndex;

                    return (
                      <TableCell key={periodIndex} width={100}>
                        <FormControl fullWidth>
                          <TextField
                            size="small"
                            type="text"
                            id={
                              periodItem.value +
                              '_' +
                              secondSemesterSubjectIndex +
                              +'_' +
                              periodIndex
                            }
                            name={periodItem.value}
                            value={
                              student_report.subjects[
                                secondSemesterSubjectIndex
                              ][periodItem.value] || 0
                            }
                            onChange={(e) => {
                              handleInput(
                                e,
                                secondSemesterSubjectIndex,
                                periodIndex
                              );
                            }}
                            disabled={
                              (student_report?.[periodItem.value]?.status ===
                                'Submitted' &&
                                !userProfile?.isVerifier &&
                                !userProfile.admin_designation_toggle) ||
                              student_report?.[periodItem.value]?.status ===
                                'Verified'
                            }
                          />
                        </FormControl>
                      </TableCell>
                    );
                  })}
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
                <Typography variant="subtitle1">Second Sem Average</Typography>
              </TableCell>
              <TableCell colSpan={2}></TableCell>
              {secondSemesterPeriod.map((periodItem, periodIndex) => (
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
                      secondSemesterSubjects,
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
                      secondSemesterSubjects,
                      indentSubjects
                    ).passed
                      ? 'success'
                      : 'error'
                  }
                  label={
                    calculateGeneralAverage(
                      secondSemesterSubjects,
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

export default FormSHSGrade;
