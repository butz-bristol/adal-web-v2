import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  setUser,
  toggleEditUser,
  updateInstructor,
} from 'src/features/academicFeatures/academicSlice';

const EditTeacherProfile = () => {
  const dispatch = useDispatch();
  const { isEditingUser, user, userProfile } = useSelector(
    (state) => state.academics
  );
  const { year_levels } = useSelector((state) => state.registrar);

  const departments = user.teaching_department.map(
    (item) => item.department_name
  );
  const filteredLevels = year_levels
    .filter((item) => departments.includes(item.department?.department_name))
    .map((item) => ({
      _id: item._id,
      year_level_name: item.year_level_name,
      department: item.department?.department_name,
    }));
  const handleSubmit = () => {
    dispatch(updateInstructor({ ...user }));
    handleClose();
    return;
  };

  const toggleIsVerifier = () => {
    const data = { ...user };
    dispatch(setUser({ ...data, isVerifier: !user?.isVerifier }));
  };

  const handleClose = () => {
    dispatch(toggleEditUser());
    dispatch(clearUser());
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };
  const handleChange = (e, ids) => {
    const data = ids.map((item) => item._id);
    dispatch(setUser({ ...user, levels: data }));
  };

  useEffect(() => {
    let data = { ...user };
    if (user.isVerifier === false) {
      delete data.levels;
      dispatch(setUser({ ...data }));
    }
  }, [user.isVerifier]);

  return (
    <Dialog fullWidth open={isEditingUser} onClose={handleClose}>
      <DialogTitle fontSize={18}>Edit User</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <ToggleButtonGroup
                exclusive
                color="secondary"
                value={user.isVerifier ? 'Yes' || '' : 'No' || ''}
                onChange={toggleIsVerifier}
              >
                <ToggleButton value="Yes">I am a Verifier</ToggleButton>
                <ToggleButton value="No">Not Verifier</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Grid>
          {user?.isVerifier && (
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="year-levels"
                options={filteredLevels}
                getOptionLabel={(item) => item?.year_level_name}
                renderOption={(props, item, { selected }) => (
                  <li {...props} key={item._id}>
                    {item?.year_level_name}
                    {item?.department === 'College' ||
                    item?.department ===
                      'Technical Education and Skills Development Authority (TESDA)'
                      ? ' - ' + item?.department
                      : ''}
                  </li>
                )}
                onChange={handleChange}
                value={
                  filteredLevels.filter((item) =>
                    user?.levels?.includes(item._id)
                  ) || []
                }
                isOptionEqualToValue={customIsOptionEqualToValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Level"
                    placeholder="Choose a Level"
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeacherProfile;
