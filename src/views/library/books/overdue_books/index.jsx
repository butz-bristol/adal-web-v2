import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';

import { DateTime } from 'luxon';
import LoadingScreen from 'src/components/LoadingScreen';
import { getAllBookOverdueFines } from 'src/features/libraryFeatures/overdueBooks/bookOverdueFinesSlice';

function formatDate(dateString) {
  const parsedDate = DateTime.fromISO(dateString);
  const formattedDate = parsedDate.toLocaleString(DateTime.DATETIME_MED);

  return formattedDate;
}

function getStatus(isPenaltyExisting) {
  return isPenaltyExisting ? 'Pending' : 'Paid';
}

function calculateOverdueDays(bookReturnDate, overdueDate) {
  const returnDate = DateTime.fromISO(bookReturnDate);
  const dueDate = DateTime.fromISO(overdueDate);
  const duration = dueDate.diff(returnDate, 'days');
  const overdueDays = Math.abs(Math.floor(duration.days));

  return overdueDays;
}

const OverdueBooks = () => {
  const { books } = useSelector((state) => state.books);
  const { isFetchingBooks } = useSelector((state) => state.books);
  const { bookOverdueFines } = useSelector((state) => state.bookOverdueFines);
  const { user } = useSelector((state) => state.users);
  const { student } = useSelector((state) => state.students);
  const userId = user?.userId;
  const studentId = student?.student_id;
  const dispatch = useDispatch();
  const rowsPerPageOptions = [10, 20, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [page, setPage] = useState(0);

  const overdueFineEmployeeList = bookOverdueFines?.map((user) => {
    return user.userId?._id === userId && user?.user_type === 'User'
      ? user.userFines?.filter((fine) => fine.isPenaltyExisting == true)
      : [];
  });

  const overdueFineStudentList = bookOverdueFines?.map((student) => {
    return student.userId?._id === studentId && student?.user_type === 'Student'
      ? student.userFines?.filter((fine) => fine?.isPenaltyExisting == true)
      : [];
  });

  const requestOverdueList = userId
    ? overdueFineEmployeeList.flat()
    : overdueFineStudentList.flat();

  const paginatedOverdueList = requestOverdueList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderBookTableBody = () => {
    if (paginatedOverdueList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedOverdueList.map((overdueList) => (
      <TableRow
        key={overdueList?._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{overdueList?.bookTitle}</TableCell>
        <TableCell>{overdueList?.bookAuthor}</TableCell>
        <TableCell>{overdueList?.callNumber}</TableCell>
        <TableCell>{formatDate(overdueList?.borrowedOn)}</TableCell>
        <TableCell>{formatDate(overdueList?.bookReturnedOn)}</TableCell>
        <TableCell>{formatDate(overdueList?.dueDate)}</TableCell>
        <TableCell>
          {calculateOverdueDays(
            overdueList?.bookReturnedOn,
            overdueList?.dueDate
          )
            ? calculateOverdueDays(
                overdueList?.bookReturnedOn,
                overdueList?.dueDate
              )
            : ''}
        </TableCell>
        <TableCell>{overdueList?.overdueFine}</TableCell>
        <TableCell>{getStatus(overdueList?.isPenaltyExisting)}</TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllBookOverdueFines());
  }, [dispatch]);

  return (
    <Stack>
      {isFetchingBooks && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Borrowed on</TableCell>
              <TableCell>Returned on</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Days Overdue</TableCell>
              <TableCell>Fine</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={requestOverdueList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default OverdueBooks;
