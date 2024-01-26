import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
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

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LoadingScreen from 'src/components/LoadingScreen';
import InputDateModal from 'src/components/library/InputDateModal';
import {
  getAllBooks,
  setBookValues,
  toggleEditBook,
} from 'src/features/libraryFeatures/books/booksSlice';

const AllBorrowedBooks = () => {
  const { books, isFetchingBooks } = useSelector((state) => state.books);
  const { user, users } = useSelector((state) => state.users);
  const userId = user.userId;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 20, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const borrowedAllBooksList = books?.map((book) => {
    return book?.book_same_copy?.filter(
      (copy) => copy?.availability_status === 'Borrowed'
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedborrowedAllBooksList = borrowedAllBooksList
    .flat()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderBookTableBody = () => {
    if (paginatedborrowedAllBooksList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedborrowedAllBooksList.map((book, index) => (
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{book?.book_title}</TableCell>
        <TableCell>{book?.book_author}</TableCell>
        <TableCell>{book?.book_call_number}</TableCell>
        <TableCell>
          {book.user_type === 'User'
            ? book.book_borrowed_by?.first_name +
              ' ' +
              book.book_borrowed_by?.last_name
            : book.book_borrowed_by?.student_first_name +
              ' ' +
              book.book_borrowed_by?.student_last_name}
        </TableCell>
        <TableCell>
          {book.user_type === 'User'
            ? ''
            : book.book_borrowed_by?.student_department?.department_name}
        </TableCell>
        <TableCell>
          {DateTime.fromISO(book.book_borrowed_on).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </TableCell>
        <TableCell>
          {DateTime.fromISO(book.book_due_date).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </TableCell>
        <TableCell>
          <Tooltip title="input date returned" arrow>
            <Button
              sx={{ minWidth: '0', width: '20px', marginRight: '0.5rem' }}
              variant="contained"
              color="grey"
              onClick={() => {
                dispatch(toggleEditBook());
                dispatch(setBookValues(book));
              }}
            >
              <CalendarMonthIcon fontSize="10px" />
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Stack>
      <InputDateModal />
      {isFetchingBooks && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Borrowed by</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Borrowed on</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Returned On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={paginatedborrowedAllBooksList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default AllBorrowedBooks;
