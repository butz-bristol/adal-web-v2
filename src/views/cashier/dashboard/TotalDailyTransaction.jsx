import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'src/ui-component/cards/MainCard';
import SkeletonEmployeesCard from 'src/ui-component/cards/Skeleton/EmployeesCard';

// assets
import { IconCurrencyPeso } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatNumber } from 'src/utils/helperFunctions';

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

const TotalDailyTransaction = ({ isLoading }) => {
  const theme = useTheme();
  const { payments } = useSelector((state) => state.cashier);

  const today = new Date();
  const todayDailyTransaction = payments.filter(
    (payment) =>
      new Date(payment.createdAt).getDate() === today.getDate() &&
      new Date(payment.createdAt).getMonth() === today.getMonth() &&
      new Date(payment.createdAt).getFullYear() === today.getFullYear()
  );

  const total = todayDailyTransaction?.reduce((acc, curr) => {
    return acc + curr.payment_amount;
  }, 0);

  return (
    <>
      {isLoading ? (
        <SkeletonEmployeesCard />
      ) : (
        <Link to="#" style={{ textDecoration: 'none' }}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <IconCurrencyPeso size={50} />
                    </Grid>
                    <Grid item sx={{ zIndex: 1000 }}>
                      <Typography
                        sx={{ fontSize: '2.5rem', fontWeight: 500, mr: 1 }}
                      >
                        {formatNumber(total)}
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
                    Total Daily Payments
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

TotalDailyTransaction.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalDailyTransaction;
