import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addStudentToLocalStorage,
  addStudentTokenToLocalStorage,
  getStudentFromLocalStorage,
  getTokenFromLocalStorage,
  removeStudentFromLocalStorage,
  removeStudentTokenFromLocalStorage,
} from 'src/utils/localStorage';

import {
  addPromissoryNoteThunk,
  deletePromissoryNoteThunk,
  getDataThunk,
  getStudentDataThunk,
  loginStudentThunk,
  updatePromissoryNoteThunk,
  updateStudentThunk,
} from './studentThunk';

export const loginStudent = createAsyncThunk(
  'students/loginStudent',
  async (student, thunkAPI) => {
    return loginStudentThunk('/auth/login/student', student, thunkAPI);
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (student, thunkAPI) => {
    return updateStudentThunk(
      `/registered-students/${student._id}`,
      student,
      thunkAPI
    );
  }
);

export const getStudentProfile = createAsyncThunk(
  'students/getStudentProfile',
  async (_, thunkAPI) => {
    return getStudentDataThunk(
      `/registered-students/${thunkAPI.getState().students.student.student_id}`,
      thunkAPI
    );
  }
);

export const getPromissoryNote = createAsyncThunk(
  'finance/getPromissoryNote',
  async (id, thunkAPI) => {
    return getDataThunk(`/promissory-note/${id}`, thunkAPI);
  }
);

export const addPromissoryNote = createAsyncThunk(
  'finance/addStudentPromissoryNote',
  async (data, thunkAPI) => {
    return addPromissoryNoteThunk('/promissory-note', data, thunkAPI);
  }
);

export const updatePromissoryNote = createAsyncThunk(
  'finance/updateStudentPromissoryNote',
  async (data, thunkAPI) => {
    return updatePromissoryNoteThunk(
      `/promissory-note/${data._id}`,
      data,
      thunkAPI
    );
  }
);

export const deletePromissoryNote = createAsyncThunk(
  'finance/deleteStudentPromissoryNote',
  async (id, thunkAPI) => {
    return deletePromissoryNoteThunk(`/promissory-note/${id}`, thunkAPI);
  }
);

export const getPromissoryNotesByStudentId = createAsyncThunk(
  'finance/getPromissoryNotesByStudentId',
  async (id, thunkAPI) => {
    return getDataThunk(
      `/promissory-note/student/${
        thunkAPI.getState().students.student.student_id
      }`,
      thunkAPI
    );
  }
);

export const getK12StudentReportCard = createAsyncThunk(
  'students/getK12StudentReportCard',
  async ({ student_id, academic_year }, thunkAPI) => {
    return getStudentDataThunk(
      `/k12-enrollment-reports/${student_id}/${academic_year}`,
      thunkAPI
    );
  }
);

export const getCollegeStudentReportCard = createAsyncThunk(
  'academics/getCollegeStudentReportCard',
  async ({ student_id, academic_year }, thunkAPI) => {
    return getStudentDataThunk(
      `/college-enrollment-reports/${student_id}/${academic_year}`,
      thunkAPI
    );
  }
);

export const getStudentViewingSchedule = createAsyncThunk(
  'academics/getStudentViewingSchedule',
  async (_, thunkAPI) => {
    return getStudentDataThunk('/student-viewing-schedule', thunkAPI);
  }
);

const initialState = {
  students: [],
  student: getStudentFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  student_number: '',
  student_password: '',

  /**Student Report Card **/
  isFetchingStudentReportCard: false,
  student_report: null,

  //Student Profile
  studentData: {},
  studentProfile: {},
  isFetchingStudentProfile: false,
  isEditingStudentProfile: false,
  isUpdatingStudent: false,
  checkRemember: false,
  showPassword: false,
  isLoading: false,

  //Promisory Note
  promissoryNotes: [],
  promissoryNote: { file: '' },
  isFetchingStudentPromisorryNotes: false,
  isFetchingStudentPromisorryNote: false,
  isCreatingPromissoryNote: false,
  isUpdatingPromissoryNote: false,
  isDeletingPromissoryNote: false,
  isAddingPromissoryNote: false,
  isEditingPromissoryNote: false,

  //Schedule
  isFetchingViewingSchedule: false,
  viewingSchedules: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.studentData = action.payload;
    },
    clearStudent: (state) => {
      state.studentData = initialState.studentData;
    },
    setPromissoryNote: (state, action) => {
      state.promissoryNote = action.payload;
    },
    clearPromissoryNote: (state) => {
      state.promissoryNote = initialState.promissoryNote;
    },
    toggleAddPromissoryNote: (state) => {
      state.isAddingPromissoryNote = !state.isAddingPromissoryNote;
    },
    toggleEditPromissoryNote: (state) => {
      state.isEditingPromissoryNote = !state.isEditingPromissoryNote;
    },
    toggleStudentData: (state) => {
      state.isEditingStudentProfile = !state.isEditingStudentProfile;
    },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setRemember: (state) => {
      state.checkRemember = !state.checkRemember;
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    logoutStudent: (state) => {
      state.student = null;
      state.isLoading = false;
      state.token = null;
      removeStudentFromLocalStorage();
      removeStudentTokenFromLocalStorage();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStudent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.student = payload.student;
        state.studentInput = initialState.studentInput;
        state.token = payload.token;
        addStudentToLocalStorage(payload.student);
        addStudentTokenToLocalStorage(payload.token);
        toast.success(`Welcome ${payload.student.student_first_name}`);
      })
      .addCase(loginStudent.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      //Student Profile
      .addCase(getStudentProfile.pending, (state) => {
        state.isFetchingStudentProfile = true;
      })
      .addCase(getStudentProfile.fulfilled, (state, { payload }) => {
        state.isFetchingStudentProfile = false;
        state.studentProfile = payload.student;
      })
      .addCase(getStudentProfile.rejected, (state, { payload }) => {
        state.isFetchingStudentProfile = false;
        toast.error(payload.msg);
      })
      //Promissory Note
      .addCase(getPromissoryNotesByStudentId.pending, (state) => {
        state.isFetchingStudentPromisorryNotes = true;
      })
      .addCase(
        getPromissoryNotesByStudentId.fulfilled,
        (state, { payload }) => {
          state.isFetchingStudentPromisorryNotes = false;
          state.promissoryNotes = payload.promissoryNotes;
        }
      )
      .addCase(getPromissoryNotesByStudentId.rejected, (state, { payload }) => {
        state.isFetchingStudentPromisorryNotes = false;
        toast.error(payload.msg);
      })
      .addCase(getPromissoryNote.pending, (state) => {
        state.isFetchingStudentPromisorryNote = true;
      })
      .addCase(getPromissoryNote.fulfilled, (state, { payload }) => {
        state.isFetchingStudentPromisorryNote = false;
        state.promissoryNote = payload.promissoryNote;
      })
      .addCase(getPromissoryNote.rejected, (state, { payload }) => {
        state.isFetchingStudentPromisorryNote = false;
        toast.error(payload.msg);
      })
      .addCase(addPromissoryNote.pending, (state) => {
        state.isCreatingPromissoryNote = true;
      })
      .addCase(addPromissoryNote.fulfilled, (state, { payload }) => {
        state.isCreatingPromissoryNote = false;
        state.promissoryNote = initialState.promissoryNote;
        toast.success(payload.msg);
      })
      .addCase(addPromissoryNote.rejected, (state, { payload }) => {
        state.isCreatingPromissoryNote = false;
        toast.error(payload.msg);
      })
      .addCase(updatePromissoryNote.pending, (state) => {
        state.isUpdatingPromissoryNote = true;
      })
      .addCase(updatePromissoryNote.fulfilled, (state, { payload }) => {
        state.isUpdatingPromissoryNote = false;
        state.promissoryNote = initialState.promissoryNote;
        toast.success(payload.msg);
      })
      .addCase(updatePromissoryNote.rejected, (state, { payload }) => {
        state.isUpdatingPromissoryNote = false;
        toast.error(payload.msg);
      })
      .addCase(deletePromissoryNote.pending, (state) => {
        state.isDeletingPromissoryNote = true;
      })
      .addCase(deletePromissoryNote.fulfilled, (state, { payload }) => {
        state.isDeletingPromissoryNote = false;
        state.promissoryNote = initialState.promissoryNote;
        toast.success(payload.msg);
      })
      .addCase(deletePromissoryNote.rejected, (state, { payload }) => {
        state.isDeletingPromissoryNote = false;
        toast.error(payload.msg);
      })

      .addCase(getStudentViewingSchedule.pending, (state) => {
        state.isFetchingViewingSchedule = true;
      })
      .addCase(getStudentViewingSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingViewingSchedule = false;
        state.viewingSchedules = payload.schedules;
      })
      .addCase(getStudentViewingSchedule.rejected, (state, { payload }) => {
        state.isFetchingViewingSchedule = false;
        toast.error(payload);
      })

      /**Report Card **/
      .addCase(getK12StudentReportCard.pending, (state) => {
        state.isFetchingStudentReportCard = true;
      })
      .addCase(getK12StudentReportCard.fulfilled, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        state.student_report = payload.existingStudentLoad;
      })
      .addCase(getK12StudentReportCard.rejected, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        toast.error(payload);
      })

      .addCase(getCollegeStudentReportCard.pending, (state) => {
        state.isFetchingStudentReportCard = true;
      })
      .addCase(getCollegeStudentReportCard.fulfilled, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        state.student_report = payload.existingStudentLoad;
      })
      .addCase(getCollegeStudentReportCard.rejected, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        toast.error(payload);
      });
  },
});

export const {
  setStudent,
  clearStudent,
  toggleStudentData,
  logoutStudent,
  setRemember,
  setShowPassword,
  handleChange,
  setPromissoryNote,
  clearPromissoryNote,
  toggleAddPromissoryNote,
  toggleEditPromissoryNote,
} = studentSlice.actions;

export default studentSlice.reducer;
