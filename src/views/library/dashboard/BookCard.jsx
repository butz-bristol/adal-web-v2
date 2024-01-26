import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';
import MainCard from 'src/ui-component/cards/MainCard';
import SkeletonEmployeesCard from 'src/ui-component/cards/Skeleton/EmployeesCard';

// assets
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

// ===========|| DASHBOARD DEFAULT - EARNING CARD ||=========== //

const BookCard = ({ isLoading }) => {
  const theme = useTheme();
  const { users } = useSelector((state) => state.users);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <SkeletonEmployeesCard />
      ) : (
        <Link to="/library/books/view-all" style={{ textDecoration: 'none' }}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <LibraryBooksIcon
                        fontSize="inherit"
                        sx={{ fontSize: '4rem' }}
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
                        {books.length}
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
                    Total Books
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

BookCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default BookCard;
