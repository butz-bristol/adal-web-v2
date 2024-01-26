/* eslint-disable no-unused-vars */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearLeaveValues,
  createLeaveCategory,
  deleteLeaveCategory,
  fetchAllLeaveCategories,
  handleChange,
  setLeaveCategory,
  toggleEditingLeaveCategory,
  updateLeaveCategory,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const LeaveCategories = () => {
  const dispatch = useDispatch();
  const {
    leave_category_name,
    isCreatingLeaveCategory,
    isEditingLeaveCategory,
    editLeaveCategory,
    isDeletingLeaveCategory,
    leave_categories,
    editLeaveCategoryId,
    isFetchingLeaveCategories,
  } = useSelector((state) => state.coreHr);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leave_category_name) {
      toast.error('Please enter leave category name');
      return;
    }

    if (editLeaveCategory) {
      dispatch(
        updateLeaveCategory({
          leaveCategoryId: editLeaveCategoryId,
          leave_category_name,
        })
      );
      dispatch(clearLeaveValues());
      return;
    }

    dispatch(createLeaveCategory({ leave_category_name }));
    dispatch(clearLeaveValues());
  };

  useEffect(() => {
    dispatch(fetchAllLeaveCategories());
  }, []);

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
                name="leave_category_name"
                value={leave_category_name}
                label="Enter Category Name"
                variant="outlined"
              />
              <Button
                size="large"
                type="submit"
                disabled={isCreatingLeaveCategory || isEditingLeaveCategory}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {editLeaveCategory ? 'Update' : 'Create'}
              </Button>
              {editLeaveCategory && (
                <Button
                  size="large"
                  type="button"
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
      {isFetchingLeaveCategories ? (
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
              {leave_categories?.map((leave_category, index) => (
                <TableRow
                  key={leave_category._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {' '}
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {leave_category.leave_category_name}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        minWidth: '0',
                        width: '20px',
                        marginRight: '0.5rem',
                      }}
                      variant="contained"
                      color="warning"
                      disabled={isEditingLeaveCategory}
                      onClick={() => {
                        dispatch(setLeaveCategory(leave_category));
                        dispatch(toggleEditingLeaveCategory());
                      }}
                    >
                      <EditIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0', width: '20px' }}
                      variant="contained"
                      color="error"
                      disabled={isDeletingLeaveCategory}
                      onClick={() =>
                        dispatch(deleteLeaveCategory(leave_category._id))
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

export default LeaveCategories;
