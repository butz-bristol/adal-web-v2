import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCompensation,
//   updateCompensation,
//   clearCompensation,
//   handleChange,
//   toggleCreateCompensation,
//   toggleEditCompensation,
//   deleteCompensation
// } from 'src/features/hrFeatures/employees/employeeSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  fetchAllSalaryCutoffs,
  fetchAllSalaryGradeGuides,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const AddCompensation = () => {
  const dispatch = useDispatch();
  const {
    userId,
    salary_rate,
    cutOffPeriod,
    computed_hourly_rate,
    sss,
    philhealth,
    pag_ibig,
    other_allowances,
    tax_salary_category,
    tax_withheld,
    total_earnings,
    total_deductions,
    take_home_pay,
    salary_grade,
    civil_statusOptions,
    createCompensationStatus,
    editCompensation,
    isCreatingCompensation,
    isEditingCompensation,
    isDeletingCompensation,
    editCompensationId,
  } = useSelector((state) => state.employees);
  const {
    userProfile: { user_designations, _id },
  } = useSelector((state) => state.users);
  const { salary_grade_guides, salary_cutoffs } = useSelector(
    (state) => state.payroll
  );
  // const designatedCutoff = salary_cutoffs.find((cutoff) => cutoff.designationId._id === user_designations[0].designation_id);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  let other_allowance_amount = 0;
  other_allowance_amount =
    other_allowances &&
    other_allowances.reduce((acc, curr) => {
      return (acc += parseInt(curr.other_allowance_amount));
    }, 0);

  const handleAllowanceInput = (index, evt) => {
    const { name, value } = evt.target;
    const list = [...other_allowances];
    list[index] = { ...list[index], [name]: value };

    dispatch(handleChange({ name: 'other_allowances', value: list }));
  };

  const handleAddOtherAllowance = () => {
    const list = [...other_allowances];
    list.push({ other_allowance_type: '', other_allowance_amount: 0 });
    dispatch(handleChange({ name: 'other_allowances', value: list }));
  };

  const handleRemoveOtherAllowance = (index) => {
    const list = [...other_allowances];
    list.splice(index, 1);
    dispatch(handleChange({ name: 'other_allowances', value: list }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !salary_rate ||
      !computed_hourly_rate ||
      !sss ||
      !philhealth ||
      !pag_ibig ||
      !tax_salary_category ||
      !tax_withheld ||
      !salary_grade
    ) {
      toast.error('Please fill out all required fields');
      return;
    }

    if (editCompensation) {
      dispatch(
        updateCompensation({
          editCompensationId,
          userId,
          salary_rate,
          cutOffPeriod,
          computed_hourly_rate,
          sss,
          philhealth,
          pag_ibig,
          other_allowances,
          tax_salary_category,
          tax_withheld,
          total_earnings,
          total_deductions,
          take_home_pay,
          salary_grade,
          userId,
        })
      );
      return;
    }

    dispatch(
      createCompensation({
        salary_rate,
        cutOffPeriod,
        computed_hourly_rate,
        sss,
        philhealth,
        pag_ibig,
        other_allowances,
        tax_salary_category,
        tax_withheld,
        total_earnings,
        total_deductions,
        take_home_pay,
        salary_grade,
        userId: _id,
      })
    );

    setTimeout(() => {
      dispatch(clearCompensation());
    }, 1500);
  };

  useEffect(() => {
    dispatch(fetchAllSalaryGradeGuides());
    dispatch(fetchAllSalaryCutoffs());
  }, []);

  return (
    <Modal
      open={false}
      onClose={() => {
        // createCompensationStatus ? dispatch(toggleCreateCompensation()) : dispatch(toggleEditCompensation());
        // dispatch(clearCompensation());
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
        <Typography gutterBottom variant="h4">
          {editCompensation ? 'Edit Compensation' : 'Add Compensation'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="salary_rate"
                  name="salary_rate"
                  label="Salary Rate"
                  variant="outlined"
                  value={salary_rate}
                  type="number"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="salary_grade">Salary Grade</InputLabel>
                <Select
                  labelId="salary_grade"
                  id="salary_grade"
                  name="salary_grade"
                  label="Salary Grade"
                  value={salary_grade}
                  onChange={handleInput}
                >
                  {salary_grade_guides.map((grade_guide) => (
                    <MenuItem
                      key={grade_guide._id}
                      value={grade_guide.salary_grade}
                    >
                      {grade_guide.salary_grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="computed_hourly_rate"
                  name="computed_hourly_rate"
                  label="Computed Hourly Rate"
                  variant="outlined"
                  value={computed_hourly_rate}
                  type="number"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="cutOffPeriod"
                  name="cutOffPeriod"
                  label="Designated Cut Off"
                  variant="outlined"
                  // value={designatedCutoff ? designatedCutoff.cutOffPeriod : 'No Cut-Off Period'}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <Typography gutterBottom variant="h5">
                  Government Benefits
                </Typography>
                <Grid container rowGap={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="sss"
                      fullWidth
                      name="sss"
                      label="Social Security System"
                      variant="outlined"
                      value={sss}
                      type="number"
                      onChange={handleInput}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="philhealth"
                      name="philhealth"
                      label="Philhealth"
                      variant="outlined"
                      value={philhealth}
                      onChange={handleInput}
                      type="number"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="pag_ibig"
                      name="pag_ibig"
                      label="Pag-Ibig/HDMF"
                      variant="outlined"
                      value={pag_ibig}
                      onChange={handleInput}
                      type="number"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h5">
                Other Allowances
              </Typography>
              <FormControl fullWidth>
                {other_allowances &&
                  other_allowances.map((allowance, index) => (
                    <Grid container spacing={1} pb={1} key={index}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <TextField
                            label="Allowance Type"
                            variant="outlined"
                            name="other_allowance_type"
                            value={allowance.other_allowance_type}
                            onChange={(e) => handleAllowanceInput(index, e)}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box style={flexStyles}>
                          <FormControl fullWidth required>
                            <TextField
                              label="Allowance Amount"
                              variant="outlined"
                              name="other_allowance_amount"
                              value={allowance.other_allowance_amount}
                              onChange={(e) => handleAllowanceInput(index, e)}
                              type="number"
                              fullWidth
                            />
                          </FormControl>

                          <AddCircleIcon
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleAddOtherAllowance()}
                          />

                          {other_allowances.length > 1 && (
                            <RemoveCircleIcon
                              color="error"
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleRemoveOtherAllowance(index)}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="tax_salary_category">
                  Tax Salary Category
                </InputLabel>
                <Select
                  labelId="tax_salary_category"
                  id="tax_salary_category"
                  name="tax_salary_category"
                  label="Tax Salary Category"
                  value={tax_salary_category}
                  onChange={handleInput}
                >
                  {civil_statusOptions.map((option, index) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
                      key={index}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="tax_withheld"
                  name="tax_withheld"
                  label="Tax Withheld"
                  variant="outlined"
                  value={tax_withheld}
                  onChange={handleInput}
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <TextField
                      id="total_earnings"
                      name="total_earnings"
                      label="Total Earnings"
                      variant="outlined"
                      value={
                        (parseInt(salary_rate) || 0) +
                        (parseInt(other_allowance_amount) || 0)
                      }
                      onChange={handleInput}
                      type="number"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <TextField
                      id="total_deductions"
                      name="total_deductions"
                      label="Total Deductions"
                      variant="outlined"
                      value={
                        (parseInt(sss) || 0) +
                          (parseInt(philhealth) || 0) +
                          (parseInt(pag_ibig) || 0) +
                          (parseInt(tax_withheld) || 0) || ''
                      }
                      onChange={handleInput}
                      type="number"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <TextField
                      id="take_home_pay"
                      name="take_home_pay"
                      label="Take Home Pay"
                      variant="outlined"
                      value={
                        (parseInt(salary_rate) || 0) +
                          (parseInt(other_allowance_amount) || 0) -
                          ((parseInt(sss) || 0) +
                            (parseInt(philhealth) || 0) +
                            (parseInt(pag_ibig) || 0) +
                            (parseInt(tax_withheld) || 0)) || ''
                      }
                      onChange={handleInput}
                      type="number"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={
                  isCreatingCompensation ||
                  isEditingCompensation ||
                  isDeletingCompensation
                }
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                {editCompensation ? 'Update' : 'Create'}
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  // createCompensationStatus ? dispatch(toggleCreateCompensation()) : dispatch(toggleEditCompensation());
                  // dispatch(clearCompensation());
                }}
                disabled={
                  isCreatingCompensation ||
                  isEditingCompensation ||
                  isDeletingCompensation
                }
                sx={{ ml: 1, background: '#e3f2fd', color: '#222' }}
              >
                Cancel
              </Button>

              {editCompensation && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    // dispatch(deleteCompensation(editCompensationId));
                    // dispatch(toggleEditCompensation());
                    // dispatch(clearCompensation());
                  }}
                >
                  Delete
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

export default AddCompensation;
