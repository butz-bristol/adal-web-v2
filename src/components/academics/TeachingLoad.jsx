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
  IconTrash,
  IconUserPlus,
} from '@tabler/icons-react';

import {
  deleteSubjectAssignment,
  getSubjectAssignment,
  toggleAddSubjectAssignment,
  toggleEditSubjectAssignment,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { k12Departments } from 'src/utils/helperFunctions';
import AddTeacherClassSubjectsModal from './AddTeacherClassSubjectsModal';

const TeachingLoad = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    section,
    subjectAssignments,
    isFetchingSubjectAssignments,
    isCreatingSubjectAssignment,
    isUpdatingSubjectAssignment,
    isDeletingSubjectAssignment,
  } = useSelector((state) => state.academics);

  const user = useSelector((state) => state.users?.user) ?? null;

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [subjectId, setSubjectId] = useState('');

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

  let filteredTeachingLoad = subjectAssignments;

  if (user.user_role === 'teacher') {
    filteredTeachingLoad = subjectAssignments.filter(
      (item) => item.instructor?._id === user.userId
    );
  }

  const filteredData = filteredTeachingLoad.filter((item) => {
    const instructor = `${item.instructor?.first_name} ${item.instructor?.last_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return instructor.toLowerCase().includes(searchTermLowerCase);
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
        <TableCell>{item.section?.section_name}</TableCell>
        <TableCell>{item.section?.department?.department_name}</TableCell>
        <TableCell>
          {k12Departments.includes(item.section?.department?.department_name)
            ? item.subject_course?.subject_name
            : item.subject_course?.course_name}
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
        <TableCell width={180}>
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
                setSubjectId(item._id);
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
    <Stack spacing={2}>
      <AddTeacherClassSubjectsModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to remove this?'}
        onConfirm={() => {
          dispatch(deleteSubjectAssignment(subjectId));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          setShowConfirmationModal(false);
        }}
      />
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
                  startIcon={<IconUserPlus />}
                  onClick={() => dispatch(toggleAddSubjectAssignment())}
                >
                  Assign
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
          {isFetchingSubjectAssignments ||
          isCreatingSubjectAssignment ||
          isUpdatingSubjectAssignment ||
          isDeletingSubjectAssignment ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Section</TableCell>
                      <TableCell>Department</TableCell>
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

export default TeachingLoad;
