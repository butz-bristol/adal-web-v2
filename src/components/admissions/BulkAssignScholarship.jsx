import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import { handleChange as handleAcademicsChange } from 'src/features/academicFeatures/academicSlice';
import {
  bulkCreateStudentScholarship,
  clearDynamicData,
  handleChange,
} from 'src/features/admissionsFeatures/admissionsSlice';
import { updateBulkLedger } from 'src/features/cashierFeatures/cashierSlice';
import {
  clearDynamicData as clearRegistrarState,
  handleChange as handleRegistrarChange,
} from 'src/features/registrarFeatures/registrarSlice';

const BulkAssignScholarship = ({ open, close }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    scholarship_id,
    scholarship_status,
    scholarship_name,
    date_assigned,
    scholarship,
    students,
    scholarship_description,
    department_id,
    college_or_track,
    year_level_id,
  } = useSelector((state) => state.admissions);
  const {
    departments,
    college_tracks,
    year_levels,
    academic_year_id,
    academic_years,
    semesters,
    semester_id,
    college_track_id,
  } = useSelector((state) => state.registrar);
  const { programs, program_id } = useSelector((state) => state.academics);

  const selectedDepartment = departments?.find(
    (department) => department._id === department_id
  );

  const isCollegeDepartment = selectedDepartment?.department_name === 'College';
  const isTESDA =
    selectedDepartment?.department_name ===
    'Technical Education and Skills Development Authority (TESDA)';
  const isSeniorHighTrack =
    selectedDepartment?.department_name === 'Senior High School';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const clearData = () => {
    dispatch(
      clearDynamicData({
        scholarship_name,
        date_assigned,
        scholarship_status,
        scholarship_description,
        scholarship_id,
        department_id,
        college_or_track,
        year_level_id,
        program_id,
      })
    );

    dispatch(
      clearRegistrarState({ college_track_id, semester_id, academic_year_id })
    );
  };

  const filteredStudents = students
    .filter((student) => student?.student_registration_status === 'registered')
    .filter((student) => {
      if (isCollegeDepartment) {
        return (
          student.student_department?._id === department_id &&
          student.student_program?._id === program_id &&
          student.student_yearlevel?._id === year_level_id
        );
      } else if (isSeniorHighTrack) {
        return (
          student.student_college_track?._id === college_or_track &&
          student.student_program?._id === program_id &&
          student.student_yearlevel?._id === year_level_id
        );
      } else {
        return student.student_yearlevel?._id === year_level_id;
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(date_assigned && scholarship_status)) {
      return toast.error('Please fill in all fields!');
    }

    dispatch(
      bulkCreateStudentScholarship({
        students: filteredStudents,
        scholarship_id: id,
        description: scholarship_description,
      })
    );

    filteredStudents.forEach((student) => {
      const student_id = student._id;

      const data = {
        student_id,
        student_department: student.student_department?.department_name,
        academic_year: academic_year_id,
      };

      if (
        student.student_department?.department_name === 'College' ||
        student.student_department?.department_name ===
          'Technical Education and Skills Development Authority (TESDA)'
      ) {
        data.semester = semester_id;
      }

      dispatch(
        updateBulkLedger({
          ...data,
          amount: scholarship.scholarship_amount,
          payment: {
            student: student_id,
            academic_year: academic_year_id,
            description: `${scholarship?.scholarship_name.toUpperCase()}`,
            payment_amount: scholarship?.scholarship_amount,
            payment_class: 'Scholarship',
            payment_date: date_assigned,
            payment_type: 'Credit',
          },
        })
      );
    });

    clearData();
    close();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
        clearData();
      }}
    >
      <Paper
        sx={{
          ...styles,
        }}
      >
        <Typography variant="h4" component="h4" align="center">
          Bulk Assign Scholarship
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-academic-year">Academic Year</InputLabel>
                <Select
                  label="Academic Year"
                  labelId="select-academic-year"
                  value={academic_year_id}
                  name="academic_year_id"
                  onChange={(e) =>
                    dispatch(
                      handleRegistrarChange({
                        name: 'academic_year_id',
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {academic_years.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="department-id">Department</InputLabel>
                <Select
                  labelId="department-id"
                  id="department_id"
                  value={department_id}
                  name="department_id"
                  onChange={handleInputChange}
                  label="Department"
                >
                  {departments
                    .filter((department) => department?.remarks === 'Active')
                    .map((department) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department?.department_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <>
              {isCollegeDepartment || isSeniorHighTrack || isTESDA ? (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="college_or_track">
                        College/Track
                      </InputLabel>
                      <Select
                        labelId="college_or_track"
                        id="college_or_track"
                        value={college_or_track}
                        name="college_or_track"
                        onChange={handleInputChange}
                        label="College/Track"
                      >
                        {college_tracks
                          ?.filter(
                            (college_track) =>
                              college_track?.department?._id === department_id
                          )
                          .map((college_track) => (
                            <MenuItem
                              key={college_track._id}
                              value={college_track._id}
                            >
                              {college_track.college_track_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="program_id">Program</InputLabel>
                      <Select
                        labelId="program_id"
                        id="program_id"
                        value={program_id}
                        name="program_id"
                        onChange={(e) =>
                          dispatch(
                            handleAcademicsChange({
                              name: 'program_id',
                              value: e.target.value,
                            })
                          )
                        }
                        label="Program"
                      >
                        {programs
                          ?.filter(
                            (program) =>
                              program?.college_track?._id === college_or_track
                          )
                          .map((program) => (
                            <MenuItem key={program._id} value={program._id}>
                              {program.program_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}
            </>

            <>
              {(isCollegeDepartment || isTESDA) && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-semester">Semester</InputLabel>
                    <Select
                      label="Semester"
                      labelId="select-semester"
                      value={semester_id || ''}
                      name="semester_id"
                      onChange={handleInputChange}
                    >
                      {semesters.map((semester) => (
                        <MenuItem key={semester._id} value={semester._id}>
                          {semester.semester_term}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="grade-level-label">Grade/Year Level</InputLabel>
                <Select
                  labelId="grade-level-label"
                  id="level"
                  name="year_level_id"
                  value={year_level_id}
                  label="Grade/Year Level"
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  {year_levels
                    .filter((level) => level?.department?._id === department_id)
                    .map((track) => (
                      <MenuItem key={track._id} value={track._id}>
                        {track.year_level_name}
                      </MenuItem>
                    ))
                    .sort(
                      (a, b) =>
                        (a?.props?.children?.toLowerCase() >
                          b?.props?.children?.toLowerCase() &&
                          1) ||
                        -1
                    )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  id="date_assigned"
                  label="Issue Date"
                  type="date"
                  name="date_assigned"
                  value={date_assigned}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="scholarship-status">Status</InputLabel>
                <Select
                  id="scholarship-status"
                  label="Status"
                  name="scholarship_status"
                  value={scholarship_status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Claimed">Claimed</MenuItem>
                  <MenuItem value="Forfeited">Forfeited</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Name"
                  id="scholarship-name"
                  value={scholarship?.scholarship_name}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Amount"
                  id="scholarship-amount"
                  value={scholarship?.scholarship_amount}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="No. of Students"
                  id="no-of-students"
                  value={filteredStudents?.length}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Scholarship Requirements"
                  multiline
                  rows={3}
                  id="scholarship_description"
                  value={scholarship_description}
                  name="scholarship_description"
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleSubmit}
                disabled={date_assigned === '' || filteredStudents.length === 0}
              >
                Assign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};
export default BulkAssignScholarship;
