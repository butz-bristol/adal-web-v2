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
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForm,
  toggleCreateBookOverdueFine,
  toggleEditBookOverdueFine,
} from 'src/features/libraryFeatures/overdueBooks/bookOverdueFinesSlice';

const OverdueFineModal = () => {
  const {
    bookOverdueFines,
    userFines,
    isFetchingOverdueBookFines,
    editOverdueBookFine,
    bookOverdueFine,
    isEditingOverdueBookFine,
  } = useSelector((state) => state.bookOverdueFines);
  const [requestButtonDisabled, setRequestButtonDisabled] = useState(false);
  const [totalOverdueFine, setTotalOverdueFine] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    isEditingOverdueBookFine
      ? dispatch(toggleCreateBookOverdueFine())
      : dispatch(toggleEditBookOverdueFine());
    dispatch(clearForm());
  };

  useEffect(() => {
    let sum = 0;
    userFines.forEach((overdueList) => {
      sum += overdueList.overdueFine;
    });
    setTotalOverdueFine(sum);
  }, [userFines]);

  return (
    <Dialog
      open={editOverdueBookFine}
      onClose={() => {
        editOverdueBookFine && dispatch(toggleEditBookOverdueFine());
        dispatch(clearForm());
      }}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3} textAlign="center">
          Overdue Fine List
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Call Number</TableCell>
                    <TableCell>Fine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userFines?.map((overdueList, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{overdueList?.bookTitle}</TableCell>
                      <TableCell>{overdueList?.callNumber}</TableCell>
                      <TableCell>{overdueList?.overdueFine}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      component="th"
                      scope="row"
                      sx={{ textTransform: 'capitalize' }}
                      align="right"
                    >
                      Total Balance (₱):
                    </TableCell>
                    <TableCell align="left">{totalOverdueFine}</TableCell>
                  </TableRow>
                </TableBody>
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

export default OverdueFineModal;
