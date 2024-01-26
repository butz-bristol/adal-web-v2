import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntSwitchComponent from 'src/components/utilities/AntSwitch';
import { setCollegeSubject } from 'src/features/academicFeatures/academicSlice';
import { courseType } from 'src/utils/helperFunctions';

const FormCollegeSubject = () => {
  const dispatch = useDispatch();

  const { programs, collegeSubjects, collegeSubject, subjectTypes } =
    useSelector((state) => state.academics);
  const { college_tracks, year_levels, semesters, departments } = useSelector(
    (state) => state.registrar
  );
  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const preRequisiteSubjects = collegeSubjects
    .filter((subject) => {
      if (collegeSubject?.program?._id) {
        return (
          subject?.isPreRequisite &&
          subject.program._id === collegeSubject?.program?._id &&
          subject._id !== collegeSubject?._id
        );
      }
      return subject?.isPreRequisite && subject._id !== collegeSubject?._id;
    })
    .map((subject) => ({
      _id: subject._id,
      course_name: subject.course_name,
      course_code: subject.course_code,
    }));
  const coRequisiteSubjects = collegeSubjects
    .filter((subject) => {
      if (collegeSubject?.program?._id) {
        return (
          subject?.isCoRequisite &&
          subject.program._id === collegeSubject?.program?._id &&
          subject._id !== collegeSubject?._id
        );
      }
      return subject?.isCoRequisite && subject._id !== collegeSubject?._id;
    })
    .map((subject) => ({
      _id: subject._id,
      course_name: subject.course_name,
      course_code: subject.course_code,
    }));

  const togglePreRequisites = () => {
    dispatch(
      setCollegeSubject({
        ...collegeSubject,
        hasPreRequisites: !collegeSubject?.hasPreRequisites,
      })
    );
  };
  const toggleCoRequisites = () => {
    dispatch(
      setCollegeSubject({
        ...collegeSubject,
        hasCoRequisites: !collegeSubject?.hasCoRequisites,
      })
    );
  };
  const isGWAIncluded = () => {
    dispatch(
      setCollegeSubject({
        ...collegeSubject,
        isGWAIncluded: !collegeSubject?.isGWAIncluded,
      })
    );
  };
  const isPreRequisite = () => {
    dispatch(
      setCollegeSubject({
        ...collegeSubject,
        isPreRequisite: !collegeSubject?.isPreRequisite,
      })
    );
  };
  const isCoRequisite = () => {
    dispatch(
      setCollegeSubject({
        ...collegeSubject,
        isCoRequisite: !collegeSubject?.isCoRequisite,
      })
    );
  };
  const handleAutocompletePreRequisites = (e, ids) => {
    dispatch(setCollegeSubject({ ...collegeSubject, pre_requisites: ids }));
  };
  const handleAutocompleteCoRequisites = (e, ids) => {
    dispatch(setCollegeSubject({ ...collegeSubject, co_requisites: ids }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  const handleChange = (e) => {
    const data = { ...collegeSubject };
    if (e.target.name === 'department') {
      data.college_track = null;
      data.program = null;
      data.year_level = null;
    } else if (e.target.name === 'college_track') {
      data.program = null;
      data.year_level = null;
    }
    dispatch(
      setCollegeSubject({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleInput = (e) => {
    dispatch(
      setCollegeSubject({ ...collegeSubject, [e.target.name]: e.target.value })
    );
  };

  const getFilteredDepartment = () => {
    const selectedDepartment = departments.find(
      (d) => d.department_name === 'College'
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
        program?.college_track?._id === collegeSubject?.college_track?._id &&
        program.isArchived === false
    );
    if (collegeSubject?.college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    getFilteredDepartment();
  }, [collegeSubject]);

  useEffect(() => {
    getFilteredProgram();
  }, [collegeSubject?.college_track]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <TextField
            required
            label="Course Name"
            name="course_name"
            onChange={handleInput}
            value={collegeSubject?.course_name || ''}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-course-type">Course Type</InputLabel>
          <Select
            labelId="select-course-type"
            id="select-course-type"
            name="course_type"
            value={collegeSubject?.course_type || ''}
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-subject-type">Subject Type</InputLabel>
          <Select
            id="select-subject-type"
            label="Subject Type"
            name="subject_type"
            value={collegeSubject?.subject_type?._id || ''}
            onChange={handleChange}
          >
            {subjectTypes.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item?.subject_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={collegeSubject?.isGWAIncluded ?? false}
                onClick={() => isGWAIncluded(!collegeSubject?.isGWAIncluded)}
              />
            }
            label="Is GWA Included?"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={collegeSubject?.isPreRequisite ?? false}
                onClick={() => isPreRequisite(!collegeSubject?.isPreRequisite)}
              />
            }
            label="Subject is a Prerequisite?"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={collegeSubject?.isCoRequisite ?? false}
                onClick={() => isCoRequisite(!collegeSubject?.isCoRequisite)}
              />
            }
            label="Subject is a Corequisite?"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-college-track">College/Track</InputLabel>
          <Select
            id="select-college-track"
            label="College/Track"
            name="college_track"
            value={
              (filteredCollegeTrack.length > 0 &&
                collegeSubject?.college_track?._id) ||
              ''
            }
            onChange={handleChange}
            required
          >
            {filteredCollegeTrack &&
              filteredCollegeTrack.map((college_track) => (
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
              (filteredPrograms.length > 0 && collegeSubject?.program?._id) ||
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
                    {program.curriculum_ref?.curriculum_name} -{' '}
                    {program.program_name}
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
            value={collegeSubject?.semester?._id || ''}
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-level">Levels</InputLabel>
          <Select
            id="select-level"
            label="Levels"
            name="year_level"
            value={
              (filteredLevels.length > 0 && collegeSubject?.year_level?._id) ||
              ''
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <TextField
            label="Course Code"
            name="course_code"
            value={collegeSubject?.course_code || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="COL101"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <TextField
            label="Lecture Units"
            name="lecture_unit"
            value={collegeSubject?.lecture_unit || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="3"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <TextField
            label="Laboratory Units"
            name="laboratory_unit"
            value={collegeSubject?.laboratory_unit || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="3"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <TextField
            label="Total Units"
            name="course_unit"
            value={collegeSubject?.course_unit || ''}
            onChange={handleInput}
            variant="outlined"
            placeholder="3"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField
            label="Duration (in hours)"
            name="course_total_hours"
            value={collegeSubject?.course_total_hours || ''}
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
            value={collegeSubject?.remarks || ''}
            onChange={handleInput}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          label="Description"
          name="course_description"
          value={collegeSubject?.course_description || ''}
          onChange={handleInput}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
      <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="body1">Has Prerequisites</Typography>
            <Grid item>
              <AntSwitchComponent
                start="No"
                end="Yes"
                value={collegeSubject?.hasPreRequisites}
                onClick={() => togglePreRequisites()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {collegeSubject?.hasPreRequisites && (
            <Autocomplete
              multiple
              id="checkboxes-pre-requisites"
              options={preRequisiteSubjects}
              getOptionLabel={(subject) => subject?.course_code}
              renderOption={(props, subject, { selected }) => (
                <li {...props} key={subject._id}>
                  {subject?.course_code} - {subject?.course_name}
                </li>
              )}
              onChange={handleAutocompletePreRequisites}
              value={collegeSubject?.pre_requisites}
              isOptionEqualToValue={customIsOptionEqualToValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pre-Requisites"
                  placeholder="Choose a Subject"
                />
              )}
            />
          )}
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="body1">Has Corequisites</Typography>
            <Grid item>
              <AntSwitchComponent
                start="No"
                end="Yes"
                value={collegeSubject?.hasCoRequisites}
                onClick={() =>
                  toggleCoRequisites(!collegeSubject?.hasCoRequisites)
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {collegeSubject?.hasCoRequisites && (
            <Autocomplete
              multiple
              id="checkboxes-co-requisites"
              options={coRequisiteSubjects}
              disableCloseOnSelect
              getOptionLabel={(subject) => subject?.course_code}
              renderOption={(props, subject, { selected }) => (
                <li {...props} key={subject._id}>
                  {subject?.course_code} - {subject?.course_name}
                </li>
              )}
              onChange={handleAutocompleteCoRequisites}
              value={collegeSubject?.co_requisites}
              isOptionEqualToValue={customIsOptionEqualToValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Co-Requisites"
                  placeholder="Choose a Subject"
                />
              )}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormCollegeSubject;
