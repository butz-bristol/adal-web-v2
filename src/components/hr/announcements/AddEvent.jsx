import { FileUploadRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAnnouncementValues,
  clearFile,
  createEvent,
  fetchAllDepartments,
  handleChange,
  toggleCreateAnnouncementModal,
  toggleEditAnnouncementModal,
  updateEvent,
  uploadImage,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import FileUploadStyles, { style } from './FormStyles';

const AddEvent = () => {
  const dispatch = useDispatch();
  const {
    createAnnouncement,
    isCreatingEvent,
    isEditingEvent,
    event_title,
    event_details,
    event_start_date,
    event_end_date,
    department_id,
    image,
    editAnnouncement,
    departments,
    isUploadingFile,
    editEventId,
  } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const uploadHandler = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    if (image) {
      dispatch(uploadImage(formData));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editAnnouncement) {
      dispatch(
        updateEvent({
          editEventId,
          event_title,
          event_details,
          event_start_date,
          department_id,
          event_end_date,
          event_image: image,
        })
      );
      return;
    }

    dispatch(
      createEvent({
        event_title,
        event_details,
        event_start_date,
        event_end_date,
        department_id,
        event_image: image,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  return (
    <Modal
      open={createAnnouncement || editAnnouncement}
      onClose={() => {
        createAnnouncement
          ? dispatch(toggleCreateAnnouncementModal())
          : dispatch(toggleEditAnnouncementModal());
        dispatch(clearAnnouncementValues());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2} mb={3}>
          <Typography variant="h4" id="modal-modal-title" component="h2">
            {createAnnouncement ? 'Create Event' : 'Edit Event'}
          </Typography>
        </Stack>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                variant="outlined"
                value={event_title}
                onChange={handleInput}
                name="event_title"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Details"
                variant="outlined"
                value={event_details}
                onChange={handleInput}
                name="event_details"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/*  Temporary fix for date input */}
              <Typography variant="h6">Start Date</Typography>
              <Input
                type={'date'}
                label="Start Date"
                variant="outlined"
                value={DateTime.fromISO(event_start_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
                name="event_start_date"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/*  Temporary fix for date input */}
              <Typography variant="h6">End Date</Typography>
              <Input
                type={'date'}
                label="End Date"
                variant="outlined"
                value={DateTime.fromISO(event_end_date).toFormat('yyyy-MM-dd')}
                onChange={handleInput}
                name="event_end_date"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                id="demo-simple-select"
                label="Department"
                name="department_id"
                value={department_id}
                onChange={handleInput}
                labelId="demo-simple-select-label"
                fullWidth
              >
                <MenuItem value="">Select One</MenuItem>
                {departments.map((department, index) => (
                  <MenuItem
                    key={index}
                    value={department._id}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {department?.department_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <FileUploadStyles>
                <Box className="file-inputs">
                  <Input
                    type="file"
                    name="image"
                    onChange={uploadHandler}
                    disableUnderline
                  />
                  <Button>
                    <FileUploadRounded />
                    {isUploadingFile ? 'Uploading...' : 'Upload'}
                  </Button>
                </Box>
              </FileUploadStyles>

              {image && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
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
                  <Typography variant="h4">Preview:</Typography>
                  <img src={image} alt="preview" />
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => dispatch(clearFile())}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="1rem auto">
            <FormControl fullWidth>
              <Button
                variant="contained"
                disabled={isCreatingEvent || isEditingEvent || isUploadingFile}
                onClick={handleSubmit}
              >
                {createAnnouncement ? 'Create Event' : 'Update Event'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddEvent;
