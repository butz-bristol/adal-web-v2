import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForm,
  handleOverdueParamsChange,
  toggleEditOverdueParams,
} from 'src/features/libraryFeatures/books/booksSlice';

import {
  getAllBooks,
  updateOverdueParameters,
} from 'src/features/libraryFeatures/books/booksSlice';

const AddOverdueModal = () => {
  const dispatch = useDispatch();
  const {
    isEditingBook,
    isCreatingBook,
    isEditingOverdueParams,
    overdue_fine,
    borrowing_duration,
  } = useSelector((state) => state.books);

  const handleInput = (e) => {
    dispatch(
      handleOverdueParamsChange({ name: e.target.name, value: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOverdueParameters({ overdue_fine, borrowing_duration }));
    dispatch(toggleEditOverdueParams());
    setTimeout(() => {
      return;
    }, 1500);
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Dialog
      open={isEditingOverdueParams}
      onClose={() => {
        dispatch(toggleEditOverdueParams());
        dispatch(clearForm());
      }}
      container={() => document.getElementById('root')}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3} textAlign="center">
          {'Set Overdue Gloabally'}
        </Typography>
        <form>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth require>
                <TextField
                  label="Overdue Fine"
                  id="overdue_fine"
                  variant="outlined"
                  value={overdue_fine}
                  name="overdue_fine"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth require>
                <TextField
                  label="Borrowing Duration"
                  id="borrowing_duration"
                  variant="outlined"
                  value={borrowing_duration}
                  name="borrowing_duration"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid item xs={12} md={6}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: isEditingOverdueParams ? 1 : 2 }}
            disabled={isCreatingBook || isEditingBook}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            type="cancel"
            onClick={() => {
              isEditingBook ? '' : dispatch(toggleEditOverdueParams());
            }}
          >
            Cancel
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddOverdueModal;
