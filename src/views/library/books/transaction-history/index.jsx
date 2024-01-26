import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import { getSingleBook } from 'src/features/libraryFeatures/books/booksSlice';

const TransactionHistory = () => {
  const { id } = useParams();
  const { book, isFetchingBooks } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const formatDate = (dateString) => {
    const parsedDate = DateTime.fromISO(dateString);
    const formattedDate = parsedDate.toLocaleString(DateTime.DATETIME_MED);

    return formattedDate;
  };

  useEffect(() => {
    dispatch(getSingleBook(id));
  }, [dispatch, id]);

  const borrowingHistory = book?.book_same_copy
    ?.filter((history) => history.borrowingHistory.length > 0)
    ?.map((history) => {
      return history?.borrowingHistory.map((transaction) => ({
        callNumber: transaction?.callNumber,
        borrowedOn: transaction?.borrowedOn,
        overdueFine: transaction?.overdueFine,
        dueDate: transaction?.dueDate,
        bookReturnedOn: transaction?.bookReturnedOn,
        book_transaction_reference: transaction?.book_transaction_reference,
        designation: transaction.borrower?.designation,
        combineName:
          transaction.borrower?.first_name +
          ' ' +
          transaction.borrower?.last_name,
      }));
    });

  return (
    <Stack spacing={2}>
      {isFetchingBooks && <LoadingScreen />}
      {/* Book Details */}
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom mb={3}>
            Book Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Call Number
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_call_number}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Title
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_title}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Author
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_author}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Subject Code
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.subject_code}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                ISBN
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.ISBN}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Publication Date
              </Typography>
              <Typography variant="h5" color="GrayText">
                {DateTime.fromISO(book?.publication_date).toFormat(
                  'MM-dd-yyyy'
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Quantity
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_quantity}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Rack No
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_rack_no}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Reserved
              </Typography>
              <Typography variant="h5" color="GrayText">
                {'WIP'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Borrowed
              </Typography>
              <Typography variant="h5" color="GrayText">
                {'WIP'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h5" color="secondary" gutterBottom mb={1}>
                Book Copies
              </Typography>
              <Typography variant="h5" color="GrayText">
                {book?.book_same_copy?.length}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Book Transaction History */}
      <TableContainer component={Paper}>
        <Typography variant="h5" sx={{ padding: 2 }}>
          Transaction History
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Book Call Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Borrowed by</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Overdue Fine (₱)</TableCell>
              <TableCell>Borrowed on</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Returned On</TableCell>
              <TableCell>Transaction ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowingHistory ? (
              borrowingHistory.flat()?.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history?.callNumber}</TableCell>
                  <TableCell>{book?.book_title}</TableCell>
                  <TableCell>{book?.book_author}</TableCell>
                  <TableCell>{history?.combineName}</TableCell>
                  <TableCell>
                    {history?.book_borrowed_by?.designation}
                  </TableCell>
                  <TableCell>₱{history?.overdueFine}</TableCell>
                  <TableCell>{formatDate(history?.borrowedOn)}</TableCell>
                  <TableCell>{formatDate(history?.dueDate)}</TableCell>
                  <TableCell>{formatDate(history?.bookReturnedOn)}</TableCell>
                  <TableCell>{history?.book_transaction_reference}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>No entry</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TransactionHistory;
