import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SalaryCutOff from 'src/components/hr/payroll/SalaryCutOff';
import { fetchAllDesignations } from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  createSalaryCutoff,
  fetchAllSalaryCutoffs,
  handleChange,
  resetSalaryCutoffValues,
  updateSalaryCutoff,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const SalaryCutOffs = () => {
  const dispatch = useDispatch();
  const {
    salary_cutoffs,
    isFetchingSalaryCutOffs,
    editSalaryCutoffId,
    designationId,
    editSalaryCutoff,
    cutOffPeriod,
    isCreatingSalaryCutoff,
    isEditingSalaryCutoff,
  } = useSelector((state) => state.payroll);
  const { designations } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!designationId || !cutOffPeriod) {
      toast.error('Please select designation and cut off period');
      return;
    }

    if (editSalaryCutoff) {
      dispatch(
        updateSalaryCutoff({ designationId, cutOffPeriod, editSalaryCutoffId })
      );
      return;
    }

    dispatch(createSalaryCutoff({ designationId, cutOffPeriod }));

    setTimeout(() => {
      dispatch(resetSalaryCutoffValues());
    }, 1500);
  };

  useEffect(() => {
    dispatch(fetchAllSalaryCutoffs());
    dispatch(fetchAllDesignations());
  }, [dispatch]);

  return (
    <Stack>
      {/* Form */}
      <form>
        <Grid container p={1} spacing={1}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="designation" htmlFor="designation">
                Designation
              </InputLabel>
              <Select
                labelId="designation"
                id="designation"
                name="designationId"
                value={designationId}
                onChange={handleInput}
                label="Designation"
              >
                {designations.map((designation) => (
                  <MenuItem
                    sx={{ textTransform: 'capitalize' }}
                    key={designation._id}
                    value={designation._id}
                  >
                    {designation.designation_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={isCreatingSalaryCutoff || isEditingSalaryCutoff}
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 1 }}
            >
              {editSalaryCutoff ? 'Update' : 'Add'}
            </Button>

            {editSalaryCutoff && (
              <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={() => dispatch(resetSalaryCutoffValues())}
                sx={{ mt: 1, ml: '0.5rem' }}
                disabled={isEditingSalaryCutoff}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {isFetchingSalaryCutOffs ? (
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
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Employee Designation</TableCell>
                <TableCell>Assigned Cut Off</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salary_cutoffs.map((cutoff, index) => (
                <SalaryCutOff {...cutoff} index={index} key={cutoff._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default SalaryCutOffs;
