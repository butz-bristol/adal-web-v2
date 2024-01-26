import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllOverdueBooksEmployeesThunk,
  getSingleOverdueBooksEmployeeThunk,
  createBookOverdueBookEmployeeThunk,
  updateBookOverdueBookEmployeeThunk,
  deleteBookOverdueBookEmployeeThunk
} from './overdueBooksEmployeesThunk';
const initialState = {
  overdueFineEmployee: {},
  overdueBookId: '',
  overdueBook_id: '',
  overdueFineEmployees: [],
  userFines: [],
  overdueFine: '',
  employeeId: '',

  // function
  editOverdueBook: '',

  // process
  isArchive: false,
  loading: false,
  isFetchingOverdueBooks: false,
  isEditingOverdueBooks: false,
  isCreatingOverdueBook: false
};
// OverdueBooksEmployee
export const getAllOverdueBooksEmployees = createAsyncThunk('overdueFineEmployees/getAllOverdueBooksEmployees', async (_, thunkAPI) => {
  return getAllOverdueBooksEmployeesThunk(`/overdueFineEmployees`, thunkAPI);
});

export const getSingleOverdueBooksEmployee = createAsyncThunk('overdueFineEmployees/', async (overdueBook_id, thunkAPI) => {
  return getSingleOverdueBooksEmployeeThunk(`/overdueFineEmployees/${overdueBook_id}`, thunkAPI);
});

export const createOverdueBooksEmployee = createAsyncThunk(
  'overdueFineEmployees/createOverdueBooksEmployee',
  async (overdueFineEmployees, thunkAPI) => {
    return createBookOverdueBookEmployeeThunk('/overdueFineEmployees', overdueFineEmployees, thunkAPI);
  }
);

export const deleteBookOverdueBookEmployee = createAsyncThunk(
  '/overdueFineEmployees/deleteBookOverdueBookEmployee',
  async (employeeId, thunkAPI) => {
    return deleteBookOverdueBookEmployeeThunk(`/overdueFineEmployee/${(employeeId, thunkAPI)}`, thunkAPI);
  }
);

export const updateOverdueBooksEmployee = createAsyncThunk(
  'overdueFineEmployees/updateOverdueBooksEmployee',
  async (overdueFineEmployee, thunkAPI) => {
    return updateBookOverdueBookEmployeeThunk(`/overdueFineEmployees/${overdueFineEmployee.overdueBook_id}`, overdueFineEmployee, thunkAPI);
  }
);

const overdueFineEmployeesSlice = createSlice({
  name: 'overdueFineEmployees',
  initialState,
  reducers: {
    toggleEditBook: (state) => {
      state.editOverdueBook = !state.editOverdueBook;
    },
    setOverdueFineEmployeeValues: (state, action) => {
      state.overdueBook_id = action.payload._id;
      state.overdueBook_id = action.payload.overdueBook_id;
      state.overdueFineEmployees = action.payload.overdueFineEmployees;
      state.overdueFineEmployee = action.payload.overdueFineEmployee;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOverdueBooksEmployees.pending, (state) => {
        state.loading = true;
        state.isFetchingOverdueBooks = true;
      })
      .addCase(getAllOverdueBooksEmployees.fulfilled, (state, { payload }) => {
        state.overdueFineEmployees = payload.overdueFineEmployees;
        state.loading = false;
        state.isFetchingOverdueBooks = false;
      })
      .addCase(getAllOverdueBooksEmployees.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createOverdueBooksEmployee.pending, (state) => {
        state.isCreatingOverdueBook = true;
      })
      .addCase(createOverdueBooksEmployee.fulfilled, (state) => {
        state.isCreatingOverdueBook = false;
        toast.success('Overdue Fine created successfully');
      })
      .addCase(createOverdueBooksEmployee.rejected, (state, { payload }) => {
        state.isCreatingOverdueBook = false;
        toast.error(payload.msg);
      });
    // Add update AddCase
  }
});

export const { toggleEditBook, setOverdueFineEmployeeValues } = overdueFineEmployeesSlice.actions;

export default overdueFineEmployeesSlice.reducer;
