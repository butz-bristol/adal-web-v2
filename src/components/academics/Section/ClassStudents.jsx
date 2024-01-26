import { useState } from 'react';
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
  IconFileAnalytics,
  IconLogout,
  IconPlus,
  IconPrinter,
  IconSearch,
} from '@tabler/icons-react';

import LoadingData from 'src/components/LoadingData';

import {
  getCollegeStudentReportCard,
  getStudentReportCard,
  removeStudentFromSection,
  setStudent,
  toggleAddBulkStudentInSection,
  toggleEditCollegeGrade,
  toggleEditK12Grade,
  toggleEditStudent,
} from 'src/features/academicFeatures/academicSlice';

import { Fragment } from 'react';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { k12Departments } from 'src/utils/helperFunctions';
import EditCollegeGradeModal from '../Grading/EditCollegeGradeModal';
import EditK12GradeModal from '../Grading/EditK12GradeModal';
import SF9Preview from '../PDFs/SF9Preview';
import EditStudentModal from '../Student/EditStudentModal';
import AddBulkStudentInSectionModal from './AddBulkStudentInSectionModal';

const ClassStudents = () => {
  const dispatch = useDispatch();
  const {
    section,
    isFetchingSection,
    isUpdatingStudentInSection,
    isDeletingStudentInSection,
    userProfile,
    student_report,
  } = useSelector((state) => state.academics);
  const { activeAcademicYear } = useSelector((state) => state.registrar);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [showSF9Preview, setShowSF9Preview] = useState(false);
  const [studentData, setStudentData] = useState({});

  const handleOpen = (id) => {
    if (k12Departments.includes(section?.department?.department_name)) {
      dispatch(
        getStudentReportCard({
          student_id: id,
          academic_year: activeAcademicYear?._id,
        })
      );
      dispatch(toggleEditK12Grade());
      return;
    }
    if (section?.department?.department_name === 'College') {
      dispatch(
        getCollegeStudentReportCard({
          student_id: id,
          academic_year: activeAcademicYear?._id,
        })
      );
      dispatch(toggleEditCollegeGrade());
    }
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

  const filteredData = section.students.filter((item) => {
    const student = `${item.student_first_name} ${item.student_last_name} ${item.student_type}`;
    const department = `${item.student_department?.department_name} ${item.student_college_track?.college_track_name}`;
    const program = `${
      item.student_program && item.student_program?.program_name
    } ${item.student_yearlevel?.year_level_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      student.toLowerCase().includes(searchTermLowerCase) ||
      department.toLowerCase().includes(searchTermLowerCase) ||
      program.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    function compareProperties(a, b, order) {
      if (order === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    }

    function getProperty(obj, propertyPath) {
      return (
        propertyPath.split('.').reduce((acc, key) => acc?.[key], obj) || ''
      );
    }

    function getLowerCaseProperty(obj, propertyPath) {
      return getProperty(obj, propertyPath).toLowerCase();
    }

    let propertyA, propertyB;

    switch (orderBy) {
      case 'student':
        propertyA =
          getLowerCaseProperty(a, 'student_last_name') +
          getLowerCaseProperty(a, 'student_first_name') +
          getLowerCaseProperty(a, 'student_type');
        propertyB =
          getLowerCaseProperty(b, 'student_last_name') +
          getLowerCaseProperty(b, 'student_first_name') +
          getLowerCaseProperty(b, 'student_type');
        return compareProperties(propertyA, propertyB, order);

      case 'gender':
        propertyA = getLowerCaseProperty(a, 'student_gender');
        propertyB = getLowerCaseProperty(b, 'student_gender');
        return compareProperties(propertyA, propertyB, order);

      default:
        return 0; // No order specified
    }
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (paginatedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">
            {item.student_last_name}, {item.student_first_name}
          </Typography>
          <Typography variant="caption">{item.student_type}</Typography>
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
            {item.student_program
              ? item.student_program?.program_name
              : item.student_yearlevel?.year_level_name}
          </Typography>
          <Typography variant="caption">
            {item.student_program
              ? item.student_yearlevel?.year_level_name
              : ''}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={item.student_registration_status}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.student_registration_status === 'registered'
                ? 'success'
                : item.student_registration_status ===
                    'eligible for registration'
                  ? 'error'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>
          <Typography textTransform="capitalize" variant="body1">
            {item.student_deficiency_status}
          </Typography>
        </TableCell>
        <TableCell width={180}>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(toggleEditStudent());
                dispatch(
                  setStudent({
                    _id: item._id,
                    student_first_name: item.student_first_name,
                    student_middle_name: item.student_middle_name,
                    student_last_name: item.student_last_name,
                    student_learners_reference_no:
                      item.student_learners_reference_no,
                  })
                );
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          {(section?.adviser?._id === userProfile?._id ||
            userProfile?.isVerifier ||
            userProfile.admin_designation_toggle) && (
            <Fragment>
              <Tooltip title="Grade">
                <IconButton
                  aria-label="grade"
                  size="small"
                  color="secondary"
                  onClick={(e) => handleOpen(item._id)}
                >
                  <IconFileAnalytics />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}

          <Tooltip title="Print">
            <IconButton
              aria-label="print"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(
                  getStudentReportCard({
                    student_id: item._id,
                    academic_year: activeAcademicYear?._id,
                  })
                );
                setStudentData(item);
                setShowSF9Preview(true);
              }}
            >
              <IconPrinter />
            </IconButton>
          </Tooltip>

          {(section?.adviser?._id === userProfile?._id ||
            userProfile.admin_designation_toggle) && (
            <Tooltip title="Remove">
              <IconButton
                aria-label="remove"
                size="small"
                color="error"
                onClick={() => {
                  setStudentId(item._id);
                  setShowConfirmationModal(true);
                }}
              >
                <IconLogout />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Stack spacing={2}>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to remove this?'}
        onConfirm={() => {
          dispatch(
            removeStudentFromSection({
              id: studentId,
              sectionId: section?._id,
            })
          );
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          setShowConfirmationModal(false);
        }}
      />

      <SF9Preview
        open={showSF9Preview}
        close={() => setShowSF9Preview(false)}
        data={student_report}
        student={studentData}
      />
      <AddBulkStudentInSectionModal />
      <EditK12GradeModal />
      <EditCollegeGradeModal />
      <EditStudentModal />
      <Grid container>
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={1}
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
                  onClick={() => {
                    dispatch(toggleAddBulkStudentInSection());
                  }}
                >
                  Add Student
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {isFetchingSection &&
        isUpdatingStudentInSection &&
        isDeletingStudentInSection ? (
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
                          active={orderBy === 'student'}
                          direction={order}
                          onClick={() => handleSort('student')}
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'gender'}
                          direction={order}
                          onClick={() => handleSort('gender')}
                        >
                          Gender
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>Registration Status</TableCell>
                      <TableCell>Deficiency Status</TableCell>
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
    </Stack>
  );
};

export default ClassStudents;
