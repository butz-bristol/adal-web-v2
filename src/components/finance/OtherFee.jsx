import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  IconAffiliate,
  IconArrowNarrowLeft,
  IconCircleX,
  IconDiscountCheck,
  IconHistoryToggle,
  IconHourglassHigh,
  IconSquareX,
  IconTrashX,
  IconUserPlus,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PaginationButtons from 'src/components/hr/PaginationButtons';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  cancelStudentInvoice,
  deleteStudentInvoice,
  fetchAllAcademicDepartments,
  fetchAllStudentInvoices,
  fetchInvoiceNumberFormats,
  resetOtherFee,
} from 'src/features/financeFeatures/financeSlice';
import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
  getRegisteredStudents,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { extractRole } from 'src/utils/helperFunctions';
import AssignOtherFee from './AssignOtherFee';
import BulkAssignOtherFee from './BulkAssignOtherFee';

const OtherFee = () => {
  const [open, setOpen] = useState(false);
  const [openBulk, setOpenBulk] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
  const { studentInvoices, isFetchingAcademicDepartments } = useSelector(
    (state) => state.finance
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenBulk = () => setOpenBulk(true);
  const handleCloseBulk = () => setOpenBulk(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchAllStudentInvoices());
    dispatch(getRegisteredStudents());
    dispatch(getAllYearLevels());
    dispatch(fetchInvoiceNumberFormats());
    dispatch(fetchAllAcademicDepartments());
    dispatch(getAllPrograms());
    dispatch(getAllCollegeTracks());
    dispatch(getAllDepartments());
    dispatch(getAllAcademicYears());
    dispatch(getAllSemesters());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Button variant="outlined" size="small">
          <Link
            to={`/${extractRole(user.user_role)}/setup-fees/other-fees`}
            onClick={() => dispatch(resetOtherFee())}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconArrowNarrowLeft />
            Back
          </Link>
        </Button>

        <Stack spacing={1} direction="row">
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconAffiliate size="17px" />}
            onClick={handleOpenBulk}
            disabled={isFetchingAcademicDepartments}
            color="info"
          >
            Bulk Assign
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<IconUserPlus size="17px" />}
            onClick={handleOpen}
            color="secondary"
          >
            Assign Fee
          </Button>
        </Stack>
      </Stack>

      <AssignOtherFee open={open} handleClose={handleClose} feeId={id} />
      <BulkAssignOtherFee
        open={openBulk}
        handleClose={handleCloseBulk}
        feeId={id}
      />

      <Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice No.</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {studentInvoices
                .filter(
                  (invoice) =>
                    invoice.status !== 'Canceled' && invoice.otherFee._id === id
                )
                .map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell>{invoice?.invoice_number}</TableCell>
                    <TableCell>{invoice?.student?.student_number}</TableCell>
                    <TableCell>
                      {invoice?.student?.student_first_name}{' '}
                      {invoice?.student?.student_last_name}
                    </TableCell>
                    <TableCell>
                      {invoice?.status === 'Paid' ? (
                        <Tooltip title="Paid" TransitionComponent={Zoom}>
                          <IconButton>
                            <IconDiscountCheck
                              size={20}
                              strokeWidth={1.5}
                              color="green"
                            />
                          </IconButton>
                        </Tooltip>
                      ) : invoice?.status === 'Unpaid' ? (
                        <>
                          <Tooltip title="Unpaid" TransitionComponent={Zoom}>
                            <IconButton>
                              <IconHistoryToggle
                                size={20}
                                strokeWidth={1.5}
                                color="orange"
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cancel" TransitionComponent={Zoom}>
                            <IconButton
                              onClick={() =>
                                dispatch(cancelStudentInvoice(invoice?._id))
                              }
                            >
                              <IconCircleX
                                size={20}
                                strokeWidth={1.5}
                                color="red"
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : invoice?.status === 'Partially Paid' ? (
                        <Tooltip
                          title="Partially Paid"
                          TransitionComponent={Zoom}
                        >
                          <IconButton>
                            <IconHourglassHigh
                              size={20}
                              strokeWidth={1.5}
                              color="blue"
                            />
                          </IconButton>
                        </Tooltip>
                      ) : invoice?.status === 'Cancelled' ? (
                        <Tooltip title="Canceled" TransitionComponent={Zoom}>
                          <IconButton>
                            <IconSquareX
                              size={20}
                              strokeWidth={1.5}
                              color="red"
                            />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete" TransitionComponent={Zoom}>
                        <IconButton
                          color="error"
                          onClick={() =>
                            dispatch(deleteStudentInvoice(invoice?._id))
                          }
                        >
                          <IconTrashX />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationButtons />
      </Stack>
    </Stack>
  );
};

export default OtherFee;
