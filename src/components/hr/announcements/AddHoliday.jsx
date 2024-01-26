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
  createHoliday,
  fetchAllDepartments,
  handleChange,
  toggleCreateAnnouncementModal,
  toggleEditAnnouncementModal,
  updateHoliday,
  uploadImage,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import FileUploadStyles, { style } from './FormStyles';

const AddHoliday = () => {
  const dispatch = useDispatch();
  const {
    createAnnouncement,
    isCreatingHoliday,
    isEditingHoliday,
    holiday_title,
    holiday_details,
    holiday_start_date,
    holiday_end_date,
    department_id,
    image,
    editAnnouncement,
    departments,
    isUploadingFile,
    editHolidayId,
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
        updateHoliday({
          editHolidayId,
          holiday_title,
          holiday_details,
          holiday_start_date,
          holiday_end_date,
          department_id,
          holiday_image: image,
        })
      );
      return;
    }

    dispatch(
      createHoliday({
        holiday_title,
        holiday_details,
        holiday_start_date,
        holiday_end_date,
        department_id,
        holiday_image: image,
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
            {createAnnouncement ? 'Create Holiday' : 'Edit Holiday'}
          </Typography>
        </Stack>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                variant="outlined"
                value={holiday_title}
                onChange={handleInput}
                name="holiday_title"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Details"
                variant="outlined"
                value={holiday_details}
                onChange={handleInput}
                name="holiday_details"
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
                value={DateTime.fromISO(holiday_start_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
                name="holiday_start_date"
                inputProps={{
                  min: DateTime.now().toISODate(),
                }}
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
                value={DateTime.fromISO(holiday_end_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
                name="holiday_end_date"
                inputProps={{
                  min: holiday_start_date,
                }}
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
                color="secondary"
                variant="contained"
                disabled={
                  isCreatingHoliday || isEditingHoliday || isUploadingFile
                }
                onClick={handleSubmit}
              >
                {createAnnouncement ? 'Create Holiday' : 'Update Holiday'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default AddHoliday;
