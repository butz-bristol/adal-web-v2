import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearLicenseAndCertification,
  createLicenseAndCertification,
  deleteLicenseAndCertification,
  handleChange,
  toggleAddLicenseAndCertificationModal,
  toggleEditLicenseAndCertificationModal,
  updateLicenseAndCertification,
} from 'src/features/users/userSlice';
import { months, years } from 'src/utils/helperFunctions';

const AddLicenseAndCertification = () => {
  const dispatch = useDispatch();
  const {
    isCreatingLicenseAndCertification,
    isUpdatingLicenseAndCertification,
    createLicenseAndCertificationModal,
    editLicenseAndCertification,
    isDeletingLicenseAndCertification,
    editLicenseAndCertificationId,
    license_name,
    license_number,
    issuing_authority,
    license_issue_month,
    license_issue_year,
    license_expiry_month,
    license_expiry_year,
    license_url,
    expiration_toggle,
  } = useSelector((state) => state.users);
  const {
    user: { userId },
  } = useSelector((state) => state.users);

  const handleInput = (e) => {
    if (e.target.name === 'expiration_toggle') {
      dispatch(handleChange({ name: e.target.name, value: e.target.checked }));
    } else {
      dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !license_name ||
      !license_number ||
      !issuing_authority ||
      !license_issue_month
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editLicenseAndCertification) {
      dispatch(
        updateLicenseAndCertification({
          editLicenseAndCertificationId,
          license_name,
          license_number,
          issuing_authority,
          license_issue_month,
          license_issue_year,
          license_expiry_month,
          license_expiry_year,
          license_url,
          expiration_toggle,
          userId,
        })
      );
      return;
    }

    dispatch(
      createLicenseAndCertification({
        license_name,
        license_number,
        issuing_authority,
        license_issue_month,
        license_issue_year,
        license_expiry_month,
        license_expiry_year,
        license_url,
        expiration_toggle,
        userId,
      })
    );

    setTimeout(() => {
      dispatch(clearLicenseAndCertification());
    }, 1000);
  };

  return (
    <Dialog
      open={createLicenseAndCertificationModal || editLicenseAndCertification}
      onClose={() => {
        createLicenseAndCertificationModal
          ? dispatch(toggleAddLicenseAndCertificationModal())
          : dispatch(toggleEditLicenseAndCertificationModal());
        dispatch(clearLicenseAndCertification());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form>
        <DialogContent>
          <Typography variant="h4" gutterBottom component="div">
            {editLicenseAndCertification
              ? 'Edit License and Certification'
              : 'Add License and Certification'}
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Name"
                  name="license_name"
                  value={license_name}
                  onChange={handleInput}
                  variant="outlined"
                  required
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="Issuing Authority"
                  name="issuing_authority"
                  value={issuing_authority}
                  onChange={handleInput}
                  variant="outlined"
                  required
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={expiration_toggle}
                    onChange={handleInput}
                    name="expiration_toggle"
                    color="primary"
                    disabled={
                      isCreatingLicenseAndCertification ||
                      isUpdatingLicenseAndCertification ||
                      isDeletingLicenseAndCertification
                    }
                  />
                }
                label="This license has no expiration date"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="issue-month-label">Start Date</InputLabel>
                <Select
                  labelId="issue-month-label"
                  id="issue-month"
                  name="license_issue_month"
                  value={license_issue_month}
                  label="Start Date"
                  onChange={handleInput}
                  variant="outlined"
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="issue-year-label">Year</InputLabel>
                <Select
                  labelId="issue-year-label"
                  id="issue-year"
                  name="license_issue_year"
                  value={license_issue_year}
                  label="Year"
                  onChange={handleInput}
                  variant="outlined"
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="expiry-month-label">Expiration Date</InputLabel>
                <Select
                  labelId="expiry-month-label"
                  id="expiry-month"
                  name="license_expiry_month"
                  value={license_expiry_month || ''}
                  label="Expiration Date"
                  onChange={handleInput}
                  variant="outlined"
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification ||
                    expiration_toggle
                  }
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="expiry-year-label">Year</InputLabel>
                <Select
                  labelId="expiry-year-label"
                  id="expiry-year"
                  name="license_expiry_year"
                  value={license_expiry_year || ''}
                  label="Year"
                  onChange={handleInput}
                  variant="outlined"
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification ||
                    expiration_toggle
                  }
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Credential ID"
                  name="license_number"
                  value={license_number || ''}
                  onChange={handleInput}
                  variant="outlined"
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Credential URL"
                  name="license_url"
                  value={license_url || ''}
                  onChange={handleInput}
                  variant="outlined"
                  multiline
                  rows={3}
                  disabled={
                    isCreatingLicenseAndCertification ||
                    isUpdatingLicenseAndCertification ||
                    isDeletingLicenseAndCertification
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={
              isCreatingLicenseAndCertification ||
              isUpdatingLicenseAndCertification ||
              isDeletingLicenseAndCertification
            }
          >
            {editLicenseAndCertification ? 'Update' : 'Add'}
          </Button>

          {editLicenseAndCertification && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                dispatch(toggleEditLicenseAndCertificationModal());
                dispatch(clearLicenseAndCertification());
                dispatch(
                  deleteLicenseAndCertification(editLicenseAndCertificationId)
                );
              }}
              disabled={
                isCreatingLicenseAndCertification ||
                isUpdatingLicenseAndCertification ||
                isDeletingLicenseAndCertification
              }
            >
              Delete
            </Button>
          )}

          <Button
            onClick={() => {
              dispatch(toggleEditLicenseAndCertificationModal());
              dispatch(clearLicenseAndCertification());
            }}
            variant="contained"
            disabled={
              isCreatingLicenseAndCertification ||
              isUpdatingLicenseAndCertification ||
              isDeletingLicenseAndCertification
            }
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default AddLicenseAndCertification;
