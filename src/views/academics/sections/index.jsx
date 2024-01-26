import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
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
  clearSection,
  deleteSection,
  getAllSections,
  getSection,
  setSection,
  toggleAddSection,
  toggleEditSection,
} from 'src/features/academicFeatures/academicSlice';

import {
  IconCopy,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';

import LinkComponent from 'src/components/LinkComponent';

import LoadingScreen from 'src/components/LoadingScreen';
import AddSectionModal from 'src/components/academics/AddSectionModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';

const Sections = () => {
  const dispatch = useDispatch();

  const {
    section,
    sections,
    isFetchingSections,
    isCreatingSection,
    isUpdatingSection,
    userProfile,
    selectedAcademicYear,
  } = useSelector((state) => state.academics);
  const { academic_years, departments, year_levels } = useSelector(
    (state) => state.registrar
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const filteredLevelsByDepartment = year_levels.filter(
    (year_level) => year_level?.department?.department_name === filterDepartment
  );
  const departmentId = userProfile.teaching_department?.map(
    (item) => item?._id
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

  const filteredData = sections.filter((item) => {
    const section = `${item.section_name}`;
    const department = `${item.department?.department_name}`;
    const college_track = `${item.college_track?.college_track_name}`;
    const program = `${item.program?.program_name}`;
    const level = `${item.level?.year_level_name}`;
    const adviser = `${item.adviser?.first_name} ${item.adviser?.last_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filterDepartmentLowerCase = filterDepartment.toLowerCase();
    const filterLevelLowerCase = filterLevel.toLowerCase();

    return (
      (section.toLowerCase().includes(searchTermLowerCase) ||
        department.toLowerCase().includes(searchTermLowerCase) ||
        college_track.toLowerCase().includes(searchTermLowerCase) ||
        program.toLowerCase().includes(searchTermLowerCase) ||
        level.toLowerCase().includes(searchTermLowerCase) ||
        adviser.toLowerCase().includes(searchTermLowerCase)) &&
      department.toLowerCase().includes(filterDepartmentLowerCase) &&
      (!filterLevelLowerCase
        ? level.toUpperCase().includes(filterLevelLowerCase)
        : level.toLowerCase() === filterLevelLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'section') {
      const propertyA = `${a.section_name} ${a.section_name}`.toLowerCase();
      const propertyB = `${b.section_name} ${b.section_name}`.toLowerCase();

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
        `${a.department?.department_name} ${a.college_track?.college_track_name}`.toLowerCase();
      const propertyB =
        `${b.department?.department_name} ${b.college_track?.college_track_name}`.toLowerCase();

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
        `${a.program?.program_name} ${a.level?.year_level_name}`.toLowerCase();
      const propertyB =
        `${b.program?.program_name} ${b.level?.year_level_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'adviser') {
      const propertyA =
        `${a.adviser?.first_name} ${a.adviser?.last_name}`.toLowerCase();
      const propertyB =
        `${b.adviser?.first_name} ${b.adviser?.last_name}`.toLowerCase();

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
          <Typography variant="body1">
            <LinkComponent to={`${item._id}`}>
              {item.section_name}
            </LinkComponent>
          </Typography>
          <Typography variant="caption">
            {item.academic_year?.school_year}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.department?.department_name}
          </Typography>
          <Typography variant="caption">
            {item.college_track?.college_track_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.program
              ? item.program?.program_name
              : item.level?.year_level_name}
          </Typography>
          <Typography variant="caption">
            {item.program ? item.level?.year_level_name : ''}
          </Typography>
        </TableCell>
        <TableCell>
          {item.adviser
            ? item.adviser?.first_name + ' ' + item.adviser?.last_name
            : 'Unassigned'}
        </TableCell>
        <TableCell>
          {item.students.length}/{item.section_capacity}
        </TableCell>
        <TableCell>
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
          <Typography variant="body1">
            {item.updatedBy?.first_name} {item.updatedBy?.last_name}
          </Typography>
          <Typography variant="caption">
            {item.updatedAt
              ? DateTime.fromISO(item.updatedAt).toFormat('LLLL dd yyyy HH:mm')
              : 'Not Available'}
          </Typography>
        </TableCell>
        <TableCell width={180}>
          {(userProfile?._id === item?.adviser?._id ||
            userProfile?.admin_designation_toggle) && (
            <Fragment>
              <Tooltip title="Duplicate">
                <IconButton
                  aria-label="duplicate"
                  size="small"
                  color="secondary"
                  onClick={() => {
                    dispatch(
                      setSection({
                        section_name: item.section_name,
                        academic_year: item.academic_year,
                        section_capacity: item.section_capacity,
                        department: item.department,
                        college_track: item.college_track,
                        program: item.program,
                        level: item.level,
                        adviser: item.adviser,
                      })
                    );
                    dispatch(toggleAddSection());
                  }}
                >
                  <IconCopy />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  size="small"
                  color="secondary"
                  onClick={() => {
                    dispatch(getSection(item._id));
                    dispatch(toggleEditSection());
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
                    dispatch(setSection({ _id: item._id }));
                    setShowConfirmationModal(true);
                  }}
                >
                  <IconTrash />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllSections());
  }, [dispatch]);

  return (
    <>
      <AddSectionModal />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title={'Confirm Action'}
        message={'Are you sure you want to delete this?'}
        onConfirm={() => {
          dispatch(deleteSection(section._id));
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          dispatch(clearSection());
          setShowConfirmationModal(false);
        }}
      />
      {(isCreatingSection || isUpdatingSection) && <LoadingScreen />}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={1}
      >
        <Grid container item xs={12} sm={6} md={7} spacing={1}>
          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
              placeholder="Search"
            />
          </Grid>
          <Grid item xs={12} lg={4}>
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
                {departments
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
          <Grid item xs={12} lg={4}>
            <FormControl fullWidth>
              <InputLabel id="select-level">Level</InputLabel>
              <Select
                id="select-level"
                label="Level"
                name="level"
                onChange={(e) => {
                  setPage(0);
                  setFilterLevel(e.target.value);
                }}
                value={filterLevel || ''}
              >
                {filterDepartment ? (
                  filteredLevelsByDepartment
                    .filter((level) => level.remarks === 'Active')
                    .map((level) => (
                      <MenuItem key={level._id} value={level.year_level_name}>
                        {level.year_level_name}
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
              onClick={() => dispatch(toggleAddSection())}
            >
              Add Section
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box component={Paper}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'section'}
                        direction={order}
                        onClick={() => handleSort('section')}
                      >
                        Section
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
                        active={orderBy === 'adviser'}
                        direction={order}
                        onClick={() => handleSort('adviser')}
                      >
                        Adviser
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Last Update</TableCell>
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
      </Grid>
    </>
  );
};

export default Sections;
