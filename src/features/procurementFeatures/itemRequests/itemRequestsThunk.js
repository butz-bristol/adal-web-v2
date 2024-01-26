import adalFetch from 'src/utils/axios';
import { getAllItemRequests } from './itemRequestsSlice';

export const getAllItemRequestsThunk = async (url, thunkAPI) => {
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

export const createItemRequestThunk = async (url, itemRequests, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, itemRequests);
    thunkAPI.dispatch(getAllItemRequests());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getItemRequestThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateItemRequestThunk = async (url, itemRequest, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, itemRequest);
    thunkAPI.dispatch(getAllItemRequests());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteItemRequestThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllItemRequests());
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
