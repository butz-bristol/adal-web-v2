import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { setApplicant } from 'src/features/applicantFeatures/applicantSlice';
import {
  departmentWithPrograms,
  k12Departments,
  nationalities,
  sexualOrientation,
} from 'src/utils/helperFunctions';

const GeneralInformation = () => {
  const dispatch = useDispatch();

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const { newApplicant } = useSelector((state) => state.applicants);
  const { college_tracks, year_levels, departments } = useSelector(
    (state) => state.registrar
  );
  const { programs } = useSelector((state) => state.academics);

  const departmentName = departments.find(
    (department) => department?._id === newApplicant.student_department?._id
  )?.department_name;

  const handleChange = (e) => {
    const data = { ...newApplicant };
    if (e.target.name === 'student_department') {
      data.student_returnee_status = false;
      data.student_esc_grant_status = false;
      data.student_shs_voucher_status = false;
      delete data.student_college_track;
      delete data.student_program;
      delete data.student_yearlevel;
    }
    if (e.target.name === 'student_college_track') {
      delete data.student_program;
      delete data.student_yearlevel;
    }
    dispatch(
      setApplicant({ ...data, [e.target.name]: { _id: e.target.value } })
    );
  };

  const handleToggleChange = (e) => {
    const data = { ...newApplicant };
    if (e.target.name === 'student_esc_grant_status') {
      dispatch(
        setApplicant({
          ...data,
          [e.target.name]: !newApplicant?.student_esc_grant_status,
        })
      );
    }
    if (e.target.name === 'student_returnee_status') {
      if (newApplicant?.student_returnee_status === false) {
        delete data.old_student_number;
        delete data.student_last_school_attended;
        delete data.student_last_school_year_attended;
      }
      dispatch(
        setApplicant({
          ...data,
          [e.target.name]: !newApplicant?.student_returnee_status,
        })
      );
    }
    if (e.target.name === 'student_pwd_status') {
      dispatch(
        setApplicant({
          ...data,
          [e.target.name]: !newApplicant?.student_pwd_status,
        })
      );
    }
    if (e.target.name === 'student_shs_voucher_status') {
      dispatch(
        setApplicant({
          ...data,
          [e.target.name]: !newApplicant?.student_shs_voucher_status,
        })
      );
    }
  };

  const handleChangeStudentType = (e) => {
    const data = { ...newApplicant };
    delete data.old_student_number;
    delete data.student_returnee_status;
    delete data.student_last_school_attended;
    delete data.student_last_school_year_attended;
    dispatch(setApplicant({ ...data, student_type: e.target.value }));
  };

  const handleInput = (e) => {
    dispatch(
      setApplicant({ ...newApplicant, [e.target.name]: e.target.value })
    );
  };
  const handleChangeNationality = (e, value) => {
    dispatch(setApplicant({ ...newApplicant, student_nationality: value }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === newApplicant?.student_department?._id
    );
    if (newApplicant.student_department) {
      setFilteredCollegeTrack(filteredCollegeTrack);
      departmentWithPrograms.indexOf(departmentName) === -1 &&
        setFilteredCollegeTrack([]);
      setFilteredPrograms([]);
    }
  };

  const getFilteredProgram = () => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id ===
          newApplicant?.student_college_track?._id &&
        program.isArchived === false
    );
    if (newApplicant.student_college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === newApplicant?.student_department?._id &&
        year_level.remarks === 'Active'
    );
    setFilteredLevels(filteredLevelsByDepartment);
    getFilteredDepartment();
  }, [newApplicant?.student_department]);

  useEffect(() => {
    getFilteredProgram();
  }, [newApplicant?.student_college_track]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">Student Information</Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <ToggleButtonGroup
            exclusive
            color="secondary"
            value={newApplicant?.student_type || ''}
            onChange={handleChangeStudentType}
          >
            <ToggleButton value="New">New Student</ToggleButton>
            <ToggleButton value="Transferee">Transferee</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-department">Department</InputLabel>
          <Select
            id="select-department"
            label="Department"
            name="student_department"
            value={newApplicant.student_department?._id || ''}
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
      {departmentWithPrograms.includes(departmentName) && (
        <>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-college-track">College/Track</InputLabel>
              <Select
                id="select-college-track"
                label="College/Track"
                name="student_college_track"
                value={
                  (filteredCollegeTrack.length > 0 &&
                    newApplicant.student_college_track?._id) ||
                  ''
                }
                onChange={handleChange}
              >
                {filteredCollegeTrack.length === 0 ? (
                  <MenuItem value="">No results found</MenuItem>
                ) : (
                  filteredCollegeTrack.map((college_track) => (
                    <MenuItem key={college_track._id} value={college_track._id}>
                      {college_track.college_track_name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-program">Programs</InputLabel>
              <Select
                id="select-program"
                label="Programs"
                name="student_program"
                value={
                  (filteredPrograms.length > 0 &&
                    newApplicant.student_program?._id) ||
                  ''
                }
                onChange={handleChange}
              >
                {filteredPrograms.length === 0 ? (
                  <MenuItem value="">No results found</MenuItem>
                ) : (
                  filteredPrograms?.map((program) => (
                    <MenuItem key={program._id} value={program._id}>
                      {program.program_name}
                    </MenuItem>
                  ))
                )}
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
            name="student_yearlevel"
            value={
              (filteredLevels.length > 0 &&
                newApplicant.student_yearlevel?._id) ||
              ''
            }
            onChange={handleChange}
          >
            {filteredLevels.length === 0 ? (
              <MenuItem value="">No results found</MenuItem>
            ) : (
              filteredLevels.map((year_level) => (
                <MenuItem key={year_level._id} value={year_level._id}>
                  {year_level.year_level_name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
      {newApplicant.student_type === 'Transferee' && (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Are you a returnee?</Typography>
            <RadioGroup
              row
              name="student_returnee_status"
              value={newApplicant.student_returnee_status ? 'Yes' : 'No' || ''}
              onChange={handleToggleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      {newApplicant.student_returnee_status && (
        <>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Student Number"
              helperText="Please enter your Old Student Number"
              value={newApplicant.old_student_number || ''}
              onChange={handleInput}
              name="old_student_number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              type="text"
              label="Last School Attended"
              helperText="Please input your previous school"
              onChange={handleInput}
              name="student_last_school_attended"
              value={newApplicant.student_last_school_attended || ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              type="text"
              label="Last School Year"
              helperText="Please input your last school year attended"
              onChange={handleInput}
              name="student_last_school_year_attended"
              value={newApplicant.student_last_school_year_attended || ''}
              variant="outlined"
            />
          </Grid>
        </>
      )}
      {departmentName === 'Junior High School' && (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Did you apply for ESC Grant?</Typography>
            <RadioGroup
              row
              name="student_esc_grant_status"
              value={newApplicant.student_esc_grant_status ? 'Yes' : 'No' || ''}
              onChange={handleToggleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      {departmentName === 'Senior High School' && (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Did you apply for SHS Voucher?</Typography>
            <RadioGroup
              row
              name="student_shs_voucher_status"
              value={
                newApplicant.student_shs_voucher_status ? 'Yes' : 'No' || ''
              }
              onChange={handleToggleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={12} mt={5}>
        <Divider textAlign="left">
          <Typography textTransform="uppercase">
            Personal Information
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          type="text"
          label="Last name"
          onChange={handleInput}
          name="student_last_name"
          value={newApplicant.student_last_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          type="text"
          label="First name"
          onChange={handleInput}
          name="student_first_name"
          value={newApplicant.student_first_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          type="text"
          label="Middle name"
          onChange={handleInput}
          name="student_middle_name"
          value={newApplicant.student_middle_name || ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl>
          <FormLabel id="select-gender" color="secondary">
            Are you a Male or Female?
          </FormLabel>
          <RadioGroup
            name="student_gender"
            value={newApplicant.student_gender || ''}
            onChange={handleInput}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl>
          <FormLabel id="select-pwd-status" color="secondary">
            Are you a Person with Disabilities (PWD)?
          </FormLabel>
          <RadioGroup
            name="student_pwd_status"
            value={newApplicant.student_pwd_status ? 'Yes' : 'No' || ''}
            onChange={handleToggleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <TextField
            type="date"
            helperText="Please input your birthdate"
            onChange={handleInput}
            name="student_birthdate"
            value={newApplicant.student_birthdate || ''}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Autocomplete
          id="select-nationality"
          options={nationalities || ''}
          getOptionLabel={(nationality) => nationality}
          renderOption={(props, nationality, { selected }) => (
            <li {...props}>{nationality}</li>
          )}
          onChange={handleChangeNationality}
          isOptionEqualToValue={customIsOptionEqualToValue}
          value={newApplicant.student_nationality || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nationality"
              placeholder="Choose a Nationality"
            />
          )}
        />
      </Grid>
      {!k12Departments.includes(departmentName) && (
        <>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-sexual-orientation">
                Sexual Orientation
              </InputLabel>
              <Select
                id="select-sexual-orientation"
                label="Sexual Orientation"
                name="student_sexual_orientation"
                value={newApplicant.student_sexual_orientation || ''}
                onChange={handleInput}
              >
                {sexualOrientation.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-civil-status">Civil Status</InputLabel>
              <Select
                id="select-civil-status"
                label="Civil Status"
                name="student_civil_status"
                value={newApplicant.student_civil_status || ''}
                onChange={handleInput}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Separated">Separated</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default GeneralInformation;
