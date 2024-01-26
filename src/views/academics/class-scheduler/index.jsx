import { useTheme } from '@emotion/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActionArea,
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
  deleteSchedule,
  getAllRooms,
  getAllSchedules,
  getAllSections,
  getAllSubjectAssignments,
  getSchedule,
  toggleAddSchedule,
  toggleEditSchedule,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import AddScheduleModal from 'src/components/academics/AddScheduleModal';
import { getAllDepartments } from 'src/features/registrarFeatures/registrarSlice';
import { timeSlots, weekdays } from 'src/utils/helperFunctions';

const ClassScheduler = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { sections, schedules, isFetchingSchedules, isFetchingSchedule } =
    useSelector((state) => state.academics);

  const { departments } = useSelector((state) => state.registrar);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

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

  const filteredData = schedules.filter((item) => {
    const instructor = `${item.subject_assignment?.instructor?.first_name} ${item.subject_assignment?.instructor?.last_name}`;
    const section = `${item.section_name}`;
    const subject =
      `${item.subject_assignment?.subject_course?.subject_name}` ||
      `${item.subject_assignment.subject_course.course_name}`;
    const time = `${item.start_time} ${item.end_time}`;
    const room = `${item.room.building} ${item.room.room_number}`;
    const schedule = item.schedule.join(' ');
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      instructor.toLowerCase().includes(searchTermLowerCase) ||
      section.toLowerCase().includes(searchTermLowerCase) ||
      subject.toLowerCase().includes(searchTermLowerCase) ||
      time.toLowerCase().includes(searchTermLowerCase) ||
      room.toLowerCase().includes(searchTermLowerCase) ||
      schedule.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'time') {
      const propertyA = `${a.start_time} ${a.start_time}`.toLowerCase();
      const propertyB =
        `${b.section?.section_name} ${b.section?.section_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
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
      const propertyA =
        a.subject_assignment?.subject_course?.subject_name.toLowerCase() ||
        a.subject_assignment?.subject_course?.course_name.toLowerCase();
      const propertyB =
        b.subject_assignment?.subject_course?.subject_name.toLowerCase() ||
        b.subject_assignment?.subject_course?.course_name.toLowerCase();

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

  // Create an empty timetable structure
  const timetable = timeSlots.map((timeSlot) => {
    const [startTime, endTime] = timeSlot.split(' - ');

    const slot = {
      timeSlot,
      days: {},
    };

    weekdays.forEach((day) => {
      slot.days[day] = [];
    });

    return slot;
  });

  // Fill in the timetable with schedule data
  schedules.forEach((schedule) => {
    const { start_time, end_time, schedule: days } = schedule;

    days.forEach((day) => {
      const matchingSlot = timetable.find(
        (slot) => slot.timeSlot === `${start_time} - ${end_time}`
      );
      if (matchingSlot) {
        matchingSlot.days[day].push(schedule);
      }
    });
  });

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
        <TableCell>
          <Typography variant="body1">{item.section?.section_name}</Typography>
          <Typography variant="caption">
            {item.start_time} - {item.end_time}
          </Typography>
        </TableCell>
        <TableCell>
          {item.subject_assignment?.instructor?.first_name}{' '}
          {item.subject_assignment?.instructor?.last_name}
        </TableCell>
        <TableCell>
          {item.subject_assignment?.subject_course?.subject_name ||
            item.subject_assignment?.subject_course.course_name}
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

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllSections());
    dispatch(getAllSchedules());
    dispatch(getAllRooms());
    dispatch(getAllSubjectAssignments());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <AddScheduleModal />
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
                  startIcon={<IconSquarePlus />}
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
          {isFetchingSchedules || isFetchingSchedule ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'time'}
                          direction={order}
                          onClick={() => handleSort('time')}
                        >
                          Section
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
                      <TableCell width={20}>{timeSlot}</TableCell>
                      {weekdays.map((day) => {
                        const subjectsForDay = schedules.filter(
                          (subject) =>
                            subject.schedule.includes(day) &&
                            // Check if the start_time is within the time slot
                            ((subject.start_time >= startTime &&
                              subject.start_time < endTime) ||
                              // Check if the schedule completely overlaps the time slot
                              (subject.start_time <= startTime &&
                                subject.end_time >= endTime))
                        );

                        const hasConflict =
                          subjectsForDay?.length > 1 &&
                          (subjectsForDay?.some(
                            (subject, index) =>
                              subjectsForDay.findIndex(
                                (otherSubject, otherIndex) =>
                                  otherIndex > index &&
                                  otherSubject.room?._id ===
                                    subject?.room?._id &&
                                  otherSubject.subject_assignment
                                    ?.subject_name ===
                                    subject.subject_assignment?.subject_name &&
                                  otherSubject.subject_assignment?.instructor
                                    ?._id ===
                                    subject.subject_assignment?.instructor?._id
                              ) !== -1
                          ) ||
                            subjectsForDay?.some(
                              (subject, index) =>
                                subjectsForDay.findIndex(
                                  (otherSubject, otherIndex) =>
                                    otherIndex > index &&
                                    otherSubject.subject_assignment?.instructor
                                      ?._id ===
                                      subject.subject_assignment?.instructor
                                        ?._id
                                ) !== -1
                            ));

                        return (
                          <TableCell key={`${day}-${timeSlot}`} align="center">
                            {subjectsForDay?.length > 0 ? (
                              subjectsForDay?.map((data, index) => (
                                <Card
                                  key={data?._id}
                                  sx={{
                                    mb: 1,
                                    background:
                                      theme.palette.mode === 'dark'
                                        ? theme.palette.dark.main
                                        : theme.palette.grey[100],
                                    border:
                                      theme.palette.mode === 'dark'
                                        ? '1px solid transparent'
                                        : `1px solid${theme.palette.grey[100]}`,
                                  }}
                                >
                                  <CardActionArea
                                    onClick={() => {
                                      dispatch(toggleEditSchedule());
                                      dispatch(getSchedule(data._id));
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      color={hasConflict ? 'secondary' : ''}
                                    >
                                      {data.section?.section_name}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      color={hasConflict ? 'secondary' : ''}
                                    >
                                      {data.subject_assignment?.subject_type ===
                                      'K12Subject'
                                        ? data?.subject_assignment
                                            ?.subject_course?.subject_name
                                        : data?.subject_assignment
                                            ?.subject_course?.course_name}
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
                                      <Typography
                                        variant="caption"
                                        color="error"
                                      >
                                        Has conflict
                                      </Typography>
                                    ) : (
                                      ''
                                    )}
                                  </CardActionArea>
                                </Card>
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

export default ClassScheduler;
