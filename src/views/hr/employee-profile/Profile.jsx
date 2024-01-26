import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import AddEducationProfile from 'src/components/hr/employees/AddEducationProfile';
import AddFamilyBackground from 'src/components/hr/employees/AddFamilyBackground';
import AddHealthBackground from 'src/components/hr/employees/AddHealthBackground';
import AddLicenseAndCertification from 'src/components/hr/employees/AddLicenseAndCertification';
import EducationProfile from 'src/components/hr/employees/EducationProfile';
import LicenseAndCertification from 'src/components/hr/employees/LicenseAndCertification';
import {
  setFamilyBackground,
  setHealthBackground,
  toggleAddEducationProfileModal,
  toggleAddFamilyBackgroundModal,
  toggleAddHealthBackgroundModal,
  toggleAddLicenseAndCertificationModal,
  toggleEditFamilyBackgroundModal,
  toggleEditHealthBackgroundModal,
} from 'src/features/users/userSlice';
import { formatSalary } from 'src/utils/helperFunctions';

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    employee_profile,
    family_backgrounds,
    education_profiles,
    license_and_certifications,
    health_backgrounds,
  } = useSelector((state) => state.users);

  const {
    personal_email,
    nationality,
    civil_status,
    religion,
    skills_and_competencies,
    address,
  } = employee_profile;
  const userFamily = family_backgrounds?.find(
    (family) => family.userId === employee_profile._id
  );
  const userEducations = education_profiles?.filter(
    (education) => education.userId === employee_profile._id
  );
  const userLicenses = license_and_certifications?.filter(
    (license) => license.userId === employee_profile._id
  );
  const userHealth = health_backgrounds?.find(
    (health) => health.userId === employee_profile._id
  );

  function rowData(field, data) {
    return { field, data };
  }

  // ** Family Background **

  const personal = [
    rowData('Personal Email', personal_email || 'N/A'),
    rowData('Nationality', nationality || 'N/A'),
    rowData('Civil Status', civil_status || 'N/A'),
    rowData('Religion', religion || 'N/A'),
    rowData('Address', address || 'N/A'),
    rowData('Skills and Competencies', skills_and_competencies || 'N/A'),
  ];

  const father = [
    rowData('Father', userFamily?.father_name || 'N/A'),
    rowData(
      'Father`s Birthdate',
      (userFamily &&
        DateTime.fromISO(userFamily.father_birth_date).toFormat(
          'yyyy-MM-dd'
        )) ||
        'N/A'
    ),
    rowData('Father`s Address', userFamily?.father_address || 'N/A'),
    rowData('Father`s Phone', userFamily?.father_phone || 'N/A'),
    rowData('Father`s Occupation', userFamily?.father_occupation || 'N/A'),
  ];

  const mother = [
    rowData('Mother', userFamily?.mother_name || 'N/A'),
    rowData(
      'Mother`s Birthdate',
      (userFamily &&
        DateTime.fromISO(userFamily.mother_birth_date).toFormat(
          'yyyy-MM-dd'
        )) ||
        'N/A'
    ),
    rowData('Mother`s Address', userFamily?.mother_address || 'N/A'),
    rowData('Mother`s Phone', userFamily?.mother_phone || 'N/A'),
    rowData('Mother`s Occupation', userFamily?.mother_occupation || 'N/A'),
  ];

  const spouse = [
    rowData('Spouse', userFamily?.spouse_name || 'N/A'),
    rowData(
      'Spouse`s Birthdate',
      (userFamily &&
        DateTime.fromISO(userFamily.spouse_birth_date).toFormat(
          'yyyy-MM-dd'
        )) ||
        'N/A'
    ),
    rowData('Spouse`s Address', userFamily?.spouse_address || 'N/A'),
    rowData('Spouse`s Phone', userFamily?.spouse_phone || 'N/A'),
    rowData('Spouse`s Occupation', userFamily?.spouse_occupation || 'N/A'),
  ];

  // ** Health Background **

  const health = [
    rowData('Existing Illness', userHealth?.existing_illness || 'N/A'),
    rowData('Previous Illness', userHealth?.previous_illness || 'N/A'),
    rowData('Allergies', userHealth?.allergies || 'N/A'),
    rowData('Hospitalizations', userHealth?.hospitalizations || 'N/A'),
    rowData('Smoking', userHealth?.smoking || 'N/A'),
    rowData('Alcohol', userHealth?.alcohol || 'N/A'),
  ];

  // ** Education Background **

  return (
    <Grid container>
      <Grid item lg={6} xs={12} sx={{ p: 0 }}>
        <Typography variant="title1">Personal Information</Typography>
        <List>
          {personal.map((row, index) => (
            <ListItem key={index}>
              <ListItemText secondary={row.data}>{row.field}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>

      {/* Family Background */}

      <Grid container>
        <Grid item xs={12} mb={1}>
          <AddFamilyBackground />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="title1">Family Background</Typography>
            {!userFamily ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => dispatch(toggleAddFamilyBackgroundModal())}
                sx={{ minWidth: 0, p: '0.1rem' }}
              >
                <IconPlus />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  dispatch(toggleEditFamilyBackgroundModal());
                  dispatch(setFamilyBackground(userFamily));
                }}
                size="small"
                sx={{ minWidth: 0, p: '0.1rem' }}
              >
                <IconPencil />
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <List>
            {father.map((row, index) => (
              <ListItem key={index}>
                <ListItemText secondary={row.data}>{row.field}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <List>
            {mother.map((row, index) => (
              <ListItem key={index}>
                <ListItemText secondary={row.data}>{row.field}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <List>
            {spouse.map((row, index) => (
              <ListItem key={index}>
                <ListItemText secondary={row.data}>{row.field}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        {userFamily?.children?.length > 0 && (
          <Grid item xs={12} md={6} sx={{ p: 0 }}>
            <List>
              {userFamily.children.map((child, index) => (
                <ListItem key={index}>
                  <ListItemText
                    secondary={`${child.child_name} - 
                    ${DateTime.fromISO(child.child_birth_date).toFormat(
                      'yyyy-MM-dd'
                    )}`}
                  >
                    {`Child ${index + 1}`}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}

        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <List>
            <ListItem>
              <ListItemText
                secondary={
                  (userFamily &&
                    formatSalary(userFamily?.household_gross_income)) ||
                  'N/A'
                }
              >
                Household Gross Income
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>

      {/* Health Background */}

      <Grid container>
        <Grid item xs={12} mb={1}>
          <AddHealthBackground />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="title1">Health Background</Typography>
            {!userHealth ? (
              <Button
                variant="contained"
                onClick={() => dispatch(toggleAddHealthBackgroundModal())}
                size="small"
                sx={{ minWidth: 0, p: '0.1rem' }}
              >
                <IconPlus />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(toggleEditHealthBackgroundModal());
                  dispatch(setHealthBackground(userHealth));
                }}
                color="warning"
                size="small"
                sx={{ minWidth: 0, p: '0.1rem' }}
              >
                <IconPencil />
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <List>
            {health.map((row, index) => (
              <ListItem key={index}>
                <ListItemText secondary={row.data}>{row.field}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>

      {/* Education Background */}

      <Grid container>
        <Grid item xs={12} mb={1}>
          <AddEducationProfile />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="title1">Education Background</Typography>

            <Button
              variant="contained"
              onClick={() => dispatch(toggleAddEducationProfileModal())}
              size="small"
              sx={{ minWidth: 0, p: '0.1rem' }}
            >
              <IconPlus />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {userEducations.length > 0 &&
            userEducations.map((education) => (
              <EducationProfile key={education._id} {...education} />
            ))}
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>

      {/* License and Certifications */}

      <Grid container>
        <Grid item xs={12} mb={1}>
          <AddLicenseAndCertification />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="title1">License and Certifications</Typography>

            <Button
              variant="contained"
              onClick={() => dispatch(toggleAddLicenseAndCertificationModal())}
              size="small"
              sx={{ minWidth: 0, p: '0.1rem' }}
            >
              <IconPlus />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {userLicenses.length > 0 &&
            userLicenses.map((license) => (
              <LicenseAndCertification key={license._id} {...license} />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
