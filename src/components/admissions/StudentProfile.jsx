import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconBan,
  IconCircleCheck,
  IconEdit,
  IconFile,
  IconFileAnalytics,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import User1 from 'src/assets/images/users/user-logo.png';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import StudentLoad from 'src/components/academics/StudentLoad';
import AdmissionsActions from 'src/components/admissions/AdmissionsActions';
import EditStudentProfile from 'src/components/admissions/EditStudentProfile';
import RequiredDocuments from 'src/components/admissions/RequiredDocuments';
import StudentInformation from 'src/components/admissions/StudentInformation';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  getAllPrograms,
  getAllStudentRecordsByStudentId,
} from 'src/features/academicFeatures/academicSlice';
import {
  getStudent,
  setStudent,
  toggleStudentProfile,
} from 'src/features/admissionsFeatures/admissionsSlice';
import createStudentLedger from 'src/features/cashierFeatures/cashierSlice';
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
import {
  approveStudentRegistration,
  conditionalStudentRegistration,
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
  getK12StudentEnrollmentLoad,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { departmentWithPrograms, tabProps } from 'src/utils/helperFunctions';

import { TabPanel } from 'src/components/OtherComponents';

const StudentProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    user: { user_role },
  } = useSelector((state) => state.users);
  const customization = useSelector((state) => state.customization);

  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [acceptanceModal, setAcceptanceModal] = useState(false);
  const [conditionalAcceptanceModal, setConditionalAcceptanceModal] =
    useState(false);
  const isPending = ['pending', 'eligible for exam', 'eligible for interview'];
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
      student_learners_reference_no,
      student_esc_grantee,
      withPendingRequirements,
    },
  } = useSelector((state) => state.admissions);
  const {
    activeAcademicYear,
    isApprovingRegistration,
    isRejectingRegistration,
  } = useSelector((state) => state.registrar);
  const { isCreatingGrade, isUpdatingGrade } = useSelector(
    (state) => state.academics
  );
  const navigate = useNavigate();
  let isApplicant = true;

  if (user_role === 'admissions admin' || user_role === 'registrar admin') {
    isApplicant = false;
  }

  const handleApproveStudentRegistration = () => {
    dispatch(approveStudentRegistration(_id))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(getStudent(id));
          dispatch(
            createStudentLedger({
              student: _id,
              academic_year: activeAcademicYear?._id,
              ledger_balance: 0,
              payments: [],
            })
          );
        }
      })
      .catch((error) => {
        console.error(
          'Error occurred during approveStudentRegistration:',
          error.message
        );
      });
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    dispatch(toggleStudentProfile());
    dispatch(
      setStudent({
        _id,
        student_number,
        student_learners_reference_no,
        student_esc_grantee,
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
    dispatch(getStudent(id));
    dispatch(fetchStudentLedger(id));
    dispatch(fetchStudentReportCard(id));
    dispatch(fetchStudentBirthCertificate(id));
    dispatch(fetchStudentMarriageCertificate(id));
    dispatch(fetchStudentTranscriptOfRecords(id));
    dispatch(fetchStudentTransferCredential(id));
    dispatch(fetchStudentGoodMoralCertificate(id));
    dispatch(fetchPWDDocument(id));
    dispatch(getAllStudentRecordsByStudentId(id));
    dispatch(
      getK12StudentEnrollmentLoad({
        student_id: id,
        academic_year: activeAcademicYear?._id,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getAllAcademicYears());
    if (user_role === 'registrar admin' || user_role === 'admissions admin') {
      dispatch(getAllDepartments());
      dispatch(getAllCollegeTracks());
      dispatch(getAllPrograms());
      dispatch(getAllYearLevels());
    }

    if (!id && !activeAcademicYear) return;
    getStudentRecords(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, user_role]);

  return (
    <Stack>
      <EditStudentProfile />

      {/* Confirmation modals */}

      <ConfirmationModal
        isOpen={acceptanceModal}
        title="Accept Student Registration"
        message="Are you sure you want to process student registration?"
        onCancel={() => setAcceptanceModal(false)}
        onConfirm={() => {
          handleApproveStudentRegistration();
          setAcceptanceModal(false);
        }}
      />
      <ConfirmationModal
        isOpen={conditionalAcceptanceModal}
        title="Accept Student Registration"
        message="Are you sure you want to process student registration with pending requirements?"
        onConfirm={() => {
          dispatch(
            conditionalStudentRegistration({
              id: _id,
              withPendingRequirements: true,
            })
          ).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(getStudent(id));
            }
          });
          setConditionalAcceptanceModal(false);
        }}
        onCancel={() => setConditionalAcceptanceModal(false)}
      />

      {/* End of confirmation modals */}

      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowCircleLeftIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {student_registration_status === 'eligible for registration' &&
          user_role === 'registrar admin' && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip title="Accept Student Registration">
                <Button
                  variant={
                    customization.navType === 'dark' ? 'contained' : 'outlined'
                  }
                  color="secondary"
                  name="approve"
                  startIcon={<IconCircleCheck />}
                  onClick={() => setAcceptanceModal(true)}
                >
                  Accept
                </Button>
              </Tooltip>

              <Tooltip title="Accept With Pending Requirements">
                <Button
                  variant={
                    customization.navType === 'dark' ? 'contained' : 'outlined'
                  }
                  color="primary"
                  startIcon={<IconBan />}
                  name="decline"
                  onClick={() => setConditionalAcceptanceModal(true)}
                >
                  Pending
                </Button>
              </Tooltip>
            </Stack>
          )}
      </Stack>

      {isFetchingStudentProfile ? (
        <LoadingData />
      ) : (
        <>
          {isUpdatingStudent ||
          isApprovingRegistration ||
          isRejectingRegistration ||
          isCreatingGrade ||
          isUpdatingGrade ? (
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
                            <Typography variant="subtitle1">
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
                              {isPending.includes(student_admissions_status) &&
                              user_role === 'admissions admin' ? (
                                <AdmissionsActions />
                              ) : (
                                ''
                              )}
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
                              <Typography variant="overline">
                                {student_registration_status === 'registered'
                                  ? student_enrollment_status
                                  : student_admissions_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                Registration Status:{' '}
                              </Typography>
                              <Typography variant="overline">
                                {student_registration_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">
                                Deficiency Status:{' '}
                              </Typography>
                              <Typography variant="overline">
                                {student_deficiency_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="overline">LRN: </Typography>
                              <Typography variant="overline">
                                {student_learners_reference_no}
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
                    {user_role === 'academics admin' && (
                      <Tab
                        component={Link}
                        to="#"
                        icon={<IconFileAnalytics />}
                        iconPosition="start"
                        label="Grade"
                        {...tabProps(2)}
                      />
                    )}
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
                      isAdmissionsAdmin={user_role === 'admissions admin'}
                      withPendingRequirements={withPendingRequirements}
                      student_id={_id}
                      isApplicant={isApplicant}
                    />
                  </Stack>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <StudentLoad />
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
