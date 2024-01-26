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
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNotice from 'src/components/hr/announcements/AddNotice';
import Notice from 'src/components/hr/announcements/Notice';
import SingleNotice from 'src/components/hr/announcements/SingleNotice';
import {
  fetchAllNotices,
  toggleCreateAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Notices = () => {
  const dispatch = useDispatch();
  const { notices, isCreatingNotice, isFetchingNotices } = useSelector(
    (state) => state.coreHr
  );

  useEffect(() => {
    dispatch(fetchAllNotices());
  }, [dispatch]);
  return (
    <Stack>
      <Box mb={2.5}>
        <Button
          variant="contained"
          disabled={isCreatingNotice}
          onClick={() => dispatch(toggleCreateAnnouncementModal())}
          color="secondary"
        >
          Create Notice
        </Button>
      </Box>

      <AddNotice />
      <SingleNotice />

      {isFetchingNotices ? (
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
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Notice</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notices?.map((notice, index) => (
                <Notice key={notice._id} index={index} {...notice} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Notices;
