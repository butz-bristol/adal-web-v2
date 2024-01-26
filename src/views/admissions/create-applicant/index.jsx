import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardContent } from '@mui/material';

import {
  getAllCurriculums,
  getAllPrograms,
} from 'src/features/academicFeatures/academicSlice';

import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';

import NewForm from 'src/components/applicant/AdmissionsForm';

const CreateApplicant = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllCollegeTracks());
    dispatch(getAllCurriculums());
    dispatch(getAllPrograms());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        <NewForm />
      </CardContent>
    </Card>
  );
};

export default CreateApplicant;
