import { Button, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import AddAdminCompensation from 'src/components/hr/employees/AddAdminCompensation';
import AddSpecialCompensation from 'src/components/hr/employees/AddSpecialCompensation';
import AddTeachingCompensation from 'src/components/hr/employees/AddTeachingCompensation';
import EmployeeCompensation from 'src/components/hr/employees/EmployeeCompensation';
import {
  setAdminCompensationValues,
  setSpecialCompensationValues,
  setTeachingCompensationValues,
  toggleCreateAdminCompensation,
  toggleCreateSpecialCompensation,
  toggleCreateTeachingCompensation,
  toggleViewAdminCompensation,
  toggleViewSpecialCompensation,
  toggleViewTeachingCompensation,
} from 'src/features/hrFeatures/employees/employeeSlice';

const Employment = () => {
  const dispatch = useDispatch();
  const {
    employee_profile: {
      admin_designation_toggle,
      admin_department,
      admin_designation,
      admin_designation_year,
      admin_designation_semester,

      teaching_designation_toggle,
      teaching_department,
      teaching_designation,
      teaching_designation_year,
      teaching_designation_semester,
      teaching_designation_specialization,

      special_designation_toggle,
      special_department,
      special_designation,
      special_designation_year,
      special_designation_semester,
      joining_date,
      _id: employeId,
    },
    userProfile: { isHrAdmin },
  } = useSelector((state) => state.users);
  const { departments, designations } = useSelector((state) => state.coreHr);
  const { admin_compensations, teaching_compensations, special_compensations } =
    useSelector((state) => state.employees);

  //  Departments & Designations

  let adminDesignation = '';
  let adminDepartment = '';
  let teachingDesignation = '';
  let teachingDepartment = '';
  let specialDesignation = '';
  let specialDepartment = '';

  if (admin_designation_toggle) {
    const { designation_name } =
      designations.find(
        (designation) => designation._id === admin_designation
      ) || null;
    adminDesignation = designation_name;

    const { department_name } =
      departments.find((department) => department._id === admin_department) ||
      null;
    adminDepartment = department_name;
  }

  if (teaching_designation_toggle) {
    const { designation_name } =
      designations.find(
        (designation) => designation._id === teaching_designation
      ) || null;
    teachingDesignation = designation_name;

    const { department_name } =
      departments.find(
        (department) => department._id === teaching_department
      ) || null;
    teachingDepartment = department_name;
  }

  if (special_designation_toggle) {
    const { designation_name } =
      designations.find(
        (designation) => designation._id === special_designation
      ) || null;
    specialDesignation = designation_name;

    const { department_name } =
      departments.find((department) => department._id === special_department) ||
      null;
    specialDepartment = department_name;
  }

  // Compensations

  let adminCompensation = '';
  let teachingCompensation = '';
  let specialCompensation = '';

  const admin_compensation = admin_compensations?.find(
    (compensation) => compensation.employee_id === employeId
  );

  const teaching_compensation = teaching_compensations?.find(
    (compensation) => compensation.employee_id === employeId
  );

  const special_compensation = special_compensations?.find(
    (compensation) => compensation.employee_id === employeId
  );

  if (admin_compensation) {
    adminCompensation = admin_compensation;
  }

  if (teaching_compensation) {
    teachingCompensation = teaching_compensation;
  }

  if (special_compensation) {
    specialCompensation = special_compensations;
  }

  function rowData(field, data) {
    return { field, data };
  }

  const employment = [
    rowData('Policies', 'Docs'),
    rowData('Employee Handbook', 'Docs'),
    rowData('Organizational Chart', 'Docs'),
  ];

  return (
    <Grid container>
      <Grid item lg={6} xs={12} mb={1}>
        <Typography variant="h5" gutterBottom>
          Employment Date
        </Typography>
        <Typography paragraph>
          {joining_date
            ? DateTime.fromISO(joining_date).toFormat('dd LLL yyyy')
            : 'N/A'}
        </Typography>
      </Grid>

      {/* Admin Compensation */}

      <AddAdminCompensation />

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h5">Admin Designation</Typography>
            <Typography paragraph gutterBottom>
              {adminDepartment ? adminDepartment : 'N/A'}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Admin Position
            </Typography>
            <Typography paragraph>
              {adminDesignation ? adminDesignation : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {isHrAdmin && !adminCompensation && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                disabled={!adminDesignation}
                onClick={() => {
                  dispatch(toggleCreateAdminCompensation());
                }}
              >
                Add Compensation
              </Button>
            )}

            {adminCompensation && (
              <Button
                sx={{ mt: '1rem' }}
                variant="outlined"
                onClick={() => {
                  dispatch(toggleViewAdminCompensation());
                  dispatch(setAdminCompensationValues(adminCompensation));
                }}
              >
                View
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Teaching Compensation */}

      <AddTeachingCompensation />

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h5">Teaching Designation</Typography>
            <Typography paragraph gutterBottom>
              {teachingDepartment ? teachingDepartment : 'N/A'}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Teaching Position
            </Typography>
            <Typography paragraph>
              {teachingDesignation ? teachingDesignation : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {isHrAdmin && !teachingCompensation && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                disabled={!teachingDesignation}
                onClick={() => {
                  dispatch(toggleCreateTeachingCompensation());
                }}
              >
                Add Compensation
              </Button>
            )}

            {teachingCompensation && (
              <Button
                sx={{ mt: '1rem' }}
                variant="outlined"
                onClick={() => {
                  dispatch(toggleViewTeachingCompensation());
                  dispatch(setTeachingCompensationValues(teachingCompensation));
                }}
              >
                View
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Special Compensation */}

      <AddSpecialCompensation />

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h5">Special Designation</Typography>
            <Typography paragraph gutterBottom>
              {specialDepartment ? specialDepartment : 'N/A'}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Special Position
            </Typography>
            <Typography paragraph>
              {specialDesignation ? specialDesignation : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {isHrAdmin && !specialCompensation && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                disabled={!specialDesignation}
                onClick={() => {
                  dispatch(toggleCreateSpecialCompensation());
                }}
              >
                Add Compensation
              </Button>
            )}

            {specialCompensation && (
              <Button
                sx={{ mt: '1rem' }}
                variant="outlined"
                onClick={() => {
                  dispatch(toggleViewSpecialCompensation());
                  dispatch(setSpecialCompensationValues(specialCompensation));
                }}
              >
                View
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      <EmployeeCompensation />
    </Grid>
  );
};

export default Employment;
