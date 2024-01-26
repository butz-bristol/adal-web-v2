import {
  getPromissoryNotesByStudentId,
  getStudentProfile,
  logoutStudent,
} from 'src/features/studentFeatures/studentSlice';
import adalFetch from 'src/utils/axios';
import studentFetch from 'src/utils/studentAxios';

export const loginStudentThunk = async (url, student, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, student);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getStudentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutStudent());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentThunk = async (url, students, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, students);
    thunkAPI.dispatch(getStudentProfile());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addPromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    console.log(data);
    thunkAPI.dispatch(getPromissoryNotesByStudentId());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const updatePromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getPromissoryNotesByStudentId());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const deletePromissoryNoteThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getPromissoryNotesByStudentId());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const getDataThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getStudentDataThunk = async (url, thunkAPI) => {
  try {
    const response = await studentFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
