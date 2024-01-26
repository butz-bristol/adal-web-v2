import {
  barangays,
  city_mun,
  provinces,
  regions,
} from 'phil-reg-prov-mun-brgy';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
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

import {
  departmentWithPrograms,
  nationalities,
  sexualOrientation,
} from 'src/utils/helperFunctions';

const StudentInformation = ({
  applicant,
  formIndex,
  setApplicant,
  deleteField,
}) => {
  const { college_tracks, year_levels, departments } = useSelector(
    (state) => state.registrar
  );
  const { programs } = useSelector((state) => state.academics);

  const [filteredCollegeTrack, setFilteredCollegeTrack] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const selectedRegion = regions?.find(
    (r) => r.reg_code === applicant.region?.reg_code
  )?.reg_code;
  const selectedProvince = provinces?.find(
    (p) => p.prov_code === applicant.province?.prov_code
  )?.prov_code;
  const selectedMunicipality = city_mun?.find(
    (m) => m.mun_code === applicant.municipality?.mun_code
  )?.mun_code;

  const departmentName = departments.find(
    (department) => department?._id === applicant.student_department?._id
  )?.department_name;

  const handleChange = (e) => {
    if (e.target.name === 'student_department') {
      deleteField(formIndex, 'student_college_track');
      deleteField(formIndex, 'student_program');
      deleteField(formIndex, 'student_yearlevel');
      deleteField(formIndex, 'student_returnee_status');
      deleteField(formIndex, 'student_esc_grant_status');
      deleteField(formIndex, 'student_shs_voucher_status');
    }
    if (e.target.name === 'student_college_track') {
      deleteField(formIndex, 'student_program');
      deleteField(formIndex, 'student_yearlevel');
    }
    setApplicant(formIndex, [e.target.name], { _id: e.target.value });
  };

  const handleCheckSameAddress = (e) => {
    if (!applicant?.student_present_address) {
      toast.error('Please input your Residential Address');
      return;
    } else {
      e.target.checked && deleteField(formIndex, 'student_permanent_address');
      setApplicant(formIndex, 'student_same_address', e.target.checked);
    }
  };

  const handleChangeRegion = (e, value) => {
    deleteField(formIndex, 'province');
    deleteField(formIndex, 'municipality');
    deleteField(formIndex, 'barangay');
    setApplicant(formIndex, 'region', value);
  };
  const handleChangeProvince = (e, value) => {
    deleteField(formIndex, 'municipality');
    deleteField(formIndex, 'barangay');
    setApplicant(formIndex, 'province', value);
  };
  const handleChangeMunicipality = (e, value) => {
    deleteField(formIndex, 'barangay');
    setApplicant(formIndex, 'municipality', value);
  };
  const handleChangeBarangay = (e, value) => {
    setApplicant(formIndex, 'barangay', value);
  };
  const handleChangeNationality = (e, value) => {
    setApplicant(formIndex, 'student_nationality', value);
  };

  const handleToggleChange = (e) => {
    if (e.target.name === 'student_esc_grant_status') {
      setApplicant(
        formIndex,
        [e.target.name],
        !applicant?.student_esc_grant_status
      );
    }
    if (e.target.name === 'student_returnee_status') {
      if (applicant?.student_returnee_status === false) {
        deleteField(formIndex, 'old_student_number');
        deleteField(formIndex, 'student_returnee_status');
        deleteField(formIndex, 'student_last_school_attended');
        deleteField(formIndex, 'student_last_school_year_attended');
      }
      setApplicant(
        formIndex,
        [e.target.name],
        !applicant?.student_returnee_status
      );
    }
    if (e.target.name === 'student_pwd_status') {
      setApplicant(formIndex, [e.target.name], !applicant?.student_pwd_status);
    }
    if (e.target.name === 'student_shs_voucher_status') {
      setApplicant(
        formIndex,
        [e.target.name],
        !applicant?.student_shs_voucher_status
      );
    }
  };

  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  const handleInput = (e) => {
    setApplicant(formIndex, [e.target.name], e.target.value);
  };

  const getFilteredDepartment = () => {
    const filteredCollegeTrack = college_tracks.filter(
      (college_track) =>
        college_track.department._id === applicant?.student_department?._id
    );
    if (applicant.student_department) {
      setFilteredCollegeTrack(filteredCollegeTrack);
      departmentWithPrograms.indexOf(departmentName) === -1 &&
        setFilteredCollegeTrack([]);
      setFilteredPrograms([]);
    }
  };

  const getFilteredProgram = () => {
    const filteredProgramsByCollegeTrack = programs.filter(
      (program) =>
        program?.college_track?._id === applicant?.student_college_track?._id &&
        program.isArchived === false
    );
    if (applicant.student_college_track) {
      setFilteredPrograms(filteredProgramsByCollegeTrack);
    }
  };

  useEffect(() => {
    const filteredLevelsByDepartment = year_levels.filter(
      (year_level) =>
        year_level?.department?._id === applicant?.student_department?._id &&
        year_level.remarks === 'Active'
    );
    setFilteredLevels(filteredLevelsByDepartment);
    getFilteredDepartment();
  }, [applicant?.student_department]);

  useEffect(() => {
    getFilteredProgram();
  }, [applicant?.student_college_track]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">
              Student Information
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <ToggleButtonGroup
              exclusive
              color="secondary"
              value={applicant?.student_type || ''}
              onChange={handleToggleChange}
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
              value={applicant?.student_department?._id || ''}
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
                  name="student_college_track"
                  value={
                    (filteredCollegeTrack.length > 0 &&
                      applicant.student_college_track?._id) ||
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
                      applicant.student_program?._id) ||
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
                  applicant.student_yearlevel?._id) ||
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
        {applicant.student_type === 'Transferee' && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>Are you a returnee?</Typography>
              <RadioGroup
                row
                name="student_returnee_status"
                value={applicant.student_returnee_status ? 'Yes' : 'No' || ''}
                onChange={handleToggleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
        {applicant.student_returnee_status && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Student Number"
                helperText="Please enter your Old Student Number"
                value={applicant.old_student_number || ''}
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
                value={applicant.student_last_school_attended || ''}
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
                value={applicant.student_last_school_year_attended || ''}
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
                value={applicant.student_esc_grant_status ? 'Yes' : 'No' || ''}
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
                  applicant.student_shs_voucher_status ? 'Yes' : 'No' || ''
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
            value={applicant.student_last_name || ''}
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
            value={applicant.student_first_name || ''}
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
            value={applicant.student_middle_name || ''}
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
              value={applicant.student_gender || ''}
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
              value={applicant.student_pwd_status ? 'Yes' : 'No' || ''}
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
              value={applicant.student_birthdate || ''}
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
            value={applicant.student_nationality || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nationality"
                placeholder="Choose a Nationality"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="select-sexual-orientation">
              Sexual Orientation
            </InputLabel>
            <Select
              id="select-sexual-orientation"
              label="Sexual Orientation"
              name="student_sexual_orientation"
              value={applicant.student_sexual_orientation || ''}
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
              value={applicant.student_civil_status || ''}
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
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">
              Contact Information
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label="Mobile Number"
            onChange={handleInput}
            name="student_contact_number"
            value={applicant.student_contact_number || ''}
            variant="outlined"
            placeholder="09xx-xxx-xxxx"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            type="email"
            label="Personal Email Address"
            onChange={handleInput}
            variant="outlined"
            name="student_personal_email"
            value={applicant.student_personal_email || ''}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            type="text"
            label="Zip Code"
            onChange={handleInput}
            name="zip_code"
            value={applicant.zip_code || ''}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            id="select-region"
            options={regions || []}
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeRegion}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={applicant.region || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Region"
                placeholder="Choose a Region"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            id="select-province"
            options={
              provinces.filter(
                (province) => province.reg_code === selectedRegion
              ) || []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeProvince}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={applicant.province || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Province"
                placeholder="Choose a Province"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            id="select-municipality"
            options={
              city_mun.filter(
                (municipality) => municipality.prov_code === selectedProvince
              ) || []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeMunicipality}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={applicant.municipality || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Municipality"
                placeholder="Choose a Municipality"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            id="select-barangay"
            options={
              barangays.filter(
                (barangay) => barangay.mun_code === selectedMunicipality
              ) || []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeBarangay}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={applicant.barangay || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Barangay"
                placeholder="Choose a Barangay"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            label="Present Address"
            placeholder="House/BLock/Lot No., Street, Village/Subdivision"
            onChange={handleInput}
            name="student_present_address"
            value={applicant.student_present_address || ''}
            variant="outlined"
            rows={2}
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          {applicant?.student_same_address === false && (
            <TextField
              fullWidth
              type="text"
              label="Permanent Address"
              placeholder="House/BLock/Lot No., Street, Village/Subdivision"
              onChange={handleInput}
              name="student_permanent_address"
              value={applicant.student_permanent_address || ''}
              variant="outlined"
              rows={2}
              multiline
            />
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckSameAddress}
                  checked={applicant?.student_same_address}
                />
              }
              label="Same with Present Address?"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentInformation;
