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
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import { fetchReportAccountNos } from 'src/features/cashierFeatures/cashierSlice';

const ReportAccountNos = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 45, 150];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { reportAccountNos, isFetchingReportAccountNos } = useSelector(
    (state) => state.cashier
  );

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - reportAccountNos?.length)
      : 0;

  const tableData = reportAccountNos?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    dispatch(fetchReportAccountNos());
  }, [dispatch]);

  if (isFetchingReportAccountNos) return <LoadingScreen />;

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Account No.</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Cashier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              ?.filter((row) => row?.bank_account)
              ?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    {DateTime.fromISO(row?.createdAt).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </TableCell>
                  <TableCell>{row?.bank_account}</TableCell>
                  <TableCell>{row?.amount}</TableCell>
                  <TableCell>
                    {row?.createdBy?.first_name} {row?.createdBy?.last_name}
                  </TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 0 }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={reportAccountNos?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReportAccountNos;
