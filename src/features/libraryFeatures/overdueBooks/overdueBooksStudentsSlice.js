import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllOverdueBooksStudentsThunk,
  getSingleOverdueBooksStudentThunk,
  createBookOverdueBookStudentThunk,
  updateBookOverdueBookStudentThunk,
  deleteBookOverdueBookStudentThunk
} from './overdueBooksStudentsThunk';
import {} from './overdueBooksStudentsThunk';
const initialState = {
  overdueFineStudents: [],
  overdueFineStudent: {},
  overdueBookId: '',
  overdueBook_id: '',
  studentFines: [],
  overdueFine: '',
  studentId: '',

  // function
  editOverdueBook: '',

  // process
  isArchive: false,
  loading: false,
  isFetchingOverdueBooks: false,
  isEditingOverdueBooks: false,
  isCreatingOverdueBook: false
};

// OverdueBooksStudent
export const getAllOverdueBooksStudents = createAsyncThunk('overdueFineStudents/getAllOverdueBooksStudents', async (_, thunkAPI) => {
  return getAllOverdueBooksStudentsThunk(`/overdueFineStudents`, thunkAPI);
});

export const getSingleOverdueBooksStudents = createAsyncThunk('overdueFineStudents/', async (overdueBook_id, thunkAPI) => {
  return getSingleOverdueBooksStudentThunk(`/overdueFineStudents/${overdueBook_id}`, thunkAPI);
});

export const createOverdueBooksStudents = createAsyncThunk(
  'overdueFineStudents/createOverdueBooksStudents',
  async (overdueFineStudents, thunkAPI) => {
    return createBookOverdueBookStudentThunk('/overdueFineStudents', overdueFineStudents, thunkAPI);
  }
);

export const deleteBookOverdueBookStudent = createAsyncThunk(
  '/overdueFineStudents/deleteBookOverdueBookStudent',
  async (studentId, thunkAPI) => {
    return deleteBookOverdueBookStudentThunk(`/overdueFineStudent/${(studentId, thunkAPI)}`, thunkAPI);
  }
);

export const updateOverdueBooksStudent = createAsyncThunk(
  'overdueFineStudents/updateOverdueBooksStudent',
  async (overdueFineStudent, thunkAPI) => {
    return updateBookOverdueBookStudentThunk(`/overdueFineStudents/${overdueFineStudent.overdueBook_id}`, overdueFineStudent, thunkAPI);
  }
);

const overdueFineStudentsSlice = createSlice({
  name: 'overdueFineStudents',
  initialState,
  reducers: {
    toggleEditBook: (state) => {
      state.editOverdueBook = !state.editOverdueBook;
    },
    setOverdueFineStudentValues: (state, action) => {
      state.overdueBook_id = action.payload._id;
      state.overdueBook_id = action.payload.overdueBook_id;
      state.overdueFineStudents = action.payload.overdueFineStudents;
      state.overdueFineStudent = action.payload.overdueFineStudent;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOverdueBooksStudents.pending, (state) => {
        state.loading = true;
        state.isFetchingOverdueBooks = true;
      })
      .addCase(getAllOverdueBooksStudents.fulfilled, (state, { payload }) => {
        state.overdueFineStudents = payload.overdueFineStudents;
        state.loading = false;
        state.isFetchingOverdueBooks = false;
      })
      .addCase(getAllOverdueBooksStudents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createOverdueBooksStudents.pending, (state) => {
        state.isCreatingOverdueBook = true;
      })
      .addCase(createOverdueBooksStudents.fulfilled, (state) => {
        state.isCreatingOverdueBook = false;
        toast.success('Overdue Fine created successfully');
      })
      .addCase(createOverdueBooksStudents.rejected, (state, { payload }) => {
        state.isCreatingOverdueBook = false;
        toast.error(payload.msg);
      })
      .addCase(updateOverdueBooksStudent.pending, (state) => {
        state.isEditingOverdueBooks = true;
      })
      .addCase(updateOverdueBooksStudent.fulfilled, (state) => {
        state.isEditingOverdueBooks = false;
        toast.success('Overdue Book Student updated successfully');
      })
      .addCase(updateOverdueBooksStudent.rejected, (state, { payload }) => {
        state.isEditingOverdueBooks = false;
        toast.error(payload.msg);
      });
  }
});

export const { toggleEditBook, setOverdueFineStudentValues } = overdueFineStudentsSlice.actions;

export default overdueFineStudentsSlice.reducer;
