import {
  Autocomplete,
  Card,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconClick, IconDiscountCheck } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import {
  CollegeAndTESDAStudentTable,
  K12StudentTable,
} from 'src/components/registrar';
import {
  getAllCurriculums,
  getAllPrograms,
  getAllSections,
} from 'src/features/academicFeatures/academicSlice';
import {
  fetchCollegeStudentLedger,
  fetchK12StudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  clearStudentInfo,
  fetchStudentsByQuery,
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
  getCollegeStudentEnrollmentLoad,
  getK12StudentEnrollmentLoad,
  getRegisteredStudents,
  getStudent,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';

const EnrollStudents = () => {
  const dispatch = useDispatch();
  const {
    students,
    student_id,
    studentProfile,
    academic_years,
    academic_year,
    semester,
    semesters,
    showModal,
    isFetchingStudentProfile,
    isFetchingStudents,
    isFilteringStudents,
    isFetchingStudentFees,
    departments,
    department_id,
    query,
    filteredStudents,
  } = useSelector((state) => state.registrar);
  const { isFetchingStudentLedger } = useSelector((state) => state.cashier);

  let studentList = [];

  if (query.length > 0) {
    studentList = filteredStudents;
  } else {
    studentList = students;
  }

  if (department_id) {
    studentList = studentList.filter(
      (student) => student?.student_department?._id === department_id?._id
    );
  }

  const registeredStudents = studentList.filter(
    (student) => student?.student_registration_status === 'registered'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    dispatch(clearStudentInfo());
    dispatch(getAllSemesters());
    dispatch(getAllCurriculums());
    dispatch(getAllAcademicYears());
    dispatch(getAllYearLevels());
    dispatch(getAllPrograms());
    dispatch(getAllCollegeTracks());
    dispatch(getAllSections());
    dispatch(getAllDepartments());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (student_id) {
      dispatch(getStudent(student_id));
      if (academic_year?._id) {
        // Get Student Enrollment

        dispatch(
          getK12StudentEnrollmentLoad({
            student_id,
            academic_year: academic_year?._id,
          })
        );

        // Get College Student Ledger

        if (
          (studentProfile?.student_department?.department_name === 'College' ||
            studentProfile?.student_department?.department_name ===
              'Technical Education and Skills Development Authority (TESDA)') &&
          semester?._id
        ) {
          dispatch(
            getCollegeStudentEnrollmentLoad({
              student_id,
              academic_year: academic_year?._id,
              semester: semester?._id,
            })
          );

          dispatch(
            fetchCollegeStudentLedger({
              student_id,
              academic_year: academic_year?._id,
              semester: semester?._id,
            })
          );
        } else {
          // Get K12 Student Ledger

          if (
            studentProfile?.student_department?.department_name ===
              'Senior High School' &&
            semester?._id
          ) {
            dispatch(
              fetchCollegeStudentLedger({
                student_id,
                academic_year: academic_year?._id,
                semester: semester?._id,
              })
            );
          }

          dispatch(
            fetchK12StudentLedger({
              student_id,
              academic_year: academic_year?._id,
            })
          );
        }
      }
    } else {
      dispatch(clearStudentInfo());
    }
  }, [
    academic_year?._id,
    dispatch,
    semester?._id,
    studentProfile?.student_college_track?.college_track_name,
    studentProfile?.student_department?.department_name,
    student_id,
  ]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchStudentsByQuery());
    } else {
      dispatch(getRegisteredStudents());
    }
  }, [dispatch, query]);

  return (
    <Stack>
      <Grid container mb={1} spacing={2} alignItems={'center'}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="select-department">Department</InputLabel>
            <Select
              labelId="select-department"
              id="select-department"
              value={department_id || ''}
              name="department_id"
              label="Department"
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department._id} value={department}>
                  {department?.department_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Autocomplete
            id="combo-box-demo"
            options={registeredStudents}
            getOptionLabel={(option) =>
              `${option?.student_first_name ?? ''} ${
                option?.student_last_name ?? ''
              } ${option.student_number ? `- ${option?.student_number}` : ''}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Find Student" variant="outlined" />
            )}
            onChange={(e, value) => {
              dispatch(handleChange({ name: 'student_id', value: value?._id }));
            }}
            onInputChange={(e, value) => {
              dispatch(handleChange({ name: 'query', value: value.trim() }));
            }}
            loading={isFetchingStudents || isFilteringStudents}
            value={studentProfile ?? {}}
            PaperComponent={({ children }) => (
              <Paper sx={{ width: 300 }}>{children}</Paper>
            )}
          />
        </Grid>

        <RedirectModal showModal={showModal} />
        {isFetchingStudentProfile ||
        isFetchingStudents ||
        isFetchingStudentLedger ||
        isFetchingStudentFees ? (
          <LoadingScreen />
        ) : null}

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="select-academic-year">Academic Year</InputLabel>
            <Select
              labelId="select-academic-year"
              id="select-academic-year"
              value={academic_year || ''}
              name="academic_year"
              label="Academic Year"
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {academic_years.map((academic_year) => (
                <MenuItem key={academic_year._id} value={academic_year}>
                  {academic_year?.school_year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="select-academic-semester">Semester</InputLabel>
            <Select
              labelId="select-academic-semester"
              id="select-academic-semester"
              value={semester || ''}
              name="semester"
              label="Semester"
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {semesters
                .map((semester) => (
                  <MenuItem key={semester._id} value={semester}>
                    {semester?.semester_term}
                  </MenuItem>
                ))
                .sort((a, b) => (a.props.children > b.props.children ? 1 : -1))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {!studentProfile?.student_department?.department_name ? (
          <Stack
            p={2}
            component={Card}
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            spacing={1}
          >
            <Typography variant="h4" color="#616161" mb={-0.5}>
              Select Student
            </Typography>
            <IconClick />
          </Stack>
        ) : studentProfile?.student_department?.department_name !== 'College' &&
          studentProfile?.student_department?.department_name !==
            'Technical Education and Skills Development Authority (TESDA)' ? (
          <K12StudentTable
            studentProfile={studentProfile}
            academic_year={academic_year?._id}
            semester={semester?._id}
          />
        ) : (
          <CollegeAndTESDAStudentTable
            studentProfile={studentProfile}
            academic_year={academic_year?._id}
            semester={semester?._id}
          />
        )}
      </Grid>
    </Stack>
  );
};

const RedirectModal = ({ showModal }) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={showModal}
      onClose={() => {
        dispatch(handleChange({ name: 'showModal', value: false }));
        dispatch(clearStudentInfo());
      }}
    >
      <DialogContent>
        <Stack
          p={2}
          component={Card}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={1}
        >
          <Typography variant="h4">Enrollment Data Saved</Typography>
          <IconDiscountCheck size={70} color="green" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollStudents;
