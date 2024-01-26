import { useDispatch, useSelector } from 'react-redux';

import {
  Divider,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';

const LearningModality = () => {
  const dispatch = useDispatch();

  const { student_report } = useSelector((state) => state.academics);

  const modality = [
    { modality: 'ODL', description: 'Online Distance Learning' },
    { modality: 'MDL', description: 'Modular Distance Learning' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={300}>
                <Typography variant="h4">Learning Modality</Typography>
              </TableCell>
              <TableCell>1st</TableCell>
              <TableCell>2nd</TableCell>
              <TableCell>3rd</TableCell>
              <TableCell>4th</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              {[
                'first_period',
                'second_period',
                'third_period',
                'fourth_period',
              ].map((period, periodIndex) => (
                <TableCell key={periodIndex}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <ToggleButtonGroup
                        exclusive
                        color="secondary"
                        value={student_report?.modality?.[period] || ''}
                        onChange={(e) => {
                          dispatch(
                            setStudentReport({
                              ...student_report,
                              modality: {
                                ...student_report.modality,
                                [period]: e.target.value,
                              },
                            })
                          );
                        }}
                      >
                        {modality.map((item, index) => (
                          <ToggleButton key={index} value={item.modality}>
                            {item.modality}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </FormControl>
                  </Grid>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid container item xs={12} spacing={2} m={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">
            <Typography textTransform="uppercase">Legends</Typography>
          </Divider>
        </Grid>
        {modality.map((item, index) => (
          <Grid item key={index} xs={6}>
            <Typography variant="h5">{item.modality}</Typography>
            <Typography variant="caption">{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default LearningModality;
