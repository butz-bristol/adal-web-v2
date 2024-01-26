import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDepartments,
  fetchAllDesignations,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  deleteTimesheet,
  setTimesheet,
  setTimesheetValues,
  toggleEditTimesheet,
  toggleViewTimesheet,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const Timesheet = ({ index, timesheet }) => {
  const dispatch = useDispatch();
  const { departments, designations } = useSelector((state) => state.coreHr);

  const {
    _id,
    employee,
    totalHours,
    totalLeaves,
    employeeId,
    totalPaidHours,
    updatedBy,
    createdAt,
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

  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
  }, []);

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {employee[0]?.first_name} {employee[0]?.last_name}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {employeeDepartments.map((department, index) => (
          <div key={index}>{department?.department_name}</div>
        ))}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {employeeDesignations.map((designation, index) => (
          <div key={index}>{designation?.designation_name}</div>
        ))}
      </TableCell>
      <TableCell>{totalHours}</TableCell>
      <TableCell>{totalLeaves}</TableCell>
      <TableCell>{totalPaidHours}</TableCell>
      <TableCell>HR Admin</TableCell>
      <TableCell>
        <Button
          variant="contained"
          aria-label="view"
          color="info"
          size="small"
          sx={{ m: '0.1rem', minWidth: '0' }}
          onClick={() => {
            dispatch(setTimesheet(timesheet));
            dispatch(toggleViewTimesheet());
          }}
        >
          <PageviewIcon fontSize="20px" />
        </Button>
        <Button
          variant="contained"
          color="warning"
          aria-label="edit"
          size="small"
          sx={{ m: '0.1rem', minWidth: '0' }}
          onClick={() => {
            dispatch(setTimesheetValues(timesheet));
            dispatch(toggleEditTimesheet());
          }}
        >
          <EditIcon fontSize="20px" />
        </Button>
        <Button
          variant="contained"
          aria-label="delete"
          size="small"
          sx={{ m: '0.1rem', minWidth: '0' }}
          color="error"
          onClick={() => dispatch(deleteTimesheet(_id))}
        >
          <DeleteIcon fontSize="20px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default Timesheet;
