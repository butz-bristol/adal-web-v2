import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
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
import {
  IconLayoutGrid,
  IconList,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import AddTuitionAndFee from 'src/components/finance/AddTuitionAndFee';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteTuitionAndFee,
  fetchAllAcademicYears,
  fetchAllTuitionAndFees,
  handleChange,
  setAcademicYear,
  setTuitionAndFee,
  setTuitionAndFeeId,
  toggleCreateTuitionAndFee,
  toggleGridView,
  toggleListView,
} from 'src/features/financeFeatures/financeSlice';
import { extractRole } from 'src/utils/helperFunctions';
const TuitionAndFees = () => {
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { user } = useSelector((state) => state.users);
  const {
    tuitionAndFees,
    isFetchingTuitionAndFees,
    tuition_and_fee_query,
    gridView,
    listView,
    tuition_and_fee_id,
  } = useSelector((state) => state.finance);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    dispatch(fetchAllTuitionAndFees());
    dispatch(fetchAllAcademicYears());
  }, [dispatch]);

  return (
    <Stack>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap=".5rem"
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => dispatch(toggleGridView())}
              sx={{ minWidth: 0 }}
            >
              <IconLayoutGrid stroke={2} size="1.2rem" />
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => dispatch(toggleListView())}
              sx={{ minWidth: 0 }}
            >
              <IconList stroke={2} size="1.2rem" />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap="1rem"
          >
            <FormControl>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                name="tuition_and_fee_query"
                value={tuition_and_fee_query}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch stroke={1.5} size="1rem" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(toggleCreateTuitionAndFee())}
                startIcon={<IconPlus stroke={2} size="1.2rem" />}
              >
                Add New
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <AddTuitionAndFee />

      <ConfirmationModal
        isOpen={openConfirmation}
        title={'Confirm Action'}
        message={'Are you sure you want to perform this action?'}
        onCancel={handleCloseConfirmation}
        onConfirm={() => {
          dispatch(deleteTuitionAndFee(tuition_and_fee_id));
          handleCloseConfirmation();
        }}
      />

      <Box>
        {isFetchingTuitionAndFees ? (
          <Grid
            container
            width="100%"
            justifyItems="center"
            alignItems="center"
            minHeight="200px"
          >
            <Box
              sx={{
                margin: '0 auto',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress size="70px" />
            </Box>
          </Grid>
        ) : listView ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tuition Plan</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tuitionAndFees.map((tuition_plan) => (
                  <TableRow key={tuition_plan._id}>
                    <TableCell>
                      {tuition_plan?.academic_year?.school_year}
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
                        <LinkComponent
                          to={`/${extractRole(user?.user_role)}/setup-fees/fee`}
                          onClick={() => {
                            dispatch(setTuitionAndFeeId(tuition_plan._id));
                            dispatch(
                              setAcademicYear(tuition_plan.academic_year?._id)
                            );
                          }}
                        >
                          <Button variant="outlined" size="small">
                            View
                          </Button>
                        </LinkComponent>

                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => {
                            dispatch(
                              setTuitionAndFee({
                                _id: tuition_plan._id,
                                academic_year: tuition_plan.academic_year?._id,
                              })
                            );
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          onClick={() => {
                            handleOpenConfirmation();
                            dispatch(setTuitionAndFeeId(tuition_plan._id));
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : gridView ? (
          <Grid container spacing={2} mt={2}>
            {tuitionAndFees.map((tuition_plan) => (
              <Grid item xs={12} md={4} lg={3} key={tuition_plan._id}>
                <Card
                  sx={{
                    '&:hover': {
                      boxShadow: '0 8px 10px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h4" component={'div'}>
                      {tuition_plan?.academic_year?.school_year}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <LinkComponent
                        to={`/${extractRole(user?.user_role)}/setup-fees/fee`}
                        onClick={() => {
                          dispatch(setTuitionAndFeeId(tuition_plan._id));
                          dispatch(
                            setAcademicYear(tuition_plan.academic_year?._id)
                          );
                        }}
                      >
                        <Button variant="outlined" size="small">
                          View
                        </Button>
                      </LinkComponent>

                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => {
                          dispatch(
                            setTuitionAndFee({
                              _id: tuition_plan._id,
                              academic_year: tuition_plan.academic_year?._id,
                            })
                          );
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          handleOpenConfirmation();
                          dispatch(setTuitionAndFeeId(tuition_plan._id));
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Box>
    </Stack>
  );
};

export default TuitionAndFees;
