import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  clearLeaveValues,
  createLeaveAssign,
  deleteLeaveAssign,
  fetchAllLeaveAssigns,
  fetchAllLeaveCategories,
  handleChange,
  setLeaveAssign,
  toggleEditingLeaveAssign,
  updateLeaveAssign,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const LeaveAssigns = () => {
  const dispatch = useDispatch();
  const {
    editLeaveAssign,
    number_of_days,
    leave_categories,
    leave_category_name,
    isCreatingLeaveAssign,
    isEditingLeaveAssign,
    leave_assigns,
    isDeletingLeaveAssign,
    editLeaveAssignId,
    isFetchingLeaveAssigns,
  } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leave_category_name || !number_of_days) {
      toast.error('Please fill all fields');
      return;
    }

    if (editLeaveAssign) {
      dispatch(
        updateLeaveAssign({
          leaveAssignId: editLeaveAssignId,
          number_of_days,
          leave_category_name,
        })
      );
      dispatch(clearLeaveValues());
      return;
    }

    dispatch(createLeaveAssign({ number_of_days, leave_category_name }));
    dispatch(clearLeaveValues());
  };

  useEffect(() => {
    dispatch(fetchAllLeaveCategories());
    dispatch(fetchAllLeaveAssigns());
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
                name="number_of_days"
                value={number_of_days}
                label="Days Allocation"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Leave Category
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Leave Category"
                  value={leave_category_name}
                  onChange={handleInput}
                  name="leave_category_name"
                  labelId="demo-simple-select-label"
                  sx={{ textTransform: 'capitalize' }}
                >
                  <MenuItem value="">Select One</MenuItem>
                  {leave_categories.map((leave_category) => (
                    <MenuItem
                      key={leave_category._id}
                      value={leave_category.leave_category_name}
                    >
                      {leave_category.leave_category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                size="large"
                type="submit"
                disabled={isCreatingLeaveAssign || isEditingLeaveAssign}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {editLeaveAssign ? 'Update' : 'Create'}
              </Button>
              {editLeaveAssign && (
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(clearLeaveValues())}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
      {isFetchingLeaveAssigns ? (
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
                <TableCell>Leave Category Name</TableCell>
                <TableCell>Number of Days</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leave_assigns.map((leave_assign, index) => (
                <TableRow
                  key={leave_assign._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {' '}
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {leave_assign.leave_category_name}
                  </TableCell>
                  <TableCell>{leave_assign.number_of_days}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ minWidth: '0', marginRight: '0.5rem' }}
                      variant="contained"
                      color="warning"
                      size="small"
                      disabled={isEditingLeaveAssign}
                      onClick={() => {
                        dispatch(toggleEditingLeaveAssign());
                        dispatch(setLeaveAssign(leave_assign));
                      }}
                    >
                      <EditIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0' }}
                      variant="contained"
                      color="error"
                      size="small"
                      disabled={isDeletingLeaveAssign}
                      onClick={() =>
                        dispatch(deleteLeaveAssign(leave_assign._id))
                      }
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

export default LeaveAssigns;
