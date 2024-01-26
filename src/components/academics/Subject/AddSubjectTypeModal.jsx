import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

import { Fragment, useEffect } from 'react';
import LoadingData from 'src/components/LoadingData';
import {
  clearSubjectType,
  createSubjectType,
  setSubjectType,
  toggleAddSubjectType,
  toggleEditSubjectType,
  updateSubjectTypeById,
} from 'src/features/academicFeatures/academicSlice';
import { getAllDepartments } from 'src/features/registrarFeatures/registrarSlice';

const AddSubjectTypeModal = () => {
  const dispatch = useDispatch();

  const {
    isFetchingSubjectType,
    isAddingSubjectType,
    isEditingSubjectType,
    subjectType,
  } = useSelector((state) => state.academics);
  const { departments } = useSelector((state) => state.registrar);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectType.subject_type) {
      toast.error('Please enter subject type');
      return;
    }
    if (isEditingSubjectType) {
      dispatch(updateSubjectTypeById({ ...subjectType }));
      handleClose();
      return;
    }
    dispatch(createSubjectType({ ...subjectType }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(
      setSubjectType({ ...subjectType, [e.target.name]: e.target.value })
    );
  };
  const handleChange = (e) => {
    dispatch(
      setSubjectType({
        ...subjectType,
        [e.target.name]: { _id: e.target.value },
      })
    );
  };

  const handleClose = () => {
    isAddingSubjectType
      ? dispatch(toggleAddSubjectType())
      : dispatch(toggleEditSubjectType());
    dispatch(clearSubjectType());
  };

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [departments.length === 0]);

  return (
    <Dialog
      fullWidth
      open={isAddingSubjectType || isEditingSubjectType}
      onClose={handleClose}
    >
      {isFetchingSubjectType ? (
        <LoadingData />
      ) : (
        <Fragment>
          <DialogTitle fontSize={18}>
            {isAddingSubjectType
              ? 'Add Subject Type'
              : subjectType?.subject_type
                ? subjectType.subject_type
                : 'Update Subject Type'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Subject Type"
                    placeholder="General Education"
                    name="subject_type"
                    variant="outlined"
                    onChange={handleInput}
                    value={subjectType?.subject_type || ''}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-department">Department</InputLabel>
                  <Select
                    id="select-department"
                    label="Department"
                    name="department"
                    value={subjectType?.department?._id || ''}
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department?.department_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    onChange={handleInput}
                    value={subjectType?.description || ''}
                    rows={3}
                    multiline
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              {isAddingSubjectType ? 'Submit' : 'Update'}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

export default AddSubjectTypeModal;
