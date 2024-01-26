import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAnnouncementValues,
  fetchAllDepartments,
  toggleViewAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import { style } from './FormStyles';

const SingleHoliday = () => {
  const dispatch = useDispatch();
  const {
    holiday_title,
    holiday_details,
    holiday_start_date,
    holiday_end_date,
    department_id,
    image,
    departments,
    viewAnnouncement,
  } = useSelector((state) => state.coreHr);

  const department = departments?.find((dept) => dept._id === department_id);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  return (
    <Modal
      open={viewAnnouncement}
      onClose={() => {
        dispatch(toggleViewAnnouncementModal());
        dispatch(clearAnnouncementValues());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2} mb={3}>
          <Typography variant="h4" id="modal-modal-title" component="h2">
            View Holiday
          </Typography>
        </Stack>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                variant="outlined"
                value={holiday_title}
                readOnly
                name="holiday_title"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Details"
                variant="outlined"
                value={holiday_details}
                name="holiday_details"
                readOnly
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Start Date"
                variant="outlined"
                value={DateTime.fromISO(holiday_start_date).toFormat(
                  'yyyy-MM-dd'
                )}
                name="holiday_start_date"
                readOnly
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="End Date"
                variant="outlined"
                value={DateTime.fromISO(holiday_end_date).toFormat(
                  'yyyy-MM-dd'
                )}
                name="holiday_end_date"
                readOnly
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <TextField
                label="Department"
                variant="outlined"
                name="department_id"
                value={department?.department_name || ''}
                readOnly
              />
            </FormControl>
          </Grid>

          {image && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    width: '100%',
                    flexDirection: 'column',

                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    },
                  }}
                >
                  <img src={image} alt="preview" />
                </Box>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6} m="1rem auto">
            <FormControl fullWidth>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(toggleViewAnnouncementModal());
                  dispatch(clearAnnouncementValues());
                }}
              >
                Close
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SingleHoliday;
