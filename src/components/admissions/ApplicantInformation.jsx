import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import Person from '@mui/icons-material/Person';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import {
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'src/store/constant';
import SubCard from 'src/ui-component/cards/SubCard';

const ApplicantInformation = () => {
  const {
    studentProfile: {
      student_first_name,
      student_middle_name,
      student_last_name,
      student_personal_email,
      student_contact_number,
      student_permanent_address,
      student_reference_no,
      student_department,
      student_type,
      student_admissions_status,
      student_yearlevel,
      student_program,
      student_college_track,
    },
  } = useSelector((state) => state.admissions);

  return (
    <Grid container spacing={gridSpacing} sx={{ p: 2 }}>
      <Grid item lg={4} xs={12}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Person />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  {`${student_last_name}, ${student_first_name} ${
                    student_middle_name ?? ''
                  }`}
                </Typography>
                <Typography align="left" variant="subtitle2">
                  {student_reference_no}
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label={student_type} color="secondary" />
              </Grid>
            </Grid>
          }
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton>
              <ListItemIcon>
                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Email</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {student_personal_email}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Phone</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {student_contact_number}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Location</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {student_permanent_address}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography
                  align="center"
                  variant="h3"
                  textTransform="capitalize"
                >
                  {student_admissions_status}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  Status
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </SubCard>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title="Education">
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1">
                        {student_yearlevel?.year_level_name ?? 'N/A'}
                      </Typography>
                      <Typography variant="subtitle2">
                        {student_program?.program_name ?? 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="subtitle1">
                        {student_department?.department_name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {student_college_track?.college_track_name ?? 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ApplicantInformation;
