import {
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';

const FormStudentAttendance = () => {
  const dispatch = useDispatch();
  const { student_report, isEditingGrade, userProfile } = useSelector(
    (state) => state.academics
  );

  const attendance = [
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
  ];
  const days = [
    { label: 'No. of School Days', value: 'school_days' },
    { label: 'No. of School Days Present', value: 'present' },
    { label: 'No. of School Days Absent', value: 'absent' },
  ];
  const handleInput = (e, period) => {
    const { name, value } = e.target;

    // Find the index of the value being changed
    const index = attendance.findIndex((item) => item === name);

    // Update the attendance array with the new value for the specified period
    const updatedAttendance = [...student_report?.attendance];
    updatedAttendance[index] = {
      ...updatedAttendance[index],
      [period]: parseInt(value, 10) || 0,
    };

    // Update the student_report
    dispatch(
      setStudentReport({ ...student_report, attendance: updatedAttendance })
    );
  };

  const calculateTotal = (totalDays) => {
    return student_report?.attendance?.reduce((total, month) => {
      const value = month?.[totalDays] ?? 0; // Use 0 if the property is null or undefined
      return total + value;
    }, 0);
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {attendance.map((month, monthIndex) => (
                <TableCell key={monthIndex} width={100} align="center">
                  {month}
                </TableCell>
              ))}
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((item, index) => (
              <TableRow key={index} align="center">
                <TableCell width={100}>{item.label}</TableCell>
                {attendance.map((month, monthIndex) => {
                  const isDisabled =
                    (monthIndex >= 0 &&
                      monthIndex <= 2 &&
                      student_report?.first_period?.status === 'Submitted' &&
                      !userProfile?.isVerifier &&
                      !userProfile.admin_designation_toggle) ||
                    (monthIndex >= 0 &&
                      monthIndex <= 2 &&
                      student_report?.first_period?.status === 'Verified' &&
                      !isEditingGrade) ||
                    (monthIndex >= 3 &&
                      monthIndex <= 4 &&
                      student_report?.second_period?.status === 'Submitted' &&
                      !userProfile?.isVerifier &&
                      !userProfile.admin_designation_toggle) ||
                    (monthIndex >= 3 &&
                      monthIndex <= 4 &&
                      student_report?.second_period?.status === 'Verified' &&
                      !isEditingGrade) ||
                    (monthIndex >= 5 &&
                      monthIndex <= 8 &&
                      student_report?.third_period?.status === 'Submitted' &&
                      !userProfile?.isVerifier &&
                      !userProfile.admin_designation_toggle) ||
                    (monthIndex >= 5 &&
                      monthIndex <= 8 &&
                      student_report?.third_period?.status === 'Verified' &&
                      !isEditingGrade) ||
                    (monthIndex >= 9 &&
                      monthIndex <= 10 &&
                      student_report?.fourth_period?.status === 'Submitted' &&
                      !userProfile?.isVerifier &&
                      !userProfile.admin_designation_toggle) ||
                    (monthIndex >= 9 &&
                      monthIndex <= 10 &&
                      student_report?.fourth_period?.status === 'Verified' &&
                      !isEditingGrade);

                  return (
                    <TableCell key={monthIndex} sx={{ m: 0, p: 0.5 }}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          type="number"
                          id={month + '_' + monthIndex + '_' + index}
                          name={month}
                          value={
                            student_report?.attendance?.[monthIndex]?.[
                              item.value
                            ] || 0
                          }
                          onChange={(e) => {
                            handleInput(e, item.value, monthIndex);
                          }}
                          disabled={isDisabled}
                        />
                      </FormControl>
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  {calculateTotal(item?.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default FormStudentAttendance;
