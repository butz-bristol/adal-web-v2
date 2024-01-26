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
import AddEvent from 'src/components/hr/announcements/AddEvent';
import Event from 'src/components/hr/announcements/Event';
import SingleEvent from 'src/components/hr/announcements/SingleEvent';
import {
  fetchAllEvents,
  toggleCreateAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Events = () => {
  const dispatch = useDispatch();
  const { events, isCreatingEvent, isFetchingEvents } = useSelector(
    (state) => state.coreHr
  );

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <Stack>
      <Box mb={2.5}>
        <Button
          variant="contained"
          disabled={isCreatingEvent}
          onClick={() => dispatch(toggleCreateAnnouncementModal())}
          color="secondary"
        >
          Create Event
        </Button>
      </Box>

      <AddEvent />
      <SingleEvent />

      {isFetchingEvents ? (
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
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events?.map((event, index) => (
                <Event key={event._id} index={index} {...event} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Events;
