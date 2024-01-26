import { fetchUsers } from 'src/features/users/userSlice';
import adalFetch from 'src/utils/axios';
import {
  calculateBreaks,
  calculateTotalHours,
  fetchAllAdminCompensations,
  fetchAllAttendances,
  fetchAllBreaks,
  fetchAllSpecialCompensations,
  fetchAllTeachingCompensations,
} from './employeeSlice';

export const createEmployeeThunk = async (url, employee, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, employee);
    thunkAPI.dispatch(fetchUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateEmployeeThunk = async (url, employee, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, employee);
    thunkAPI.dispatch(fetchUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteEmployeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// **** Compensation ****

// Admin

export const fetchAllAdminCompensationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createAdminCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, compensation);
    thunkAPI.dispatch(fetchAllAdminCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateAdminCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, compensation);
    thunkAPI.dispatch(fetchAllAdminCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteAdminCompensationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllAdminCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Teaching

export const fetchAllTeachingCompensationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTeachingCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, compensation);
    thunkAPI.dispatch(fetchAllTeachingCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTeachingCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, compensation);
    thunkAPI.dispatch(fetchAllTeachingCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTeachingCompensationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllTeachingCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Special

export const fetchAllSpecialCompensationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSpecialCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, compensation);
    thunkAPI.dispatch(fetchAllSpecialCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSpecialCompensationThunk = async (
  url,
  compensation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, compensation);
    thunkAPI.dispatch(fetchAllSpecialCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSpecialCompensationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllSpecialCompensations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Attendance

export const fetchAllAttendancesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllBreaksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const clockInThunk = async (url, { userId, start }, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, { userId, start });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const clockOutThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(calculateTotalHours());
    thunkAPI.dispatch(fetchAllAttendances());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const calculateTotalHoursThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllAttendances());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateAttendanceThunk = async (url, attendance, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, attendance);
    thunkAPI.dispatch(fetchAllAttendances());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteAttendanceThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllAttendances());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Breaks

export const startBreakThunk = async (url, { userId, start }, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, { userId, start });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const endBreakThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllBreaks());
    thunkAPI.dispatch(calculateBreaks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const calculateBreaksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllBreaks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBreakThunk = async (
  url,
  { userId, start, end },
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, { userId, start, end });
    thunkAPI.dispatch(fetchAllBreaks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBreakThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllBreaks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
