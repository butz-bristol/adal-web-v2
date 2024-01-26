import {
  Button,
  FormControl,
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
  Tooltip,
} from '@mui/material';
import {
  IconAffiliate,
  IconArrowNarrowLeft,
  IconCircleXFilled,
  IconTrashXFilled,
  IconUserPlus,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import AssignGrantOrVoucher from 'src/components/registrar/AssignGrantOrVoucher';
import BulkAssignGrantOrVoucher from 'src/components/registrar/BulkAssignGrantOrVoucher';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  cancelStudentGrant,
  deleteStudentGrant,
  fetchAllStudentGrants,
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
  getGrantAndVoucher,
  getGrantsNumberFormats,
  getRegisteredStudents,
  handleChange,
  updateStudentGrant,
} from 'src/features/registrarFeatures/registrarSlice';
import { extractRole } from 'src/utils/helperFunctions';
import { getAllSemesters } from '../../features/registrarFeatures/registrarSlice';
const StudentsGrantsAndVouchers = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [50, 100, 150];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentVoucherId, setStudentVoucherId] = useState('');
  const [openBulkAssign, setOpenBulkAssign] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const {
    studentGrantsAndVouchers,
    isFetchingStudentGrantsAndVouchers,
    isDeletingStudentGrantAndVoucher,
    isUpdatingStudentGrantsAndVouchers,
    activeAcademicYear,
  } = useSelector((state) => state.registrar);

  const handleOpen = () => {
    setOpen(true);
    dispatch(
      handleChange({ name: 'academic_year_id', value: activeAcademicYear?._id })
    );
    dispatch(
      handleChange({
        name: 'date_issued',
        value: new Date().toISOString().split('T')[0],
      })
    );
    dispatch(handleChange({ name: 'voucher_status', value: 'Active' }));
  };
  const handleClose = () => setOpen(false);

  const handleOpenBulkAssign = () => setOpenBulkAssign(true);
  const handleCloseBulkAssign = () => setOpenBulkAssign(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  let filteredStudents = studentGrantsAndVouchers?.filter((data) => {
    if (!searchQuery) return data;

    return `${data?.student?.student_first_name} ${data?.student?.student_last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const rows = filteredStudents?.filter(
    (data) => data?.status !== 'Cancelled' && data?.grant_or_voucher?._id === id
  );

  useEffect(() => {
    dispatch(getRegisteredStudents());
    dispatch(getGrantsNumberFormats());
    dispatch(fetchAllStudentGrants());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllYearLevels());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    setPage(0);
    setSearchQuery('');
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;

    dispatch(getGrantAndVoucher(id));
  }, [dispatch, id]);

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
        alignItems={'center'}
      >
        <Stack direction="row" spacing={2} alignItems={'center'}>
          <LinkComponent
            to={`/${extractRole(user?.user_role)}/grants-and-vouchers`}
          >
            <Button variant="outlined" color="secondary">
              <IconArrowNarrowLeft />
              Back
            </Button>
          </LinkComponent>

          <Stack>
            <FormControl>
              <InputLabel id="name-search">Search By Name</InputLabel>
              <OutlinedInput
                label="Search By Name"
                placeholder="Selena Gomez"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                endAdornment={
                  <IconButton
                    disabled={!searchQuery}
                    color="error"
                    size="small"
                    onClick={() => setSearchQuery('')}
                  >
                    <IconX />
                  </IconButton>
                }
              />
            </FormControl>
          </Stack>
        </Stack>

        <Stack spacing={1} direction="row">
          <Button
            variant="contained"
            color="warning"
            startIcon={<IconAffiliate size="17px" />}
            onClick={handleOpenBulkAssign}
          >
            Bulk Assign
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<IconUserPlus size="17px" />}
            onClick={handleOpen}
          >
            Assign Fee
          </Button>
        </Stack>
      </Stack>

      <ConfirmationModal
        isOpen={openModal}
        title="Delete Student Grant/Voucher"
        message={'Are you sure you want to delete this student grant/voucher?'}
        onCancel={() => {
          setOpenModal(false);
          setStudentVoucherId('');
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(deleteStudentGrant(studentVoucherId));
          setOpenModal(false);
          setStudentVoucherId('');
        }}
      />

      <AssignGrantOrVoucher open={open} close={handleClose} />
      <BulkAssignGrantOrVoucher
        open={openBulkAssign}
        close={handleCloseBulkAssign}
      />

      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Grant No.</TableCell>
                <TableCell>Student No.</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Claim Status</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              )?.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data?.grant_or_voucher_number}</TableCell>
                  <TableCell>{data?.student?.student_number}</TableCell>
                  <TableCell>{`${data?.student?.student_first_name} ${data?.student?.student_last_name}`}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      id="grant-or-voucher-status"
                      value={data?.claimed ? 'Claimed' : 'Pending'}
                      onChange={(e) => {
                        dispatch(
                          updateStudentGrant({
                            _id: data?._id,
                            claimed:
                              e.target.value === 'Claimed' ? true : false,
                          })
                        );
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Claimed">Claimed</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Select
                      id="grant-or-voucher-status"
                      size="small"
                      value={data?.status}
                      onChange={(e) => {
                        dispatch(
                          updateStudentGrant({
                            _id: data?._id,
                            status: e.target.value,
                          })
                        );
                      }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Claimed">Claimed</MenuItem>
                      <MenuItem value="Forfeited">Forfeited</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                      <MenuItem value="Expired">Expired</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={1}
                    >
                      <Tooltip title="Cancel">
                        <IconButton
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() =>
                            dispatch(cancelStudentGrant(data?._id))
                          }
                        >
                          <IconCircleXFilled />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            setStudentVoucherId(data?._id);
                            setOpenModal(true);
                          }}
                        >
                          <IconTrashXFilled />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {rows?.length === 0 && (
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
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          count={rows?.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {(isFetchingStudentGrantsAndVouchers ||
        isDeletingStudentGrantAndVoucher ||
        isUpdatingStudentGrantsAndVouchers) && <LoadingData />}
    </Stack>
  );
};
export default StudentsGrantsAndVouchers;
