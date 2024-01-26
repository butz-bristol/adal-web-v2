import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import {
  clearDynamicData,
  createStudentScholarship,
  handleChange,
  toggleEditStudentScholarship,
  updateStudentScholarship,
} from 'src/features/admissionsFeatures/admissionsSlice';
import {
  createStudentLedger,
  fetchCollegeStudentLedger,
  fetchCollegeStudentPaymentScheme,
  fetchK12StudentLedger,
  fetchK12StudentPaymentScheme,
  fetchTESDAStudentPaymentScheme,
  processEnrollmentPayment,
  updateStudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  clearDynamicData as clearRegistrarState,
  getStudent,
  handleChange as handleRegistrarChange,
} from 'src/features/registrarFeatures/registrarSlice';

const AssignScholarship = ({ open, close }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    scholarship_id,
    scholarship_status,
    scholarship_name,
    date_assigned,
    scholarship,
    students,
    scholarship_description,
    editStudentScholarship,
    studentScholarship,
  } = useSelector((state) => state.admissions);
  const {
    studentProfile,
    academic_year_id,
    semester_id,
    academic_years,
    semesters,
  } = useSelector((state) => state.registrar);
  const { studentLedger, student_payment_scheme } = useSelector(
    (state) => state.cashier
  );
  const [student, setStudent] = useState('');
  const [inputValue, setInputValue] = useState('');

  const options = students
    .filter((student) => student.student_registration_status === 'registered')
    .map(
      ({
        _id: id,
        student_first_name: first_name,
        student_last_name: last_name,
        student_department,
        student_yearlevel,
      }) => {
        return {
          label: `${first_name} ${last_name}`,
          id,
          department: student_department?.department_name,
          year_level: student_yearlevel._id,
        };
      }
    );

  const clearData = () => {
    setStudent('');
    setInputValue('');
    dispatch(
      clearDynamicData({
        scholarship_name,
        date_assigned,
        scholarship_status,
        scholarship_description,
        scholarship_id,
      })
    );
    dispatch(
      clearRegistrarState({
        academic_year_id,
        semester_id,
      })
    );
    dispatch(handleRegistrarChange({ name: 'studentProfile', value: {} }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleAssignScholarship = async (e) => {
    e.preventDefault();

    if (!(student && date_assigned && scholarship_status)) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editStudentScholarship) {
      await dispatch(
        updateStudentScholarship({
          id: scholarship_id,
          student: student.id,
          scholarship_id: id,
          date_assigned,
          status: scholarship_status,
          description: scholarship_description,
          academic_year: academic_year_id,
        })
      );
      clearData();
      dispatch(toggleEditStudentScholarship());
      return;
    }

    try {
      const assignScholarshipResponse = await dispatch(
        createStudentScholarship({
          student: student.id,
          scholarship_id: id,
          date_assigned,
          status: scholarship_status,
          description: scholarship_description,
          academic_year: academic_year_id,
        })
      );

      if (assignScholarshipResponse.meta.requestStatus === 'fulfilled') {
        const studentLedgerId = studentLedger?._id;
        const paymentData = {
          student: studentProfile?._id,
          academic_year: academic_year_id,
          description: `Scholarship: ${scholarship_name}`,
          payment_amount: scholarship?.scholarship_amount,
          payment_date: date_assigned,
          payment_class: 'Scholarship',
          payment_type: 'Credit',
        };

        if (
          studentProfile.student_department === 'College' ||
          studentProfile.student_department ===
            'Technical Education and Skills Development Authority (TESDA)'
        ) {
          paymentData.semester = semester_id;
        }

        if (studentLedgerId) {
          const updateLedgerResponse = await dispatch(
            updateStudentLedger({
              id: studentLedgerId,
              student: student?.id,
              ledger_balance:
                (studentLedger?.ledger_balance || 0) -
                (scholarship?.scholarship_amount || 0),
              payments: [...(studentLedger?.payments || []), paymentData],
            })
          );

          if (
            updateLedgerResponse.meta.requestStatus === 'fulfilled' &&
            student_payment_scheme?._id
          ) {
            dispatch(
              processEnrollmentPayment({
                student_department:
                  student.department !==
                    'Technical Education and Skills Development Authority (TESDA)' ||
                  student.department !== 'College'
                    ? 'K-12'
                    : student.department,
                month:
                  student.department ===
                    'Technical Education and Skills Development Authority (TESDA)' ||
                  student.department === 'College'
                    ? 'jan'
                    : 'miscellaneous-1',
                student: student.id,
                academic_year: academic_year_id,
                year_level: student?.year_level,
                amount_paid: scholarship?.scholarship_amount,
              })
            );
          }
        } else {
          await dispatch(
            createStudentLedger({
              student: student?.id,
              ledger_balance:
                (studentLedger?.ledger_balance || 0) -
                (scholarship?.scholarship_amount || 0),
              payments: [paymentData],
              academic_year: academic_year_id,
              semester: semester_id || null,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    clearData();
    close();
  };

  useEffect(() => {
    if (editStudentScholarship) {
      setStudent({
        label: `${studentScholarship?.student?.student_first_name} ${studentScholarship?.student?.student_last_name}`,
        id: studentScholarship.student._id,
      });
      setInputValue(
        `${studentScholarship?.student?.student_first_name} ${studentScholarship?.student?.student_last_name}`
      );
    }
  }, [editStudentScholarship, studentScholarship]);

  useEffect(() => {
    if (!student?.id) return;

    dispatch(getStudent(student.id));
  }, [dispatch, student]);

  useEffect(() => {
    if (!student || !academic_year_id) return;

    if (
      student.department === 'College' ||
      student.department ===
        'Technical Education and Skills Development Authority (TESDA)'
    ) {
      if (!semester_id) return;
      dispatch(
        fetchCollegeStudentLedger({
          student_id: student?.id,
          academic_year: academic_year_id,
          semester: semester_id,
        })
      );
    } else {
      dispatch(
        fetchK12StudentLedger({
          student_id: student?.id,
          academic_year: academic_year_id,
        })
      );
    }
  }, [dispatch, academic_year_id, semester_id, student]);

  // Get Student Payment Schemes

  useEffect(() => {
    if (student && academic_year_id && studentProfile._id) {
      if (
        student?.department ===
          'Technical Education and Skills Development Authority (TESDA)' &&
        semester_id
      ) {
        dispatch(
          fetchTESDAStudentPaymentScheme({
            student: student?.id,
            academic_year: academic_year_id,
            semester: semester_id,
          })
        );
      } else if (student?.department === 'College' && semester_id) {
        dispatch(
          fetchCollegeStudentPaymentScheme({
            student: student?.id,
            academic_year: academic_year_id,
            semester: semester_id,
            year_level: studentProfile?.student_yearlevel?._id,
          })
        );
      } else {
        dispatch(
          fetchK12StudentPaymentScheme({
            student: student?.id,
            academic_year: academic_year_id,
            year_level: studentProfile?.student_yearlevel?._id,
          })
        );
      }
    }
  }, [dispatch, student, academic_year_id, semester_id, studentProfile]);

  return (
    <Modal
      open={open || editStudentScholarship}
      onClose={() => {
        editStudentScholarship
          ? dispatch(toggleEditStudentScholarship())
          : close();
        clearData();
      }}
    >
      <Paper
        sx={{
          ...styles,
          width: 600,
        }}
      >
        <Typography variant="h4" component="h4" align="center">
          Assign Scholarship
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Autocomplete
                  id="student"
                  options={options}
                  renderInput={(params) => (
                    <TextField {...params} label="Student" variant="outlined" />
                  )}
                  value={student}
                  onChange={(event, value) => {
                    setStudent(value);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  inputValue={inputValue}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="academic_year-select">Academic Year</InputLabel>
                <Select
                  id="academic_year-select"
                  label="Academic Year"
                  name="academic_year_id"
                  value={academic_year_id || ''}
                  onChange={(e) =>
                    dispatch(
                      handleRegistrarChange({
                        name: 'academic_year_id',
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {academic_years.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {(studentProfile?.student_department?.department_name ===
              'College' ||
              studentProfile?.student_department?.department_name ===
                'Technical Education and Skills Development Authority (TESDA)') && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="semester-label">Semester</InputLabel>
                  <Select
                    labelId="semester-label"
                    id="semester"
                    name="semester_id"
                    value={semester_id || ''}
                    label="Semester"
                    onChange={(e) =>
                      dispatch(
                        handleRegistrarChange({
                          name: 'semester_id',
                          value: e.target.value,
                        })
                      )
                    }
                    variant="outlined"
                  >
                    {semesters.map((semester) => (
                      <MenuItem key={semester._id} value={semester._id}>
                        {semester.semester_term}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="date_assigned"
                  label="Issue Date"
                  type="date"
                  name="date_assigned"
                  value={DateTime.fromISO(date_assigned).toFormat('yyyy-MM-dd')}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="scholarship-status">Status</InputLabel>
                <Select
                  id="scholarship-status"
                  label="Status"
                  name="scholarship_status"
                  value={scholarship_status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Claimed">Claimed</MenuItem>
                  <MenuItem value="Forfeited">Forfeited</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Name"
                  id="scholarship-name"
                  value={scholarship?.scholarship_name}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Amount"
                  id="scholarship-amount"
                  value={scholarship?.scholarship_amount}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Semester"
                  id="scholarship-amount"
                  value={scholarship?.semester_id?.semester_term ?? 'N/A'}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Requirements"
                  multiline
                  rows={3}
                  id="scholarship_description"
                  value={scholarship_description}
                  name="scholarship_description"
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAssignScholarship}
                disabled={student === '' || date_assigned === ''}
              >
                {editStudentScholarship ? 'Update' : 'Assign'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};
export default React.memo(AssignScholarship);
