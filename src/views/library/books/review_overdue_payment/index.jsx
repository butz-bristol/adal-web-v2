import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import adalFetch from 'src/utils/axios';

import ClearIcon from '@mui/icons-material/Clear';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
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
  Tooltip,
} from '@mui/material';
import LoadingScreen from 'src/components/LoadingScreen';
import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';

const OverduePayments = () => {
  const { books, isFetchingBooks } = useSelector((state) => state.books);
  const { user, userProfile } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const confirmPaymentRequest = async (book) => {
    const url = `/books/${book._id}`;
    try {
      const response = await adalFetch.patch(url, {
        isPenaltyExisting: false,
        overduePaymentFiled: false,
        overduePaymentFiledOn: '',
        book_borrowed_by: { name: '', userId: '', designation: '' },
        book_borrowed_on: '',
        book_due_date: '',
        book_status: 'Available',
        overduePaymentStatus: 'Cleared',
        overdueProofOfPayment: '',
        paymentMode: '',
      });
      dispatch(getAllBooks());
      return response.data;
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  const rejectPaymentRequest = async (book) => {
    const url = `/books/${book._id}`;

    try {
      const response = await adalFetch.patch(url, {
        overduePaymentStatus: 'Rejected',
      });
      dispatch(getAllBooks());
      return response.data;
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

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
              <TableCell>Borrowed By</TableCell>
              <TableCell>Borrower Classification</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Days Overdue</TableCell>
              <TableCell>Penalty</TableCell>
              <TableCell>Date Payment Filed</TableCell>
              <TableCell>Overdue Payment Status</TableCell>
              <TableCell>Proof of Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .filter(
                (book) =>
                  book.overduePaymentFiled == true &&
                  book.isPenaltyExisting == true
              )
              .map((book, index) => (
                <TableRow
                  key={book._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell>{book.book_title}</TableCell>
                  <TableCell>{book.book_author}</TableCell>
                  <TableCell>{book.subject_code}</TableCell>
                  <TableCell>{book.book_borrowed_by.name}</TableCell>
                  <TableCell>{book.book_borrowed_by.designation}</TableCell>
                  <TableCell>
                    {new Date(book.book_due_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {Math.ceil(
                      Math.abs(new Date() - new Date(book.book_due_date)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </TableCell>
                  <TableCell>
                    &#8369;&nbsp;
                    {book.overdue_fine *
                      Math.ceil(
                        Math.abs(new Date() - new Date(book.book_due_date)) /
                          (1000 * 60 * 60 * 24)
                      )}
                  </TableCell>
                  <TableCell>
                    {book.overduePaymentFiled == true
                      ? new Date(book.overduePaymentFiledOn).toLocaleDateString(
                          'en-US',
                          { month: 'long', day: 'numeric', year: 'numeric' }
                        )
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {book.overduePaymentFiled ? 'Filed' : 'None Filed'}
                  </TableCell>
                  <TableCell>
                    {book.overdueProofOfPayment ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={book.overdueProofOfPayment}
                      >
                        File
                      </a>
                    ) : (
                      'None Uploaded'
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="approve payment">
                      <Button
                        sx={{
                          minWidth: '0',
                          width: '20px',
                          marginRight: '0.5rem',
                        }}
                        variant="contained"
                        color="success"
                        onClick={() => {
                          confirmPaymentRequest(book);
                        }}
                      >
                        <DoneOutlinedIcon fontSize="10px" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="reject payment">
                      <Button
                        sx={{ minWidth: '0', width: '20px' }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          rejectPaymentRequest(book);
                        }}
                        style={{ marginTop: '0.5rem' }}
                      >
                        <ClearIcon fontSize="10px" />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default OverduePayments;
