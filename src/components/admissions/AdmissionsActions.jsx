import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  setStudent,
  toggleAdmissionStatusModal,
  toggleEntranceExamDateModal,
  toggleEntranceExamScoreModal,
  updateStudent,
} from 'src/features/admissionsFeatures/admissionsSlice';

import {
  IconCalendarBolt,
  IconDiscountCheck,
  IconReportAnalytics,
  IconReportSearch,
} from '@tabler/icons-react';

import AddEntranceExamDateModal from './AddEntranceExamDateModal';
import AddEntranceExamScoreModal from './AddEntranceExamScoreModal';
import EditAdmissionStatusModal from './EditAdmissionsStatusModal';

const AdmissionsActions = () => {
  const dispatch = useDispatch();
  const {
    studentProfile: {
      _id,
      student_yearlevel,
      student_admissions_status,
      student_entrance_exam_date,
      student_type,
    },
  } = useSelector((state) => state.admissions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === 'k12') {
      dispatch(
        updateStudent({
          _id,
          student_admissions_status: 'admitted',
          student_registration_status: 'eligible for registration',
        })
      );
      return;
    }
    dispatch(
      updateStudent({ _id, student_admissions_status: 'eligible for exam' })
    );
  };

  const handleEntranceExamModal = () => {
    dispatch(toggleEntranceExamDateModal());
    dispatch(setStudent({ _id }));
  };

  const handleEntranceScoreModal = () => {
    dispatch(toggleEntranceExamScoreModal());
    dispatch(setStudent({ _id }));
  };

  const handleAdmissionStatusModal = () => {
    dispatch(toggleAdmissionStatusModal());
    dispatch(setStudent({ _id }));
  };

  return (
    <>
      <AddEntranceExamScoreModal />
      <AddEntranceExamDateModal />
      <EditAdmissionStatusModal />
      {student_yearlevel?.year_level_name == 'Grade 7' ||
      student_yearlevel?.year_level_name == 'Grade 11' ||
      student_yearlevel?.year_level_name == '1st Year' ||
      student_type == 'Transferee' ? (
        <>
          {student_admissions_status === 'pending' && (
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                name="college_tesda"
                startIcon={<IconDiscountCheck />}
                onClick={handleSubmit}
              >
                Proceed to Exam
              </Button>
            </Grid>
          )}
          {student_admissions_status === 'eligible for exam' && (
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                startIcon={<IconCalendarBolt />}
                onClick={handleEntranceExamModal}
              >
                {student_entrance_exam_date ? 'Change Date' : 'Set Date'}
              </Button>
            </Grid>
          )}
          {student_admissions_status === 'eligible for exam' &&
            student_entrance_exam_date && (
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  startIcon={<IconReportAnalytics />}
                  onClick={handleEntranceScoreModal}
                >
                  Set Score
                </Button>
              </Grid>
            )}
          {student_admissions_status === 'eligible for interview' && (
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                startIcon={<IconReportSearch />}
                onClick={handleAdmissionStatusModal}
              >
                Proceed to Interview
              </Button>
            </Grid>
          )}
        </>
      ) : (
        student_admissions_status === 'pending' && (
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              name="k12"
              startIcon={<IconDiscountCheck />}
              onClick={handleSubmit}
            >
              Eligible for Registration
            </Button>
          </Grid>
        )
      )}
    </>
  );
};
export default AdmissionsActions;
