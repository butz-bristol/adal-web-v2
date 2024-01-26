import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
  Button,
  DialogContentText,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';

import { Stack } from '@mui/system';
import ManageProductModal from 'src/components/canteen/ManageProductModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteProduct,
  getAllProducts,
  openProductModalInAddMode,
  openProductModalInEditMode,
  setProduct,
} from 'src/features/canteenFeatures/products/canteenProductSlice';

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productForDeletion, setProductForDeletion] = useState({});

  const {
    products,
    isCreatingProduct,
    isDeletingProduct,
    isFetchingProducts,
    isUpdatingProduct,
  } = useSelector((state) => state.canteenProducts);

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredViewAllProducts = products?.filter((product) => {
    return (
      product.productName?.toLowerCase().includes(query.toLowerCase()) ||
      product.productSKU?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const paginatedProductData = filteredViewAllProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderProductTableBody = () => {
    if (paginatedProductData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return paginatedProductData.map((product) => (
      <TableRow
        key={product._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{product.productSKU}</TableCell>
        <TableCell>{product.productName}</TableCell>
        <TableCell>{product.buyingCost}</TableCell>
        <TableCell>{product.sellingPrice}</TableCell>
        <TableCell>
          <Tooltip title="Edit Product">
            <Button
              sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(setProduct(product));
                dispatch(openProductModalInEditMode());
              }}
            >
              <EditIcon fontSize="10px" />
            </Button>
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button
              sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
              variant="contained"
              color="error"
              onClick={() => {
                setProductForDeletion({ ...product });
              }}
              disabled={isDeletingProduct}
            >
              <DeleteIcon fontSize="10px" />
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Stack>
        <Grid container item alignItems="inline-flex" spacing={2} mb={1}>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              disabled={isCreatingProduct}
              onClick={() => {
                dispatch(openProductModalInAddMode());
              }}
              color="primary"
            >
              {isCreatingProduct || isUpdatingProduct || isDeletingProduct
                ? 'Loading...'
                : 'Add New Product'}
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <ManageProductModal />
      <ConfirmationModal
        isOpen={Object.keys(productForDeletion).length > 0}
        title={'Confirm Action'}
        message={
          <>
            <DialogContentText>
              Are you sure you want to delete:
            </DialogContentText>
            <DialogContentText>
              {productForDeletion?.productName}
            </DialogContentText>
            <DialogContentText>
              {productForDeletion?.productSKU}
            </DialogContentText>
          </>
        }
        onConfirm={() => {
          dispatch(deleteProduct(productForDeletion._id));
          setProductForDeletion({});
        }}
        onCancel={() => {
          setProductForDeletion({});
        }}
      />

      <div className="search">
        <FormControl variant="outlined" fullWidth>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search for a product"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
              dispatch(getAllProducts());
            }}
            value={query}
            InputProps={{
              endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
            }}
          />
        </FormControl>
      </div>

      {isFetchingProducts ||
        (isCreatingProduct && <LoadingScreen />) ||
        (isUpdatingProduct && <LoadingScreen />) ||
        (isDeletingProduct && <LoadingScreen />)}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderProductTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={query === '' ? products?.length : paginatedProductData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Products;
