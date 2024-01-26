import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import {
  IconDatabaseImport,
  IconEdit,
  IconSearch,
  IconSquarePlus,
  IconTrash,
} from '@tabler/icons-react';

import {
  clearProgram,
  deleteProgram,
  getAllCurriculums,
  getAllPrograms,
  getProgram,
  toggleAddProgram,
  toggleEditProgram,
} from 'src/features/academicFeatures/academicSlice';
import { getAllCollegeTracks } from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AddProgramModal from 'src/components/academics/AddProgramModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const Program = () => {
  const dispatch = useDispatch();

  const {
    isCreatingProgram,
    isUpdatingProgram,
    isFetchingPrograms,
    isFetchingProgram,
    isDeletingProgram,
    programs,
    program,
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

  const filteredPrograms = programs.filter(
    (program) => program.isArchived === false
  );

  const filteredData = filteredPrograms.filter((item) => {
    const program = `${item.program_name}`;
    const curriculum = `${item.curriculum?.curriculum_name}`;
    const college_track = `${item.college_track?.college_track_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      program.toLowerCase().includes(searchTermLowerCase) ||
      curriculum.toLowerCase().includes(searchTermLowerCase) ||
      college_track.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'program') {
      const propertyA =
        `${a.program_name} ${a.curriculum?.curriculum_name}`.toLowerCase();
      const propertyB =
        `${b.program_name} ${b.curriculum?.curriculum_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'college_track') {
      const propertyA =
        `${a.program.college_track?.college_track_name}`.toLowerCase();
      const propertyB =
        `${b.program.college_track?.college_track_name}`.toLowerCase();

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
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.program_name}</Typography>
          <Typography variant="caption">
            {item.curriculum_ref?.curriculum_name}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row" style={{ width: '500px' }}>
          <Typography variant="body1">
            {item.college_track?.college_track_name}
          </Typography>
          <Typography variant="caption">{item.program_description}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            {item.createdBy?.first_name} {item.createdBy?.last_name}
          </Typography>
          <Typography variant="caption">
            {item.createdAt
              ? DateTime.fromISO(item.createdAt).toFormat('LLLL dd yyyy HH:mm')
              : 'Not Available'}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.updatedAt
              ? DateTime.fromISO(item.updatedAt).toFormat('LLLL dd yyyy HH:mm')
              : 'Not Available'}
          </Typography>
        </TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getProgram(item._id));
                dispatch(toggleEditProgram());
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
                dispatch(getProgram(item._id));
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
    dispatch(getAllCurriculums());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
  }, [dispatch]);

  return (
    <>
      <AddProgramModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this program?'}
        onConfirm={() => {
          dispatch(deleteProgram(program._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearProgram());
          setShowConfirmationModal(false);
        }}
      />
      {(isCreatingProgram ||
        isUpdatingProgram ||
        isFetchingProgram ||
        isDeletingProgram) && <LoadingScreen />}
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
              onClick={() => dispatch(toggleAddProgram())}
            >
              Add Program
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
          {isFetchingPrograms ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'program'}
                          direction={order}
                          onClick={() => handleSort('program')}
                        >
                          Program & Strand
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'college_track'}
                          direction={order}
                          onClick={() => handleSort('college_track')}
                        >
                          Colleges & Tracks
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Last Updated</TableCell>
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

export default Program;
