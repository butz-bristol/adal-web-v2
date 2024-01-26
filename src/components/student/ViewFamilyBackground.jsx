import { useDispatch, useSelector } from 'react-redux';

import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import {
  IconBriefcase,
  IconEdit,
  IconFriends,
  IconMan,
  IconPhone,
  IconWoman,
} from '@tabler/icons-react';

import {
  setStudent,
  toggleFamilyBackgroundModal,
} from 'src/features/admissionsFeatures/admissionsSlice';

const FamilyBackground = () => {
  const dispatch = useDispatch();

  const {
    studentProfile: {
      _id,
      student_father_name,
      student_father_contact_number,
      student_father_occupation,
      student_mother_name,
      student_mother_contact_number,
      student_mother_occupation,
      student_guardian_name,
      student_guardian_contact_number,
      student_guardian_occupation,
    },
  } = useSelector((state) => state.admissions);

  const handleOpen = () => {
    dispatch(toggleFamilyBackgroundModal());
    dispatch(
      setStudent({
        id: _id,
        student_father_name,
        student_father_contact_number,
        student_father_occupation,
        student_mother_name,
        student_mother_contact_number,
        student_mother_occupation,
        student_guardian_name,
        student_guardian_contact_number,
        student_guardian_occupation,
      })
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h3">Family and Relationships</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Edit">
              <IconButton color="secondary" onClick={handleOpen}>
                <IconEdit />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="secondary">
              Father's Information
            </Typography>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconMan />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" color="inherit">
                {student_father_name
                  ? student_father_name
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Father's Name
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_father_contact_number
                  ? student_father_contact_number
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Contact
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_father_occupation
                  ? student_father_occupation
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Occupation
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="secondary">
              Mother's Information
            </Typography>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconWoman />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" color="inherit">
                {student_mother_name
                  ? student_mother_name
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Mother's Name
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_mother_contact_number
                  ? student_mother_contact_number
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Contact
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_mother_occupation
                  ? student_mother_occupation
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Occupation
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="secondary">
              Guardian's Information
            </Typography>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconFriends />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" color="inherit">
                {student_guardian_name
                  ? student_guardian_name
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Guardian's Name
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_guardian_contact_number
                  ? student_guardian_contact_number
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Contact
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm alignItems="center" spacing={2}>
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1" color="inherit">
                {student_guardian_occupation
                  ? student_guardian_occupation
                  : 'No Data Available'}
              </Typography>
              <Typography textTransform="capitalize" variant="caption">
                Occupation
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FamilyBackground;
