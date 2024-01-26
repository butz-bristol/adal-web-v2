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
import LinkComponent from 'src/components/LinkComponent';
import LoadingScreen from 'src/components/LoadingScreen';
import AddGrantOrVoucherModal from 'src/components/registrar/AddGrantOrVoucherModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteGrantsAndVouchers,
  getAllAcademicYears,
  getGrantsAndVouchers,
  getGrantsNumberFormats,
  setGrantAndVoucher,
} from 'src/features/registrarFeatures/registrarSlice';
import { extractRole, formatSalary } from 'src/utils/helperFunctions';

const GrantsAndVouchers = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [grantAndVoucherId, setGrantAndVoucherId] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const {
    grantsAndVouchers,
    isFetchingGrantsAndVouchers,
    isUpdatingGrantsAndVoucher,
    isDeletingGrantsAndVoucher,
  } = useSelector((state) => state.registrar);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getGrantsAndVouchers());
    dispatch(getAllAcademicYears());
    dispatch(getGrantsNumberFormats());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction="row" justifyContent={'space-between'}>
        <LinkComponent
          to={`/${extractRole(
            user?.user_role
          )}/grants-and-vouchers/grant-number-format`}
        >
          <Button variant="outlined" color="primary">
            Grant/Voucher No. Format
          </Button>
        </LinkComponent>

        <Button
          variant="contained"
          startIcon={<IconPlus />}
          color="secondary"
          onClick={handleOpen}
        >
          Add New
        </Button>
      </Stack>

      <AddGrantOrVoucherModal open={open} handleClose={handleClose} />

      <ConfirmationModal
        isOpen={openModal}
        title="Delete Grant/Voucher"
        message={'Are you sure you want to delete this grant/voucher?'}
        onCancel={() => {
          setOpenModal(false);
          setGrantAndVoucherId('');
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(deleteGrantsAndVouchers(grantAndVoucherId));
          setOpenModal(false);
          setGrantAndVoucherId('');
        }}
      />

      {(isFetchingGrantsAndVouchers ||
        isDeletingGrantsAndVoucher ||
        isUpdatingGrantsAndVoucher) && <LoadingScreen />}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>School Year</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {grantsAndVouchers?.map((grantAndVoucher) => (
              <TableRow key={grantAndVoucher._id}>
                <TableCell>{grantAndVoucher.name}</TableCell>
                <TableCell>{grantAndVoucher.type}</TableCell>
                <TableCell>
                  {grantAndVoucher.amount &&
                    formatSalary(grantAndVoucher.amount)}
                </TableCell>
                <TableCell>{grantAndVoucher.status}</TableCell>
                <TableCell>
                  {grantAndVoucher.academic_year?.school_year}
                </TableCell>
                <TableCell>
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => {
                        handleOpen();
                        dispatch(
                          setGrantAndVoucher({
                            _id: grantAndVoucher._id,
                            grant_or_voucher: grantAndVoucher.name,
                            grant_or_voucher_amount: grantAndVoucher.amount,
                            grant_or_voucher_status: grantAndVoucher.status,
                            grant_or_voucher_type: grantAndVoucher.type,
                            academic_year_id:
                              grantAndVoucher.academic_year?._id,
                          })
                        );
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => {
                        setOpenModal(true);
                        setGrantAndVoucherId(grantAndVoucher._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell>
                  <LinkComponent
                    to={`/${extractRole(
                      user?.user_role
                    )}/grant-and-vouchers/students/${grantAndVoucher._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="text" size="small">
                      View Students
                    </Button>
                  </LinkComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default GrantsAndVouchers;
