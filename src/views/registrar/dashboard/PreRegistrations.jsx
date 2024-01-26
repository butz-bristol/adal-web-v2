import { Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconChecklist } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import MainCard from 'src/ui-component/cards/MainCard';
import SkeletonEmployeesCard from 'src/ui-component/cards/Skeleton/EmployeesCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

const PreRegistrations = () => {
  const theme = useTheme();
  const { isFetchingStudents, students } = useSelector(
    (state) => state.registrar
  );

  return (
    <>
      {isFetchingStudents ? (
        <SkeletonEmployeesCard />
      ) : (
        <LinkComponent to="/registrar/pre-registrations">
          <CardWrapper border={false} content={false}>
            <Grid container direction="column" sx={{ p: 2.25 }}>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconChecklist fontSize="inherit" size={'4rem'} />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '3rem',
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {
                        students?.filter((student) => student?.pre_enrolling)
                          .length
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.dark[200],
                  }}
                >
                  Pre-Registrations
                </Typography>
              </Grid>
            </Grid>
          </CardWrapper>
        </LinkComponent>
      )}
    </>
  );
};

PreRegistrations.propTypes = {
  isFetchingStudents: PropTypes.bool,
};

export default PreRegistrations;
