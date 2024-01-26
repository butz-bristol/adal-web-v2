/* eslint-disable no-unused-vars */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearDesignationValues,
  createDesignation,
  deleteDesignation,
  fetchAllDepartments,
  fetchAllDesignations,
  handleChange,
  setDesignation,
  toggleEditingDesignation,
  updateDesignation,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const EmployeeDesignation = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 25, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const {
    departments,
    designations,
    department_id,
    designation_name,
    isCreatingDesignation,
    editDesignation,
    designation_id,
    isDeletingDesignation,
    isEditingDesignation,
  } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const tableData = designations?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - designations.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!designation_name || !department_id) {
      toast.error('Please fill all fields');
      return;
    }

    if (editDesignation) {
      dispatch(
        updateDesignation({ designation_id, department_id, designation_name })
      );
      dispatch(clearDesignationValues());
      return;
    }

    dispatch(createDesignation({ department_id, designation_name }));
    dispatch(clearDesignationValues());
  };

  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDesignations());
  }, [dispatch]);

  return (
    <Stack>
      <form>
        <Grid container sx={{ my: 2, py: 1 }}>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TextField
                fullWidth
                id="outlined-basic"
                onChange={handleInput}
                name="designation_name"
                value={designation_name}
                label="Enter Designation Name"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Department"
                  value={department_id}
                  onChange={handleInput}
                  name="department_id"
                  labelId="demo-simple-select-label"
                >
                  <MenuItem value="">Select Department</MenuItem>
                  {departments.map((department) => (
                    <MenuItem
                      sx={{ textTransform: 'capitalize' }}
                      key={department._id}
                      value={department._id}
                    >
                      {department?.department_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                disabled={isCreatingDesignation || isEditingDesignation}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                {editDesignation ? 'Update' : 'Create'}
              </Button>
              {editDesignation && (
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  onClick={() => dispatch(clearDesignationValues())}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Designation Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? tableData : designations)?.map(
              (designation, index) => (
                <TableRow
                  key={designation._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {designation.designation_name}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {designation.department_id?.department_name}
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
                      disabled={isEditingDesignation}
                      onClick={() => {
                        dispatch(toggleEditingDesignation());
                        dispatch(setDesignation(designation));
                      }}
                    >
                      <EditIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0', width: '20px' }}
                      variant="contained"
                      color="secondary"
                      disabled={isDeletingDesignation}
                      onClick={() =>
                        dispatch(deleteDesignation(designation._id))
                      }
                    >
                      <DeleteIcon fontSize="10px" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 0 }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={designations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default EmployeeDesignation;
