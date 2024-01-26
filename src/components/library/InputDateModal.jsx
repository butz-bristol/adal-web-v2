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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearForm,
  getAllBooks,
  handleChange,
  toggleEditBook,
  updateBook,
} from 'src/features/libraryFeatures/books/booksSlice';
import {
  createBookOverdueFine,
  getAllBookOverdueFines,
  updateBookOverdueFine,
} from 'src/features/libraryFeatures/overdueBooks/bookOverdueFinesSlice';

const InputDateModal = () => {
  const dispatch = useDispatch();
  const {
    isEditingBook,
    editBook,
    book_returned_on,
    book_id,
    book_Id,
    books,
    book_title,
    book_author,
    book_borrowed_on,
    book_borrowed_by,
    book_due_date,
    overdue_fine,
    book_call_number,
    user_type,
  } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.users);
  const { student } = useSelector((state) => state.students);
  const { bookOverdueFines } = useSelector((state) => state.bookOverdueFines);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  function employeeIdExists(book_borrowed_by, bookOverdueFines) {
    const employeeIdExists = bookOverdueFines?.find(
      (employee) =>
        employee.userId?._id === book_borrowed_by &&
        employee.user_type === 'User'
    );
    return employeeIdExists ? true : false;
  }

  function studentIdExists(book_borrowed_by, bookOverdueFines) {
    const studentIdExists = bookOverdueFines?.find(
      (student) =>
        student.userId?._id === book_borrowed_by &&
        student.user_type === 'Student'
    );
    return studentIdExists ? true : false;
  }

  function getExistingEmployeeId(book_borrowed_by, bookOverdueFines) {
    const existingEmployee = bookOverdueFines?.find(
      (employee) =>
        employee.userId?._id === book_borrowed_by &&
        employee.user_type === 'User'
    );
    return existingEmployee ? existingEmployee._id : null;
  }

  function getExistingStudentId(book_borrowed_by, bookOverdueFines) {
    const existingStudent = bookOverdueFines?.find(
      (student) =>
        student.userId?._id === book_borrowed_by &&
        student.user_type === 'Student'
    );
    return existingStudent ? existingStudent._id : null;
  }

  const overdueBookEmployeeID = getExistingEmployeeId(
    book_borrowed_by?._id,
    bookOverdueFines
  );
  const overdueBookStudentID = getExistingStudentId(
    book_borrowed_by?._id,
    bookOverdueFines
  );

  const handleSubmit = (e) => {
    try {
      const transactionId = generateTransactionId();
      const overdueFine = calculateOverdueFine(
        book_due_date,
        book_returned_on,
        overdue_fine
      );
      const index = books.findIndex((book) => book._id === book_Id);
      const indexUser = bookOverdueFines.findIndex(
        (userId) => userId?._id === overdueBookEmployeeID
      );
      const indexStudent = bookOverdueFines.findIndex(
        (userId) => userId?._id === overdueBookStudentID
      );
      const bookSameCopy = books[index]?.book_same_copy || [];
      let updatedBookSameCopy = [];
      let updatedBookSameCopyStatus = [];
      let studentFines = [];
      let userFines = [];

      if (bookSameCopy.length > 0) {
        updatedBookSameCopy = bookSameCopy.map((copy) => {
          if (copy._id === book_id) {
            return {
              ...copy,
              availability_status: 'Available',
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

      if (bookSameCopy.length > 0) {
        updatedBookSameCopyStatus = bookSameCopy.map((copy) => {
          if (copy._id === book_id) {
            return {
              ...copy,
              availability_status: 'Available',
            };
          } else {
            return copy;
          }
        });
      }

      const newUserFine = {
        bookTitle: book_title,
        bookAuthor: book_author,
        overdueBookItem: book_id,
        callNumber: book_call_number,
        bookReturnedOn: book_returned_on,
        overdueFine: overdueFine,
        borrowedOn: book_borrowed_on,
        dueDate: book_due_date,
        isPenaltyExisting: true,
      };

      const existingUserFines = bookOverdueFines[indexUser]?.userFines || [];
      userFines = [...existingUserFines, newUserFine];
      const existingStudentFines =
        bookOverdueFines[indexStudent]?.userFines || [];
      studentFines = [...existingStudentFines, newUserFine];

      if (overdueFine > 0) {
        if (user_type === 'User') {
          if (!employeeIdExists(book_borrowed_by?._id, bookOverdueFines)) {
            dispatch(
              createBookOverdueFine({
                overdueBookItem: book_id,
                userId: book_borrowed_by,
                user_type: user_type,
                userFines: userFines,
              })
            );
            dispatch(
              updateBook({
                book_id: book_Id,
                book_same_copy: updatedBookSameCopyStatus,
              })
            );
          } else {
            dispatch(
              updateBookOverdueFine({
                bookOverdueFine_id: overdueBookEmployeeID,
                userFines: userFines,
              })
            );

            dispatch(
              updateBook({
                book_id: book_Id,
                book_same_copy: updatedBookSameCopyStatus,
              })
            );
          }
        } else if (user_type === 'Student') {
          if (!studentIdExists(book_borrowed_by?._id, bookOverdueFines)) {
            dispatch(
              createBookOverdueFine({
                overdueBookItem: book_id,
                userId: book_borrowed_by,
                user_type: user_type,
                userFines: studentFines,
              })
            );

            dispatch(
              updateBook({
                book_id: book_Id,
                book_same_copy: updatedBookSameCopyStatus,
              })
            );
          } else {
            dispatch(
              updateBookOverdueFine({
                bookOverdueFine_id: overdueBookStudentID,
                userFines: studentFines,
              })
            );

            dispatch(
              updateBook({
                book_id: book_Id,
                book_same_copy: updatedBookSameCopyStatus,
              })
            );
          }
        } else {
          dispatch(
            updateBook({
              book_id: book_Id,
              book_same_copy: updatedBookSameCopy,
            })
          );
        }
      }
      toast.success(`${book_title} return has been made!`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllBookOverdueFines());
  }, []);

  return (
    <Dialog
      open={editBook}
      onClose={() => {
        dispatch(toggleEditBook());
        dispatch(clearForm());
      }}
      container={() => document.getElementById('root')}
    >
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={`Are you sure you want to return this book called ${book_call_number} ?`}
        onConfirm={() => {
          handleSubmit();
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          clearForm();
          setShowConfirmationModal(false);
        }}
      />
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
              onClick={() => setShowConfirmationModal(true)}
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
