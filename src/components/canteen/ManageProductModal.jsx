import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearProduct,
  closeProductModal,
  createProduct,
  handleProductFormChange,
  updateProduct,
} from 'src/features/canteenFeatures/products/canteenProductSlice';
import { isNegative, isNumeric } from 'src/utils/formValidationFunctions';

const ManageProductModal = () => {
  const errorProductInitialState = {
    productName: {
      isEmpty: false,
    },
    productSKU: {
      isEmpty: false,
    },
    buyingCost: {
      isEmpty: false,
      isNonNumeric: false,
      isNegative: false,
    },
    sellingPrice: {
      isEmpty: false,
      isNonNumeric: false,
      isNegative: false,
    },
  };
  const [errorProduct, setErrorProduct] = useState(errorProductInitialState);

  const dispatch = useDispatch();
  const { product, productModalState, isCreatingProduct, isUpdatingProduct } =
    useSelector((state) => state.canteenProducts);

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleProductFormChange({ name, value }));

    if (value.trim() === '') {
      setErrorProduct((prevErrors) => ({
        ...prevErrors,
        [name]: { ...prevErrors[name], isEmpty: true },
      }));
    } else {
      setErrorProduct((prevErrors) => ({
        ...prevErrors,
        [name]: { ...prevErrors[name], isEmpty: false },
      }));
    }

    switch (name) {
      case 'buyingCost':
      case 'sellingPrice':
        if (!isNumeric(value)) {
          setErrorProduct((prevErrors) => ({
            ...prevErrors,
            [name]: { ...prevErrors[name], isNonNumeric: true },
          }));
        } else {
          setErrorProduct((prevErrors) => ({
            ...prevErrors,
            [name]: { ...prevErrors[name], isNonNumeric: false },
          }));
        }

        if (isNegative(value)) {
          setErrorProduct((prevErrors) => ({
            ...prevErrors,
            [name]: { ...prevErrors[name], isNegative: true },
          }));
        } else {
          setErrorProduct((prevErrors) => ({
            ...prevErrors,
            [name]: { ...prevErrors[name], isNegative: false },
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // TODO:
    // Error handling
    // - check unique SKU

    const hasError = Object.entries(product)
      .map(([name, value]) => {
        if (value === undefined || value.toString().trim() === '') {
          setErrorProduct((prevErrors) => ({
            ...prevErrors,
            [name]: { ...prevErrors[name], isEmpty: true },
          }));
          return true;
        }
        return false;
      })
      .some((isError) => isError);

    if (hasError) {
      toast.error('Please correctly fill all required fields', {
        autoClose: 3000,
      });
    } else {
      if (productModalState === 'create') {
        dispatch(
          createProduct({
            ...product,
            buyingCost: Number(product.buyingCost),
            sellingPrice: Number(product.sellingPrice),
          })
        );
      } else {
        dispatch(
          updateProduct({
            ...product,
            buyingCost: Number(product.buyingCost),
            sellingPrice: Number(product.sellingPrice),
          })
        );
      }
      dispatch(closeProductModal());
      dispatch(clearProduct());
    }
  };

  return (
    <Dialog
      open={!!productModalState}
      container={() => document.getElementById('root')}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3} textAlign="center">
          {productModalState === 'create' ? 'Add Product' : 'Edit Product'}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  error={errorProduct.productSKU.isEmpty}
                  label="SKU"
                  id="productSKU"
                  variant="outlined"
                  value={product.productSKU ?? ''}
                  name="productSKU"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  error={errorProduct.productName.isEmpty}
                  label="Name"
                  id="productName"
                  variant="outlined"
                  value={product.productName ?? ''}
                  name="productName"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  error={
                    errorProduct.buyingCost.isEmpty ||
                    errorProduct.buyingCost.isNonNumeric ||
                    errorProduct.buyingCost.isNegative
                  }
                  helperText={
                    (errorProduct.buyingCost.isNonNumeric &&
                      'Must be a number') ||
                    (errorProduct.buyingCost.isNegative &&
                      'Must not be a negative number')
                  }
                  label="Buying Cost"
                  id="buyingCost"
                  variant="outlined"
                  value={product.buyingCost ?? ''}
                  name="buyingCost"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  error={
                    errorProduct.sellingPrice.isEmpty ||
                    errorProduct.sellingPrice.isNonNumeric ||
                    errorProduct.sellingPrice.isNegative
                  }
                  helperText={
                    (errorProduct.sellingPrice.isNonNumeric &&
                      'Must be a number') ||
                    (errorProduct.sellingPrice.isNegative &&
                      'Must not be a negative number')
                  }
                  label="Selling Price"
                  id="sellingPrice"
                  variant="outlined"
                  value={product.sellingPrice ?? ''}
                  name="sellingPrice"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <DialogActions>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                setErrorProduct(() => errorProductInitialState);
              }}
              disabled={isCreatingProduct || isUpdatingProduct}
            >
              {productModalState === 'create' ? 'Add Product' : 'Edit Product'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="cancel"
              onClick={() => {
                dispatch(closeProductModal());
                dispatch(clearProduct());
                setErrorProduct(() => errorProductInitialState);
              }}
            >
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ManageProductModal;
