import { toast } from 'react-toastify';
import adalFetch from 'src/utils/axios';
import { getAllBooks } from './booksSlice';

export const getAllBooksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    // Added an error message in toast
    const errorMessage = error.response?.data?.msg || 'An error occurred.';
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const getSingleBookThunk = async (url, thunkAPI) => {
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

export const createBookThunk = async (url, books, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, books);
    thunkAPI.dispatch(getAllBooks());
    return response.data;
  } catch (error) {
    // Added an error message in toast
    const errorMessage = error.response.data.msg;
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBookThunk = async (url, book, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, book);
    thunkAPI.dispatch(getAllBooks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBookThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllBooks());
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

export const getOverdueParametersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateOverdueParametersThunk = async (
  url,
  overdueParams,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, overdueParams);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
