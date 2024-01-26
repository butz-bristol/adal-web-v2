import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import adalFetch from 'src/utils/axios';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { toggleEditBook } from 'src/features/libraryFeatures/books/booksSlice';

import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';

const Books = () => {
  const { books } = useSelector((state) => state.books);

  const {
    isCreatingBook,
    isEditingBook,
    isDeletingBook,
    book_id,
    book_title,
    book_author,
    book_price,
    book_image,
    book_status,
    book_rack_no,
    subject_code,
    book_quantity,
    editBookId,
  } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  console.log({ books });

  const approveRequest = async (book) => {
    const url = `/books/${book._id}`;
    console.log(url);
    try {
      const response = await adalFetch.patch(url, { book_status: 'Borrowed' });
      dispatch(getAllBooks());
      return response.data;
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  const rejectRequest = async (book) => {
    const url = `/books/${book._id}`;
    console.log(url);
    try {
      const response = await adalFetch.patch(url, { book_status: 'Available' });
      dispatch(getAllBooks());
      return response.data;
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Rack No.</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .filter((book) => book.book_status == 'Requested')
              .map((book, index) => (
                <TableRow
                  key={book.book_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell>{book.book_title}</TableCell>
                  <TableCell>{book.book_author}</TableCell>
                  <TableCell>{book.subject_code}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell>{book.book_rack_no}</TableCell>
                  <TableCell>{book.book_status}</TableCell>
                  <TableCell>
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

                        approveRequest(book);
                      }}
                    >
                      <CheckBoxIcon fontSize="10px" />
                    </Button>
                    <Button
                      sx={{ minWidth: '0', width: '20px' }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        dispatch(toggleEditBook());
                        rejectRequest(book);
                      }}
                    >
                      <DisabledByDefaultIcon fontSize="10px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Books;
