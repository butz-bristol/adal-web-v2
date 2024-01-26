import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Button,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from '@mui/material';

import {
  IconId,
  IconPhone,
  IconSchool,
  IconUsersGroup,
} from '@tabler/icons-react';

import { createApplicant } from 'src/features/applicantFeatures/applicantSlice';
import { departmentWithPrograms } from 'src/utils/helperFunctions';

import ContactInformation from 'src/components/applicant/ContactInformation';
import FamilyBackground from 'src/components/applicant/FamilyBackground';
import GeneralInformation from 'src/components/applicant/GeneralInformation';
import ReviewForm from 'src/components/applicant/ReviewForm';
import AnimateButton from 'src/ui-component/extended/AnimateButton';

const AdmissionsForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const { isCreatingApplicant, newApplicant } = useSelector(
    (state) => state.applicants
  );
  const { departments, activeAcademicYear } = useSelector(
    (state) => state.registrar
  );
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Student Information', icon: IconSchool },
    { title: 'Contact Information', icon: IconPhone },
    { title: 'Family Background', icon: IconUsersGroup },
    { title: 'Application Form', icon: IconId },
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <GeneralInformation />;
      case 1:
        return <ContactInformation />;
      case 2:
        return <FamilyBackground />;
      case 3:
        return <ReviewForm />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    const departmentName = departments.find(
      (department) => department?._id === newApplicant.student_department?._id
    )?.department_name;
    if (activeStep === 0) {
      if (!newApplicant.student_type) {
        toast.error('Please select a student type');
        return;
      }
      if (!newApplicant.student_department) {
        toast.error('Please select a department');
        return;
      }
      if (departmentWithPrograms.indexOf(departmentName) === 1) {
        if (!newApplicant.student_college_track) {
          toast.error('Please select a college or track');
          return;
        }
        if (!newApplicant.student_program) {
          toast.error('Please select a program');
          return;
        }
      }
      if (!newApplicant.student_yearlevel) {
        toast.error('Please select a level');
        return;
      }
      if (
        newApplicant.student_returnee_status === true &&
        !newApplicant.old_student_number
      ) {
        toast.error('Please input your old student number');
        return;
      }
      if (
        newApplicant.student_returnee_status === true &&
        !newApplicant.student_last_school_attended
      ) {
        toast.error('Please input your previous school');
        return;
      }
      if (
        newApplicant.student_returnee_status === true &&
        !newApplicant.student_last_school_year_attended
      ) {
        toast.error('Please input your last school year attended');
        return;
      }
      if (!newApplicant.student_last_name || !newApplicant.student_first_name) {
        toast.error('Please input your complete name');
        return;
      }
      if (!newApplicant.student_birthdate) {
        toast.error('Please input your birth date');
        return;
      }
      if (!newApplicant.student_nationality) {
        toast.error('Please select a your nationality');
        return;
      }
      if (!newApplicant.student_sexual_orientation) {
        toast.error('Please select a Sexual Orientation');
        return;
      }
      if (!newApplicant.student_civil_status) {
        toast.error('Please select a your civil status');
        return;
      }
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 1) {
      if (!newApplicant.student_contact_number) {
        toast.error('Please input your contact number');
        return;
      }
      if (newApplicant.student_contact_number) {
        const contactNumberPattern = /^(09|\+639)\d{9}$/;
        if (!contactNumberPattern.test(newApplicant.student_contact_number)) {
          toast.error('Invalid contact number');
          return;
        }
      }
      if (!newApplicant.student_personal_email) {
        toast.error('Please input your email');
        return;
      }
      if (newApplicant.student_personal_email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newApplicant.student_personal_email)) {
          toast.error('Invalid email address');
          return;
        }
      }
      if (newApplicant.student_same_address === false) {
        if (!newApplicant.student_permanent_address) {
          toast.error('Please input your Permanent address');
          return;
        }
      }
      if (!newApplicant.student_present_address) {
        toast.error('Please input your Residential address');
        return;
      }
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 2) {
      if (
        !newApplicant.student_father_name &&
        !newApplicant.student_mother_name &&
        !newApplicant.student_guardian_name
      ) {
        toast.error('Please input your parent/guardian`s name');
        return;
      }
      if (
        !newApplicant.student_father_contact_number &&
        !newApplicant.student_mother_contact_number &&
        !newApplicant.student_guardian_contact_number &&
        !newApplicant.student_father_email_address &&
        !newApplicant.student_mother_email_address &&
        !newApplicant.student_guardian_email_address
      ) {
        toast.error('Please input your parent/guardian`s contact or email');
        return;
      }
      setActiveStep(activeStep + 1);
    }

    if (activeStep === 3) {
      dispatch(
        createApplicant({
          ...newApplicant,
          student_academic_year: activeAcademicYear?._id,
        })
      );
      isCreatingApplicant === false && setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography
            sx={{ py: 2 }}
            variant="h1"
            color={theme.palette.secondary.main}
          >
            ADMISSION FORM
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">
            S.Y {activeAcademicYear?.school_year}
          </Typography>
        </Grid>
      </Grid>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label.title}>
            <StepLabel>{matchDownMd ? undefined : label.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h4" color="secondary" gutterBottom>
              Your Application has been submitted!
            </Typography>
            <br />
            <Typography variant="subtitle1">
              We have emailed your application form, and will send you the
              reference number.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setActiveStep(0)}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <form>
            {getStepContent(activeStep)}
            <Stack
              direction="row"
              justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}
            >
              {activeStep !== 0 && (
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{ my: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}
              <AnimateButton>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  sx={{ my: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </AnimateButton>
            </Stack>
          </form>
        )}
      </>
    </>
  );
};

export default AdmissionsForm;
