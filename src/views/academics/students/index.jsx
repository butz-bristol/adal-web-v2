import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';

import { IconSearch, IconTrash } from '@tabler/icons-react';

import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import {
  getAllDepartments,
  getAllYearLevels,
  getRegisteredStudents,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import {
  collegeDepartmentAcademicRoles,
  k12DepartmentAcademicRoles,
  k12Departments,
  tesdaDepartmentAcademicRoles,
} from 'src/utils/helperFunctions';

const AcademicStudents = () => {
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.academics);
  const { students, isFetchingStudents, departments, year_levels } =
    useSelector((state) => state.registrar);
  const designation = userProfile.admin_designation?.designation_name;
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  let filteredStudents;
  let filteredDepartments;

  if (k12DepartmentAcademicRoles.includes(designation)) {
    if (designation === 'Principal') {
      filteredStudents = students.filter(
        (student) =>
          student.student_registration_status === 'registered' &&
          k12Departments.includes(student.student_department?.department_name)
      );
    }
    filteredDepartments = departments.filter((department) =>
      k12Departments.includes(department?.department_name)
    );
  } else if (collegeDepartmentAcademicRoles.includes(designation)) {
    if (designation === 'Dean') {
      filteredStudents = students.filter(
        (student) =>
          student.student_registration_status === 'registered' &&
          student.student_department?.department_name === 'College'
      );
    }
    filteredDepartments = departments.filter(
      (department) => department?.department_name === 'College'
    );
  } else if (tesdaDepartmentAcademicRoles.includes(designation)) {
    if (designation === 'Coordinator') {
      filteredStudents = students.filter(
        (student) =>
          student.student_registration_status === 'registered' &&
          student.student_department?.department_name ===
            'Technical Education and Skills Development Authority (TESDA)'
      );
    }
    filteredDepartments = departments.filter(
      (department) =>
        department?.department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
    );
  } else {
    filteredStudents = students.filter(
      (student) => student.student_registration_status === 'registered'
    );
    filteredDepartments = departments;
  }

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

  const filteredLevelsByDepartment = year_levels.filter(
    (year_level) => year_level?.department?.department_name === filterDepartment
  );

  const filteredData = students.filter((item) => {
    const student = `${item.student_last_name}, ${item.student_first_name}`;
    const studentType = `${item.student_type}`;
    const department = `${item.student_department?.department_name}`;
    const college_track = `${item.student_college_track?.college_track_name}`;
    const program = `${item.student_program?.program_name}`;
    const level = `${item.student_yearlevel?.year_level_name}`;
    const admissionStatus = `${item.student_admissions_status}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filterDepartmentLowerCase = filterDepartment.toLowerCase();
    const filterLevelLowerCase = filterLevel.toLowerCase();

    return (
      (student.toLowerCase().includes(searchTermLowerCase) ||
        studentType.toLowerCase().includes(searchTermLowerCase) ||
        college_track.toLowerCase().includes(searchTermLowerCase) ||
        program.toLowerCase().includes(searchTermLowerCase) ||
        admissionStatus.toLowerCase().includes(searchTermLowerCase)) &&
      department.toLowerCase().includes(filterDepartmentLowerCase) &&
      (!filterLevelLowerCase
        ? level.toUpperCase().includes(filterLevelLowerCase)
        : level.toLowerCase() === filterLevelLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'student') {
      const propertyA =
        `${a.student_last_name} ${a.student_first_name} ${a.student_type}`.toLowerCase();
      const propertyB =
        `${b.student_last_name} ${b.student_first_name}  ${b.student_type}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'department') {
      const propertyA =
        `${a.student_department?.department_name} ${a.student_college_track?.college_track_name}`.toLowerCase();
      const propertyB =
        `${b.student_department?.department_name} ${b.student_college_track?.college_track_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'level') {
      const propertyA =
        `${a.student_program?.program_name} ${a.student_yearlevel.year_level_name}`.toLowerCase();
      const propertyB =
        `${b.student_program?.program_name} ${b.student_yearlevel.year_level_name}`.toLowerCase();

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
          <TableCell colSpan={9} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">{item.student_number}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            <LinkComponent to={`${item._id}`}>
              {item.student_last_name}, {item.student_first_name}
            </LinkComponent>
          </Typography>
          <Typography variant="caption">{item.student_type}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_department?.department_name}
          </Typography>
          <Typography variant="caption">
            {item.student_college_track?.college_track_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_yearlevel?.year_level_name}
          </Typography>
          <Typography variant="caption">
            {item.student_program
              ? item.student_program?.program_name
              : item.student_college_track?.college_track_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.section?.section_name}</Typography>
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
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getRegisteredStudents());
    dispatch(fetchUserProfile());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} sm={6} md={7} spacing={1}>
          <Grid item xs={12} lg={4}>
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
          <Grid item xs={12} lg={4}>
            <FormControl fullWidth>
              <InputLabel id="select-department">Department</InputLabel>
              <Select
                id="select-department"
                label="Department"
                name="department"
                onChange={(e) => {
                  setFilterDepartment(e.target.value);
                  setFilterLevel('');
                }}
                value={filterDepartment || ''}
              >
                {filteredDepartments
                  .filter((department) => department.remarks === 'Active')
                  .map((department) => (
                    <MenuItem
                      key={department._id}
                      value={department?.department_name}
                    >
                      {department?.department_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl fullWidth>
              <InputLabel id="select-level">Level</InputLabel>
              <Select
                id="select-level"
                label="Level"
                name="level"
                onChange={(e) => setFilterLevel(e.target.value)}
                value={filterLevel || ''}
              >
                {filterDepartment ? (
                  filteredLevelsByDepartment
                    .filter((level) => level.remarks === 'Active')
                    .map((level) => (
                      <MenuItem key={level._id} value={level.year_level_name}>
                        {level.year_level_name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem key="none" value="">
                    Select a Department
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md
          spacing={1}
          justifyContent="flex-end"
        >
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<IconTrash />}
              disabled={filterDepartment === '' ? true : false}
              onClick={() => {
                setFilterDepartment('');
                setFilterLevel('');
              }}
            >
              Clear Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingStudents ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student #</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'student'}
                          direction={order}
                          onClick={() => handleSort('student')}
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'department'}
                          direction={order}
                          onClick={() => handleSort('department')}
                        >
                          Department
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'level'}
                          direction={order}
                          onClick={() => handleSort('level')}
                        >
                          Level
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Section</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Last Update</TableCell>
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

export default AcademicStudents;
