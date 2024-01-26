import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconDatabaseImport,
  IconEye,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import CustomTablePagination from 'src/components/utilities/CustomTablePagination';
import {
  changeApplicantsPageNumber,
  changefilteredStudentsPageNumber,
  fetchApplicantsByQuery,
  getAllDepartments,
  getAllYearLevels,
  getStudentApplicants,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';

const AdmissionsApplicants = () => {
  const dispatch = useDispatch();

  // const {} = useSelector((state) => state.admissions); to be used after migration

  const {
    isFetchingStudents,
    isFilteringApplicants,
    departments,
    year_levels,
    students,
    filteredApplicants,
    totalApplicantsPages,
    applicantsPageNumber,
    totalApplicants,
    totalFilteredApplicants,
    filteredStudentsPageNumber,
    totalFilteredApplicantsPages,
    query,
  } = useSelector((state) => state.registrar);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  const filteredLevelsByDepartment = year_levels.filter(
    (year_level) => year_level?.department?.department_name === filterDepartment
  );

  const handlePageChange = (newPage) => {
    if (query.length > 0) {
      dispatch(changefilteredStudentsPageNumber(newPage));
      return;
    }

    dispatch(changeApplicantsPageNumber(newPage));
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  let studentsList = [];

  if (query.length > 0) {
    studentsList = filteredApplicants;
  } else {
    studentsList = students;
  }

  const filterStudents = studentsList.filter(
    (student) => student.student_admissions_status === 'pending'
  );

  const sortedData = filterStudents.sort((a, b) => {
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
        `${a.student_program?.program_name} ${a.student_yearlevel?.year_level_name}`.toLowerCase();
      const propertyB =
        `${b.student_program?.program_name} ${b.student_yearlevel?.year_level_name}`.toLowerCase();

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

  const renderTableBody = () => {
    if (sortedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={9} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }

    return sortedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">{item.student_number}</Typography>
          <Typography variant="caption">{item.student_type}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_last_name}, {item.student_first_name}
          </Typography>
          <Typography variant="caption">
            {item.student_personal_email}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.student_gender}</Typography>
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
        <TableCell align="center">
          <Chip
            label={item.student_admissions_status}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.student_admissions_status === 'admitted'
                ? 'success'
                : item.student_admissions_status === 'pending'
                  ? 'warning'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>
          <LinkComponent to={`${item._id}`}>
            <Tooltip title="View">
              <IconButton aria-label="view" size="small" color="info">
                <IconEye />
              </IconButton>
            </Tooltip>
          </LinkComponent>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getStudentApplicants());
    dispatch(fetchUserProfile());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchApplicantsByQuery());
    } else {
      dispatch(getStudentApplicants());
    }
  }, [dispatch, applicantsPageNumber, query]);

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
              onChange={(e) => {
                dispatch(
                  handleChange({ name: 'query', value: e.target.value })
                );
              }}
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
                {departments
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
                onChange={(e) => {
                  setFilterLevel(e.target.value);
                }}
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

          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<IconDatabaseImport />}
              onClick={() => dispatch(toggleAddSection())}
            >
              Export CSV
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {isFetchingStudents || isFilteringApplicants ? (
        <LoadingData />
      ) : (
        <Paper>
          <TableContainer>
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
                  <TableCell>Gender</TableCell>
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
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>
          <Stack
            justifyContent={'space-between'}
            direction={'row'}
            alignItems={'center'}
            pl={'20px'}
          >
            <Stack>
              {query.length > 0 ? (
                <Typography variant="body1">
                  Showing {sortedData.length} of{' '}
                  {totalFilteredApplicants ? totalFilteredApplicants : 0}{' '}
                  results
                </Typography>
              ) : (
                <Typography variant="body1">
                  Showing {sortedData.length} of{' '}
                  {totalApplicants ? totalApplicants : 0} results
                </Typography>
              )}
            </Stack>

            <CustomTablePagination
              currentPage={
                query.length > 0
                  ? filteredStudentsPageNumber
                  : applicantsPageNumber
              }
              totalPages={
                query.length > 0
                  ? totalFilteredApplicantsPages
                  : totalApplicantsPages
              }
              onPageChange={handlePageChange}
            />
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default AdmissionsApplicants;
