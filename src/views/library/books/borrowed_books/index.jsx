import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import LoadingScreen from 'src/components/LoadingScreen';
import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';

const BorrowedBooks = () => {
  const { books, overdueParams, isFetchingBooks } = useSelector(
    (state) => state.books
  );
  const { userProfile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.users);
  const { student } = useSelector((state) => state.students);
  const userId = user?.userId;
  const studentId = student?.student_id;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 20, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestedBooks = books?.map((bookCopy) => {
    return bookCopy.book_same_copy.filter((copy) =>
      userId
        ? copy?.book_borrowed_by?._id === userId &&
          copy.availability_status === 'Borrowed'
        : copy?.book_borrowed_by?._id === studentId &&
          copy.availability_status === 'Borrowed'
    );
  });

  const paginatedRequestedBooks = requestedBooks
    .flat()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderBookTableBody = () => {
    if (paginatedRequestedBooks.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedRequestedBooks.map((book) => (
      <TableRow
        key={book?._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{book?.book_title}</TableCell>
        <TableCell>{book?.book_author}</TableCell>
        <TableCell>{book?.book_call_number}</TableCell>
        <TableCell>{book?.availability_status}</TableCell>
        <TableCell>
          {new Date(book?.book_borrowed_on).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </TableCell>
        <TableCell>
          {new Date(book?.book_due_date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <>
      {isFetchingBooks && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Borrowed on</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={paginatedRequestedBooks?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BorrowedBooks;
