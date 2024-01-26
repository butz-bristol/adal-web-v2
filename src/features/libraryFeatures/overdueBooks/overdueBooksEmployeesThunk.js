import { toast } from 'react-toastify';
import adalFetch from 'src/utils/axios';
import { getAllOverdueBooksEmployees } from './overdueBooksEmployeesSlice';

export const getAllOverdueBooksEmployeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || 'An Error Occurred.';
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const getSingleOverdueBooksEmployeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createBookOverdueBookEmployeeThunk = async (
  url,
  overdueBooks,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, overdueBooks);
    thunkAPI.dispatch(getAllOverdueBooksEmployees());
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.msg;
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBookOverdueBookEmployeeThunk = async (
  url,
  overdueBook,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, overdueBook);
    thunkAPI.dispatch(getAllOverdueBooksEmployees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBookOverdueBookEmployeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllOverdueBooksEmployees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
