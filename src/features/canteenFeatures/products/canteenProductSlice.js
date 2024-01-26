import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createProductThunk, deleteProductThunk, getAllProductsThunk, updateProductThunk } from './canteenProductThunk';
import { toast } from 'react-toastify';

const initialState = {
  products: [],

  // API Calls
  isFetchingProducts: false,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  isDeletingProduct: false,

  // Modal for createProduct and updateProduct
  productModalState: null,
  // For ManageProductModal
  product: {
    productName: undefined,
    productSKU: undefined,
    buyingCost: undefined,
    sellingPrice: undefined
  }
};

export const getAllProducts = createAsyncThunk('canteen/getAllProducts', async (_, thunkAPI) => {
  return getAllProductsThunk('/canteen/products', thunkAPI);
});

export const createProduct = createAsyncThunk('canteen/createProduct', async (productToCreate, thunkAPI) => {
  return createProductThunk('/canteen/products', productToCreate, thunkAPI);
});

export const updateProduct = createAsyncThunk('canteen/updateProduct', async (productToUpdate, thunkAPI) => {
  const { _id: productId, ...restOfProduct } = productToUpdate;
  return updateProductThunk(`/canteen/products/${productId}`, restOfProduct, thunkAPI);
});

export const deleteProduct = createAsyncThunk('canteen/deleteProduct', async (productId, thunkAPI) => {
  return deleteProductThunk(`/canteen/products/${productId}`, thunkAPI);
});

const canteenProductSlice = createSlice({
  name: 'canteen',
  initialState,
  reducers: {
    handleProductFormChange(state, { payload }) {
      state.product[payload.name] = payload.value;
    },

    clearProduct(state) {
      state.product = initialState.product;
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },

    openProductModalInAddMode(state) {
      state.productModalState = 'create';
    },

    openProductModalInEditMode(state) {
      state.productModalState = 'update';
    },

    closeProductModal(state) {
      state.productModalState = initialState.productModalState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isFetchingProducts = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isFetchingProducts = false;
        state.products = payload.products;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isFetchingProducts = false;
      })

      .addCase(createProduct.pending, (state) => {
        state.isCreatingProduct = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isCreatingProduct = false;
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        toast.error(`Create product error: ${payload.msg}`);
        state.isCreatingProduct = false;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isUpdatingProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isUpdatingProduct = false;
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        toast.error(`Update product error: ${payload.msg}`);
        state.isUpdatingProduct = false;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isDeletingProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isDeletingProduct = false;
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        toast.error(`Delete product error: ${payload.msg}`);
        state.isDeletingProduct = false;
      });
  }
});

export const {
  handleProductFormChange,
  clearProduct,
  setProduct,
  openProductModalInAddMode,
  openProductModalInEditMode,
  closeProductModal
} = canteenProductSlice.actions;

export default canteenProductSlice.reducer;
