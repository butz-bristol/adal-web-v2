import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import AddBankAccountNumber from 'src/components/finance/AddBankAccountNumber';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteBankAccountNumber,
  fetchBankAccountNumbers,
  setDynamicData,
  toggleAddBankNo,
  toggleEditBankNo,
} from 'src/features/financeFeatures/financeSlice';

const BankAccounts = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const {
    bankAccountNumbers,
    isFetchingBankAccountNumbers,
    isUpdatingBankAccountNumber,
    isCreatingBankAccountNumber,
    isDeletingBankAccountNumber,
  } = useSelector((state) => state.finance);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchBankAccountNumbers());
  }, [dispatch]);

  return (
    <Stack>
      <Stack alignItems={'flex-end'} mb={2}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 'fit-content' }}
          onClick={() => dispatch(toggleAddBankNo())}
          startIcon={<IconPlus />}
        >
          Add New
        </Button>
      </Stack>

      <AddBankAccountNumber />

      <ConfirmationModal
        isOpen={open}
        onCancel={handleClose}
        onConfirm={() => {
          dispatch(deleteBankAccountNumber(id));
          handleClose();
        }}
        message={'Are you sure you want to delete this account number?'}
        title="Delete Account Number"
      />

      {(isFetchingBankAccountNumbers ||
        isCreatingBankAccountNumber ||
        isDeletingBankAccountNumber ||
        isUpdatingBankAccountNumber) && <LoadingScreen />}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account No.</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankAccountNumbers
                ?.filter((detail) => !detail?.isDeleted)
                .map((detail) => (
                  <TableRow key={detail._id}>
                    <TableCell>{detail.bank_account_number}</TableCell>
                    <TableCell>{detail?.bank_account_name || ' - '}</TableCell>
                    <TableCell>{detail?.bank_account_type || ' - '}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ width: 'fit-content' }}
                          onClick={() => {
                            dispatch(toggleEditBankNo());
                            dispatch(
                              setDynamicData({
                                bank_account_no: detail.bank_account_number,
                                bank_account_name: detail.bank_account_name,
                                bank_account_type: detail.bank_account_type,
                                bank_account_id: detail._id,
                              })
                            );
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ width: 'fit-content' }}
                          onClick={() => {
                            setId(detail._id);
                            handleOpen();
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

export default BankAccounts;
