import {
  Button,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import AddK12PaymentScheme from 'src/components/finance/AddK12PaymentScheme';
import styles from 'src/components/modalBoxStyle';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteK12PaymentScheme,
  fetchPaymentSchemes,
  handleChange,
  toggleAddK12PaymentScheme,
  toggleEditK12PaymentScheme,
} from 'src/features/financeFeatures/financeSlice';
import {
  getAllAcademicYears,
  getAllYearLevels,
  setDynamicData,
} from 'src/features/registrarFeatures/registrarSlice';

const K12PaymentScheme = () => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentScheme, setPaymentScheme] = useState({});
  const [open, setOpen] = useState(false);
  const { isFetchingK12PaymentSchemes, k12PaymentSchemes } = useSelector(
    (state) => state.finance
  );

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (k12PaymentScheme) => {
    const values = k12PaymentScheme.payment_scheme;

    values.forEach(({ month, to_pay }) => {
      if (month === 'miscellaneous-1') {
        dispatch(handleChange({ name: 'miscellaneous_1', value: to_pay }));
      } else if (month === 'miscellaneous-2') {
        dispatch(handleChange({ name: 'miscellaneous_2', value: to_pay }));
      } else {
        dispatch(handleChange({ name: month, value: to_pay }));
      }
    });

    dispatch(
      handleChange({ name: 'payment_scheme_id', value: k12PaymentScheme._id })
    );

    dispatch(
      setDynamicData({
        academic_year_id: k12PaymentScheme.academic_year._id,
        year_level_id: k12PaymentScheme.year_level._id,
      })
    );

    dispatch(toggleEditK12PaymentScheme());
  };

  const handleDelete = () => {
    dispatch(deleteK12PaymentScheme(paymentScheme._id));
  };

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllYearLevels());
    dispatch(fetchPaymentSchemes());
  }, [dispatch]);

  return (
    <Stack>
      <AddK12PaymentScheme />
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(toggleAddK12PaymentScheme())}
          startIcon={<IconPlus />}
        >
          Add New
        </Button>
      </Stack>

      <ConfirmationModal
        title="Confirm Action"
        message={'Are you sure you want to delete Payment Scheme?'}
        isOpen={showConfirmationModal}
        onCancel={handleCloseConfirmationModal}
        onConfirm={(e) => {
          e.preventDefault();
          handleDelete();
          handleCloseConfirmationModal();
        }}
      />

      {isFetchingK12PaymentSchemes && <LoadingData />}

      <Paper sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Academic Year</TableCell>
                <TableCell>Year Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <PaymentScheme
              open={open}
              close={handleClose}
              k12PaymentScheme={paymentScheme}
            />

            <TableBody>
              {k12PaymentSchemes
                ?.filter(
                  (k12PaymentScheme) =>
                    k12PaymentScheme.isActive &&
                    k12PaymentScheme.department === 'K-12'
                )
                .map((k12PaymentScheme) => (
                  <TableRow key={k12PaymentScheme._id}>
                    <TableCell>
                      {k12PaymentScheme?.academic_year?.school_year}
                    </TableCell>
                    <TableCell>
                      {k12PaymentScheme?.year_level?.year_level_name}
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setPaymentScheme(k12PaymentScheme);
                            handleOpen();
                          }}
                        >
                          View
                        </Button>

                        <Button
                          color="warning"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleEdit(k12PaymentScheme);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          color="secondary"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setPaymentScheme(k12PaymentScheme);
                            setShowConfirmationModal(true);
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

const PaymentScheme = ({ open, close, k12PaymentScheme }) => {
  if (!k12PaymentScheme) return null;

  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, maxWidth: '500px', pt: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Stack direction={'row'}></Stack>
                  <Typography variant="h4" gutterBottom>
                    {k12PaymentScheme?.year_level?.year_level_name}
                  </Typography>

                  <Typography variant="h4">
                    {k12PaymentScheme?.academic_year?.school_year}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {k12PaymentScheme?.payment_scheme?.map(({ month, to_pay }) => (
                <TableRow key={month}>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {month}
                  </TableCell>
                  <TableCell>{to_pay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
};

export default K12PaymentScheme;
