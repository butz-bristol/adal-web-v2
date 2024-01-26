import {
  Button,
  Chip,
  FormControl,
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
  Typography,
} from '@mui/material';
import { IconDatabaseImport, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import CustomTablePagination from 'src/components/utilities/CustomTablePagination';
import {
  changeApplicantsPageNumber,
  changefilteredStudentsPageNumber,
  fetchApplicantsByQuery,
  getAdmittedApplicants,
  getAllDepartments,
  getAllYearLevels,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { getStudentDocumentUploadCount } from '../students';

const PreRegistration = () => {
  const dispatch = useDispatch();

  // const {} = useSelector((state) => state.admissions); to be used after migration

  const {
    departments,
    year_levels,
    applicants,
    isFetchingApplicants,
    isFilteringStudents,
    totalApplicantsPages,
    filteredApplicants,
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
    studentsList = applicants;
  }

  const filteredLevelsByDepartment = year_levels.filter(
    (year_level) => year_level?.department?.department_name === filterDepartment
  );

  const sortedData = studentsList
    .map((student) => student)
    .sort((a, b) => {
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

  let excelData = [];

  sortedData.forEach((student) => {
    const data = {
      student_number: student.student_number,
      student_name: `${student.student_last_name}, ${student.student_first_name}`,
      student_type: student.student_type,
      student_department: student.student_department?.department_name,
      student_college_track: student.student_college_track?.college_track_name,
      student_program: student.student_program?.program_name,
      student_yearlevel: student.student_yearlevel?.year_level_name,
      student_admissions_status: student.student_admissions_status,
      student_contact_number: student.student_contact_number,
      document_count: getStudentDocumentUploadCount(student),
    };
    excelData.push(data);
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
          <Chip
            label={item.student_admissions_status}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.student_admissions_status === 'admitted'
                ? 'secondary'
                : item.student_admissions_status === 'pending'
                  ? 'primary'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>{getStudentDocumentUploadCount(item)}</TableCell>
        <TableCell>{item.student_contact_number}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
    dispatch(handleChange({ name: 'applicantsPageNumber', value: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchApplicantsByQuery());
      return;
    }

    dispatch(getAdmittedApplicants());
  }, [dispatch, applicantsPageNumber, query]);

  return (
    <Stack spacing={2}>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={2}
      >
        <Stack direction={'row'} alignItems="center" spacing={1} maxWidth={500}>
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
              dispatch(handleChange({ name: 'query', value: e.target.value }));
            }}
            placeholder="Search"
          />

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

          {filterDepartment && (
            <Stack minWidth={100}>
              <FormControl fullWidth>
                <InputLabel id="select-level">Level</InputLabel>
                <Select
                  id="select-level"
                  label="Level"
                  name="level"
                  onChange={(e) => setFilterLevel(e.target.value)}
                  value={filterLevel || ''}
                >
                  {filteredLevelsByDepartment
                    .filter((level) => level.remarks === 'Active')
                    .map((level) => (
                      <MenuItem key={level._id} value={level.year_level_name}>
                        {level.year_level_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>

        <Stack direction={'row'} alignItems="center" spacing={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setFilterDepartment('');
              setFilterLevel('');
            }}
          >
            Clear Filter
          </Button>

          <CSVLink data={excelData} filename={'pre-registered-students.csv'}>
            <Button
              variant="outlined"
              endIcon={<IconDatabaseImport size={'17px'} />}
            >
              Export
            </Button>
          </CSVLink>
        </Stack>
      </Stack>

      {isFetchingApplicants || isFilteringStudents ? (
        <LoadingData />
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Applicant No.</TableCell>
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
                  <TableCell>Admissions Status</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell>Contact No.</TableCell>
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
    </Stack>
  );
};

export default PreRegistration;