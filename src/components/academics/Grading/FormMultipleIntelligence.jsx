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
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';
import { intelligences } from 'src/utils/helperFunctions';

const FormMultipleIntelligence = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );

  const legend = [
    { value: 'O', description: 'Outstanding' },
    { value: 'VS', description: 'Very Satisfactory' },
    { value: 'S', description: 'Satisfactory' },
  ];

  const handleChange = (e, intelligenceIndex, checklistIndex, period) => {
    const { value } = e.target;

    // Make sure intelligences and checklist arrays are defined
    if (
      !student_report.intelligences ||
      !student_report.intelligences[intelligenceIndex] ||
      !student_report.intelligences[intelligenceIndex].checklist
    ) {
      return; // handle the error or return early
    }

    const updatedIntelligences = [...student_report.intelligences];
    const updatedChecklist = [
      ...updatedIntelligences[intelligenceIndex].checklist,
    ];

    // Make sure the checklist item is defined
    if (!updatedChecklist[checklistIndex]) {
      return; // handle the error or return early
    }

    // Find the checklist item and update the value for the specific period
    const updatedItem = {
      ...updatedChecklist[checklistIndex],
      [period]: value,
    };
    updatedChecklist[checklistIndex] = updatedItem;

    // Update the intelligences array with the updated checklist
    updatedIntelligences[intelligenceIndex] = {
      ...updatedIntelligences[intelligenceIndex],
      checklist: updatedChecklist,
    };

    dispatch(
      setStudentReport({
        ...student_report,
        intelligences: updatedIntelligences,
      })
    );
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={500}>
                  <Typography variant="h4">Multiple Intelligence</Typography>
                </TableCell>
                <TableCell width={100}>1st</TableCell>
                <TableCell width={100}>2nd</TableCell>
                <TableCell width={100}>3rd</TableCell>
                <TableCell width={100}>4th</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {intelligences.map((intelligence, intelligenceIndex) => (
                <Fragment key={intelligenceIndex}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">
                        {intelligence.intelligence}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={5}></TableCell>
                  </TableRow>
                  {intelligence.checklist.map(
                    (checklistItem, checklistIndex) => (
                      <TableRow key={checklistIndex}>
                        <TableCell width={300}>
                          {checklistItem.description}
                        </TableCell>
                        {[
                          'first_period',
                          'second_period',
                          'third_period',
                          'fourth_period',
                        ].map((period, periodIndex) => (
                          <TableCell key={periodIndex}>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  id={`${intelligence.intelligence}_${checklistIndex}_${period}`}
                                  name={checklistItem.intelligence}
                                  value={
                                    student_report?.intelligences?.[
                                      intelligenceIndex
                                    ]?.checklist?.[checklistIndex]?.[period] ||
                                    ''
                                  }
                                  onChange={(e) => {
                                    handleChange(
                                      e,
                                      intelligenceIndex,
                                      checklistIndex,
                                      period
                                    );
                                  }}
                                  disabled={
                                    (student_report?.[period]?.status ===
                                      'Submitted' &&
                                      !userProfile?.isVerifier &&
                                      !userProfile.admin_designation_toggle) ||
                                    (student_report?.[period]?.status ===
                                      'Verified' &&
                                      !isEditingGrade)
                                  }
                                >
                                  <MenuItem value="">None</MenuItem>
                                  {legend.map((legendItem, legendIndex) => (
                                    <MenuItem
                                      key={legendIndex}
                                      value={legendItem.value}
                                    >
                                      {legendItem.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
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
    </Fragment>
  );
};

export default FormMultipleIntelligence;
