import { FormControl, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';

const FormNarrativeReport = () => {
  const dispatch = useDispatch();
  const { student_report, userProfile, isEditingGrade } = useSelector(
    (state) => state.academics
  );

  const period = [
    { label: '1st Quarter', period: 'first_period' },
    { label: '2nd Quarter', period: 'second_period' },
    { label: '3rd Quarter', period: 'third_period' },
    { label: '4th Quarter', period: 'fourth_period' },
  ];

  return (
    <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Narrative Report</Typography>
      </Grid>
      {period.map((item, index) => (
        <Grid item xs={12} key={index}>
          <FormControl fullWidth>
            <TextField
              size="small"
              variant="outlined"
              required
              label={item.label}
              name={item.period}
              value={student_report?.narrative_report?.[item.period] || ''}
              disabled={
                (student_report?.[item.period]?.status === 'Submitted' &&
                  !userProfile?.isVerifier &&
                  !userProfile.admin_designation_toggle) ||
                (student_report?.[item.period]?.status === 'Verified' &&
                  !isEditingGrade)
              }
              onChange={(e) => {
                dispatch(
                  setStudentReport({
                    ...student_report,
                    narrative_report: {
                      ...student_report.narrative_report,
                      [item.period]: e.target.value,
                    },
                  })
                );
              }}
              rows={2}
              multiline
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};

export default FormNarrativeReport;
