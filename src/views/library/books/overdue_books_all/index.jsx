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
import OverdueFineModal from 'src/components/library/OverdueFineModal';
import {
  getAllBookOverdueFines,
  setbookOverdueFineValues,
  toggleEditBookOverdueFine,
} from 'src/features/libraryFeatures/overdueBooks/bookOverdueFinesSlice';

const OverdueBooksAll = () => {
  const { bookOverdueFines, isFetchingOverdueBookFines } = useSelector(
    (state) => state.bookOverdueFines
  );
  const [query, setQuery] = useState('');
  const [display, setDisplay] = useState('block');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  let filteredOverdueBooks;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (query) {
    filteredOverdueBooks = bookOverdueFines?.filter(
      (overdueList) =>
        overdueList.userId?.first_name?.toLowerCase() ||
        overdueList.userId?.student_first_name?.toLowerCase() ||
        overdueList.userId?.student_last_name?.toLowerCase() ||
        overdueList.userId?.last_name?.toLowerCase() ||
        overdueList?.userId?.employee_id ||
        overdueList?.userId?.student_number ||
        !overdueList.isArchived
    );
  }

  const filteredOverdueBooksList = bookOverdueFines?.filter((overdueList) => {
    return (
      overdueList.userId?.first_name
        ?.toLowerCase()
        ?.includes(query.toLowerCase()) ||
      overdueList.userId?.student_first_name
        ?.toLowerCase()
        ?.includes(query.toLowerCase()) ||
      overdueList.userId?.student_last_name
        ?.toLowerCase()
        ?.includes(query.toLowerCase()) ||
      overdueList.userId?.last_name
        ?.toLowerCase()
        ?.includes(query.toLowerCase()) ||
      overdueList?.userId?.employee_id?.includes(query) ||
      overdueList?.userId?.student_number?.includes(query)
    );
  });

  const paginatedOverdueBooksList = filteredOverdueBooksList
    .flat()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderBookTableBody = () => {
    if (paginatedOverdueBooksList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedOverdueBooksList.map((overdueList) => (
      <TableRow
        key={overdueList._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          {overdueList?.userId?.employee_id
            ? overdueList.userId?.employee_id
            : overdueList?.userId?.student_number}
        </TableCell>
        <TableCell>
          {overdueList?.userId?.first_name
            ? overdueList.userId?.first_name
            : overdueList?.userId?.student_first_name}
        </TableCell>
        <TableCell>
          {overdueList?.userId?.last_name
            ? overdueList?.userId?.last_name
            : overdueList?.userId?.student_last_name}
        </TableCell>
        <TableCell>
          {overdueList?.userId?.student_department?.department_name
            ? userId?.student_department?.department_name
            : ''}
        </TableCell>
        <TableCell>{overdueList?.user_type}</TableCell>
        <TableCell>
          {overdueList?.isPenaltyExisting ? 'Done' : 'Pending'}
        </TableCell>
        <TableCell>
          <Tooltip title="request overdue user Fine List" arrow>
            <Button
              variant="text"
              color="success"
              onClick={() => {
                dispatch(toggleEditBookOverdueFine());
                dispatch(setbookOverdueFineValues(overdueList));
              }}
            >
              View Payment
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllBookOverdueFines());
  }, [query, dispatch, page]);

  return (
    <Stack spacing={2}>
      <OverdueFineModal />
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search for a overdueList"
          onChange={(event) => {
            setQuery(event.target.value);
            dispatch(getAllBookOverdueFines());
          }}
          value={query}
          InputProps={{
            endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
          }}
        />
      </div>
      {isFetchingOverdueBookFines && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee/Student ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderBookTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={paginatedOverdueBooksList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default OverdueBooksAll;
