import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearLeaveValues,
  createLeaveApplication,
  fetchAllLeaveCategories,
  handleChange,
  toggleCreateLeaveApplicationModal,
  toggleEditingLeaveApplication,
  updateLeaveApplication,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import { fetchAllCutOffDates } from 'src/features/hrFeatures/payroll/payrollSlice';
import styles from '../modalBoxStyle';

const AddLeaveApplication = () => {
  const dispatch = useDispatch();
  const {
    leave_categories,
    editLeaveApplication,
    isEditingLeaveApplication,
    isCreatingLeaveApplication,
    createLeaveApplicationModal,
    leave_type,
    leave_start_date,
    leave_end_date,
    leave_reason,
    leave_days,
    leave_status,
    leave_reject_reason,
    editLeaveApplicationId,
    supervisor_id: supervisorId,
    userId,
  } = useSelector((state) => state.coreHr);
  const { currentCutOffDate } = useSelector((state) => state.payroll);
  const {
    supervisors,
    user,
    userProfile: { _id, supervisor_id },
  } = useSelector((state) => state.users);

  const employeeSupervisor = supervisors.find(
    (user) =>
      user._id ===
      `${createLeaveApplicationModal ? supervisor_id : supervisorId}`
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  let leaveDays =
    DateTime.fromISO(leave_end_date).diff(
      DateTime.fromISO(leave_start_date),
      'days'
    ).days + 1;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leave_type || !leave_start_date || !leave_end_date || !leave_reason) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editLeaveApplication) {
      dispatch(
        updateLeaveApplication({
          leave_type,
          leave_start_date,
          leave_end_date,
          leave_reason,
          leave_days,
          userId,
          supervisorId,
          leave_reject_reason,
          leave_status,
          leaveApplicationId: editLeaveApplicationId,
        })
      );
      return;
    }

    dispatch(
      createLeaveApplication({
        leave_type,
        leave_start_date,
        leave_end_date,
        leave_reason,
        leave_days,
        userId: _id,
        supervisor_id,
      })
    );

    setTimeout(() => {
      dispatch(clearLeaveValues());
    }, 1500);
  };

  useEffect(() => {
    dispatch(fetchAllLeaveCategories());
    dispatch(fetchAllCutOffDates());
  }, [dispatch]);

  return (
    <Modal
      open={createLeaveApplicationModal || editLeaveApplication}
      onClose={() => {
        createLeaveApplication
          ? dispatch(toggleCreateLeaveApplicationModal())
          : dispatch(toggleEditingLeaveApplication());
        dispatch(clearLeaveValues());
      }}
      aria-labelledby="add-leave-application"
      aria-describedby="add-leave-application"
    >
      <Paper sx={styles}>
        <Stack spacing={2} mb={3}>
          <Typography variant="h4" id="modal-modal-title" component="h2">
            {createLeaveApplicationModal ? 'Create Leave' : 'Edit Leave'}
          </Typography>
        </Stack>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="leave_type">Leave Type</InputLabel>
                <Select
                  labelId="leave_type"
                  id="leave_type"
                  name="leave_type"
                  value={leave_type}
                  onChange={handleInput}
                  label="Leave Type"
                >
                  {leave_categories.map((leave_category) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
                      key={leave_category._id}
                      value={leave_category._id}
                    >
                      {leave_category.leave_category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Supervisor
                </InputLabel>
                <Select
                  label="Supervisor"
                  name="supervisor_id"
                  value={editLeaveApplication ? supervisorId : supervisor_id}
                  id="demo-simple-select"
                  readOnly
                >
                  <MenuItem value={employeeSupervisor?._id}>
                    {employeeSupervisor?.first_name}{' '}
                    {employeeSupervisor?.last_name}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Alert color="warning" variant="filled" severity="warning">
                Current Cut Off Date is{' '}
                <strong>
                  {DateTime.fromISO(
                    currentCutOffDate?.cutOffStartDate
                  ).toLocaleString(DateTime.DATE_MED)}{' '}
                  -{' '}
                  {DateTime.fromISO(
                    currentCutOffDate?.cutOffEndDate
                  ).toLocaleString(DateTime.DATE_MED)}
                </strong>
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <Typography variant="h6">Start Date</Typography>
                <OutlinedInput
                  id="leave_start_date"
                  name="leave_start_date"
                  type="date"
                  value={DateTime.fromISO(leave_start_date).toFormat(
                    'yyyy-MM-dd'
                  )}
                  onChange={handleInput}
                  inputProps={{
                    min:
                      DateTime.fromISO(currentCutOffDate?.cutOffStartDate) >
                      DateTime.now()
                        ? DateTime.fromISO(
                            currentCutOffDate?.cutOffStartDate
                          ).toFormat('yyyy-MM-dd')
                        : DateTime.now().toFormat('yyyy-MM-dd'),
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <Typography variant="h6">End Date</Typography>
                <OutlinedInput
                  id="leave_end_date"
                  name="leave_end_date"
                  type="date"
                  value={DateTime.fromISO(leave_end_date).toFormat(
                    'yyyy-MM-dd'
                  )}
                  onChange={handleInput}
                  inputProps={{
                    min: editLeaveApplication
                      ? DateTime.fromISO(leave_start_date).toFormat(
                          'yyyy-MM-dd'
                        )
                      : leave_start_date,
                    max: DateTime.fromISO(
                      currentCutOffDate?.cutOffEndDate
                    ).toFormat('yyyy-MM-dd'),
                  }}
                  disabled={!leave_start_date}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <TextField
                fullWidth
                id="leave_reason"
                name="leave_reason"
                label="Reason"
                multiline
                rows={4}
                value={leave_reason}
                onChange={handleInput}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl variant="outlined">
                <InputLabel>Days</InputLabel>
                <Input
                  fullWidth
                  id="leave_days"
                  name="leave_days"
                  label="Days"
                  value={leave_end_date ? leaveDays : ''}
                  onChange={handleInput}
                  variant="outlined"
                  required
                  readOnly
                />
              </FormControl>
            </Grid>

            {editLeaveApplication &&
              (user?.user_role === 'hr admin' ||
                userProfile.supervisor === 'yes') && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="leave_status">Leave Status</InputLabel>
                    <Select
                      labelId="leave_status"
                      id="leave_status"
                      name="leave_status"
                      value={leave_status}
                      onChange={handleInput}
                      label="Leave Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approve</MenuItem>
                      <MenuItem value="rejected">Reject</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

            {leave_status === 'rejected' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="leave_reject_reason"
                  name="leave_reject_reason"
                  label="Rejection Reason"
                  multiline
                  rows={4}
                  value={leave_reject_reason}
                  onChange={handleInput}
                  variant="outlined"
                  required
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              width="100%"
              alignItems="center"
              justifyContent="center"
              justifyItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  isCreatingLeaveApplication || isEditingLeaveApplication
                }
              >
                {isCreatingLeaveApplication || isEditingLeaveApplication ? (
                  <CircularProgress size={20} />
                ) : createLeaveApplicationModal ? (
                  'Create Leave'
                ) : (
                  'Update Leave'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};
export default AddLeaveApplication;
