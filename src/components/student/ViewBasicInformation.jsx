import { useDispatch, useSelector } from 'react-redux';

import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import {
  IconCalendar,
  IconEdit,
  IconFlag,
  IconGenderFemale,
  IconGenderMale,
  IconHeart,
  IconHome,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';

import {
  setStudent,
  toggleStudentProfile,
} from 'src/features/admissionsFeatures/admissionsSlice';

const BasicInformation = () => {
  const dispatch = useDispatch();
  const {
    studentProfile: {
      _id,
      student_first_name,
      student_middle_name,
      student_last_name,
      student_gender,
      student_nationality,
      student_birthdate,
      student_contact_number,
      student_personal_email,
      student_permanent_address,
      student_civil_status,
    },
  } = useSelector((state) => state.admissions);

  const handleOpen = () => {
    dispatch(toggleStudentProfile());
    dispatch(
      setStudent({
        id: _id,
        student_first_name,
        student_middle_name,
        student_last_name,
        student_gender,
        student_nationality,
        student_birthdate,
        student_contact_number,
        student_personal_email,
        student_permanent_address,
        student_civil_status,
      })
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h3">Overview</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Edit">
              <IconButton color="secondary" onClick={handleOpen}>
                <IconEdit />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconUser />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_first_name} {student_middle_name} {student_last_name}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Full name
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            {student_gender === 'Male' ? (
              <IconGenderMale />
            ) : (
              <IconGenderFemale />
            )}
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_gender}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Gender
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconFlag />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_nationality}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Nationality
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconCalendar />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {new Date(student_birthdate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Birth Date
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconPhone />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_contact_number}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Contact
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconMail />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_personal_email}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Email
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconHome />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_permanent_address}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Address
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconHeart />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_civil_status}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Civil Status
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BasicInformation;
