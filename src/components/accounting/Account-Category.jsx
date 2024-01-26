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
import AddCategoryType from 'src/components/accounting/AddAccountCategory';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteAccountCategory,
  getAccountCategory,
  getAllAccountCategories,
  toggleCreateCategoryType,
  toggleEditCategoryType,
} from 'src/features/accountingFeatures/accountingSlice';

const AccountCategoryConfiguration = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 40, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    account_categories,
    isFetchingAccountCategory,
    editCategoryType,
    createCategoryTypeStatus,
  } = useSelector((state) => state.accounting);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredAccounts = account_categories?.filter((category) => {
    if (!category.isArchived) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        category?.account_category_name
          ?.toLowerCase()
          ?.includes(searchTermLowerCase) ||
        category?.category_code?.toLowerCase()?.includes(searchTermLowerCase) ||
        category?.account_category_description
          ?.toLowerCase()
          ?.includes(searchTermLowerCase)
      );
    }
  });

  const sortedData = filteredAccounts?.sort((a, b) => {
    const getComparableProperty = (item, orderBy) => {
      switch (orderBy) {
        case 'category_code':
          return parseFloat(item?.account_category_code);
        case 'category_name':
          return String(item?.account_category_name);
        case 'category_description':
          return String(item?.account_category_description);
        default:
          return '';
      }
    };

    const propertyA = getComparableProperty(a, orderBy);
    const propertyB = getComparableProperty(b, orderBy);

    if (orderBy === 'category_code') {
      return order === 'desc' ? propertyB - propertyA : propertyA - propertyB;
    } else {
      return order === 'desc'
        ? propertyB.localeCompare(propertyA)
        : propertyA.localeCompare(propertyB);
    }
  });

  const tableData = sortedData?.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const renderTableBody = () => {
    if (tableData?.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return tableData?.map((category) => (
      <TableRow key={category?._id}>
        <TableCell>{category?.account_category_name}</TableCell>
        <TableCell>{category?.account_category_description}</TableCell>
        <TableCell>{category?.account_category_status}</TableCell>
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              color="warning"
              size="small"
              onClick={() => {
                dispatch(toggleEditCategoryType());
                dispatch(getAccountCategory(category._id));
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
                setCategoryId(category._id);
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
    dispatch(getAllAccountCategories());
  }, [dispatch]);

  return (
    <Stack>
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
              dispatch(toggleCreateCategoryType());
            }}
          >
            Add New
          </Button>
        </Stack>
      </Stack>

      <AddCategoryType />

      {isFetchingAccountCategory && <LoadingScreen />}

      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Confirm Action"
        message={'Are you sure you want to delete this Account?'}
        onCancel={() => {
          setCategoryId('');
          setOpenDeleteModal(false);
        }}
        onConfirm={() => {
          dispatch(deleteAccountCategory(categoryId));
          setOpenDeleteModal(false);
        }}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category_name'}
                  direction={order}
                  onClick={() => handleSort('category_name')}
                >
                  Category Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category_description'}
                  direction={order}
                  onClick={() => handleSort('category_description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderTableBody()}</TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
};

export default AccountCategoryConfiguration;
