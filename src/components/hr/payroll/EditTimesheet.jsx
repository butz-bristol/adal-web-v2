import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleChange,
  resetTimesheetValues,
  toggleEditTimesheet,
  updateTimesheet,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const EditTimesheet = () => {
  const dispatch = useDispatch();
  const { departments, designations } = useSelector((state) => state.coreHr);

  const {
    editTimesheet,
    totalHours,
    totalLeaves,
    totalPaidHours,
    otherUnpaidLeaves,
    editTimesheetId,
    isEditingTimesheet,
    timesheet: {
      employeeId,
      cutOffStartDate,
      cutOffEndDate,
      employee,
      admin_department,
      admin_designation,
      teaching_department,
      teaching_designation,
      special_department,
      special_designation,
    },
  } = useSelector((state) => state.payroll);
  const {
    user: { userId },
  } = useSelector((state) => state.users);

  const adminDesignation = designations.find(
    (designation) => designation._id === admin_designation
  );
  const adminDepartment = departments.find(
    (department) => department._id === admin_department
  );

  const teachingDesignation = designations.find(
    (designation) => designation._id === teaching_designation
  );
  const teachingDepartment = departments.find(
    (department) => department._id === teaching_department
  );

  const specialDesignation = designations.find(
    (designation) => designation._id === special_designation
  );
  const specialDepartment = departments.find(
    (department) => department._id === special_department
  );

  const employeeDesignations = [
    adminDesignation,
    teachingDesignation,
    specialDesignation,
  ];
  const employeeDepartments = [
    adminDepartment,
    teachingDepartment,
    specialDepartment,
  ];

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTimesheet) {
      dispatch(
        updateTimesheet({
          editTimesheetId,
          totalHours,
          totalLeaves,
          totalPaidHours,
          otherUnpaidLeaves,
          updatedBy: userId,
        })
      );
    }

    setTimeout(() => {
      dispatch(resetTimesheetValues());
    }, 1500);
  };

  return (
    <Modal
      open={editTimesheet}
      onClose={() => dispatch(toggleEditTimesheet())}
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
          padding: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Edit Timesheet Details
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="employee"
                  label="Employee"
                  value={
                    employee
                      ? employee[0]?.first_name + ' ' + employee[0]?.last_name
                      : ''
                  }
                  variant="outlined"
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Tooltip title="Editable" placement="top">
                  <TextField
                    name="totalHours"
                    label="Total Hours Worked"
                    value={totalHours}
                    variant="outlined"
                    onChange={handleInput}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="department"
                  label="Department(s)"
                  value={employeeDepartments
                    .map((department) => department?.department_name)
                    .join(', ')}
                  variant="outlined"
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="designation"
                  label="Designation(s)"
                  value={employeeDesignations
                    .map((designation) => designation?.designation_name)
                    .join(', ')}
                  variant="outlined"
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Tooltip title="Editable" placement="bottom">
                  <TextField
                    name="totalLeaves"
                    label="Total Leave Days"
                    value={totalLeaves}
                    onChange={handleInput}
                    variant="outlined"
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="cutOffDate"
                  label="Cut Off Period"
                  value={
                    cutOffStartDate && cutOffStartDate
                      ? DateTime.fromISO(cutOffStartDate).toLocaleString(
                          DateTime.DATE_MED
                        ) +
                        ' - ' +
                        DateTime.fromISO(cutOffEndDate).toLocaleString(
                          DateTime.DATE_MED
                        )
                      : ''
                  }
                  variant="outlined"
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Tooltip title="Editable" placement="bottom">
                  <TextField
                    name="totalPaidHours"
                    label="Total Paid Hours"
                    value={totalPaidHours}
                    variant="outlined"
                    onChange={handleInput}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Tooltip title="Editable" placement="bottom">
                  <TextField
                    name="otherUnpaidLeaves"
                    label="Total Unpaid Leaves"
                    value={otherUnpaidLeaves}
                    variant="outlined"
                    onChange={handleInput}
                  />
                </Tooltip>
              </FormControl>
            </Grid>

            <Button
              variant="contained"
              disabled={isEditingTimesheet}
              sx={{ ml: 2, mt: 2 }}
              color="primary"
              onClick={handleSubmit}
            >
              Update
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 1, mt: 2 }}
              onClick={() => {
                dispatch(toggleEditTimesheet());
                dispatch(resetTimesheetValues());
              }}
              disabled={isEditingTimesheet}
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTimesheet;
