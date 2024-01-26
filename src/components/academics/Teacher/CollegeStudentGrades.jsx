import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  getCollegeStudentsFromSection,
  getSubjectAssignment,
  setSubjectsFromEnrollmentLoad,
  submitCollegeBulkGrades,
  updateCollegeBulkGrades,
} from 'src/features/academicFeatures/academicSlice';

const CollegeStudentGrades = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    isFetchingStudentsFromEnrollment,
    isFetchingSubjectAssignment,
    subjectAssignment,
    enrolledStudents,
  } = useSelector((state) => state.academics);

  const period = [
    { label: 'Prelim', value: 'prelim' },
    { label: 'Midterm', value: 'midterm' },
    { label: 'Final', value: 'final' },
    { label: 'Final Grade', value: 'finalGrade' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleSubmit = () => {
    const updatedData = enrolledStudents.map((studentData) => {
      const updatedSubjects = { ...studentData.subjects };

      // Check and update prelim
      if (updatedSubjects.prelim !== undefined) {
        updatedSubjects.prelim_status = 'Submitted';
      }

      // Check and update midterm
      if (updatedSubjects.midterm !== undefined) {
        updatedSubjects.midterm_status = 'Submitted';
      }

      // Check and update final
      if (updatedSubjects.final !== undefined) {
        updatedSubjects.final_status = 'Submitted';
      }

      return {
        ...studentData,
        subjects: updatedSubjects,
      };
    });

    dispatch(
      submitCollegeBulkGrades({
        enrolledStudents: updatedData,
        section: subjectAssignment?.section?._id,
        subject: subjectAssignment?.subject_course?._id,
      })
    );
  };
  const handleSaveDraft = () => {
    dispatch(
      updateCollegeBulkGrades({
        enrolledStudents,
        section: subjectAssignment?.section?._id,
        subject: subjectAssignment?.subject_course?._id,
      })
    );
  };
  const handleInput = (e, id) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      toast.error('Value must be a number');
      return;
    }
    const updatedEnrolledStudents = enrolledStudents.map((student, index) => {
      if (index.toString() === id) {
        return {
          ...student,
          subjects: {
            ...student.subjects,
            [name]: value,
          },
        };
      }
      return student;
    });
    dispatch(setSubjectsFromEnrollmentLoad(updatedEnrolledStudents));
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

  const filteredData = enrolledStudents.filter((item) => {
    const subject_course = `${item.subject_course?.course_name}`;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return subject_course.toLowerCase().includes(searchTermLowerCase);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === 'subject_course') {
      const propertyA = `${a.subject_course?.course_name}`.toLowerCase();
      const propertyB = `${b.subject_course?.course_name}`.toLowerCase();

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
    return paginatedData.map((item, subjectIndex) => (
      <TableRow key={item._id}>
        <TableCell>
          <Typography variant="body1">
            {item.student?.student_number}
          </Typography>
          <Typography variant="caption">
            {item.student?.student_type}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student?.student_first_name} {item.student?.student_last_name}
          </Typography>
          <Typography variant="caption">
            {item.student?.student_email}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {item.student?.student_gender}
          </Typography>
        </TableCell>

        {period.map((periodItem, periodIndex) => {
          return (
            <TableCell key={periodIndex} align="center" width={120}>
              {item[periodItem.value]?.status === 'Verified' ||
              item[periodItem.value]?.status === 'Submitted' ||
              item.subjects[periodItem.value + '_status'] === 'Submitted' ? (
                item.subjects[periodItem.value] || ''
              ) : (
                <TextField
                  size="small"
                  type="text"
                  id={subjectIndex.toString() + '_' + periodIndex.toString()}
                  name={periodItem.value}
                  value={item.subjects[periodItem.value] || ''}
                  onChange={(e) => {
                    handleInput(e, subjectIndex.toString());
                  }}
                  disabled={
                    item[periodItem.value]?.status === 'Verified' ||
                    item[periodItem.value]?.status === 'Submitted' ||
                    item.subjects[periodItem.value + '_status'] === 'Submitted'
                      ? true
                      : false
                  }
                />
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getSubjectAssignment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id === subjectAssignment?._id) {
      dispatch(
        getCollegeStudentsFromSection({
          section: subjectAssignment?.section?._id,
          subject: subjectAssignment?.subject_course?._id,
        })
      );
    }
  }, [
    dispatch,
    id,
    subjectAssignment?._id,
    subjectAssignment?.section?._id,
    subjectAssignment?.subject_course?._id,
  ]);

  return (
    <Fragment>
      <ConfirmationModal
        isOpen={showSubmitModal}
        title={'Confirm Action'}
        message={
          'This action is irreversible. Confirm your intent to submit, as it cannot be undone'
        }
        onConfirm={() => {
          handleSubmit();
          setShowSubmitModal(false);
        }}
        onCancel={() => {
          setShowSubmitModal(false);
        }}
      />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs>
            <LinkComponent to={'../'}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<IconArrowLeft />}
              >
                Back
              </Button>
            </LinkComponent>
          </Grid>
          <Grid
            item
            xs
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => setShowSubmitModal(true)}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="warning"
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isFetchingStudentsFromEnrollment && isFetchingSubjectAssignment ? (
            <LoadingData />
          ) : (
            <Box component={Paper}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Gender</TableCell>
                      {period.map((item, index) => (
                        <TableCell key={index} align="center">
                          {item.label}
                        </TableCell>
                      ))}
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

export default CollegeStudentGrades;
