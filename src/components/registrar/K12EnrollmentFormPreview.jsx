import { Button, Stack } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import { clearStudentInfo } from 'src/features/registrarFeatures/registrarSlice';
import EnrollmentPDFFile from './PDFDocument';

const K12EnrollmentFormPreview = () => {
  const dispatch = useDispatch();
  const { studentProfile } = useSelector((state) => state.registrar);
  const { studentFees, k12PaymentScheme } = useSelector(
    (state) => state.finance
  );

  return (
    <Stack minHeight={'100vh'} spacing={2}>
      <LinkComponent to="/registrar/enlistments">
        <Button
          startIcon={<IconArrowNarrowLeft />}
          variant="contained"
          onClick={() => dispatch(clearStudentInfo())}
        >
          Back
        </Button>
      </LinkComponent>

      <PDFViewer width="100%" height="1200">
        <EnrollmentPDFFile
          student_first_name={studentProfile?.student_first_name}
          student_last_name={studentProfile?.student_last_name}
          student_middle_name={studentProfile?.student_middle_name}
          student_number={studentProfile?.student_number}
          student_year_level={
            studentProfile?.student_yearlevel?.year_level_name
          }
          studentFees={studentFees}
          student_section={studentProfile.section?.section_name ?? ''}
          payment_scheme={k12PaymentScheme?.payment_scheme ?? []}
        />
      </PDFViewer>
    </Stack>
  );
};

export default K12EnrollmentFormPreview;
