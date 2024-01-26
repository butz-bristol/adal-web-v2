import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Grid, Typography } from "@mui/material";
import {
    IconCalendarBolt,
    IconCalendarCheck,
    IconCertificate,
    IconReportAnalytics,
    IconSchool
} from '@tabler/icons-react';

const AcademicRecords = () => {

    const { studentProfile: { student_department, student_college_track, student_yearlevel, student_program, student_entrance_exam_score, student_entrance_exam_status, student_entrance_exam_date, student_interview_status, student_interview_date } } = useSelector((state) => state.admissions);

    return (
        <Grid container spacing={2}>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs sx={{ mt: 1 }}>
                    <Typography variant="h3">Academic Records</Typography>
                </Grid>
            </Grid>
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
            <Grid container item alignItems="center" spacing={2}>
                <Grid item>
                    <IconCertificate />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_program?.program_name}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        {student_yearlevel?.year_level_name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item xs sx={{ mt: 1 }}>
                    <Typography variant="h3">Activities</Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item>
                    <IconCalendarBolt />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">

                        {student_entrance_exam_date ? DateTime.fromISO(student_entrance_exam_date).toFormat("LLL dd, yyyy HH:mm a") : 'No Exam Date yet'}

                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Date of Entrance Exam
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item>
                    <IconReportAnalytics />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_entrance_exam_score ? 'Your score is ' + student_entrance_exam_score : 'No Score yet'}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Entrance Exam Score
                    </Typography>
                </Grid>
                <Grid item alignContent="flex-start" >
                    <Typography textTransform="capitalize" variant="caption">
                        {student_entrance_exam_status ? 'Status: ' + student_entrance_exam_status : 'Status: Pending'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item>
                    <IconCalendarCheck />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">

                        {student_entrance_exam_date ? DateTime.fromISO(student_interview_date).toFormat("LLL dd, yyyy HH:mm a") : 'No Interview Date yet'}

                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Date of Interview
                    </Typography>

                </Grid>
                <Grid item>
                    <Typography textTransform="capitalize" variant="caption">
                        {'Status: ' + student_interview_status}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AcademicRecords;