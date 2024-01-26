import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingScreen from 'src/components/LoadingScreen';
import AnimateButton from 'src/ui-component/extended/AnimateButton';

import { toast } from 'react-toastify';
import {
  loginStudent,
  setRemember,
  setShowPassword,
  setStudent,
} from 'src/features/studentFeatures/studentSlice';

const StudentLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkRemember, showPassword, studentData, student, isLoading } =
    useSelector((state) => state.students);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentData) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(loginStudent({ ...studentData }));
  };

  const handleInput = (e) => {
    dispatch(setStudent({ ...studentData, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (student && student.student_id) {
      navigate('/student/dashboard');
    }
  }, [student, navigate]);

  return (
    <>
      {isLoading && <LoadingScreen open={true} />}

      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Student Number / Email
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <form>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              label="Student Number or Student Email"
              type="text"
              name="student_crendential"
              onChange={handleInput}
              value={studentData.student_crendential || ''}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="student_password"
              value={studentData.student_password || ''}
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => dispatch(setShowPassword())}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checkRemember}
                onChange={() => dispatch(setRemember())}
                name="checked"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Typography
            variant="subtitle1"
            component={Link}
            to="/forgot-password"
            color="secondary"
            sx={{ textDecoration: 'none' }}
          >
            Forgot Password?
          </Typography>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={handleSubmit}
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign in
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default StudentLogin;
