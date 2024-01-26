import adalFetch from 'src/utils/axios';
import { getAllItems } from './itemsSlice';

export const getAllItemsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getItemByIdThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadFileThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createItemThunk = async (url, items, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, items);
    thunkAPI.dispatch(getAllItems());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateItemThunk = async (url, item, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, item);
    thunkAPI.dispatch(getAllItems());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteItemThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllItems());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadExcelFileThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
