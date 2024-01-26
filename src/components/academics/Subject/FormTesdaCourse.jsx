import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTesdaCourse } from 'src/features/academicFeatures/academicSlice';
import { courseType } from 'src/utils/helperFunctions';

const FormTesdaCourse = () => {
  const dispatch = useDispatch();

  const { programs, tesdaCourse, isAddingTesdaCourse, isEditingTesdaCourse } =
    useSelector((state) => state.academics);
  const { college_tracks, year_levels, semesters, departments } = useSelector(
    (state) => state.registrar
  );
  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const handleChange = (e) => {
    const data = { ...tesdaCourse };
    if (e.target.name === 'department') {
      data.college_track = null;
      data.program = null;
      data.year_level = null;
    } else if (e.target.name === 'college_track') {
      data.program = null;
      data.year_level = null;
    }
    dispatch(
      setTesdaCourse({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleInput = (e) => {
    dispatch(
      setTesdaCourse({ ...tesdaCourse, [e.target.name]: e.target.value })
    );
  };

  const getFilteredDepartment = () => {
    const selectedDepartment = departments.find(
      (d) =>
        d.department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
    )?._id;
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) => college_track.department._id === selectedDepartment
    );
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === selectedDepartment &&
        year_level.remarks === 'Active'
    );
    setFilteredCollegeTrack(filteredCollegeTrack);
    setFilteredLevels(filteredLevelsByDepartment);
  };

  const getFilteredProgram = () => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id === tesdaCourse?.college_track?._id &&
        program.isArchived === false
    );
    if (tesdaCourse?.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    getFilteredDepartment();
  }, [tesdaCourse]);

  useEffect(() => {
    getFilteredProgram();
  }, [tesdaCourse?.college_track]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField
            required
            label="Course Name"
            name="course_name"
            onChange={handleInput}
            value={tesdaCourse?.course_name || ''}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-course-type">Course Type</InputLabel>
          <Select
            labelId="select-course-type"
            id="select-course-type"
            name="course_type"
            value={tesdaCourse?.course_type || ''}
            label="Course Type"
            onChange={handleInput}
            variant="outlined"
          >
            {courseType.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-college-track">College/Track</InputLabel>
          <Select
            id="select-college-track"
            label="College/Track"
            name="college_track"
            value={tesdaCourse?.college_track?._id || ''}
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
              (filteredPrograms.length > 0 && tesdaCourse?.program?._id) || ''
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
            value={tesdaCourse?.semester?._id || ''}
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
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-level">Levels</InputLabel>
          <Select
            id="select-level"
            label="Levels"
            name="year_level"
            value={
              (filteredLevels.length > 0 && tesdaCourse?.year_level?._id) || ''
            }
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
          <TextField
            label="Course Code"
            name="course_code"
            value={tesdaCourse?.course_code || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="COL101"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField
            label="Duration (in hours)"
            name="course_total_hours"
            value={tesdaCourse?.course_total_hours || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="300"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-remarks">Remarks</InputLabel>
          <Select
            id="select-remarks"
            label="Remarks"
            name="remarks"
            value={tesdaCourse?.remarks || ''}
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
          name="course_description"
          value={tesdaCourse?.course_description || ''}
          onChange={handleInput}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
    </Grid>
  );
};

export default FormTesdaCourse;
