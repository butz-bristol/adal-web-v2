import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Card,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import { IconFile, IconUser } from '@tabler/icons-react';

import { getStudent } from 'src/features/admissionsFeatures/admissionsSlice';

import { fetchUserProfile } from 'src/features/users/userSlice';

import {
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

import {
  getAllCollegeSubjects,
  getAllK12Subjects,
  getAllPrograms,
  getAllTesdaCourses,
} from 'src/features/academicFeatures/academicSlice';

import {
  fetchPWDDocument,
  fetchStudentBirthCertificate,
  fetchStudentGoodMoralCertificate,
  fetchStudentLedger,
  fetchStudentMarriageCertificate,
  fetchStudentReportCard,
  fetchStudentTranscriptOfRecords,
  fetchStudentTransferCredential,
} from 'src/features/fileUploadFeatures/fileUploadSlice';

import User1 from 'src/assets/images/users/user-logo.png';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import { TabPanel } from 'src/components/OtherComponents';
import EditStudentFamilyBackground from 'src/components/admissions/EditStudentFamilyBackground';
import EditStudentPersonalInformation from 'src/components/admissions/EditStudentProfile';
import RequiredDocuments from 'src/components/admissions/RequiredDocuments';
import StudentEducationalInformation from 'src/components/admissions/StudentEducationalInformation';
import StudentFamilyBackground from 'src/components/admissions/StudentFamilyBackground';
import StudentPersonalInformation from 'src/components/admissions/StudentInformation';
import { tabProps } from 'src/utils/helperFunctions';

const StudentProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const {
    studentProfile: {
      student_type,
      student_first_name,
      student_last_name,
      student_department,
      student_pwd_status,
    },
    isFetchingStudent,
    isUpdatingStudent,
  } = useSelector((state) => state.admissions);
  const { applicant } = useSelector((state) => state.applicants);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const getStudentRecords = () => {
    dispatch(getStudent(applicant.student_id));
    dispatch(fetchStudentLedger(applicant.student_id));
    dispatch(fetchStudentReportCard(applicant.student_id));
    dispatch(fetchStudentBirthCertificate(applicant.student_id));
    dispatch(fetchStudentMarriageCertificate(applicant.student_id));
    dispatch(fetchStudentTranscriptOfRecords(applicant.student_id));
    dispatch(fetchStudentTransferCredential(applicant.student_id));
    dispatch(fetchStudentGoodMoralCertificate(applicant.student_id));
    dispatch(fetchPWDDocument(applicant.student_id));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllYearLevels());
    dispatch(getAllSemesters());
    dispatch(getAllK12Subjects());
    dispatch(getAllCollegeSubjects());
    dispatch(getAllTesdaCourses());

    if (!applicant.student_id) return;
    getStudentRecords(applicant.student_id);
  }, [dispatch, applicant.student_id]);

  return (
    <>
      <EditStudentPersonalInformation />
      <EditStudentFamilyBackground />
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
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      sx={{
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
                      <Grid item xs={12} lg={12} xl={7} px={1}>
                        <Typography variant="h3" py={1}>
                          {student_first_name} {student_last_name}
                        </Typography>
                        <Chip
                          size="small"
                          label={student_type}
                          color="secondary"
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1 }}>
                      <StudentEducationalInformation />
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
                      <StudentPersonalInformation />
                      <StudentFamilyBackground />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <RequiredDocuments
                        student_type={student_type}
                        student_department={student_department?.department_name}
                        isPWDStudent={student_pwd_status}
                        isApplicant={true}
                        isAdmissionsAdmin={false}
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

export default StudentProfile;
