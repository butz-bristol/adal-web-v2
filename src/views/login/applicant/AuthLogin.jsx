import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* material-ui */
import { Box, Button, Grid, TextField } from '@mui/material';

/* project imports */
import AnimateButton from 'src/ui-component/extended/AnimateButton';

// Slice
import { toast } from 'react-toastify';
import {
  handleChange,
  loginApplicant,
} from 'src/features/applicantFeatures/applicantSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student_reference_no, student_personal_email, isLoading, applicant } =
    useSelector((state) => state.applicants);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student_reference_no || !student_personal_email) {
      toast.error('Please enter reference and email');
      return;
    }

    dispatch(loginApplicant({ student_reference_no, student_personal_email }));
  };

  useEffect(() => {
    if (applicant && applicant.student_personal_email) {
      navigate('/applicant/profile');
    }
  }, [applicant, navigate]);

  return (
    <form>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            type="text"
            label="Reference No."
            onChange={handleInput}
            value={student_reference_no}
            name="student_reference_no"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            onChange={handleInput}
            value={student_personal_email}
            name="student_personal_email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box>
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
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
