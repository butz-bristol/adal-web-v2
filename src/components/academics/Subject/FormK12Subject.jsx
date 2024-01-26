import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setK12Subject } from 'src/features/academicFeatures/academicSlice';
import {
  departmentWithPrograms,
  k12Departments,
} from 'src/utils/helperFunctions';

const FormK12Subject = () => {
  const dispatch = useDispatch();

  const { programs, k12Subject, subjectTypes } = useSelector(
    (state) => state.academics
  );
  const { college_tracks, year_levels, semesters, departments } = useSelector(
    (state) => state.registrar
  );
  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const departmentName = departments.find(
    (department) => department?._id === k12Subject?.department?._id
  )?.department_name;

  const handleChange = (e) => {
    const data = { ...k12Subject };
    if (e.target.name === 'department') {
      data.college_track = null;
      data.program = null;
      data.level = null;
    } else if (e.target.name === 'college_track') {
      data.program = null;
      data.level = null;
    }
    dispatch(
      setK12Subject({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleInput = (e) => {
    dispatch(setK12Subject({ ...k12Subject, [e.target.name]: e.target.value }));
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === k12Subject?.department?._id
    );
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === k12Subject?.department?._id &&
        year_level.remarks === 'Active'
    );
    if (k12Subject?.department) {
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
        program?.college_track?._id === k12Subject?.college_track?._id &&
        program.isArchived === false
    );
    if (k12Subject?.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    getFilteredDepartment();
  }, [k12Subject?.department]);

  useEffect(() => {
    getFilteredProgram();
  }, [k12Subject?.college_track]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField
            required
            label="Subject Name"
            name="subject_name"
            onChange={handleInput}
            value={k12Subject?.subject_name || ''}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField
            required
            label="Position"
            name="position"
            onChange={handleInput}
            value={k12Subject?.position || ''}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-department">Department</InputLabel>
          <Select
            id="select-department"
            label="Department"
            name="department"
            value={k12Subject?.department?._id || ''}
            onChange={handleChange}
          >
            {departments
              .filter(
                (department) =>
                  department.remarks === 'Active' &&
                  k12Departments.includes(department?.department_name)
              )
              .map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department?.department_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      {departmentWithPrograms.indexOf(departmentName) !== -1 && (
        <Fragment>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-subject-type">Subject Type</InputLabel>
              <Select
                id="select-subject-type"
                label="Subject Type"
                name="subject_type"
                value={k12Subject?.subject_type?._id || ''}
                onChange={handleInput}
              >
                {subjectTypes.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item?.subject_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-college-track">Track</InputLabel>
              <Select
                id="select-college-track"
                label="Track"
                name="college_track"
                value={k12Subject?.college_track?._id || ''}
                onChange={handleChange}
                required
              >
                {filteredCollegeTrack.map((college_track) => (
                  <MenuItem key={college_track._id} value={college_track._id}>
                    {college_track.college_track_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-program">Programs</InputLabel>
              <Select
                id="select-program"
                label="Programs"
                name="program"
                value={
                  (filteredPrograms.length > 0 && k12Subject?.program?._id) ||
                  ''
                }
                onChange={handleChange}
                required
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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-semester">Semester</InputLabel>
              <Select
                id="select-semester"
                label="Semester"
                name="semester"
                value={k12Subject?.semester?._id || ''}
                onChange={handleChange}
                required
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester._id} value={semester._id}>
                    {semester.semester_term}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Fragment>
      )}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-level">Levels</InputLabel>
          <Select
            id="select-level"
            label="Levels"
            name="level"
            value={(filteredLevels.length > 0 && k12Subject?.level?._id) || ''}
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
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-remarks">Remarks</InputLabel>
          <Select
            id="select-remarks"
            label="Remarks"
            name="remarks"
            value={k12Subject?.remarks || ''}
            onChange={handleInput}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={12}>
        <TextField
          fullWidth
          type="text"
          label="Description"
          name="subject_description"
          value={k12Subject?.subject_description || ''}
          onChange={handleInput}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
    </Grid>
  );
};

export default FormK12Subject;
