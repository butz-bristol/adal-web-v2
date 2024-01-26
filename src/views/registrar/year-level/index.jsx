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

import {
  deleteYearLevel,
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
  getYearLevel,
  toggleAddYearLevel,
  toggleEditYearLevel,
} from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import YearLevelModal from 'src/components/registrar/YearLevelModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const YearLevel = () => {
  const dispatch = useDispatch();

  const {
    isCreatingYearLevel,
    isUpdatingYearLevel,
    isFetchingYearLevels,
    year_levels,
  } = useSelector((state) => state.registrar);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [yearLevelId, setYearLevelId] = useState('');

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

  const filteredData = year_levels.filter((item) => {
    const level = `${item.year_level_name}`;
    const department = `${item.department?.department_name}`;
    const college_or_track = `${item.college_or_track?.college_track_name}`;
    const position = `${item.year_level_position}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      level.toLowerCase().includes(searchTermLowerCase) ||
      department.toLowerCase().includes(searchTermLowerCase) ||
      position.toLowerCase().includes(searchTermLowerCase) ||
      college_or_track.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'level') {
      const propertyA = `${a.year_level_name}`.toLowerCase();
      const propertyB = `${b.year_level_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'department') {
      const propertyA =
        `${a.department?.department_name} ${a.college_or_track?.college_track_name}`.toLowerCase();
      const propertyB =
        `${b.department?.department_name} ${b.college_or_track?.college_track_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'position') {
      const propertyA = `${a.year_level_position}`.toLowerCase();
      const propertyB = `${b.year_level_position}`.toLowerCase();

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
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">{item.year_level_name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.department?.department_name}
          </Typography>
          <Typography variant="caption">
            {item.college_or_track?.college_track_name}
          </Typography>
        </TableCell>
        <TableCell width={50}>
          <Typography variant="body1">{item.year_level_position}</Typography>
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
                dispatch(getYearLevel(item._id));
                dispatch(toggleEditYearLevel());
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
                setYearLevelId(item._id);
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
    dispatch(getAllYearLevels());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
  }, [dispatch]);

  return (
    <Stack>
      <YearLevelModal />
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Delete Year/Grade Level"
        message="Are you sure you want to delete this year?"
        onConfirm={() => {
          dispatch(deleteYearLevel(yearLevelId));
          setOpenDeleteModal(false);
        }}
        onCancel={() => {
          setOpenDeleteModal(false);
          setYearLevelId('');
        }}
      />
      {isCreatingYearLevel || isUpdatingYearLevel ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={1}>
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
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
                    onClick={() => dispatch(toggleAddYearLevel())}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {isFetchingYearLevels ? (
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
                            active={orderBy === 'level'}
                            direction={order}
                            onClick={() => handleSort('level')}
                          >
                            Level
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'department'}
                            direction={order}
                            onClick={() => handleSort('department')}
                          >
                            Department
                          </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ width: '20px' }}>
                          <TableSortLabel
                            active={orderBy === 'position'}
                            direction={order}
                            onClick={() => handleSort('position')}
                          >
                            Position
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Remarks</TableCell>
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

export default YearLevel;
