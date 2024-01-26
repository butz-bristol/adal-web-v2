import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconEye, IconPrinter } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import ORReprintPreview from 'src/components/cashier/ORReprintPreview';
import styles from 'src/components/modalBoxStyle';
import {
  fetchORSummaryList,
  fetchPaymentProcessingTeam,
  handleChange,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  getAllAcademicYears,
  getRegisteredStudents,
  handleChange as handleRegistrar,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatDateToString, formatNumber } from 'src/utils/helperFunctions';

const ORSummaryList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [25, 50, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dateFilter, setDateFilter] = useState('day');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [orSummary, setOrSummary] = useState({});
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [showOR, setShowOR] = useState(false);
  const {
    orSummaryList,
    isFetchingORSummaryList,
    isFetchingPaymentProcessingTeam,
    paymentProcessingTeam,
    cashier_id,
  } = useSelector((state) => state.cashier);
  const { academic_years, academic_year_id, students } = useSelector(
    (state) => state.registrar
  );
  const registeredStudents = students.filter(
    (student) => student?.student_registration_status === 'registered'
  );

  const filteredORSummaryList = orSummaryList.filter((orSummary) => {
    if (dateFilter === 'day') {
      if (!date) return;
      if (date && cashier_id)
        return (
          DateTime.fromISO(orSummary.payment_date).toISODate() === date &&
          orSummary.clerk?._id === cashier_id
        );

      return DateTime.fromISO(orSummary.payment_date).toISODate() === date;
    } else if (dateFilter === 'month') {
      if (!month) return;
      if (month && cashier_id)
        return (
          DateTime.fromISO(orSummary.payment_date).month ===
            DateTime.fromISO(month).month && orSummary.clerk?._id === cashier_id
        );

      return (
        DateTime.fromISO(orSummary.payment_date).month ===
        DateTime.fromISO(month).month
      );
    } else if (dateFilter === 'annual') {
      if (!academic_year_id) return;
      if (academic_year_id && cashier_id)
        return (
          orSummary.academic_year?._id === academic_year_id &&
          orSummary.clerk?._id === cashier_id
        );

      return orSummary.academic_year?._id === academic_year_id;
    } else if (dateFilter === 'student') {
      if (!selectedStudent?._id) return;
      if (selectedStudent?._id && cashier_id)
        return (
          orSummary.student?._id === selectedStudent._id &&
          orSummary.clerk?._id === cashier_id
        );

      return orSummary.student?._id === selectedStudent._id;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const tableData = filteredORSummaryList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    dispatch(fetchORSummaryList());
    dispatch(fetchPaymentProcessingTeam());
    dispatch(getAllAcademicYears());
    dispatch(getRegisteredStudents());
    setDate(formatDateToString(new Date()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction={'row'} mb={1} spacing={1}>
        <Box width={150}>
          <FormControl fullWidth>
            <InputLabel id="date-filter">Filter By</InputLabel>
            <Select
              label="Filter By"
              labelId="date-filter"
              value={dateFilter}
              id="date-filter"
              onChange={(e) => {
                setDateFilter(e.target.value);
              }}
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="annual">School Year</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box width={dateFilter === 'student' ? 250 : 150}>
          {dateFilter === 'day' && (
            <FormControl fullWidth sx={{ width: 150 }}>
              <OutlinedInput
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setMonth('');
                  dispatch(
                    handleRegistrar({ name: 'academic_year_id', value: '' })
                  );
                }}
              />
            </FormControl>
          )}

          {dateFilter === 'month' && (
            <FormControl fullWidth sx={{ width: 150 }}>
              <OutlinedInput
                type="month"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setDate('');
                  dispatch(
                    handleRegistrar({ name: 'academic_year_id', value: '' })
                  );
                }}
              />
            </FormControl>
          )}

          {dateFilter === 'student' && (
            <FormControl fullWidth>
              <Autocomplete
                id="combo-box-demo"
                options={registeredStudents}
                getOptionLabel={(option) =>
                  `${option?.student_first_name} ${option?.student_last_name} - ${option?.student_number}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Student"
                    variant="outlined"
                  />
                )}
                onChange={(e, value) => setSelectedStudent(value)}
                value={selectedStudent}
                PaperComponent={({ children }) => (
                  <Paper sx={{ width: 300 }}>{children}</Paper>
                )}
              />
            </FormControl>
          )}

          {dateFilter === 'annual' && (
            <FormControl fullWidth sx={{ width: 150 }}>
              <InputLabel id="academic-year-filter">School Year</InputLabel>
              <Select
                label="School Year"
                labelId="academic-year-filter"
                value={academic_year_id}
                id="date-filter"
                onChange={(e) => {
                  dispatch(
                    handleRegistrar({
                      name: 'academic_year_id',
                      value: e.target.value,
                    })
                  );
                  setDate('');
                  setMonth('');
                }}
              >
                {academic_years?.map((year) => (
                  <MenuItem value={year._id} key={year._id}>
                    {year.school_year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box width={200}>
          <FormControl fullWidth>
            <InputLabel id="cashier-filter">Cashier</InputLabel>
            <Select
              label="Cashier"
              id="cashier-filter"
              labelId="cashier-filter"
              name="cashier_id"
              value={cashier_id ?? ''}
              onChange={(e) =>
                dispatch(
                  handleChange({ name: e.target.name, value: e.target.value })
                )
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {paymentProcessingTeam?.map((cashier) => (
                <MenuItem value={cashier._id} key={cashier._id}>
                  {cashier.first_name} {cashier.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <PaymentsModal
        open={openPaymentModal}
        close={() => setOpenPaymentModal(false)}
        orSummary={orSummary}
      />

      <ORReprintPreview
        open={showOR}
        onClose={() => setShowOR(false)}
        transaction={orSummary}
      />

      <Paper>
        {isFetchingORSummaryList || isFetchingPaymentProcessingTeam ? (
          <LoadingData />
        ) : (
          <React.Fragment>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>OR No.</TableCell>
                    <TableCell>Cashier</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Student & Level</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((orSummary) => (
                    <TableRow key={orSummary.payment_id}>
                      <TableCell>{orSummary.or_no}</TableCell>
                      <TableCell>
                        {orSummary.clerk?.first_name}{' '}
                        {orSummary.clerk?.last_name}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(orSummary.payment_date).toFormat(
                          'MMM dd, yyyy'
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {orSummary?.student?.student_first_name}{' '}
                          {orSummary?.student?.student_last_name}{' '}
                          {orSummary?.student?.student_middle_name ?? ''}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {
                            orSummary?.student?.student_yearlevel
                              ?.year_level_name
                          }
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatNumber(
                          orSummary?.payments?.reduce((acc, curr) => {
                            return acc + curr.payment_amount;
                          }, 0)
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row">
                          <Tooltip title="Print OR">
                            <IconButton
                              color="secondary"
                              onClick={() => {
                                setShowOR(true);
                                setOrSummary(orSummary);
                              }}
                            >
                              <IconPrinter />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View Transaction">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setOpenPaymentModal(true);
                                setOrSummary(orSummary);
                              }}
                            >
                              <IconEye />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  {tableData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={tableData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
        )}
      </Paper>
    </Stack>
  );
};

const PaymentsModal = ({ open, close, orSummary }) => {
  const { student, clerk, payment_date, payment_mode, payments, or_no } =
    orSummary;

  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, maxHeight: 600, width: 500 }}>
        <Typography variant="h4" mb={2}>
          Transaction Record
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
          <Stack spacing={1}>
            <Typography variant="h5">
              {student?.student_first_name} {student?.student_last_name}
            </Typography>
            <Typography variant="h5">
              {student?.student_yearlevel?.year_level_name}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h5">{or_no}</Typography>
            <Typography variant="h5">
              {DateTime.fromISO(payment_date).toFormat('MMM dd, yyyy')}
            </Typography>
          </Stack>
        </Stack>

        <Stack mt={1} direction={'row'} spacing={1}>
          <Typography variant="h5">Payment Mode:</Typography>
          <Typography variant="h5">{payment_mode}</Typography>
        </Stack>

        <Stack mt={1} direction={'row'} spacing={1}>
          <Typography variant="h5">Total:</Typography>
          <Typography variant="h5">
            {formatNumber(
              payments?.reduce((acc, curr) => {
                return acc + curr.payment_amount;
              }, 0)
            )}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack>
          <Typography variant="h5" mb={2}>
            Transactions:
          </Typography>

          {payments?.map(({ _id, description, payment_amount }) => (
            <Stack direction={'row'} key={_id} justifyContent={'space-between'}>
              <Typography variant="h5">{description}</Typography>
              <Typography variant="h5">
                {formatNumber(payment_amount)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Modal>
  );
};

export default ORSummaryList;
