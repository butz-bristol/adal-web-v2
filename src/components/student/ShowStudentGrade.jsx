import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'features/registrarFeatures/registrarSlice';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { getStudent } from 'features/admissionsFeatures/admissionsSlice';
import { departmentWithPrograms, k12Departments } from 'utils/helperFunctions';
import UnderConstruction from 'views/maintenance/UnderConstruction';
import ShowK12GradingSystem from './ShowK12GradingSystem';

const ShowStudentGrade = () => {
  const dispatch = useDispatch();
  const {
    academic_years,
    departments,
    college_tracks,
    year_levels,
    semesters,
  } = useSelector((state) => state.registrar);
  const { programs } = useSelector((state) => state.academics);
  const { student } = useSelector((state) => state.students);
  const {
    studentProfile: { student_department },
  } = useSelector((state) => state.admissions);

  const [academicRecord, setAcademicRecord] = useState({});
  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const departmentName = departments.find(
    (department) => department?._id === academicRecord?.department?._id
  )?.department_name;

  const handleChange = (e) => {
    const data = { ...academicRecord };
    if (e.target.name === 'department') {
      data.college_track = null;
      data.program = null;
      data.level = null;
    } else if (e.target.name === 'college_track') {
      data.program = null;
      data.level = null;
    }
    dispatch(
      setAcademicRecord({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === academicRecord?.department?._id
    );
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === academicRecord?.department?._id &&
        year_level.remarks === 'Active'
    );
    if (academicRecord?.department) {
      setFilteredCollegeTrack(filteredCollegeTrack);
      setFilteredLevels(filteredLevelsByDepartment);
      !departmentWithPrograms.includes(departmentName) &&
        setFilteredCollegeTrack([]);
      setFilteredPrograms([]);
    }
  };

  const getFilteredProgram = () => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id === academicRecord?.college_track?._id &&
        program.isArchived === false
    );
    if (academicRecord?.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    getFilteredDepartment();
  }, [academicRecord?.department]);

  useEffect(() => {
    getFilteredProgram();
  }, [academicRecord?.college_track]);

  useEffect(() => {
    dispatch(getStudent(student.student_id));
    dispatch(getAllAcademicYears());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <>
      {k12Departments.includes(student_department?.department_name) ? (
        <>
          <Grid container spacing={2}>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              item
              xs={12}
              m={1}
              spacing={2}
            >
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-school-year">School Year</InputLabel>
                  <Select
                    id="select-school-year"
                    label="School Year"
                    name="school_year"
                    value={academicRecord?.academic_years?._id || ''}
                    onChange={handleChange}
                  >
                    {academic_years?.map((academic_year) => (
                      <MenuItem
                        key={academic_year._id}
                        value={academic_year.school_year}
                      >
                        {academic_year.school_year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-department">Department</InputLabel>
                  <Select
                    id="select-department"
                    label="Department"
                    name="department"
                    value={academicRecord?.department?._id || ''}
                    onChange={handleChange}
                  >
                    {departments
                      .filter((department) => department.remarks === 'Active')
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
                  <InputLabel id="select-college-track">Track</InputLabel>
                  <Select
                    id="select-college-track"
                    label="Track"
                    name="college_track"
                    value={academicRecord?.college_track?._id || ''}
                    onChange={handleChange}
                  >
                    {filteredCollegeTrack.map((college_track) => (
                      <MenuItem
                        key={college_track._id}
                        value={college_track._id}
                      >
                        {college_track.college_track_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-program">Programs</InputLabel>
                  <Select
                    id="select-program"
                    label="Programs"
                    name="program"
                    value={academicRecord?.program?._id || ''}
                    onChange={handleChange}
                  >
                    {filteredPrograms &&
                      filteredPrograms
                        .filter((program) => program.isArchived === false)
                        .map((program) => (
                          <MenuItem key={program._id} value={program._id}>
                            {program.program_name} -{' '}
                            {program.curriculum_ref?.curriculum_name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-level">Levels</InputLabel>
                  <Select
                    id="select-level"
                    label="Levels"
                    name="level"
                    value={academicRecord?.level?._id || ''}
                    onChange={handleChange}
                    required
                  >
                    {filteredLevels &&
                      filteredLevels
                        .filter((level) => level.remarks === 'Active')
                        .map((year_level) => (
                          <MenuItem key={year_level._id} value={year_level._id}>
                            {year_level.year_level_name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-semester">Semester</InputLabel>
                  <Select
                    id="select-semester"
                    label="Semester"
                    name="semester"
                    value={academicRecord?.semester?._id || ''}
                    onChange={handleChange}
                  >
                    {semesters
                      .filter((semester) => semester.remarks === 'Active')
                      .map((semester) => (
                        <MenuItem key={semester._id} value={semester._id}>
                          {semester.semester_term}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ShowK12GradingSystem />
            </Grid>
          </Grid>
        </>
      ) : (
        <UnderConstruction />
      )}
    </>
  );
};

export default ShowStudentGrade;
