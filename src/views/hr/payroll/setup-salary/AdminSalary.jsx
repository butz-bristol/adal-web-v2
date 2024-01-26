import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddAdminSalary from 'src/components/hr/payroll/AddAdminSalary';
import {
  deleteAdminSalary,
  fetchAdminPrimaryDesignation,
  fetchAdminSalary,
  handleChange,
  setAdminSalary,
  toggleAdminPrimaryDesignation,
  toggleCreateAdminSalary,
  toggleEditAdminSalary,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const AdminSalary = () => {
  const {
    admin_salaries,
    admin_primary_designation,
    isFetchingAdminPrimaryDesignation,
    isSettingAdminPrimaryDesignation,
  } = useSelector((state) => state.payroll);
  const dispatch = useDispatch();

  const handlePrimaryDesignation = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.checked }));
    dispatch(toggleAdminPrimaryDesignation());
  };

  useEffect(() => {
    dispatch(fetchAdminSalary());
    dispatch(fetchAdminPrimaryDesignation());
  }, [dispatch]);

  return (
    <Stack p={1} spacing={2}>
      <Box>
        <Button
          variant="contained"
          onClick={() => dispatch(toggleCreateAdminSalary())}
        >
          Create
        </Button>
      </Box>

      <AddAdminSalary />

      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '&:last-child th': {
                    border: 0.5,
                    borderColor: 'rgba(224, 224, 224, 1)',
                  },
                }}
              >
                <TableCell>School Year</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Days/Year</TableCell>
                <TableCell>Days/Month</TableCell>
                <TableCell>Hours/Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admin_salaries?.map((salary) => (
                <TableRow key={salary._id}>
                  <TableCell>{salary.school_year}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {salary.semester}
                  </TableCell>
                  <TableCell>{salary.no_of_days_per_year}</TableCell>
                  <TableCell>{salary.days_per_month}</TableCell>
                  <TableCell>{salary.no_of_hours_per_year}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="edit"
                      onClick={() => {
                        dispatch(setAdminSalary(salary));
                        dispatch(toggleEditAdminSalary());
                      }}
                    >
                      <EditIcon fontSize="20px" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="delete"
                      onClick={() => dispatch(deleteAdminSalary(salary._id))}
                    >
                      <DeleteIcon fontSize="20px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} sx={{ padding: 0 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={admin_primary_designation}
                        disabled={
                          isFetchingAdminPrimaryDesignation ||
                          isSettingAdminPrimaryDesignation
                        }
                        name="admin_primary_designation"
                        onChange={handlePrimaryDesignation}
                      />
                    }
                    label="Primary Designation?"
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default AdminSalary;
