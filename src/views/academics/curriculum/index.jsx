import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Chip,
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

import {
  IconDatabaseImport,
  IconEdit,
  IconSearch,
  IconSquarePlus,
  IconTrash,
} from '@tabler/icons-react';

import {
  clearCurriculum,
  deleteCurriculum,
  getAllCurriculums,
  getCurriculum,
  toggleAddCurriculum,
  toggleEditCurriculum,
} from 'src/features/academicFeatures/academicSlice';
import { getAllAcademicYears } from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AddCurriculumModal from 'src/components/academics/AddCurriculumModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const Curriculum = () => {
  const dispatch = useDispatch();

  const {
    isCreatingCurriculum,
    isUpdatingCurriculum,
    isFetchingCurriculums,
    isFetchingCurriculum,
    isDeletingCurriculum,
    curriculums,
    curriculum,
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

  const filteredData = curriculums.filter((item) => {
    const curriculum = `${item.curriculum_name}`;
    const academic_year = `${item.academic_year?.school_year}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      curriculum.toLowerCase().includes(searchTermLowerCase) ||
      academic_year.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'curriculum') {
      const propertyA =
        `${a.curriculum_name} ${a.academic_year?.school_year}`.toLowerCase();
      const propertyB =
        `${b.curriculum_name} ${b.academic_year?.school_year}`.toLowerCase();

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
      return (
        <TableRow>
          <TableCell colSpan={10} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row" style={{ width: '800px' }}>
          <Typography variant="body1">{item.curriculum_name}</Typography>
          <Typography variant="caption">
            {item.curriculum_description}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ whiteSpace: 'pre-line' }}>
          <Typography variant="body1">
            {item.academic_year?.school_year}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Chip
            label={item.remarks}
            size="small"
            color={
              item.remarks === 'Active'
                ? 'success'
                : item.remarks === 'Inactive'
                  ? 'default'
                  : 'error'
            }
          />
        </TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getCurriculum(item._id));
                dispatch(toggleEditCurriculum());
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
                dispatch(getCurriculum(item._id));
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
    dispatch(getAllAcademicYears());
    dispatch(getAllCurriculums());
  }, [dispatch]);

  return (
    <>
      <AddCurriculumModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this curriculum?'}
        onConfirm={() => {
          dispatch(deleteCurriculum(curriculum._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearCurriculum());
          setShowConfirmationModal(false);
        }}
      />
      {(isCreatingCurriculum ||
        isUpdatingCurriculum ||
        isFetchingCurriculum ||
        isDeletingCurriculum) && <LoadingScreen />}
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
              startIcon={<IconSquarePlus />}
              onClick={() => dispatch(toggleAddCurriculum())}
            >
              Add Curriculum
            </Button>
          </Grid>
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<IconDatabaseImport size={'17px'} />}
            >
              Import CSV
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingCurriculums ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'curriculum'}
                          direction={order}
                          onClick={() => handleSort('curriculum')}
                        >
                          Curriculum
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>School Year</TableCell>
                      <TableCell>Remarks</TableCell>
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

export default Curriculum;
