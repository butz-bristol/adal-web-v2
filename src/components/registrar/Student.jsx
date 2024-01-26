import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconBan,
  IconCircleCheck,
  IconDatabaseEdit,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CollegeAndTESDADocumentRequirements from 'src/components/CollegeAndTESDADocumentRequirements';
import K12DocumentRequirements from 'src/components/K12DocumentRequirements';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import { createStudentLedger } from 'src/features/cashierFeatures/cashierSlice';
import {
  fetchPWDDocument,
  fetchStudentBirthCertificate,
  fetchStudentGoodMoralCertificate,
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
  getStudent,
  setStudentData,
} from 'src/features/registrarFeatures/registrarSlice';
import EditStudentModal from './EditStudentModal';

const Applicant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [acceptanceModal, setAcceptanceModal] = useState(false);
  const [conditionalAcceptanceModal, setConditionalAcceptanceModal] =
    useState(false);

  let url = '';

  const {
    studentProfile,
    isFetchingStudentProfile,
    isApprovingRegistration,
    isRejectingRegistration,
    activeAcademicYear,
  } = useSelector((state) => state.registrar);
  const isRegisteredStudent = location.pathname.startsWith(
    '/registrar/students/'
  );
  const isStudentsWithPendingRequirements = location.pathname.startsWith(
    '/registrar/pending-requirements/'
  );

  if (isRegisteredStudent) {
    url = '/registrar/students';
  } else if (isStudentsWithPendingRequirements) {
    url = '/registrar/pending-requirements';
  } else {
    url = '/registrar/pre-registrations';
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApproveStudentRegistration = () => {
    dispatch(approveStudentRegistration(studentProfile?._id))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(getStudent(id));
          dispatch(
            createStudentLedger({
              student: studentProfile?._id,
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
          error
        );
      });
  };

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
    dispatch(getAllPrograms());
    dispatch(getAllCollegeTracks());
    dispatch(getAllAcademicYears());

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
    <Stack>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isApprovingRegistration || isRejectingRegistration}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack direction="row" justifyContent="space-between">
        <LinkComponent to={url}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowCircleLeftIcon />}
          >
            Back
          </Button>
        </LinkComponent>

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
                id: studentProfile?._id,
                withPendingRequirements: true,
              })
            );
            setConditionalAcceptanceModal(false);
          }}
          onCancel={() => setConditionalAcceptanceModal(false)}
        />

        {studentProfile?.student_admissions_status === 'admitted' &&
          studentProfile.student_registration_status !== 'registered' && (
            <Stack direction="row" spacing={1}>
              <Tooltip title="Accept Student Registration">
                <Button
                  variant="outlined"
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
                  variant="outlined"
                  startIcon={<IconBan />}
                  name="decline"
                  onClick={() => setConditionalAcceptanceModal(true)}
                >
                  Pending Requirements
                </Button>
              </Tooltip>
            </Stack>
          )}

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleOpen();
            dispatch(
              setStudentData({
                ...studentProfile,
                student_id: studentProfile?._id,
                student_department: studentProfile?.student_department?._id,
                student_program: studentProfile?.student_program?._id,
                student_college_track:
                  studentProfile?.student_college_track?._id,
                student_yearlevel: studentProfile?.student_yearlevel?._id,
              })
            );
          }}
          startIcon={<IconDatabaseEdit size={17} />}
        >
          Edit Student
        </Button>
      </Stack>

      <EditStudentModal
        open={open}
        onClose={handleClose}
        studentProfile={studentProfile}
      />

      <Stack mt={3}>
        {isFetchingStudentProfile ? (
          <LoadingData />
        ) : (
          <Card>
            <CardContent>
              {/* Registration Information */}

              <Typography variant="h4" gutterBottom mb={3}>
                {studentProfile?.student_registration_status === 'registered'
                  ? 'Academic Details'
                  : 'Registration Details'}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    {studentProfile?.student_registration_status ===
                    'registered'
                      ? ' Semester Applied For'
                      : 'Semester Applying For'}
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {'2021-2022 1st Semester'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    {studentProfile?.student_registration_status ===
                    'registered'
                      ? 'Applied As'
                      : 'Applying As'}
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_type}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Date Registered
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_registration_date
                      ? DateTime.fromISO(
                          studentProfile?.student_registration_date
                        ).toFormat('MM/dd/yyyy')
                      : 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    {studentProfile?.student_registration_status ===
                    'registered'
                      ? 'Department Applied For'
                      : ' Department Applying For'}
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_department?.department_name}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    College/Track
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_college_track
                      ?.college_track_name ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    {studentProfile?.student_registration_status ===
                    'registered'
                      ? 'Program Applied For'
                      : ' Program Applying For'}
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_program?.program_name || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    {studentProfile?.student_registration_status ===
                    'registered'
                      ? 'Level Applied For'
                      : ' Level Applying For'}
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_yearlevel?.year_level_name}
                  </Typography>
                </Grid>

                {studentProfile?.student_registration_status ===
                  'registered' && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography
                      variant="h5"
                      color="secondary"
                      gutterBottom
                      mb={1}
                    >
                      Student Number
                    </Typography>

                    <Typography variant="h5" color="GrayText">
                      {studentProfile?.student_number}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    ESC Grant Recipient
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_esc_grant_status ? 'Yes' : 'No'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Voucher Recipient
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_esc_grant_status ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 3, mb: 3 }} />

              {/* Basic Information */}

              <Typography variant="h4" gutterBottom mb={3}>
                Student Profile
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    First Name
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_first_name}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Last Name
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_last_name}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Middle Initial
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_middle_name?.charAt(0)}
                    {'.'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Date of Birth
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {DateTime.fromISO(
                      studentProfile?.student_birthdate
                    ).toFormat('MM/dd/yyyy')}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Sex
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_gender}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Email Address
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_personal_email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Contact Number
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_contact_number}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={8}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Address
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_permanent_address}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 3, mb: 3 }} />

              {/* Family Information */}

              <Typography variant="h4" gutterBottom mb={3}>
                Family Background
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Father's Name
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_father_name ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Contact Number
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_father_contact_number ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Profession
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_father_occupation ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Mother's Name
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_mother_name ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Contact Number
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_mother_contact_number ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Profession
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_mother_occupation ?? 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Guardian's Name
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_guardian_name ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Contact Number
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_guardian_contact_number ?? 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    gutterBottom
                    mb={1}
                  >
                    Profession
                  </Typography>

                  <Typography variant="h5" color="GrayText">
                    {studentProfile?.student_guardian_occupation ?? 'N/A'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 3, mb: 3 }} />

              {/* Admission Requirements */}

              <Typography variant="h4" gutterBottom mb={3}>
                Admission Requirements
              </Typography>

              {studentProfile?.student_department?.department_name !==
                'College' &&
              studentProfile?.student_department?.department_name !==
                'Technical Education and Skills Development Authority (TESDA)' ? (
                <K12DocumentRequirements />
              ) : (
                <CollegeAndTESDADocumentRequirements
                  student_type={studentProfile?.student_type}
                />
              )}
            </CardContent>
          </Card>
        )}
      </Stack>
    </Stack>
  );
};

export default Applicant;
