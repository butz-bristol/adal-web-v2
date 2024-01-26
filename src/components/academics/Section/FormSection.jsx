import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { setSection } from 'src/features/academicFeatures/academicSlice';

import { departmentWithPrograms } from 'src/utils/helperFunctions';

const FormSection = () => {
  const dispatch = useDispatch();

  const { section, programs, instructors } = useSelector(
    (state) => state.academics
  );
  const { academic_years, college_tracks, year_levels, departments } =
    useSelector((state) => state.registrar);

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const departmentName = departments.find(
    (department) => department?._id === section.department?._id
  )?.department_name;

  const handleChange = (e) => {
    const data = { ...section };
    if (e.target.name === 'department') {
      data.college_track = null;
      data.program = null;
      data.level = null;
      data.adviser = null;
    }
    if (e.target.name === 'college_track') {
      data.program = null;
      data.level = null;
    }
    if (e.target.name === 'adviser' && e.target.value === null) {
      data.adviser = null;
      dispatch(setSection({ ...data, [e.target.name]: e.target.value }));
      return;
    }
    dispatch(setSection({ ...data, [e.target.name]: { _id: e.target.value } }));
  };

  const handleInput = (e) => {
    dispatch(setSection({ ...section, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === section.department?._id
    );
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === section.department?._id &&
        year_level.remarks === 'Active'
    );
    if (section.department) {
      setFilteredLevels(filteredLevelsByDepartment);
      setFilteredCollegeTrack(filteredCollegeTrack);
      !departmentWithPrograms.includes(departmentName) &&
        setFilteredCollegeTrack([]);
      setFilteredPrograms([]);
    }
  }, [section.department, college_tracks, year_levels, departmentName]);

  useEffect(() => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id === section.college_track?._id &&
        program.isArchived === false
    );
    if (section.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  }, [section.college_track, programs]);

  return (
    <form>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              label="Section Name"
              name="section_name"
              onChange={handleInput}
              value={section.section_name || ''}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="select-year">Academic Year</InputLabel>
            <Select
              id="select-year"
              label="Academic Year"
              name="academic_year"
              onChange={handleInput}
              value={section.academic_year?._id || ''}
            >
              {academic_years.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.school_year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              label="Section Capacity"
              name="section_capacity"
              onChange={handleInput}
              value={section.section_capacity || ''}
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
              value={section.department?._id || ''}
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

        {departmentWithPrograms.indexOf(departmentName) !== -1 && (
          <>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-college-track">College/Track</InputLabel>
                <Select
                  id="select-college-track"
                  label="College/Track"
                  name="college_track"
                  value={
                    (filteredCollegeTrack.length > 0 &&
                      section.college_track?._id) ||
                    ''
                  }
                  onChange={handleChange}
                >
                  {filteredCollegeTrack &&
                    filteredCollegeTrack.map((college_track) => (
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-program">Programs</InputLabel>
                <Select
                  id="select-program"
                  label="Programs"
                  name="program"
                  value={
                    (filteredPrograms.length > 0 && section.program?._id) || ''
                  }
                  onChange={handleChange}
                >
                  {filteredPrograms &&
                    filteredPrograms
                      .filter((program) => program.isArchived === false)
                      .map((program) => (
                        <MenuItem key={program._id} value={program._id}>
                          {program.program_name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="select-level">Levels</InputLabel>
            <Select
              id="select-level"
              label="Levels"
              name="level"
              value={(filteredLevels.length > 0 && section.level?._id) || ''}
              onChange={handleChange}
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
            <InputLabel id="adviser-id">Adviser</InputLabel>
            <Select
              labelId="adviser-id"
              id="adviser-id"
              value={section.adviser?._id || ''}
              name="adviser"
              onChange={handleChange}
              label="Adviser"
            >
              {instructors ? (
                instructors
                  .filter((item) =>
                    item.teaching_department.some(
                      (department) => department._id === section.department?._id
                    )
                  )
                  .map((instructor) => (
                    <MenuItem key={instructor?._id} value={instructor?._id}>
                      {instructor?.first_name} {instructor?.last_name}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem value={null}>None</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormSection;
