import { Person, Email, Phone, AccountCircle } from '@mui/icons-material';
import WcIcon from '@mui/icons-material/Wc';
import { Grid, Stack, Typography } from '@mui/material';
import { IconCalendarEvent } from '@tabler/icons-react';
import { DateTime } from 'luxon';

const ApplicantProfile = ({ applicant }) => {
  const {
    student_first_name,
    student_last_name,
    student_reference_no,
    student_admissions_status,
    student_personal_email,
    student_contact_number,
    student_date_registered,
    student_gender
  } = applicant;
  return (
    <Stack>
      <Grid container display="flex" justifyContent="center" textAlign="center" sx={{ p: 2 }}>
        <Grid item>
          <AccountCircle sx={{ fontSize: '80px' }} />
          <Typography variant="h2" textTransform="capitalize">
            {student_first_name + ' ' + student_last_name}
          </Typography>
          <Typography variant="body1" textTransform="capitalize">
            Student Applicant
          </Typography>
          <Typography variant="body1" textTransform="capitalize">
            Reference Number: {student_reference_no || 'N/A'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={4} lg={12}>
          <Stack direction={'row'} alignItems="center" spacing={3}>
            <Person />
            <Stack>
              <Typography variant="body1" textTransform="capitalize">
                Admission Status
              </Typography>

              <Typography variant="body1" textTransform="capitalize">
                {student_admissions_status}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} lg={12}>
          <Stack direction={'row'} alignItems="center" spacing={3}>
            <WcIcon />
            <Stack>
              <Typography variant="body1" textTransform="capitalize">
                Gender
              </Typography>

              <Typography variant="body1" textTransform="capitalize">
                {student_gender}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} lg={12}>
          <Stack direction={'row'} alignItems="center" spacing={3}>
            <Email />
            <Stack>
              <Typography variant="body1" textTransform="capitalize">
                Email
              </Typography>

              <Typography variant="body1" sx={{ textTransform: 'lowercase' }} textTransform="capitalize">
                {student_personal_email}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} lg={12}>
          <Stack direction={'row'} alignItems="center" spacing={3}>
            <Phone />
            <Stack>
              <Typography variant="body1" textTransform="capitalize">
                Phone
              </Typography>

              <Typography variant="body1" textTransform="capitalize">
                {student_contact_number}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} lg={12}>
          <Stack direction={'row'} alignItems="center" spacing={3}>
            <IconCalendarEvent />
            <Stack>
              <Typography variant="body1" textTransform="capitalize">
                Application Date
              </Typography>

              <Typography variant="body1" textTransform="capitalize">
                {student_date_registered && DateTime.fromISO(student_date_registered).toFormat('dd LLL yyyy')}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ApplicantProfile;
