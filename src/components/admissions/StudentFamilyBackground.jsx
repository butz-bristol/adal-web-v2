import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconEdit } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@emotion/react';
import {
  setStudent,
  toggleFamilyBackgroundModal,
} from 'src/features/admissionsFeatures/admissionsSlice';

const StudentFamilyBackground = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    studentProfile,
    studentProfile: {
      _id,
      student_father_name,
      student_father_contact_number,
      student_father_email_address,
      student_father_occupation,
      student_mother_name,
      student_mother_contact_number,
      student_mother_email_address,
      student_mother_occupation,
      student_guardian_name,
      student_guardian_contact_number,
      student_guardian_email_address,
      student_guardian_occupation,
    },
  } = useSelector((state) => state.admissions);

  const father = {
    name: studentProfile.student_father_name,
    role: 'Father',
    contact: studentProfile.student_father_contact_number,
    email: studentProfile.student_father_email_address,
    occupation: studentProfile.student_father_occupation,
  };

  const mother = {
    name: studentProfile.student_mother_name,
    role: 'Mother',
    contact: studentProfile.student_mother_contact_number,
    email: studentProfile.student_mother_email_address,
    occupation: studentProfile.student_mother_occupation,
  };

  const guardian = {
    name: studentProfile.student_guardian_name,
    role: 'Guardian',
    contact: studentProfile.student_guardian_contact_number,
    email: studentProfile.student_guardian_email_address,
    occupation: studentProfile.student_guardian_occupation,
  };

  const mergedData = [father, mother, guardian];

  const handleOpen = () => {
    dispatch(toggleFamilyBackgroundModal());
    dispatch(
      setStudent({
        _id,
        student_father_name,
        student_father_contact_number,
        student_father_email_address,
        student_father_occupation,
        student_mother_name,
        student_mother_contact_number,
        student_mother_email_address,
        student_mother_occupation,
        student_guardian_name,
        student_guardian_contact_number,
        student_guardian_email_address,
        student_guardian_occupation,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Typography variant="h4">Family and Relationships</Typography>
            <Tooltip title="Edit">
              <IconButton color="secondary" onClick={handleOpen}>
                <IconEdit />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid container spacing={2}>
            {mergedData.map((data, index) => (
              <Grid key={index} item xs>
                <Card
                  sx={{
                    p: 2,
                    background:
                      theme.palette.mode === 'dark'
                        ? theme.palette.dark.main
                        : theme.palette.grey[100],
                    border:
                      theme.palette.mode === 'dark'
                        ? '1px solid transparent'
                        : `1px solid${theme.palette.grey[100]}`,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h3" component="div">
                        {data.name ? data.name : 'No Data Available'}
                      </Typography>
                      <Typography variant="caption">{data.role}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption">Email</Typography>
                      <Typography variant="h6">
                        {data.email ? data.email : 'No Data Available'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption">Phone</Typography>
                          <Typography variant="h6">
                            {data.contact ? data.contact : 'No Data Available'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption">Occupation</Typography>
                          <Typography variant="h6">
                            {data.occupation
                              ? data.occupation
                              : 'No Data Available'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default StudentFamilyBackground;
