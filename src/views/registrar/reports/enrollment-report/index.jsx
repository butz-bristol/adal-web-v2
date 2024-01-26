import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { IconDatabaseImport } from '@tabler/icons-react';
import * as React from 'react';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingData from 'src/components/LoadingData';
import CollegeEnrollmentReport from 'src/components/registrar/reports/CollegeEnrollmentReport';
import EnrollmentSummaryPDFPreview from 'src/components/registrar/reports/EnrollmentSummaryPDFPreview';
import K12EnrollmentReport from 'src/components/registrar/reports/K12EnrollmentReport';
import TESDAEnrollmentReport from 'src/components/registrar/reports/TESDAEnrollmentReport';
import {
  getAllAcademicYears,
  getAllDepartments,
  getAllSemesters,
  getCollegeEnrollments,
  getK12Enrollments,
  getTESDAEnrollments,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatUnit } from 'src/utils/helperFunctions';

const EnrollmentReport = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = React.useState('');
  const [studentType, setStudentType] = React.useState('');
  const [openEnrollmentSummary, setOpenEnrollmentSummary] =
    React.useState(false);
  const [showList, setShowList] = React.useState(false);
  const {
    k12Enrollments,
    academic_years,
    academic_year,
    semester,
    semesters,
    departments,
    department_id,
    collegeEnrollments,
    tesdaEnrollments,
    isFetchingK12Enrollments,
    isFetchingCollegeEnrollments,
    isFetchingTESDAEnrollments,
  } = useSelector((state) => state.registrar);
  const { sections } = useSelector((state) => state.academics);

  const currentAcademicYear = academic_years.find(
    (school_year) => school_year.remarks === 'Current'
  );

  let filteredEnrolledStudents = [];

  if (department === 'college') {
    filteredEnrolledStudents = collegeEnrollments.filter((enrollment) => {
      if (
        (!academic_year || enrollment.academic_year._id === academic_year) &&
        (!semester || enrollment.semester._id === semester) &&
        (!studentType || enrollment.student.student_type === studentType)
      ) {
        return true;
      }

      return false;
    });
  } else if (department === 'tesda') {
    filteredEnrolledStudents = tesdaEnrollments.filter((enrollment) => {
      if (
        (!academic_year || enrollment.academic_year._id === academic_year) &&
        (!semester || enrollment.semester._id === semester) &&
        (!studentType || enrollment.student.student_type === studentType)
      ) {
        return true;
      }

      return false;
    });
  } else {
    filteredEnrolledStudents = k12Enrollments.filter((enrollment) => {
      if (
        (!academic_year || enrollment.academic_year._id === academic_year) &&
        (!studentType || enrollment.student.student_type === studentType)
      ) {
        return true;
      }

      return false;
    });
  }

  let enrollmentSummaryData;
  let enrollmentListCSV = [];
  let k12EnrollmentList = [];
  let yearEndReportCSV = [];

  // Enrollment List and Summary K-12

  if (department === 'k-12') {
    const students = filteredEnrolledStudents.map(
      (enrollment) => enrollment.student
    );

    const gradeLevelMap = [
      'Kindergarten',
      'Nursery 1',
      'Nursery 2',
      'Grade 1',
      'Grade 2',
      'Grade 3',
      'Grade 4',
      'Grade 5',
      'Grade 6',
      'Grade 7',
      'Grade 7 Diamond',
      'Grade 8',
      'Grade 8 Diamond',
      'Grade 9',
      'Grade 9 Diamond',
      'Grade 10',
      'Grade 10 Diamond',
      'Grade 11',
      'Grade 11 - ABM',
      'Grade 11 - HE',
      'Grade 11 - HUMSS',
      'Grade 11 - ICT CP',
      'Grade 11 - ICT CHS',
      'Grade 11 - STEM',
      'Grade 12',
      'Grade 12 - ABM',
      'Grade 12 - HE',
      'Grade 12 - HUMSS',
      'Grade 12 - ICT CP',
      'Grade 12 - ICT CHS',
      'Grade 12 - STEM',
    ];

    // arrange students according to grade level
    const studentsByGradeLevel = [];
    gradeLevelMap.forEach((gradeLevel) => {
      const studentsForGradeLevel = students
        .filter(
          (student) =>
            student?.student_yearlevel?.year_level_name === gradeLevel
        )
        .sort((a, b) => {
          if (a?.student_last_name > b?.student_last_name) {
            return 1;
          } else if (a?.student_last_name < b?.student_last_name) {
            return -1;
          } else {
            return 0;
          }
        });

      const gradeLevelObject = {
        grade_level: gradeLevel,
        students: studentsForGradeLevel,
      };

      studentsByGradeLevel.push(gradeLevelObject);
    });

    enrollmentSummaryData = {
      academic_year: academic_years.find(
        (school_year) => school_year._id === academic_year
      )?.school_year,
      department,
      studentsByGradeLevel,
    };

    const yearLevelAccumulation = [];

    gradeLevelMap.forEach((yearLevel) => {
      yearLevelAccumulation.push({
        year_level: yearLevel,
        males: 0,
        females: 0,
        total: 0,
      });
    });

    let totalMales = 0;
    let totalFemales = 0;

    // Accumulate genders based on year level and calculate total genders
    filteredEnrolledStudents.forEach((enrollment) => {
      const yearLevel = enrollment.student?.student_yearlevel?.year_level_name;
      const gender = enrollment.student.student_gender;

      // Calculate total genders
      if (gender === 'Male') {
        totalMales++;
      } else if (gender === 'Female') {
        totalFemales++;
      }

      if (gradeLevelMap.includes(yearLevel)) {
        const yearIndex = gradeLevelMap.indexOf(yearLevel);
        yearLevelAccumulation[yearIndex].total++;
        if (gender === 'Male') {
          yearLevelAccumulation[yearIndex].males++;
        } else if (gender === 'Female') {
          yearLevelAccumulation[yearIndex].females++;
        }
      }
    });

    yearLevelAccumulation.push({
      year_level: 'Total',
      males: totalMales,
      females: totalFemales,
      total: totalMales + totalFemales,
    });

    k12EnrollmentList = {
      academic_year: academic_years.find(
        (school_year) => school_year._id === academic_year
      )?.school_year,
      department,
      yearLevelAccumulation,
    };
  }

  // Enrollment List and Summary College and TESDA

  if (department === 'college' || department === 'tesda') {
    const yearLevelAccumulation = [];

    const yearLevelsToAccumulate = [
      '1st Year',
      '2nd Year',
      '3rd Year',
      '4th Year',
      '5th Year',
      '6th Year',
    ];

    yearLevelsToAccumulate.forEach((yearLevel) => {
      yearLevelAccumulation.push({
        year_level: yearLevel,
        males: 0,
        females: 0,
        total: 0,
      });
    });

    let totalMales = 0;
    let totalFemales = 0;

    // Accumulate genders based on year level and calculate total genders
    filteredEnrolledStudents.forEach((enrollment) => {
      const yearLevel = enrollment.student?.student_yearlevel?.year_level_name;
      const gender = enrollment.student.student_gender;

      // Calculate total genders
      if (gender === 'Male') {
        totalMales++;
      } else if (gender === 'Female') {
        totalFemales++;
      }

      if (yearLevelsToAccumulate.includes(yearLevel)) {
        const yearIndex = yearLevelsToAccumulate.indexOf(yearLevel);
        yearLevelAccumulation[yearIndex].total++;
        if (gender === 'Male') {
          yearLevelAccumulation[yearIndex].males++;
        } else if (gender === 'Female') {
          yearLevelAccumulation[yearIndex].females++;
        }
      }
    });

    yearLevelAccumulation.push({
      year_level: 'Total',
      males: totalMales,
      females: totalFemales,
      total: totalMales + totalFemales,
    });

    enrollmentSummaryData = {
      academic_year: academic_years.find(
        (school_year) => school_year._id === academic_year
      )?.school_year,
      department,
      yearLevelAccumulation,
    };

    enrollmentListCSV = filteredEnrolledStudents.map((enrollment, index) => {
      const subjects = enrollment.subjects;
      const header = [];
      const content = {};

      // Build the header with 12 columns
      for (let i = 0; i < 12; i++) {
        header.push({
          'Course Code': `Course Code ${i + 1}`,
          'Course Description': `Course Description ${i + 1}`,
          Units: `Units ${i + 1}`,
        });
      }

      for (let i = 0; i < subjects.length; i++) {
        content[`Course Code ${i + 1}`] = subjects[i].course_code;
        content[`Course Description ${i + 1}`] = subjects[i].course_name;
        content[`Units ${i + 1}`] = formatUnit(
          subjects[i].course_unit ?? subjects[i].course_total_hours
        );
      }

      return {
        Count: index + 1,
        'Student No.': enrollment.student.student_number,
        Surname: enrollment.student.student_last_name.toUpperCase(),
        'First Name': enrollment.student.student_first_name,
        'Middle Name': enrollment.student?.student_middle_name,
        Suffix: enrollment.student?.student_suffix,
        Sex: enrollment.student?.student_gender,
        Nationality: enrollment.student?.student_nationality,
        'Year Level': enrollment.student?.student_yearlevel?.year_level_name,
        Program: enrollment.student?.student_program.program_name,
        Major: enrollment.student?.student_major
          ? enrollment.student.student_major.major_name
          : '',
        ...header.reduce((acc, col) => {
          acc[col['Course Code']] = content[col['Course Code']];
          acc[col['Course Description']] = content[col['Course Description']];
          acc[col['Units']] = content[col['Units']];
          return acc;
        }, {}),
      };
    });
  }

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
    dispatch(getTESDAEnrollments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      handleChange({ name: 'academic_year', value: currentAcademicYear?._id })
    );
  }, [currentAcademicYear?._id, dispatch]);

  return (
    <Stack spacing={2}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        spacing={1}
        alignItems={'center'}
      >
        <Stack direction={'row'} spacing={1} sx={{ overflowX: 'clip' }}>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel id="select-department">Department</InputLabel>
            <Select
              labelId="select-department"
              id="select-department"
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="k-12">K-12 Departments</MenuItem>
              <MenuItem value="college">College</MenuItem>
              <MenuItem value="tesda">TESDA</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 100 }}>
            <InputLabel id="select-academic-year">School Year</InputLabel>
            <Select
              labelId="select-academic-year"
              id="select-academic-year"
              value={academic_year || ''}
              name="academic_year"
              label="School Year"
              onChange={handleInputChange}
              required
              defaultValue={currentAcademicYear?._id}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {academic_years.map((academic_year) => (
                <MenuItem key={academic_year._id} value={academic_year._id}>
                  {academic_year?.school_year}
                  {academic_year?.remarks === 'Current' ||
                  academic_year?.remarks === 'Next Term' ? (
                    <em>
                      {' - '}
                      {academic_year?.remarks}
                    </em>
                  ) : null}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {(department === 'college' || department === 'tesda') && (
            <FormControl fullWidth sx={{ minWidth: 100 }}>
              <InputLabel id="select-academic-semester">Semester</InputLabel>
              <Select
                labelId="select-academic-semester"
                id="select-academic-semester"
                value={semester}
                name="semester"
                label="Semester"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {semesters
                  .map((semester) => (
                    <MenuItem key={semester._id} value={semester._id}>
                      {semester?.semester_term}
                    </MenuItem>
                  ))
                  .sort((a, b) =>
                    a.props.children > b.props.children ? 1 : -1
                  )}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth sx={{ minWidth: 140 }}>
            <InputLabel id="select-student-type">Student Type</InputLabel>
            <Select
              labelId="select-student-type"
              id="select-student-type"
              value={studentType}
              label="Student Type"
              name="studentType"
              onChange={(e) => setStudentType(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="New">New Student</MenuItem>
              <MenuItem value="Old">Old Student</MenuItem>
              <MenuItem value="Transferee">Transferee</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          direction={{
            xs: 'column',
            lg: 'row',
          }}
          alignItems={'center'}
          alignContent={'stretch'}
        >
          {department === 'k-12' ? (
            <Button
              variant="contained"
              color="warning"
              endIcon={<IconDatabaseImport size={'17px'} />}
              onClick={() => {
                if (!department) {
                  toast.error('Please select a department!');
                  return false;
                }
                setOpenEnrollmentSummary(true);
                setShowList(true);
              }}
            >
              Enrollment List (PDF)
            </Button>
          ) : (
            <CSVLink
              data={enrollmentListCSV}
              target="_blank"
              filename={`${department}-enrollment-list`.toUpperCase()}
              onClick={(event) => {
                if (enrollmentListCSV.length === 0) {
                  event.preventDefault();
                  toast.error('No data to export!');
                  return false;
                }
              }}
            >
              <Button
                variant="contained"
                color="warning"
                endIcon={<IconDatabaseImport size={'17px'} />}
                sx={{ minWidth: '201px' }}
              >
                Enrollment List
              </Button>
            </CSVLink>
          )}

          <Button
            variant="contained"
            color="secondary"
            endIcon={<IconDatabaseImport size={'17px'} />}
            sx={{ minWidth: '201px' }}
            onClick={() => toast.info('Feature coming soon!')}
          >
            Year End Report
          </Button>

          <Button
            variant="contained"
            color="primary"
            endIcon={<IconDatabaseImport size={'17px'} />}
            onClick={() => {
              if (!department) {
                toast.error('Please select a department!');
                return false;
              }
              setOpenEnrollmentSummary(true);
              setShowList(false);
            }}
          >
            Enrollment Summary
          </Button>
        </Stack>
      </Stack>

      <EnrollmentSummaryPDFPreview
        open={openEnrollmentSummary}
        close={() => setOpenEnrollmentSummary(false)}
        data={enrollmentSummaryData}
        showList={showList}
        list={showList ? k12EnrollmentList : []}
      />

      {(isFetchingK12Enrollments ||
        isFetchingCollegeEnrollments ||
        isFetchingTESDAEnrollments) && <LoadingData />}

      {department === 'k-12' && (
        <K12EnrollmentReport enrollments={filteredEnrolledStudents} />
      )}

      {department === 'college' && (
        <CollegeEnrollmentReport enrollments={filteredEnrolledStudents} />
      )}

      {department === 'tesda' && (
        <TESDAEnrollmentReport enrollments={filteredEnrolledStudents} />
      )}
    </Stack>
  );
};

export default EnrollmentReport;
