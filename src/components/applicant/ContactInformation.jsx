import {
  barangays,
  city_mun,
  provinces,
  regions,
} from 'phil-reg-prov-mun-brgy';
import { useDispatch, useSelector } from 'react-redux';

import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { setApplicant } from 'src/features/applicantFeatures/applicantSlice';

import { toast } from 'react-toastify';

const ContactInformation = () => {
  const dispatch = useDispatch();

  const { newApplicant } = useSelector((state) => state.applicants);
  const selectedRegion = regions?.find(
    (r) => r.reg_code === newApplicant.region?.reg_code
  )?.reg_code;
  const selectedProvince = provinces?.find(
    (p) => p.prov_code === newApplicant.province?.prov_code
  )?.prov_code;
  const selectedMunicipality = city_mun?.find(
    (m) => m.mun_code === newApplicant.municipality?.mun_code
  )?.mun_code;

  const handleChange = (e) => {
    dispatch(
      setApplicant({ ...newApplicant, [e.target.name]: e.target.value })
    );
  };
  const handleInput = (e) => {
    dispatch(
      setApplicant({ ...newApplicant, [e.target.name]: e.target.value })
    );
  };

  const handleCheckSameAddress = (e) => {
    const data = { ...newApplicant };
    if (!newApplicant?.student_present_address) {
      toast.error('Please input your Residential Address');
      return;
    } else {
      e.target.checked && delete data.student_permanent_address;
      dispatch(
        setApplicant({ ...data, student_same_address: e.target.checked })
      );
    }
  };

  const handleChangeRegion = (e, value) => {
    const data = { ...newApplicant };
    delete data.province;
    delete data.municipality;
    delete data.barangay;
    dispatch(setApplicant({ ...data, region: value }));
  };
  const handleChangeProvince = (e, value) => {
    const data = { ...newApplicant };
    delete data.municipality;
    delete data.barangay;
    dispatch(setApplicant({ ...data, province: value }));
  };
  const handleChangeMunicipality = (e, value) => {
    const data = { ...newApplicant };
    delete data.barangay;
    dispatch(setApplicant({ ...data, municipality: value }));
  };
  const handleChangeBarangay = (e, value) => {
    const data = { ...newApplicant };
    dispatch(setApplicant({ ...data, barangay: value }));
  };
  const customIsOptionEqualToValue = (option, value) => {
    return option._id === value._id;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography color="secondary" textTransform="uppercase">
            Contact Information
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          label="Mobile Number"
          onChange={handleChange}
          name="student_contact_number"
          value={newApplicant.student_contact_number || ''}
          variant="outlined"
          placeholder="09xx-xxx-xxxx"
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          type="email"
          label="Personal Email Address"
          onChange={handleChange}
          variant="outlined"
          name="student_personal_email"
          value={newApplicant.student_personal_email || ''}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          type="text"
          label="Zip Code"
          onChange={handleInput}
          name="zip_code"
          value={newApplicant.zip_code || ''}
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
          value={newApplicant.region || null}
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
          value={newApplicant.province || null}
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
          value={newApplicant.municipality || null}
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
          value={newApplicant.barangay || null}
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
          onChange={handleChange}
          name="student_present_address"
          value={newApplicant.student_present_address || ''}
          variant="outlined"
          rows={2}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        {newApplicant?.student_same_address === false && (
          <TextField
            fullWidth
            type="text"
            label="Permanent Address"
            placeholder="House/BLock/Lot No., Street, Village/Subdivision"
            onChange={handleChange}
            name="student_permanent_address"
            value={newApplicant.student_permanent_address || ''}
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
                checked={newApplicant?.student_same_address}
              />
            }
            label="Same with Present Address?"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default ContactInformation;
