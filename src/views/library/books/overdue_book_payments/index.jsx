import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LinkComponent from 'src/components/LinkComponent';
import {
  createOtherFee,
  deleteOtherFee,
  fetchAllOtherFees,
  handleChange,
  resetEditOtherFee,
  setEditOtherFee,
  setOtherFee,
  updateOtherFee,
} from 'src/features/financeFeatures/financeSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { extractRole } from 'src/utils/helperFunctions';
const OtherFees = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 25, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { otherFees } = useSelector((state) => state.finance);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const otherFeesArray = [];
  const userRole = extractRole(user?.user_role);
  const libraryFees = otherFees.filter(
    (fee) => fee.other_fee === 'BOOK OVERDUE'
  );
  const tableData =
    userRole === 'library'
      ? libraryFees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : otherFees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - otherFees.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchAllOtherFees());
  }, [dispatch]);

  return (
    <Stack>
      <Stack maxWidth={150}>
        <Button variant="contained" onClick={handleOpen}>
          Add New Fee
        </Button>
      </Stack>

      <AddOtherFee open={open} handleClose={handleClose} />

      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="center">Due Date</TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0 ? tableData : otherFees)?.map((otherFee) => (
                <TableRow key={otherFee._id}>
                  <TableCell>{otherFees.indexOf(otherFee) + 1}</TableCell>
                  <TableCell>{otherFee.other_fee}</TableCell>
                  <TableCell>
                    {otherFee.fee_amount ? otherFee.fee_amount : 0}
                  </TableCell>
                  <TableCell align="center">
                    {otherFee.other_fee_due_date
                      ? DateTime.fromISO(
                          otherFee.other_fee_due_date
                        ).toLocaleString(DateTime.DATE_MED)
                      : ' - '}
                  </TableCell>
                  <TableCell align="center">
                    {otherFee.createdBy
                      ? `${otherFee.createdBy.first_name} ${otherFee.createdBy.last_name}`
                      : ''}
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
                          dispatch(
                            setEditOtherFee({
                              _id: otherFee._id,
                              other_fee: otherFee.other_fee,
                              fee_amount: otherFee.fee_amount,
                              other_fee_due_date: otherFee.other_fee_due_date
                                ? otherFee.other_fee_due_date
                                : '',
                            })
                          );
                          handleOpen();
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => dispatch(deleteOtherFee(otherFee._id))}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <LinkComponent
                      to={
                        userRole === 'library'
                          ? `/${extractRole(user?.user_role)}/books/payments/${
                              otherFee._id
                            }`
                          : `/${extractRole(
                              user?.user_role
                            )}/setup-fees/other-fee/${otherFee._id}`
                      }
                      onClick={() => dispatch(setOtherFee(otherFee))}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="text" size="small">
                        View Students
                      </Button>
                    </LinkComponent>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 0 }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={userRole === 'library' ? libraryFees.length : otherFees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Stack>
  );
};

const AddOtherFee = ({ open, handleClose }) => {
  const {
    other_fee_name,
    isCreatingOtherFee,
    other_fee_due_date,
    isUpdatingOtherFee,
    editOtherFee,
    editOtherFeeId,
    fee_amount,
  } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const clearFields = () => {
    handleClose();
    dispatch(resetEditOtherFee());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!other_fee_name) {
      toast.error('Fee name is required');
      return;
    }

    if (editOtherFee) {
      dispatch(
        updateOtherFee({
          other_fee: other_fee_name,
          id: editOtherFeeId,
          fee_amount,
          other_fee_due_date,
        })
      );

      clearFields();
      return;
    }

    dispatch(
      createOtherFee({
        other_fee: other_fee_name,
        fee_amount,
        other_fee_due_date,
      })
    );

    clearFields();
  };

  return (
    <Modal
      open={open}
      onClose={clearFields}
      aria-labelledby="add-other-fee-modal"
      aria-describedby="add-other-fee-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="other_fee_name"
                label="Fee Name"
                value={other_fee_name}
                onChange={handleInput}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="fee_amount"
                label="Fee Amount"
                value={fee_amount || ''}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormHelperText id="other-fee-due-date">
                Due Date (optional)
              </FormHelperText>
              <OutlinedInput
                id="other-fee-due-date"
                type="date"
                name="other_fee_due_date"
                label="Due Date"
                value={DateTime.fromISO(other_fee_due_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3} alignSelf="flex-end">
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleSubmit}>
                {editOtherFee ? (
                  isUpdatingOtherFee ? (
                    <CircularProgress size={20} color="primary" />
                  ) : (
                    'Update'
                  )
                ) : isCreatingOtherFee ? (
                  <CircularProgress size={20} color="primary" />
                ) : (
                  'Add New'
                )}
              </Button>

              {editOtherFee && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    dispatch(resetEditOtherFee());
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default OtherFees;
