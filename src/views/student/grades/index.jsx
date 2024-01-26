import { Grid, Stack } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import ViewCollegeGrade from 'src/components/student/Grading/ViewCollegeGrade';
import ViewK12Grade from 'src/components/student/Grading/ViewK12Grade';
import ViewMultipleIntelligence from 'src/components/student/Grading/ViewMultipleIntelligence';
import ViewNarrativeReport from 'src/components/student/Grading/ViewNarrativeReport';
import ViewSHSGrade from 'src/components/student/Grading/ViewSHSGrade';
import ViewStudentAttendance from 'src/components/student/Grading/ViewStudentAttendance';
import ViewStudentBehavior from 'src/components/student/Grading/ViewStudentBehavior';
import { getAllAcademicYears } from 'src/features/registrarFeatures/registrarSlice';
import {
  getCollegeStudentReportCard,
  getK12StudentReportCard,
  getStudentProfile,
  getStudentViewingSchedule,
} from 'src/features/studentFeatures/studentSlice';
import { k12Departments } from 'src/utils/helperFunctions';
import ViewingScheduleEnded from 'src/views/maintenance/ScheduleEnded/ViewingScheduleEnded';

const MyGrades = () => {
  const dispatch = useDispatch();
  const {
    student_report,
    studentProfile,
    isFetchingStudentReportCard,
    viewingSchedules,
  } = useSelector((state) => state.students);
  const { activeAcademicYear } = useSelector((state) => state.registrar);
  const PSLevel = ['Nursery 1', 'Nursery 2', 'Kindergarten'];
  const excludeGradeLevel = ['Nursery 1', 'Nursery 2'];
  const PSJHS = ['Pre-School & Grade School', 'Junior High School'];
  const CollegeTESDA = [
    'College',
    'Technical Education and Skills Development Authority (TESDA)',
  ];

  const isWithinSchedule = viewingSchedules.some((schedule) => {
    const { start_date_time, end_date_time } = schedule;
    const currentDate = new Date();
    return (
      currentDate >= new Date(start_date_time) &&
      currentDate <= new Date(end_date_time)
    );
  });

  useEffect(() => {
    if (studentProfile._id) {
      if (
        k12Departments.includes(
          studentProfile?.student_department?.department_name
        )
      ) {
        dispatch(
          getK12StudentReportCard({
            student_id: studentProfile._id,
            academic_year: activeAcademicYear?._id,
          })
        );
      }
      if (studentProfile?.student_department?.department_name === 'College') {
        dispatch(
          getCollegeStudentReportCard({
            student_id: studentProfile._id,
            academic_year: activeAcademicYear?._id,
          })
        );
      }
    }
  }, [
    dispatch,
    studentProfile._id,
    studentProfile?.student_department?.department_name,
    activeAcademicYear?._id,
  ]);

  useEffect(() => {
    dispatch(getStudentProfile());
    dispatch(getAllAcademicYears());
    dispatch(getStudentViewingSchedule());
  }, [dispatch]);

  return (
    <Stack>
      {isWithinSchedule ? (
        <Fragment>
          {isFetchingStudentReportCard ? (
            <LoadingScreen />
          ) : (
            <Grid container spacing={2}>
              {!excludeGradeLevel.includes(
                student_report?.year_level?.year_level_name
              ) && (
                <Grid item xs={12}>
                  {student_report?.department?.department_name ===
                    'Senior High School' && <ViewSHSGrade />}
                  {PSJHS.includes(
                    student_report?.department?.department_name
                  ) && <ViewK12Grade />}
                  {student_report?.department?.department_name ===
                    'College' && <ViewCollegeGrade />}
                </Grid>
              )}
              <Grid item xs={12}>
                {PSLevel?.includes(
                  student_report?.year_level?.year_level_name
                ) && <ViewMultipleIntelligence />}
              </Grid>

              {PSJHS.includes(student_report?.department?.department_name) && (
                <Grid item xs={12}>
                  <ViewNarrativeReport />
                </Grid>
              )}

              {!CollegeTESDA.includes(
                student_report?.department?.department_name
              ) && (
                <Grid item xs={12}>
                  <ViewStudentBehavior />
                </Grid>
              )}

              {!CollegeTESDA.includes(
                student_report?.department?.department_name
              ) && (
                <Grid item xs={12}>
                  <ViewStudentAttendance />
                </Grid>
              )}
            </Grid>
          )}
        </Fragment>
      ) : (
        <ViewingScheduleEnded />
      )}
    </Stack>
  );
};

export default MyGrades;
