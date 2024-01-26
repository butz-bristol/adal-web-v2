import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
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
  Typography,
} from '@mui/material';
import {
  IconCircleMinus,
  IconCirclePlus,
  IconFileArrowRight,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import DCRPreview from 'src/components/cashier/DCRPreview';
import MCRPreview from 'src/components/cashier/MCRPreview';
import YCRPreview from 'src/components/cashier/YCRPreview';
import {
  createReportAccountNo,
  fetchAllPayments,
  fetchPaymentProcessingTeam,
  handleChange as handleCashierChange,
} from 'src/features/cashierFeatures/cashierSlice';
import { fetchBankAccountNumbers } from 'src/features/financeFeatures/financeSlice';
import {
  getAllAcademicYears,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { formatDateToString, formatNumber } from 'src/utils/helperFunctions';

const Reports = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 35, 150];
  const [dateFilter, setDateFilter] = useState('daily');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [startDate, setStartDate] = useState(DateTime.now().toISODate());
  const [endDate, setEndDate] = useState(DateTime.now().toISODate());
  const [orNo, setOrNo] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [open, setOpen] = useState(false);
  const [openMonthlyModal, setOpenMonthlyModal] = useState(false);
  const [openYearlyModal, setOpenYearlyModal] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const {
    payments,
    isFetchingPayments,
    paymentProcessingTeam,
    isFetchingPaymentProcessingTeam,
    cashier_id,
  } = useSelector((state) => state.cashier);
  const { academic_years, academic_year_id, isFetchingAcademicYears } =
    useSelector((state) => state.registrar);

  const accumulatedPayments = new Map();

  const filteredPayments = payments?.filter((payment) => {
    if (!orNo) {
      if (dateFilter === 'daily') {
        if (!date) return false;
        if (date && cashier_id)
          return (
            DateTime.fromISO(payment.value_date).toISODate() === date &&
            payment.clerk?._id === cashier_id
          );

        return DateTime.fromISO(payment.value_date).toISODate() === date;
      } else if (dateFilter === 'monthly') {
        if (!month) return false;
        if (month && cashier_id)
          return (
            DateTime.fromISO(payment.value_date).month ===
              DateTime.fromISO(month).month && payment.clerk?._id === cashier_id
          );

        return (
          DateTime.fromISO(payment.value_date).month ===
          DateTime.fromISO(month).month
        );
      } else if (dateFilter === 'annual') {
        if (!academic_year_id) return false;
        if (academic_year_id && cashier_id)
          return (
            payment.academic_year?._id === academic_year_id &&
            payment.clerk?._id === cashier_id
          );

        return payment.academic_year?._id === academic_year_id;
      }

      return (
        DateTime.fromISO(payment.value_date).toISODate() >= startDate &&
        DateTime.fromISO(payment.value_date).toISODate() <= endDate
      );
    } else {
      return String(payment.receipt_no).includes(orNo);
    }
  });

  const tableData = filteredPayments?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const selectedAcademicYear = academic_year_id
    ? academic_years?.find((year) => year._id === academic_year_id).school_year
    : '';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenBankModal = () => setOpenBankModal(true);
  const handleCloseBankModal = () => setOpenBankModal(false);
  const handleOpenMonthlyModal = () => setOpenMonthlyModal(true);
  const handleCloseMonthlyModal = () => setOpenMonthlyModal(false);
  const handleOpenYearlyModal = () => setOpenYearlyModal(true);
  const handleCloseYearlyModal = () => setOpenYearlyModal(false);

  //  organize data by pad_no;
  const organizedData = {};
  tableData?.forEach((payment) => {
    if (!organizedData[payment.pad_no]) {
      organizedData[payment.pad_no] = [];
    }

    organizedData[payment.pad_no].push(payment);
  });

  const finalData = [];
  for (const pad_no in organizedData) {
    const data = organizedData[pad_no];
    const receipt_nos = data.map((d) => d.receipt_no);
    const receiptRange = `${Math.min(...receipt_nos)} - ${Math.max(
      ...receipt_nos
    )}`;
    const accumulatedAmount = data.reduce(
      (acc, item) => acc + item.payment_amount,
      0
    );

    const date = new Date(data[0].value_date);

    const formattedDate = `${date.getDate()}-${new Intl.DateTimeFormat('en', {
      month: 'short',
    }).format(date)}`;

    finalData.push({
      pad_no: parseInt(pad_no),
      receipt_no_range: receiptRange,
      accumulated_amount: accumulatedAmount,
      date: formattedDate,
    });
  }

  // get all unique fees and their sum
  filteredPayments?.forEach((payment) => {
    const { payment_amount, description, academic_year } = payment;

    let paymentDescription = description;
    if (description.includes('TUITION')) {
      const remarks = academic_year?.remarks || '';
      if (remarks === 'Next Term') {
        if (description.includes('TUITION')) {
          const department = description.split(' - ')[1];
          paymentDescription = `DEFERRED INCOME(${department})`;
        }
      }

      if (!accumulatedPayments.has(paymentDescription)) {
        accumulatedPayments.set(paymentDescription, 0);
      }
      accumulatedPayments.set(
        paymentDescription,
        accumulatedPayments.get(paymentDescription) + payment_amount
      );
    }
  });

  // Add other payments not related to TUITION
  filteredPayments.forEach((item) => {
    const { payment_amount, description } = item;

    if (!description.includes('TUITION')) {
      if (!accumulatedPayments.has(description)) {
        accumulatedPayments.set(description, 0);
      }
      accumulatedPayments.set(
        description,
        accumulatedPayments.get(description) + payment_amount
      );
    }
  });

  const finalPaymentsArray = [];
  accumulatedPayments.forEach((accumulated_amount, description) => {
    finalPaymentsArray.push({ description, accumulated_amount });
  });

  // Sort the finalPaymentsArray alphabetically by description
  finalPaymentsArray.sort((a, b) => a.description.localeCompare(b.description));

  useEffect(() => {
    dispatch(fetchAllPayments());
    dispatch(getAllAcademicYears());
    dispatch(fetchBankAccountNumbers());
    dispatch(fetchPaymentProcessingTeam());
    dispatch(fetchUserProfile());
    setDate(formatDateToString(new Date()));
  }, [dispatch]);

  return (
    <Stack>
      {(isFetchingPayments ||
        isFetchingAcademicYears ||
        isFetchingPaymentProcessingTeam) && <LoadingScreen />}

      <Stack direction={'row'} mb={1} justifyContent={'space-between'}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={1}
        >
          <Box sx={{ maxWidth: '8rem' }}>
            <FormControl fullWidth>
              <TextField
                label="OR No."
                value={orNo}
                onChange={(e) => setOrNo(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box width={110}>
            <FormControl fullWidth>
              <InputLabel id="date-filter">Period</InputLabel>
              <Select
                label="Period"
                labelId="date-filter"
                value={dateFilter}
                id="date-filter"
                onChange={handleDateFilter}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annual">Annual</MenuItem>
                {/* <MenuItem value="custom">Custom</MenuItem> */}
              </Select>
            </FormControl>
          </Box>

          <Box width={150}>
            {dateFilter === 'daily' && (
              <FormControl fullWidth sx={{ width: 150 }}>
                <OutlinedInput
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setMonth('');
                    setStartDate('');
                    setEndDate('');
                    dispatch(
                      handleChange({ name: 'academic_year_id', value: '' })
                    );
                  }}
                />
              </FormControl>
            )}

            {dateFilter === 'monthly' && (
              <FormControl fullWidth sx={{ width: 150 }}>
                <OutlinedInput
                  type="month"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setDate('');
                    setStartDate('');
                    setEndDate('');
                    dispatch(
                      handleChange({ name: 'academic_year_id', value: '' })
                    );
                  }}
                />
              </FormControl>
            )}

            {dateFilter === 'annual' && (
              <FormControl fullWidth sx={{ width: 200 }}>
                <InputLabel id="academic-year-filter">Academic Year</InputLabel>
                <Select
                  label="Academic Year"
                  labelId="academic-year-filter"
                  value={academic_year_id}
                  id="date-filter"
                  onChange={(e) => {
                    dispatch(
                      handleChange({
                        name: 'academic_year_id',
                        value: e.target.value,
                      })
                    );
                    setDate('');
                    setMonth('');
                    setStartDate('');
                    setEndDate('');
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
                    handleCashierChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
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

        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          {month && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleOpenMonthlyModal}
              endIcon={<IconFileArrowRight size={17} />}
              disabled={filteredPayments?.length === 0}
            >
              Generate
            </Button>
          )}

          {academic_year_id && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleOpenYearlyModal}
              endIcon={<IconFileArrowRight size={17} />}
              disabled={filteredPayments?.length === 0}
            >
              Generate
            </Button>
          )}

          {date && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleOpenBankModal}
              endIcon={<IconFileArrowRight size={17} />}
              disabled={filteredPayments?.length === 0}
            >
              Generate
            </Button>
          )}
        </Stack>
      </Stack>

      <DCRPreview
        open={open}
        close={handleClose}
        date={date}
        data={finalData}
        accData={finalPaymentsArray}
        filteredData={filteredPayments}
      />

      <MCRPreview
        open={openMonthlyModal}
        close={handleCloseMonthlyModal}
        month={month}
        data={filteredPayments}
        accData={finalPaymentsArray}
      />

      <YCRPreview
        open={openYearlyModal}
        close={handleCloseYearlyModal}
        academic_year={selectedAcademicYear}
        data={filteredPayments}
        accData={finalPaymentsArray}
      />

      <BankAccountModal
        open={openBankModal}
        close={handleCloseBankModal}
        handleOpen={handleOpen}
        filteredPayments={filteredPayments}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 100 }}>
                <Typography fontWeight={500}>OR No. /</Typography>
                <Typography fontWeight={500}>Pad No.</Typography>
              </TableCell>
              <TableCell>Cashier</TableCell>
              <TableCell>Mode / Account</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Student & Level</TableCell>
              <TableCell>DESC</TableCell>
              <TableCell>Cash/Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData?.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>
                  <Typography>{payment.receipt_no}</Typography>
                  <Typography variant="caption">{payment.pad_no}</Typography>
                </TableCell>
                <TableCell>{payment?.clerk?.first_name}</TableCell>
                <TableCell>
                  <Typography>{payment?.payment_mode}</Typography>
                  {(payment?.payment_mode === 'Bank Deposit' ||
                    payment.payment_mode === 'Online Bank Transfer') && (
                    <Typography variant="caption">
                      {payment?.account_no}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {payment.value_date
                    ? DateTime.fromISO(payment.value_date).toLocaleString(
                        DateTime.DATE_SHORT
                      )
                    : 'No date found'}
                </TableCell>
                <TableCell>
                  <Typography>
                    {payment?.student?.student_first_name}{' '}
                    {payment?.student?.student_last_name}{' '}
                    {payment?.student?.student_middle_name ?? ''}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {payment?.student?.student_yearlevel?.year_level_name}
                  </Typography>
                </TableCell>
                <TableCell>{payment?.description}</TableCell>
                <TableCell>
                  {formatNumber(payment?.payment_amount || 0)}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {
              //  display the total amount of payments
              tableData?.length > 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    <Typography variant="h5">Total Amount:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      {formatNumber(
                        tableData?.reduce(
                          (acc, item) => acc + item.payment_amount,
                          0
                        ) || 0
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        component={'div'}
        count={filteredPayments?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

const BankAccountModal = ({ open, close, handleOpen, filteredPayments }) => {
  const dispatch = useDispatch();
  const { bankAccountNumbers, isFetchingBankAccountNumbers } = useSelector(
    (state) => state.finance
  );
  const [data, setData] = useState([
    {
      payment_mode: '',
      account_no: '',
      amount: 0,
      remarks: '',
      date: '',
    },
  ]);

  const handleAddItem = () => {
    setData([
      ...data,
      { account_no: '', amount: 0, remarks: '', date: '', payment_mode: '' },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handlePaymentModeChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].payment_mode = value;
    setData(updatedData);
  };

  const handleAccountChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].account_no = value;
    setData(updatedData);

    if (data[index].payment_mode === 'online-bank-transfer') {
      console.log(value);
      const payments = filteredPayments.filter(
        (payment) => payment.account_no === value
      );
      const totalAmount = payments.reduce(
        (acc, item) => acc + item.payment_amount,
        0
      );
      updatedData[index].amount = totalAmount;
      setData(updatedData);
    }
  };

  const handleAmountChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].amount = value;
    setData(updatedData);
  };

  const handleRemarksChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].remarks = value;
    setData(updatedData);
  };

  const handleDateChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].date = value;
    setData(updatedData);
  };

  const handleClose = () => {
    close();
    setData([
      {
        payment_mode: '',
        account_no: '',
        amount: 0,
        remarks: '',
        date: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    data.forEach((item) => {
      dispatch(
        createReportAccountNo({
          bank_account: item.account_no,
          amount: item.amount,
        })
      );
    });
  };

  if (isFetchingBankAccountNumbers) {
    return <LoadingScreen />;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'}>
      <DialogTitle fontSize={'15px'}>BANK ACCOUNT</DialogTitle>
      <DialogContent>
        <Stack rowGap={1} mt={2}>
          {data.map((item, index) => (
            <Grid container key={index} spacing={1} alignItems={'center'}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id={`payment_mode${index}`}>
                    Payment Mode
                  </InputLabel>
                  <Select
                    labelId={`payment_mode${index}`}
                    value={item.payment_mode}
                    onChange={(e) =>
                      handlePaymentModeChange(index, e.target.value)
                    }
                    label="Payment Mode"
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online-bank-transfer">
                      Bank Deposit / Online Bank Transfer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id={`bank_account_number_${index}`}>
                    Account No.
                  </InputLabel>
                  <Select
                    labelId={`bank_account_number_${index}`}
                    value={item.account_no}
                    onChange={(e) => handleAccountChange(index, e.target.value)}
                    label="Account No."
                  >
                    {bankAccountNumbers
                      ?.filter((account) => !account.isDeleted)
                      .map((account) => (
                        <MenuItem
                          key={account._id}
                          value={account.bank_account_number}
                        >
                          {account?.bank_account_number}{' '}
                          {account?.bank_account_name
                            ? `(${account?.bank_account_name})`
                            : ''}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="month"
                    label="Month"
                    value={item.date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Amount"
                    value={item.amount}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Remarks"
                    value={item.remarks}
                    onChange={(e) => handleRemarksChange(index, e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                {index === data.length - 1 ? (
                  <Stack direction={'row'}>
                    <IconButton onClick={handleAddItem} color="primary">
                      <IconCirclePlus />
                    </IconButton>

                    <IconButton
                      onClick={() => handleRemoveItem(index)}
                      color="secondary"
                    >
                      <IconCircleMinus />
                    </IconButton>
                  </Stack>
                ) : (
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
                    color="secondary"
                  >
                    <IconCircleMinus />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            dispatch(
              handleCashierChange({ name: 'accountNumbers', value: data })
            );
            handleSubmit(e);
            handleOpen();
            handleClose();
          }}
          variant="contained"
          color="secondary"
          type="button"
        >
          Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Reports;
