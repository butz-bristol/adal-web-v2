import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updatePassword } from 'src/features/users/userSlice';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { userProfile, isUpdatingPassword } = useSelector(
    (state) => state.users
  );
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState({
    userId: userProfile?._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword, userId } = userPassword;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning('please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('passwords do not match');
      return;
    }

    dispatch(updatePassword({ oldPassword, newPassword, userId }));

    setUserPassword({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <form>
        <Typography variant="h4">Change my password</Typography>

        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="outlined-adornment-password-login">
                Old Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={userPassword.oldPassword}
                name="oldPassword"
                onChange={handleChange}
                label="Old Password"
                inputProps={{}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="outlined-adornment-password-login">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={userPassword.newPassword}
                name="newPassword"
                onChange={handleChange}
                label="New Password"
                inputProps={{}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="outlined-adornment-password-login">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={userPassword.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                label="Confirm Password"
                inputProps={{}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  disabled={
                    userPassword.oldPassword === '' ||
                    userPassword.newPassword === '' ||
                    userPassword.confirmPassword === '' ||
                    userPassword.newPassword !== userPassword.confirmPassword ||
                    isUpdatingPassword
                  }
                  color="primary"
                  type="submit"
                  onClick={handleUpdatePasswordSubmit}
                >
                  Update Password
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default UpdatePassword;
