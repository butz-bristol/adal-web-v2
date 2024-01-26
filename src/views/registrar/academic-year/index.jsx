import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AcademicYearModal from 'src/components/registrar/AcademicYearModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteAcademicYear,
  getAcademicYear,
  getAllAcademicYears,
  setCurrentAcademicYear,
  toggleAddAcademicYear,
  toggleEditAcademicYear,
} from 'src/features/registrarFeatures/registrarSlice';

const AcademicYear = () => {
  const dispatch = useDispatch();

  const {
    isCreatingAcademicYear,
    isUpdatingAcademicYear,
    isFetchingAcademicYears,
    academic_years,
    activeAcademicYear,
  } = useSelector((state) => state.registrar);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [academicYearId, setAcademicYearId] = useState('');

  const handleChangeStatus = (e, academic_year) => {
    dispatch(setCurrentAcademicYear({ _id: academic_year._id }));
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

  const filteredData = academic_years.filter((item) => {
    const academic_year = `${item.academic_year}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return academic_year.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'academic_year') {
      const propertyA = `${a.school_year}`.toLowerCase();
      const propertyB = `${b.school_year}`.toLowerCase();

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
          <TableCell colSpan={6} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.school_year}</Typography>
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
                  ? 'error'
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
            onClick={() => dispatch(setCurrentAcademicYear(item._id))}
            disabled={item.remarks === 'Current'}
          >
            {item.remarks === 'Inactive' || item.remarks === 'Next Term'
              ? 'Set Active'
              : 'Active'}
          </Button>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.createdAt ? item.createdAt : 'Unavailable'}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.updatedAt ? item.updatedAt : 'Unavailable'}
          </Typography>
        </TableCell>

        <TableCell width={180}>
          <Tooltip title="View">
            <IconButton aria-label="view" size="small" color="info">
              <IconEye />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              variant=""
              color="secondary"
              onClick={() => {
                dispatch(getAcademicYear(item._id));
                dispatch(toggleEditAcademicYear());
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                setAcademicYearId(item._id);
                setOpenDeleteModal(true);
              }}
            >
              <IconTrash />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllAcademicYears());
  }, [dispatch]);

  return (
    <Stack>
      <AcademicYearModal />
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Delete Academic Year"
        message="Are you sure you want to delete this?"
        onConfirm={() => {
          dispatch(deleteAcademicYear(academicYearId));
          setOpenDeleteModal(false);
        }}
        onCancel={() => {
          setOpenDeleteModal(false);
          setAcademicYearId('');
        }}
      />
      {isCreatingAcademicYear || isUpdatingAcademicYear ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
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
                    onClick={() => dispatch(toggleAddAcademicYear())}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isFetchingAcademicYears ? (
            <LoadingData />
          ) : (
            <Grid item xs={12}>
              <Box component={Paper}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
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
            </Grid>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default AcademicYear;
