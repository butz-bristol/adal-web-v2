import {
  Autocomplete,
  Button,
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
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import CollegeAndTESDAPaymentEntry from 'src/components/cashier/CollegeAndTESDAPaymentEntry';
import K12PaymentEntry from 'src/components/cashier/K12PaymentEntry';
import {
  clearStudentInfo,
  fetchAllOtherFees,
  fetchCollegeStudentLedger,
  fetchCollegeStudentPaymentScheme,
  fetchK12StudentLedger,
  fetchK12StudentPaymentScheme,
  fetchStudent,
  fetchTESDAStudentPaymentScheme,
  handleChange,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  clearDynamicData,
  getAllAcademicYears,
  getAllSemesters,
  getCollegeStudentEnrollmentLoad,
  getK12StudentEnrollmentLoad,
  getRegisteredStudents,
  getTESDAStudentEnrollmentLoad,
  handleChange as handleRegistrarChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatDateToString } from 'src/utils/helperFunctions';

const Payments = () => {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { or_no, student, pad_no, isFetchingStudent, value_date } = useSelector(
    (state) => state.cashier
  );
  const {
    students,
    isFetchingStudents,
    academic_years,
    academic_year_id,
    semester_id,
    semesters,
  } = useSelector((state) => state.registrar);
  const { opened } = useSelector((state) => state.customization);

  const clearStudent = () => {
    setSelectedStudent(null);
  };

  const handleInputChange = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const registeredStudents = students.filter(
    (student) => student?.student_registration_status === 'registered'
  );

  useEffect(() => {
    dispatch(getRegisteredStudents());
    dispatch(getAllAcademicYears());
    dispatch(getAllSemesters());
    dispatch(fetchAllOtherFees());
    dispatch(
      handleChange({
        name: 'value_date',
        value: formatDateToString(new Date()),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (selectedStudent && academic_year_id && semester_id) {
      dispatch(fetchStudent(selectedStudent?._id));
      dispatch(
        fetchCollegeStudentLedger({
          student_id: selectedStudent?._id,
          academic_year: academic_year_id,
          semester: semester_id,
        })
      );

      if (
        selectedStudent?.student_department?.department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
      ) {
        dispatch(
          fetchTESDAStudentPaymentScheme({
            student: selectedStudent?._id,
            academic_year: academic_year_id,
            semester: semester_id,
          })
        );

        dispatch(
          getTESDAStudentEnrollmentLoad({
            student_id: selectedStudent?._id,
            academic_year: academic_year_id,
            semester: semester_id,
          })
        );
      } else {
        dispatch(
          fetchCollegeStudentPaymentScheme({
            student: selectedStudent?._id,
            academic_year: academic_year_id,
            semester: semester_id,
            year_level: selectedStudent?.student_yearlevel?._id,
          })
        );

        dispatch(
          getCollegeStudentEnrollmentLoad({
            student_id: selectedStudent?._id,
            academic_year: academic_year_id,
            semester: semester_id,
          })
        );
      }
    }
  }, [dispatch, selectedStudent, academic_year_id, semester_id]);

  useEffect(() => {
    if (selectedStudent && academic_year_id) {
      if (
        selectedStudent?.student_department?.department_name !== 'College' &&
        selectedStudent?.student_department?.department_name !==
          'Technical Education and Skills Development Authority (TESDA)'
      ) {
        dispatch(fetchStudent(selectedStudent?._id));
        dispatch(
          fetchK12StudentPaymentScheme({
            student: selectedStudent?._id,
            academic_year: academic_year_id,
            year_level: selectedStudent?.student_yearlevel?._id,
          })
        );

        dispatch(
          fetchK12StudentLedger({
            student_id: selectedStudent?._id,
            academic_year: academic_year_id,
          })
        );

        dispatch(
          getK12StudentEnrollmentLoad({
            student_id: selectedStudent?._id,
            academic_year: academic_year_id,
          })
        );
      }
    }
  }, [dispatch, selectedStudent, academic_year_id]);

  return (
    <Stack>
      <Grid container mb={2} spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Autocomplete
              id="combo-box-demo"
              options={registeredStudents}
              getOptionLabel={(option) =>
                `${option?.student_first_name} ${option?.student_last_name} - ${option?.student_number}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Find Student"
                  variant="outlined"
                />
              )}
              onChange={(e, value) => setSelectedStudent(value)}
              value={selectedStudent}
              PaperComponent={({ children }) => (
                <Paper sx={{ width: 300 }}>{children}</Paper>
              )}
            />
          </FormControl>
        </Grid>

        {(isFetchingStudents || isFetchingStudent) && <LoadingScreen />}

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="select-academic-year">Academic Year</InputLabel>
            <Select
              labelId="select-academic-year"
              id="select-academic-year"
              value={academic_year_id || ''}
              name="academic_year_id"
              label="Academic Year"
              onChange={(e) => {
                dispatch(
                  handleRegistrarChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
              required
            >
              {academic_years.map((academic_year) => (
                <MenuItem key={academic_year._id} value={academic_year._id}>
                  {academic_year?.school_year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              name="semester_id"
              value={semester_id || ''}
              label="Semester"
              onChange={(e) =>
                dispatch(
                  handleRegistrarChange({
                    name: 'semester_id',
                    value: e.target.value,
                  })
                )
              }
              variant="outlined"
            >
              {semesters.map((semester) => (
                <MenuItem key={semester._id} value={semester._id}>
                  {semester.semester_term}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} alignSelf="center">
          <Button
            variant="contained"
            color="secondary"
            size=""
            onClick={() => {
              dispatch(clearStudentInfo());
              clearStudent();
              dispatch(
                clearDynamicData({
                  academic_year_id,
                  semester_id,
                })
              );
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>

      <Grid container p={2} justifyContent="space-between" component={Paper}>
        <Grid item xs={12} md={7}>
          <Stack direction="row" spacing={10}>
            <Typography variant="h5" gutterBottom>
              Last Name:
            </Typography>

            <Typography variant="h5" gutterBottom>
              {student?.student_last_name?.toUpperCase()}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={10}>
            <Typography variant="h5" gutterBottom>
              First Name:
            </Typography>

            <Typography variant="h5" gutterBottom>
              {student?.student_first_name?.toUpperCase()}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={7.7}>
            <Typography variant="h5" gutterBottom>
              Middle Name:
            </Typography>

            <Stack direction="row" spacing={opened ? 5.9 : 10.6}>
              <Typography
                variant="h5"
                gutterBottom
                width={`${opened ? '100px' : '150px'}`}
              >
                {student?.student_middle_name
                  ? student?.student_middle_name?.toUpperCase()
                  : ''}
              </Typography>

              <Typography variant="h5" gutterBottom width="70px">
                Pad No.
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={14}>
            <Typography variant="h5" gutterBottom>
              OR No.
            </Typography>

            <Stack direction="row" spacing={opened ? 9.6 : 16.9}>
              <input
                type="number"
                name="or_no"
                value={or_no}
                onChange={handleInputChange}
                style={{
                  borderRadius: '5px',
                  borderColor: 'transparent',
                  border: '1px solid #ccc',
                  outline: 'none',
                  width: `${opened ? '70px' : '100px'}`,
                }}
                placeholder="342111"
              />

              <input
                type="number"
                name="pad_no"
                value={pad_no}
                onChange={handleInputChange}
                style={{
                  borderRadius: '5px',
                  borderColor: 'transparent',
                  border: '1px solid #ccc',
                  outline: 'none',
                  width: `${opened ? '70px' : '100px'}`,
                }}
                placeholder="123"
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5} justifySelf="flex-end">
          <Stack direction="row" spacing={11}>
            <Typography variant="h5" gutterBottom>
              Date:
            </Typography>

            <Stack direction={'row'} spacing={3} alignItems={'center'}>
              <Typography variant="h5">
                {DateTime.now().toLocaleString(DateTime.DATE_MED)}
              </Typography>

              <input
                type="date"
                name="value_date"
                value={value_date}
                onChange={handleInputChange}
                style={{ width: '100px' }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={9.7}>
            <Typography variant="h5" gutterBottom>
              Grade:
            </Typography>

            <Typography variant="h5" gutterBottom>
              {student?.student_yearlevel?.year_level_name}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={8.6}>
            <Typography variant="h5" gutterBottom>
              Section:
            </Typography>

            <Typography variant="h5" gutterBottom>
              N/A
            </Typography>
          </Stack>

          <Stack direction="row" spacing={5.4}>
            <Typography variant="h5" gutterBottom>
              Student No.
            </Typography>

            <Typography variant="h5" gutterBottom>
              {student?.student_number}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {student?.student_department &&
        (student?.student_department?.department_name !== 'College' &&
        student?.student_department?.department_name !==
          'Technical Education and Skills Development Authority (TESDA)' ? (
          <K12PaymentEntry
            student_id={selectedStudent?._id}
            academic_year={academic_year_id}
          />
        ) : (
          <CollegeAndTESDAPaymentEntry
            semester={semester_id}
            student_id={selectedStudent?._id}
            academic_year={academic_year_id}
          />
        ))}
    </Stack>
  );
};

export default Payments;
