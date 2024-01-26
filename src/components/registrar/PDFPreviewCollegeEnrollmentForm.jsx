import { Button, Stack } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import {
  getAllAcademicYears,
  getAllSemesters,
} from 'src/features/registrarFeatures/registrarSlice';
import CollegeEnrollmentPDF from './CollegeEnrollmentPDF';

const K12EnrollmentFormPreview = () => {
  const dispatch = useDispatch();
  const {
    studentProfile,
    enlistedSubjects: subjects,
    academic_year,
    semester,
    semesters,
    academic_years,
  } = useSelector((state) => state.registrar);
  const { studentFees } = useSelector((state) => state.finance);
  const currentSemester = semesters?.find((sem) => sem?._id === semester?._id);
  const currentAcademicYear = academic_years?.find(
    (ay) => ay?._id === academic_year?._id
  );

  useEffect(() => {
    dispatch(getAllSemesters());
    dispatch(getAllAcademicYears());
  }, [dispatch]);

  return (
    <Stack minHeight={'100vh'} spacing={2}>
      <LinkComponent to="/registrar/enlistments">
        <Button
          size="small"
          startIcon={<IconArrowNarrowLeft />}
          variant="contained"
        >
          Back
        </Button>
      </LinkComponent>

      <PDFViewer width="100%" height="1201">
        <CollegeEnrollmentPDF
          student_first_name={studentProfile?.student_first_name}
          student_last_name={studentProfile?.student_last_name}
          student_middle_name={studentProfile?.student_middle_name}
          student_number={studentProfile?.student_number}
          student_year_level={
            studentProfile?.student_yearlevel?.year_level_name
          }
          studentFees={studentFees}
          subjects={subjects}
          semester={currentSemester?.semester_term}
          student_program={studentProfile?.student_program?.program_name}
          school_year={currentAcademicYear?.school_year}
        />
      </PDFViewer>
    </Stack>
  );
};

export default K12EnrollmentFormPreview;
