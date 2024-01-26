import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  createApplicantThunk,
  fetchApplicantThunk,
  getApplicantsThunk,
  loginApplicantThunk,
} from './applicantThunk';

import {
  addApplicantToLocalStorage,
  getApplicantFromLocalStorage,
  removeApplicantFromLocalStorage,
} from 'src/utils/localStorage';

export const loginApplicant = createAsyncThunk(
  'applicants/loginApplicant',
  async (applicant, thunkAPI) => {
    return loginApplicantThunk('/auth/login/applicant', applicant, thunkAPI);
  }
);

export const createApplicant = createAsyncThunk(
  'applicants/createApplicant',
  async (applicant, thunkAPI) => {
    return createApplicantThunk('/applicants', applicant, thunkAPI);
  }
);

export const bulkApplicants = createAsyncThunk(
  'applicants/bulkApplicants',
  async (applicant, thunkAPI) => {
    return createApplicantThunk('/applicants/bulk', applicant, thunkAPI);
  }
);

export const getApplicants = createAsyncThunk(
  'applicants/getApplicants',
  async (_, thunkAPI) => {
    return getApplicantsThunk('/applicants', thunkAPI);
  }
);

export const fetchApplicantProfile = createAsyncThunk(
  'applicants/fetchApplicantProfile',
  async (id, thunkAPI) => {
    return fetchApplicantThunk(`/applicants/${id}`, thunkAPI);
  }
);

const initialState = {
  applicants: [],
  isFetchingApplicants: false,
  applicant: getApplicantFromLocalStorage(),
  applicantProfile: {},
  student_reference_no: '',
  student_personal_email: '',
  newApplicant: {
    student_type: 'New',
    student_gender: 'Male',
    student_sexual_orientation: 'Heterosexual',
    student_civil_status: 'Single',
    student_pwd_status: false,
    student_same_address: false,
    student_returnee_status: false,
    student_esc_grant_status: false,
    student_shs_voucher_status: false,
  },
  alertModal: {},
  referenceModal: false,
  track: '',
  isLoading: false,
  isCreatingApplicant: false,
  isCreatingBulkApplicant: false,
  isUpdatingApplicant: false,
  isFetchingApplicantProfile: false,
  filteredCollegeTrack: [],
  filteredPrograms: [],
  filteredLevels: [],
};
const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {
    setApplicant: (state, action) => {
      state.newApplicant = action.payload;
    },
    setFilteredCollegeTrack: (state, action) => {
      state.filteredCollegeTrack = action.payload;
    },
    setFilteredPrograms: (state, action) => {
      state.filteredPrograms = action.payload;
    },
    setFilteredLevels: (state, action) => {
      state.filteredLevels = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    toggleReferenceModal: (state) => {
      state.referenceModal = !state.referenceModal;
    },
    clearAlertModal: (state) => {
      state.alertModal = '';
    },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    logoutApplicant: (state) => {
      state.applicant = null;
      state.isLoading = false;
      removeApplicantFromLocalStorage();
    },
  },
  extraReducers(builder) {
    builder
      //Login
      .addCase(loginApplicant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginApplicant.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applicant = payload.applicant;
        addApplicantToLocalStorage(payload.applicant);
        toast.success(`Welcome ${payload.applicant.student_first_name}`);
      })
      .addCase(loginApplicant.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      //Individual Form
      .addCase(createApplicant.pending, (state) => {
        state.isCreatingApplicant = true;
      })
      .addCase(createApplicant.fulfilled, (state) => {
        state.isCreatingApplicant = false;
        state.newApplicant = initialState.newApplicant;
        state.filteredCollegeTrack = initialState.newApplicant;
        state.filteredLevels = initialState.newApplicant;
        state.filteredPrograms = initialState.newApplicant;
        state.track = initialState.newApplicant;
      })
      .addCase(createApplicant.rejected, (state, { payload }) => {
        state.isCreatingApplicant = false;
        toast.error(payload.error);
      })
      //Bulk Applicants
      .addCase(bulkApplicants.pending, (state) => {
        state.isCreatingBulkApplicant = true;
      })
      .addCase(bulkApplicants.fulfilled, (state) => {
        state.isCreatingBulkApplicant = false;
        state.referenceModal = true;
        state.alertModal = {
          title: 'Done',
          text: 'Please check your email',
          type: 'success',
        };
      })
      .addCase(bulkApplicants.rejected, (state, { payload }) => {
        state.isCreatingBulkApplicant = false;
        toast.error(payload.error);
      })
      //Fetch Applicants
      .addCase(fetchApplicantProfile.pending, (state) => {
        state.isFetchingApplicantProfile = true;
      })
      .addCase(fetchApplicantProfile.fulfilled, (state, { payload }) => {
        state.isFetchingApplicantProfile = false;
        state.applicantProfile = payload.student;
      })
      .addCase(fetchApplicantProfile.rejected, (state, { payload }) => {
        state.isFetchingApplicantProfile = false;
        toast.error(payload.error);
      })
      .addCase(getApplicants.pending, (state) => {
        state.isFetchingApplicants = true;
      })
      .addCase(getApplicants.fulfilled, (state, { payload }) => {
        state.isFetchingApplicants = false;
        state.applicants = payload.applicants;
      })
      .addCase(getApplicants.rejected, (state, { payload }) => {
        state.isFetchingApplicants = false;
        toast.error(payload.msg);
      });
  },
});

export const {
  setApplicant,
  setFilteredCollegeTrack,
  setFilteredPrograms,
  setFilteredLevels,
  handleChange,
  setOpen,
  setTrack,
  logoutApplicant,
  toggleReferenceModal,
  clearAlertModal,
} = applicantSlice.actions;

export default applicantSlice.reducer;
