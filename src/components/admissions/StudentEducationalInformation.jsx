import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import {
  IconCalendarBolt,
  IconCalendarCheck,
  IconCertificate,
  IconDeviceAnalytics,
  IconEdit,
  IconId,
  IconReport,
  IconReportAnalytics,
  IconSchool
} from '@tabler/icons-react';

const EducationalInformation = () => {
  const {
    studentProfile: {
      student_number,
      student_department,
      student_college_track,
      student_program,
      student_yearlevel,
      student_registration_status,
      student_admissions_status,
      student_entrance_exam_date,
      student_entrance_exam_score,
      student_entrance_exam_status,
      student_interview_date,
      student_interview_status
    }
  } = useSelector((state) => state.admissions);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" color="secondary">
              Student Information
            </Typography>
          </Grid>
          {/* <Grid item>
                        <Tooltip title="Edit">
                            <IconButton color="secondary">
                                <IconEdit />
                            </IconButton>
                        </Tooltip>
                    </Grid> */}
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems="center" spacing={2}>
        <Grid item>
          <IconId />
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1" color="inherit">
            {student_number}
          </Typography>
          <Typography textTransform="capitalize" variant="caption">
            Student Number
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconSchool />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_department?.department_name}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              {student_college_track?.college_track_name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconCertificate />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_program ? student_program?.program_name : student_yearlevel?.year_level_name}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              {student_program ? student_yearlevel?.year_level_name : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconDeviceAnalytics />
          </Grid>
          <Grid item sm sx={{ textTransform: 'capitalize' }}>
            <Grid component="div">
              {student_admissions_status === 'pending' && <Chip size="small" label={student_admissions_status} color="primary" />}
              {student_admissions_status === 'eligible for exam' && <Chip size="small" label={student_admissions_status} color="primary" />}
              {student_admissions_status === 'eligible for interview' && (
                <Chip size="small" label={student_admissions_status} color="primary" />
              )}
              {student_admissions_status === 'admitted' && <Chip size="small" label={student_admissions_status} color="secondary" />}
            </Grid>
            <Typography textTransform="capitalize" variant="caption">
              Admissions Status
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconReport />
          </Grid>
          <Grid item sm sx={{ textTransform: 'capitalize' }}>
            <Grid component="div">
              {student_registration_status === 'eligible for registration' && (
                <Chip size="small" label={student_registration_status} color="primary" />
              )}
              {student_registration_status === 'registered' && <Chip size="small" label={student_registration_status} color="success" />}
            </Grid>
            <Typography textTransform="capitalize" variant="caption">
              Registration Status
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" color="secondary">
              Activities
            </Typography>
          </Grid>
          {/* <Grid item>
                        <Tooltip title="Edit">
                            <IconButton color="secondary">
                                <IconEdit />
                            </IconButton>
                        </Tooltip>
                    </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconCalendarBolt />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_entrance_exam_date ? DateTime.fromISO(student_entrance_exam_date).toFormat('LLL dd, yyyy HH:mm a') : 'No Exam Date'}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Date of Entrance Exam
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconReportAnalytics />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              Score: {student_entrance_exam_score ? 'Your score is ' + student_entrance_exam_score : 'None'}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Status: {student_entrance_exam_status ? student_entrance_exam_status : 'None'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item alignItems="center" spacing={2}>
          <Grid item>
            <IconCalendarCheck />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1" color="inherit">
              {student_entrance_exam_date ? DateTime.fromISO(student_interview_date).toFormat('LLL dd, yyyy HH:mm a') : 'None'}
            </Typography>
            <Typography textTransform="capitalize" variant="caption">
              Interview Status: {student_interview_status ? student_interview_status : 'None'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EducationalInformation;
