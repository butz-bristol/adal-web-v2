import adalFetch from 'src/utils/axios';
import { getAllOverdueBooksStudents } from './overdueBooksStudentsSlice';

export const getAllOverdueBooksStudentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || 'An Error Occurred.';
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const getSingleOverdueBooksStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createBookOverdueBookStudentThunk = async (
  url,
  overdueBooks,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, overdueBooks);
    thunkAPI.dispatch(getAllOverdueBooksStudents());
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.msg;
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBookOverdueBookStudentThunk = async (
  url,
  overdueBook,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, overdueBook);
    thunkAPI.dispatch(getAllOverdueBooksStudents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBookOverdueBookStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllOverdueBooksStudents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
