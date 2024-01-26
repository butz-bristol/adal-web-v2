import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  getStudentThunk,
  updateStudentDataThunk,
  uploadFileThunk,
  fetchAllAdmissionsFilesThunk,
  uploadAdmissionsFileThunk,
  deleteAdmissionsFileThunk,
  getStudentsThunk,
  fetchAllScholarshipsThunk,
  createScholarshipThunk,
  archiveScholarshipThunk,
  archiveStudentScholarshipThunk,
  deleteStudentScholarshipThunk,
  updateStudentScholarshipThunk,
  createStudentScholarshipThunk,
  fetchAllStudentScholarshipsThunk,
  deleteScholarshipThunk,
  updateScholarshipThunk
} from './admissionsThunk';

const initialState = {
  students: [],
  isLoading: false,
  isFetchingStudents: false,
  isUpdatingStudent: false,
  studentProfile: {},
  student: {},
  isEditingStudentProfile: false,
  isEditingStudentFamilyBackground: false,
  isAddingEntranceExamDate: false,
  isAddingEntranceExamScore: false,
  isEditingAdmissionStatus: false,
  file: '',
  image: '',
  editStudent: false,
  editExamDate: false,
  isUpdatingApplicant: false,
  isEditingStudentExamDate: false,
  isUploadingFile: false,
  isProcessingFile: false,
  admissionsFile: [],
  isUploadingAdmissionsFile: false,
  isFetchingAdmissionsFiles: false,
  isDeletingAdmissionsFile: false,
  openFileUploadModal: false,
  levels: [],

  isFetchingStudentProfile: false,

  // Scholarships

  scholarship_name: '',
  scholarship_amount: '',
  academic_year: '',
  scholarship_status: '',
  maintaining_grades_required: '',

  isFetchingScholarships: false,
  scholarships: [],
  isUpdatingScholarship: false,
  isDeletingScholarship: false,
  isAddingScholarship: false,
  isFetchingScholarship: false,
  scholarship: {},
  editScholarship: false,
  scholarship_id: '',

  // Student Scholarships

  student_id: '',
  semester_id: '',
  scholarship_description: '',
  date_assigned: '',
  department_id: '',
  year_level_id: '',
  college_or_track: '',
  program_id: '',

  isFetchingStudentScholarships: false,
  studentScholarships: [],
  isUpdatingStudentScholarship: false,
  isDeletingStudentScholarship: false,
  isAddingStudentScholarship: false,
  isFetchingStudentScholarship: false,
  studentScholarship: {},
  editStudentScholarship: false,
  studentScholarship_id: ''
};

export const getAllStudents = createAsyncThunk('students/getAllStudents', async (_, thunkAPI) => {
  return getStudentsThunk('/students', thunkAPI);
});

export const getStudent = createAsyncThunk('students/getStudent', async (id, thunkAPI) => {
  return getStudentThunk(`/applicants/${id}`, thunkAPI);
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (student, thunkAPI) => {
  return updateStudentDataThunk(`/applicants/${student._id}`, student, thunkAPI);
});

export const uploadFile = createAsyncThunk('students/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const fetchAllAdmissionsFiles = createAsyncThunk('students/fetchAllAdmissionsFiles', async (_, thunkAPI) => {
  return fetchAllAdmissionsFilesThunk('/admissions-file', thunkAPI);
});

export const uploadAdmissionsFile = createAsyncThunk('students/uploadAdmissionsFile', async (file, thunkAPI) => {
  return uploadAdmissionsFileThunk('/admissions-file', file, thunkAPI);
});

export const deleteAdmissionsFile = createAsyncThunk('students/deleteAdmissionsFile', async (fileId, thunkAPI) => {
  return deleteAdmissionsFileThunk(`/admissions-file/${fileId}`, thunkAPI);
});

export const fetchAllScholarships = createAsyncThunk('students/fetchAllScholarships', async (_, thunkAPI) => {
  return fetchAllScholarshipsThunk('/scholarships', thunkAPI);
});

export const fetchScholarship = createAsyncThunk('students/fetchScholarship', async (id, thunkAPI) => {
  return fetchAllScholarshipsThunk(`/scholarships/${id}`, thunkAPI);
});

export const createScholarship = createAsyncThunk('students/createScholarship', async (scholarship, thunkAPI) => {
  return createScholarshipThunk('/scholarships', scholarship, thunkAPI);
});

export const updateScholarship = createAsyncThunk('students/updateScholarship', async (scholarship, thunkAPI) => {
  return updateScholarshipThunk(`/scholarships/${scholarship.id}`, scholarship, thunkAPI);
});

export const deleteScholarship = createAsyncThunk('students/deleteScholarship', async (scholarshipId, thunkAPI) => {
  return deleteScholarshipThunk(`/scholarships/${scholarshipId}`, thunkAPI);
});

export const archiveScholarship = createAsyncThunk('students/archiveScholarship', async (scholarshipId, thunkAPI) => {
  return archiveScholarshipThunk(`/scholarships/archive/${scholarshipId}`, thunkAPI);
});

export const unarchiveScholarship = createAsyncThunk('students/unarchiveScholarship', async (scholarshipId, thunkAPI) => {
  return archiveScholarshipThunk(`/scholarships/unarchive/${scholarshipId}`, thunkAPI);
});

export const fetchAllStudentScholarships = createAsyncThunk('students/fetchAllStudentScholarships', async (_, thunkAPI) => {
  return fetchAllStudentScholarshipsThunk('/student-scholarships', thunkAPI);
});

export const fetchStudentScholarship = createAsyncThunk('students/fetchStudentScholarship', async (id, thunkAPI) => {
  return fetchAllStudentScholarshipsThunk(`/student-scholarships/${id}`, thunkAPI);
});

export const createStudentScholarship = createAsyncThunk('students/createStudentScholarship', async (studentScholarship, thunkAPI) => {
  return createStudentScholarshipThunk('/student-scholarships', studentScholarship, thunkAPI);
});

export const bulkCreateStudentScholarship = createAsyncThunk(
  'students/bulkCreateStudentScholarship',
  async (studentScholarships, thunkAPI) => {
    return createStudentScholarshipThunk('/student-scholarships/bulk', studentScholarships, thunkAPI);
  }
);

export const updateStudentScholarship = createAsyncThunk('students/updateStudentScholarship', async (studentScholarship, thunkAPI) => {
  return updateStudentScholarshipThunk(`/student-scholarships/${studentScholarship.id}`, studentScholarship, thunkAPI);
});

export const deleteStudentScholarship = createAsyncThunk('students/deleteStudentScholarship', async (id, thunkAPI) => {
  return deleteStudentScholarshipThunk(`/student-scholarships/${id}`, thunkAPI);
});

export const archiveStudentScholarship = createAsyncThunk('students/archiveStudentScholarship', async (id, thunkAPI) => {
  return archiveStudentScholarshipThunk(`/student-scholarships/archive/${id}`, thunkAPI);
});

export const unarchiveStudentScholarship = createAsyncThunk('students/unarchiveStudentScholarship', async (id, thunkAPI) => {
  return archiveStudentScholarshipThunk(`/student-scholarships/unarchive/${id}`, thunkAPI);
});

const admissionsSlice = createSlice({
  name: 'admissions',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    clearStudent: (state) => {
      state.student = initialState.student;
    },
    toggleEntranceExamDateModal: (state) => {
      state.isAddingEntranceExamDate = !state.isAddingEntranceExamDate;
    },
    toggleEntranceExamScoreModal: (state) => {
      state.isAddingEntranceExamScore = !state.isAddingEntranceExamScore;
    },
    toggleStudentProfile: (state) => {
      state.isEditingStudentProfile = !state.isEditingStudentProfile;
    },
    toggleFamilyBackgroundModal: (state) => {
      state.isEditingStudentFamilyBackground = !state.isEditingStudentFamilyBackground;
    },
    toggleAdmissionStatusModal: (state) => {
      state.isEditingAdmissionStatus = !state.isEditingAdmissionStatus;
    },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    toggleEditStudent: (state) => {
      state.editStudent = !state.editStudent;
    },
    toggleEditExamDate: (state) => {
      state.editExamDate = !state.editExamDate;
    },
    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    clearFile: (state) => {
      state.file = '';
    },
    resetStudentProfile: (state) => {
      state.studentProfile = {};
    },
    toggleEditScholarship: (state) => {
      state.editScholarship = !state.editScholarship;
    },
    toggleEditStudentScholarship: (state) => {
      state.editStudentScholarship = !state.editStudentScholarship;
    },
    clearDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
    setDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(getAllStudents.fulfilled, (state, { payload }) => {
        state.students = payload.students;
        state.isFetchingStudents = false;
      })
      .addCase(getAllStudents.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(getStudent.pending, (state) => {
        state.isFetchingStudentProfile = true;
      })
      .addCase(getStudent.fulfilled, (state, { payload }) => {
        state.isFetchingStudentProfile = false;
        state.studentProfile = payload.student;
      })
      .addCase(getStudent.rejected, (state, { payload }) => {
        state.isFetchingStudentProfile = false;
        toast.error(payload.msg);
      })
      .addCase(updateStudent.pending, (state) => {
        state.isUpdatingStudent = true;
      })
      .addCase(updateStudent.fulfilled, (state, { payload }) => {
        state.applicants = payload.applicants;
        state.isUpdatingStudent = false;
        toast.success('Successfully updated!');
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isUpdatingStudent = false;
      })
      .addCase(uploadFile.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.file = payload.data;
        toast.success('File uploaded successfully');
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllAdmissionsFiles.pending, (state) => {
        state.isFetchingAdmissionsFiles = true;
      })
      .addCase(fetchAllAdmissionsFiles.fulfilled, (state, { payload }) => {
        state.isFetchingAdmissionsFiles = false;
        state.organizationalCharts = payload.organizationalCharts;
      })
      .addCase(fetchAllAdmissionsFiles.rejected, (state, { payload }) => {
        state.isFetchingAdmissionsFiles = false;
        toast.error(payload.msg);
      })
      .addCase(uploadAdmissionsFile.pending, (state) => {
        state.isUploadingAdmissionsFile = true;
      })
      .addCase(uploadAdmissionsFile.fulfilled, (state) => {
        state.openFileUploadModal = false;
        state.isProcessingFile = false;
        state.file = '';
        toast.success('Admissions file uploaded successfully');
      })
      .addCase(uploadAdmissionsFile.rejected, (state, { payload }) => {
        state.isUploadingAdmissionsFile = false;
        toast.error(payload);
      })
      .addCase(deleteAdmissionsFile.pending, (state) => {
        state.isDeletingAdmissionsFile = true;
        toast.info('Deleting file...');
      })
      .addCase(deleteAdmissionsFile.fulfilled, (state) => {
        state.isDeletingAdmissionsFile = false;
        toast.success('Admissions file deleted successfully');
      })
      .addCase(deleteAdmissionsFile.rejected, (state, { payload }) => {
        state.isDeletingAdmissionsFile = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllScholarships.pending, (state) => {
        state.isFetchingScholarships = true;
      })
      .addCase(fetchAllScholarships.fulfilled, (state, { payload }) => {
        state.isFetchingScholarships = false;
        state.scholarships = payload.scholarships;
      })
      .addCase(fetchAllScholarships.rejected, (state, { payload }) => {
        state.isFetchingScholarships = false;
        toast.error(payload.msg);
      })
      .addCase(fetchScholarship.pending, (state) => {
        state.isFetchingScholarships = true;
      })
      .addCase(fetchScholarship.fulfilled, (state, { payload }) => {
        state.isFetchingScholarships = false;
        state.scholarship = payload.scholarship;
      })
      .addCase(fetchScholarship.rejected, (state, { payload }) => {
        state.isFetchingScholarships = false;
        toast.error(payload.msg);
      })
      .addCase(createScholarship.pending, (state) => {
        state.isAddingScholarship = true;
      })
      .addCase(createScholarship.fulfilled, (state, { payload }) => {
        state.isAddingScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(createScholarship.rejected, (state, { payload }) => {
        state.isAddingScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(updateScholarship.pending, (state) => {
        state.isUpdatingScholarship = true;
      })
      .addCase(updateScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(updateScholarship.rejected, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(deleteScholarship.pending, (state) => {
        state.isDeletingScholarship = true;
      })
      .addCase(deleteScholarship.fulfilled, (state, { payload }) => {
        state.isDeletingScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(deleteScholarship.rejected, (state, { payload }) => {
        state.isDeletingScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(archiveScholarship.pending, (state) => {
        state.isUpdatingScholarship = true;
      })
      .addCase(archiveScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(archiveScholarship.rejected, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(unarchiveScholarship.pending, (state) => {
        state.isUpdatingScholarship = true;
      })
      .addCase(unarchiveScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(unarchiveScholarship.rejected, (state, { payload }) => {
        state.isUpdatingScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllStudentScholarships.pending, (state) => {
        state.isFetchingStudentScholarships = true;
      })
      .addCase(fetchAllStudentScholarships.fulfilled, (state, { payload }) => {
        state.isFetchingStudentScholarships = false;
        state.studentScholarships = payload.studentScholarships;
      })
      .addCase(fetchAllStudentScholarships.rejected, (state, { payload }) => {
        state.isFetchingStudentScholarships = false;
        toast.error(payload.msg);
      })
      .addCase(createStudentScholarship.pending, (state) => {
        state.isAddingStudentScholarship = true;
      })
      .addCase(createStudentScholarship.fulfilled, (state, { payload }) => {
        state.isAddingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(createStudentScholarship.rejected, (state, { payload }) => {
        state.isAddingStudentScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(bulkCreateStudentScholarship.pending, (state) => {
        state.isAddingStudentScholarship = true;
      })
      .addCase(bulkCreateStudentScholarship.fulfilled, (state, { payload }) => {
        state.isAddingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(bulkCreateStudentScholarship.rejected, (state, { payload }) => {
        state.isAddingStudentScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(deleteStudentScholarship.pending, (state) => {
        state.isDeletingStudentScholarship = true;
      })
      .addCase(deleteStudentScholarship.fulfilled, (state, { payload }) => {
        state.isDeletingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(deleteStudentScholarship.rejected, (state, { payload }) => {
        state.isDeletingStudentScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(updateStudentScholarship.pending, (state) => {
        state.isUpdatingStudentScholarship = true;
      })
      .addCase(updateStudentScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(updateStudentScholarship.rejected, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(archiveStudentScholarship.pending, (state) => {
        state.isUpdatingStudentScholarship = true;
      })
      .addCase(archiveStudentScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(archiveStudentScholarship.rejected, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.error(payload.msg);
      })
      .addCase(unarchiveStudentScholarship.pending, (state) => {
        state.isUpdatingStudentScholarship = true;
      })
      .addCase(unarchiveStudentScholarship.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.success(payload.msg);
      })
      .addCase(unarchiveStudentScholarship.rejected, (state, { payload }) => {
        state.isUpdatingStudentScholarship = false;
        toast.error(payload.msg);
      });
  }
});

export const {
  handleChange,
  setStudent,
  toggleStudentProfile,
  toggleFamilyBackgroundModal,
  toggleEntranceExamDateModal,
  toggleEntranceExamScoreModal,
  toggleAdmissionStatusModal,
  toggleFileUploadModal,
  clearFile,
  clearStudent,
  resetStudentProfile,
  logoutApplicant,
  clearDynamicData,
  setDynamicData,
  toggleEditScholarship,
  toggleEditStudentScholarship
} = admissionsSlice.actions;

export default admissionsSlice.reducer;
