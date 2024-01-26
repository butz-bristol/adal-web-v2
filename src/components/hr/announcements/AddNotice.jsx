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
  createNotice,
  fetchAllDepartments,
  handleChange,
  toggleCreateAnnouncementModal,
  toggleEditAnnouncementModal,
  updateNotice,
  uploadImage,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import FileUploadStyles from './FormStyles';

const AddNotice = () => {
  const dispatch = useDispatch();
  const {
    createAnnouncement,
    isCreatingNotice,
    isEditingNotice,
    notice_title,
    notice_description,
    notice_date,
    department_id,
    image,
    editAnnouncement,
    departments,
    isUploadingFile,
    editNoticeId,
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
        updateNotice({
          editNoticeId,
          notice_title,
          notice_date,
          notice_description,
          department_id,
          notice_image: image,
        })
      );
      return;
    }

    dispatch(
      createNotice({
        notice_title,
        notice_date,
        notice_description,
        department_id,
        notice_image: image,
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
            {createAnnouncement ? 'Create Notice' : 'Edit Notice'}
          </Typography>
        </Stack>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                variant="outlined"
                value={notice_title}
                onChange={handleInput}
                name="notice_title"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                variant="outlined"
                value={notice_description}
                onChange={handleInput}
                name="notice_description"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/*  Temporary fix for date input */}
              <Typography variant="h6">Date</Typography>
              <Input
                type={'date'}
                label="Date"
                variant="outlined"
                value={DateTime.fromISO(notice_date).toFormat('yyyy-MM-dd')}
                onChange={handleInput}
                name="notice_date"
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
                color="secondary"
                disabled={
                  isCreatingNotice || isEditingNotice || isUploadingFile
                }
                onClick={handleSubmit}
              >
                {createAnnouncement ? 'Create Notice' : 'Update Notice'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  padding: '20px',
};

export default AddNotice;
