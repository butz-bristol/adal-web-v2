import adalFetch from 'src/utils/axios';
import { logoutApplicant } from './applicantSlice';

export const loginApplicantThunk = async (url, students, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, students);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createApplicantThunk = async (url, students, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, students);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getApplicantsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchApplicantThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutApplicant());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
