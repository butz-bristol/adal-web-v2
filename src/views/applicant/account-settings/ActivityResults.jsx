import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const InterviewResults = () => {
  const {
    applicantProfile,
  } = useSelector((state) => state.applicants);

  return (
    <Grid container p={1}>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ textTransform: 'capitalize' }}>Examination</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_entrance_exam_date ? DateTime.fromISO(applicantProfile.student_entrance_exam_date).toFormat('dd LLL yyyy') : 'N/A'}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_entrance_exam_status ? applicantProfile.student_entrance_exam_status : ''}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_entrance_exam_score ? applicantProfile.student_entrance_exam_score : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textTransform: 'capitalize' }}>Interview</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_interview_date ? DateTime.fromISO(applicantProfile.student_interview_date).toFormat('dd LLL yyyy') : 'N/A'}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_interview_status ? applicantProfile.student_interview_status : ''}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{applicantProfile.student_interview_notes ? applicantProfile.student_interview_notes : ''}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
    </Grid >
  );
};

export default InterviewResults;
