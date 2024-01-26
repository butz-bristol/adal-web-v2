import { useTheme } from '@emotion/react';
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';
import { values } from 'src/utils/helperFunctions';

const FormStudentBehavior = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );

  const legend = [
    { value: 'AO', description: 'Always Observed' },
    { value: 'SO', description: 'Sometimes Observed' },
    { value: 'RO', description: 'Rarely Observed' },
    { value: 'NO', description: 'Not Observed' },
  ];

  const behaviors = ['AO', 'SO', 'RO', 'NO'];

  const handleChange = (e, period) => {
    const { name, value } = e.target;

    // Find the index of the value being changed
    const index = values.findIndex((item) => item.value === name);

    // Update the behaviors array with the new value for the specified period
    const updatedBecValues = [...student_report.behaviors];
    updatedBecValues[index] = {
      value: name,
      description: values[index].description,
      ...updatedBecValues[index],
      [period]: value,
    };

    // Update the student_report
    dispatch(
      setStudentReport({ ...student_report, behaviors: updatedBecValues })
    );
  };

  return (
    <Fragment>
      <Grid container spacing={2} sx={{ mb: 2 }}>
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
                  {[
                    'first_period',
                    'second_period',
                    'third_period',
                    'fourth_period',
                  ].map((period, periodIndex) => (
                    <TableCell key={periodIndex}>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          id={`${item.value}_${period}`} // Use a unique id for each Select element
                          label="BEC Values"
                          name={item.value}
                          value={
                            student_report?.behaviors?.[index]?.[period] || ''
                          }
                          onChange={(e) => {
                            handleChange(e, period);
                          }}
                          disabled={
                            (student_report?.[period]?.status === 'Submitted' &&
                              !userProfile?.isVerifier &&
                              !userProfile.admin_designation_toggle) ||
                            (student_report?.[period]?.status === 'Verified' &&
                              !isEditingGrade)
                          }
                        >
                          <MenuItem value="">None</MenuItem>
                          {behaviors.map((behavior, behaviorIndex) => (
                            <MenuItem key={behaviorIndex} value={behavior}>
                              {behavior}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Stack>
        <Card>
          <CardContent>
            <Grid
              container
              sx={{ backgroundColor: theme.palette.primary.light }}
              p={2}
              borderRadius={2}
            >
              <Grid item xs={12}>
                <Typography variant="h5">LEGENDS:</Typography>
              </Grid>
              {legend.map((item, index) => (
                <Grid item key={index} xs={3}>
                  <Typography variant="h5">{item.value}</Typography>
                  <Typography variant="caption">{item.description}</Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Fragment>
  );
};

export default FormStudentBehavior;
