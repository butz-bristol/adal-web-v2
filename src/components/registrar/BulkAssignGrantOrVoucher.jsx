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
import styles from 'src/components/modalBoxStyle';
import { handleChange as handleAcademicsChange } from 'src/features/academicFeatures/academicSlice';
import { updateBulkLedger } from 'src/features/cashierFeatures/cashierSlice';
import {
  bulkCreateStudentGrant,
  clearDynamicData,
  handleChange,
} from 'src/features/registrarFeatures/registrarSlice';

const BulkAssignGrantOrVoucher = ({ open, close }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    students,
    date_issued,
    grantNumberFormats,
    grant_number_format,
    isSavingStudentGrantsAndVouchers,
    grantAndVoucher,
    voucher_status,
    departments,
    department_id,
    college_tracks,
    college_track_id,
    year_levels,
    year_level_id,
    academic_years,
    academic_year_id,
    semesters,
    semester_id,
  } = useSelector((state) => state.registrar);
  const { programs, program_id } = useSelector((state) => state.academics);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const selectedDepartment = departments?.find(
    (department) => department._id === department_id
  );

  const isCollegeDepartment = selectedDepartment?.department_name === 'College';
  const isTESDA =
    selectedDepartment?.department_name ===
    'Technical Education and Skills Development Authority (TESDA)';
  const isSeniorHighTrack =
    selectedDepartment?.department_name === 'Senior High School';

  const clearData = () => {
    dispatch(
      clearDynamicData({
        grant_number_format,
        date_issued,
        year_level_id,
        department_id,
        college_track_id,
      })
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
          student.student_college_track?._id === college_track_id &&
          student.student_program?._id === program_id &&
          student.student_yearlevel?._id === year_level_id
        );
      } else {
        return student.student_yearlevel?._id === year_level_id;
      }
    });

  const handleAssignGrantOrVoucher = (e) => {
    e.preventDefault();

    if (!grant_number_format || !date_issued || filteredStudents.length === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(
      bulkCreateStudentGrant({
        students: filteredStudents,
        grantNumberFormat: grant_number_format,
        date_issued,
        grant_or_voucher: id,
      })
    );

    // Update Student Ledgers
    filteredStudents.forEach((student) => {
      const student_id = student._id;

      const data = {
        student_id,
        student_department: student.student_department?.department_name,
        academic_year: academic_year_id,
      };

      if (student.student_department?.department_name !== 'K-12') {
        data.semester = semester_id;
      }

      dispatch(
        updateBulkLedger({
          ...data,
          amount: grantAndVoucher.amount,
          payment: {
            student: student_id,
            academic_year: academic_year_id,
            description: `${grantAndVoucher?.name.toUpperCase()}`,
            payment_amount: grantAndVoucher?.amount,
            payment_class: grantAndVoucher?.type,
            payment_date: date_issued,
            payment_type: 'Credit',
          },
        })
      );
    });

    // Deduct Amount from Payment Scheme

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
          Bulk Assign Grant or Voucher
        </Typography>

        <form>
          <Grid container spacing={2} mt={2}>
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-academic-year">Academic Year</InputLabel>
                <Select
                  label="Academic Year"
                  labelId="select-academic-year"
                  value={academic_year_id}
                  name="academic_year_id"
                  onChange={handleInputChange}
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
                <InputLabel id="college_track_id">College/Track</InputLabel>
                <Select
                  labelId="college_track_id"
                  id="college_track_id"
                  value={college_track_id}
                  name="college_track_id"
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

            <>
              {isCollegeDepartment || isSeniorHighTrack || isTESDA ? (
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
                            name: e.target.name,
                            value: e.target.value,
                          })
                        )
                      }
                      label="Program"
                    >
                      {programs
                        ?.filter(
                          (program) =>
                            program?.college_track?._id === college_track_id
                        )
                        .map((program) => (
                          <MenuItem key={program._id} value={program._id}>
                            {program.program_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
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
                    .map((level) => (
                      <MenuItem key={level._id} value={level._id}>
                        {level.year_level_name}
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
                  id="date_issued"
                  label="Issue Date"
                  type="date"
                  name="date_issued"
                  value={date_issued}
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
                <InputLabel id="grant-number-format">
                  Grant Number Format
                </InputLabel>
                <Select
                  id="grant-number-format"
                  label="Grant Number Format"
                  name="grant_number_format"
                  value={grant_number_format}
                  onChange={handleInputChange}
                >
                  {grantNumberFormats.map((format) => (
                    <MenuItem key={format._id} value={format.format}>
                      {format.format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="grant-or-voucher-status">Status</InputLabel>
                <Select
                  id="grant-or-voucher-status"
                  label="Status"
                  name="voucher_status"
                  value={voucher_status}
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
                  label="Grant/Voucher Name"
                  id="grant-or-voucher-name"
                  value={grantAndVoucher?.name}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Grant/Voucher Amount"
                  id="grant-or-voucher-amount"
                  value={grantAndVoucher?.amount}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
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

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAssignGrantOrVoucher}
                disabled={
                  isSavingStudentGrantsAndVouchers ||
                  grant_number_format === '' ||
                  date_issued === '' ||
                  filteredStudents.length === 0
                }
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
export default BulkAssignGrantOrVoucher;
