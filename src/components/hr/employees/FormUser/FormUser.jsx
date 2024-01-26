import { DateTime } from 'luxon';
import {
  barangays,
  city_mun,
  provinces,
  regions,
} from 'phil-reg-prov-mun-brgy';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  bloodType,
  civilStatus,
  nationalities,
} from 'src/utils/helperFunctions';

import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingData from 'src/components/LoadingData';
import { setUser } from 'src/features/academicFeatures/academicSlice';

const FormUser = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const { user, supervisors, isAddingUser, isFetchingUsers } = useSelector(
    (state) => state.academics
  );
  const {
    designations,
    departments,
    roles,
    teacherDesignations,
    isFetchingDepartments,
    isFetchingDesignations,
    isFetchingTeacherDesignations,
    isFetchingRoles,
  } = useSelector((state) => state.coreHr);
  const departmentLevels =
    useSelector((state) => state.registrar.departments) ?? null;

  const [newTeachingDepartments, setNewTeachingDepartments] = useState(
    Array.isArray(user?.teaching_department) ? user?.teaching_department : []
  );
  const [newTeachingDesignation, setNewTeachingDesignation] = useState(
    Array.isArray(user?.teaching_designation) ? user?.teaching_designation : []
  );
  const [showPassword, setShowPassword] = useState(false);

  const selectedRegion = regions?.find(
    (r) => r.reg_code === user.region?.reg_code
  )?.reg_code;
  const selectedProvince = provinces?.find(
    (p) => p.prov_code === user.province?.prov_code
  )?.prov_code;
  const selectedMunicipality = city_mun?.find(
    (m) => m.mun_code === user.municipality?.mun_code
  )?.mun_code;
  const employeeAge = Math.round(
    DateTime.now().diff(DateTime.fromISO(user?.birth_date), 'years').years
  );

  const findDepartmentName = (id) => {
    return departmentLevels.find((item) => item?._id === id)?.abbreviation;
  };
  const findDesignationName = (id) => {
    return teacherDesignations.find((item) => item?._id === id)
      ?.designation_name;
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleInput = (e) => {
    dispatch(setUser({ ...user, [e.target.name]: e.target.value }));
  };
  const handleInputDepartments = (e) => {
    setNewTeachingDepartments(e.target.value);
  };
  const handleInputDesignation = (e) => {
    setNewTeachingDesignation(e.target.value);
  };
  const handleCheckboxAddress = (e) => {
    const data = { ...user };
    if (!user?.present_address) {
      toast.error('Please input your Residential Address');
      return;
    } else {
      e.target.checked && delete data.permanent_address;
      dispatch(setUser({ ...data, same_address_toggle: e.target.checked }));
    }
  };
  const handleChangeRegion = (e, value) => {
    const data = { ...user };
    delete data.province;
    delete data.municipality;
    delete data.barangay;
    dispatch(setUser({ ...data, region: value }));
  };
  const handleChangeProvince = (e, value) => {
    const data = { ...user };
    delete data.municipality;
    delete data.barangay;
    dispatch(setUser({ ...data, province: value }));
  };
  const handleChangeMunicipality = (e, value) => {
    const data = { ...user };
    delete data.barangay;
    dispatch(setUser({ ...data, municipality: value }));
  };
  const handleChangeBarangay = (e, value) => {
    const data = { ...user };
    dispatch(setUser({ ...data, barangay: value }));
  };
  const handleChangeNationality = (e, value) => {
    dispatch(setUser({ ...user, nationality: value }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  const toggleAdminDesignation = () => {
    const data = { ...user };
    data.admin_department = null;
    data.admin_designation = null;
    dispatch(
      setUser({
        ...data,
        admin_designation_toggle: !user?.admin_designation_toggle,
      })
    );
  };
  const toggleTeachingDesignation = () => {
    const data = { ...user };
    data.teaching_department = [];
    data.teaching_designation = [];
    dispatch(
      setUser({
        ...data,
        teaching_designation_toggle: !user?.teaching_designation_toggle,
      })
    );
  };
  const toggleSpecialDesignation = () => {
    const data = { ...user };
    data.special_department = null;
    data.special_designation = null;
    dispatch(
      setUser({
        ...data,
        special_designation_toggle: !user?.special_designation_toggle,
      })
    );
  };
  const toggleSupervisor = () => {
    dispatch(setUser({ ...user, supervisor: !user?.supervisor }));
  };

  useEffect(() => {
    dispatch(setUser({ ...user, teaching_department: newTeachingDepartments }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTeachingDepartments]);

  useEffect(() => {
    dispatch(
      setUser({ ...user, teaching_designation: newTeachingDesignation })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTeachingDesignation]);

  return (
    <Stack>
      {isFetchingDesignations ||
      isFetchingDepartments ||
      isFetchingUsers ||
      isFetchingTeacherDesignations ||
      isFetchingRoles ? (
        <LoadingData />
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography textTransform="uppercase">
                  Personal Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="First Name"
                  type="text"
                  name="first_name"
                  onChange={handleInput}
                  value={user.first_name || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Middle Name"
                  type="text"
                  name="middle_name"
                  onChange={handleInput}
                  value={user.middle_name || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Last Name"
                  type="text"
                  name="last_name"
                  onChange={handleInput}
                  value={user.last_name || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Employee ID"
                  type="text"
                  name="employee_id"
                  onChange={handleInput}
                  value={user.employee_id || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={user.email || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Personal Email"
                  type="email"
                  name="personal_email"
                  onChange={handleInput}
                  value={user.personal_email || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="select-gender" color="secondary">
                  Are you a Male or Female?
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={user.gender || ''}
                  onChange={handleInput}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Religion"
                  type="text"
                  name="religion"
                  onChange={handleInput}
                  value={user.religion || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="birth-date">Birth Date *</InputLabel>
                <OutlinedInput
                  required
                  id="birth-date"
                  type="date"
                  label="Birth Date"
                  onChange={handleInput}
                  name="birth_date"
                  value={
                    user.birth_date &&
                    DateTime.fromISO(user.birth_date).toFormat('yyyy-MM-dd')
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Age"
                  type="number"
                  name="age"
                  onChange={handleInput}
                  value={employeeAge || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="select-civil-status">Civil Status</InputLabel>
                <Select
                  required
                  id="select-civil-status"
                  label="Civil Status"
                  name="civil_status"
                  onChange={handleInput}
                  value={user.civil_status || ''}
                >
                  {civilStatus.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="select-blood-type">Blood Type</InputLabel>
                <Select
                  required
                  id="select-blood-type"
                  label="Blood Type"
                  name="blood_type"
                  onChange={handleInput}
                  value={user.blood_type || ''}
                >
                  {bloodType.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Phone"
                  type="text"
                  name="phone"
                  onChange={handleInput}
                  value={user.phone || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Secondary Phone"
                  type="text"
                  name="secondary_phone"
                  onChange={handleInput}
                  value={user.secondary_phone || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="select-nationality"
                options={nationalities || ''}
                getOptionLabel={(nationality) => nationality}
                renderOption={(props, nationality, { selected }) => (
                  <li {...props}>{nationality}</li>
                )}
                onChange={handleChangeNationality}
                isOptionEqualToValue={customIsOptionEqualToValue}
                value={user.nationality || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nationality"
                    placeholder="Choose a Nationality"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Zip Code"
                  type="text"
                  name="zip_code"
                  onChange={handleInput}
                  value={user.zip_code || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                required
                id="select-region"
                options={regions || []}
                getOptionLabel={(item) => item.name}
                renderOption={(props, item, { selected }) => (
                  <li {...props}>{item.name}</li>
                )}
                onChange={handleChangeRegion}
                isOptionEqualToValue={customIsOptionEqualToValue}
                value={user.region || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Region"
                    placeholder="Choose a Region"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                required
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
                value={user.province || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Province"
                    placeholder="Choose a Province"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                required
                id="select-municipality"
                options={
                  city_mun.filter(
                    (municipality) =>
                      municipality.prov_code === selectedProvince
                  ) || []
                }
                getOptionLabel={(item) => item.name}
                renderOption={(props, item, { selected }) => (
                  <li {...props}>{item.name}</li>
                )}
                onChange={handleChangeMunicipality}
                isOptionEqualToValue={customIsOptionEqualToValue}
                value={user.municipality || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Municipality"
                    placeholder="Choose a Municipality"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                required
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
                value={user.barangay || null}
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
                required
                fullWidth
                type="text"
                label="Present Address"
                placeholder="House/BLock/Lot No., Street, Village/Subdivision"
                onChange={handleInput}
                name="present_address"
                value={user.present_address || ''}
                variant="outlined"
                rows={2}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              {user?.same_address_toggle === false && (
                <TextField
                  fullWidth
                  type="text"
                  label="Permanent Address"
                  placeholder="House/BLock/Lot No., Street, Village/Subdivision"
                  onChange={handleInput}
                  name="permanent_address"
                  value={user.permanent_address || ''}
                  variant="outlined"
                  rows={2}
                  multiline
                />
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxAddress}
                    checked={user.same_address_toggle || false}
                  />
                }
                label="Same with Present Address?"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography textTransform="uppercase">
                  Account Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.admin_designation_toggle}
                      onChange={() =>
                        toggleAdminDesignation(!user.admin_designation_toggle)
                      }
                    />
                  }
                  label="Admin Designation"
                  labelPlacement="end"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.teaching_designation_toggle}
                      onChange={() =>
                        toggleTeachingDesignation(
                          !user.teaching_designation_toggle
                        )
                      }
                    />
                  }
                  label="Teaching Designation"
                  labelPlacement="end"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.special_designation_toggle}
                      onChange={() =>
                        toggleSpecialDesignation(
                          !user.special_designation_toggle
                        )
                      }
                    />
                  }
                  label="Special Designation"
                  labelPlacement="end"
                />
              </FormGroup>
            </Grid>
            {user.admin_designation_toggle && (
              <>
                <Grid item xs={12}>
                  <Typography variant="overline">Admin Designation</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-admin-department">
                      Admin Department
                    </InputLabel>
                    <Select
                      required
                      id="select-admin-department"
                      label="Admin Department"
                      name="admin_department"
                      onChange={handleInput}
                      value={user.admin_department || ''}
                    >
                      {departments.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-admin-designation">
                      Admin Designation
                    </InputLabel>
                    <Select
                      required
                      id="select-admin-designation"
                      label="Admin Designation"
                      name="admin_designation"
                      onChange={handleInput}
                      value={user.admin_designation || ''}
                    >
                      <MenuItem value="">Select a Department</MenuItem>
                      {designations
                        .filter(
                          (item) =>
                            item.department_id?._id === user.admin_department
                        )
                        .map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.designation_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            {user.teaching_designation_toggle && (
              <>
                <Grid item xs={12}>
                  <Typography variant="overline" mr={1}>
                    Teaching Department:
                  </Typography>
                  {newTeachingDepartments.map((item) => (
                    <Chip
                      key={item}
                      size="small"
                      label={findDepartmentName(item)}
                      color="secondary"
                      sx={{ mr: 1 }}
                    />
                  ))}
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-departments">Departments</InputLabel>
                    <Select
                      id="select-departments"
                      label="Department"
                      name="departments"
                      input={<OutlinedInput label="Departments" />}
                      value={newTeachingDepartments}
                      onChange={handleInputDepartments}
                      multiple
                    >
                      {departmentLevels
                        .filter((item) => item.remarks === 'Active')
                        .map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item?.department_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-teaching-designation">
                      Designation
                    </InputLabel>
                    <Select
                      id="select-teaching-designation"
                      label="Designation"
                      name="designations"
                      input={<OutlinedInput label="Departments" />}
                      value={newTeachingDesignation}
                      onChange={handleInputDesignation}
                      multiple
                    >
                      {teacherDesignations.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item?.designation_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="overline" mr={1}>
                    Teaching Designation:
                  </Typography>
                  {newTeachingDesignation.map((item) => (
                    <Chip
                      key={item}
                      size="small"
                      label={findDesignationName(item)}
                      color="secondary"
                      sx={{ mr: 1 }}
                    />
                  ))}
                </Grid>
              </>
            )}
            {user.special_designation_toggle && (
              <>
                <Grid item xs={12}>
                  <Typography variant="overline">
                    Special Designation
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-special-department">
                      Special Department
                    </InputLabel>
                    <Select
                      required
                      id="select-special-department"
                      label="Admin Department"
                      name="special_department"
                      onChange={handleInput}
                      value={user.special_department || ''}
                    >
                      {departments.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-special-designation">
                      Special Designation
                    </InputLabel>
                    <Select
                      required
                      id="select-special-designation"
                      label="Special Designation"
                      name="special_designation"
                      onChange={handleInput}
                      value={user.special_designation || ''}
                    >
                      <MenuItem value="">Select a Department</MenuItem>
                      {designations
                        .filter(
                          (item) =>
                            item.department_id?._id === user.special_department
                        )
                        .map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.designation_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="select-supervisor">
                  Immediate Supervisor
                </InputLabel>
                <Select
                  required
                  id="select-supervisor"
                  label="Immediate Supervisor"
                  name="supervisor_id"
                  onChange={handleInput}
                  value={user.supervisor_id || ''}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {supervisors
                    .filter((item) => item._id !== user._id)
                    .map((item) => (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {item.first_name} {item.last_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => toggleSupervisor(!user.supervisor)}
                    checked={user.supervisor || false}
                  />
                }
                label="Are you a supervisor?"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="select-role">Role</InputLabel>
                <Select
                  required
                  id="select-role"
                  label="Role"
                  name="role_id"
                  onChange={handleInput}
                  value={user.role_id || ''}
                >
                  {roles.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {item.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {isAddingUser && (
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="password">Password</InputLabel>
                  <OutlinedInput
                    required
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleInput}
                    value={user.password || ''}
                    inputProps={{}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Stack>
  );
};

export default FormUser;
