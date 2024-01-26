import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationButtons from 'src/components/hr/PaginationButtons';
import SingleLeaveApplication from 'src/components/hr/leave-application/SingleLeaveApplication';
import {
  changePage,
  fetchAllLeaveApplications,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const LeaveApplications = () => {
  const dispatch = useDispatch();
  const {
    leave_applications,
    totalLeaveApplicationPages,
    totalApplications,
    isFetchingLeaveApplications,
    page,
  } = useSelector((state) => state.coreHr);

  useEffect(() => {
    dispatch(fetchAllLeaveApplications());
  }, [dispatch, page]);

  return (
    <Box>
      <Grid container gap={1}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}
        >
          <Typography variant="h4">Total Applications : </Typography>
          <Chip
            label={totalApplications}
            color="primary"
            variant="filled"
            sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}
          />
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}
        >
          <Typography variant="h4">Approved Applications : </Typography>
          <Chip
            label={
              leave_applications.filter(
                (leave_application) =>
                  leave_application.leave_status === 'approved'
              ).length
            }
            color="success"
            variant="filled"
            sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}
          />{' '}
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}
        >
          <Typography variant="h4">Pending Applications : </Typography>
          <Chip
            label={
              leave_applications.filter(
                (leave_application) =>
                  leave_application.leave_status === 'pending'
              ).length
            }
            color="warning"
            variant="filled"
            sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}
          />{' '}
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}
        >
          <Typography variant="h4">Rejected Applications : </Typography>
          <Chip
            label={
              leave_applications.filter(
                (leave_application) =>
                  leave_application.leave_status === 'rejected'
              ).length
            }
            color="error"
            variant="filled"
            sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}
          />{' '}
        </Box>
      </Grid>

      <Stack mt={2}>
        {isFetchingLeaveApplications ? (
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Supervisor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leave_applications.map((application, index) => (
                  <SingleLeaveApplication
                    key={application._id}
                    {...application}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>

      <PaginationButtons
        page={page}
        count={totalLeaveApplicationPages}
        changePage={changePage}
      />
    </Box>
  );
};

export default LeaveApplications;
