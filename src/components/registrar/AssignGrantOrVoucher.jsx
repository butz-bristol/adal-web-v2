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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import {
  createStudentLedger,
  fetchK12StudentLedger,
  fetchK12StudentPaymentScheme,
  processEnrollmentPayment,
  updateStudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  clearDynamicData,
  createStudentGrant,
  fetchStudentsByQuery,
  getAllAcademicYears,
  getAllSemesters,
  getRegisteredStudents,
  getStudent,
  handleChange,
  updateStudent,
} from 'src/features/registrarFeatures/registrarSlice';

const AssignGrantOrVoucher = ({ open, close }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    students,
    date_issued,
    grantNumberFormats,
    grant_number_format,
    isSavingStudentGrantsAndVouchers,
    grantAndVoucher,
    voucher_status,
    studentProfile,
    academic_year_id,
    academic_years,
    query,
    filteredStudents,
    isFetchingStudents,
    isFilteringStudents,
    student_id,
    activeAcademicYear,
  } = useSelector((state) => state.registrar);
  const { studentLedger, student_payment_scheme } = useSelector(
    (state) => state.cashier
  );

  let studentsList = [];

  if (query.length > 0) {
    studentsList = filteredStudents;
  } else {
    studentsList = students;
  }

  const options = studentsList.filter(
    (student) =>
      student.student_department !==
        'Technical Education and Skills Development Authority (TESDA)' &&
      student.student_department !== 'College'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const clearData = () => {
    dispatch(
      clearDynamicData({
        grant_number_format,
        date_issued,
        voucher_status,
        academic_year_id,
      })
    );
  };

  const handleAssignGrantOrVoucher = async (e) => {
    e.preventDefault();

    if (!student_id || !grant_number_format || !date_issued) {
      toast.error('Please fill in all fields');
      return;
    }

    if (
      studentProfile?.student_department?.department_name === 'College' ||
      studentProfile?.student_department?.department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
    )
      return toast.error(
        'This student is not eligible for this grant or voucher'
      );

    const data = {
      student: student_id,
      grantNumberFormat: grant_number_format,
      date_issued,
      grant_or_voucher: id,
    };

    try {
      const createGrantResponse = await dispatch(createStudentGrant(data));

      if (createGrantResponse.meta.requestStatus === 'fulfilled') {
        if (
          studentProfile?.student_department?.department_name ===
            'Junior High School' &&
          !studentProfile?.student_esc_grantee
        ) {
          dispatch(
            updateStudent({
              _id: student_id,
              student_esc_grantee: true,
            })
          );
        }

        const studentLedgerId = studentLedger?._id;
        const paymentData = {
          student: student_id,
          academic_year: academic_year_id,
          description: `${grant_number_format} ${grantAndVoucher?.name}`,
          payment_amount: grantAndVoucher?.amount,
          payment_date: date_issued,
          payment_class: grantAndVoucher?.type,
          payment_type: 'Credit',
        };

        if (studentLedgerId) {
          const ledgerData = {
            id: studentLedgerId,
            student: student_id,
            ledger_balance:
              (studentLedger?.ledger_balance || 0) -
              (grantAndVoucher?.amount || 0),
            payments: [...(studentLedger?.payments || []), paymentData],
          };

          const updateLedgerResponse = await dispatch(
            updateStudentLedger(ledgerData)
          );

          if (
            updateLedgerResponse.meta.requestStatus === 'fulfilled' &&
            student_payment_scheme?._id
          ) {
            dispatch(
              processEnrollmentPayment({
                student_department: 'K-12',
                month: 'miscellaneous-1',
                student: student_id,
                academic_year: academic_year_id,
                year_level: studentProfile?.student_yearlevel?._id,
                amount_paid: grantAndVoucher?.amount,
              })
            );
          }
        } else {
          await dispatch(
            createStudentLedger({
              student: student_id,
              ledger_balance: 0 - grantAndVoucher?.amount,
              academic_year: academic_year_id,
              payments: [paymentData],
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }

    clearData();
    close();
  };

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllSemesters());
    dispatch(
      handleChange({ name: 'academic_year_id', value: activeAcademicYear?._id })
    );
    dispatch(
      handleChange({
        name: 'date_issued',
        value: new Date().toISOString().split('T')[0],
      })
    );
  }, [activeAcademicYear?._id, dispatch]);

  useEffect(() => {
    if (!student_id) return;
    dispatch(getStudent(student_id));

    if (!academic_year_id) return;
    dispatch(
      fetchK12StudentLedger({ student_id, academic_year: academic_year_id })
    );
  }, [dispatch, academic_year_id, student_id]);

  // Get Student Payment Schemes

  useEffect(() => {
    if (
      student_id &&
      academic_year_id &&
      studentProfile?.student_yearlevel?._id
    ) {
      dispatch(
        fetchK12StudentPaymentScheme({
          student: student_id,
          academic_year: academic_year_id,
          year_level: studentProfile?.student_yearlevel?._id,
        })
      );
    }
  }, [dispatch, studentProfile, academic_year_id, student_id]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchStudentsByQuery());
      return;
    }

    dispatch(getRegisteredStudents());
  }, [dispatch, query]);

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
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
          Assign Grant or Voucher
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Autocomplete
                  id="student"
                  options={options}
                  getOptionLabel={(option) =>
                    `${option?.student_first_name ?? ''} ${
                      option?.student_last_name ?? ''
                    } ${
                      option.student_number ? `- ${option?.student_number}` : ''
                    }`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Student" variant="outlined" />
                  )}
                  value={studentProfile ?? {}}
                  onChange={(e, value) => {
                    dispatch(
                      handleChange({ name: 'student_id', value: value?._id })
                    );
                  }}
                  loading={isFilteringStudents || isFetchingStudents}
                  onInputChange={(e, value) => {
                    dispatch(
                      handleChange({ name: 'query', value: value.trim() })
                    );
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-academic-year">Academic Year</InputLabel>
                <Select
                  label="Academic Year"
                  labelId="select-academic-year"
                  value={academic_year_id}
                  name="academic_year_id"
                  onChange={handleInputChange}
                >
                  {academic_years.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="date_issued"
                  label="Issue Date"
                  type="date"
                  name="date_issued"
                  value={date_issued}
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
                <InputLabel id="grant-number-format">
                  Grant Number Format
                </InputLabel>
                <Select
                  id="grant-number-format"
                  label="Grant Number Format"
                  name="grant_number_format"
                  value={grant_number_format}
                  onChange={handleInputChange}
                >
                  {grantNumberFormats.map((format) => (
                    <MenuItem key={format._id} value={format.format}>
                      {format.format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="grant-or-voucher-status">Status</InputLabel>
                <Select
                  id="grant-or-voucher-status"
                  label="Status"
                  name="voucher_status"
                  value={voucher_status}
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
                  label="Grant/Voucher Name"
                  id="grant-or-voucher-name"
                  value={grantAndVoucher?.name}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Grant/Voucher Amount"
                  id="grant-or-voucher-amount"
                  value={grantAndVoucher?.amount}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAssignGrantOrVoucher}
                disabled={
                  !studentProfile._id === '' ||
                  isSavingStudentGrantsAndVouchers ||
                  grant_number_format === '' ||
                  date_issued === '' ||
                  voucher_status === '' ||
                  !academic_year_id
                }
              >
                Assign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AssignGrantOrVoucher;
