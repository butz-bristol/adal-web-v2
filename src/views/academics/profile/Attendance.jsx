import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditAttendance from 'src/components/hr/employees/EditAttendance';
import EditBreak from 'src/components/hr/employees/EditBreak';
import {
  clockIn,
  clockOut,
  deleteAttendance,
  deleteBreak,
  endBreak,
  fetchAllAttendances,
  fetchAllBreaks,
  setAttendanceValues,
  setBreakValues,
  startBreak,
  toggleEditAttendance,
  toggleEditBreak,
} from 'src/features/hrFeatures/employees/employeeSlice';
import { createTimesheet } from 'src/features/hrFeatures/payroll/payrollSlice';

const Attendance = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users);
  const { isCreatingTimesheet, currentCutOffDate } = useSelector(
    (state) => state.payroll
  );
  const {
    clockedOut,
    clockedIn,
    attendances,
    breaks,
    breakStarted,
    isDeletingBreak,
    isUpdatingBreak,
    isDeletingAttendance,
    isUpdatingAttendance,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchAllAttendances());
    dispatch(fetchAllBreaks());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ p: 0 }}>
        {clockedIn ? (
          <Box
            sx={{
              p: 2,
              borderRadius: '10px',
              bgcolor: 'success.light',
              color: 'success.dark',
              mb: '1rem',
            }}
          >
            <Typography variant="h5">You are clocked in</Typography>
          </Box>
        ) : breakStarted ? (
          <Box
            sx={{
              p: 2,
              borderRadius: '10px',
              bgcolor: 'info.light',
              color: 'error.dark',
              mb: '1rem',
            }}
          >
            <Typography variant="h5">Currently on break</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
              borderRadius: '10px',
              bgcolor: 'error.light',
              color: 'error.dark',
              mb: '1rem',
            }}
          >
            <Typography variant="h5">You are clocked out</Typography>
          </Box>
        )}

        {clockedOut ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            type="button"
            onClick={() => dispatch(clockIn())}
          >
            Clock In
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => dispatch(clockOut())}
          >
            Clock Out
          </Button>
        )}

        {breakStarted ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            sx={{ ml: 1 }}
            onClick={() => dispatch(endBreak())}
          >
            End Break
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
            color="warning"
            onClick={() => dispatch(startBreak())}
          >
            Take A Break
          </Button>
        )}

        {userProfile.isHrAdmin && (
          <>
            <Button
              variant="contained"
              size="small"
              sx={{
                ml: 1,
                background: '#e3f2fd',
                color: '#222',
                '&:hover': {
                  background: '#e3f2fd',
                  color: '#222',
                },
              }}
              disabled={isCreatingTimesheet}
              onClick={() => {
                dispatch(createTimesheet(userProfile));
              }}
            >
              Generate Timesheet
            </Button>

            <Tooltip
              title={`${DateTime.fromISO(
                currentCutOffDate?.cutOffStartDate
              ).toFormat('yyyy LLL dd')} - ${DateTime.fromISO(
                currentCutOffDate?.cutOffEndDate
              ).toFormat('yyyy LLL dd')}`}
            >
              <IconButton>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>

      <EditAttendance />

      <Grid container columns={3} p={1} pt={0}>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            p: 0,
            pt: 1,
            '@media (min-width: 600px)': {
              pt: 4,
            },
          }}
        >
          <Typography variant="h4">Attendances</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time In</TableCell>
                  <TableCell>Time Out</TableCell>
                  <TableCell>Hours</TableCell>
                  {userProfile.isHrAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {attendances
                  .filter(
                    (attendance) => attendance.userId?._id === userProfile._id
                  )
                  .map((attendance, index) => (
                    <TableRow key={attendance._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {DateTime.fromISO(
                          attendance.attendance_date
                        ).toLocaleString(DateTime.DATE_MED)}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(attendance.start).toLocaleString(
                          DateTime.TIME_24_SIMPLE
                        )}
                      </TableCell>
                      <TableCell>
                        {attendance.end
                          ? DateTime.fromISO(attendance.end).toLocaleString(
                              DateTime.TIME_24_SIMPLE
                            )
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{attendance.total_hours_worked}</TableCell>
                      {userProfile.isHrAdmin && (
                        <TableCell>
                          <Button
                            sx={{
                              minWidth: '0',
                              width: '20px',
                              marginRight: '0.5rem',
                            }}
                            variant="contained"
                            color="primary"
                            disabled={isUpdatingAttendance}
                            onClick={() => {
                              dispatch(toggleEditAttendance());
                              dispatch(setAttendanceValues(attendance));
                            }}
                          >
                            <EditIcon fontSize="10px" />
                          </Button>
                          <Button
                            sx={{ minWidth: '0', width: '20px' }}
                            variant="contained"
                            color="error"
                            disabled={isDeletingAttendance}
                            onClick={() =>
                              dispatch(deleteAttendance(attendance._id))
                            }
                          >
                            <DeleteIcon fontSize="10px" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <EditBreak />

        <Grid item lg={6} xs={12} sx={{ p: 0, pt: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Hours</TableCell>
                  {userProfile.isHrAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {breaks
                  .filter(
                    (break_time) => break_time.userId?._id === userProfile._id
                  )
                  .map((break_time, index) => (
                    <TableRow key={break_time._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {DateTime.fromISO(
                          break_time.attendance_date
                        ).toLocaleString(DateTime.DATE_MED)}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(break_time.start).toLocaleString(
                          DateTime.TIME_24_SIMPLE
                        )}
                      </TableCell>
                      <TableCell>
                        {break_time.end
                          ? DateTime.fromISO(break_time.end).toLocaleString(
                              DateTime.TIME_24_SIMPLE
                            )
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{break_time.total_break_time}</TableCell>
                      {userProfile.isHrAdmin && (
                        <TableCell>
                          <Button
                            sx={{
                              minWidth: '0',
                              width: '20px',
                              marginRight: '0.5rem',
                            }}
                            variant="contained"
                            color="primary"
                            disabled={isUpdatingBreak}
                            onClick={() => {
                              dispatch(toggleEditBreak());
                              dispatch(setBreakValues(break_time));
                            }}
                          >
                            <EditIcon fontSize="10px" />
                          </Button>
                          <Button
                            sx={{ minWidth: '0', width: '20px' }}
                            variant="contained"
                            color="error"
                            disabled={isDeletingBreak}
                            onClick={() =>
                              dispatch(deleteBreak(break_time._id))
                            }
                          >
                            <DeleteIcon fontSize="10px" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Attendance;
