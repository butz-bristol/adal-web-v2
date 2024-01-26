import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  IconDatabaseImport,
  IconEdit,
  IconEye,
  IconSearch,
} from '@tabler/icons-react';

import LinkComponent from 'src/components/LinkComponent';

import LoadingData from 'src/components/LoadingData';
import EditTeacherProfile from 'src/components/academics/Teacher/EditTeacherProfile';
import {
  getAllInstructors,
  getAllPrograms,
  setUser,
  toggleEditUser,
} from 'src/features/academicFeatures/academicSlice';
import {
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

const Teachers = () => {
  const dispatch = useDispatch();
  const { instructors, isFetchingInstructors } = useSelector(
    (state) => state.academics
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

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

  const filteredData = instructors.filter((item) => {
    const instructor = `${item.last_name}, ${item.first_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return instructor.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'student') {
      const propertyA = `${a.last_name} ${a.first_name}`.toLowerCase();
      const propertyB = `${b.last_name} ${b.first_name}`.toLowerCase();

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
          <TableCell colSpan={9} align="center">
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
              {item.last_name}, {item.first_name}
            </LinkComponent>
          </Typography>
          <Typography variant="caption">
            {item.employee_id ? item.employee_id : 'Unavaiable'}
          </Typography>
        </TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
          {item.teaching_designation?.map((user) => user.designation_name)}
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {item.isVerifier && (
              <Chip size="small" color="success" label="Verifier" />
            )}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {DateTime.fromISO(item.updatedAt).toFormat('LLLL dd yyyy HH:mm')}
          </Typography>
        </TableCell>
        <TableCell width={180}>
          <Tooltip title="View">
            <IconButton aria-label="view" size="small" color="info">
              <IconEye />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="View"
            onClick={() => {
              dispatch(toggleEditUser());
              dispatch(
                setUser({
                  _id: item._id,
                  isVerifier: item.isVerifier,
                  teaching_department: item.teaching_department,
                  levels: item.levels,
                })
              );
            }}
          >
            <IconButton aria-label="view" size="small" color="secondary">
              <IconEdit />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllInstructors());
    dispatch(getAllCollegeTracks());
    dispatch(getAllPrograms());
    dispatch(getAllYearLevels());
    dispatch(getAllDepartments());
  }, [dispatch]);

  return (
    <Fragment>
      <EditTeacherProfile />
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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
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
          {isFetchingInstructors ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Verifier</TableCell>
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
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Teachers;
