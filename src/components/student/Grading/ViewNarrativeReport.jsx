import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

const ViewNarrativeReport = () => {
  const { student_report } = useSelector((state) => state.students);

  const period = [
    { label: '1st Quarter', period: 'first_period' },
    { label: '2nd Quarter', period: 'second_period' },
    { label: '3rd Quarter', period: 'third_period' },
    { label: '4th Quarter', period: 'fourth_period' }
  ];

  return (
    <Grid container component={Paper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Narrative Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {period.map((item, index) => (
              <TableRow key={index}>
                <TableCell width={200}>{item.label}</TableCell>
                <TableCell>{student_report?.narrative_report?.[item.period] || 'Not Available'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ViewNarrativeReport;
