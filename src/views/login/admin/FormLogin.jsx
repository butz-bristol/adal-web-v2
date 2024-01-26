import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* material-ui */
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* project imports */
import AnimateButton from 'src/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Slice
import { toast } from 'react-toastify';
import { handleChange, loginUser } from 'src/features/users/userSlice';

// ============================|| LOGIN ||============================ //

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { email, password, isLoading, user, userProfile } = useSelector(
    (state) => state.users
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user && user.user_role === 'hr admin') {
      navigate('/hr/dashboard');
    }

    if (user && user.user_role === 'admissions admin') {
      navigate('/admissions/dashboard');
    }

    if (user && user.user_role === 'registrar admin') {
      navigate('/registrar/dashboard');
    }

    if (user && user.user_role === 'library admin') {
      navigate('/library/dashboard');
    }

    if (user && user.user_role === 'cashier admin') {
      navigate('/cashier/dashboard');
    }
    if (user && user.user_role === 'finance admin') {
      navigate('/finance/dashboard');
    }
    if (user && user.user_role === 'accounting admin') {
      navigate('/accounting/dashboard');
    }
    if (
      user &&
      (user.user_role === 'academics admin' || user.user_role === 'teacher')
    ) {
      navigate('/academics/analytics');
    }
    if (user && user.user_role === 'procurement and inventory admin') {
      navigate('/procurement/dashboard');
    }
    if (user && user.user_role === 'canteen admin') {
      navigate('/canteen/dashboard');
    }
  }, [user, navigate]);

  return (
    <form>
      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          name="email"
          onChange={handleInput}
          label="Email"
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-login">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={handleInput}
          label="Password"
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
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            fullWidth
            size="large"
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
};

export default Login;
