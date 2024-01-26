import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForm,
  getAllBooks,
  handleBorrowingHistory,
  handleChange,
  toggleEditBook,
  updateBook,
} from 'src/features/libraryFeatures/books/booksSlice';

import { DateTime } from 'luxon';
import { useEffect } from 'react';

const InputDateModal = () => {
  const dispatch = useDispatch();
  const {
    isEditingBook,
    editBook,
    borrowingHistory,
    book_returned_on,
    book_id,
    book_title,
    book_author,
    book_rack_no,
    subject_code,
    ISBN,
    publication_date,
    type,
    book_status,
    book_borrowed_on,
    book_borrowed_by,
    book_due_date,
  } = useSelector((state) => state.books);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({
        book_id,
        borrowingHistory,
        book_status: 'Available',
        book_borrowed_by: { name: '', userId: '', designation: '' },
      })
    );
    dispatch(toggleEditBook());
    setTimeout(() => {
      dispatch(clearForm());
    }, 1500);
    return;
  };

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(handleBorrowingHistory(book_returned_on) || []);
  }, [book_returned_on]);

  return (
    <Modal
      open={editBook} //will open modal if editBook is true
      onClose={() => {
        dispatch(toggleEditBook()); //editBook is set to false again
        dispatch(clearForm());
      }}
      container={() => document.getElementById('root')}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '20%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        <form>
          <Grid container spacing={2} p={2} columns={1}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="return_date">Return Date</InputLabel>
                <OutlinedInput
                  label="Return Date"
                  id="return_date"
                  type="date"
                  required
                  name="book_returned_on"
                  value={
                    DateTime.fromISO(book_returned_on).toFormat('yyyy-MM-dd') ||
                    ''
                  }
                  onChange={handleInput}
                  style={{ width: '30vw' }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: editBook ? 1 : 2 }}
                  onClick={handleSubmit}
                  disabled={isEditingBook}
                  fullWidth
                >
                  Record Return Date
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
};

export default InputDateModal;
