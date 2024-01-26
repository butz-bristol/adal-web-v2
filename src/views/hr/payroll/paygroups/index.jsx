import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllDesignations } from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  createPaygroup,
  deletePaygroup,
  fetchAllPaygroups,
  fetchAllSalaryCutoffs,
  handleChange,
  resetPaygroupValues,
  setPaygroup,
  toggleCreatePaygroup,
  toggleEditPaygroup,
  updatePaygroup,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const Paygroups = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { paygroups, isCreatingPaygroup, isEditingPaygroup } = useSelector(
    (state) => state.payroll
  );

  useEffect(() => {
    dispatch(fetchAllPaygroups());
    dispatch(fetchAllDesignations());
    dispatch(fetchAllSalaryCutoffs());
  }, []);

  return (
    <Stack>
      <Box mb={2}>
        <Button
          variant="contained"
          onClick={() => dispatch(toggleCreatePaygroup())}
        >
          Add Paygroup
        </Button>
      </Box>
      <AddPaygroupModal />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Paygroup Name</TableCell>
              <TableCell>Designation(s)</TableCell>
              <TableCell>Cut Off Period</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paygroups.map((paygroup, index) => {
              const { _id, paygroup_name, cutOffPeriod, designations } =
                paygroup;

              return (
                <TableRow
                  key={paygroup._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {paygroup_name}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {designations.map((designation, index) => {
                      return (
                        <Typography key={index}>
                          {designation.designation_name}
                        </Typography>
                      );
                    })}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {cutOffPeriod}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        minWidth: '0',
                        width: '20px',
                        marginRight: '0.5rem',
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(toggleEditPaygroup());
                        dispatch(setPaygroup(paygroup));
                      }}
                      disabled={isCreatingPaygroup || isEditingPaygroup}
                    >
                      <EditIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0', width: '20px' }}
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(deletePaygroup(_id))}
                    >
                      <DeleteIcon fontSize="10px" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

const AddPaygroupModal = () => {
  const dispatch = useDispatch();
  const {
    paygroup_name,
    isCreatingPaygroup,
    designationId,
    cutOffPeriod,
    editPaygroupId,
    editPaygroup,
    isEditingPaygroup,
    salary_cutoffs,
    paygroupDesignations,
    createPaygroupModal,
  } = useSelector((state) => state.payroll);
  const { designations } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handlePaygroupDesignations = (index, e) => {
    const { name, value } = e.target;
    const newPaygroupDesignations = [...paygroupDesignations];
    newPaygroupDesignations[index] = {
      ...newPaygroupDesignations[index],
      value,
    };

    dispatch(
      handleChange({
        name: 'paygroupDesignations',
        value: newPaygroupDesignations,
      })
    );
  };

  const handleAddPaygroupDesignation = () => {
    const newPaygroupDesignations = [...paygroupDesignations];
    newPaygroupDesignations.push('');
    dispatch(
      handleChange({
        name: 'paygroupDesignations',
        value: newPaygroupDesignations,
      })
    );
  };

  const handleRemovePaygroupDesignation = (index) => {
    const newPaygroupDesignations = [...paygroupDesignations];
    newPaygroupDesignations.splice(index, 1);
    dispatch(
      handleChange({
        name: 'paygroupDesignations',
        value: newPaygroupDesignations,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paygroup_name || !designationId) {
      toast.error('Please fill all fields');
      return;
    }

    if (editPaygroup) {
      dispatch(
        updatePaygroup({
          editPaygroupId,
          paygroup_name,
          designationId,
        })
      );
    }

    dispatch(
      createPaygroup({
        paygroup_name,
        designationId,
      })
    );

    setTimeout(() => {
      dispatch(resetPaygroupValues());
    }, 1500);
  };

  return (
    <Modal
      open={createPaygroupModal}
      onClose={() => {
        dispatch(toggleCreatePaygroup());
        dispatch(resetPaygroupValues());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        {/* Form */}
        <form>
          <Grid container p={1} spacing={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  label="Paygroup Name"
                  name="paygroup_name"
                  value={paygroup_name}
                  onChange={handleInput}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="cut-off-period" htmlFor="cut-off-period">
                  Cut Off Period
                </InputLabel>
                <Select
                  labelId="cut-off-period"
                  id="cut-off-period"
                  name="cutOffPeriod"
                  value={cutOffPeriod}
                  onChange={handleInput}
                  label="Cut Off Period"
                >
                  <MenuItem sx={{ textTransform: 'capitalize' }} value="daily">
                    daily
                  </MenuItem>
                  <MenuItem sx={{ textTransform: 'capitalize' }} value="weekly">
                    weekly
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: 'capitalize' }}
                    value="bi-monthly (every 15th and 30th)"
                  >
                    bi-monthly (every 15th and 30th)
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: 'capitalize' }}
                    value="monthly (every 30th)"
                  >
                    monthly (every 30th)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {paygroupDesignations.map((paygroupDesignation, index) => (
              <Grid container spacing={1} p={1} key={index}>
                <Grid item xs={12} md={6}>
                  <Box style={flexStyles}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="designation-label">
                        Designation
                      </InputLabel>
                      <Select
                        labelId="designation-label"
                        id="designation"
                        name="paygroupDesignation"
                        value={paygroupDesignation}
                        onChange={(e) => handlePaygroupDesignations(index, e)}
                        label="Designation"
                        disabled={!cutOffPeriod}
                      >
                        {salary_cutoffs
                          .filter(
                            (salary_cutoff) =>
                              salary_cutoff.cutOffPeriod === cutOffPeriod
                          )
                          .map((salary_cutoff) => (
                            <MenuItem
                              key={salary_cutoff._id}
                              value={salary_cutoff.designationId?._id}
                            >
                              {salary_cutoff.designationId?.designation_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <AddCircleIcon
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleAddPaygroupDesignation()}
                    />

                    {paygroupDesignations.length > 1 && (
                      <RemoveCircleIcon
                        color="error"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleRemovePaygroupDesignation(index)}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={3} alignSelf="flex-end">
              <Button
                variant="contained"
                color="primary"
                disabled={isCreatingPaygroup || isEditingPaygroup}
                onClick={handleSubmit}
              >
                {editPaygroup ? 'Update' : 'Create'}
              </Button>

              {editPaygroup && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: '0.5rem' }}
                  onClick={() => dispatch(resetPaygroupValues())}
                >
                  Cancel
                </Button>
              )}
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

export default Paygroups;
