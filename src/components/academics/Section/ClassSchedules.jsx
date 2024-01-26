import { DateTime } from 'luxon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';

import {
  deleteSchedule,
  getSchedule,
  toggleAddSchedule,
  toggleEditSchedule,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import { k12Departments, timeSlots, weekdays } from 'src/utils/helperFunctions';
import AddSectionScheduleModal from './AddSectionScheduleModal';

const ClassSchedules = () => {
  const dispatch = useDispatch();

  const { section, schedules, isFetchingSchedules } = useSelector(
    (state) => state.academics
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const filterSchedules = schedules.filter(
    (schedule) => schedule.section?._id === section._id
  );
  // Create new objects with the conflict field
  const schedulesWithConflict = schedules
    ?.filter((schedule) => schedule.section?._id === section._id)
    .map((schedules) => {
      return {
        ...schedules,
        conflict: false,
      };
    });

  // Check for conflicts
  for (let i = 0; i < schedulesWithConflict?.length; i++) {
    const currentSchedule = schedulesWithConflict[i];

    for (let j = i + 1; j < schedulesWithConflict?.length; j++) {
      const otherSchedule = schedulesWithConflict[j];

      if (
        currentSchedule.start_time === otherSchedule.start_time &&
        currentSchedule.room._id === otherSchedule.room._id &&
        hasCommonDay(currentSchedule.schedule, otherSchedule.schedule)
      ) {
        currentSchedule.conflict = true;
        otherSchedule.conflict = true;
      }
    }
  }

  // Helper function to check if two arrays have at least one common element
  function hasCommonDay(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
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

  const filteredData = filterSchedules.filter((item) => {
    const instructor = `${
      item.subject_assignment && item.subject_assignment?.instructor?.first_name
    } ${item.subject_assignment?.instructor?.last_name}`;
    const subject = k12Departments.includes(section.department?.department_name)
      ? `${item.subject_assignment?.subject_course?.subject_name}`
      : `${item.subject_assignment?.subject_course.course_name}`;
    const time = `${item.start_time} ${item.end_time}`;
    const room = `${item.room.building} ${item.room.room_number}`;
    const schedule = item.schedule.join(' ');
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      instructor.toLowerCase().includes(searchTermLowerCase) ||
      subject.toLowerCase().includes(searchTermLowerCase) ||
      time.toLowerCase().includes(searchTermLowerCase) ||
      room.toLowerCase().includes(searchTermLowerCase) ||
      schedule.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'instructor') {
      const propertyA =
        `${a.subject.instructor?.first_name} ${a.subject.instructor?.last_name}`.toLowerCase();
      const propertyB =
        `${b.subject.instructor?.first_name} ${b.subject.instructor?.last_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'subject') {
      const propertyA = k12Departments.includes(
        section.department?.department_name
      )
        ? a.subject_assignment?.subject_course?.subject_name.toLowerCase()
        : a.subject_assignment?.subject_course?.course_name.toLowerCase();
      const propertyB = k12Departments.includes(
        section.department?.department_name
      )
        ? b.subject_assignment?.subject_course?.subject_name.toLowerCase()
        : b.subject_assignment?.subject_course?.course_name.toLowerCase();

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
          {item.start_time} - {item.end_time}
        </TableCell>
        <TableCell>
          {item.subject_assignment !== null &&
            item.subject_assignment.instructor?.first_name}
          {item.subject_assignment !== null &&
            item.subject_assignment.instructor?.last_name}
        </TableCell>
        <TableCell>
          {k12Departments.includes(section.department?.department_name)
            ? item.subject_assignment !== null &&
              item.subject_assignment?.subject_course?.subject_name
            : item.subject_assignment !== null &&
              item.subject_assignment.subject_course.course_name}
        </TableCell>
        <TableCell>{item.schedule.join(', ')}</TableCell>
        <TableCell>
          {item.room.building} - {item.room.room_number}
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
                dispatch(toggleEditSchedule());
                dispatch(getSchedule(item._id));
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
                dispatch(deleteSchedule(item._id));
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
      <AddSectionScheduleModal />
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
              value={searchTerm}
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
                  onClick={() => dispatch(toggleAddSchedule())}
                >
                  Add Schedule
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
                      <TableCell>Time</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'instructor'}
                          direction={order}
                          onClick={() => handleSort('instructor')}
                        >
                          Instructor
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'subject'}
                          direction={order}
                          onClick={() => handleSort('subject')}
                        >
                          Subject
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Created By</TableCell>
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
      {isFetchingSchedules ? null : (
        <Box component={Paper}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  {weekdays.map((day) => (
                    <TableCell key={day} align="center">
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.map((timeSlot) => {
                  const [startTime, endTime] = timeSlot.split(' - ');

                  return (
                    <TableRow key={timeSlot}>
                      <TableCell>{timeSlot}</TableCell>
                      {weekdays.map((day) => {
                        const subjectsForDay = schedulesWithConflict?.filter(
                          (subject) =>
                            subject.schedule.includes(day) &&
                            subject.start_time === startTime
                        );

                        const hasConflict =
                          subjectsForDay?.length > 1 &&
                          subjectsForDay?.some(
                            (subject, index) =>
                              subjectsForDay.findIndex(
                                (otherSubject, otherIndex) =>
                                  otherIndex > index &&
                                  otherSubject.room._id === subject.room._id
                              ) !== -1
                          );

                        return (
                          <TableCell key={`${day}-${timeSlot}`} align="center">
                            {subjectsForDay?.length > 0 ? (
                              subjectsForDay?.map((data, index) => (
                                <div key={data?._id}>
                                  <Typography
                                    variant="h6"
                                    color={hasConflict ? 'secondary' : ''}
                                  >
                                    {k12Departments.includes(
                                      section.department?.department_name
                                    )
                                      ? data?.subject_assignment?.subject_course
                                          ?.subject_name
                                      : data?.subject_assignment?.subject_course
                                          ?.course_name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {data?.start_time} - {data?.end_time}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption">
                                    {data?.room?.building +
                                      ' ' +
                                      data?.room?.room_number ||
                                      'No room assigned'}
                                  </Typography>
                                  <br />
                                  <Typography
                                    variant="h6"
                                    color={hasConflict ? 'secondary' : ''}
                                  >
                                    {data?.subject_assignment?.instructor
                                      ? data?.subject_assignment?.instructor
                                          ?.first_name +
                                        ' ' +
                                        data?.subject_assignment?.instructor
                                          ?.last_name
                                      : 'No Instructor'}
                                  </Typography>
                                  {hasConflict ? (
                                    <Typography variant="caption" color="error">
                                      Has conflict
                                    </Typography>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              ))
                            ) : (
                              <Typography variant="caption">
                                Unavailable
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Stack>
  );
};

export default ClassSchedules;
