import { useDispatch, useSelector } from 'react-redux';

import { Divider, Grid, Typography } from '@mui/material';
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
  IconWheelchair,
} from '@tabler/icons-react';

const StudentInformation = () => {
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
      student_email,
      student_permanent_address,
      student_civil_status,
      student_sexual_orientation,
      student_pwd_status,
      student_same_address,
      student_present_address,
      region,
      province,
      municipality,
      barangay,
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
  } = useSelector((state) => state.students);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">
            Personal Information
          </Typography>
        </Divider>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconId />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {student_last_name}, {student_first_name} {student_middle_name}
          </Typography>
          <Typography variant="overline">Name</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconHeart />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_civil_status}</Typography>
          <Typography variant="overline">Civil Status</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          {student_gender === 'Male' ? (
            <IconGenderMale />
          ) : (
            <IconGenderFemale />
          )}
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_gender}</Typography>
          <Typography variant="overline">Gender</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconGenderAgender />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {student_sexual_orientation}
          </Typography>
          <Typography variant="overline">Sexual Orientation</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconWheelchair />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {student_pwd_status === true ? 'Yes, I am' : "No, I'm not"}
          </Typography>
          <Typography variant="overline">PWD Status</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconFlag />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_nationality}</Typography>
          <Typography variant="overline">Nationality</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} alignItems="center" spacing={2}>
        <Grid item>
          <IconCalendar />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            {new Date(student_birthdate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Typography>
          <Typography variant="overline">Birth Date</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">Contact Information</Typography>
        </Divider>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={student_email ? 4 : 6}
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <IconPhone />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_contact_number}</Typography>
          <Typography variant="overline">Contact</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={student_email ? 4 : 6}
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <IconMail />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_personal_email}</Typography>
          <Typography variant="overline">Personal Email</Typography>
        </Grid>
      </Grid>
      {student_email && (
        <Grid
          container
          item
          xs={12}
          md={student_email ? 4 : 6}
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <IconMail />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1">{student_email}</Typography>
            <Typography variant="overline">Email</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconHomeCog />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{region?.name}</Typography>
          <Typography variant="overline">{province?.name}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} alignItems="center" spacing={2}>
        <Grid item>
          <IconBuilding />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{municipality?.name}</Typography>
          <Typography variant="overline">{barangay?.name}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems="center" spacing={2}>
        <Grid item>
          <IconHome />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">{student_present_address}</Typography>
          <Typography variant="overline">Present Address</Typography>
        </Grid>
      </Grid>
      {student_same_address === false && (
        <Grid container item xs={12} alignItems="center" spacing={2}>
          <Grid item>
            <IconHomeCheck />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1">
              {student_permanent_address}
            </Typography>
            <Typography variant="overline">Permanent Address</Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">
            Family and Relationships
          </Typography>
        </Divider>
      </Grid>
      {student_father_name && (
        <>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconUser />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">{student_father_name}</Typography>
              <Typography variant="overline">Father's Name</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_father_contact_number}
              </Typography>
              <Typography variant="overline">Contact</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconMail />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_father_email_address}
              </Typography>
              <Typography variant="overline">Email</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_father_occupation}
              </Typography>
              <Typography variant="overline">Occupation</Typography>
            </Grid>
          </Grid>
        </>
      )}
      {student_mother_name && (
        <>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconUser />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">{student_mother_name}</Typography>
              <Typography variant="overline">Mother's Name</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_mother_contact_number}
              </Typography>
              <Typography variant="overline">Contact</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconMail />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_mother_email_address}
              </Typography>
              <Typography variant="overline">Email</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_mother_occupation}
              </Typography>
              <Typography variant="overline">Occupation</Typography>
            </Grid>
          </Grid>
        </>
      )}
      {student_guardian_name && (
        <>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconUser />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_guardian_name}
              </Typography>
              <Typography variant="overline">Guardian's Name</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconPhone />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_guardian_contact_number}
              </Typography>
              <Typography variant="overline">Contact</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconMail />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_guardian_email_address}
              </Typography>
              <Typography variant="overline">Email</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <IconBriefcase />
            </Grid>
            <Grid item sm>
              <Typography variant="subtitle1">
                {student_guardian_occupation}
              </Typography>
              <Typography variant="overline">Occupation</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default StudentInformation;
