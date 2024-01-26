import { Divider, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import { IconSchool } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCollegeSubject,
  toggleViewSubject,
} from 'src/features/academicFeatures/academicSlice';

const ViewCollegeSubject = () => {
  const dispatch = useDispatch();

  const {
    isViewingSubject,
    subject_name,
    subject_description,
    college_or_track,
    year_level,
    subject_code,
    subject_unit,
    subject_type,
    semester,
    program_id,
    pre_requisites,
  } = useSelector((state) => state.academics);

  return (
    <Modal
      open={isViewingSubject}
      onClose={() => {
        dispatch(toggleViewSubject());
        dispatch(clearCollegeSubject());
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <IconSchool color="#9e1313" />

          <Typography variant="h3">College Subject</Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Subject Code
            </Typography>

            <Typography variant="h5" gutterBottom>
              {subject_code}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Subject Name
            </Typography>

            <Typography variant="h5" gutterBottom>
              {subject_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              College
            </Typography>

            <Typography variant="h5" gutterBottom>
              {college_or_track}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Program
            </Typography>

            <Typography variant="h5" gutterBottom>
              {program_id}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Year Level
            </Typography>

            <Typography variant="h5" gutterBottom>
              {year_level}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Semester
            </Typography>

            <Typography variant="h5" gutterBottom>
              {semester}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Subject Type
            </Typography>

            <Typography variant="h5" gutterBottom>
              {subject_type}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Units
            </Typography>

            <Typography variant="h5" gutterBottom>
              {subject_unit}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Prerequisites
            </Typography>

            <Typography variant="h5" gutterBottom>
              {pre_requisites?.length > 0
                ? pre_requisites.map((prerequisite) => prerequisite).join(', ')
                : 'None'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Subject Description
            </Typography>

            <Typography variant="h5" gutterBottom>
              {subject_description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ViewCollegeSubject;
