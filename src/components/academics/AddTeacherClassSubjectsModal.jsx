import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import {
  clearSubjectAssignment,
  createSubjectAssignment,
  setSubjectAssignment,
  toggleAddSubjectAssignment,
  toggleEditSubjectAssignment,
  updateSubjectAssignment,
} from 'src/features/academicFeatures/academicSlice';

import { k12Departments } from 'src/utils/helperFunctions';

const AddTeacherClassSubjectsModal = () => {
  const dispatch = useDispatch();

  const {
    isAddingSubjectAssignment,
    isEditingSubjectAssignment,
    subjectAssignment,
    instructors,
    k12Subjects,
    collegeSubjects,
    tesdaCourses,
    sections,
  } = useSelector((state) => state.academics);

  const user = useSelector((state) => state.users?.user) ?? null;

  const selectedDepartment = sections?.find(
    (section) => section?._id === subjectAssignment.section?._id
  )?.department?.department_name;
  const selectedLevelId = sections?.find(
    (section) => section?._id === subjectAssignment.section?._id
  )?.level?._id;
  const selectedProgramId = sections?.find(
    (section) => section?._id === subjectAssignment.section?._id
  )?.program?._id;

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

    let instructor = subjectAssignment.instructor || user.userId;

    const updatedData = {
      ...subjectAssignment,
      subject_type: subject_type,
      instructor: { _id: instructor },
    };

    if (!updatedData?.section?._id) {
      toast.error('Please Select a Section');
      return;
    }
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
            selectedLevelId === subject?.level?._id &&
            selectedProgramId === subject?.program?._id &&
            subject?.remarks === 'Active' &&
            subject?.isArchived === false
        )
        .map((subject) => (
          <MenuItem key={subject._id} value={subject._id}>
            {subject.subject_name}
          </MenuItem>
        ));
    } else if (selectedDepartment === 'College') {
      return collegeSubjects
        .filter((course) => selectedProgramId === course?.program?._id)
        .map((course) => (
          <MenuItem key={course._id} value={course._id}>
            {course.course_name}
          </MenuItem>
        ));
    } else if (
      selectedDepartment ===
      'Technical Education and Skills Development Authority (TESDA)'
    ) {
      return tesdaCourses
        .filter(
          (course) =>
            selectedProgramId === course?.program?._id &&
            course?.remarks === 'Active' &&
            subject?.isArchived === false
        )
        .map((course) => (
          <MenuItem key={course._id} value={course._id}>
            {course.course_name}
          </MenuItem>
        ));
    } else if (k12Departments.includes(selectedDepartment)) {
      return k12Subjects
        .filter((subject) => selectedLevelId === subject?.level?._id)
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
      <DialogTitle fontSize={18}>
        {isAddingSubjectAssignment ? 'Add Teaching Load' : 'Edit Teaching Load'}
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="select-section">Section</InputLabel>
                <Select
                  id="select-section"
                  label="Section"
                  name="section"
                  value={subjectAssignment?.section?._id || ''}
                  onChange={handleInput}
                >
                  {sections.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.section_name} - {section.level?.year_level_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
            {user.user_role !== 'teacher' && (
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
            )}
          </Grid>
        </form>
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

export default AddTeacherClassSubjectsModal;
