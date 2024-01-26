import {
  barangays,
  city_mun,
  provinces,
  regions,
} from 'phil-reg-prov-mun-brgy';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  k12Departments,
  nationalities,
  sexualOrientation,
} from 'src/utils/helperFunctions';

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
  Typography,
} from '@mui/material';

import { DateTime } from 'luxon';
import { setStudent } from 'src/features/admissionsFeatures/admissionsSlice';

const StudentPersonalInformation = () => {
  const dispatch = useDispatch();

  const { student } = useSelector((state) => state.admissions);
  const { departments } = useSelector((state) => state.registrar);
  const selectedRegion = regions?.find(
    (r) => r.reg_code === student.region?.reg_code
  )?.reg_code;
  const selectedProvince = provinces?.find(
    (p) => p.prov_code === student.province?.prov_code
  )?.prov_code;
  const selectedMunicipality = city_mun?.find(
    (m) => m.mun_code === student.municipality?.mun_code
  )?.mun_code;
  const departmentName = departments.find(
    (department) => department?._id === student.student_department?._id
  )?.department_name;

  const handleChange = (e) => {
    dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
    if (e.target.name === 'student_permanent_address' && isPresentAddress) {
      dispatch(
        setStudent({
          ...student,
          [e.target.name]: e.target.value,
          student_present_address: student?.student_permanent_address,
        })
      );
    }
  };

  const handleToggleChange = (e) => {
    const data = { ...student };
    if (e.target.name === 'student_pwd_status') {
      if (e.target.value === 'Yes') {
        dispatch(setStudent({ ...data, [e.target.name]: true }));
      }
      if (e.target.value === 'No') {
        dispatch(setStudent({ ...data, [e.target.name]: false }));
      }
    }
  };

  const handleInput = (e) => {
    dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
  };

  const handleCheckboxAddress = (e) => {
    const data = { ...student };
    if (!student?.student_present_address) {
      toast.error('Please input your Residential Address');
      return;
    } else {
      e.target.checked && delete data.student_permanent_address;
      dispatch(setStudent({ ...data, student_same_address: e.target.checked }));
    }
  };

  const handleChangeRegion = (e, value) => {
    const data = { ...student };
    delete data.province;
    delete data.municipality;
    delete data.barangay;
    dispatch(setStudent({ ...data, region: value }));
  };
  const handleChangeProvince = (e, value) => {
    const data = { ...student };
    delete data.municipality;
    delete data.barangay;
    dispatch(setStudent({ ...data, province: value }));
  };
  const handleChangeMunicipality = (e, value) => {
    const data = { ...student };
    delete data.barangay;
    dispatch(setStudent({ ...data, municipality: value }));
  };
  const handleChangeBarangay = (e, value) => {
    const data = { ...student };
    dispatch(setStudent({ ...data, barangay: value }));
  };
  const handleChangeNationality = (e, value) => {
    dispatch(setStudent({ ...student, student_nationality: value }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">
              Personal Information
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            name="student_first_name"
            onChange={handleChange}
            value={student.student_first_name ?? ''}
            label="First name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            name="student_middle_name"
            onChange={handleChange}
            value={student.student_middle_name ?? ''}
            label="Middle name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            name="student_last_name"
            onChange={handleChange}
            value={student.student_last_name ?? ''}
            label="Last name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="select-gender" color="secondary">
              Are you a Male or Female?
            </FormLabel>
            <RadioGroup
              row
              name="student_gender"
              onChange={handleChange}
              value={student.student_gender ?? ''}
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
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="select-pwd-status" color="secondary">
              Are you a Person with Disabilities (PWD)?
            </FormLabel>
            <RadioGroup
              row
              name="student_pwd_status"
              value={student.student_pwd_status ? 'Yes' : 'No' ?? ''}
              onChange={handleToggleChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              type="date"
              helperText="Date of Birth"
              onChange={handleInput}
              name="student_birthdate"
              value={
                (student.student_birthdate &&
                  DateTime.fromISO(student.student_birthdate).toFormat(
                    'yyyy-MM-dd'
                  )) ??
                ''
              }
              variant="outlined"
            />
          </FormControl>
        </Grid>
        {!k12Departments.includes(departmentName) && (
          <>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-sexual-orientation">
                  Sexual Orientation
                </InputLabel>
                <Select
                  id="select-sexual-orientation"
                  label="Sexual Orientation"
                  name="student_sexual_orientation"
                  value={student.student_sexual_orientation ?? ''}
                  onChange={handleChange}
                >
                  {sexualOrientation.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-civil-status">Civil Status</InputLabel>
                <Select
                  id="select-civil-status"
                  label="Civil Status"
                  name="student_civil_status"
                  onChange={handleChange}
                  value={student.student_civil_status ?? ''}
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

        <Grid item xs={6}>
          <Autocomplete
            id="select-nationality"
            options={nationalities ?? ''}
            getOptionLabel={(nationality) => nationality}
            renderOption={(props, nationality, { selected }) => (
              <li {...props}>{nationality}</li>
            )}
            onChange={handleChangeNationality}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={student.student_nationality ?? ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nationality"
                placeholder="Choose a Nationality"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">
              Contact Information
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            name="student_contact_number"
            onChange={handleChange}
            value={student.student_contact_number ?? ''}
            label="Contact Number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            name="student_personal_email"
            onChange={handleChange}
            value={student.student_personal_email ?? ''}
            label="Personal Email"
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="select-region"
            options={regions ?? []}
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeRegion}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={student.region ?? null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Region"
                placeholder="Choose a Region"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="select-province"
            options={
              provinces.filter(
                (province) => province.reg_code === selectedRegion
              ) ?? []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeProvince}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={student.province ?? null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Province"
                placeholder="Choose a Province"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="select-municipality"
            options={
              city_mun.filter(
                (municipality) => municipality.prov_code === selectedProvince
              ) ?? []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeMunicipality}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={student.municipality ?? null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Municipality"
                placeholder="Choose a Municipality"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="select-barangay"
            options={
              barangays.filter(
                (barangay) => barangay.mun_code === selectedMunicipality
              ) ?? []
            }
            getOptionLabel={(item) => item.name}
            renderOption={(props, item, { selected }) => (
              <li {...props}>{item.name}</li>
            )}
            onChange={handleChangeBarangay}
            isOptionEqualToValue={customIsOptionEqualToValue}
            value={student.barangay ?? null}
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
            label="Residential Address"
            placeholder="House/BLock/Lot No., Street, Village/Subdivision"
            onChange={handleChange}
            name="student_present_address"
            value={student.student_present_address ?? ''}
            variant="outlined"
            rows={2}
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          {student?.student_same_address === false && (
            <TextField
              fullWidth
              type="text"
              label="Permanent Address"
              placeholder="House/BLock/Lot No., Street, Village/Subdivision"
              onChange={handleChange}
              name="student_permanent_address"
              value={student.student_permanent_address ?? ''}
              variant="outlined"
              rows={2}
              multiline
            />
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxAddress}
                  checked={student?.student_same_address ?? false}
                />
              }
              label="Same with Present Address?"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentPersonalInformation;
