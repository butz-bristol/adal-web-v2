import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import { getAllTeachingLoadByUserId } from 'src/features/academicFeatures/academicSlice';
import { k12Departments } from 'src/utils/helperFunctions';
const TeachingLoads = () => {
  const dispatch = useDispatch();
  const { subjectAssignments, isFetchingSubjectAssignments, userProfile } =
    useSelector((state) => state.academics);
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

  const filteredData = subjectAssignments.filter((item) => {
    const subject_course = `${item.subject_course?.subject_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return subject_course.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'subject_course') {
      const propertyA = `${a.subject_course?.subject_name}`.toLowerCase();
      const propertyB = `${b.subject_course?.subject_name}`.toLowerCase();

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
        <TableCell>
          <Typography variant="body1">
            <LinkComponent
              to={
                k12Departments.includes(
                  item?.section?.department?.department_name
                )
                  ? 'k12/' + item._id
                  : 'college/' + item._id
              }
            >
              {k12Departments.includes(
                item?.section?.department?.department_name
              )
                ? item.subject_course?.subject_name
                : item.subject_course?.course_name}
            </LinkComponent>
          </Typography>
          <Typography variant="caption">
            {item.section?.academic_year?.school_year}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.section?.section_name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.section?.department?.department_name}
          </Typography>
          {item.section?.college_track && (
            <Typography variant="caption">
              {item.section?.college_track?.college_track_name}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.section?.level?.year_level_name}
          </Typography>
          {item.section?.program && (
            <Typography variant="caption">
              {item.section?.program?.program_name}
            </Typography>
          )}
        </TableCell>
        <TableCell width={180}></TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllTeachingLoadByUserId());
  }, [dispatch]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Level</TableCell>
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TeachingLoads;
