import ClearIcon from '@mui/icons-material/Clear';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearForm,
  getAllBooks,
  toggleCreateBook,
  toggleEditBook,
  updateBook,
} from 'src/features/libraryFeatures/books/booksSlice';
const RequestBookModal = () => {
  const {
    editBook,
    isEditingBook,
    availability_status,
    reserved_copies,
    book_id,
    book_same_copy,
    available_copies,
    overdue_fine,
    book_rack_no,
    book_author,
  } = useSelector((state) => state.books);
  const { user, userProfile } = useSelector((state) => state.users);
  const [requestButtonDisabled, setRequestButtonDisabled] = useState(false);
  const { student } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const userId = user?.userId;
  const studentId = student?.student_id;

  const confirmRequest = (bookCopy) => {
    try {
      const updatedBookSameCopy = book_same_copy.map((copy) => {
        if (copy._id === bookCopy._id) {
          return {
            ...copy,
            availability_status: 'Requested',
            book_borrowed_by: user?.userId ? user.userId : student?.student_id,
            book_Id: book_id,
            book_author: bookCopy?.book_author,
            user_type: user?.userId ? 'User' : 'Student',
            overdue_fine: overdue_fine,
            book_rack_no: book_rack_no,
            book_author: book_author,
          };
        } else {
          return copy;
        }
      });

      dispatch(
        updateBook({
          book_id,
          book_same_copy: updatedBookSameCopy,
        })
      );

      toast.success(`${bookCopy.book_title} request has been made!`);
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = (bookCopy) => {
    try {
      const updatedBookSameCopy = book_same_copy.map((copy) => {
        if (copy._id === bookCopy._id) {
          return {
            ...copy,
            availability_status: 'Available',
            book_borrowed_by: null,
          };
        } else {
          return copy;
        }
      });

      dispatch(
        updateBook({
          book_id,
          book_same_copy: updatedBookSameCopy,
        })
      );

      toast.info(`${bookCopy.book_title} request has been canceled`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    isEditingBook ? dispatch(toggleCreateBook()) : dispatch(toggleEditBook());
    dispatch(clearForm());
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <Dialog
      open={editBook}
      onClose={() => {
        editBook && dispatch(toggleEditBook());
        dispatch(clearForm());
      }}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3} textAlign="center">
          {editBook ? 'Request Book' : 'View Book'}
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Call Number</TableCell>
                    <TableCell>Availability Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {
                  <TableBody>
                    {book_same_copy && availability_status == 'Available' ? (
                      book_same_copy.map((bookCopy) => (
                        <TableRow
                          key={bookCopy._id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>{bookCopy.book_title}</TableCell>
                          <TableCell>{bookCopy.book_call_number}</TableCell>
                          <TableCell>{bookCopy.availability_status}</TableCell>
                          <TableCell>
                            {bookCopy.availability_status == 'Available' ? (
                              <Tooltip title="request book">
                                <Button
                                  sx={{
                                    minWidth: '0',
                                    width: '20px',
                                    marginRight: '0.5rem',
                                  }}
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    dispatch(toggleEditBook());
                                    confirmRequest(bookCopy);
                                  }}
                                >
                                  <VolunteerActivismIcon fontSize="10px" />
                                </Button>
                              </Tooltip>
                            ) : userId ? (
                              bookCopy.book_borrowed_by?._id === userId
                            ) : bookCopy.book_borrowed_by?._id === studentId ? (
                              <Tooltip title="cancel request">
                                <Button
                                  sx={{
                                    minWidth: '0',
                                    width: '20px',
                                  }}
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    dispatch(toggleEditBook());
                                    rejectRequest(bookCopy);
                                  }}
                                >
                                  <ClearIcon fontSize="10px" />
                                </Button>
                              </Tooltip>
                            ) : (
                              <Tooltip title="cancel request">
                                <Button
                                  sx={{ minWidth: '0', width: '20px' }}
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    dispatch(toggleEditBook());
                                    rejectRequest(bookCopy);
                                  }}
                                  disabled={requestButtonDisabled}
                                >
                                  <ClearIcon fontSize="10px" />
                                </Button>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>No entry</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                }
              </Table>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid item xs={12} md={6}>
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              type="cancel"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </FormControl>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default memo(RequestBookModal);
