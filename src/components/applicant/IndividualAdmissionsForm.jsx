import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardMedia, Grid } from '@mui/material';

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

import Logo from 'src/assets/images/BEABEC.png';
import LoadingScreen from 'src/components/LoadingScreen';
import Wrapper from 'src/views/admission-form/Wrapper';
import AdmissionsForm from './AdmissionsForm';

const IndividualAdmissionsForm = () => {
  const dispatch = useDispatch();

  const { isCreatingApplicant } = useSelector((state) => state.applicants);
  const {
    isFetchingAcademicYears,
    isFetchingDepartments,
    isFetchingCollegeTracks,
    isFetchingYearLevels,
  } = useSelector((state) => state.registrar);
  const { isFetchingPrograms } = useSelector((state) => state.academics);

  useEffect(() => {
    dispatch(getAllAcademicYears());
    dispatch(getAllCollegeTracks());
    dispatch(getAllCurriculums());
    dispatch(getAllPrograms());
    dispatch(getAllDepartments());
    dispatch(getAllYearLevels());
  }, [dispatch]);

  return (
    <>
      {isCreatingApplicant ||
      isFetchingAcademicYears ||
      isFetchingYearLevels ||
      isFetchingCollegeTracks ||
      isFetchingDepartments ||
      isFetchingPrograms ? (
        <LoadingScreen />
      ) : (
        <Wrapper sx={{ p: 2 }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  sx={{ backgroundColor: '#9e1313', height: '80px' }}
                  action={
                    <CardMedia
                      component="img"
                      image={Logo}
                      sx={{ width: 80 }}
                    ></CardMedia>
                  }
                ></CardHeader>
                <CardContent>
                  <AdmissionsForm />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </>
  );
};

export default IndividualAdmissionsForm;
