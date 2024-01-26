import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import {
  addDepartment,
  clearDepartment,
  setDepartment,
  toggleAddDepartment,
  toggleEditDepartment,
  updateDepartment,
} from 'src/features/registrarFeatures/registrarSlice';

const DepartmentModal = () => {
  const dispatch = useDispatch();

  const { isAddingDepartment, isEditingDepartment, department } = useSelector(
    (state) => state.registrar
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingDepartment) {
      dispatch(updateDepartment({ ...department }));
      return;
    }
    dispatch(addDepartment({ ...department }));
  };

  const handleInput = (e) => {
    dispatch(setDepartment({ ...department, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    dispatch(clearDepartment());
    isAddingDepartment
      ? dispatch(toggleAddDepartment())
      : dispatch(toggleEditDepartment());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingDepartment || isEditingDepartment}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle fontSize={18}>
          {isAddingDepartment ? 'Add Department' : 'Update Department'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Department"
                  name="department_name"
                  variant="outlined"
                  onChange={handleInput}
                  value={department?.department_name || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Abbreviation"
                  name="abbreviation"
                  variant="outlined"
                  onChange={handleInput}
                  value={department?.abbreviation || ''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-remarks">Remarks</InputLabel>
                <Select
                  id="select-remarks"
                  label="Remarks"
                  name="remarks"
                  value={department?.remarks || ''}
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
                name="department_description"
                value={department?.department_description || ''}
                onChange={handleInput}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            {isAddingDepartment ? 'Submit' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DepartmentModal;
