import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconEdit,
  IconFile,
  IconFileAnalytics,
  IconNotebook,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import User1 from 'src/assets/images/users/user-logo.png';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import { TabPanel } from 'src/components/OtherComponents';
import RequiredDocuments from 'src/components/admissions/RequiredDocuments';
import EditStudentProfile from 'src/components/student/EditStudentProfile';
import StudentInformation from 'src/components/student/StudentInformation';
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
import { getK12StudentEnrollmentLoad } from 'src/features/registrarFeatures/registrarSlice';
import {
  setStudent,
  toggleStudentData,
} from 'src/features/studentFeatures/studentSlice';
import { departmentWithPrograms, tabProps } from 'src/utils/helperFunctions';
import StudentLedger from './StudentLedger';
import StudentPromissoryNote from './StudentPromissoryNote';

const StudentProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { activeAcademicYear } = useSelector((state) => state.registrar);
  const [value, setValue] = useState(0);
  const {
    isFetchingStudentProfile,
    isUpdatingStudent,
    studentProfile: {
      _id,
      student_type,
      student_department,
      student_college_track,
      student_program,
      student_yearlevel,
      section,
      student_esc_grant_status,
      student_shs_voucher_status,
      student_pwd_status,
      student_returnee_status,
      student_number,
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
      student_same_address,
      student_present_address,
      region,
      province,
      municipality,
      barangay,
      student_registration_status,
      student_admissions_status,
      student_deficiency_status,
      student_enrollment_status,
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
      withPendingRequirements,
      createdAt,
    },
  } = useSelector((state) => state.students);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    dispatch(toggleStudentData());
    dispatch(
      setStudent({
        _id,
        student_type,
        student_department,
        student_college_track,
        student_program,
        student_yearlevel,
        student_esc_grant_status,
        student_shs_voucher_status,
        student_returnee_status,
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
      })
    );
  };

  const getStudentRecords = (id) => {
    dispatch(fetchStudentLedger(id));
    dispatch(fetchStudentReportCard(id));
    dispatch(fetchStudentBirthCertificate(id));
    dispatch(fetchStudentMarriageCertificate(id));
    dispatch(fetchStudentTranscriptOfRecords(id));
    dispatch(fetchStudentTransferCredential(id));
    dispatch(fetchStudentGoodMoralCertificate(id));
    dispatch(fetchPWDDocument(id));
    dispatch(
      getK12StudentEnrollmentLoad({
        student_id: id,
        academic_year: activeAcademicYear?._id,
      })
    );
  };

  useEffect(() => {
    getStudentRecords(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <EditStudentProfile />
      {isFetchingStudentProfile ? (
        <LoadingData />
      ) : (
        <>
          {isUpdatingStudent ? (
            <LoadingScreen />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderTop: 10,
                    borderTopColor: theme.palette.secondary.main,
                  }}
                >
                  <CardContent>
                    <Grid
                      container
                      sx={{
                        justifyContent: { xs: 'center', md: 'space-between' },
                        [theme.breakpoints.down('md')]: { textAlign: 'center' },
                      }}
                      spacing={2}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{
                          justifyContent: { xs: 'center', md: 'flex-start' },
                          alignItems: { md: 'center' },
                          [theme.breakpoints.down('xs')]: {
                            textAlign: 'center',
                          },
                        }}
                        spacing={2}
                      >
                        <Grid item xs={12} md="auto">
                          <Avatar
                            alt="User 1"
                            src={User1}
                            sx={{
                              width: { xs: 140, sm: 140, md: 140 },
                              height: { xs: 140, sm: 140, md: 140 },
                              border: '1px solid',
                              color: 'gray',
                              margin: '0 auto 0',
                            }}
                          />
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          md={10}
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} md="auto" p={1}>
                            <Typography variant="h2">
                              {student_first_name +
                                ' ' +
                                (student_middle_name ?? '') +
                                ' ' +
                                student_last_name}
                            </Typography>
                            <Typography variant="subtitle1" color="secondary">
                              {student_number}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              textTransform="uppercase"
                            >
                              {departmentWithPrograms.includes(
                                student_department?.department_name
                              )
                                ? student_program?.program_name
                                : student_department?.department_name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              textTransform="uppercase"
                              mb={1}
                            >
                              {student_yearlevel?.year_level_name}{' '}
                              {section ? ' - ' + section?.section_name : ''}
                            </Typography>
                            <Grid
                              container
                              sx={{
                                justifyContent: {
                                  xs: 'center',
                                  md: 'flex-start',
                                },
                              }}
                              spacing={2}
                            >
                              <Grid item>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<IconEdit />}
                                  onClick={handleOpen}
                                  color="secondary"
                                >
                                  Edit Profile
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            xs={12}
                            md="auto"
                            lg={4}
                            spacing={1}
                          >
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                {student_registration_status === 'registered'
                                  ? 'Enrollment Status: '
                                  : 'Admission Status: '}
                              </Typography>
                              <Typography variant="overline" color="secondary">
                                {student_registration_status === 'registered'
                                  ? student_enrollment_status
                                  : student_admissions_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                Registrar Status:{' '}
                              </Typography>
                              <Typography variant="overline" color="secondary">
                                {student_registration_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                Deficiency Status:{' '}
                              </Typography>
                              <Typography variant="overline" color="secondary">
                                {student_deficiency_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                Created At:{' '}
                              </Typography>
                              <Typography variant="overline" color="secondary">
                                {DateTime.fromISO(createdAt).toFormat(
                                  'LLLL dd, yyyy HH:mm'
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
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
                      iconPosition="start"
                      label="Profile"
                      {...tabProps(0)}
                    />
                    <Tab
                      component={Link}
                      to="#"
                      icon={<IconFile />}
                      iconPosition="start"
                      label="Documents"
                      {...tabProps(1)}
                    />
                    <Tab
                      component={Link}
                      to="#"
                      icon={<IconFileAnalytics />}
                      iconPosition="start"
                      label="Student Ledger"
                      {...tabProps(2)}
                    />
                    <Tab
                      component={Link}
                      to="#"
                      icon={<IconNotebook />}
                      iconPosition="start"
                      label="Promissory Notes"
                      {...tabProps(3)}
                    />
                    <Tab
                      component={Link}
                      to="#"
                      icon={<IconSettings />}
                      iconPosition="start"
                      label="Settings"
                      {...tabProps(4)}
                    />
                  </Tabs>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                  <Stack component={Paper} p={3}>
                    <StudentInformation />
                  </Stack>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Stack component={Paper}>
                    <RequiredDocuments
                      student_type={student_type}
                      student_department={student_department?.department_name}
                      isPWDStudent={student_pwd_status}
                      isAdmissionsAdmin={false}
                      withPendingRequirements={withPendingRequirements}
                      student_id={_id}
                      isApplicant={true}
                    />
                  </Stack>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <StudentLedger />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <StudentPromissoryNote />
                </TabPanel>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Stack>
  );
};

export default StudentProfile;
