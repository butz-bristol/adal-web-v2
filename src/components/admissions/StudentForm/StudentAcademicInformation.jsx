import {
  Divider,
  FormControl,
  FormControlLabel,
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
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import { setStudent } from 'src/features/admissionsFeatures/admissionsSlice';
import {
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';
import { departmentWithPrograms } from 'src/utils/helperFunctions';

const StudentAcademicInformation = () => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.admissions);
  const { college_tracks, year_levels, departments } = useSelector(
    (state) => state.registrar
  );
  const { programs } = useSelector((state) => state.academics);
  const user_role =
    useSelector((state) => state.users?.user?.user_role) ?? null;

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const departmentName = departments.find(
    (department) => department?._id === student.student_department?._id
  )?.department_name;

  const handleChange = (e) => {
    const data = { ...student };
    if (e.target.name === 'student_department') {
      data.student_returnee_status = false;
      data.student_esc_grant_status = false;
      data.student_shs_voucher_status = false;
      data.student_college_track = null;
      data.student_program = null;
      data.student_yearlevel = null;
    }
    if (e.target.name === 'student_college_track') {
      data.student_program = null;
      data.student_yearlevel = null;
    }
    dispatch(setStudent({ ...data, [e.target.name]: { _id: e.target.value } }));
  };

  const handleInput = (e) => {
    const data = { ...student };
    dispatch(setStudent({ ...data, [e.target.name]: e.target.value }));
  };

  const handleToggleChange = (e) => {
    const data = { ...student };
    if (e.target.name === 'student_esc_grant_status') {
      dispatch(
        setStudent({
          ...data,
          [e.target.name]: !student?.student_esc_grant_status,
        })
      );
    }
    if (e.target.name === 'student_esc_grantee') {
      dispatch(
        setStudent({ ...data, [e.target.name]: !student?.student_esc_grantee })
      );
    }
    if (e.target.name === 'student_returnee_status') {
      if (student?.student_returnee_status === false) {
        delete data.old_student_number;
        delete data.student_last_school_attended;
        delete data.student_last_school_year_attended;
      }
      dispatch(
        setStudent({
          ...data,
          [e.target.name]: !student?.student_returnee_status,
        })
      );
    }
    if (e.target.name === 'student_pwd_status') {
      dispatch(
        setStudent({ ...data, [e.target.name]: !student?.student_pwd_status })
      );
    }
    if (e.target.name === 'student_shs_voucher_status') {
      dispatch(
        setStudent({
          ...data,
          [e.target.name]: !student?.student_shs_voucher_status,
        })
      );
    }
  };

  const handleChangeStudentType = (e) => {
    const data = { ...student };
    delete data.old_student_number;
    delete data.student_returnee_status;
    delete data.student_last_school_attended;
    delete data.student_last_school_year_attended;
    dispatch(setStudent({ ...data, student_type: e.target.value }));
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === student?.student_department?._id
    );
    if (student.student_department) {
      setFilteredCollegeTrack(filteredCollegeTrack);
      !departmentWithPrograms.includes(departmentName) &&
        setFilteredCollegeTrack([]);
      setFilteredPrograms([]);
    }
  };

  const getFilteredProgram = () => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id === student?.student_college_track?._id &&
        program.isArchived === false
    );
    if (student.student_college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === student?.student_department?._id &&
        year_level.remarks === 'Active'
    );
    setFilteredLevels(filteredLevelsByDepartment);
    getFilteredDepartment();
  }, [student?.student_department]);

  useEffect(() => {
    getFilteredProgram();
  }, [student?.student_college_track]);

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <form>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">
              Academic Information
            </Typography>
          </Divider>
        </Grid>
        {user_role === 'registrar admin' && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Student Number"
                helperText="Please enter your Student Number"
                value={student.student_number ?? ''}
                onChange={handleInput}
                name="student_number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Learners Reference Number"
                helperText="Please enter your Learners Reference Number"
                value={student.student_learners_reference_no ?? ''}
                onChange={handleInput}
                name="student_learners_reference_no"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                name="student_email"
                onChange={handleInput}
                value={student.student_email ?? ''}
                label="School Email"
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <ToggleButtonGroup
              exclusive
              color="secondary"
              value={student?.student_type || ''}
              onChange={handleChangeStudentType}
            >
              <ToggleButton value="Old">Old Student</ToggleButton>
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
              value={student.student_department?._id || ''}
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
                      student.student_college_track?._id) ||
                    ''
                  }
                  onChange={handleChange}
                >
                  {filteredCollegeTrack.length === 0 ? (
                    <MenuItem value="">No results found</MenuItem>
                  ) : (
                    filteredCollegeTrack.map((college_track) => (
                      <MenuItem
                        key={college_track._id}
                        value={college_track._id}
                      >
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
                      student.student_program?._id) ||
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
                (filteredLevels.length > 0 && student.student_yearlevel?._id) ||
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

        {student.student_type === 'Transferee' && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>Are you a returnee?</Typography>
              <RadioGroup
                row
                name="student_returnee_status"
                value={student.student_returnee_status ? 'Yes' : 'No' || ''}
                onChange={handleToggleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}

        {student.student_returnee_status && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Student Number"
                helperText="Please enter your Old Student Number"
                value={student.old_student_number || ''}
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
                value={student.student_last_school_attended || ''}
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
                value={student.student_last_school_year_attended || ''}
                variant="outlined"
              />
            </Grid>
          </>
        )}

        {departmentName === 'Junior High School' && (
          <Fragment>
            <Grid item xs={12}>
              <FormControl>
                <Typography>Did you apply for ESC Grant?</Typography>
                <RadioGroup
                  row
                  name="student_esc_grant_status"
                  value={student.student_esc_grant_status ? 'Yes' : 'No' || ''}
                  onChange={handleToggleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <Typography>Are you an ESC grantee?</Typography>
                <RadioGroup
                  row
                  name="student_esc_grantee"
                  value={student.student_esc_grantee ? 'Yes' : 'No' || ''}
                  onChange={handleToggleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Fragment>
        )}
        {departmentName === 'Senior High School' && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>Did you apply for SHS Voucher?</Typography>
              <RadioGroup
                row
                name="student_shs_voucher_status"
                value={student.student_shs_voucher_status ? 'Yes' : 'No' || ''}
                onChange={handleToggleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default StudentAcademicInformation;
