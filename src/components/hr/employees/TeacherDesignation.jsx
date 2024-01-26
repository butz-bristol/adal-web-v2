import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
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
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  IconDatabaseImport,
  IconEdit,
  IconSearch,
  IconSquarePlus,
  IconTrash,
} from '@tabler/icons-react';

import {
  clearTeacherDesignation,
  deleteTeacherDesignationById,
  getAllTeacherDesignations,
  getTeacherDesignationById,
  toggleAddTeacherDesignation,
  toggleEditTeacherDesignation,
} from 'src/features/hrFeatures/coreHr/hrSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AddTeacherDesignationModal from 'src/components/hr/employees/AddTeacherDesignationModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { getAllDepartments } from 'src/features/registrarFeatures/registrarSlice';

const TeacherDesignation = () => {
  const dispatch = useDispatch();

  const {
    isCreatingTeacherDesignation,
    isUpdatingTeacherDesignation,
    isFetchingTeacherDesignations,
    isFetchingTeacherDesignation,
    isDeletingTeacherDesignation,
    teacherDesignations,
    teacherDesignation,
  } = useSelector((state) => state.coreHr);

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

  const filteredData = teacherDesignations.filter((item) => {
    const designation = `${item.designation_name} ${item.department?.department_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return designation.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'designation') {
      const propertyA =
        `${a.designation_name} ${a.department?.department_name}`.toLowerCase();
      const propertyB =
        `${b.designation_name} ${b.department?.department_name}`.toLowerCase();

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
          <TableCell colSpan={10} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.designation_name}</Typography>
          <Typography variant="caption">
            {item.department?.department_name}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ whiteSpace: 'pre-line' }}>
          {item.description}
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {DateTime.fromISO(item.createdAt).toFormat('LLLL dd yyyy HH:mm')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {DateTime.fromISO(item.updatedAt).toFormat('LLLL dd yyyy HH:mm')}
          </Typography>
        </TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getTeacherDesignationById(item._id));
                dispatch(toggleEditTeacherDesignation());
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
                dispatch(getTeacherDesignationById(item._id));
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

  useEffect(() => {
    dispatch(getAllTeacherDesignations());
    dispatch(getAllDepartments());
  }, [dispatch]);

  return (
    <>
      <AddTeacherDesignationModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this teacherDesignation?'}
        onConfirm={() => {
          dispatch(deleteTeacherDesignationById(teacherDesignation._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearTeacherDesignation());
          setShowConfirmationModal(false);
        }}
      />
      {isCreatingTeacherDesignation ||
        isUpdatingTeacherDesignation ||
        isFetchingTeacherDesignation ||
        (isDeletingTeacherDesignation && <LoadingScreen />)}
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
              startIcon={<IconSquarePlus />}
              onClick={() => dispatch(toggleAddTeacherDesignation())}
            >
              Add Designation
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
          {isFetchingTeacherDesignations ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'designation'}
                          direction={order}
                          onClick={() => handleSort('building')}
                        >
                          Designation Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Updated At</TableCell>
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

export default TeacherDesignation;
