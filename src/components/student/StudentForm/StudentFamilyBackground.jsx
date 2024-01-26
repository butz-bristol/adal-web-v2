import { useDispatch, useSelector } from 'react-redux';

import { Divider, Grid, TextField, Typography } from '@mui/material';

import { setStudent } from 'src/features/studentFeatures/studentSlice';

const StudentFamilyBackground = () => {
  const dispatch = useDispatch();
  const { studentData } = useSelector((state) => state.students);

  const handleChange = (e) => {
    dispatch(setStudent({ ...studentData, [e.target.name]: e.target.value }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Divider textAlign="left">
              <Typography textTransform="uppercase">
                Father's Information
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              name="student_father_name"
              onChange={handleChange}
              value={studentData.student_father_name || ''}
              label="Father's name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_father_contact_number"
              onChange={handleChange}
              value={studentData.student_father_contact_number || ''}
              label="Contact Number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="student_father_email_address"
              onChange={handleChange}
              value={studentData.student_father_email_address || ''}
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_father_occupation"
              onChange={handleChange}
              value={studentData.student_father_occupation || ''}
              label="Occupation"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider textAlign="left">
              <Typography textTransform="uppercase">
                Mother's Information
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_mother_name"
              onChange={handleChange}
              value={studentData.student_mother_name || ''}
              label="Mother's name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_mother_contact_number"
              onChange={handleChange}
              value={studentData.student_mother_contact_number || ''}
              label="Contact Number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="student_mother_email_address"
              onChange={handleChange}
              value={studentData.student_mother_email_address || ''}
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_mother_occupation"
              onChange={handleChange}
              value={studentData.student_mother_occupation || ''}
              label="Occupation"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider textAlign="left">
              <Typography textTransform="uppercase">
                Guardian's Information
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_guardian_name"
              onChange={handleChange}
              value={studentData.student_guardian_name || ''}
              label="Guardian's name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_guardian_contact_number"
              onChange={handleChange}
              value={studentData.student_guardian_contact_number || ''}
              label="Contact Number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="student_guardian_email_address"
              onChange={handleChange}
              value={studentData.student_guardian_email_address || ''}
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="student_guardian_occupation"
              onChange={handleChange}
              value={studentData.student_guardian_occupation || ''}
              label="Occupation"
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentFamilyBackground;
