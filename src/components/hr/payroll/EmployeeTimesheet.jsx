import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTimesheetValues,
  toggleEditTimesheet,
  toggleViewTimesheet,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const EmployeeTimesheet = () => {
  const dispatch = useDispatch();
  const { viewTimesheet, timesheet } = useSelector((state) => state.payroll);
  const { departments, designations } = useSelector((state) => state.coreHr);

  const {
    _id,
    date,
    employee,

    totalHours,
    totalLeaves,
    vacationDaysInHours,
    sickDaysInHours,
    maternityDaysInHours,
    paternityDaysInHours,
    otherUnpaidLeaves,
    cutOffStartDate,
    cutOffEndDate,
    totalPaidLeaves,
    admin_department,
    admin_designation,
    teaching_department,
    teaching_designation,
    special_department,
    special_designation,
  } = timesheet;

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

  return (
    <Modal
      open={viewTimesheet}
      onClose={() => dispatch(toggleViewTimesheet())}
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
        <Typography variant="h2">Timesheet Details</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
          <Typography variant="h4">
            Timesheet was generated on{' '}
            {DateTime.fromISO(date).toFormat('yyyy-MM-dd')}
          </Typography>
        </Box>

        <Grid container p={1} columnSpacing="1rem">
          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Employee</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {employee[0].first_name} {employee[0].last_name}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Department(s)</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {employeeDepartments
                  .map((department) => department?.department_name)
                  .join(', ')}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Designation(s)</Typography>
              <Typography
                variant="h5"
                sx={{
                  textTransform: 'capitalize',
                  borderBottom: '1px solid #000',
                  mt: '0.5rem',
                }}
              >
                {employeeDesignations
                  .map((designation) => designation?.designation_name)
                  .join(', ')}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Total Leave Days</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {totalLeaves}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Total Hours Worked</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {totalHours}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Cut Off Period</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {DateTime.fromISO(cutOffStartDate).toFormat('yyyy-MM-dd')} -{' '}
                {DateTime.fromISO(cutOffEndDate).toFormat('yyyy-MM-dd')}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                sx={{
                  px: 0,
                  background: '#bababd5e',
                  mt: '20px',
                  borderRadius: '10px',
                }}
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography sx={{ px: '7px' }} variant="h4">
                  View Other Leaves
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Grid
                  container
                  columnSpacing="1rem"
                  px="7px"
                  sx={{ background: '#bababd1f' }}
                >
                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Vacation Leaves (Paid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {vacationDaysInHours.paidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Vacation Leaves (Unpaid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {vacationDaysInHours.unpaidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">Sick Leaves (Paid)</Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {sickDaysInHours.paidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">Sick Leaves (Unpaid)</Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {sickDaysInHours.unpaidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Paternity Leaves (Paid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {paternityDaysInHours.paidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Paternity Leaves (Unpaid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {paternityDaysInHours.unpaidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Maternity Leaves (Paid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {maternityDaysInHours.paidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} m="0.5rem 0">
                    <FormControl fullWidth>
                      <Typography variant="h4">
                        Maternity Leaves (Unpaid)
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
                      >
                        {maternityDaysInHours.unpaidLeave}
                      </Typography>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Total Hours Worked</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {totalHours}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Total Paid Leaves</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {totalPaidLeaves}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Total Paid Hours</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {totalHours}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} m="0.5rem 0">
            <FormControl fullWidth>
              <Typography variant="h4">Other Unpaid Leaves</Typography>
              <Typography
                variant="h5"
                sx={{ borderBottom: '1px solid #000', mt: '0.5rem' }}
              >
                {otherUnpaidLeaves}
              </Typography>
            </FormControl>
          </Grid>

          <Grid container p={1}>
            <Grid item xs={12} md={6}>
              <Button
                onClick={() => dispatch(toggleViewTimesheet())}
                color="error"
                variant="contained"
              >
                Close
              </Button>
              <Button
                sx={{ ml: '0.5rem' }}
                onClick={() => {
                  dispatch(toggleViewTimesheet());
                  dispatch(toggleEditTimesheet());
                  dispatch(setTimesheetValues(timesheet));
                }}
                color="info"
                variant="contained"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default EmployeeTimesheet;
