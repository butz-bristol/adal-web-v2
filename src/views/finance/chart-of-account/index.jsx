import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  IconLayoutGrid,
  IconList,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import AddChartOfAccount from 'src/components/accounting/AddChartOfAccount';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteChartOfAccount,
  fetchAllChartOfAccounts,
  getAllFiscalYears,
  getChartOfAccount,
  handleChange,
  setChartOfAccount,
  setChartOfAccountId,
  toggleCreateChartOfAccount,
  toggleEditChartOfAccount,
  toggleGridView,
  toggleListView,
} from 'src/features/accountingFeatures/accountingSlice';
import { extractRole } from 'src/utils/helperFunctions';
import { formatMonthDay } from 'utils/dateFunctions';
const ChartOfAccount = () => {
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { user } = useSelector((state) => state.users);
  const [chartOfAccountId, setchartOfAccountId] = useState('');
  const {
    chart_of_accounts,
    isFetchingChartOfAccounts,
    chart_of_account_query,
    listView,
    gridView,
    fiscalYear,
    chart_of_account_id,
    isUpdatingChartOfAccount,
    editChartOfAccount,
    createChartOfAccountStatus,
  } = useSelector((state) => state.accounting);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };
  const chart_of_accounts_sort = chart_of_accounts.filter(
    (chart_of_account) => !chart_of_account.isArchived
  );

  const renderTableBody = () => {
    if (chart_of_accounts_sort.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return chart_of_accounts_sort.map((chart_of_account) => (
      <TableRow key={chart_of_account._id}>
        <TableCell>
          {formatMonthDay(chart_of_account.fiscalYear?.start_date)}
        </TableCell>
        <TableCell>
          {formatMonthDay(chart_of_account.fiscalYear?.end_date)}
        </TableCell>
        <TableCell>
          {' '}
          {chart_of_account.fiscalYear?.academic_year?.school_year}
        </TableCell>
        <TableCell>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <LinkComponent
              to={`/${extractRole(user?.user_role)}/chart-of-account/account`}
              onClick={() => {
                dispatch(setChartOfAccountId(chart_of_account._id));
              }}
            >
              <Button variant="outlined" size="small">
                View
              </Button>
            </LinkComponent>

            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => {
                dispatch(
                  setChartOfAccount({
                    _id: chart_of_account._id,
                    fiscalYear: chart_of_account.fiscal_year?._id,
                    chart_of_account: chart_of_account,
                  })
                );
                dispatch(toggleEditChartOfAccount());
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => {
                setchartOfAccountId(chart_of_account._id);
                handleOpenConfirmation();
              }}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  const renderGridViewBody = () => {
    if (chart_of_accounts_sort.length === 0) {
      return <>No results found</>;
    }
    return chart_of_accounts_sort.map((chart_of_account) => (
      <Grid item xs={12} md={4} lg={3} key={chart_of_account._id}>
        <Card
          sx={{
            '&:hover': {
              boxShadow: '0 8px 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <CardContent>
            <Typography variant="h4" component={'div'}>
              {formatMonthDay(chart_of_account.fiscalYear?.start_date)} -{' '}
              {formatMonthDay(chart_of_account.fiscalYear?.end_date)} :{' '}
              {chart_of_account.fiscalYear?.academic_year?.school_year}
            </Typography>
          </CardContent>

          <CardActions>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <LinkComponent
                to={`/${extractRole(user?.user_role)}/chart-of-account/account`}
                onClick={() => {
                  dispatch(setChartOfAccountId(chart_of_account._id));
                }}
              >
                <Button variant="outlined" size="small">
                  View
                </Button>
              </LinkComponent>

              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => {
                  dispatch(getChartOfAccount(chart_of_account._id));
                  dispatch(
                    setChartOfAccount({
                      _id: chart_of_account._id,
                      fiscalYear: chart_of_account.fiscalYear?._id,
                      chart_of_account: chart_of_account,
                    })
                  );
                  dispatch(toggleEditChartOfAccount());
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  setchartOfAccountId(chart_of_account._id);
                  setOpenConfirmation(true);
                }}
              >
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  useEffect(() => {
    dispatch(fetchAllChartOfAccounts());
    dispatch(getAllFiscalYears());
  }, [dispatch]);

  return (
    <Stack>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap=".5rem"
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => dispatch(toggleGridView())}
              sx={{ minWidth: 0 }}
            >
              <IconLayoutGrid stroke={2} size="1.2rem" />
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => dispatch(toggleListView())}
              sx={{ minWidth: 0 }}
            >
              <IconList stroke={2} size="1.2rem" />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap="1rem"
          >
            <FormControl>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                name="chart_of_account_query"
                value={chart_of_account_query}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch stroke={1.5} size="1rem" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(toggleCreateChartOfAccount())}
                startIcon={<IconPlus stroke={2} size="1.2rem" />}
              >
                Add New
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <AddChartOfAccount />

      <ConfirmationModal
        isOpen={openConfirmation}
        title={'Confirm Action'}
        message={'Are you sure you want to perform this action?'}
        onCancel={handleCloseConfirmation}
        onConfirm={() => {
          dispatch(deleteChartOfAccount(chartOfAccountId));
          handleCloseConfirmation();
        }}
      />

      <Box>
        {isFetchingChartOfAccounts ? (
          <Grid
            container
            width="100%"
            justifyItems="center"
            alignItems="center"
            minHeight="200px"
          >
            <Box
              sx={{
                margin: '0 auto',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress size="70px" />
            </Box>
          </Grid>
        ) : listView ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>
        ) : gridView ? (
          <Grid container spacing={2} mt={2}>
            {renderGridViewBody()}
          </Grid>
        ) : null}
      </Box>
    </Stack>
  );
};

export default ChartOfAccount;
