import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Divider, Grid, TextField, Typography } from '@mui/material';

import { setApplicant } from 'src/features/applicantFeatures/applicantSlice';

const FamilyBackground = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { newApplicant } = useSelector((state) => state.applicants);

  const handleChange = (e) => {
    dispatch(
      setApplicant({ ...newApplicant, [e.target.name]: e.target.value })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography color="secondary" textTransform="uppercase">
            Family Background
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          label="Father's name"
          onChange={handleChange}
          name="student_father_name"
          value={newApplicant.student_father_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="email"
          label="Email Address"
          onChange={handleChange}
          name="student_father_email_address"
          value={newApplicant.student_father_email_address || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Contact"
          onChange={handleChange}
          name="student_father_contact_number"
          value={newApplicant.student_father_contact_number || ''}
          variant="outlined"
          placeholder="09xx-xxx-xxxx"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Occupation"
          onChange={handleChange}
          name="student_father_occupation"
          value={newApplicant.student_father_occupation || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          label="Mother's name"
          onChange={handleChange}
          name="student_mother_name"
          value={newApplicant.student_mother_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="email"
          label="Email Address"
          onChange={handleChange}
          name="student_mother_email_address"
          value={newApplicant.student_mother_email_address || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Contact"
          onChange={handleChange}
          name="student_mother_contact_number"
          value={newApplicant.student_mother_contact_number || ''}
          placeholder="09xx-xxx-xxxx"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Occupation"
          onChange={handleChange}
          name="student_mother_occupation"
          value={newApplicant.student_mother_occupation || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          label="Guardian's Name"
          onChange={handleChange}
          name="student_guardian_name"
          value={newApplicant.student_guardian_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="email"
          label="Email Address"
          onChange={handleChange}
          name="student_guardian_email_address"
          value={newApplicant.student_guardian_email_address || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Contact"
          onChange={handleChange}
          name="student_guardian_contact_number"
          value={newApplicant.student_guardian_contact_number || ''}
          variant="outlined"
          placeholder="09xx-xxx-xxxx"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          type="text"
          helperText="Put N/A if not applicable"
          label="Occupation"
          onChange={handleChange}
          name="student_guardian_occupation"
          value={newApplicant.student_guardian_occupation || ''}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default FamilyBackground;
