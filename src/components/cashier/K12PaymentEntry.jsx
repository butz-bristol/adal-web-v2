import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ORPreview from 'src/components/ORPreview';
import styles from 'src/components/modalBoxStyle';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import CharacterCountTextField from 'src/components/utilities/TextFieldWithCharCount';
import {
  clearDynamicData,
  createPayment,
  createStudentLedger,
  fetchK12StudentLedger,
  handleChange,
  processEnrollmentPayment,
  setOtherFee1,
  setOtherFee2,
  setOtherFee3,
  updateStudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  fetchBankAccountNumbers,
  updateStudentInvoice,
} from 'src/features/financeFeatures/financeSlice';
import {
  getStudent,
  updateK12Enrollment,
  updateStudent,
} from 'src/features/registrarFeatures/registrarSlice';
import {
  formatDateToString,
  formatSalary,
  numberToWords,
} from 'src/utils/helperFunctions';
import StudentPayable from './StudentPayables';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 400,
    },
  },
};

const K12PaymentEntry = ({ student_id, academic_year }) => {
  const dispatch = useDispatch();
  const [showOR, setShowOR] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [processInvoice, setProcessInvoice] = useState(false);
  const {
    student_payment_scheme,
    month,
    amount_paid,
    tuition_note,
    otherFee1,
    other_fee_1,
    other_fee_1_id,
    other_fee_1_amount,
    other_fee_1_note,
    otherFee2,
    other_fee_2,
    other_fee_2_id,
    other_fee_2_amount,
    other_fee_2_note,
    otherFee3,
    other_fee_3,
    other_fee_3_id,
    other_fee_3_amount,
    other_fee_3_note,
    total_payment_amount,
    otherFees,
    payment_mode,
    particulars,
    studentLedger,
    or_no,
    pad_no,
    value_date,
    account_no,
    deposit_date,
  } = useSelector((state) => state.cashier);
  const { k12StudentLoad, studentProfile } = useSelector(
    (state) => state.registrar
  );
  const { user } = useSelector((state) => state.users);
  const { bankAccountNumbers } = useSelector((state) => state.finance);

  const handleInputChange = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleToggleInvoicing = () => {
    setProcessInvoice(!processInvoice);
    clearData();
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  let total = 0;

  const handleShowLedger = () => {
    setShowLedger(true);
  };

  const handleHideLedger = () => {
    setShowLedger(false);
  };

  const handleShowPayments = () => {
    setShowPayments(true);
  };
  const handleHidePayments = () => {
    setShowPayments(false);
  };

  const monthlyScheme = student_payment_scheme?.payment_scheme?.find(
    (scheme) => scheme.month === month
  );

  const handleShowOR = () => {
    setShowOR(true);
  };

  const handleHideOR = () => {
    setShowOR(false);
    clearData();
  };

  let studentDept = '';

  if (
    studentProfile?.student_department?.department_name ===
    'Pre-School & Grade School'
  ) {
    studentDept = 'PSGS';
  }

  if (
    studentProfile?.student_department?.department_name === 'Junior High School'
  ) {
    studentDept = 'JHS';
  }

  if (
    studentProfile?.student_department?.department_name === 'Senior High School'
  ) {
    studentDept = 'SHS';
  }

  let tuitionParticular = `TUITION, MATRICULATION, E-LEARNING - ${studentDept}`;

  total += parseFloat(amount_paid || 0);
  total += parseFloat(other_fee_1_amount || 0);
  total += parseFloat(other_fee_2_amount || 0);
  total += parseFloat(other_fee_3_amount || 0);

  const clearData = () => {
    total = 0;
    dispatch(
      clearDynamicData({
        month,
        amount_paid,
        payment_mode,
        particulars,
        tuition_note,
        otherFee1,
        other_fee_1,
        other_fee_1_id,
        other_fee_1_amount,
        other_fee_1_note,
        otherFee2,
        other_fee_2,
        other_fee_2_id,
        other_fee_2_amount,
        other_fee_2_note,
        otherFee3,
        other_fee_3,
        other_fee_3_id,
        other_fee_3_amount,
        other_fee_3_note,
        total_payment_amount,
        account_no,
      })
    );
  };

  const processPayment = () => {
    if (!student_id) {
      toast.error('Please select a student');
      return;
    }
    if (!or_no) {
      toast.error('Please enter OR No.');
      return;
    }
    if (!pad_no) {
      toast.error('Please enter Pad No.');
      return;
    }
    if (!payment_mode) {
      toast.error('Please select payment mode');
      return;
    }
    if (!total_payment_amount) {
      toast.error('Please enter total payment amount');
      return;
    }
    if (parseFloat(total_payment_amount) < total) {
      toast.error(
        'Total payment amount is less than the total amount to be paid'
      );
      return;
    }
    if (
      payment_mode === 'Online Bank Transfer' ||
      payment_mode === 'Bank Deposit'
    ) {
      if (!account_no) {
        toast.error('Please select an account number');
        return;
      }
    }
    if (
      !amount_paid &&
      !other_fee_1_amount &&
      !other_fee_2_amount &&
      !other_fee_3_amount
    ) {
      toast.error('Please enter a payment');
      return;
    }

    let paymentsArray = [];
    let particularsArray = [];
    let otherFeeIDs = [];

    if (studentLedger?._id) {
      paymentsArray = [...studentLedger?.payments];
    }

    if (amount_paid) {
      particularsArray.push({
        desc: tuitionParticular,
        amount: amount_paid,
        note: tuition_note,
      });

      paymentsArray.push({
        student: student_id,
        academic_year,
        description: `[${or_no}] ${
          tuitionParticular + ' - ' + month.toUpperCase()
        } - ${payment_mode} ${tuition_note && `${' : '}${tuition_note}`}`,
        payment_amount: amount_paid,
        payment_type: 'Credit',
        payment_date: formatDateToString(new Date()),
        clerk: user?.userId,
        value_date,
        account_no,
      });
    }

    if (other_fee_1_id && other_fee_1_amount) {
      particularsArray.push({
        desc: other_fee_1.toUpperCase(),
        amount: other_fee_1_amount,
        note: other_fee_1_note,
      });

      if (processInvoice) {
        otherFeeIDs.push(other_fee_1_id);
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_1.toUpperCase()}`,
            payment_amount: other_fee_1_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_1?.toUpperCase()} - ${payment_mode}
            ${other_fee_1_note && `${' : '}${other_fee_1_note}`}`,
            payment_amount: other_fee_1_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      } else {
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_1.toUpperCase()}`,
            payment_amount: other_fee_1_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_1?.toUpperCase()} - ${payment_mode}
             ${other_fee_1_note && `${' : '}${other_fee_1_note}`}`,
            payment_amount: other_fee_1_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      }
    }

    if (other_fee_2_id && other_fee_2_amount) {
      particularsArray.push({
        desc: other_fee_2?.toUpperCase(),
        amount: other_fee_2_amount,
        note: other_fee_2_note,
      });

      if (processInvoice) {
        otherFeeIDs.push(other_fee_2_id);
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_2?.toUpperCase()}`,
            payment_amount: other_fee_2_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_2?.toUpperCase()} - ${payment_mode}${
              other_fee_2_note && `${' : '}${other_fee_2_note}`
            }`,
            payment_amount: other_fee_2_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      } else {
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_2?.toUpperCase()}`,
            payment_amount: other_fee_2_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_2?.toUpperCase()} - ${payment_mode}${
              other_fee_2_note && `${' : '}${other_fee_2_note}`
            }`,
            payment_amount: other_fee_2_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      }
    }

    if (other_fee_3_id && other_fee_3_amount) {
      particularsArray.push({
        desc: other_fee_3?.toUpperCase(),
        amount: other_fee_3_amount,
        note: other_fee_3_note,
      });

      if (processInvoice) {
        otherFeeIDs.push(other_fee_3_id);
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_3?.toUpperCase()}`,
            payment_amount: other_fee_3_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_3?.toUpperCase()} - ${payment_mode}${
              other_fee_3_note && `${' : '}${other_fee_3_note}`
            }`,
            payment_amount: other_fee_3_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      } else {
        paymentsArray.push(
          {
            student: student_id,
            academic_year,
            description: `${other_fee_3?.toUpperCase()}`,
            payment_amount: other_fee_3_amount,
            payment_type: 'Debit',
            payment_date: formatDateToString(new Date()),
            value_date,
          },
          {
            student: student_id,
            academic_year,
            description: `[${or_no}] ${other_fee_3?.toUpperCase()} - ${payment_mode}${
              other_fee_3_note && `${' : '}${other_fee_3_note}`
            }`,
            payment_amount: other_fee_3_amount,
            payment_type: 'Credit',
            payment_date: formatDateToString(new Date()),
            clerk: user?.userId,
            value_date,
            account_no,
          }
        );
      }
    }

    // Calculate the new ledger_balance correctly based on the scenarios
    let newBalance = 0;

    if (processInvoice && !amount_paid) {
      // Scenario: Student is paying for invoices only
      const previousBalance = studentLedger?.ledger_balance || 0;
      const invoiceAmount = total || 0;
      newBalance = previousBalance + (invoiceAmount - invoiceAmount);
    } else if (amount_paid) {
      // Scenario: Student is paying for tuition and invoice only
      const previousBalance = studentLedger?.ledger_balance || 0;
      newBalance = previousBalance - amount_paid;
    }

    try {
      if (particularsArray.length > 0) {
        particularsArray.forEach((particular) => {
          dispatch(
            createPayment({
              student: student_id,
              receipt_no: or_no,
              pad_no,
              description: particular.desc,
              payment_amount: particular.amount,
              payment_mode,
              note: particular.note,
              clerk: user?.userId,
              payment_date: formatDateToString(new Date()),
              academic_year,
              value_date,
              account_no,
              deposit_date,
              amount_in_words: numberToWords(particular.amount),
              change: parseFloat(total_payment_amount) - total || 0,
            })
          )
            .then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                toast.success('Payment successfully processed');
                if (studentLedger?._id) {
                  dispatch(
                    updateStudentLedger({
                      id: studentLedger?._id,
                      student: student_id,
                      ledger_balance: newBalance,
                      payments: paymentsArray,
                    })
                  ).then((res) => {
                    if (res.meta.requestStatus === 'fulfilled') {
                      dispatch(
                        fetchK12StudentLedger({
                          student_id,
                          academic_year,
                          year_level: studentProfile?.student_yearlevel?._id,
                        })
                      );
                    }
                  });
                } else {
                  dispatch(
                    createStudentLedger({
                      student: student_id,
                      academic_year,
                      ledger_balance: total || 0,
                      payments: paymentsArray,
                    })
                  ).then((res) => {
                    if (res.meta.requestStatus === 'fulfilled') {
                      dispatch(
                        fetchK12StudentLedger({
                          student_id,
                          academic_year,
                          year_level: studentProfile?.student_yearlevel?._id,
                        })
                      );
                    }
                  });
                }

                if (month && amount_paid) {
                  dispatch(
                    processEnrollmentPayment({
                      student_department: 'K-12',
                      month,
                      student: student_id,
                      academic_year,
                      year_level: k12StudentLoad?.year_level?._id,
                      amount_paid,
                    })
                  )
                    .then((ledgerUpdateResponse) => {
                      if (
                        ledgerUpdateResponse &&
                        ledgerUpdateResponse.meta.requestStatus === 'fulfilled'
                      ) {
                        if (
                          studentProfile?.student_enrollment_status !==
                          'enrolled'
                        ) {
                          return dispatch(
                            updateStudent({
                              _id: student_id,
                              student_date_enrolled: new Date(),
                              student_enrollment_status: 'enrolled',
                            })
                          );
                        }
                      }
                    })
                    .then((enrollmentStatusResponse) => {
                      if (
                        enrollmentStatusResponse &&
                        enrollmentStatusResponse.meta.requestStatus ===
                          'fulfilled'
                      ) {
                        return dispatch(
                          updateK12Enrollment({
                            _id: k12StudentLoad?._id,
                            enrollment_date: formatDateToString(new Date()),
                            payment_status: 'Paid',
                            enrolled: true,
                          })
                        );
                      }
                    });
                }

                if (processInvoice) {
                  otherFeeIDs.forEach((id) => {
                    dispatch(
                      updateStudentInvoice({
                        id,
                        status: 'Paid',
                        balance: 0,
                        paymentDate: formatDateToString(new Date()),
                      })
                    );
                  });
                }

                handleShowOR();
              }
            })
            .catch((err) => {
              handleHideOR();
              toast.error(err.message);
            });
        });
      }
    } catch (error) {
      handleHideOR();
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!student_id) return;

    dispatch(getStudent(student_id));
  }, [dispatch, student_id]);

  useEffect(() => {
    dispatch(fetchBankAccountNumbers());
  }, [dispatch]);

  useEffect(() => {
    if (
      payment_mode !== 'Online Bank Transfer' &&
      payment_mode !== 'Bank Deposit'
    ) {
      dispatch(handleChange({ name: 'account_no', value: '' }));
    }
  }, [dispatch, payment_mode]);

  return (
    <Stack mt={2} spacing={2}>
      <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          onClick={handleShowLedger}
        >
          View Ledger
        </Button>

        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={handleShowPayments}
        >
          View Payments
        </Button>
      </Stack>

      <Payments
        open={showPayments}
        handleClose={handleHidePayments}
        payment_scheme={student_payment_scheme}
      />

      <StudentLedger open={showLedger} handleClose={handleHideLedger} />

      <ORPreview
        open={showOR}
        onClose={handleHideOR}
        tuitionParticular={`${tuitionParticular} - ${month.toUpperCase()}`}
      />

      <ConfirmationModal
        title="Confirm Action"
        message={'Are you sure you want to process this payment?'}
        isOpen={showConfirmationModal}
        onCancel={handleCloseConfirmationModal}
        onConfirm={(e) => {
          e.preventDefault();
          processPayment();
          handleCloseConfirmationModal();
        }}
      />

      <Stack spacing={2}>
        {/* Tuition Fee Processing */}

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>Period</TableCell>
                <TableCell>To Pay</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell sx={{ width: '20%' }}>Payment</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={month}
                      name="month"
                      onChange={handleInputChange}
                      sx={{ mb: '21px' }}
                    >
                      {student_payment_scheme?.payment_scheme
                        ?.filter((scheme) => scheme.balance !== 0)
                        .map((scheme) => (
                          <MenuItem
                            key={scheme.month}
                            value={scheme.month}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {scheme.month}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ pb: '21px' }}>
                  {formatSalary(monthlyScheme?.to_pay || 0)}
                </TableCell>
                <TableCell sx={{ pb: '21px' }}>
                  {formatSalary(monthlyScheme?.balance || 0)}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <TextField
                      name="amount_paid"
                      value={amount_paid}
                      onChange={handleInputChange}
                      sx={{ mb: '21px' }}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <CharacterCountTextField
                    name={'tuition_note'}
                    value={tuition_note}
                    onChange={handleInputChange}
                    maxChars={20}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Other Payments Processing */}
        {!processInvoice && (
          <Fade
            in={!processInvoice}
            style={{ transformOrigin: '0 0 0' }}
            {...(!processInvoice ? { timeout: 1000 } : {})}
          >
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: '200px' }}>
                      Other Payments
                    </TableCell>
                    <TableCell sx={{ width: '300px' }}>Payment</TableCell>
                    <TableCell sx={{ width: '500px' }}>Note</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          value={other_fee_1_id}
                          name="other_fee_1_id"
                          onChange={(e) => {
                            dispatch(
                              handleChange({
                                name: 'other_fee_1_id',
                                value: e.target.value,
                              })
                            );
                            dispatch(setOtherFee1({ id: e.target.value }));
                          }}
                          MenuProps={MenuProps}
                          sx={{ mb: '21px' }}
                        >
                          <MenuItem value={''}>None</MenuItem>
                          {otherFees
                            ?.filter((fee) => !fee.isArchived)
                            .map((fee) => (
                              <MenuItem key={fee._id} value={fee._id}>
                                {fee.other_fee}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <TextField
                          name="other_fee_1_amount"
                          value={other_fee_1_amount || 0}
                          onChange={handleInputChange}
                          sx={{ mb: '21px' }}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <CharacterCountTextField
                        name={'other_fee_1_note'}
                        value={other_fee_1_note}
                        onChange={handleInputChange}
                        maxChars={20}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ width: '200px' }}>
                      <FormControl fullWidth>
                        <Select
                          value={other_fee_2_id}
                          name="other_fee_2_id"
                          onChange={(e) => {
                            handleInputChange(e);
                            dispatch(setOtherFee2({ id: e.target.value }));
                          }}
                          MenuProps={MenuProps}
                          sx={{ mb: '21px' }}
                        >
                          <MenuItem value={''}>None</MenuItem>
                          {otherFees
                            ?.filter((fee) => !fee.isArchived)
                            .map((fee) => (
                              <MenuItem key={fee._id} value={fee._id}>
                                {fee.other_fee}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <TextField
                          name="other_fee_2_amount"
                          value={other_fee_2_amount || 0}
                          onChange={handleInputChange}
                          sx={{ mb: '21px' }}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <CharacterCountTextField
                        name={'other_fee_2_note'}
                        value={other_fee_2_note}
                        onChange={handleInputChange}
                        maxChars={20}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ width: '200px' }}>
                      <FormControl fullWidth>
                        <Select
                          value={other_fee_3_id}
                          name="other_fee_3_id"
                          onChange={(e) => {
                            handleInputChange(e);
                            dispatch(setOtherFee3({ id: e.target.value }));
                          }}
                          MenuProps={MenuProps}
                          sx={{ mb: '21px' }}
                        >
                          <MenuItem value={''}>None</MenuItem>
                          {otherFees
                            ?.filter((fee) => !fee.isArchived)
                            .map((fee) => (
                              <MenuItem key={fee._id} value={fee._id}>
                                {fee.other_fee}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <TextField
                          name="other_fee_3_amount"
                          value={other_fee_3_amount || 0}
                          onChange={handleInputChange}
                          sx={{ mb: '21px' }}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <CharacterCountTextField
                        name={'other_fee_3_note'}
                        value={other_fee_3_note}
                        onChange={handleInputChange}
                        maxChars={20}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        )}

        {processInvoice && (
          <Fade
            in={!processInvoice}
            style={{ transformOrigin: '0 0 0' }}
            {...(!processInvoice ? { timeout: 1000 } : {})}
          >
            <>
              <StudentPayable />
            </>
          </Fade>
        )}

        {/* Total Payment Processing */}
        <Stack alignItems={'flex-end'} spacing={1}>
          <Box my={1}>
            <Typography variant="h4">Total: {formatSalary(total)}</Typography>
          </Box>

          <Stack sx={{ width: '340px' }} direction={'row'} spacing={1}>
            <FormControl fullWidth>
              <InputLabel id="payment-mode-select">Payment Mode</InputLabel>
              <Select
                labelId="payment-mode-select"
                id="payment-mode"
                label="Payment Mode"
                value={payment_mode}
                name="payment_mode"
                onChange={handleInputChange}
              >
                <MenuItem value={'Cash'}>Cash</MenuItem>
                <MenuItem value={'Bank Deposit'}>Bank Deposit</MenuItem>
                <MenuItem value={'Cheque'}>Cheque</MenuItem>
                <MenuItem value={'Salary Deduction'}>Salary Deduction</MenuItem>
                <MenuItem value={'Online Bank Transfer'}>
                  Online Bank Transfer
                </MenuItem>
              </Select>
            </FormControl>

            {payment_mode === 'Online Bank Transfer' ||
            payment_mode === 'Bank Deposit' ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="bank-account-number">Account No.</InputLabel>
                  <Select
                    labelId="bank-account-number"
                    value={account_no}
                    name="account_no"
                    onChange={handleInputChange}
                    label="Account No."
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
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
              </>
            ) : null}
          </Stack>

          {payment_mode === 'Online Bank Transfer' ||
            (payment_mode === 'Bank Deposit' && (
              <Stack sx={{ width: '340px' }}>
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    name="deposit_date"
                    value={deposit_date}
                    onChange={handleInputChange}
                    helperText="Deposit Date"
                  />
                </FormControl>
              </Stack>
            ))}

          <Stack sx={{ width: '340px' }} direction={'row'} spacing={1}>
            <FormControl fullWidth>
              <TextField
                label="Received Payment"
                name="total_payment_amount"
                type="number"
                value={total_payment_amount}
                onChange={handleInputChange}
                inputProps={{
                  min: 0,
                  step: 0.01,
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Change"
                name="change_amount"
                value={
                  total_payment_amount
                    ? formatSalary(parseFloat(total_payment_amount) - total)
                    : 0
                }
                onChange={(e) =>
                  dispatch(
                    handleChange({ name: e.target.name, value: e.target.value })
                  )
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button
          variant={processInvoice ? 'contained' : 'outlined'}
          size="small"
          color={processInvoice ? 'warning' : 'secondary'}
          onClick={handleToggleInvoicing}
        >
          {processInvoice ? 'Cancel Other Payable' : 'Other Payable'}
        </Button>

        {processInvoice ? (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => setShowConfirmationModal(true)}
          >
            Process Payment
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => setShowConfirmationModal(true)}
          >
            Collect Fee
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

const Payments = ({ open, handleClose, payment_scheme }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          ...styles,
        }}
      >
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">To Pay</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payment_scheme?.payment_scheme?.map((scheme) => (
                <TableRow key={scheme.month}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {scheme.month}
                  </TableCell>
                  <TableCell align="right">
                    {formatSalary(scheme.to_pay)}
                  </TableCell>
                  <TableCell align="right">
                    {scheme.balance > 0 ? (
                      <Chip
                        label={formatSalary(scheme.balance)}
                        color="warning"
                      />
                    ) : (
                      <Chip label="Paid Full" color="success" />
                    )}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell
                  colSpan={2}
                  component="th"
                  scope="row"
                  sx={{ textTransform: 'capitalize' }}
                  align="right"
                >
                  Total Balance:
                </TableCell>
                <TableCell align="right">
                  {formatSalary(payment_scheme?.total ?? 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack alignItems={'flex-end'}>
          <Box mt={3}>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Modal>
  );
};

const StudentLedger = ({ open, handleClose }) => {
  const { studentLedger } = useSelector((state) => state.cashier);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          ...styles,
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '600px',
          overflowY: 'scroll',
        }}
      >
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontWeight: 700 }}>
                  <Stack alignItems={'flex-end'}>
                    <Card sx={{ maxWidth: '200px' }} raised={true}>
                      <CardContent
                        sx={{ backgroundColor: '#9e1313' }}
                        style={{ padding: '10px' }}
                      >
                        <Typography color="white" fontWeight={600}>
                          Balance:{' '}
                          {studentLedger?.ledger_balance
                            ? formatSalary(studentLedger?.ledger_balance)
                            : formatSalary(0.0)}
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
                <TableCell>Fee Amount</TableCell>
                <TableCell>Payment</TableCell>
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
                  payment.value_date !==
                    studentLedger.payments[index - 1].value_date;

                return (
                  <TableRow key={index}>
                    {isFirstPaymentOfDay ? (
                      <TableCell>
                        {payment?.value_date
                          ? DateTime.fromISO(
                              payment?.value_date
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
      </Paper>
    </Modal>
  );
};

export { Payments, StudentLedger };
export default K12PaymentEntry;
