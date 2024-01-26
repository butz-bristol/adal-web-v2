import {
  Box,
  CircularProgress,
  Grid,
  Paper,
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
import AddAdminCompensation from 'src/components/hr/employees/AddAdminCompensation';
import EmployeeCompensation from 'src/components/hr/employees/EmployeeCompensation';
import ManageEmployeeSalary from 'src/components/hr/payroll/ManageEmployeeSalary';
import {
  fetchAllDepartments,
  fetchAllDesignations,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  fetchAllAdminCompensations,
  fetchAllSpecialCompensations,
  fetchAllTeachingCompensations,
} from 'src/features/hrFeatures/employees/employeeSlice';
import { fetchAllSalaryCutoffs } from 'src/features/hrFeatures/payroll/payrollSlice';
import { fetchUsers } from 'src/features/users/userSlice';

const ManageEmployeeSalaries = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { isFetchingDepartments } = useSelector((state) => state.coreHr);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
    dispatch(fetchAllAdminCompensations());
    dispatch(fetchAllTeachingCompensations());
    dispatch(fetchAllSpecialCompensations());
    dispatch(fetchAllSalaryCutoffs());
  }, [dispatch]);

  return (
    <Stack>
      {isFetchingDepartments ? (
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
        <Stack>
          {/* Compensation Modals */}

          <AddAdminCompensation hrview={true} />
          <EmployeeCompensation hrview={true} />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Employee </TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Total Earnings</TableCell>
                  <TableCell>Total Deductions</TableCell>
                  <TableCell>Designated Cut-Off</TableCell>
                  <TableCell>Salary Per Cut-Off</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <ManageEmployeeSalary
                    key={user._id}
                    index={index}
                    user={user}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
};

export default ManageEmployeeSalaries;
