import {
  Box,
  Button,
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
import AddLeaveApplication from 'src/components/hr/leave-application/AddLeaveApplication';
import LeaveApplication from 'src/components/hr/leave-application/LeaveApplication';
import LeaveBalance from 'src/components/hr/leave-application/LeaveBalance';
import SupervisedLeaveApplications from 'src/components/hr/leave-application/SingleLeaveApplication';
import {
  fetchAllLeaveApplications,
  toggleCreateLeaveApplicationModal,
  toggleLeaveBalance,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const LeaveApply = () => {
  const dispatch = useDispatch();
  const {
    userProfile: { _id, supervisor },
  } = useSelector((state) => state.users);
  const { leave_applications, isFetchingLeaveApplications } = useSelector(
    (state) => state.coreHr
  );

  useEffect(() => {
    dispatch(fetchAllLeaveApplications());
  }, [dispatch]);

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(toggleCreateLeaveApplicationModal())}
        sx={{ marginBottom: '1rem' }}
      >
        Apply for Leave
      </Button>

      <Button
        variant="text"
        color="primary"
        onClick={() => dispatch(toggleLeaveBalance())}
        sx={{ marginBottom: '1rem', ml: 1 }}
      >
        View Balance
      </Button>

      <AddLeaveApplication />

      <LeaveBalance />

      <Stack>
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
                {leave_applications
                  ?.filter((application) => application.userId?._id === _id)
                  .map((application, index) => (
                    <LeaveApplication
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

      {/* Supervised Leaves */}

      {supervisor === 'yes' && (
        <Stack mt={2}>
          <Typography variant="h3" mb={1.5}>
            Supervised Leaves
          </Typography>
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
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leave_applications
                  ?.filter(
                    (application) => application.supervisor_id?._id === _id
                  )
                  .map((application, index) => (
                    <SupervisedLeaveApplications
                      key={application._id}
                      {...application}
                      index={index}
                      supervised={true}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Box>
  );
};

export default LeaveApply;
