import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearCompensation,
//   deleteCompensation,
//   setCompensationValues,
//   setEmployeeValues,
//   toggleEditCompensation,
//   toggleViewCompensation
// } from 'src/features/hrFeatures/employees/employeeSlice';
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
import {
  fetchAllSalaryCutoffs,
  fetchAllSalaryGradeGuides,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const EmployeeCompensation = ({ hrview }) => {
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
    viewCompensation,
    editCompensationId,
    isDeletingCompensation,
    first_name,
    last_name,
    // user_designations: employee_designations
  } = useSelector((state) => state.employees);
  const {
    // userProfile: { user_designations }
  } = useSelector((state) => state.users);
  const { salary_grade_guides, salary_cutoffs } = useSelector(
    (state) => state.payroll
  );
  // const { designations, departments } = useSelector((state) => state.coreHr);

  // const designation = designations?.find((designation) => designation._id === employee_designations[0].designation_id);

  // const department = departments?.find((department) => department._id === employee_designations[0].department_id);

  // const designatedCutoff = salary_cutoffs.find((cutoff) =>
  //   cutoff.designationId._id === hrview ? employee_designations[0].designation_id : user_designations[0].designation_id
  // );

  useEffect(() => {
    dispatch(fetchAllSalaryGradeGuides());
    dispatch(fetchAllSalaryCutoffs());
  }, [dispatch]);

  return (
    <Modal
      open={false}
      onClose={() => {
        dispatch(toggleViewCompensation());
        dispatch(clearCompensation());
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
          View Compensation
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            {hrview && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <TextField
                    id="employee"
                    name="employee"
                    label="Employee"
                    variant="outlined"
                    disabled
                    value={first_name + ' ' + last_name}
                  />
                </FormControl>
              </Grid>
            )}

            {hrview && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <TextField
                    id="designation"
                    name="designation"
                    label="Designation"
                    variant="outlined"
                    // value={designation && designation.designation_name}
                    disabled
                  />
                </FormControl>
              </Grid>
            )}

            {hrview && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <TextField
                    id="department"
                    name="department"
                    label="Department"
                    variant="outlined"
                    //  value={department && department?.department_name}
                    disabled
                  />
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="salary_rate"
                  name="salary_rate"
                  label="Salary Rate"
                  variant="outlined"
                  value={salary_rate}
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="salary_grade">Salary Grade</InputLabel>
                <Select
                  labelId="salary_grade"
                  id="salary_grade"
                  disabled={viewCompensation}
                  name="salary_grade"
                  label="Salary Grade"
                  value={salary_grade}
                >
                  {salary_grade_guides.map((grade_guide) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
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
                />
              </FormControl>
            </Grid>

            {hrview && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <TextField
                    id="tax_salary_category"
                    name="tax_salary_category"
                    label="Tax Salary Category"
                    variant="outlined"
                    value={tax_salary_category}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="cutOffPeriod"
                  name="cutOffPeriod"
                  label="Designated Cut Off"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
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
                <Grid container rowGap={2} mt={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="sss"
                      fullWidth
                      name="sss"
                      label="Social Security System"
                      variant="outlined"
                      value={sss}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="philhealth"
                      name="philhealth"
                      label="Philhealth"
                      variant="outlined"
                      value={philhealth}
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
                      type="number"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h5" sx={{ mb: '.75rem' }}>
                Other Allowances
              </Typography>
              <FormControl fullWidth>
                {other_allowances &&
                  other_allowances.map((allowance, index) => (
                    <Grid container spacing={2} pb={2} key={index}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <TextField
                            label="Allowance Type"
                            variant="outlined"
                            name="other_allowance_type"
                            value={allowance.other_allowance_type}
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
                              value={
                                parseInt(allowance.other_allowance_amount) || 0
                              }
                              type="number"
                              fullWidth
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
              </FormControl>
            </Grid>

            {!hrview && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <TextField
                    id="tax_salary_category"
                    name="tax_salary_category"
                    label="Tax Salary Category"
                    variant="outlined"
                    value={tax_salary_category}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  id="tax_withheld"
                  name="tax_withheld"
                  label="Tax Withheld"
                  variant="outlined"
                  value={tax_withheld ? tax_withheld : ''}
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
                      value={total_earnings ? total_earnings : ''}
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
                      value={total_deductions ? total_deductions : ''}
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
                      value={take_home_pay ? take_home_pay : ''}
                      type="number"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={isDeletingCompensation}
                color="primary"
                type="button"
                onClick={() => {
                  // dispatch(toggleEditCompensation());
                  dispatch(
                    setCompensationValues({
                      _id: editCompensationId,
                      userId,
                      salary_rate,
                      salary_grade,
                      computed_hourly_rate,
                      cutOffPeriod,
                      sss,
                      philhealth,
                      pag_ibig,
                      other_allowances,
                      tax_salary_category,
                      tax_withheld,
                      total_earnings,
                      total_deductions,
                      take_home_pay,
                    })
                  );
                  dispatch(
                    setEmployeeValues({
                      first_name,
                      last_name,
                      user_designations: employee_designations,
                    })
                  );
                  // dispatch(toggleViewCompensation());
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  dispatch(toggleViewCompensation());
                  dispatch(clearCompensation());
                }}
                disabled={isDeletingCompensation}
                sx={{
                  ml: 1,
                  background: '#e3f2fd',
                  color: '#222',
                  '&:hover': {
                    background: '#e3f2fd',
                    color: '#222',
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => {
                  dispatch(deleteCompensation(editCompensationId));
                  dispatch(toggleViewCompensation());
                  dispatch(clearCompensation());
                }}
              >
                Delete
              </Button>
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
export default EmployeeCompensation;
