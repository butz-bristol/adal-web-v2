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
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearForm,
  getAllBooks,
  handleChange,
  toggleEditBook,
  updateBook,
} from 'src/features/libraryFeatures/books/booksSlice';
import { createOverdueBooksEmployee } from 'src/features/libraryFeatures/overdueBooks/overdueBooksEmployeesSlice';

const InputDateModal = () => {
  const dispatch = useDispatch();
  const {
    isEditingBook,
    editBook,
    borrowingHistory,
    book_returned_on,
    book_id,
    book_Id,
    books,
    book_title,
    book_author,
    book_borrowed_on,
    book_borrowed_by,
    book_transaction_reference,
    book_same_copy,
    book_due_date,
    overdue_fine,
    book_call_number,
  } = useSelector((state) => state.books);
  const { user, userProfile } = useSelector((state) => state.users);
  console.log(userProfile);
  const userId = user.userId;

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  function generateTransactionId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    const transactionId = `${timestamp}-${randomNumber}`;

    return transactionId;
  }

  // Calculate overdue fine
  function calculateOverdueFine(dueDate, returnDate, finePerDay) {
    const dueDateObj = new Date(dueDate);
    const returnDateObj = new Date(returnDate);

    const timeDifference = returnDateObj.getTime() - dueDateObj.getTime();
    const daysOverdue = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysOverdue <= 0) {
      return 0;
    }

    const overdueFine = daysOverdue * finePerDay;
    return overdueFine;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const transactionId = generateTransactionId();
      const overdueFine = calculateOverdueFine(
        book_due_date,
        book_returned_on,
        overdue_fine
      );
      const index = books.findIndex((book) => book._id === book_Id);

      const bookSameCopy = books[index]?.book_same_copy || [];
      const bookSameCopyIndex = [...books[index].book_same_copy];
      const copyIndex = bookSameCopyIndex.findIndex(
        (copy) => copy._id === book_id
      );
      let updatedBookSameCopy = [];

      if (bookSameCopy.length > 0) {
        updatedBookSameCopy = bookSameCopy.map((copy) => {
          if (copy._id === book_id) {
            return {
              ...copy,
              availability_status: 'Available',
              isPenaltyExisting: overdueFine > 0 ? true : false,
              borrowingHistory: [
                ...copy.borrowingHistory,
                {
                  callNumber: book_call_number,
                  borrower: book_borrowed_by,
                  book_transaction_reference: transactionId,
                  bookReturnedOn: book_returned_on,
                  borrowedOn: book_borrowed_on,
                  overdueFine: overdueFine,
                  dueDate: book_due_date,
                },
              ],
            };
          } else {
            return copy;
          }
        });
      }

      dispatch(
        updateBook({
          book_id: book_Id,
          book_same_copy: updatedBookSameCopy,
        })
      );

      // it will only trigger when theres a fine
      if (book_borrowed_by?._id === userId) {
        dispatch(
          createOverdueBooksEmployee()
          // Overdue Fines
        );
      } else {
      }
      toast.success(`${book_title} return has been made!`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <Dialog
      open={editBook} //will open modal if editBook is true
      onClose={() => {
        dispatch(toggleEditBook()); //editBook is set to false again
        dispatch(clearForm());
      }}
      container={() => document.getElementById('root')}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3} textAlign="center">
          {editBook ? 'Book Return Date' : ''}
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl>
                <TextField
                  id="return_date"
                  label="Return Date"
                  type="date"
                  name="book_returned_on"
                  value={
                    DateTime.fromISO(book_returned_on).toFormat('yyyy-MM-dd') ||
                    ''
                  }
                  onChange={handleInput}
                  style={{ width: '10vw' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid item xs={12} md={6}>
          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={isEditingBook}
              fullWidth
            >
              Record Return Date
            </Button>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            type="cancel"
            onClick={() => {
              isEditingBook ? '' : dispatch(toggleEditBook());
            }}
          >
            Cancel
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default InputDateModal;
