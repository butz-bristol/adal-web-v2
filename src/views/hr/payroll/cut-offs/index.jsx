import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createCutOffDate,
  deleteCutOffDate,
  fetchAllCutOffDates,
  handleChange,
  resetCutOffDate,
  setCurrentCutOffDate,
  setCutOffDate,
  toggleEditCutOffDate,
  updateCutOffDate,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const CutOffs = () => {
  const dispatch = useDispatch();
  const {
    cutOffDates,
    editCutOffDate,
    cutOffStartDate,
    cutOffEndDate,
    isEditingCutOffDate,
    isCreatingCutOffDate,
    editCutOffDateId,
    isSettingCurrentCutOffDate,
    cutOffDateId,
  } = useSelector((state) => state.payroll);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cutOffStartDate || !cutOffEndDate) {
      toast.error('Please enter start and end date');
      return;
    }

    if (editCutOffDate) {
      dispatch(
        updateCutOffDate({ editCutOffDateId, cutOffStartDate, cutOffEndDate })
      );
      return;
    }

    dispatch(createCutOffDate({ cutOffStartDate, cutOffEndDate }));

    setTimeout(() => {
      dispatch(resetCutOffDate());
    }, 1500);
  };

  useEffect(() => {
    dispatch(fetchAllCutOffDates());
  }, []);

  return (
    <Stack>
      {/* Form */}
      <form>
        <Grid container p={1} spacing={1}>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <Typography variant="h6">Start Date</Typography>
              <OutlinedInput
                id="cutOffStartDate"
                name="cutOffStartDate"
                type="date"
                value={DateTime.fromISO(cutOffStartDate).toFormat('yyyy-MM-dd')}
                onChange={handleInput}
                inputProps={
                  {
                    // min: DateTime.now().toISODate()
                  }
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <Typography variant="h6">End Date</Typography>
              <OutlinedInput
                id="cutOffEndDate"
                name="cutOffEndDate"
                type="date"
                value={DateTime.fromISO(cutOffEndDate).toFormat('yyyy-MM-dd')}
                onChange={handleInput}
                inputProps={{
                  min: editCutOffDate
                    ? DateTime.fromISO(cutOffStartDate).toFormat('yyyy-MM-dd')
                    : cutOffStartDate,
                }}
                disabled={!cutOffStartDate}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3} alignSelf="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={isCreatingCutOffDate || isEditingCutOffDate}
              onClick={handleSubmit}
            >
              {editCutOffDate ? 'Update' : 'Create'}
            </Button>

            {editCutOffDate && (
              <Button
                variant="contained"
                color="error"
                sx={{ ml: '0.5rem' }}
                onClick={() => dispatch(resetCutOffDate())}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Set Cut Off</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cutOffDates.map((cutOff, index) => (
              <TableRow
                key={cutOff._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {' '}
                  {index + 1}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(cutOff.cutOffStartDate).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(cutOff.cutOffEndDate).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </TableCell>
                <TableCell>{cutOff.cutOffDaysRange}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={cutOff.currentCutOffDate ? 'success' : 'primary'}
                    onClick={() => {
                      dispatch(setCurrentCutOffDate(cutOff._id));
                      dispatch(
                        handleChange({
                          name: 'cutOffDateId',
                          value: cutOff._id,
                        })
                      );
                    }}
                    disabled={
                      isSettingCurrentCutOffDate && cutOff._id === cutOffDateId
                    }
                  >
                    {cutOff.currentCutOffDate ? 'Cut Off Date' : 'Set Cut Off'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ minWidth: '0', marginRight: '0.5rem' }}
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => {
                      dispatch(toggleEditCutOffDate());
                      dispatch(setCutOffDate(cutOff));
                    }}
                    disabled={
                      isSettingCurrentCutOffDate && cutOff._id === cutOffDateId
                    }
                  >
                    <EditIcon fontSize="10px" />
                  </Button>
                  <Button
                    sx={{ minWidth: '0' }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => dispatch(deleteCutOffDate(cutOff._id))}
                    disabled={
                      isSettingCurrentCutOffDate && cutOff._id === cutOffDateId
                    }
                  >
                    <DeleteIcon fontSize="10px" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CutOffs;
