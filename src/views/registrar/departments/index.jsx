import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Chip,
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
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';

import {
  deleteDepartment,
  getAllDepartments,
  getDepartment,
  toggleAddDepartment,
  toggleEditDepartment,
} from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import DepartmentModal from 'src/components/registrar/DepartmentModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const Department = () => {
  const dispatch = useDispatch();

  const {
    isCreatingDepartment,
    isUpdatingDepartment,
    isFetchingDepartments,
    departments,
  } = useSelector((state) => state.registrar);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [departmentId, setDepartmentId] = useState('');

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

  const filteredData = departments.filter((item) => {
    const department = `${item.department_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return department.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'department') {
      const propertyA = `${a.department_name}`.toLowerCase();
      const propertyB = `${b.department_name}`.toLowerCase();

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
        <TableCell>
          <Typography variant="body1">{item.department_name}</Typography>
          <Typography variant="overline">{item.abbreviation}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={item.remarks}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.remarks === 'Active'
                ? 'success'
                : item.remarks === 'Inactive'
                  ? 'error'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.createdAt ? item.createdAt : 'Unavailable'}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.updatedAt ? item.updatedAt : 'Unavailable'}
          </Typography>
        </TableCell>
        <TableCell width={180}>
          <Tooltip title="View">
            <IconButton aria-label="view" size="small" color="info">
              <IconEye />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              variant=""
              color="secondary"
              onClick={() => {
                dispatch(getDepartment(item._id));
                dispatch(toggleEditDepartment());
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                setDepartmentId(item._id);
                setOpenDeleteModal(true);
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
    dispatch(getAllDepartments());
  }, [dispatch]);

  return (
    <Stack>
      <DepartmentModal />
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Delete Academic Department"
        message="Are you sure you want to delete this?"
        onConfirm={() => {
          dispatch(deleteDepartment(departmentId));
          setOpenDeleteModal(false);
        }}
        onCancel={() => {
          setOpenDeleteModal(false);
          setDepartmentId('');
        }}
      />
      {isCreatingDepartment || isUpdatingDepartment ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={1}>
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12} sm="auto">
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
            <Grid item xs={12} sm="auto">
              <Grid container spacing={2}>
                <Grid item xs={12} sm="auto">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<IconPlus />}
                    onClick={() => dispatch(toggleAddDepartment())}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isFetchingDepartments ? (
            <LoadingData />
          ) : (
            <Grid item xs={12}>
              <Box component={Paper}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'department'}
                            direction={order}
                            onClick={() => handleSort('department')}
                          >
                            Department
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Remarks</TableCell>
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
            </Grid>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default Department;
