import { DateTime } from 'luxon';
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
  deleteSubjectAssignment,
  getSubjectAssignment,
  toggleAddSubjectAssignment,
  toggleEditSubjectAssignment,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import { k12Departments } from 'src/utils/helperFunctions';

const ClassSubjects = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { section, subjectAssignments, isFetchingSchedules } = useSelector(
    (state) => state.academics
  );

  const { departments } = useSelector((state) => state.registrar);

  const selectedDepartment = departments?.find(
    (department) => department?._id === section.department?._id
  )?.department_name;

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const filterSubjects = subjectAssignments?.filter(
    (subject) => subject.section._id === section._id
  );

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

  const filteredData = filterSubjects.filter((item) => {
    const instructor = `${item.instructor?.first_name} ${item.instructor?.last_name}`;
    const subject =
      selectedDepartment === 'K-12'
        ? `${item.subject_course.subject_name}`
        : `${item.subject_course.course_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      instructor.toLowerCase().includes(searchTermLowerCase) ||
      subject.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'instructor') {
      const propertyA =
        `${a.instructor?.first_name} ${a.instructor?.last_name}`.toLowerCase();
      const propertyB =
        `${b.instructor?.first_name} ${b.instructor?.last_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'subject') {
      const propertyA =
        selectedDepartment === 'K-12'
          ? a.subject_course?.subject_name.toLowerCase()
          : a.subject_course?.course_name.toLowerCase();
      const propertyB =
        selectedDepartment === 'K-12'
          ? b.subject_course?.subject_name.toLowerCase()
          : b.subject_course?.course_name.toLowerCase();

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
        <TableCell>
          {k12Departments.includes(selectedDepartment)
            ? item.subject_course.subject_name
            : item.subject_course.course_name}
        </TableCell>
        <TableCell>
          {item.instructor?.first_name} {item.instructor?.last_name}
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.createdBy?.first_name} {item.createdBy?.last_name}
          </Typography>
          <Typography variant="caption">
            {DateTime.fromISO(item.createdAt).toFormat('LLLL dd yyyy HH:mm')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.updatedBy?.first_name} {item.updatedBy?.last_name}
          </Typography>
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
                dispatch(toggleEditSubjectAssignment());
                dispatch(getSubjectAssignment(item._id));
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
                dispatch(deleteSubjectAssignment(item._id));
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
    <Stack spacing={2}>
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
                  startIcon={<IconSquarePlus />}
                  onClick={() => dispatch(toggleAddSubjectAssignment())}
                >
                  Add Subject
                </Button>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<IconDatabaseImport size={'17px'} />}
                >
                  Import CSV
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isFetchingSchedules ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'subject'}
                          direction={order}
                          onClick={() => handleSort('subject')}
                        >
                          Subject
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'instructor'}
                          direction={order}
                          onClick={() => handleSort('instructor')}
                        >
                          Instructor
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Created by</TableCell>
                      <TableCell>Last Update</TableCell>
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

export default ClassSubjects;
