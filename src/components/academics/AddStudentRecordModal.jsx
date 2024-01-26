import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';

import {
  clearStudentRecord,
  generateStudentRecord,
  getAllCollegeSubjects,
  getAllK12Subjects,
  getAllPrograms,
  getAllTesdaCourses,
  setStudentRecord,
  toggleAddStudentRecord,
} from 'src/features/academicFeatures/academicSlice';

import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

import {
  departmentWithPrograms,
  k12Departments,
} from 'src/utils/helperFunctions';

const AddStudentRecordModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    studentProfile: { student_department, student_yearlevel },
  } = useSelector((state) => state.admissions);

  const {
    activeAcademicYear,
    academic_years,
    departments,
    college_tracks,
    year_levels,
    semesters,
  } = useSelector((state) => state.registrar);

  const {
    studentRecord,
    isAddingStudentRecord,
    programs,
    k12Subjects,
    collegeSubjects,
    tesdaCourses,
  } = useSelector((state) => state.academics);

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const filteredDepartments = departments.filter((department) => {
    return !departmentWithPrograms.includes(department.department_name);
  });

  const departmentName = departments.find(
    (department) => department?._id === studentRecord.department?._id
  )?.department_name;
  const subject_type = k12Departments.includes(
    student_department?.department_name
  )
    ? 'K12Subject'
    : student_department?.department_name === 'College'
      ? 'CollegeSubject'
      : student_department?.department_name ===
          'Technical Education and Skills Development Authority (TESDA)'
        ? 'TESDACourse'
        : null;

  const handleSubmit = () => {
    dispatch(
      generateStudentRecord({
        ...studentRecord,
        student: id,
        subjects: loadK12SubjectsByLevel(),
      })
    );
    handleClose();
  };

  const loadK12SubjectsByLevel = () => {
    const subjects = k12Subjects
      .filter(
        (subject) =>
          studentRecord.level?._id === subject?.level?._id &&
          subject?.remarks === 'Active'
      )
      .map((subject) => {
        return { subject_course: subject._id, subject_type: subject_type };
      });
    return subjects;
  };

  const handleClose = () => {
    dispatch(toggleAddStudentRecord());
    dispatch(clearStudentRecord());
  };

  const handleChangeSchoolYear = (e, value) => {
    dispatch(setStudentRecord({ ...studentRecord, academic_year: value }));
  };

  const handleChangeDepartment = (e, value) => {
    const data = { ...studentRecord };
    data.college_track = null;
    data.program = null;
    data.level = null;
    dispatch(setStudentRecord({ ...data, department: value }));
  };
  const handleChangeCollegeOrTrack = (e, value) => {
    const data = { ...studentRecord };
    data.program = null;
    data.level = null;
    dispatch(setStudentRecord({ ...data, college_track: value }));
  };
  const handleChangeProgram = (e, value) => {
    dispatch(setStudentRecord({ ...studentRecord, program: value }));
  };
  const handleChangeLevel = (e, value) => {
    dispatch(setStudentRecord({ ...studentRecord, level: value }));
  };
  const handleChangeSemester = (e, value) => {
    dispatch(setStudentRecord({ ...studentRecord, semester: value }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === studentRecord?.department?._id
    );
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === studentRecord?.department?._id &&
        year_level.remarks === 'Active'
    );
    if (studentRecord?.department) {
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
        program?.college_track?._id === studentRecord?.college_track?._id &&
        program.isArchived === false
    );
    if (studentRecord?.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    getFilteredDepartment();
  }, [studentRecord?.department]);

  useEffect(() => {
    getFilteredProgram();
  }, [studentRecord?.college_track]);

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    dispatch(getAllYearLevels());

    if (subject_type === 'K12Subject') {
      dispatch(getAllK12Subjects());
    } else if (subject_type === 'CollegeSubject') {
      dispatch(getAllCollegeSubjects());
    } else if (subject_type === 'TESDACourse') {
      dispatch(getAllTesdaCourses());
    }
  }, [dispatch]);

  return (
    <Dialog fullWidth open={isAddingStudentRecord} onClose={handleClose}>
      <DialogTitle fontSize={18}>Generate Record</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="select-school-year"
              options={
                academic_years.map((item) => ({
                  _id: item._id,
                  school_year: item.school_year,
                })) || []
              }
              getOptionLabel={(academic_year) => academic_year.school_year}
              renderOption={(props, academic_year, { selected }) => (
                <li {...props}>{academic_year.school_year}</li>
              )}
              onChange={handleChangeSchoolYear}
              isOptionEqualToValue={customIsOptionEqualToValue}
              value={studentRecord?.academic_year || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="School Year"
                  placeholder="Select a School Year"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="select-department"
              options={
                filteredDepartments
                  .filter((department) => department.remarks === 'Active')
                  .map((item) => ({
                    _id: item._id,
                    department_name: item.department_name,
                  })) || []
              }
              getOptionLabel={(department) => department.department_name}
              renderOption={(props, department, { selected }) => (
                <li {...props}>{department.department_name}</li>
              )}
              onChange={handleChangeDepartment}
              isOptionEqualToValue={customIsOptionEqualToValue}
              value={studentRecord?.department || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  placeholder="Select a Department"
                />
              )}
            />
          </Grid>
          {departmentWithPrograms.includes(
            studentRecord.department?.department_name
          ) && (
            <>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="select-college-track"
                  options={
                    filteredCollegeTrack.map((item) => ({
                      _id: item._id,
                      college_track_name: item.college_track_name,
                    })) || []
                  }
                  getOptionLabel={(college_track) =>
                    college_track.college_track_name
                  }
                  renderOption={(props, college_track, { selected }) => (
                    <li {...props}>{college_track.college_track_name}</li>
                  )}
                  onChange={handleChangeCollegeOrTrack}
                  isOptionEqualToValue={customIsOptionEqualToValue}
                  value={studentRecord?.college_track || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College/Track"
                      placeholder="Select a College or Track"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="select-program"
                  options={
                    filteredPrograms.map((item) => ({
                      _id: item._id,
                      program_name: item.program_name,
                    })) || []
                  }
                  getOptionLabel={(program) => program.program_name}
                  renderOption={(props, program, { selected }) => (
                    <li {...props}>{program.program_name}</li>
                  )}
                  onChange={handleChangeProgram}
                  isOptionEqualToValue={customIsOptionEqualToValue}
                  value={studentRecord?.program || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Program"
                      placeholder="Select a Program"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="select-semester"
                  options={
                    semesters.map((item) => ({
                      _id: item._id,
                      semester_term: item.semester_term,
                    })) || []
                  }
                  getOptionLabel={(semester) => semester.semester_term}
                  renderOption={(props, semester, { selected }) => (
                    <li {...props}>{semester.semester_term}</li>
                  )}
                  onChange={handleChangeSemester}
                  isOptionEqualToValue={customIsOptionEqualToValue}
                  value={studentRecord?.semester || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Semester"
                      placeholder="Select a Semester"
                    />
                  )}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6}>
            <Autocomplete
              id="select-level"
              options={
                filteredLevels.map((item) => ({
                  _id: item._id,
                  year_level_name: item.year_level_name,
                })) || []
              }
              getOptionLabel={(year_level) => year_level.year_level_name}
              renderOption={(props, year_level, { selected }) => (
                <li {...props}>{year_level.year_level_name}</li>
              )}
              onChange={handleChangeLevel}
              isOptionEqualToValue={customIsOptionEqualToValue}
              value={studentRecord?.level || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Level"
                  placeholder="Select a Level"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingStudentRecord ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentRecordModal;
