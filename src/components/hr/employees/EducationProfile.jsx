import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Button, styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  setEducationProfile,
  toggleEditEducationProfileModal,
} from 'src/features/users/userSlice';

const EducationProfile = ({
  _id,
  school_name,
  degree,
  field_of_study,
  start_month,
  start_year,
  end_month,
  end_year,
  grade,
  activities_and_societies,
  education_description,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ alignSelf: 'flex-start' }}>
          <SchoolIcon fontSize="large" sx={{ mr: 2 }} />
        </Box>
        <Box>
          <Box>
            <Typography variant="h5">{school_name}</Typography>
            <Typography variant="h6">
              {degree}, {field_of_study}
            </Typography>
          </Box>
          <span>
            {start_month && <span>{start_month}</span>} {start_year} -
            {end_month && (
              <span>
                {end_month} {end_year}
              </span>
            )}
          </span>
          {grade && <Typography variant="h6">Grade: {grade}</Typography>}
          {activities_and_societies && (
            <Typography variant="h6">
              Activities and Societies: {activities_and_societies}
            </Typography>
          )}
          {education_description && (
            <Typography variant="h6">
              Description: {education_description}
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        sx={{ minWidth: 0, alignSelf: 'flex-start' }}
        onClick={() => {
          dispatch(
            setEducationProfile({
              _id,
              school_name,
              degree,
              field_of_study,
              start_month,
              start_year,
              end_month,
              end_year,
              grade,
              activities_and_societies,
              education_description,
            })
          );
          dispatch(toggleEditEducationProfileModal());
        }}
        size="small"
        variant="contained"
        color="warning"
      >
        <EditIcon fontSize="small" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  margin: '1rem 0',

  span: {
    color: '#8e8e8e',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  p: {
    fontWeight: 500,
    padding: '0.2rem 0',
    display: 'block',
  },

  'h5,  h6': {
    padding: '0.2rem 0',
  },
});

export default EducationProfile;
