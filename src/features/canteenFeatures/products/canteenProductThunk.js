import { clearProduct, getAllProducts } from './canteenProductSlice';

import adalFetch from 'src/utils/axios';

export const getAllProductsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createProductThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(clearProduct());
    thunkAPI.dispatch(getAllProducts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateProductThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(clearProduct());
    thunkAPI.dispatch(getAllProducts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteProductThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllProducts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
