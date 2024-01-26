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
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import AddAccountType from 'src/components/accounting/AddAccountType';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteAccountType,
  getAccountType,
  getAllAccountCategories,
  getAllAccountTypes,
  toggleCreateAccountType,
  toggleEditAccountType,
} from 'src/features/accountingFeatures/accountingSlice';

const AccountTypeConfiguration = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 40, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { account_types, isFetchingAccountTypes } = useSelector(
    (state) => state.accounting
  );
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredAccounts = account_types?.filter((account) => {
    if (!account.isArchived) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        account?.account_type_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        account?.accountCategory_id?.account_category_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        account?.account_type_description
          ?.toLowerCase()
          ?.includes(searchTermLowerCase)
      );
    }
  });

  const sortedData = filteredAccounts.sort((a, b) => {
    const getComparableProperty = (item, orderBy) => {
      switch (orderBy) {
        case 'account_name':
          return item?.account_type_name;
        case 'category_name':
          return item?.accountCategory_id?.account_category_name;
        case 'account_desc':
          return item?.account_type_description;
        case 'account_remarks':
          return item?.account_type_status;
        default:
          return '';
      }
    };

    const propertyA = getComparableProperty(a, orderBy);
    const propertyB = getComparableProperty(b, orderBy);

    return order === 'desc'
      ? propertyB?.localeCompare(propertyA)
      : propertyA?.localeCompare(propertyB);
  });

  const tableData = sortedData?.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (tableData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return tableData.map((account) => (
      <TableRow key={account?._id}>
        <TableCell>{account?.account_type_name}</TableCell>
        <TableCell>
          {account?.accountCategory_id?.account_category_name}
        </TableCell>
        <TableCell>{account?.account_type_description}</TableCell>
        <TableCell>{account?.account_type_status}</TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              color="warning"
              size="small"
              onClick={() => {
                dispatch(toggleEditAccountType());
                dispatch(getAccountType(account?._id));
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
                setAccountId(account._id);
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
    dispatch(getAllAccountCategories());
  }, [dispatch]);

  return (
    <Stack>
      <AddAccountType />

      {isFetchingAccountTypes && <LoadingScreen />}

      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Confirm Action"
        message={'Are you sure you want to delete this Account?'}
        onCancel={() => {
          setAccountId('');
          setOpenDeleteModal(false);
        }}
        onConfirm={() => {
          dispatch(deleteAccountType(accountId));
          setOpenDeleteModal(false);
        }}
      />

      <Stack
        direction="row"
        mb={2}
        width={'100%'}
        justifyContent="space-between"
      >
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
              dispatch(toggleCreateAccountType());
            }}
          >
            Add New
          </Button>
        </Stack>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'account_name'}
                  direction={order}
                  onClick={() => handleSort('account_name')}
                >
                  Account Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category_name'}
                  direction={order}
                  onClick={() => handleSort('category_name')}
                >
                  Account Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'account_desc'}
                  direction={order}
                  onClick={() => handleSort('account_desc')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'account_remarks'}
                  direction={order}
                  onClick={() => handleSort('account_remarks')}
                >
                  Remarks
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>

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

export default AccountTypeConfiguration;
