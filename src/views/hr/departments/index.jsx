/* eslint-disable no-unused-vars */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
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
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearDepartmentValues,
  createDepartment,
  deleteDepartment,
  fetchAllDepartments,
  handleChange,
  setDepartment,
  toggleEditingDepartment,
  updateDepartment,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Departments = () => {
  const dispatch = useDispatch();
  const {
    departments,
    loading,
    department_name,
    isCreatingDepartment,
    isDeletingDepartment,
    isEditingDepartment,
    editDepartment,
    department_id,
    isFetchingDepartments,
  } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department_name) {
      toast.error('Please enter department name');
      return;
    }

    if (editDepartment) {
      dispatch(updateDepartment({ department_id, department_name }));
      dispatch(clearDepartmentValues());
      return;
    }

    dispatch(createDepartment({ department_name }));
    dispatch(clearDepartmentValues());
  };

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, [dispatch]);

  return (
    <Stack>
      <form>
        <Grid container sx={{ my: 2, py: 1 }}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TextField
                fullWidth
                id="outlined-basic"
                onChange={handleInput}
                name="department_name"
                value={department_name}
                label="Enter Department Name"
                variant="outlined"
              />
              <Button
                type="submit"
                disabled={isCreatingDepartment || isEditingDepartment}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {editDepartment ? 'Update' : 'Create'}
              </Button>
              {editDepartment && (
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(clearDepartmentValues())}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department, index) => (
                <TableRow
                  key={department?.department_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {' '}
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {department?.department_name}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        minWidth: '0',
                        width: '20px',
                        marginRight: '0.5rem',
                      }}
                      variant="contained"
                      color="primary"
                      disabled={isEditingDepartment}
                      onClick={() => {
                        dispatch(toggleEditingDepartment());
                        dispatch(setDepartment(department));
                      }}
                    >
                      <EditIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0', width: '20px' }}
                      variant="contained"
                      color="secondary"
                      disabled={isDeletingDepartment}
                      onClick={() => dispatch(deleteDepartment(department._id))}
                    >
                      <DeleteIcon fontSize="10px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default Departments;
