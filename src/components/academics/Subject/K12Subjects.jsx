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
import {
  IconCopy,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import LoadingScreen from 'src/components/LoadingScreen';
import { K12SubjectModal } from 'src/components/academics';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearK12Subject,
  deleteK12Subject,
  getAllK12Subjects,
  getAllPrograms,
  getAllSubjectTypes,
  getK12Subject,
  setK12Subject,
  toggleAddK12Subject,
  toggleEditK12Subject,
} from 'src/features/academicFeatures/academicSlice';
import {
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';
import {
  departmentWithPrograms,
  k12Departments,
} from 'src/utils/helperFunctions';

const K12Subjects = () => {
  const dispatch = useDispatch();

  const {
    isCreatingK12Subject,
    isUpdatingK12Subject,
    isFetchingK12Subjects,
    isFetchingK12Subject,
    isDeletingK12Subject,
    k12Subjects,
    k12Subject,
  } = useSelector((state) => state.academics);

  const { departments, year_levels, college_tracks } = useSelector(
    (state) => state.registrar
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterTrack, setFilterTrack] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
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

  let filteredLevelsByDepartment;

  if (departmentWithPrograms.includes(filterDepartment)) {
    filteredLevelsByDepartment = year_levels.filter(
      (item) =>
        item.department?.department_name === filterDepartment &&
        item.college_or_track?.college_track_name === filterTrack
    );
  } else {
    filteredLevelsByDepartment = year_levels.filter(
      (item) => item.department?.department_name === filterDepartment
    );
  }

  const filteredDepartments = departments.filter((department) =>
    k12Departments.includes(department?.department_name)
  );
  const filteredTrackByDepartment = college_tracks.filter(
    (item) => item.department?.department_name === filterDepartment
  );

  const filteredData = k12Subjects.filter((item) => {
    const subject = `${item.subject_name}`;
    const department = `${item.department?.department_name}`;
    const college_track = `${item.college_track?.college_track_name}`;
    const program = `${item.program?.program_name}`;
    const level = `${item.level?.year_level_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filterDepartmentLowerCase = filterDepartment.toLowerCase();
    const filterTrackLowerCase = filterTrack.toLowerCase();
    const filterLevelLowerCase = filterLevel.toLowerCase();
    return (
      (subject.toLowerCase().includes(searchTermLowerCase) ||
        department.toLowerCase().includes(searchTermLowerCase) ||
        college_track.toLowerCase().includes(searchTermLowerCase) ||
        program.toLowerCase().includes(searchTermLowerCase) ||
        level.toLowerCase().includes(searchTermLowerCase)) &&
      department.toLowerCase().includes(filterDepartmentLowerCase) &&
      college_track.toLowerCase().includes(filterTrackLowerCase) &&
      (!filterLevelLowerCase
        ? level.toUpperCase().includes(filterLevelLowerCase)
        : level.toLowerCase() === filterLevelLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'subject') {
      const propertyA =
        `${a.subject_name} ${a.department?.department_name}`.toLowerCase();
      const propertyB =
        `${b.subject_name} ${b.department?.department_name}`.toLowerCase();
      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'program') {
      const propertyA =
        `${a.college_track?.college_track_name} ${a.program?.program_name}`.toLowerCase();
      const propertyB =
        `${b.college_track?.college_track_name} ${b.program?.program_name}`.toLowerCase();
      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'level') {
      const propertyA =
        `${a.level?.year_level_name} ${a.semester?.semester_term}`.toLowerCase();
      const propertyB =
        `${b.level?.year_level_name} ${b.semester?.semester_term}`.toLowerCase();
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
          {item.position}
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.subject_name}</Typography>
          <Typography variant="caption">
            {item.department?.department_name}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          {!departmentWithPrograms.includes(
            item.department?.department_name
          ) ? (
            'Not Applicable'
          ) : (
            <>
              <Typography variant="body1">
                {item.program
                  ? item.program?.program_name
                  : item.college_track?.college_track_name}
              </Typography>
              <Typography variant="caption">
                {item.program ? item.college_track?.college_track_name : ''}
              </Typography>
            </>
          )}
        </TableCell>
        <TableCell component="th" scope="row" sx={{ whiteSpace: 'pre-line' }}>
          <Typography variant="body1">{item.level?.year_level_name}</Typography>
          <Typography variant="caption">
            {item.semester ? item.semester?.semester_term : ''}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{item.subject_description}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Chip
            label={item.remarks}
            size="small"
            color={
              item.remarks === 'Active'
                ? 'success'
                : item.remarks === 'Inactive'
                  ? 'error'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell width={180}>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(getK12Subject(item._id));
                dispatch(toggleEditK12Subject());
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton
              aria-label="duplicate"
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(
                  setK12Subject({
                    subject_name: item.subject_name,
                    department: item.department,
                    college_track: item.college_track,
                    program: item.program,
                    level: item.level,
                    position: item.position,
                    semester: item.semester,
                    remarks: item.remarks,
                    subject_description: item.subject_description,
                  })
                );
                dispatch(toggleAddK12Subject());
              }}
            >
              <IconCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                dispatch(getK12Subject(item._id));
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
    dispatch(getAllK12Subjects());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    dispatch(getAllYearLevels());
    dispatch(getAllSubjectTypes());
  }, [dispatch]);

  return (
    <Fragment>
      <K12SubjectModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this subject?'}
        onConfirm={() => {
          dispatch(deleteK12Subject(k12Subject._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearK12Subject());
          setShowConfirmationModal(false);
        }}
      />
      {isCreatingK12Subject ||
        isUpdatingK12Subject ||
        isDeletingK12Subject ||
        (isFetchingK12Subject && <LoadingScreen />)}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} sm={6} md={7} spacing={1}>
          <Grid
            item
            xs={12}
            lg={departmentWithPrograms.includes(filterDepartment) ? 3 : 4}
          >
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
          <Grid
            item
            xs={12}
            lg={departmentWithPrograms.includes(filterDepartment) ? 3 : 4}
          >
            <FormControl fullWidth>
              <InputLabel id="select-department">Department</InputLabel>
              <Select
                id="select-department"
                label="Department"
                name="department"
                onChange={(e) => {
                  setFilterDepartment(e.target.value);
                  setFilterLevel('');
                  setPage(0);
                }}
                value={filterDepartment || ''}
              >
                <MenuItem value="">None</MenuItem>
                {filteredDepartments
                  .filter((department) => department.remarks === 'Active')
                  .map((department) => (
                    <MenuItem
                      key={department._id}
                      value={department?.department_name}
                    >
                      {department?.department_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {departmentWithPrograms.includes(filterDepartment) && (
            <Grid item xs={12} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="select-track">Track</InputLabel>
                <Select
                  id="select-track"
                  label="Track"
                  name="track"
                  onChange={(e) => {
                    setFilterTrack(e.target.value);
                    setFilterLevel('');
                    setPage(0);
                  }}
                  value={filterTrack || ''}
                >
                  <MenuItem value="">None</MenuItem>
                  {filteredTrackByDepartment ? (
                    filteredTrackByDepartment.map((item) => (
                      <MenuItem key={item._id} value={item.college_track_name}>
                        {item.college_track_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key="none" value="">
                      Select a Department
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            lg={departmentWithPrograms.includes(filterDepartment) ? 3 : 4}
          >
            <FormControl fullWidth>
              <InputLabel id="select-level">Level</InputLabel>
              <Select
                id="select-level"
                label="Level"
                name="level"
                onChange={(e) => {
                  setFilterLevel(e.target.value);
                  setPage(0);
                }}
                value={filterLevel || ''}
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {filteredLevelsByDepartment
                  .filter((level) => level.remarks === 'Active')
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
          sm={6}
          md
          spacing={1}
          justifyContent="flex-end"
        >
          <Grid item xs={12} lg="auto">
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<IconTrash />}
              disabled={filterDepartment === '' ? true : false}
              onClick={() => {
                setFilterDepartment('');
                setFilterTrack('');
                setFilterLevel('');
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
              onClick={() => dispatch(toggleAddK12Subject())}
            >
              Add Subject
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {isFetchingK12Subjects ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'subject'}
                          direction={order}
                          onClick={() => handleSort('subject')}
                        >
                          Subject Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'program'}
                          direction={order}
                          onClick={() => handleSort('program')}
                        >
                          Track
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'level'}
                          direction={order}
                          onClick={() => handleSort('level')}
                        >
                          Level
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Description</TableCell>
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
    </Fragment>
  );
};

export default K12Subjects;
