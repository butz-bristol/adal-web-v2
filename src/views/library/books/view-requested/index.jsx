import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { toast } from 'react-toastify';
import LoadingScreen from 'src/components/LoadingScreen';
import {
  getAllBooks,
  setBookValues,
  toggleEditBook,
  updateBook,
} from 'src/features/libraryFeatures/books/booksSlice';

const Issues = () => {
  const { books, overdueParams, subject_code, book_id, isFetchingBooks } =
    useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 20, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const name = userProfile.first_name + ' ' + userProfile.last_name;
  const userId = userProfile._id;
  const designation = user.userRole;
  const userInfo = { name: name, userId: userId, designation: designation };

  const getBorrowingDuration = (books, bookID) => {
    const borrowingDuration = books
      .filter((book) => book._id === bookID)
      .map((book) => book.borrowing_duration);

    return borrowingDuration.length > 0 ? borrowingDuration[0] : null;
  };

  const approveRequest = (bookCopy) => {
    try {
      const bookID = bookCopy.book_Id;
      const borrowingDuration = getBorrowingDuration(books, bookID);
      const index = books.findIndex((book) => book._id === bookID);
      const updatedBookSameCopy = [...books[index].book_same_copy];
      const copyIndex = updatedBookSameCopy.findIndex(
        (copy) => copy._id === bookCopy._id
      );

      updatedBookSameCopy[copyIndex] = {
        ...updatedBookSameCopy[copyIndex],
        availability_status: 'Borrowed',
        book_borrowed_on: DateTime.now().toISO(),
        book_due_date: DateTime.now().plus({ days: borrowingDuration }).toISO(),
      };

      const updatedBooks = [...books];
      updatedBooks[index] = {
        ...updatedBooks[index],
        book_same_copy: updatedBookSameCopy,
      };

      dispatch(
        updateBook({
          book_id: bookID,
          book_same_copy: updatedBookSameCopy,
        })
      );
      toast.success(`${bookCopy.book_title} has successfully issued`);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = (bookCopy) => {
    try {
      const bookID = bookCopy.book_Id;
      const index = books.findIndex((book) => book._id === bookID);
      const updatedBookSameCopy = [...books[index]?.book_same_copy];
      const copyIndex = updatedBookSameCopy.findIndex(
        (copy) => copy._id === bookCopy._id
      );

      updatedBookSameCopy[copyIndex] = {
        ...updatedBookSameCopy[copyIndex],
        availability_status: 'Available',
        book_borrowed_by: null,
      };

      const updatedBooks = [...books];
      updatedBooks[index] = {
        ...updatedBooks[index],
        book_same_copy: updatedBookSameCopy,
      };
      dispatch(
        updateBook({
          book_id: bookID,
          book_same_copy: updatedBookSameCopy,
        })
      );
      toast.info(`${bookCopy.book_title} request has been rejected`);
    } catch (error) {
      console.log(error);
    }
  };

  const requestedBooks = books?.map((bookCopy) => {
    return bookCopy.book_same_copy.filter(
      (copy) => copy.availability_status === 'Requested'
    );
  });

  const bookID = books?.find((book) => book);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const paginatedrequestedBooks = requestedBooks
    .flat()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderBookTableBody = () => {
    if (paginatedrequestedBooks.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedrequestedBooks.map((bookCopy, index) => (
      <TableRow
        key={bookCopy._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>{bookCopy?.book_title}</TableCell>
        <TableCell>{bookCopy?.book_author}</TableCell>
        <TableCell>{bookCopy?.book_call_number}</TableCell>
        <TableCell>{bookCopy?.book_rack_no}</TableCell>
        <TableCell>{bookCopy?.availability_status}</TableCell>
        <TableCell>
          {bookCopy?.user_type === 'User'
            ? bookCopy.book_borrowed_by?.first_name +
              ' ' +
              bookCopy.book_borrowed_by?.last_name
            : bookCopy.book_borrowed_by?.student_first_name +
              ' ' +
              bookCopy.book_borrowed_by?.student_last_name}
        </TableCell>
        <TableCell>
          {bookCopy?.user_type === 'User'
            ? ''
            : bookCopy.book_borrowed_by?.student_department?.department_name}
        </TableCell>
        <TableCell>
          {bookCopy.user_type === 'User'
            ? bookCopy.book_borrowed_by?.employee_id
            : bookCopy.book_borrowed_by?.student_number}
        </TableCell>
        <TableCell>
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={1}>
            <Tooltip title="issue book">
              <IconButton
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch(toggleEditBook());
                  dispatch(setBookValues(bookID));
                  approveRequest(bookCopy);
                }}
              >
                <CheckBoxIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
            <Tooltip title="reject request">
              <IconButton
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(toggleEditBook());
                  dispatch(setBookValues(bookID));
                  rejectRequest(bookCopy);
                }}
              >
                <DisabledByDefaultIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Stack>
      {isFetchingBooks && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Rack No.</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested by</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Student/Employee No.</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={paginatedrequestedBooks?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default Issues;
