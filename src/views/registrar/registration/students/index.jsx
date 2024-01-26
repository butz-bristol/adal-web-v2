import {
  Button,
  Chip,
  FormControl,
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
import { IconDatabaseImport, IconEdit, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import EditStudentProfile from 'src/components/admissions/EditStudentProfile';
import CustomTablePagination from 'src/components/utilities/CustomTablePagination';
import {
  setStudent,
  toggleStudentProfile,
} from 'src/features/admissionsFeatures/admissionsSlice';
import {
  changeStudentPageNumber,
  changefilteredStudentsPageNumber,
  fetchStudentsByQuery,
  getAllDepartments,
  getAllYearLevels,
  getRegisteredStudents,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { k12Departments } from 'src/utils/helperFunctions';
const getStudentDocumentUploadCount = (student) => {
  let documentCount = '';

  if (k12Departments.includes(student.student_department?.department_name)) {
    return (documentCount = `${student.documentCount} of 2`);
  }

  if (!k12Departments.includes(student.student_department?.department_name)) {
    if (student.student_type === 'New') {
      documentCount = `${student.documentCount} of 5`;
    } else {
      documentCount = `${student.documentCount} of 4`;
    }
  }

  return documentCount;
};

const RegisteredStudents = () => {
  const dispatch = useDispatch();
  const {
    departments,
    year_levels,
    students,
    isFetchingStudents,
    isFilteringStudents,
    totalStudentsPages,
    studentPageNumber,
    totalStudents,
    query,
    filteredStudents,
    totalFilteredStudents,
    filteredStudentsPageNumber,
    totalFilteredStudentsPages,
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

    dispatch(changeStudentPageNumber(newPage));
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredLevelsByDepartment = year_levels.filter(
    (year_level) => year_level?.department?.department_name === filterDepartment
  );

  let excelData = [];
  let studentsList = [];

  if (query.length > 0) {
    studentsList = filteredStudents;
  } else {
    studentsList = students;
  }

  // Filter studentList by department

  if (filterDepartment) {
    studentsList = studentsList.filter(
      (student) =>
        student.student_department?.department_name === filterDepartment
    );
  }

  // Filter studentList by level

  if (filterLevel) {
    studentsList = studentsList.filter(
      (student) => student.student_yearlevel?.year_level_name === filterLevel
    );
  }

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
          `${a?.student_program?.program_name} ${a?.student_yearlevel?.year_level_name}`.toLowerCase();
        const propertyB =
          `${b?.student_program?.program_name} ${b?.student_yearlevel?.year_level_name}`.toLowerCase();

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

  sortedData.forEach((student) => {
    const data = {
      student_number: student.student_number,
      student_name: `${student.student_last_name}, ${student.student_first_name}`,
      student_type: student.student_type,
      student_department: student.student_department?.department_name,
      student_college_track: student.student_college_track?.college_track_name,
      student_program: student.student_program?.program_name,
      student_yearlevel: student.student_yearlevel?.year_level_name,
      student_registration_status: student.student_registration_status,
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

    return sortedData.map((item) => {
      return (
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
              label={item.student_registration_status}
              size="small"
              sx={{ textTransform: 'capitalize' }}
              color={
                item.student_registration_status === 'registered'
                  ? 'secondary'
                  : item.student_registration_status ===
                      'eligible for registration'
                    ? 'primary'
                    : 'default'
              }
            />
          </TableCell>
          <TableCell>{getStudentDocumentUploadCount(item)}</TableCell>
          <TableCell>{item.student_contact_number}</TableCell>
          <TableCell>
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                size="small"
                color="primary"
                onClick={() => {
                  dispatch(toggleStudentProfile());
                  dispatch(
                    setStudent({
                      _id: item._id,
                      student_number: item.student_number,
                      student_learners_reference_no:
                        item.student_learners_reference_no,
                      student_esc_grantee: item.student_esc_grantee,
                      student_type: item.student_type,
                      student_department: item.student_department,
                      student_college_track: item.student_college_track,
                      student_program: item.student_program,
                      student_yearlevel: item.student_yearlevel,
                      student_esc_grant_status: item.student_esc_grant_status,
                      student_shs_voucher_status:
                        item.student_shs_voucher_status,
                      student_returnee_status: item.student_returnee_status,
                      student_first_name: item.student_first_name,
                      student_middle_name: item.student_middle_name,
                      student_last_name: item.student_last_name,
                      student_gender: item.student_gender,
                      student_nationality: item.student_nationality,
                      student_birthdate: item.student_birthdate,
                      student_contact_number: item.student_contact_number,
                      student_personal_email: item.student_personal_email,
                      student_email: item.student_email,
                      student_permanent_address: item.student_permanent_address,
                      student_civil_status: item.student_civil_status,
                      student_sexual_orientation:
                        item.student_sexual_orientation,
                      student_pwd_status: item.student_pwd_status,
                      student_same_address: item.student_same_address,
                      student_present_address: item.student_present_address,
                      region: item.region,
                      province: item.province,
                      municipality: item.municipality,
                      barangay: item.barangay,
                      student_father_name: item.student_father_name,
                      student_father_contact_number:
                        item.student_father_contact_number,
                      student_father_email_address:
                        item.student_father_email_address,
                      student_father_occupation: item.student_father_occupation,
                      student_mother_name: item.student_mother_name,
                      student_mother_contact_number:
                        item.student_mother_contact_number,
                      student_mother_email_address:
                        item.student_mother_email_address,
                      student_mother_occupation: item.student_mother_occupation,
                      student_guardian_name: item.student_guardian_name,
                      student_guardian_contact_number:
                        item.student_guardian_contact_number,
                      student_guardian_email_address:
                        item.student_guardian_email_address,
                      student_guardian_occupation:
                        item.student_guardian_occupation,
                    })
                  );
                }}
              >
                <IconEdit />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
    dispatch(handleChange({ name: 'studentPageNumber', value: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchStudentsByQuery());
      return;
    }

    dispatch(getRegisteredStudents());
  }, [dispatch, studentPageNumber, query]);

  return (
    <Stack spacing={2}>
      <EditStudentProfile />
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
            onChange={(e) =>
              dispatch(handleChange({ name: 'query', value: e.target.value }))
            }
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

          <CSVLink data={excelData} filename={'registered-students.csv'}>
            <Button
              variant="outlined"
              endIcon={<IconDatabaseImport size={'17px'} />}
            >
              Export
            </Button>
          </CSVLink>
        </Stack>
      </Stack>

      {isFetchingStudents || isFilteringStudents ? (
        <LoadingData />
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student No.</TableCell>
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
                  <TableCell>Status</TableCell>
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
                  {totalFilteredStudents ? totalFilteredStudents : 0} results
                </Typography>
              ) : (
                <Typography variant="body1">
                  Showing {sortedData.length} of{' '}
                  {totalStudents ? totalStudents : 0} results
                </Typography>
              )}
            </Stack>

            <CustomTablePagination
              currentPage={
                query.length > 0
                  ? filteredStudentsPageNumber
                  : studentPageNumber
              }
              totalPages={
                query.length > 0
                  ? totalFilteredStudentsPages
                  : totalStudentsPages
              }
              onPageChange={handlePageChange}
            />
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export { getStudentDocumentUploadCount };
export default RegisteredStudents;
