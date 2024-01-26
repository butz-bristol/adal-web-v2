import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { IconClick } from '@tabler/icons-react';
import { useEffect } from 'react';
import CollegePendingEnrollments from 'src/components/registrar/CollegePendingEnrollments';
import K12PendingEnrollments from 'src/components/registrar/K12PendingEnrollments';
import {
  getAllAcademicYears,
  getAllDepartments,
  getAllSemesters,
  getCollegeEnrollments,
  getK12Enrollments,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';

const PendingEnrollments = () => {
  const dispatch = useDispatch();
  const {
    k12Enrollments,
    academic_years,
    academic_year,
    semester,
    semesters,
    departments,
    department_id,
    collegeEnrollments,
  } = useSelector((state) => state.registrar);

  const selectedDepartment = departments?.find(
    (department) => department?._id === department_id
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    dispatch(getAllSemesters());
    dispatch(getAllAcademicYears());
    dispatch(getAllDepartments());
    dispatch(getK12Enrollments());
    dispatch(getCollegeEnrollments());
  }, [dispatch]);

  return (
    <Stack>
      <Grid container mb={2} mt={1} spacing={2} alignItems={'center'}>
        <Grid item xs={12} md={4}>
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
              {departments
                ?.filter((department) => department?.remarks === 'Active')
                .map((department) => (
                  <MenuItem key={department._id} value={department._id}>
                    {department?.department_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
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
              {academic_years.map((academic_year) => (
                <MenuItem key={academic_year._id} value={academic_year}>
                  {academic_year?.school_year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
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
              {semesters
                ?.filter((semester) => semester.remarks === 'Active')
                .map((semester) => (
                  <MenuItem key={semester._id} value={semester}>
                    {semester?.semester_term}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {!department_id ? (
          <Stack
            p={2}
            component={Card}
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            spacing={1}
          >
            <Typography variant="h4" color="#616161" mb={-0.5}>
              Select Department
            </Typography>
            <IconClick />
          </Stack>
        ) : selectedDepartment?.department_name !== 'College' &&
          selectedDepartment?.department_name !==
            'Technical Education and Skills Development Authority (TESDA)' ? (
          <K12PendingEnrollments
            enrollments={k12Enrollments}
            academic_year={academic_year?._id}
          />
        ) : (
          <CollegePendingEnrollments
            enrollments={collegeEnrollments}
            semester={semester?._id}
            academic_year={academic_year?._id}
          />
        )}
      </Grid>
    </Stack>
  );
};

export default PendingEnrollments;
