import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllBookOverdueFinesThunk,
  getSingleBookOverdueFineThunk,
  createBookOverdueFineThunk,
  updateBookOverdueFineThunk,
  deleteBookOverdueFineThunk
} from './bookOverdueFinesThunk';

const initialState = {
  bookOverdueFines: [],
  bookOverdueFine: {},
  bookOverdueFine_id: '',
  userFines: [],
  overdueFine: '',
  user_type: '',
  userId: '',

  // function
  editOverdueBookFine: false,
  createOverdueBookFine: false,

  // process
  isArchive: false,
  loading: false,
  isFetchingOverdueBookFines: false,
  isEditingOverdueBookFine: false,
  isCreatingOverdueBookFine: false,
  isAddingOverdueBookFines: false
};

export const getAllBookOverdueFines = createAsyncThunk('bookOverdueFines/getAllBookOverdueFines', async (_, thunkAPI) => {
  return getAllBookOverdueFinesThunk(`/bookOverdueFines`, thunkAPI);
});

export const getSingleBookOverdueFine = createAsyncThunk('bookOverdueFines/', async (bookOverdueFine_id, thunkAPI) => {
  return getSingleBookOverdueFineThunk(`/bookOverdueFines/${bookOverdueFine_id}`, thunkAPI);
});

export const createBookOverdueFine = createAsyncThunk('bookOverdueFines/createBookOverdueFine', async (bookOverdueFines, thunkAPI) => {
  return createBookOverdueFineThunk('/bookOverdueFines', bookOverdueFines, thunkAPI);
});

export const deleteBookOverdueFine = createAsyncThunk('/bookOverdueFines/deleteBookOverdueFine', async (bookOverdueFine_id, thunkAPI) => {
  return deleteBookOverdueFineThunk(`/bookOverdueFines/${(bookOverdueFine_id, thunkAPI)}`, thunkAPI);
});

export const updateBookOverdueFine = createAsyncThunk('bookOverdueFines/updateBookOverdueFine', async (bookOverdueFine, thunkAPI) => {
  return updateBookOverdueFineThunk(`/bookOverdueFines/${bookOverdueFine.bookOverdueFine_id}`, bookOverdueFine, thunkAPI);
});

const bookOverdueFinesSlice = createSlice({
  name: 'bookOverdueFines',
  initialState,
  reducers: {
    toggleEditBookOverdueFine: (state) => {
      state.editOverdueBookFine = !state.editOverdueBookFine;
    },
    toggleCreateBookOverdueFine: (state) => {
      state.createOverdueBookFine = !state.createOverdueBookFine;
    },
    setbookOverdueFineValues: (state, action) => {
      state.bookOverdueFine_id = action.payload._id;
      state.bookOverdueFine = action.payload.bookOverdueFine;
      state.userFines = action.payload.userFines;
    },
    clearForm: (state) => {
      state.userId = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookOverdueFines.pending, (state) => {
        state.loading = true;
        state.isFetchingOverdueBookFines = true;
      })
      .addCase(getAllBookOverdueFines.fulfilled, (state, { payload }) => {
        state.bookOverdueFines = payload.bookOverdueFines;
        state.loading = false;
        state.isFetchingOverdueBookFines = false;
      })
      .addCase(getAllBookOverdueFines.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBookOverdueFine.pending, (state) => {
        state.isFetchingOverdueBookFines = true;
      })
      .addCase(createBookOverdueFine.fulfilled, (state) => {
        state.isFetchingOverdueBookFines = false;
        toast.success('Overdue Fine created successfully');
      })
      .addCase(createBookOverdueFine.rejected, (state, { payload }) => {
        state.isFetchingOverdueBookFines = false;
        toast.error(payload.msg);
      })
      .addCase(updateBookOverdueFine.pending, (state) => {
        state.isEditingOverdueBookFine = true;
      })
      .addCase(updateBookOverdueFine.fulfilled, (state, { payload }) => {
        state.isEditingOverdueBookFine = false;
        state.editOverdueBookFine = false;
        toast.success('Overdue Fine Updated successfully');
      })
      .addCase(updateBookOverdueFine.rejected, (state, { payload }) => {
        state.isEditingOverdueBookFine = false;
        toast.error(payload.msg);
      });
  }
});

export const { toggleEditBookOverdueFine, clearForm, setbookOverdueFineValues, toggleCreateBookOverdueFine } =
  bookOverdueFinesSlice.actions;

export default bookOverdueFinesSlice.reducer;
