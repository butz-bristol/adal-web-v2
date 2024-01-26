import adalFetch from 'src/utils/axios';
import {
  fetchAllScholarships,
  fetchAllStudentScholarships,
  getStudent,
  logoutApplicant,
} from './admissionsSlice';

export const getStudentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentDataThunk = async (url, student, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, student);
    thunkAPI.dispatch(getStudent(student._id));
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
      thunkAPI.dispatch(logoutApplicant());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
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

export const fetchAllAdmissionsFilesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadAdmissionsFileThunk = async (
  url,
  { orgChart_filePath, file_name },
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, {
      orgChart_filePath,
      file_name,
    });
    thunkAPI.dispatch(getAllWaitingStudents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteAdmissionsFileThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllWaitingStudents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllScholarshipsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createScholarshipThunk = async (url, scholarship, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, scholarship);
    thunkAPI.dispatch(fetchAllScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateScholarshipThunk = async (url, scholarship, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, scholarship);
    thunkAPI.dispatch(fetchAllScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteScholarshipThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveScholarshipThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllStudentScholarshipsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createStudentScholarshipThunk = async (
  url,
  studentScholarship,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, studentScholarship);
    thunkAPI.dispatch(fetchAllStudentScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentScholarshipThunk = async (
  url,
  studentScholarship,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, studentScholarship);
    thunkAPI.dispatch(fetchAllStudentScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteStudentScholarshipThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllStudentScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveStudentScholarshipThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllStudentScholarships());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
