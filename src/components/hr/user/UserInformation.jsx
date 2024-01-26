import { useSelector } from 'react-redux';

import { Grid, Typography, Divider } from '@mui/material';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconFlag,
  IconGenderAgender,
  IconGenderFemale,
  IconGenderMale,
  IconHeart,
  IconHome,
  IconHomeCheck,
  IconHomeCog,
  IconId,
  IconMail,
  IconPhone,
  IconUser,
  IconWheelchair
} from '@tabler/icons-react';

const UserInformation = () => {
  const {
    userProfile: {
      _id,
      first_name,
      middle_name,
      last_name,
      gender,
      nationality,
      birthdate,
      phone,
      personal_email,
      email,
      permanent_address,
      civil_status,
      sexual_orientation,
      pwd_status,
      same_address,
      present_address,
      region,
      province,
      municipality,
      barangay
    }
  } = useSelector((state) => state.academics);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">Personal Information</Typography>
        </Divider>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconId />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {last_name}, {first_name} {middle_name}
          </Typography>
          <Typography variant="overline">Name</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconHeart />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{civil_status}</Typography>
          <Typography variant="overline">Civil Status</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>{gender === 'Male' ? <IconGenderMale /> : <IconGenderFemale />}</Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{gender}</Typography>
          <Typography variant="overline">Gender</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconFlag />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{nationality}</Typography>
          <Typography variant="overline">Nationality</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconCalendar />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {new Date(birthdate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </Typography>
          <Typography variant="overline">Birth Date</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">Contact Information</Typography>
        </Divider>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconPhone />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{phone ? phone : 'Unavailable'}</Typography>
          <Typography variant="overline">Phone</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconMail />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{personal_email ? personal_email : 'Unavailable'}</Typography>
          <Typography variant="overline">Personal Email</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconMail />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{email}</Typography>
          <Typography variant="overline">Email</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconHomeCog />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{region ? region?.name : 'No Region'}</Typography>
          <Typography variant="overline">{province ? province?.name : 'No Province'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconBuilding />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{municipality ? municipality?.name : 'No Municipality/City'}</Typography>
          <Typography variant="overline">{barangay ? barangay?.name : 'No Barangay'}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems="center" spacing={2}>
        <Grid item>
          <IconHome />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{present_address ? present_address : 'No Present Address'}</Typography>
          <Typography variant="overline">Present Address</Typography>
        </Grid>
      </Grid>
      {same_address === false && (
        <Grid container item xs={12} alignItems="center" spacing={2}>
          <Grid item>
            <IconHomeCheck />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1">{permanent_address ? permanent_address : 'No Permanent Address'}</Typography>
            <Typography variant="overline">Permanent Address</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserInformation;
