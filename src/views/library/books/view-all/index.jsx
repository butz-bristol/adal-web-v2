import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import {
  Button,
  FormControl,
  Grid,
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
import { IconDatabaseImport, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import AddBookModal from 'src/components/library/AddBookModal';
import AddOverdueModal from 'src/components/library/AddOverdueModal';
import BulkUploadModal from 'src/components/library/BulkUploadModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearForm,
  deleteBook,
  getAllBooks,
  getSingleBook,
  setBook,
  setBookValues,
  toggleBulkUpload,
  toggleCreateBook,
  toggleEditBook,
  toggleEditOverdueParams,
} from 'src/features/libraryFeatures/books/booksSlice';

const Books = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { books, book } = useSelector((state) => state.books);
  const {
    isCreatingBook,
    isEditingBook,
    isDeletingBook,
    isEditingOverdueParams,
    isFetchingBooks,
  } = useSelector((state) => state.books);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const selectedStatusString = selectedStatus ? selectedStatus.toString() : '';
  let filteredBooks;
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    const newQuery = event.target.value.toLowerCase();
    setPage(newPage);
    setQuery(newQuery);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (query && selectedStatus === '') {
    filteredBooks = books?.filter(
      (book) =>
        book.book_title?.toLowerCase() ||
        book.book_author?.toLowerCase() ||
        !book.isArchived
    );
  }

  const filteredViewAllBooks = books?.filter((book) => {
    return (
      book.book_title?.toLowerCase().includes(query.toLowerCase()) ||
      book.book_author?.toLowerCase().includes(query.toLowerCase()) ||
      book.book_status === selectedStatusString
    );
  });

  const paginatedBookData = filteredViewAllBooks.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage + rowsPerPage
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
      <TableRow
        key={book._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{book.book_call_number}</TableCell>
        <TableCell>{book.book_title}</TableCell>
        <TableCell>{book.book_author}</TableCell>
        <TableCell>{book.subject_code}</TableCell>
        <TableCell>{book.book_quantity}</TableCell>
        <TableCell>{book.available_copies}</TableCell>
        <TableCell>{book.book_reserved ? book.book_reserved : 0}</TableCell>
        <TableCell>{book?.book_borrowed ? book.book_borrowed : 0}</TableCell>
        <TableCell>{book?.ISBN}</TableCell>
        <TableCell>
          {book?.publication_date
            ? new Date(book?.publication_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </TableCell>
        <TableCell>{book?.book_rack_no}</TableCell>
        <TableCell>{book?.book_status}</TableCell>
        <TableCell>
          <Tooltip title="edit book">
            <Button
              sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(toggleEditBook());
                dispatch(setBookValues(book));
              }}
            >
              <EditIcon fontSize="10px" />
            </Button>
          </Tooltip>
          <Tooltip title="delete book">
            <Button
              sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(getSingleBook(book?._id));
                setShowConfirmationModal(true);
              }}
            >
              <DeleteIcon fontSize="10px" />
            </Button>
          </Tooltip>
          <Tooltip title="Book Details">
            <Link to={`/library/books/transaction-history/${book._id}`}>
              <Button
                sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
                variant="contained"
                color="info"
                onClick={() => dispatch(setBook(book))}
              >
                <PageviewIcon fontSize="10px" />
              </Button>
            </Link>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <>
      <Stack>
        <Grid container item alignItems="inline-flex" spacing={2} mb={1}>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              disabled={isCreatingBook}
              onClick={() => dispatch(toggleCreateBook())}
              color="primary"
            >
              {isCreatingBook || isEditingBook || isDeletingBook
                ? 'Loading...'
                : 'Add Book'}
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              disabled={isCreatingBook}
              onClick={() => dispatch(toggleBulkUpload())}
              color="primary"
              endIcon={<IconDatabaseImport size={'17px'} />}
            >
              Bulk Upload
            </Button>
          </Grid>
          <Grid item x s={12} sm="auto">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(toggleEditOverdueParams())}
            >
              Set Overdue Globally
            </Button>
          </Grid>
        </Grid>
      </Stack>

      <AddBookModal />
      <BulkUploadModal />
      <AddOverdueModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this Book?'}
        onConfirm={() => {
          dispatch(deleteBook(book._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          clearForm();
          setShowConfirmationModal(false);
        }}
      />

      <div className="search">
        <FormControl variant="outlined" fullWidth>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search for a book"
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedStatus('');
              dispatch(getAllBooks());
            }}
            value={query}
            InputProps={{
              endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
            }}
          />
        </FormControl>
      </div>

      {isFetchingBooks ||
        isCreatingBook ||
        (isEditingBook && <LoadingScreen />)}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Call Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Available Copies</TableCell>
              <TableCell>Reserved Copies</TableCell>
              <TableCell>Borrowed Copies</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Publication Date</TableCell>
              <TableCell>Rack No.</TableCell>
              <TableCell>
                Status
                <select
                  style={{ width: '20px', marginLeft: '5px', border: 'none' }}
                  name="selectedStatus"
                  value={selectedStatusString}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setQuery('');
                  }}
                >
                  <option></option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={books?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Books;
