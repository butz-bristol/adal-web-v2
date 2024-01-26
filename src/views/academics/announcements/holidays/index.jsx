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
import AddHoliday from 'src/components/hr/announcements/AddHoliday';
import Holiday from 'src/components/hr/announcements/Holiday';
import SingleHoliday from 'src/components/hr/announcements/SingleHoliday';
import {
  fetchAllHolidays,
  toggleCreateAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Holidays = () => {
  const dispatch = useDispatch();
  const { holidays, isCreatingHoliday, isFetchingHolidays } = useSelector(
    (state) => state.coreHr
  );

  useEffect(() => {
    dispatch(fetchAllHolidays());
  }, [dispatch]);

  return (
    <Stack>
      <Box mb={2.5}>
        <Button
          variant="contained"
          disabled={isCreatingHoliday}
          onClick={() => dispatch(toggleCreateAnnouncementModal())}
          color="primary"
        >
          Create Holiday
        </Button>
      </Box>

      <AddHoliday />
      <SingleHoliday />

      {isFetchingHolidays ? (
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
              {holidays?.map((holiday, index) => (
                <Holiday key={holiday._id} index={index} {...holiday} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Holidays;
