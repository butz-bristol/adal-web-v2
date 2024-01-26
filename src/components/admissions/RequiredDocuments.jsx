import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CollegeAndTESDADocumentRequirements from 'src/components/CollegeAndTESDADocumentRequirements';
import K12DocumentRequirements from 'src/components/K12DocumentRequirements';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { getStudent } from 'src/features/admissionsFeatures/admissionsSlice';
import { updateStudent } from 'src/features/registrarFeatures/registrarSlice';

const RequiredDocuments = ({
  student_type = 'Old Student',
  student_department,
  isAdmissionsAdmin,
  isPWDStudent,
  isApplicant,
  withPendingRequirements = false,
  student_id,
}) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <Stack p={3}>
      <ConfirmationModal
        isOpen={openConfirmationModal}
        title="Documents Complete"
        message="Are you sure you want to mark this student's documents as complete? This action cannot be undone."
        onCancel={() => setOpenConfirmationModal(false)}
        onConfirm={() => {
          dispatch(
            updateStudent({ _id: student_id, withPendingRequirements: false })
          ).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              setOpenConfirmationModal(false);
              dispatch(getStudent(student_id));
            }
          });
        }}
      />

      {withPendingRequirements && (
        <Stack alignItems={'flex-end'}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 'fit-content' }}
            onClick={() => setOpenConfirmationModal(true)}
          >
            Documents Complete
          </Button>
        </Stack>
      )}

      {student_department === 'College' ||
      student_department ===
        'Technical Education and Skills Development Authority (TESDA)' ? (
        <CollegeAndTESDADocumentRequirements
          isAdmissionsAdmin={isAdmissionsAdmin}
          student_type={student_type}
          isPWDStudent={isPWDStudent}
          isApplicant={isApplicant}
        />
      ) : (
        <K12DocumentRequirements
          isApplicant={isApplicant}
          isAdmissionsAdmin={isAdmissionsAdmin}
        />
      )}
    </Stack>
  );
};

export default RequiredDocuments;
