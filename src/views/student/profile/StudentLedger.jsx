import { CheckBox } from '@mui/icons-material';
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import {
  fetchCollegeStudentLedger,
  fetchK12StudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import { handleChange as handleRegistrarChange } from 'src/features/registrarFeatures/registrarSlice';
import { formatSalary } from 'src/utils/helperFunctions';

const StudentLedger = () => {
  const dispatch = useDispatch();
  const {
    studentProfile: { _id: student_id, student_department },
  } = useSelector((state) => state.students);
  const { studentLedger, isFetchingStudentLedger } = useSelector(
    (state) => state.cashier
  );
  const { academic_years, academic_year_id, semester_id, semesters } =
    useSelector((state) => state.registrar);

  const department = student_department?.department_name;

  const isK12 =
    department === 'Pre-School & Grade School' ||
    department === 'Junior High School' ||
    department === 'Senior High School';

  useEffect(() => {
    if (!semester_id) return;

    if (student_id && academic_year_id && semester_id) {
      dispatch(
        fetchCollegeStudentLedger({
          student_id,
          academic_year: academic_year_id,
          semester: semester_id,
        })
      );
    }
  }, [dispatch, student_id, academic_year_id, semester_id]);

  useEffect(() => {
    if (!isK12) return;
    if (student_id && academic_year_id) {
      dispatch(
        fetchK12StudentLedger({
          student_id,
          academic_year: academic_year_id,
        })
      );
    }
  }, [academic_year_id, dispatch, student_id, isK12]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption">
                  Note: This ledger includes all invoices, including any that
                  might be post-dated. The Balance is a reflection of this
                  Student Account's total remaining payments for the full
                  duration of the payment schedule.
                  <br />A negative balance indicates the student owes money on
                  the account.
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} lg={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-academic-year">
                    Academic Year
                  </InputLabel>
                  <Select
                    labelId="select-academic-year"
                    id="select-academic-year"
                    value={academic_year_id || ''}
                    name="academic_year_id"
                    label="Academic Year"
                    onChange={(e) => {
                      dispatch(
                        handleRegistrarChange({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      );
                    }}
                    required
                  >
                    {academic_years.map(({ school_year, _id, remarks }) => (
                      <MenuItem key={_id} value={_id}>
                        {school_year}{' '}
                        <em style={{ marginLeft: '10px' }}>
                          {remarks !== 'Inactive' && `${remarks}`}
                        </em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {!isK12 && (
                <Grid item xs={12} md={3} lg={2}>
                  <FormControl fullWidth>
                    <InputLabel id="select-semester">Semester</InputLabel>
                    <Select
                      id="select-semester"
                      labelId="select-semester"
                      label="Semester"
                      value={semester_id || ''}
                      onChange={(e) =>
                        dispatch(
                          handleRegistrarChange({
                            name: 'semester_id',
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      {semesters.map(({ _id, semester_term }) => (
                        <MenuItem value={_id} key={_id}>
                          {semester_term}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControlLabel
                  disabled
                  control={<CheckBox name="ledger-show-all" color="primary" />}
                  label="Show LEDGER from the first enrolled semester until present"
                />
              </Grid>
            </Grid>
          </CardContent>

          {isFetchingStudentLedger ? (
            <LoadingData />
          ) : (
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ fontWeight: 700 }}
                    >
                      <Stack alignItems={'flex-end'}>
                        <Card sx={{ maxWidth: '200px' }} raised={true}>
                          <CardContent
                            sx={{ backgroundColor: '#9e1313' }}
                            style={{ padding: '16px' }}
                          >
                            <Typography color="white" fontWeight={600}>
                              Balance:{' '}
                              {studentLedger?.ledger_balance
                                ? formatSalary(studentLedger?.ledger_balance)
                                : '0.00'}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Particulars</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Collected by</TableCell>
                    <TableCell>Debit</TableCell>
                    <TableCell>Credit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      Outstanding Fees
                    </TableCell>
                    <TableCell>
                      {studentLedger?.outstanding_fees
                        ? formatSalary(studentLedger?.outstanding_fees)
                        : '0.00'}
                    </TableCell>
                  </TableRow>

                  {studentLedger?.payments?.map((payment, index) => {
                    const isFirstPaymentOfDay =
                      index === 0 ||
                      payment.payment_date !==
                        studentLedger.payments[index - 1].payment_date;

                    return (
                      <TableRow key={index}>
                        {isFirstPaymentOfDay ? (
                          <TableCell>
                            {payment?.payment_date
                              ? DateTime.fromISO(
                                  payment?.payment_date
                                ).toLocaleString(DateTime.DATE_MED)
                              : ''}
                          </TableCell>
                        ) : (
                          <TableCell></TableCell>
                        )}
                        <TableCell>{payment?.description}</TableCell>
                        <TableCell>{payment?.payment_class}</TableCell>
                        <TableCell>{payment?.clerk?.first_name}</TableCell>
                        <TableCell>
                          {payment?.payment_type === 'Debit'
                            ? formatSalary(payment?.payment_amount)
                            : ''}
                        </TableCell>
                        <TableCell>
                          {payment?.payment_type === 'Credit'
                            ? formatSalary(payment?.payment_amount)
                            : ''}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentLedger;
