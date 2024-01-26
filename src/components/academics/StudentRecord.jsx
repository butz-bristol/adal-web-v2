import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
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
  Tooltip,
} from '@mui/material';

import {
  IconDatabaseImport,
  IconEdit,
  IconFilePlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';

import {
  clearStudentRecord,
  deleteStudentRecord,
  getStudentRecordById,
  toggleAddStudentRecord,
  toggleEditStudentRecord,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import AddStudentRecordModal from './AddStudentRecordModal';
import EditStudentRecordModal from './EditStudentRecordModal';

const StudentRecord = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { k12StudentLoad } = useSelector((state) => state.registrar);
  const {
    isFetchingStudentRecords,
    isCreatingStudentRecord,
    isDeletingStudentRecord,
    studentRecords,
    studentRecord,
  } = useSelector((state) => state.academics);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const filteredData = k12StudentLoad.filter((item) => {
    const school_year = `${item.academic_year?.school_year}`;
    const department = `${item.department?.department_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      school_year.toLowerCase().includes(searchTermLowerCase) ||
      department.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'school_year') {
      const propertyA =
        `${a.academic_year?.school_year} ${a.academic_year?.school_year}`.toLowerCase();
      const propertyB =
        `${b.academic_year?.school_year} ${b.academic_year?.school_year}`.toLowerCase();

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
          <TableCell colSpan={6} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th">{item.academic_year?.school_year}</TableCell>
        <TableCell component="th">{item.department?.department_name}</TableCell>
        <TableCell component="th">
          {item.college_track
            ? item.college_track?.college_track_name
            : 'Not Applicable'}
        </TableCell>
        <TableCell component="th">
          {item.program ? item.program?.program_name : 'Not Applicable'}
        </TableCell>
        <TableCell component="th">{item.level?.year_level_name}</TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getStudentRecordById(item._id));
                dispatch(toggleEditStudentRecord());
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(getStudentRecordById(item._id));
                setShowConfirmationModal(true);
              }}
            >
              <IconTrash />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Stack>
      <AddStudentRecordModal />
      <EditStudentRecordModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this record?'}
        onConfirm={() => {
          dispatch(deleteStudentRecord(studentRecord));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearStudentRecord());
          setShowConfirmationModal(false);
        }}
      />
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
        <Grid container item xs={12} md spacing={1} justifyContent="flex-end">
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<IconFilePlus />}
              onClick={() => dispatch(toggleAddStudentRecord())}
            >
              New Record
            </Button>
          </Grid>
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<IconDatabaseImport size={'17px'} />}
            >
              Import CSV
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingStudentRecords ||
          isCreatingStudentRecord ||
          isDeletingStudentRecord ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>School Year</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>College or Track</TableCell>
                      <TableCell>Program</TableCell>
                      <TableCell>Level</TableCell>
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
    </Stack>
  );
};

export default StudentRecord;
