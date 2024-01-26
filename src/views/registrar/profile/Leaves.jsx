import {
  Box,
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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LeaveApplication from 'src/components/hr/leave-application/LeaveApplication';

const Leaves = () => {
  const dispatch = useDispatch();
  const { leave_applications, isFetchingLeaveApplications } = useSelector(
    (state) => state.coreHr
  );
  const {
    userProfile: { _id: userId },
  } = useSelector((state) => state.users);

  return (
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
                ?.filter((application) => application.userId?._id === userId)
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
  );
};

export default Leaves;
