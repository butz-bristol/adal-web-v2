import {
  Box,
  Button,
  CircularProgress,
  Grid,
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
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditTimesheet from 'src/components/hr/payroll/EditTimesheet';
import EmployeeTimesheet from 'src/components/hr/payroll/EmployeeTimesheet';
import Timesheet from 'src/components/hr/payroll/Timesheet';
import {
  fetchAllCutOffDates,
  fetchAllTimesheets,
  fetchTimsheetsByDateRange,
  handleChange,
  resetTemplateDateFilters,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const Timesheets = () => {
  const dispatch = useDispatch();
  const {
    timesheets,
    timesheet,
    isFetchingTimesheets,
    cutOffDates,
    cutOffDateId,
  } = useSelector((state) => state.payroll);

  const handleDateFilter = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  useEffect(() => {
    if (cutOffDateId) {
      dispatch(fetchTimsheetsByDateRange(cutOffDateId));
    } else {
      dispatch(fetchAllTimesheets());
    }
    dispatch(fetchAllCutOffDates());
  }, [cutOffDateId, dispatch]);

  return (
    <Stack>
      {timesheet._id && <EmployeeTimesheet />}
      <EditTimesheet />

      <Grid container mb={2} columnGap={2}>
        <Grid item xs={4}>
          <InputLabel id="cutoff-date-label">Select Cut Off</InputLabel>
          <Select
            fullWidth
            labelId="cutoff-date-label"
            id="cutoff-date"
            label="Select Cut Off"
            name="cutOffDateId"
            value={cutOffDateId}
            onChange={handleDateFilter}
          >
            <MenuItem value="">Select Cut Off</MenuItem>
            {cutOffDates?.map((cutOffDate) => (
              <MenuItem key={cutOffDate._id} value={cutOffDate._id}>
                {DateTime.fromISO(cutOffDate.cutOffStartDate).toFormat(
                  'dd LLL yyyy'
                )}{' '}
                -{' '}
                {DateTime.fromISO(cutOffDate.cutOffEndDate).toFormat(
                  'dd LLL yyyy'
                )}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item alignSelf={'flex-end'}>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(resetTemplateDateFilters())}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      {isFetchingTimesheets ? (
        <Grid
          container
          width="100%"
          justifyItems="center"
          alignItems="center"
          minHeight="200px"
        >
          <Box
            sx={{
              margin: '0 auto',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size="70px" />
          </Box>
        </Grid>
      ) : (
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Department(s)</TableCell>
                  <TableCell>Designation(s)</TableCell>
                  <TableCell>Hours Worked</TableCell>
                  <TableCell>Leaves</TableCell>
                  <TableCell>Paid Hours</TableCell>
                  <TableCell>Updated By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timesheets?.map((timesheet, index) => (
                  <Timesheet
                    timesheet={timesheet}
                    index={index}
                    key={timesheet._id}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
};

export default Timesheets;
