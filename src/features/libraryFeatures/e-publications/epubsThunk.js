import adalFetch from 'src/utils/axios';
import { fetchAllEpublications } from './epubsSlice';

export const uploadFileThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllEpublicationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadEpublicationThunk = async (
  url,
  { epublication_filePath, file_name },
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, {
      epublication_filePath,
      file_name,
    });
    thunkAPI.dispatch(fetchAllEpublications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteEpublicationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllEpublications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
