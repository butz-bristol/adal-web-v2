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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearDynamicData as clearAcademics,
  handleChange as handleAcademicsChange,
} from 'src/features/academicFeatures/academicSlice';
import { updateBulkLedger } from 'src/features/cashierFeatures/cashierSlice';
import {
  bulkCreateStudentInvoice,
  clearDynamicData as clearFinance,
  fetchOtherFee,
  handleChange,
} from 'src/features/financeFeatures/financeSlice';
import {
  clearDynamicData as clearRegistrar,
  handleChange as handleRegistrar,
} from 'src/features/registrarFeatures/registrarSlice';

const BulkAssignOtherFee = ({ open, handleClose, feeId }) => {
  const dispatch = useDispatch();
  const {
    isCreatingStudentInvoice,
    invoice_date,
    invoiceNumberFormats,
    invoice_number_format,
    otherFee,
  } = useSelector((state) => state.finance);
  const {
    departments,
    department_id,
    college_tracks,
    college_track_id,
    year_level_id,
    year_levels,
    students,
    academic_years,
    academic_year_id,
    semesters,
    semester_id,
  } = useSelector((state) => state.registrar);
  const { programs, program_id } = useSelector((state) => state.academics);

  const clearAllDynamicData = () => {
    dispatch(clearFinance({ invoice_date, invoice_number_format }));
    dispatch(
      clearRegistrar({ department_id, college_track_id, year_level_id })
    );
    dispatch(clearAcademics({ program_id }));
    handleClose();
  };

  const selectedDepartment = departments?.find(
    (department) => department._id === department_id
  )?.department_name;
  const selectedCollegeTrack = college_tracks?.find(
    (college_track) => college_track._id === college_track_id
  )?.college_track_name;

  const isCollegeDepartment = selectedDepartment === 'College';
  const isTESDA =
    selectedDepartment ===
    'Technical Education and Skills Development Authority (TESDA)';
  const isSeniorHighTrack = selectedCollegeTrack === 'Senior High School';

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

  const handleBulkAssignOtherFee = (e) => {
    e.preventDefault();

    if (filteredStudents.length === 0) {
      toast.error('No students found');
      return;
    }

    if (!invoice_date || !invoice_number_format) {
      toast.error('Please fill in all required fields');
      return;
    }

    dispatch(
      bulkCreateStudentInvoice({
        students: filteredStudents,
        otherFee: feeId,
        invoiceDate: invoice_date,
        invoiceNumberFormat: invoice_number_format,
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
          amount: otherFee.fee_amount,
          payments: {
            student: student_id,
            academic_year: academic_year_id,
            description: `${otherFee.other_fee.toUpperCase()}`,
            payment_amount: otherFee.fee_amount,
            payment_class: 'Invoice',
            payment_date: invoice_date,
            payment_type: 'Debit',
          },
        })
      );
    });

    clearAllDynamicData();
  };

  useEffect(() => {
    dispatch(fetchOtherFee(feeId));
  }, [dispatch, feeId]);

  return (
    <Modal
      open={open}
      onClose={() => {
        clearAllDynamicData();
      }}
      aria-labelledby="bulk-assign-other-fee-modal"
      aria-describedby="bulk-assign-other-fee-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom mb={2}>
          Bulk Assign Other Fee
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="academic_department">Department</InputLabel>
                <Select
                  labelId="academic_department"
                  id="academic_department"
                  value={department_id}
                  name="department_id"
                  onChange={(e) =>
                    dispatch(
                      handleRegistrar({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
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
                  onChange={(e) =>
                    dispatch(
                      handleRegistrar({
                        name: e.target.name,
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
                <InputLabel id="college_track_id">College Track</InputLabel>
                <Select
                  labelId="college_track_id"
                  id="college_track_id"
                  value={college_track_id}
                  name="college_track_id"
                  onChange={(e) =>
                    dispatch(
                      handleRegistrar({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  label="College Track"
                >
                  {college_tracks
                    .filter(
                      (college_track) =>
                        college_track.department._id === department_id
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
                      onChange={(e) =>
                        dispatch(
                          handleRegistrar({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        )
                      }
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
                  onChange={(e) =>
                    dispatch(
                      handleRegistrar({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
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
                  id="invoice_date"
                  label="Invoice Date"
                  type="date"
                  name="invoice_date"
                  value={invoice_date}
                  onChange={(e) =>
                    dispatch(
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="invoice_number_format">
                  Invoice Number Format
                </InputLabel>
                <Select
                  id="invoice_number_format"
                  label="Invoice Number Format"
                  name="invoice_number_format"
                  value={invoice_number_format}
                  onChange={(e) =>
                    dispatch(
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {invoiceNumberFormats.map((format) => (
                    <MenuItem key={format._id} value={format.format}>
                      {format.format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  label="Count"
                  id="student_count"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={filteredStudents?.length}
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} alignSelf="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleBulkAssignOtherFee}
                disabled={isCreatingStudentInvoice}
              >
                Bulk Assign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default BulkAssignOtherFee;
