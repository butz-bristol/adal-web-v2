import {
  Box,
  Button,
  FormControl,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  IconArrowLeft,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingScreen from 'src/components/LoadingScreen';
import AddAccount from 'src/components/accounting/AddAccount';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteAccount,
  fetchAllChartOfAccounts,
  getAccount,
  getAllAccountCategories,
  getAllAccountTypes,
  getAllAccounts,
  getAllDetailTypes,
  resetChartOfAccountId,
  toggleCreateAccount,
  toggleEditAccount,
} from 'src/features/accountingFeatures/accountingSlice';

const Account = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 40, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [accountId, setaccountId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    accounts,
    account_types,
    chart_of_account,
    chart_of_account_id,
    isFetchingAccounts,
    isCreatingAccount,
    isUpdatingAccount,
  } = useSelector((state) => state.accounting);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredAccounts = accounts?.filter((account) => {
    if (
      account?.chart_of_account_id === chart_of_account_id &&
      !account.isArchived
    ) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        String(account?.account_code)
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        account?.account_name?.toLowerCase()?.includes(searchTermLowerCase) ||
        account?.account_category?.account_category_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        account?.account_type?.account_type_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        account?.detail_type?.detail_type_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase)
      );
    }
  });

  const sortedData = filteredAccounts.sort((a, b) => {
    const getComparableProperty = (item, orderBy) => {
      switch (orderBy) {
        case 'account_code':
          return String(item.account_code);
        case 'account_name':
          return item.account_name;
        case 'category':
          return item.account_category?.account_category_name;
        case 'account_type':
          return item.account_type?.account_type_name;
        case 'detail_type':
          return item.detail_type?.detail_type_name;
        case 'account_desc':
          return item.account_description;
        case 'balance':
          return String(item.account_balance);
        default:
          return '';
      }
    };

    const propertyA = getComparableProperty(a, orderBy).toLowerCase();
    const propertyB = getComparableProperty(b, orderBy).toLowerCase();

    return order === 'desc'
      ? propertyB.localeCompare(propertyA)
      : propertyA.localeCompare(propertyB);
  });

  const tableData = sortedData?.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (tableData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={8} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return tableData.map((account) => (
      <TableRow key={account?._id}>
        <TableCell>{account?.account_code}</TableCell>
        <TableCell>{account?.account_name}</TableCell>
        <TableCell>
          {account?.account_category?.account_category_name}
        </TableCell>
        <TableCell>{account?.account_type?.account_type_name}</TableCell>
        <TableCell>{account?.detail_type?.detail_type_name}</TableCell>
        <TableCell>{account?.account_description}</TableCell>
        <TableCell>{account?.account_balance}</TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              color="warning"
              size="small"
              onClick={() => {
                dispatch(toggleEditAccount());
                dispatch(getAccount(account?._id));
              }}
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              color="secondary"
              onClick={() => {
                setaccountId(account._id);
                setOpenDeleteModal(true);
              }}
            >
              <IconTrash />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllAccountTypes());
    dispatch(fetchAllChartOfAccounts());
    dispatch(getAllAccounts());
    dispatch(getAllDetailTypes());
    dispatch(getAllAccountCategories());
  }, [dispatch]);

  return (
    <Stack>
      <AddAccount />

      {isFetchingAccounts && <LoadingScreen />}
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Confirm Action"
        message={'Are you sure you want to delete this Account?'}
        onCancel={() => {
          setaccountId('');
          setOpenDeleteModal(false);
        }}
        onConfirm={() => {
          dispatch(deleteAccount(accountId));
          setOpenDeleteModal(false);
        }}
      />

      <Stack
        direction="row"
        mb={2}
        width={'100%'}
        justifyContent="space-between"
      >
        <LinkComponent
          to="/finance/chart-of-account"
          onClick={() => dispatch(resetChartOfAccountId())}
        >
          <Button startIcon={<IconArrowLeft />} variant="outlined">
            Back
          </Button>
        </LinkComponent>

        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Box>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <TextField
                id="search-label"
                label="Search Label"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<IconPlus stroke={2} size="1.2rem" />}
            onClick={() => {
              dispatch(toggleCreateAccount());
            }}
          >
            Add New
          </Button>
        </Stack>
      </Stack>

      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'account_code'}
                    direction={order}
                    onClick={() => handleSort('account_code')}
                  >
                    Account Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'account_name'}
                    direction={order}
                    onClick={() => handleSort('account_name')}
                  >
                    Account Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'category'}
                    direction={order}
                    onClick={() => handleSort('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'account_type'}
                    direction={order}
                    onClick={() => handleSort('account_type')}
                  >
                    Account Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'detail_type'}
                    direction={order}
                    onClick={() => handleSort('detail_type')}
                  >
                    Detail Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'account_desc'}
                    direction={order}
                    onClick={() => handleSort('account_desc')}
                  >
                    Account Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'balance'}
                    direction={order}
                    onClick={() => handleSort('balance')}
                  >
                    Starting Balance
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
};

export default Account;
