import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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

import {
  clearTesdaCourse,
  deleteTesdaCourse,
  getAllPrograms,
  getAllTesdaCourses,
  getTesdaCourse,
  toggleAddTesdaCourse,
  toggleEditTesdaCourse,
} from 'src/features/academicFeatures/academicSlice';
import {
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import AddTesdaCourseModal from 'src/components/academics/Subject/TesdaCourseModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const TesdaCourses = () => {
  const dispatch = useDispatch();

  const {
    isCreatingTesdaCourse,
    isUpdatingTesdaCourse,
    isFetchingTesdaCourses,
    isFetchingTesdaCourse,
    isDeletingTesdaCourse,
    tesdaCourses,
    tesdaCourse,
  } = useSelector((state) => state.academics);
  const { departments, college_tracks, year_levels } = useSelector(
    (state) => state.registrar
  );
  const { programs } = useSelector((state) => state.academics);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [collegeTrackName, setCollegeTrackName] = useState('');
  const [programName, setProgramName] = useState('');
  const [levelName, setLevelName] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const departmentId = departments.find(
    (department) =>
      department.department_name ===
      'Technical Education and Skills Development Authority (TESDA)'
  )?._id;
  const collegeTrackId = college_tracks.find(
    (track) => track.college_track_name === collegeTrackName
  )?._id;

  const filteredCollegeTracks = college_tracks.filter(
    (track) => track?.department?._id === departmentId
  );
  const filteredPrograms = programs.filter(
    (program) => program?.college_track?._id === collegeTrackId
  );

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

  const filteredData = tesdaCourses.filter((item) => {
    const course = `${item.course_name}`;
    const college_track = `${item.college_track?.college_track_name}`;
    const program = `${item.program?.program_name}`;
    const level = `${item.year_level?.year_level_name}`;
    const semester = `${item.semester?.semester_term}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filterCollegeTrack = collegeTrackName.toLowerCase();
    const filterProgram = programName.toLowerCase();
    const filterLevel = levelName.toLowerCase();
    return (
      (course.toLowerCase().includes(searchTermLowerCase) ||
        college_track.toLowerCase().includes(searchTermLowerCase) ||
        program.toLowerCase().includes(searchTermLowerCase) ||
        level.toLowerCase().includes(searchTermLowerCase) ||
        semester.toLowerCase().includes(searchTermLowerCase)) &&
      college_track.toLowerCase().includes(filterCollegeTrack) &&
      program.toLowerCase().includes(filterProgram) &&
      (!filterLevel
        ? level.toUpperCase().includes(filterLevel)
        : level.toLowerCase() === filterLevel)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'course') {
      const propertyA = `${a.course_name}`.toLowerCase();
      const propertyB = `${b.course_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'college_track') {
      const propertyA = `${a.college_track?.college_track_name}`.toLowerCase();
      const propertyB = `${b.college_track?.college_track_name}`.toLowerCase();

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
          <TableCell colSpan={8} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedData.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.course_name}</Typography>
          <Typography variant="caption">{item.course_code}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            {item.college_track?.college_track_name}
          </Typography>
          <Typography variant="caption">
            {item.program?.program_name}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            {item.year_level?.year_level_name}
          </Typography>
          <Typography variant="caption">
            {item.semester?.semester_term}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Chip
            label={item.remarks ? item.remarks : 'Null'}
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
        <TableCell width={180}>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={() => {
                dispatch(getTesdaCourse(item._id));
                dispatch(toggleEditTesdaCourse());
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
                dispatch(getTesdaCourse(item._id));
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
    dispatch(getAllTesdaCourses());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <>
      <AddTesdaCourseModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this course?'}
        onConfirm={() => {
          dispatch(deleteTesdaCourse(tesdaCourse._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearTesdaCourse());
          setShowConfirmationModal(false);
        }}
      />
      {(isCreatingTesdaCourse ||
        isUpdatingTesdaCourse ||
        isDeletingTesdaCourse) && <LoadingScreen />}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} sm={6} md={7} spacing={1}>
          <Grid item xs={12} lg={3}>
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
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="select-college-track">College/Track</InputLabel>
              <Select
                id="select-college-track"
                label="College/Track"
                name="college_track"
                onChange={(e) => {
                  setCollegeTrackName(e.target.value);
                }}
                value={collegeTrackName || ''}
              >
                {filteredCollegeTracks.map((college_track) => (
                  <MenuItem
                    key={college_track._id}
                    value={college_track?.college_track_name}
                  >
                    {college_track?.college_track_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="select-program">Program</InputLabel>
              <Select
                id="select-program"
                label="Program"
                name="program"
                onChange={(e) => {
                  setProgramName(e.target.value);
                }}
                value={programName || ''}
              >
                {filteredPrograms.map((program) => (
                  <MenuItem key={program._id} value={program?.program_name}>
                    {program?.program_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="select-level">Level</InputLabel>
              <Select
                id="select-level"
                label="Level"
                name="level"
                onChange={(e) => setLevelName(e.target.value)}
                value={levelName || ''}
              >
                {year_levels
                  .filter((level) => level.department?._id === departmentId)
                  .map((level) => (
                    <MenuItem key={level._id} value={level.year_level_name}>
                      {level.year_level_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md
          spacing={1}
          sx={{ justifyContent: { md: 'space-between', lg: 'flex-end' } }}
        >
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<IconTrash />}
              disabled={
                collegeTrackName === '' &&
                programName === '' &&
                levelName === ''
                  ? true
                  : false
              }
              onClick={() => {
                setCollegeTrackName('');
                setProgramName('');
                setLevelName('');
              }}
            >
              Clear Filter
            </Button>
          </Grid>
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<IconPlus />}
              onClick={() => dispatch(toggleAddTesdaCourse())}
            >
              Add Course
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingTesdaCourses ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'course'}
                          direction={order}
                          onClick={() => handleSort('course')}
                        >
                          Course
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
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'level'}
                          direction={order}
                          onClick={() => handleSort('level')}
                        >
                          Level & Semester
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Created At</TableCell>
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

export default TesdaCourses;
