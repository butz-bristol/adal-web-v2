import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  getAllCurriculums,
  getAllPrograms,
} from 'src/features/academicFeatures/academicSlice';

import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

import { IconSchool, IconSquareX } from '@tabler/icons-react';
import { bulkApplicants } from 'src/features/applicantFeatures/applicantSlice';

import Logo from 'src/assets/images/BEABEC.png';
import LoadingScreen from 'src/components/LoadingScreen';
import ReferenceModal from 'src/components/applicant/ReferenceModal';
import Wrapper from 'src/views/admission-form/Wrapper';
import StudentInformation from './StudentInformation';

function MultipleAdmissionsForm() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { isCreatingBulkApplicant, referenceModal, alertModal, newApplicant } =
    useSelector((state) => state.applicants);
  const { activeAcademicYear } = useSelector((state) => state.registrar);

  const [type, setType] = useState({});
  const [parent, setParent] = useState({});
  const [forms, setForm] = useState([newApplicant]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicants = forms.map((form) => {
      return {
        ...form,
        ...parent,
        student_academic_year: activeAcademicYear._id,
      };
    });

    dispatch(bulkApplicants({ applicants, parent_email: parent[type?.email] }));
    setForm([{}]);
  };

  const addForm = () => {
    setForm([...forms, newApplicant]);
  };

  const removeForm = (formIndex) => {
    setForm(forms.filter((_, index) => index !== formIndex));
  };

  const handleFieldChange = (formIndex, fieldName, fieldValue) => {
    setForm((prevForms) =>
      prevForms.map((form, index) =>
        index === formIndex ? { ...form, [fieldName]: fieldValue } : form
      )
    );
  };

  const handleFieldDelete = (formIndex, fieldName) => {
    setForm((prevForms) =>
      prevForms.map((form, index) => {
        if (index === formIndex) {
          const updatedForm = { ...form };
          delete updatedForm[fieldName];
          return updatedForm;
        }
        return form;
      })
    );
  };

  const handleChange = (e) => {
    setParent({ ...parent, [e.target.name]: e.target.value });
  };

  const handleChangeType = (e) => {
    if (e.target.value === 'Father') {
      setType({
        name: 'student_father_name',
        email: 'student_father_email_address',
        contact: 'student_father_contact_number',
        occupation: 'student_father_occupation',
        value: e.target.value,
      });
      setParent({});
    } else if (e.target.value === 'Mother') {
      setType({
        name: 'student_mother_name',
        email: 'student_mother_email_address',
        contact: 'student_mother_contact_number',
        occupation: 'student_mother_occupation',
        value: e.target.value,
      });
      setParent({});
    } else if (e.target.value === 'Guardian') {
      setType({
        name: 'student_guardian_name',
        email: 'student_guardian_email_address',
        contact: 'student_guardian_contact_number',
        occupation: 'student_guardian_occupation',
        value: e.target.value,
      });
      setParent({});
      return;
    }
  };

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllCollegeTracks());
    dispatch(getAllCurriculums());
    dispatch(getAllPrograms());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <>
      {isCreatingBulkApplicant ? (
        <LoadingScreen />
      ) : (
        <>
          <ReferenceModal isOpen={referenceModal} data={alertModal} />

          <Wrapper sx={{ p: 2 }}>
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              sx={{ mb: 2 }}
            >
              <Grid item xs={12} md={9} lg={6}>
                <Card>
                  <CardHeader
                    title={
                      <>
                        <Typography variant="h2" color="white">
                          ADMISSION FORM
                        </Typography>
                        <Typography color="white">
                          S.Y {activeAcademicYear?.school_year}
                        </Typography>
                      </>
                    }
                    sx={{ backgroundColor: '#9e1313', height: '80px' }}
                    action={
                      <CardMedia
                        component="img"
                        image={Logo}
                        sx={{ width: 80 }}
                      ></CardMedia>
                    }
                  ></CardHeader>
                  <CardContent>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12}>
                        <Typography variant="h4" color="secondary">
                          Parent or Guardian Information
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          To enroll your child, please complete the registration
                          forms provided
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <FormLabel id="select-parent-type" color="secondary">
                            Are you his/her?
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="select-parent-type"
                            name="parent_type"
                            value={type?.value || ''}
                            onChange={handleChangeType}
                          >
                            <FormControlLabel
                              value="Father"
                              control={<Radio color="secondary" />}
                              label="Father"
                            />
                            <FormControlLabel
                              value="Mother"
                              control={<Radio color="secondary" />}
                              label="Mother"
                            />
                            <FormControlLabel
                              value="Guardian"
                              control={<Radio color="secondary" />}
                              label="Guardian"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} lg={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Your Name"
                          variant="outlined"
                          name={type?.name}
                          value={parent[type?.name] || ''}
                          onChange={handleChange}
                          disabled={type?.value ? false : true}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          fullWidth
                          type="email"
                          label="Email Address"
                          variant="outlined"
                          name={type?.email}
                          value={parent[type?.email] || ''}
                          onChange={handleChange}
                          disabled={type?.value ? false : true}
                        />
                      </Grid>

                      <Grid item xs={12} lg={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Contact"
                          variant="outlined"
                          name={type?.contact}
                          value={parent[type?.contact] || ''}
                          onChange={handleChange}
                          disabled={type?.value ? false : true}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          fullWidth
                          type="text"
                          helperText="Put N/A if not applicable"
                          label="Occupation"
                          onChange={handleChange}
                          name={type?.occupation}
                          value={parent[type?.occupation] || ''}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={type?.value ? false : true}
                          onClick={addForm}
                        >
                          Add Child
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={type?.value ? false : true}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {forms.map((form, index) => (
              <Grid
                key={index}
                container
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={12} md={9} lg={6} sx={{ mb: 2 }}>
                  <Card>
                    <CardHeader
                      title={'Student Information ' + (index + 1)}
                      avatar={<IconSchool />}
                      action={
                        forms.length > 1 ? (
                          <IconButton
                            variant="contained"
                            color="secondary"
                            onClick={() => removeForm(index)}
                          >
                            <Tooltip title="Remove Form">
                              <IconSquareX />
                            </Tooltip>
                          </IconButton>
                        ) : (
                          <></>
                        )
                      }
                    />
                    <CardContent>
                      <StudentInformation
                        applicant={form}
                        formIndex={index}
                        setApplicant={handleFieldChange}
                        deleteField={handleFieldDelete}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))}
          </Wrapper>
        </>
      )}
    </>
  );
}

export default MultipleAdmissionsForm;
