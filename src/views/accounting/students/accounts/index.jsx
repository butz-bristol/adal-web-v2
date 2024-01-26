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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import {
  fetchStudents,
  fetchStudentsByQuery,
  handleChange,
} from 'src/features/cashierFeatures/cashierSlice';

const Accounts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 25, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { query, students, filteredStudents, isFetchingStudents } = useSelector(
    (state) => state.cashier
  );

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const tableData =
    query.length > 0
      ? filteredStudents
          ?.filter(
            (student) => student.student_registration_status === 'registered'
          )
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : students
          ?.filter(
            (student) => student.student_registration_status === 'registered'
          )
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (query.length > 0
              ? filteredStudents?.filter(
                  (student) =>
                    student.student_registration_status === 'registered'
                ).length
              : students?.filter(
                  (student) =>
                    student.student_registration_status === 'registered'
                ).length)
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchStudentsByQuery());
    } else {
      dispatch(fetchStudents());
    }
  }, [dispatch, query]);

  return (
    <Stack>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={9} md={5} lg={3}>
          <FormControl fullWidth>
            <TextField
              label="Enter Student Information"
              variant="outlined"
              value={query}
              onChange={handleInput}
              name="query"
              required
              size="medium"
            />
          </FormControl>
        </Grid>
      </Grid>

      {isFetchingStudents && <LoadingScreen />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Student No.</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Voucher</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Regsitration Status</TableCell>
              <TableCell>Academic Eligibility</TableCell>
              <TableCell>Accountability Status</TableCell>
              <TableCell>Deficiencies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData
              : query.length > 0
                ? filteredStudents
                : students
            )?.map((student) => (
              <TableRow
                key={student._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{student.student_last_name}</TableCell>
                <TableCell>{student.student_first_name}</TableCell>
                <TableCell>{student.student_number}</TableCell>
                <TableCell>
                  {student?.student_yearlevel?.year_level_name}
                </TableCell>
                <TableCell>{'no voucher'}</TableCell>
                <TableCell>{'no pm'}</TableCell>
                <TableCell>{student.student_registration_status}</TableCell>
                <TableCell>{student.student_academic_status}</TableCell>
                <TableCell>{student.student_accountability_status}</TableCell>
                <TableCell>{student.student_deficiency_status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 0 }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}

            {(students?.length === 0 || filteredStudents?.length === 0) && (
              <TableRow style={{ height: 0 }}>
                <TableCell colSpan={11} align="center">
                  No students found.{' '}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={
          query.length > 0
            ? filteredStudents?.filter(
                (student) =>
                  student.student_registration_status === 'registered'
              ).length
            : students?.filter(
                (student) =>
                  student.student_registration_status === 'registered'
              ).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default Accounts;
