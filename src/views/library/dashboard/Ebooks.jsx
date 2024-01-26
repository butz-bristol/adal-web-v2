import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { fetchAllEpublications } from 'src/features/libraryFeatures/e-publications/epubsSlice';
import MainCard from 'src/ui-component/cards/MainCard';
import SkeletonEmployeesCard from 'src/ui-component/cards/Skeleton/EmployeesCard';

// assets
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.dark[800],
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
    background: theme.palette.dark[800],
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Ebooks = ({ isLoading }) => {
  const theme = useTheme();
  const { epublications } = useSelector((state) => state.epublications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEpublications());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <SkeletonEmployeesCard />
      ) : (
        <Link
          to="/library/books/epublications"
          style={{ textDecoration: 'none' }}
        >
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <BookmarkAddIcon
                        fontSize="inherit"
                        sx={{ fontSize: '5rem' }}
                      />
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
                        {epublications.length}
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
                    Total Ebooks
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardWrapper>
        </Link>
      )}
    </>
  );
};

Ebooks.propTypes = {
  isLoading: PropTypes.bool,
};

export default Ebooks;
