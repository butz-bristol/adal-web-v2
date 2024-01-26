import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearDynamicData as clearFinanceDynamicData,
  createPaymentScheme,
  fetchFeesForEnrollment,
  handleChange,
  toggleAddK12PaymentScheme,
  toggleEditK12PaymentScheme,
  updateK12PaymentScheme,
} from 'src/features/financeFeatures/financeSlice';
import {
  clearDynamicData,
  handleChange as handleRegistrarChange,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatSalary } from 'src/utils/helperFunctions';

const DividerComponent = () => {
  return (
    <Grid item xs={12}>
      <Divider sx={{ my: 1 }} />
    </Grid>
  );
};

const AddK12PaymentScheme = () => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const {
    createK12PaymentScheme,
    editK12PaymentScheme,
    studentFees,
    miscellaneous_1,
    miscellaneous_2,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
    march,
    april,
    may,
    payment_scheme_id,
  } = useSelector((state) => state.finance);
  const { academic_years, year_levels, year_level_id, academic_year_id } =
    useSelector((state) => state.registrar);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const yearLevelDepartment = year_levels?.filter(
    (year_level) => year_level._id === year_level_id
  )[0]?.department?.department_name;

  let filteredStudentFees;

  if (
    yearLevelDepartment === 'Pre-School & Grade School' ||
    yearLevelDepartment === 'Junior High School'
  ) {
    filteredStudentFees = studentFees;
  } else if (yearLevelDepartment === 'Senior High School') {
    filteredStudentFees = studentFees?.filter(
      (fee) => fee.fee_label !== 'Tuition Fee'
    );
  }

  const fees = filteredStudentFees?.reduce((acc, fee) => acc + fee.fee, 0);
  const feesMinusMiscellaneous =
    fees - parseFloat(miscellaneous_1 || 0) - parseFloat(miscellaneous_2 || 0);
  const months = [
    'august',
    'september',
    'october',
    'november',
    'december',
    'january',
    'february',
    'march',
    'april',
    'may',
  ];

  const generatePaymentScheme = () => {
    const monthly = feesMinusMiscellaneous / 10;

    for (const month of months) {
      dispatch(handleChange({ name: month, value: monthly }));
    }
  };

  const total = () => {
    const total = months.reduce((acc, month) => {
      const monthValue = eval(month) || 0;
      return acc + parseFloat(monthValue);
    }, 0);

    return parseFloat(total.toFixed(2));
  };

  const clearData = () => {
    createK12PaymentScheme && dispatch(toggleAddK12PaymentScheme());
    editK12PaymentScheme && dispatch(toggleEditK12PaymentScheme());

    dispatch(
      clearDynamicData({
        academic_year_id,
        year_level_id,
      })
    );

    dispatch(
      clearFinanceDynamicData({
        miscellaneous_1,
        miscellaneous_2,
        august,
        september,
        october,
        november,
        december,
        january,
        february,
        march,
        april,
        may,
      })
    );

    dispatch(
      handleChange({
        name: 'studentFees',
        value: [],
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payment_scheme = [];

    if (
      yearLevelDepartment === 'Pre-School & Grade School' ||
      yearLevelDepartment === 'Junior High School'
    ) {
      payment_scheme.push({
        month: 'miscellaneous-1',
        balance: miscellaneous_1,
        to_pay: miscellaneous_1,
      });
    } else if (yearLevelDepartment === 'Senior High School') {
      payment_scheme.push(
        {
          month: 'miscellaneous-1',
          balance: miscellaneous_1,
          to_pay: miscellaneous_1,
        },
        {
          month: 'miscellaneous-2',
          balance: miscellaneous_2,
          to_pay: miscellaneous_2,
        }
      );
    }

    const august_to_september = [
      {
        month: 'august',
        balance: august,
        to_pay: august,
      },
      {
        month: 'september',
        balance: september,
        to_pay: september,
      },
      {
        month: 'october',
        balance: october,
        to_pay: october,
      },
      {
        month: 'november',
        balance: november,
        to_pay: november,
      },
      {
        month: 'december',
        balance: december,
        to_pay: december,
      },
      {
        month: 'january',
        balance: january,
        to_pay: january,
      },
      {
        month: 'february',
        balance: february,
        to_pay: february,
      },
      {
        month: 'march',
        balance: march,
        to_pay: march,
      },
      {
        month: 'april',
        balance: april,
        to_pay: april,
      },
      {
        month: 'may',
        balance: may,
        to_pay: may,
      },
    ];

    if (editK12PaymentScheme) {
      return dispatch(
        updateK12PaymentScheme({
          id: payment_scheme_id,
          academic_year: academic_year_id,
          total: fees,
          year_level: year_level_id,
          department: 'K-12',
          payment_scheme: [...payment_scheme, ...august_to_september],
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            return clearData();
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    }

    if (createK12PaymentScheme) {
      return dispatch(
        createPaymentScheme({
          academic_year: academic_year_id,
          total: fees,
          year_level: year_level_id,
          department: 'K-12',
          payment_scheme: [...payment_scheme, ...august_to_september],
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            return clearData();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    if (!academic_year_id || !year_level_id) return;

    dispatch(
      fetchFeesForEnrollment({
        academic_year: academic_year_id,
        level: year_level_id,
      })
    );
  }, [dispatch, academic_year_id, year_level_id]);

  useEffect(() => {
    if (editK12PaymentScheme) return;

    dispatch(
      clearFinanceDynamicData({
        miscellaneous_1,
        miscellaneous_2,
        august,
        september,
        october,
        november,
        december,
        january,
        february,
        march,
        april,
        may,
      })
    );

    dispatch(
      handleChange({
        name: 'studentFees',
        value: [],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, year_level_id, editK12PaymentScheme]);

  return (
    <Modal
      open={createK12PaymentScheme || editK12PaymentScheme}
      onClose={clearData}
    >
      <Paper
        sx={{
          ...styles,
          maxHeight: '720px',
          maxWidth: '500px',
          height: 'auto',
          overflowY: 'scroll',
        }}
      >
        <Typography variant="h4" component="h6" align="center" mb={3}>
          {createK12PaymentScheme ? 'Create' : 'Update'} K12 Payment Scheme
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="academic-year-label">Academic Year</InputLabel>
                <Select
                  labelId="academic-year-label"
                  id="academic-year"
                  name="academicYear"
                  value={academic_year_id}
                  label="Academic Year"
                  onChange={(e) =>
                    dispatch(
                      handleRegistrarChange({
                        name: 'academic_year_id',
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {academic_years.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="year-level-label">Year Level</InputLabel>
                <Select
                  labelId="year-level-label"
                  id="year-level"
                  name="year_level_id"
                  value={year_level_id || ''}
                  label="Year Level"
                  onChange={(e) =>
                    dispatch(
                      handleRegistrarChange({
                        name: 'year_level_id',
                        value: e.target.value,
                      })
                    )
                  }
                  inputProps={{
                    disabled: !academic_year_id,
                  }}
                >
                  {year_levels
                    .filter(
                      (year_level) =>
                        year_level?.department?.department_name !== 'College' &&
                        year_level?.department?.department_name !==
                          'Technical Education and Skills Development Authority (TESDA)'
                    )
                    .map((year_level) => (
                      <MenuItem key={year_level._id} value={year_level._id}>
                        {year_level.year_level_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <DividerComponent />

            <Grid item xs={12}>
              <Typography variant="h4">
                Total Fees: {formatSalary(fees)}
              </Typography>
            </Grid>

            <DividerComponent />

            <Grid item xs={12}>
              <Grid container spacing={1} alignItems={'center'}>
                {yearLevelDepartment === 'Pre-School & Grade School' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        Miscellaneous
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="miscellaneous_1"
                          name="miscellaneous_1"
                          type="number"
                          value={miscellaneous_1}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={generatePaymentScheme}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}

                {yearLevelDepartment === 'Junior High School' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        Miscellaneous
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="miscellaneous_1"
                          name="miscellaneous_1"
                          type="number"
                          value={miscellaneous_1}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={generatePaymentScheme}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}

                {yearLevelDepartment === 'Senior High School' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        Miscellaneous (1st Sem)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="miscellaneous_1"
                          name="miscellaneous_1"
                          type="number"
                          value={miscellaneous_1}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={generatePaymentScheme}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        Miscellaneous (2nd Sem)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="miscellaneous_2"
                          name="miscellaneous_2"
                          type="number"
                          value={miscellaneous_2}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={generatePaymentScheme}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}

                {/* Aug */}

                {yearLevelDepartment && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        August
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="august"
                          name="august"
                          type="number"
                          value={august}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Sept */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        September
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="september"
                          name="september"
                          type="number"
                          value={september}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Oct */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        October
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="october"
                          name="october"
                          type="number"
                          value={october}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Nov */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        November
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="november"
                          name="november"
                          type="number"
                          value={november}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Dec */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        December
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="december"
                          name="december"
                          type="number"
                          value={december}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Jan */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        January
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="january"
                          name="january"
                          type="number"
                          value={january}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Feb */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        February
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="february"
                          name="february"
                          type="number"
                          value={february}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* March */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        March
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="march"
                          name="march"
                          type="number"
                          value={march}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* April */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        April
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="april"
                          name="april"
                          type="number"
                          value={april}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* May */}

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" fontWeight={'bold'}>
                        May
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          id="may"
                          name="may"
                          type="number"
                          value={may}
                          onChange={handleInputChange}
                          inputProps={{
                            min: 0,
                            max: studentFees?.reduce(
                              (acc, fee) => acc + fee.fee,
                              0
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </>
                )}

                <DividerComponent />

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    fontWeight={'bold'}
                    textAlign={'right'}
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    color={
                      total() > feesMinusMiscellaneous ? 'secondary' : 'initial'
                    }
                  >
                    {formatSalary(total())}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <DividerComponent />

            {/* Save Confirmation */}

            <ConfirmationModal
              title="Confirm Action"
              message={'Are you sure you want to save Payment Scheme'}
              isOpen={showConfirmationModal}
              onCancel={handleCloseConfirmationModal}
              onConfirm={(e) => {
                e.preventDefault();
                handleSubmit(e);
                handleCloseConfirmationModal();
              }}
            />

            <Grid item xs={12}>
              <Stack alignItems={'center'}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: {
                      xs: '200px',
                      sm: '300px',
                    },
                  }}
                  onClick={() => {
                    if (!academic_year_id || !year_level_id)
                      return toast.error(
                        'Please select academic year and year level.'
                      );

                    setShowConfirmationModal(true);
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddK12PaymentScheme;
