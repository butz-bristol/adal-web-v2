import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
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
  TextField,
  Tooltip,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import RequestBookModal from 'src/components/library/RequestBookModal';
import {
  getAllBooks,
  setBookValues,
  toggleEditBook,
} from 'src/features/libraryFeatures/books/booksSlice';

const RequestBook = () => {
  const { books, isFetchingBooks } = useSelector((state) => state.books);
  const { userProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [query, setQuery] = useState('');
  const [display, setDisplay] = useState('block');
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 20, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  let filteredBooks;

  if (query) {
    filteredBooks = books?.filter(
      (book) =>
        book.book_title?.toLowerCase() ||
        book.book_author?.toLowerCase() ||
        !book.isArchived
    );
  }

  const filteredRequestedBooks = books?.filter((book) => {
    return (
      book.book_title?.toLowerCase().includes(query.toLowerCase()) ||
      book.book_author?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBookData = filteredRequestedBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderBookTableBody = () => {
    if (paginatedBookData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedBookData.map((book) => (
      <TableRow key={book._id}>
        <TableCell>{book?.book_title}</TableCell>
        <TableCell>{book?.book_author}</TableCell>
        <TableCell>{book?.subject_code}</TableCell>
        <TableCell>
          {book?.available_copies}/{book.book_quantity}
        </TableCell>
        <TableCell>{book?.book_rack_no}</TableCell>
        <TableCell>{book?.availability_status}</TableCell>
        <TableCell>
          {book?.availability_status == 'Available' && (
            <Tooltip title="request book" arrow>
              <Button
                sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch(toggleEditBook());
                  dispatch(setBookValues(book));
                }}
              >
                <VolunteerActivismIcon fontSize="10px" />
              </Button>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <RequestBookModal />
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search for a book"
          onChange={(event) => {
            setQuery(event.target.value);
            dispatch(getAllBooks());
          }}
          value={query}
          InputProps={{
            endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
          }}
        />
      </div>

      {isFetchingBooks && <LoadingScreen />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Availability Copies</TableCell>
              <TableCell>Rack No.</TableCell>
              <TableCell>Availability Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={filteredRequestedBooks?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default RequestBook;
