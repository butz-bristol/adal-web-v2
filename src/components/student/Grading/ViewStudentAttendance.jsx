import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

const ViewStudentAttendance = () => {
  const { student_report } = useSelector((state) => state.students);

  const attendance = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const days = [
    { label: 'No. of School Days', value: 'school_days' },
    { label: 'No. of School Days Present', value: 'present' },
    { label: 'No. of School Days Absent', value: 'absent' }
  ];

  const calculateTotal = (totalDays) => {
    return student_report?.attendance?.reduce((total, month) => {
      const value = month?.[totalDays] ?? 0; // Use 0 if the property is null or undefined
      return total + value;
    }, 0);
  };

  return (
    <Grid container component={Paper}>
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
                <TableCell>{item.label}</TableCell>
                {attendance.map((month, monthIndex) => (
                  <TableCell key={monthIndex} align="center">
                    {student_report?.attendance?.[monthIndex]?.[item.value] || 0}
                  </TableCell>
                ))}
                <TableCell align="center">{calculateTotal(item?.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default ViewStudentAttendance;
