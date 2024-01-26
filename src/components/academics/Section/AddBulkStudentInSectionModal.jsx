import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
  Typography,
} from '@mui/material';

import { IconSearch } from '@tabler/icons-react';

import {
  addStudentsInSection,
  setSelectedStudents,
  toggleAddBulkStudentInSection,
} from 'src/features/academicFeatures/academicSlice';

const AddBulkStudentInSectionModal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedStudents,
    isAddingStudentInSection,
    section,
    studentsByLevel,
  } = useSelector((state) => state.academics);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const mergedStudents = section.students.map((item) => item._id).flat();
  const filteredStudents = studentsByLevel.filter(
    (item) =>
      item.student_yearlevel?._id === section.level?._id &&
      !mergedStudents.includes(item._id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ids: selectedStudents,
      sectionId: id,
    };
    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }
    dispatch(addStudentsInSection(updatedData));
    handleClose();
  };

  const isSelected = (id) => selectedStudents.indexOf(id) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const selectedData = filteredStudents.map((row) => row._id);
      dispatch(setSelectedStudents(selectedData));
    } else {
      dispatch(setSelectedStudents([]));
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedStudents, id);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedStudents.slice(1));
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1)
      );
    }

    dispatch(setSelectedStudents(newSelectedRows));
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

  const handleClose = () => {
    dispatch(toggleAddBulkStudentInSection());
  };

  const filteredData = filteredStudents.filter((item) => {
    const student = `${item.student_first_name} ${item.student_last_name} ${item.student_type}`;
    const department = `${item.student_department?.department_name} ${item.student_college_track?.college_track_name}`;
    const program = `${
      item.student_program && item.student_program?.program_name
    } ${item.student_yearlevel?.year_level_name}`;

    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      student.toLowerCase().includes(searchTermLowerCase) ||
      department.toLowerCase().includes(searchTermLowerCase) ||
      program.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'student') {
      const propertyA =
        `${a.student_first_name} ${a.student_last_name} ${a.student_type}`.toLowerCase();
      const propertyB =
        `${b.student_first_name} ${b.student_last_name} ${b.student_type}`.toLowerCase();

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
        `${a.student_department?.department_name} ${a.student_college_track.college_track_name}`.toLowerCase();
      const propertyB =
        `${b.student_department?.department_name} ${b.student_college_track.college_track_name}`.toLowerCase();

      if (order === 'asc') {
        if (propertyA < propertyB) return -1;
        if (propertyA > propertyB) return 1;
      } else {
        if (propertyA > propertyB) return -1;
        if (propertyA < propertyB) return 1;
      }
    }
    if (orderBy === 'level') {
      const propertyA = `${
        a.student_program ? student_program.program_name : '' || ''
      } ${a.student_yearlevel.year_level_name}`.toLowerCase();
      const propertyB = `${
        b.student_program ? student_program.program_name : '' || ''
      } ${b.student_yearlevel.year_level_name}`.toLowerCase();

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
      <TableRow
        key={item._id}
        hover
        onClick={(e) => handleRowClick(e, item._id)}
        role="checkbox"
        aria-checked={isSelected(item._id)}
        tabIndex={-1}
        selected={isSelected(item._id)}
      >
        <TableCell>
          <Checkbox checked={isSelected(item._id)} />
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_first_name} {item.student_last_name}
          </Typography>
          <Typography variant="caption">{item.student_type}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_department?.department_name}
          </Typography>
          <Typography variant="caption">
            {item.student_college_track?.college_track_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student_program
              ? item.student_program?.program_name
              : item.student_yearlevel?.year_level_name}
          </Typography>
          <Typography variant="caption">
            {item.student_program
              ? item.student_yearlevel?.year_level_name
              : ''}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={item.student_registration_status}
            size="small"
            sx={{ textTransform: 'capitalize' }}
            color={
              item.student_registration_status === 'registered'
                ? 'success'
                : item.student_registration_status ===
                    'eligible for registration'
                  ? 'error'
                  : 'default'
            }
          />
        </TableCell>
        <TableCell>
          <Typography textTransform="capitalize" variant="body1">
            {item.student_deficiency_status}
          </Typography>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={isAddingStudentInSection}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>Add Students</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          p={2}
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
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedStudents.length > 0 &&
                      selectedStudents.length < filteredStudents.length
                    }
                    checked={
                      selectedStudents.length === filteredStudents.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'student'}
                    direction={order}
                    onClick={() => handleSort('student')}
                  >
                    Name
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
                <TableCell>Registration Status</TableCell>
                <TableCell>Deficiency Status</TableCell>
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
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={
            selectedStudents.length + section.students.length >
            section.section_capacity
          }
        >
          {selectedStudents.length + section.students.length >
          section.section_capacity
            ? 'Max Capacity Reached'
            : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBulkStudentInSectionModal;
