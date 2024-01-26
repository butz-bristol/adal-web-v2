import { toast } from 'react-toastify';
import adalFetch from 'src/utils/axios';
import { getAllBookOverdueFines } from './bookOverdueFinesSlice';

export const getAllBookOverdueFinesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || 'An Error Occurred.';
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const getSingleBookOverdueFineThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createBookOverdueFineThunk = async (
  url,
  bookOverdueFines,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, bookOverdueFines);
    thunkAPI.dispatch(getAllBookOverdueFines());
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.msg;
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBookOverdueFineThunk = async (
  url,
  bookOverdueFine,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, bookOverdueFine);
    thunkAPI.dispatch(getAllBookOverdueFines());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBookOverdueFineThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllBookOverdueFines());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
