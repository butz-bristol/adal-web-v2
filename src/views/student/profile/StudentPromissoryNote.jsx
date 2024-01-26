import {
  Box,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { IconEdit, IconSearch } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import PromissoryNoteModal from 'src/components/student/PromissoryNoteModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearPromissoryNote,
  deletePromissoryNote,
  getPromissoryNote,
  getPromissoryNotesByStudentId,
  toggleEditPromissoryNote,
} from 'src/features/studentFeatures/studentSlice';

const StudentPromissoryNote = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const {
    promissoryNotes,
    promissoryNote,
    isFetchingStudentPromisorryNotes,
    isFetchingStudentPromisorryNote,
    isCreatingPromissoryNote,
    isUpdatingPromissoryNote,
    isDeletingPromissoryNote,
  } = useSelector((state) => state.students);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filterPromissoryNotes = promissoryNotes.filter(
    (item) => item.isArchived == false
  );

  const filteredData = filterPromissoryNotes.filter((item) => {
    const reason = `${item.reason}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return reason.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'reason') {
      const propertyA = `${a.reason} ${a.reason}`.toLowerCase();
      const propertyB = `${b.reason} ${b.reason}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (paginatedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th">{item.reason}</TableCell>
        <TableCell component="th">
          {DateTime.fromISO(item.promissoryNoteDate).toFormat('LLLL dd, yyyy')}
        </TableCell>
        <TableCell component="th">
          {DateTime.fromISO(item.promissoryNotePaymentDate).toFormat(
            'LLLL dd, yyyy'
          )}
        </TableCell>
        <TableCell component="th">
          <Chip
            label={item.status}
            size="small"
            color={
              item.status === 'approved' ||
              item.status === 'approved with pending requirements'
                ? 'success'
                : item.remarks === 'pending'
                  ? 'default'
                  : 'error'
            }
          />
        </TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(toggleEditPromissoryNote());
                dispatch(getPromissoryNote(item._id));
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getPromissoryNotesByStudentId());
  }, []);

  return (
    <>
      <PromissoryNoteModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this?'}
        onConfirm={() => {
          dispatch(deletePromissoryNote(promissoryNote._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearPromissoryNote());
          setShowConfirmationModal(false);
        }}
      />
      {isFetchingStudentPromisorryNote ||
        isCreatingPromissoryNote ||
        isUpdatingPromissoryNote ||
        (isDeletingPromissoryNote && <LoadingScreen />)}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} md={6} spacing={1}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingStudentPromisorryNotes ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reason</TableCell>
                      <TableCell>Request Date</TableCell>
                      <TableCell>Payment Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderTableBody()}</TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StudentPromissoryNote;
