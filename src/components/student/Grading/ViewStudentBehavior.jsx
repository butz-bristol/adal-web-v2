import { useSelector } from 'react-redux';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ViewStudentBehavior = () => {
  const { student_report } = useSelector((state) => state.students);

  const values = [
    { value: 'Love', description: 'Demonstrates genuine love for others' },
    { value: 'Obedience', description: 'Is a model of obedience' },
    { value: 'Respect', description: 'Is respectable and knows how to respect' },
    { value: 'Humility', description: 'Always puts the interest of others above self' },
    { value: 'Honesty', description: 'Values integrity and truth' },
    { value: 'Commitment', description: 'Is responsible and diligent in accomplishing his/her duties on time' },
    { value: 'Servant Leadership', description: 'Is a servant leader who leads by serving others out of love' }
  ];

  const legend = [
    { value: 'AO', description: 'Always Observed' },
    { value: 'SO', description: 'Sometimes Observed' },
    { value: 'RO', description: 'Rarely Observed' },
    { value: 'NO', description: 'Not Observed' }
  ];

  return (
    <Grid container component={Paper}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h4">BEC Values</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h4">Behavior Statements</Typography>
              </TableCell>
              <TableCell width={100}>1st</TableCell>
              <TableCell width={100}>2nd</TableCell>
              <TableCell width={100}>3rd</TableCell>
              <TableCell width={100}>4th</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.description}</TableCell>
                {['first_period', 'second_period', 'third_period', 'fourth_period'].map((period, periodIndex) => (
                  <TableCell key={periodIndex}>{student_report?.behaviors?.[index]?.[period] || ''}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container item xs={12} spacing={2} m={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Legends:</Typography>
        </Grid>
        {legend.map((item, index) => (
          <Grid item key={index} xs={3}>
            <Typography variant="h5">{item.value}</Typography>
            <Typography variant="caption">{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ViewStudentBehavior;
