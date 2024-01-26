import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
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
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTableEmptyRows from 'src/components/DataTableEmptyRows';
import DataTableNoResult from 'src/components/DataTableNoResult';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearSubjectType,
  deleteSubjectTypeById,
  getAllSubjectTypes,
  getSubjectTypeById,
  toggleAddSubjectType,
  toggleEditSubjectType,
} from 'src/features/academicFeatures/academicSlice';
import AddSubjectTypeModal from './AddSubjectTypeModal';

const SubjectTypes = () => {
  const dispatch = useDispatch();
  const {
    isCreatingSubjectType,
    isUpdatingSubjectType,
    isFetchingSubjectTypes,
    isDeletingSubjectType,
    subjectTypes,
    subjectType,
  } = useSelector((state) => state.academics);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const filteredData = subjectTypes.filter((item) => {
    const subject_type = `${item.subject_type}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return subject_type.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'subject_type') {
      const propertyA = `${a.subject_type}`.toLowerCase();
      const propertyB = `${b.subject_type}`.toLowerCase();

      if (order === 'asc') {
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
      return searchTerm !== '' ? (
        <DataTableNoResult query={searchTerm} />
      ) : (
        <DataTableEmptyRows />
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">{item.subject_type}</Typography>
          <Typography variant="caption">
            {item.department?.department_name}
          </Typography>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'pre-line' }}>
          {item.description}
        </TableCell>
        <TableCell>
          {item.createdBy && (
            <Typography variant="body1">
              {item.createdBy?.first_name} {item.createdBy?.last_name}
            </Typography>
          )}
          <Typography variant="caption">
            {item.createdAt
              ? DateTime.fromISO(item.createdAt).toFormat('LLLL dd yyyy HH:mm')
              : 'Not Available'}
          </Typography>
        </TableCell>
        <TableCell>
          {item.updatedBy && (
            <Typography variant="body1">
              {item.updatedBy?.first_name} {item.updatedBy?.last_name}
            </Typography>
          )}
          <Typography variant="caption">
            {item.updatedAt
              ? DateTime.fromISO(item.updatedAt).toFormat('LLLL dd yyyy HH:mm')
              : 'Not Available'}
          </Typography>
        </TableCell>
        <TableCell width={180}>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getSubjectTypeById(item._id));
                dispatch(toggleEditSubjectType());
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(getSubjectTypeById(item._id));
                setShowConfirmationModal(true);
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
    dispatch(getAllSubjectTypes());
  }, [dispatch]);

  return (
    <>
      <AddSubjectTypeModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this room type?'}
        onConfirm={() => {
          dispatch(deleteSubjectTypeById(subjectType._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearSubjectType());
          setShowConfirmationModal(false);
        }}
      />
      {(isCreatingSubjectType ||
        isUpdatingSubjectType ||
        isDeletingSubjectType) && <LoadingScreen />}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} md={6} spacing={1}>
          <Grid item xs={12} lg={6}>
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
        </Grid>
        <Grid container item xs={12} md spacing={1} justifyContent="flex-end">
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<IconPlus />}
              onClick={() => dispatch(toggleAddSubjectType())}
            >
              Add Subject Type
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingSubjectTypes ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'subject_type'}
                          direction={order}
                          onClick={() => handleSort('subject_type')}
                        >
                          Subject Type
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Description</TableCell>
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SubjectTypes;
