import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeValues } from 'src/features/hrFeatures/employees/employeeSlice';

const ManageEmployeeSalary = ({ user, index }) => {
  const {
    first_name,
    last_name,
    _id,
    admin_department,
    admin_designation,
    teaching_department,
    teaching_designation,
    special_department,
    special_designation,
  } = user;
  const dispatch = useDispatch();
  const { designations, departments } = useSelector((state) => state.coreHr);
  const { salary_cutoffs } = useSelector((state) => state.payroll);
  const { compensations } = useSelector((state) => state.employees);

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
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {first_name} {last_name}
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
      <TableCell>{}</TableCell>
      <TableCell>{}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{}</TableCell>
      <TableCell>0</TableCell>
      <TableCell>
        <Button
          variant="contained"
          sx={{ minWidth: '0', m: '0.1rem' }}
          onClick={() => {
            dispatch(setEmployeeValues(user));
          }}
          color="info"
          size="small"
        >
          <PageviewIcon fontSize="20px" />
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          sx={{ minWidth: '0', m: '0.1rem' }}
        >
          <EditIcon fontSize="20px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ManageEmployeeSalary;
