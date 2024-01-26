import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearEducationProfile,
  createEducationProfile,
  deleteEducationProfile,
  handleChange,
  toggleAddEducationProfileModal,
  toggleEditEducationProfileModal,
  updateEducationProfile,
} from 'src/features/users/userSlice';
import { months, years } from 'src/utils/helperFunctions';

const AddEducationProfile = () => {
  const dispatch = useDispatch();
  const {
    isCreatingEducationProfile,
    isUpdatingEducationProfile,
    createEducationProfileModal,
    isDeleingEducationProfile,
    editEducationProfileId,
    editEducationProfile,
    school_name,
    degree,
    field_of_study,
    start_month,
    start_year,
    end_month,
    end_year,
    grade,
    activities_and_societies,
    education_description,
  } = useSelector((state) => state.users);
  const {
    user: { userId },
  } = useSelector((state) => state.users);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !school_name ||
      !degree ||
      !field_of_study ||
      !start_month ||
      !start_year
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editEducationProfile) {
      dispatch(
        updateEducationProfile({
          editEducationProfileId,
          school_name,
          degree,
          field_of_study,
          start_month,
          start_year,
          end_month,
          end_year,
          grade,
          activities_and_societies,
          education_description,
          userId,
        })
      );
      return;
    }

    dispatch(
      createEducationProfile({
        school_name,
        degree,
        field_of_study,
        start_month,
        start_year,
        end_month,
        end_year,
        grade,
        activities_and_societies,
        education_description,
        userId,
      })
    );

    setTimeout(() => {
      dispatch(clearEducationProfile());
      dispatch(toggleAddEducationProfileModal());
    }, 1000);
  };

  return (
    <Modal
      open={createEducationProfileModal || editEducationProfile}
      onClose={() => {
        createEducationProfileModal
          ? dispatch(toggleAddEducationProfileModal())
          : dispatch(toggleEditEducationProfileModal());
        dispatch(clearEducationProfile());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <Typography variant="h4" gutterBottom component="div">
          {editEducationProfile
            ? 'Edit Education Profile'
            : 'Add Education Profile'}
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <TextField
                label="School"
                name="school_name"
                value={school_name}
                onChange={handleInput}
                variant="outlined"
                required
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <TextField
                label="Degree"
                name="degree"
                value={degree}
                onChange={handleInput}
                variant="outlined"
                required
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Field of study"
                name="field_of_study"
                value={field_of_study}
                onChange={handleInput}
                variant="outlined"
                required
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="start-month-label">Start Date</InputLabel>
              <Select
                labelId="start-month-label"
                id="start-month"
                name="start_month"
                value={start_month}
                label="Start Date"
                onChange={handleInput}
                variant="outlined"
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="start-year-label">Year</InputLabel>
              <Select
                labelId="start-year-label"
                id="start-year"
                name="start_year"
                value={start_year}
                label="Year"
                onChange={handleInput}
                variant="outlined"
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="end-month-label">
                End Date (or expected)
              </InputLabel>
              <Select
                labelId="end-month-label"
                id="end-month"
                name="end_month"
                value={end_month}
                label="End Date (or expected)"
                onChange={handleInput}
                variant="outlined"
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="end-year-label">Year</InputLabel>
              <Select
                labelId="end-year-label"
                id="end-year"
                name="end_year"
                value={end_year}
                label="Year"
                onChange={handleInput}
                variant="outlined"
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Grade"
                name="grade"
                value={grade || ''}
                onChange={handleInput}
                variant="outlined"
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Activities and Societies"
                name="activities_and_societies"
                value={activities_and_societies}
                onChange={handleInput}
                variant="outlined"
                multiline
                rows={3}
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="education_description"
                value={education_description}
                onChange={handleInput}
                variant="outlined"
                multiline
                rows={3}
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                isCreatingEducationProfile ||
                isUpdatingEducationProfile ||
                isDeleingEducationProfile
              }
            >
              {editEducationProfile ? 'Update' : 'Add'}
            </Button>

            {editEducationProfile && (
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => {
                  dispatch(deleteEducationProfile(editEducationProfileId));
                  dispatch(toggleEditEducationProfileModal());
                  dispatch(clearEducationProfile());
                }}
                disabled={
                  isCreatingEducationProfile ||
                  isUpdatingEducationProfile ||
                  isDeleingEducationProfile
                }
              >
                Delete
              </Button>
            )}

            <Button
              onClick={() => {
                dispatch(toggleEditEducationProfileModal());
                dispatch(clearEducationProfile());
              }}
              variant="contained"
              disabled={
                isCreatingEducationProfile ||
                isUpdatingEducationProfile ||
                isDeleingEducationProfile
              }
              sx={{ ml: 1, background: '#e3f2fd', color: '#222' }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default AddEducationProfile;
