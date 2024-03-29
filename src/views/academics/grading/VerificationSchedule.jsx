import {
  Button,
  Chip,
  FormControl,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import AddVerificationSchedule from 'src/components/academics/Grading/AddVerificationSchedule';
import {
  getAllVerificationSchedules,
  setDynamicData,
  toggleAddVerificationSchedule,
  toggleEditVerificationSchedule,
} from 'src/features/academicFeatures/academicSlice';
import { convertMongoDBDateTimeString } from 'src/utils/helperFunctions';

const VerificationSchedule = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const {
    verificationSchedules,
    isFetchingVerificationSchedules,
    userProfile,
  } = useSelector((state) => state.academics);

  useEffect(() => {
    dispatch(getAllVerificationSchedules());
  }, [dispatch]);

  const filteredVerificationSchedules = verificationSchedules
    ?.filter((schedule) => !schedule.isArchived)
    .filter(
      (schedule) =>
        schedule.start_date_time.includes(query) ||
        schedule.end_date_time.includes(query)
    );

  return (
    <Stack>
      <AddVerificationSchedule />

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <FormControl fullWidth sx={{ width: 300 }}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label="Search"
            placeholder="2023-11-10 09:00"
            helperText={`Example: "2023-11-10 09:00"`}
          />
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<IconPlus />}
          onClick={() => dispatch(toggleAddVerificationSchedule())}
        >
          Add New
        </Button>
      </Stack>

      <Paper sx={{ mt: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: '650px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Start Date / Time</TableCell>
                <TableCell>End Date / Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredVerificationSchedules.map((schedule) => (
                <TableRow key={schedule._id}>
                  <TableCell>
                    {DateTime.fromISO(schedule.start_date_time).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </TableCell>
                  <TableCell>
                    {DateTime.fromISO(schedule.end_date_time).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.status}
                      color={
                        schedule.status === 'active' ? 'success' : 'warning'
                      }
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    {userProfile?.admin_designation_toggle && (
                      <Tooltip title="Edit Schedule">
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            dispatch(toggleEditVerificationSchedule());
                            dispatch(
                              setDynamicData({
                                start_date_time: convertMongoDBDateTimeString(
                                  schedule.start_date_time
                                ),
                                end_date_time: convertMongoDBDateTimeString(
                                  schedule.end_date_time
                                ),
                                verification_schedule_id: schedule._id,
                              })
                            );
                          }}
                        >
                          <IconPencil />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {isFetchingVerificationSchedules && <LoadingData />}
    </Stack>
  );
};
export default VerificationSchedule;
