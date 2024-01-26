import {
  Avatar,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconFile, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getStudent } from 'src/features/admissionsFeatures/admissionsSlice';
import {
  fetchPWDDocument,
  fetchStudentBirthCertificate,
  fetchStudentGoodMoralCertificate,
  fetchStudentMarriageCertificate,
  fetchStudentReportCard,
  fetchStudentTranscriptOfRecords,
  fetchStudentTransferCredential,
} from 'src/features/fileUploadFeatures/fileUploadSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';

import LinkComponent from 'src/components/LinkComponent';

import User1 from 'src/assets/images/users/user-logo.png';
import LoadingData from 'src/components/LoadingData';
import RequiredDocuments from './RequiredDocuments';
import EducationalInformation from './StudentEducationalInformation';
import FamilyBackground from './StudentFamilyBackground';
import PersonalInformation from './StudentInformation';

import LoadingScreen from 'src/components/LoadingScreen';
import EditFamilyBackgroundModal from 'src/components/admissions/EditStudentFamilyBackground';
import EditBasicInformationModal from 'src/components/admissions/EditStudentProfile';

import { TabPanel } from 'src/components/OtherComponents';
import { tabProps } from 'src/utils/helperFunctions';

const PendingApplicant = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const {
    studentProfile: {
      student_type,
      student_first_name,
      student_last_name,
      student_department,
      student_admissions_status,
      student_pwd_status,
    },
    isFetchingStudent,
    isUpdatingStudent,
  } = useSelector((state) => state.admissions);
  const { user } = useSelector((state) => state.user);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());

    if (!id) return;
    dispatch(getStudent(id));
    dispatch(fetchStudentReportCard(id));
    dispatch(fetchStudentBirthCertificate(id));
    dispatch(fetchStudentMarriageCertificate(id));
    dispatch(fetchStudentTranscriptOfRecords(id));
    dispatch(fetchStudentTransferCredential(id));
    dispatch(fetchStudentGoodMoralCertificate(id));
    dispatch(fetchPWDDocument(id));
  }, [dispatch, id]);

  return (
    <>
      <LinkComponent to={'/admissions/applicants'}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Go Back
        </Button>
      </LinkComponent>
      <EditBasicInformationModal />
      <EditFamilyBackgroundModal />
      <Stack>
        {isFetchingStudent ? (
          <LoadingData />
        ) : (
          <>
            {isUpdatingStudent ? (
              <LoadingScreen />
            ) : (
              <Card>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                      borderRight: '1px solid',
                      [theme.breakpoints.only('xs')]: {
                        borderLeft: 0,
                        borderBottom: '1px solid',
                        borderColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : theme.palette.grey[200],
                      },
                      borderColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.background.default
                          : theme.palette.grey[200],
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        p: 2,
                        paddingBottom: '0px !important',
                        [theme.breakpoints.down('xl')]: {
                          textAlign: 'center',
                        },
                      }}
                    >
                      <Grid item xs={12} lg={12} xl={5}>
                        <Avatar
                          alt="User 1"
                          src={User1}
                          sx={{
                            border: '1px solid',
                            color: 'gray',
                            margin: '0 auto 0',
                            width: { xs: 140, sm: 80, md: 110 },
                            height: { xs: 140, sm: 80, md: 110 },
                          }}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        lg={12}
                        xl={7}
                        alignItems="center"
                      >
                        <Grid item xs>
                          <Typography variant="h3" sx={{ py: 1 }}>
                            {student_first_name} {student_last_name}
                          </Typography>
                          <Chip
                            size="small"
                            label={student_type}
                            color="secondary"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ p: 2 }}>
                      <EducationalInformation />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <Tabs
                      value={value}
                      indicatorColor="secondary"
                      textColor="secondary"
                      onChange={handleChange}
                      variant="scrollable"
                      sx={{
                        '& a': {
                          minHeight: 'auto',
                          minWidth: 10,
                          py: 1.5,
                          px: 1,
                          mr: 2.25,
                          color: theme.palette.grey[600],
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        '& a.Mui-selected': {
                          color: theme.palette.secondary.main,
                        },
                        '& .MuiTabs-indicator': {
                          bottom: 2,
                        },
                        '& a > svg': {
                          marginBottom: '0px !important',
                          mr: 1.25,
                        },
                      }}
                    >
                      <Tab
                        component={Link}
                        to="#"
                        icon={<IconUser />}
                        label="My Profile"
                        {...tabProps(0)}
                      />
                      <Tab
                        component={Link}
                        to="#"
                        icon={<IconFile />}
                        label="My Documents"
                        {...tabProps(1)}
                      />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <PersonalInformation />
                      <FamilyBackground />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <RequiredDocuments
                        student_type={student_type}
                        student_department={student_department?.department_name}
                        isPWDStudent={
                          student_pwd_status === 'Yes' ? true : false
                        }
                        isAdmissionsAdmin={
                          user?.user_role === 'admissions admin'
                        }
                        isApplicant={true}
                      />
                    </TabPanel>
                  </Grid>
                </Grid>
              </Card>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default PendingApplicant;
