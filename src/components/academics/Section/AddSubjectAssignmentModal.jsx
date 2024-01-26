import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import {
  clearSubjectAssignment,
  createSubjectAssignment,
  setSubjectAssignment,
  toggleAddSubjectAssignment,
  toggleEditSubjectAssignment,
  updateSubjectAssignment,
} from 'src/features/academicFeatures/academicSlice';

import LinkComponent from 'src/components/LinkComponent';
import { k12Departments } from 'src/utils/helperFunctions';

const AddSubjectAssignmentModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    isAddingSubjectAssignment,
    isEditingSubjectAssignment,
    section,
    subjectAssignment,
    instructors,
    k12Subjects,
    collegeSubjects,
    tesdaCourses,
  } = useSelector((state) => state.academics);

  const { departments } = useSelector((state) => state.registrar);

  const selectedDepartment = departments?.find(
    (department) => department?._id === section.department?._id
  )?.department_name;

  const handleInput = (e) => {
    dispatch(
      setSubjectAssignment({
        ...subjectAssignment,
        [e.target.name]: { _id: e.target.value },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject_type = k12Departments.includes(selectedDepartment)
      ? 'K12Subject'
      : selectedDepartment === 'College'
        ? 'CollegeSubject'
        : selectedDepartment ===
            'Technical Education and Skills Development Authority (TESDA)'
          ? 'TESDACourse'
          : null;

    const updatedData = {
      ...subjectAssignment,
      section: section._id,
      subject_type: subject_type,
    };

    if (!updatedData?.subject_course?._id) {
      toast.error('Please Select a Subject');
      return;
    }
    if (!updatedData?.instructor?._id) {
      toast.error('Please Select a Instructor');
      return;
    }

    if (isEditingSubjectAssignment) {
      dispatch(updateSubjectAssignment(updatedData));
      return;
    }
    dispatch(createSubjectAssignment(updatedData));
  };

  const renderSubjects = () => {
    if (selectedDepartment === 'Senior High School') {
      return k12Subjects
        .filter(
          (subject) =>
            section?.level?._id === subject?.level?._id &&
            subject?.remarks === 'Active'
        )
        .map((subject) => (
          <MenuItem key={subject._id} value={subject._id}>
            {subject.subject_name}
          </MenuItem>
        ));
    } else if (selectedDepartment === 'College') {
      return collegeSubjects
        .filter((course) => section?.program?._id === course?.program?._id)
        .map((course) => (
          <MenuItem key={course._id} value={course._id}>
            {course.course_name}
          </MenuItem>
        ));
    } else if (selectedDepartment === 'TESDA') {
      return tesdaCourses
        .filter(
          (course) =>
            section?.program?._id === course?.program?._id &&
            course?.remarks === 'Active'
        )
        .map((course) => (
          <MenuItem key={course._id} value={course._id}>
            {course.course_name}
          </MenuItem>
        ));
    } else if (k12Departments.indexOf(selectedDepartment) !== -1) {
      return k12Subjects
        .filter(
          (subject) =>
            section?.level?._id === subject?.level?._id &&
            subject?.remarks === 'Active'
        )
        .map((subject) => (
          <MenuItem key={subject._id} value={subject._id}>
            {subject.subject_name}
          </MenuItem>
        ));
    } else {
      return <MenuItem value="">None</MenuItem>;
    }
  };

  const handleClose = () => {
    isAddingSubjectAssignment
      ? dispatch(toggleAddSubjectAssignment())
      : dispatch(toggleEditSubjectAssignment());
    dispatch(clearSubjectAssignment());
  };

  return (
    <Dialog
      fullWidth
      open={isAddingSubjectAssignment || isEditingSubjectAssignment}
      onClose={handleClose}
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" color="secondary">
              {isAddingSubjectAssignment ? 'Add Subject' : 'Edit Subject'}
            </Typography>
          </Grid>
          <Grid item xs={12} my={2}>
            <Alert severity="info">
              Please ensure that the subjects for this level exist or{' '}
              <LinkComponent to="/academics/subjects">
                {' '}
                Go to Subjects
              </LinkComponent>
            </Alert>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="subject-id">Subject</InputLabel>
              <Select
                labelId="subject-id"
                id="subject_course"
                name="subject_course"
                value={subjectAssignment?.subject_course?._id || ''}
                onChange={handleInput}
                label="Subject"
              >
                {renderSubjects()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="teacher-id">Instructor</InputLabel>
              <Select
                labelId="teacher-id"
                id="teacher_id"
                value={subjectAssignment?.instructor?._id || ''}
                name="instructor"
                onChange={handleInput}
                label="Instructor"
              >
                {instructors ? (
                  instructors.map((instructor) => (
                    <MenuItem key={instructor._id} value={instructor._id}>
                      {instructor?.first_name} {instructor?.last_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingSubjectAssignment ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubjectAssignmentModal;
