import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
  Typography,
} from '@mui/material';
import {
  IconDatabaseImport,
  IconEdit,
  IconEye,
  IconSearch,
  IconSquarePlus,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  deleteUser,
  getAllUsers,
  getUserById,
  setUser,
  toggleAddUser,
  toggleEditUser,
} from 'src/features/academicFeatures/academicSlice';
import {
  fetchAllDepartments,
  fetchAllDesignations,
  fetchAllRoles,
  getAllTeacherDesignations,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  createTimesheet,
  fetchAllCutOffDates,
  setEmployeeId,
} from 'src/features/hrFeatures/payroll/payrollSlice';
import { getAllDepartments } from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import UserModal from 'src/components/hr/employees/UserModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const Employees = () => {
  const dispatch = useDispatch();

  const {
    isCreatingUser,
    isUpdatingUser,
    isFetchingUsers,
    isFetchingUser,
    isDeletingUser,
    users,
    user,
  } = useSelector((state) => state.academics);
  const { designations, departments, teacherDesignations } = useSelector(
    (state) => state.coreHr
  );
  const departmentLevels =
    useSelector((state) => state.registrar.departments) ?? null;
  const { isCreatingTimesheet, currentCutOffDate, employeeId } = useSelector(
    (state) => state.payroll
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const findDepartmentName = (id) => {
    return departments.find((item) => item?._id === id)?.department_name;
  };
  const findDesignationName = (id) => {
    return designations.find((item) => item?._id === id)?.designation_name;
  };
  const findAcademicDepartmentName = (id) => {
    return departmentLevels.find((item) => item?._id === id)?.abbreviation;
  };
  const findAcademicDesignationName = (id) => {
    return teacherDesignations.find((item) => item?._id === id)
      ?.designation_name;
  };

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

  const filteredData = users.filter((item) => {
    const name = `${item.first_name} ${item.last_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return name.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'name') {
      const propertyA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const propertyB = `${b.first_name} ${b.last_name}`.toLowerCase();

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
          <TableCell colSpan={8} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell width={180}>
          {item.employee_id ? item.employee_id : 'Unavailable'}
        </TableCell>
        <TableCell>
          <Typography>
            {item.first_name} {item.last_name}
          </Typography>
          <Typography variant="caption">{item.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{findDepartmentName(item.admin_department)}</Typography>
          <Typography variant="caption">
            {findDesignationName(item.admin_designation)}
          </Typography>
        </TableCell>
        <TableCell>
          <Grid container spacing={1}>
            {Array.isArray(item.teaching_designation) &&
              item.teaching_designation.map((item, index, array) => (
                <Grid key={index} item>
                  <Chip
                    size="small"
                    label={findAcademicDesignationName(item)}
                    color="primary"
                  />
                </Grid>
              ))}
          </Grid>
        </TableCell>
        <TableCell>
          <Grid container spacing={1}>
            {Array.isArray(item.teaching_department) &&
              item.teaching_department.map((item, index) => (
                <Grid key={index} item>
                  <Chip
                    size="small"
                    label={findAcademicDepartmentName(item)}
                    color="secondary"
                  />
                </Grid>
              ))}
          </Grid>
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>
          {item.user_role[0]?.role_name}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={
              (user._id === employeeId && isCreatingTimesheet) ||
              !currentCutOffDate?.cutOffStartDate ||
              !currentCutOffDate?.cutOffEndDate
            }
            onClick={() => {
              dispatch(createTimesheet(user));
              dispatch(setEmployeeId(user._id));
            }}
          >
            {isCreatingTimesheet && user._id === employeeId ? (
              <CircularProgress size={20} />
            ) : (
              'Generate'
            )}
          </Button>
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
              color="secondary"
              onClick={() => {
                dispatch(
                  setUser({
                    _id: item._id,
                    first_name: item.first_name,
                    middle_name: item.middle_name,
                    last_name: item.last_name,
                    employee_id: item.employee_id,
                    email: item.email,
                    personal_email: item.personal_email,
                    gender: item.gender,
                    religion: item.religion,
                    birth_date: item.birth_date,
                    age: item.age,
                    civil_status: item.civil_status,
                    blood_type: item.blood_type,
                    phone: item.phone,
                    secondary_phone: item.secondary_phone,
                    nationality: item.nationality,
                    zip_code: item.zip_code,
                    region: item.region,
                    province: item.province,
                    municipality: item.municipality,
                    barangay: item.barangay,
                    present_address: item.present_address,
                    same_address_toggle: item.same_address_toggle,
                    admin_designation_toggle: item.admin_designation_toggle,
                    teaching_designation_toggle:
                      item.teaching_designation_toggle,
                    special_designation_toggle: item.special_designation_toggle,
                    admin_department: item.admin_department,
                    admin_designation: item.admin_designation,
                    teaching_department: item.teaching_department
                      ? item.teaching_department
                      : [],
                    teaching_designation: item.teaching_designation
                      ? item.teaching_designation
                      : [],
                    role_id: item.role_id,
                    supervisor_id: item.supervisor_id,
                    supervisor: item.supervisor,
                  })
                );
                dispatch(toggleEditUser());
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
                dispatch(getUserById(item._id));
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
    dispatch(getAllUsers());
    dispatch(getAllDepartments());
    dispatch(getAllTeacherDesignations());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
    dispatch(fetchAllRoles());
    dispatch(fetchAllCutOffDates());
  }, [dispatch]);
  return (
    <>
      <UserModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this?'}
        onConfirm={() => {
          dispatch(deleteUser(user._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearUser());
          setShowConfirmationModal(false);
        }}
      />
      {isCreatingUser ||
        isUpdatingUser ||
        isFetchingUser ||
        (isDeletingUser && <LoadingScreen />)}
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
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
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
              onClick={() => dispatch(toggleAddUser())}
            >
              Add User
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
          {isFetchingUsers ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name/Email</TableCell>
                      <TableCell>Administrative</TableCell>
                      <TableCell>Designations</TableCell>
                      <TableCell>Departments</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Time-sheet</TableCell>
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

export default Employees;
