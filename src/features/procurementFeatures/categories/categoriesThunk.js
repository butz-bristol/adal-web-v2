import adalFetch from 'src/utils/axios';
import { getAllCategories } from './categoriesSlice';

export const getAllCategoriesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createCategoryThunk = async (url, categories, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, categories);
    thunkAPI.dispatch(getAllCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCategoryThunk = async (url, category, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, category);
    thunkAPI.dispatch(getAllCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteCategoryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getSuggestedCategoriesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);

    // Check if the response is successful or not
    if (!response || !response.data || response.status !== 200) {
      throw new Error(`Error fetching data. Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // Log the error here for debugging purposes
    console.error('Error:', error.message || error.response.data);

    // Check if the error is due to a 400 Bad Request status
    if (error.response && error.response.status === 400) {
      console.error(
        'Error: Bad Request (status code 400). Check your request syntax.'
      );
    }

    return thunkAPI.rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
};
