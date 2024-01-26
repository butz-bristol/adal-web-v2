import {
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAcademicYear } from 'src/features/registrarFeatures/registrarSlice';

import { DateTime } from 'luxon';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AddFiscalYearModal from 'src/components/accounting/AddFiscalYearModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteFiscalYear,
  getAllFiscalYears,
  getFiscalYear,
  setCurrentFiscalYear,
  setDynamicData,
  toggleAddFiscalYear,
  toggleEditFiscalYear,
} from 'src/features/accountingFeatures/accountingSlice';

function formatMonthDay(dateString) {
  const parsedDate = DateTime.fromISO(dateString);
  return parsedDate.toFormat('LLLL dd');
}

const FiscalYear = () => {
  const dispatch = useDispatch();
  const {
    isCreatingFiscalYear,
    isUpdatingFiscalYear,
    isFetchingFiscalYears,
    fiscal_years,
  } = useSelector((state) => state.accounting);
  const { academic_years, activeAcademicYear } = useSelector(
    (state) => state.registrar
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [fiscalYearId, setFiscalYearId] = useState('');

  const handleChangeStatus = (e, fiscal_year) => {
    dispatch(setCurrentAcademicYear({ _id: fiscal_years._id }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = fiscal_years.filter((item) => {
    const academic_year = `${item.academic_year?.school_year}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return academic_year.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'academic_year') {
      const propertyA = `${a.academic_year?.school_year}`.toLowerCase();
      const propertyB = `${b.academic_year?.school_year}`.toLowerCase();

      if (order === 'desc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (paginatedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>{formatMonthDay(item.start_date)}</TableCell>
        <TableCell>{formatMonthDay(item.end_date)}</TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            {item.academic_year?.school_year}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={item.remarks}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.remarks === 'Active'
                ? 'success'
                : item.remarks === 'Inactive'
                  ? 'secondary'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>
          <Button
            sx={{ minWidth: '0', marginRight: '0.5rem' }}
            variant="outlined"
            color="primary"
            size="small"
            name="remarks"
            onClick={() => dispatch(setCurrentFiscalYear(item._id))}
            disabled={item.remarks === 'Current'}
          >
            {item.remarks === 'Inactive' || item.remarks === 'Next Term'
              ? 'Set Active'
              : 'Active'}
          </Button>
        </TableCell>
        <TableCell>
          <Stack direction={'row'} spacing={1}>
            <Button
              variant="contained"
              aria-label="edit"
              size="small"
              color="warning"
              onClick={() => {
                dispatch(getFiscalYear(item._id));
                dispatch(
                  setDynamicData({
                    academic_year_id: item.academic_year._id,
                    fiscal_start_date: item.start_date,
                    fiscal_end_date: item.end_date,
                  })
                );
                dispatch(toggleEditFiscalYear());
              }}
            >
              Edit
            </Button>

            <Button
              aria-label="delete"
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => {
                setFiscalYearId(item._id);
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllFiscalYears());
  }, [dispatch]);

  return (
    <>
      <AddFiscalYearModal />

      {isCreatingFiscalYear || (isUpdatingFiscalYear && <LoadingScreen />)}

      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Delete Fiscal Year"
        message="Are you sure you want to delete this Fiscal year?"
        onConfirm={() => {
          dispatch(deleteFiscalYear(fiscalYearId));
          setOpenDeleteModal(false);
        }}
        onCancel={() => {
          setOpenDeleteModal(false);
          setFiscalYearId('');
        }}
      />

      <Grid container>
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={1}
        >
          <Grid item xs={12} sm="auto">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Grid container spacing={2}>
              <Grid item xs={12} sm="auto">
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<IconPlus />}
                  onClick={() => dispatch(toggleAddFiscalYear())}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isFetchingFiscalYears ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'academic_year'}
                          direction={order}
                          onClick={() => handleSort('academic_year')}
                        >
                          Academic Year
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderTableBody()}</TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FiscalYear;
