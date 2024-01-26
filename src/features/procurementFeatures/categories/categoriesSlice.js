import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
  getSuggestedCategoriesThunk
} from './categoriesThunk';

const initialState = {
  loading: false,
  categoryId: '',
  categoryName: '',
  categories: [],
  suggestedCategory: '',
  isEditingCategory: false,
  editCategory: false,
  isCreatingCategory: false,
  isEditingCategory: false,
  isFetchingCategories: false,
  isDeletingCategory: false,
  totalCategories: 0,
  totalPages: 0,
  page: 1,
  categoriesPerPage: 0,
  suggestedCategoriesperPage: 0,
  createCategoryStatus: false,
  suggestedCategories: [],
  isFetchingSuggestedCategories: false,
  totalSuggestedCategories: 0,
  totalSuggestedCategoriesperPage: 0
};

export const getAllCategories = createAsyncThunk('categories/getAllcategories', async (_, thunkAPI) => {
  return getAllCategoriesThunk(`/categories?page=${thunkAPI.getState().categories.page}`, thunkAPI);
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categories, thunkAPI) => {
  return createCategoryThunk('/categories', categories, thunkAPI);
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId, thunkAPI) => {
  return deleteCategoryThunk(`/categories/${categoryId}`, thunkAPI);
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category, thunkAPI) => {
  return updateCategoryThunk(`/categories/${category.categoryId}`, category, thunkAPI);
});

export const getSuggestedCategories = createAsyncThunk('categories/getSuggestedCategories', async (_, thunkAPI) => {
  return getSuggestedCategoriesThunk('categories/suggested', thunkAPI);
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    toggleCreateCategory: (state) => {
      state.createCategoryStatus = !state.createCategoryStatus;
    },
    toggleEditCategory: (state) => {
      state.editCategory = !state.editCategory;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    setCategoryValues: (state, action) => {
      state.categoryId = action.payload._id;
      state.categoryName = action.payload.categoryName;
    },

    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    clearForm: (state) => {
      state.categoryId = '';
      state.categoryName = '';
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.isFetchingCategories = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.categories;
        state.loading = false;
        state.isFetchingCategories = false;
        state.totalPages = payload.totalPages;
        state.totalCategories = payload.totalcategories;
        state.categoriesPerPage = payload.limit;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSuggestedCategories.pending, (state) => {
        state.loading = true;
        state.isFetchingSuggestedCategories = true;
      })
      .addCase(getSuggestedCategories.fulfilled, (state, { payload }) => {
        state.suggestedCategories = payload.suggestedCategories;
        state.loading = false;
        state.isFetchingSuggestedCategories = false;
        state.totalPages = payload.totalPages;
        state.totalSuggestedCategories = payload.totalSuggestedCategories;
        state.totalSuggestedCategoriesperPage = payload.limit;
      })
      .addCase(getSuggestedCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isCreatingCategory = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isCreatingCategory = false;
        toast.success('category created successfully');
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isCreatingCategory = false;
        toast.error(payload.msg);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isDeletingCategory = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isDeletingCategory = false;
        toast.success('Category deleted successfully');
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isDeletingCategory = false;
        toast.error(payload.msg);
      })
      .addCase(updateCategory.pending, (state) => {
        state.isEditingCategory = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isEditingCategory = false;
        state.editCategory = false;
        state.categoryName = '';
        state.categoryId = '';
        toast.success('Category updated successfully');
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isEditingCategory = false;
        toast.error(payload);
      });
  }
});

export const { toggleCreateCategory, handleChange, changePage, clearForm, toggleEditCategory, setCategoryValues } = categoriesSlice.actions;

export default categoriesSlice.reducer;
