import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LinkComponent from 'src/components/LinkComponent';
import {
  fetchAllDepartments,
  fetchAllDesignations,
  fetchAllRoles,
  getAllTeacherDesignations,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  clearDynamicFields,
  createEmployee,
  handleChange,
  toggleCreateEmployee,
  toggleEditEmployee,
  updateEmployee,
} from 'src/features/hrFeatures/employees/employeeSlice';
import { nationalities } from 'src/utils/helperFunctions';
const AddUserModal = () => {
  const dispatch = useDispatch();
  const {
    isEditingEmployee,
    isCreatingEmployee,
    editEmployee,
    first_name,
    last_name,
    middle_name,
    employee_id,
    email,
    birth_date,
    gender,
    phone,
    religion,
    blood_type,
    address,
    joining_date,
    supervisor_id = null,
    role_id,
    password,
    civil_status,
    civil_statusOptions,
    nationality,
    personal_email,
    secondary_phone,
    skills_and_competencies,
    blood_typeOptions,
    supervisor,
    createEmployeeStatus,
    employeeID,

    admin_designation_toggle,
    admin_department,
    admin_designation,
    admin_designation_year,
    admin_designation_semester,

    teaching_designation_toggle,
    teaching_department,
    teaching_designation,
    teaching_designation_year,
    teaching_designation_semester,
    teaching_designation_specialization,

    special_designation_toggle,
    special_department,
    special_designation,
    special_designation_year,
    special_designation_semester,
  } = useSelector((state) => state.employees);
  const { designations, departments, roles, teacherDesignations } = useSelector(
    (state) => state.coreHr
  );
  const { departments: teaching_departments } = useSelector(
    (state) => state.registrar
  );
  const { supervisors } = useSelector((state) => state.users);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleInput = (e) => {
    if (
      e.target.name === 'admin_designation_toggle' ||
      e.target.name === 'teaching_designation_toggle' ||
      e.target.name === 'special_designation_toggle'
    ) {
      dispatch(handleChange({ name: e.target.name, value: e.target.checked }));
    } else {
      dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }
  };

  const employeeAge = Math.round(
    DateTime.now().diff(DateTime.fromISO(birth_date), 'years').years
  );

  const clearForm = () => {
    dispatch(
      clearDynamicFields({
        first_name,
        last_name,
        middle_name,
        employee_id,
        email,
        birth_date,
        gender,
        phone,
        religion,
        blood_type,
        address,
        joining_date,
        supervisor_id,
        role_id,
        password,
        civil_status,
        nationality,
        personal_email,
        secondary_phone,
        skills_and_competencies,
        supervisor,
        createEmployeeStatus,
        employeeID,

        admin_department,
        admin_designation,
        admin_designation_year,
        admin_designation_semester,

        teaching_department,
        teaching_designation,
        teaching_designation_year,
        teaching_designation_semester,
        teaching_designation_specialization,

        special_department,
        special_designation,
        special_designation_year,
        special_designation_semester,
      })
    );

    dispatch(handleChange({ name: 'admin_designation_toggle', value: false }));
    dispatch(
      handleChange({ name: 'teaching_designation_toggle', value: false })
    );
    dispatch(
      handleChange({ name: 'special_designation_toggle', value: false })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      middle_name,
      employee_id,
      email,
      birth_date,
      personal_email,
      gender,
      religion,
      birth_date,
      phone,
      secondary_phone,
      civil_status,
      blood_type,
      address,
      skills_and_competencies,
      nationality,
      joining_date,
      supervisor_id,
      role_id,
      supervisor,
    };

    if (admin_designation_toggle) {
      data.admin_designation_toggle = admin_designation_toggle;
      data.admin_department = admin_department;
      data.admin_designation = admin_designation;
      data.admin_designation_year = admin_designation_year;
      data.admin_designation_semester = admin_designation_semester;
    }

    if (teaching_designation_toggle) {
      data.teaching_designation_toggle = teaching_designation_toggle;
      data.teaching_department = teaching_department;
      data.teaching_designation = teaching_designation;
      data.teaching_designation_year = teaching_designation_year;
      data.teaching_designation_semester = teaching_designation_semester;
      data.teaching_designation_specialization =
        teaching_designation_specialization;
    }

    if (special_designation_toggle) {
      data.special_designation_toggle = special_designation_toggle;
      data.special_department = special_department;
      data.special_designation = special_designation;
      data.special_designation_year = special_designation_year;
      data.special_designation_semester = special_designation_semester;
    }

    if (editEmployee) {
      return dispatch(
        updateEmployee({
          employeeID,
          ...data,
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            clearForm();
            return dispatch(toggleEditEmployee());
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }

    dispatch(
      createEmployee({
        ...data,
        password,
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(toggleCreateEmployee());
          clearForm();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
    dispatch(getAllTeacherDesignations());
    dispatch(fetchAllRoles());
  }, [dispatch]);

  return (
    <Modal
      open={createEmployeeStatus || editEmployee}
      onClose={() => {
        createEmployeeStatus
          ? dispatch(toggleCreateEmployee())
          : dispatch(toggleEditEmployee());
        clearForm();
      }}
      container={() => document.getElementById('root')}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          maxWidth: '750px',
          maxHeight: '85vh',
          height: 'auto',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        <Box style={flexStyles} p={2} width={'100%'}>
          <Alert
            color="warning"
            variant="filled"
            sx={{ width: '100%' }}
            severity="warning"
          >
            Ensure employee designation exists before adding user or
            <LinkComponent to={'/hr/employees/designations'}>
              <Button
                sx={{ fontWeight: 600 }}
                variant="text"
                color="secondary"
                size="small"
              >
                Set up user designation
              </Button>
            </LinkComponent>
          </Alert>
        </Box>
        <form>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="First Name"
                  id="first-name"
                  variant="outlined"
                  value={first_name}
                  name="first_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Last Name"
                  id="last-name"
                  variant="outlined"
                  value={last_name}
                  name="last_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Middle Name"
                  id="middle-name"
                  variant="outlined"
                  value={middle_name || ''}
                  name="middle_name"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Employee ID"
                  id="employee_id"
                  variant="outlined"
                  value={employee_id}
                  name="employee_id"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  id="email"
                  variant="outlined"
                  value={email}
                  name="email"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Personal Email"
                  id="personal-email"
                  variant="outlined"
                  value={personal_email || ''}
                  name="personal_email"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Gender"
                  value={gender}
                  onChange={handleInput}
                  required
                  name="gender"
                >
                  <MenuItem value="">Select One</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Religion"
                  id="religion"
                  required
                  variant="outlined"
                  value={religion}
                  name="religion"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="birth-date">Birth Date</InputLabel>
                <OutlinedInput
                  label="Birth Date"
                  id="birth-date"
                  type="date"
                  required
                  name="birth_date"
                  value={DateTime.fromISO(birth_date).toFormat('yyyy-MM-dd')}
                  onChange={handleInput}
                />
                {/* <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker
                    label="Birth Date"
                    value={birth_date}
                    name="birth_date"
                    onChange={handleInput}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Age"
                  type="number"
                  id="age"
                  variant="outlined"
                  name="age"
                  value={employeeAge || ''}
                  onChange={(e) => {
                    birth_date &&
                      dispatch(
                        handleChange({ name: 'age', value: e.target.value })
                      );
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <OutlinedInput
                  label="Phone"
                  id="phone"
                  variant="outlined"
                  value={phone || ''}
                  name="phone"
                  onChange={handleInput}
                  required
                  startAdornment={
                    <InputAdornment position="start">+63</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="secondary-phone">
                  Secondary Phone
                </InputLabel>
                <OutlinedInput
                  label="Secondary Phone"
                  id="secondary-phone"
                  variant="outlined"
                  value={secondary_phone || ''}
                  name="secondary_phone"
                  onChange={handleInput}
                  required
                  startAdornment={
                    <InputAdornment position="start">+63</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Civil Status
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Civil Status"
                  value={civil_status}
                  onChange={handleInput}
                  name="civil_status"
                  labelId="demo-simple-select-label"
                  required
                >
                  <MenuItem value="">Select One</MenuItem>
                  {civil_statusOptions?.map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Blood Type
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Blood Type"
                  value={blood_type}
                  onChange={handleInput}
                  name="blood_type"
                  labelId="demo-simple-select-label"
                  required
                >
                  <MenuItem value="">Select One</MenuItem>
                  {blood_typeOptions?.map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Address"
                  id="address"
                  variant="outlined"
                  value={address}
                  name="address"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  rows={2}
                  label="Skills and Competencies"
                  id="skills_and_competencies"
                  variant="outlined"
                  value={skills_and_competencies}
                  name="skills_and_competencies"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Nationality
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Nationality"
                  name="nationality"
                  value={nationality}
                  onChange={handleInput}
                  labelId="demo-simple-select-label"
                >
                  <MenuItem value="">Select One</MenuItem>
                  {nationalities?.map((nationality, index) => (
                    <MenuItem
                      key={index}
                      value={nationality}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {nationality}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="joining-date">Joining Date</InputLabel>
                <OutlinedInput
                  type="date"
                  label="Joining Date"
                  id="joining-date"
                  required
                  name="joining_date"
                  value={DateTime.fromISO(joining_date).toFormat('yyyy-MM-dd')}
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ height: 'fit-content' }}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={admin_designation_toggle || false}
                        onChange={handleInput}
                        name="admin_designation_toggle"
                        inputProps={{
                          'aria-label': 'controlled',
                        }}
                        color="primary"
                      />
                    }
                    label="Admin Designation ?"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={teaching_designation_toggle || false}
                        onChange={handleInput}
                        name="teaching_designation_toggle"
                        color="primary"
                        inputProps={{
                          'aria-label': 'controlled',
                        }}
                      />
                    }
                    label="Teaching Designation ?"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={special_designation_toggle || false}
                        onChange={handleInput}
                        name="special_designation_toggle"
                        color="primary"
                      />
                    }
                    label="Special Designation ?"
                  />
                </Grid>
              </Grid>

              {/* ADMIN DESIGNATION */}

              <Collapse in={admin_designation_toggle ?? false}>
                <Grid container spacing={2} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Admin Department
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Admin Department"
                        name="admin_department"
                        value={admin_department || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {departments?.map((department) => (
                          <MenuItem
                            key={department._id}
                            value={department._id}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {department?.department_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Admin Designation
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Admin Designation"
                        name="admin_designation"
                        value={admin_designation || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {designations
                          ?.filter(
                            (designation) =>
                              designation.department_id?._id ===
                              admin_department
                          )
                          ?.map((designation) => (
                            <MenuItem
                              key={designation._id}
                              value={designation._id}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {designation.designation_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Year"
                        variant="outlined"
                        id="admin_designation_year"
                        name="admin_designation_year"
                        value={admin_designation_year || ''}
                        onChange={handleInput}
                        placeholder="2021/2022"
                        required
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Semester"
                        variant="outlined"
                        id="admin_designation_semester"
                        name="admin_designation_semester"
                        value={admin_designation_semester || ''}
                        onChange={handleInput}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {teaching_designation_toggle && (
                  <Grid item xs={12} mt={2} mb={2}>
                    <Divider variant="middle" />
                  </Grid>
                )}

                {!teaching_designation_toggle && special_designation_toggle && (
                  <Grid item xs={12} mt={2} mb={2}>
                    <Divider variant="middle" />
                  </Grid>
                )}
              </Collapse>

              {/* TEACHING DESIGNATION */}

              <Collapse in={teaching_designation_toggle ?? false}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Teaching Department
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Teaching Department"
                        name="teaching_department"
                        value={teaching_department || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {departments.map((department) => (
                          <MenuItem
                            key={department._id}
                            value={department._id}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {department?.department_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Teaching Designation
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Teaching Designation"
                        name="teaching_designation"
                        value={teaching_designation || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {designations
                          .filter(
                            (designation) =>
                              designation.department_id?._id ===
                              teaching_department
                          )
                          .map((designation) => (
                            <MenuItem
                              key={designation._id}
                              value={designation._id}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {designation.designation_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Year"
                        variant="outlined"
                        id="teaching_designation_year"
                        name="teaching_designation_year"
                        value={teaching_designation_year || ''}
                        onChange={handleInput}
                        placeholder="2021/2022"
                        required
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Semester"
                        variant="outlined"
                        id="teaching_designation_semester"
                        name="teaching_designation_semester"
                        value={teaching_designation_semester || ''}
                        onChange={handleInput}
                        required
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Specialization/Degree Course"
                        variant="outlined"
                        id="teaching_designation_specialization"
                        name="teaching_designation_specialization"
                        value={teaching_designation_specialization || ''}
                        multiline
                        rows={2}
                        onChange={handleInput}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {special_designation_toggle && (
                  <Grid item xs={12} mt={2} mb={2}>
                    <Divider variant="middle" />
                  </Grid>
                )}
              </Collapse>

              {/* SPECIAL DESIGNATION */}

              <Collapse in={special_designation_toggle ?? false}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Special Department
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Special Department"
                        name="special_department"
                        value={special_department || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {departments.map((department) => (
                          <MenuItem
                            key={department._id}
                            value={department._id}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {department?.department_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Special Designation
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Special Designation"
                        name="special_designation"
                        value={special_designation || ''}
                        onChange={handleInput}
                        labelId="demo-simple-select-label"
                        required
                      >
                        <MenuItem value="">Select One</MenuItem>
                        {designations
                          .filter(
                            (designation) =>
                              designation.department_id?._id ===
                              special_department
                          )
                          .map((designation) => (
                            <MenuItem
                              key={designation._id}
                              value={designation._id}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {designation.designation_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Year"
                        variant="outlined"
                        id="special_designation_year"
                        name="special_designation_year"
                        placeholder="2021/2022"
                        value={special_designation_year || ''}
                        onChange={handleInput}
                        required
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Designation Semester"
                        variant="outlined"
                        id="special_designation_semester"
                        name="special_designation_semester"
                        value={special_designation_semester || ''}
                        onChange={handleInput}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Role"
                  name="role_id"
                  value={role_id}
                  onChange={handleInput}
                  labelId="demo-simple-select-label"
                  required
                >
                  <MenuItem value="">Select One</MenuItem>
                  {roles.map((role) => (
                    <MenuItem
                      key={role._id}
                      value={role._id}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Supervisor
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Supervisor"
                  name="supervisor"
                  value={supervisor}
                  onChange={handleInput}
                  labelId="demo-simple-select-label"
                  required
                >
                  <MenuItem value="">Select One</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Immediate Supervisor
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Immediate Supervisor"
                  name="supervisor_id"
                  value={supervisor_id}
                  onChange={handleInput}
                  labelId="demo-simple-select-label"
                  required
                >
                  <MenuItem value="">Select One</MenuItem>
                  {supervisors.map((supervisor) => (
                    <MenuItem
                      key={supervisor._id}
                      value={supervisor._id}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {supervisor.first_name} {supervisor.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {!editEmployee && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password-login">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name="password"
                    onChange={handleInput}
                    label="Password"
                    inputProps={{}}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ mt: editEmployee ? 1 : 2 }}
                  onClick={handleSubmit}
                  disabled={isCreatingEmployee || isEditingEmployee}
                  fullWidth
                >
                  {editEmployee ? 'Update Employee' : 'Create Employee'}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
};

export default AddUserModal;
