import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from 'src/utils/localStorage';
import {
  createEducationProfileThunk,
  createFamilyBackgroundThunk,
  createHealthBackgroundThunk,
  createLicenseAndCertificationThunk,
  deleteEducationProfileThunk,
  deleteFamilyBackgroundThunk,
  deleteHealthBackgroundThunk,
  deleteLicenseAndCertificationThunk,
  fetchAllEducationProfilesThunk,
  fetchAllFamilyBackgroundsThunk,
  fetchAllHealthBackgroundsThunk,
  fetchAllLicenseAndCertificationsThunk,
  fetchUserThunk,
  fetchUsersThunk,
  loginUserThunk,
  updateEducationProfileThunk,
  updateFamilyBackgroundThunk,
  updateHealthBackgroundThunk,
  updateLicenseAndCertificationThunk,
  updatePasswordThunk,
} from './userThunk';

const initialState = {
  users: [],
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  isFetchingUsers: false,
  supervisors: [],
  userProfile: {},
  username: '',
  password: '',
  isLoading: false,
  totalUsers: 0,
  totalPages: 0,
  page: 1,
  isUpdatingPassword: false,
  isFetchingUserProfile: false,

  employee_profile: {},
  isFetchingUser: false,

  // Family Background

  family_backgrounds: [],
  mother_name: '',
  mother_occupation: '',
  mother_address: '',
  mother_phone: '',
  mother_birth_date: '',
  father_name: '',
  father_occupation: '',
  father_phone: '',
  father_address: '',
  father_birth_date: '',
  spouse_name: '',
  spouse_phone: '',
  spouse_address: '',
  spouse_birth_date: '',
  spouse_occupation: '',
  child_name: '',
  child_birth_date: '',
  email: '',
  household_gross_income: '',
  children: [{ child_name: '', child_birth_date: '' }],
  isFetchingFamilyBackgrounds: false,
  isCreatingFamilyBackground: false,
  isUpdatingFamilyBackground: false,
  isDeletingFamilyBackground: false,
  createFamilyBackgroundModal: false,
  editFamilyBackground: false,
  editFamilyBackgroundId: '',

  // Education Background

  education_profiles: [],
  school_name: '',
  degree: '',
  field_of_study: '',
  start_month: '',
  isFileLoading: false,
  start_year: '',
  end_month: '',
  end_year: '',
  grade: '',
  activities_and_societies: '',
  education_description: '',
  createEducationProfileModal: false,
  isCreatingEducationProfile: false,
  isUpdatingEducationProfile: false,
  isDeletingEducationProfile: false,
  isFetchingEducationProfiles: false,
  editEducationProfile: false,
  editEducationProfileId: '',

  // License and Certification
  license_and_certifications: [],
  license_name: '',
  issuing_authority: '',
  license_number: '',
  license_issue_month: '',
  license_issue_year: '',
  license_expiry_month: '',
  license_expiry_year: '',
  license_url: '',
  expiration_toggle: false,
  editLicenseAndCertificationId: '',
  createLicenseAndCertificationModal: false,
  isCreatingLicenseAndCertification: false,
  isUpdatingLicenseAndCertification: false,
  isDeletingLicenseAndCertification: false,
  isFetchingLicenseAndCertifications: false,
  editLicenseAndCertification: false,

  // Health and Wellness

  health_backgrounds: [],
  existing_illness: '',
  previous_illness: '',
  medications: '',
  allergies: '',
  hospitalizations: '',
  smoking: '',
  alcohol: '',
  frequencies: ['occasional', 'regular', 'heavy', 'never'],
  createHealthBackgroundModal: false,
  isCreatingHealthBackground: false,
  isUpdatingHealthBackground: false,
  isDeletingHealthBackground: false,
  isFetchingHealthBackgrounds: false,
  editHealthBackground: false,
  editHealthBackgroundId: '',

  // Principal
  principal: {},
  isFetchingPrincipal: false,
};

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

export const fetchUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    return fetchUsersThunk(
      `/users?page=${thunkAPI.getState().users.page}`,
      thunkAPI
    );
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id, thunkAPI) => {
    return fetchUserThunk(`/users/${id}`, thunkAPI);
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (_, thunkAPI) => {
    return fetchUserThunk(
      `/users/${thunkAPI.getState().users.user?.userId}`,
      thunkAPI
    );
  }
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async (password, thunkAPI) => {
    return updatePasswordThunk(`/users/updateUserPassword`, password, thunkAPI);
  }
);

// Family Background

export const fetchAllFamilyBackgrounds = createAsyncThunk(
  'users/fetchAllFamilyBackgrounds',
  async (_, thunkAPI) => {
    return fetchAllFamilyBackgroundsThunk('/family', thunkAPI);
  }
);

export const createFamilyBackground = createAsyncThunk(
  'users/createFamilyBackground',
  async (familyBackground, thunkAPI) => {
    return createFamilyBackgroundThunk('/family', familyBackground, thunkAPI);
  }
);

export const updateFamilyBackground = createAsyncThunk(
  'users/updateFamilyBackground',
  async (familyBackground, thunkAPI) => {
    return updateFamilyBackgroundThunk(
      `/family/${familyBackground.editFamilyBackgroundId}`,
      familyBackground,
      thunkAPI
    );
  }
);

export const deleteFamilyBackground = createAsyncThunk(
  'users/deleteFamilyBackground',
  async (familyBackgroundId, thunkAPI) => {
    return deleteFamilyBackgroundThunk(
      `/family/${familyBackgroundId}`,
      thunkAPI
    );
  }
);

// Education Background

export const fetchAllEducationProfiles = createAsyncThunk(
  'users/fetchAllEducationProfiles',
  async (_, thunkAPI) => {
    return fetchAllEducationProfilesThunk('/educations', thunkAPI);
  }
);

export const createEducationProfile = createAsyncThunk(
  'users/createEducationProfile',
  async (educationProfile, thunkAPI) => {
    return createEducationProfileThunk(
      '/educations',
      educationProfile,
      thunkAPI
    );
  }
);

export const updateEducationProfile = createAsyncThunk(
  'users/updateEducationProfile',
  async (educationProfile, thunkAPI) => {
    return updateEducationProfileThunk(
      `/educations/${educationProfile.editEducationProfileId}`,
      educationProfile,
      thunkAPI
    );
  }
);

export const deleteEducationProfile = createAsyncThunk(
  'users/deleteEducationProfile',
  async (educationProfileId, thunkAPI) => {
    return deleteEducationProfileThunk(
      `/educations/${educationProfileId}`,
      thunkAPI
    );
  }
);

// License and Certification

export const fetchAllLicenseAndCertifications = createAsyncThunk(
  'users/fetchAllLicenseAndCertifications',
  async (_, thunkAPI) => {
    return fetchAllLicenseAndCertificationsThunk(
      '/license-and-certifications',
      thunkAPI
    );
  }
);

export const createLicenseAndCertification = createAsyncThunk(
  'users/createLicenseAndCertification',
  async (licenseAndCertification, thunkAPI) => {
    return createLicenseAndCertificationThunk(
      '/license-and-certifications',
      licenseAndCertification,
      thunkAPI
    );
  }
);

export const updateLicenseAndCertification = createAsyncThunk(
  'users/updateLicenseAndCertification',
  async (licenseAndCertification, thunkAPI) => {
    return updateLicenseAndCertificationThunk(
      `/license-and-certifications/${licenseAndCertification.editLicenseAndCertificationId}`,
      licenseAndCertification,
      thunkAPI
    );
  }
);

export const deleteLicenseAndCertification = createAsyncThunk(
  'users/deleteLicenseAndCertification',
  async (licenseAndCertificationId, thunkAPI) => {
    return deleteLicenseAndCertificationThunk(
      `/license-and-certifications/${licenseAndCertificationId}`,
      thunkAPI
    );
  }
);

// Health and Wellness

export const fetchAllHealthBackgrounds = createAsyncThunk(
  'users/fetchAllHealthBackgrounds',
  async (_, thunkAPI) => {
    return fetchAllHealthBackgroundsThunk('/healths', thunkAPI);
  }
);

export const createHealthBackground = createAsyncThunk(
  'users/createHealthBackground',
  async (healthBackground, thunkAPI) => {
    return createHealthBackgroundThunk('/healths', healthBackground, thunkAPI);
  }
);

export const updateHealthBackground = createAsyncThunk(
  'users/updateHealthBackground',
  async (healthBackground, thunkAPI) => {
    return updateHealthBackgroundThunk(
      `/healths/${healthBackground.editHealthBackgroundId}`,
      healthBackground,
      thunkAPI
    );
  }
);

export const deleteHealthBackground = createAsyncThunk(
  'users/deleteHealthBackground',
  async (healthBackgroundId, thunkAPI) => {
    return deleteHealthBackgroundThunk(
      `/healths/${healthBackgroundId}`,
      thunkAPI
    );
  }
);

export const fetchPrincipal = createAsyncThunk(
  'users/fetchPrincipal',
  async (_, thunkAPI) => {
    return fetchUserThunk(`/users/principal`, thunkAPI);
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearForm: (state) => {
      state.email = '';
      state.password = '';
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      removeTokenFromLocalStorage();
      removeUserFromLocalStorage();
    },
    toggleAddFamilyBackgroundModal: (state) => {
      state.createFamilyBackgroundModal = !state.createFamilyBackgroundModal;
    },
    toggleEditFamilyBackgroundModal: (state) => {
      state.editFamilyBackground = !state.editFamilyBackground;
    },
    toggleAddEducationProfileModal: (state) => {
      state.createEducationProfileModal = !state.createEducationProfileModal;
    },
    toggleEditEducationProfileModal: (state) => {
      state.editEducationProfile = !state.editEducationProfile;
    },
    toggleAddLicenseAndCertificationModal: (state) => {
      state.createLicenseAndCertificationModal =
        !state.createLicenseAndCertificationModal;
    },
    toggleEditLicenseAndCertificationModal: (state) => {
      state.editLicenseAndCertification = !state.editLicenseAndCertification;
    },
    toggleAddHealthBackgroundModal: (state) => {
      state.createHealthBackgroundModal = !state.createHealthBackgroundModal;
    },
    toggleEditHealthBackgroundModal: (state) => {
      state.editHealthBackground = !state.editHealthBackground;
    },
    setFamilyBackground: (state, { payload }) => {
      state.editFamilyBackgroundId = payload._id;
      state.mother_name = payload.mother_name;
      state.mother_occupation = payload.mother_occupation;
      state.mother_address = payload.mother_address;
      state.mother_phone = payload.mother_phone;
      state.mother_birth_date = payload.mother_birth_date;
      state.father_name = payload.father_name;
      state.father_occupation = payload.father_occupation;
      state.father_address = payload.father_address;
      state.father_phone = payload.father_phone;
      state.father_birth_date = payload.father_birth_date;
      state.spouse_name = payload.spouse_name;
      state.spouse_occupation = payload.spouse_occupation;
      state.spouse_address = payload.spouse_address;
      state.spouse_phone = payload.spouse_phone;
      state.spouse_birth_date = payload.spouse_birth_date;
      state.children = payload.children;
      state.household_gross_income = payload.household_gross_income;
    },
    setEducationProfile: (state, { payload }) => {
      state.editEducationProfileId = payload._id;
      state.school_name = payload.school_name;
      state.degree = payload.degree;
      state.field_of_study = payload.field_of_study;
      state.start_month = payload.start_month;
      state.start_year = payload.start_year;
      state.end_month = payload.end_month;
      state.end_year = payload.end_year;
      state.grade = payload.grade;
      state.activities_and_societies = payload.activities_and_societies;
      state.education_description = payload.education_description;
    },
    setLicenseAndCertification: (state, { payload }) => {
      state.editLicenseAndCertificationId = payload._id;
      state.license_name = payload.license_name;
      state.license_number = payload.license_number;
      state.issuing_authority = payload.issuing_authority;
      state.license_issue_month = payload.license_issue_month;
      state.license_expiry_month = payload.license_expiry_month;
      state.license_issue_year = payload.license_issue_year;
      state.license_expiry_year = payload.license_expiry_year;
      state.license_url = payload.license_url;
      state.expiration_toggle = payload.expiration_toggle;
    },
    setHealthBackground: (state, { payload }) => {
      state.editHealthBackgroundId = payload._id;
      state.existing_illness = payload.existing_illness;
      state.previous_illness = payload.previous_illness;
      state.medications = payload.medications;
      state.allergies = payload.allergies;
      state.hospitalizations = payload.hospitalizations;
      state.smoking = payload.smoking;
      state.alcohol = payload.alcohol;
    },
    clearFamilyBackground: (state) => {
      state.editFamilyBackgroundId = '';
      state.mother_name = '';
      state.mother_occupation = '';
      state.mother_address = '';
      state.mother_phone = '';
      state.mother_birth_date = '';
      state.father_name = '';
      state.father_occupation = '';
      state.father_address = '';
      state.father_phone = '';
      state.father_birth_date = '';
      state.spouse_name = '';
      state.spouse_occupation = '';
      state.spouse_address = '';
      state.spouse_phone = '';
      state.spouse_birth_date = '';
      state.children = '';
      state.household_gross_income = '';
      state.editFamilyBackground = false;
      state.createFamilyBackgroundModal = false;
      state.isCreatingFamilyBackground = false;
      state.isUpdatingFamilyBackground = false;
    },
    clearEducationProfile: (state) => {
      state.editEducationProfileId = '';
      state.school_name = '';
      state.degree = '';
      state.field_of_study = '';
      state.start_month = '';
      state.start_year = '';
      state.end_month = '';
      state.end_year = '';
      state.grade = '';
      state.activities_and_societies = '';
      state.education_description = '';
      state.editEducationProfile = false;
      state.createEducationProfileModal = false;
      state.isCreatingEducationProfile = false;
      state.isUpdatingEducationProfile = false;
    },
    clearLicenseAndCertification: (state) => {
      state.editLicenseAndCertificationId = '';
      state.license_name = '';
      state.license_number = '';
      state.issuing_authority = '';
      state.license_issue_month = '';
      state.license_expiry_month = '';
      state.license_issue_year = '';
      state.license_expiry_year = '';
      state.license_url = '';
      state.editLicenseAndCertification = false;
      state.createLicenseAndCertificationModal = false;
      state.isCreatingLicenseAndCertification = false;
      state.isUpdatingLicenseAndCertification = false;
    },
    clearHealthBackground: (state) => {
      state.editHealthBackgroundId = '';
      state.existing_illness = '';
      state.previous_illness = '';
      state.medications = '';
      state.allergies = '';
      state.hospitalizations = '';
      state.smoking = '';
      state.alcohol = '';
      state.editHealthBackground = false;
      state.createHealthBackgroundModal = false;
      state.isCreatingHealthBackground = false;
      state.isUpdatingHealthBackground = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.username = '';
        state.password = '';
        state.user = payload.user;
        state.token = payload.token;
        addUserToLocalStorage(payload.user);
        addTokenToLocalStorage(payload.token);
        toast.success(`Welcome ${payload.user.username}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isFetchingUsers = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isFetchingUsers = false;
        state.users = payload.users;
        state.supervisors = payload.users.filter(
          (user) => user.supervisor === 'yes'
        );
        state.totalPages = payload.totalPages;
        state.totalUsers = payload.totalUsers;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isFetchingUserProfile = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.isFetchingUserProfile = false;
        state.userProfile = payload.user[0];
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.isFetchingUserProfile = false;
        toast.error(payload.msg);
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isFetchingUsers = false;
        toast.error(payload.msg);
      })
      .addCase(fetchUser.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isFetchingUser = false;
        state.employee_profile = payload.user[0];
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.isFetchingUser = false;
        toast.error(payload.msg);
      })
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.isUpdatingPassword = false;
        toast.success(payload.msg);
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isUpdatingPassword = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllFamilyBackgrounds.pending, (state) => {
        state.isFetchingFamilyBackgrounds = true;
      })
      .addCase(fetchAllFamilyBackgrounds.fulfilled, (state, { payload }) => {
        state.isFetchingFamilyBackgrounds = false;
        state.family_backgrounds = payload.familyBackgrounds;
      })
      .addCase(fetchAllFamilyBackgrounds.rejected, (state, { payload }) => {
        state.isFetchingFamilyBackgrounds = false;
        toast.error(payload.msg);
      })
      .addCase(createFamilyBackground.pending, (state) => {
        state.isCreatingFamilyBackground = true;
      })
      .addCase(createFamilyBackground.fulfilled, (state) => {
        state.isCreatingFamilyBackground = false;
        toast.success('Family Background successfully created');
      })
      .addCase(createFamilyBackground.rejected, (state, { payload }) => {
        state.isCreatingFamilyBackground = false;
        toast.error(payload.msg);
      })
      .addCase(updateFamilyBackground.pending, (state) => {
        state.isUpdatingFamilyBackground = true;
      })
      .addCase(updateFamilyBackground.fulfilled, (state) => {
        state.isUpdatingFamilyBackground = false;
        state.editFamilyBackground = false;
        toast.success('Family Background successfully updated');
      })
      .addCase(updateFamilyBackground.rejected, (state, { payload }) => {
        state.isUpdatingFamilyBackground = false;
        toast.error(payload.msg);
      })
      .addCase(deleteFamilyBackground.pending, (state) => {
        state.isDeletingFamilyBackground = true;
      })
      .addCase(deleteFamilyBackground.fulfilled, (state) => {
        state.isDeletingFamilyBackground = false;
        toast.success('Family Background successfully deleted');
      })
      .addCase(deleteFamilyBackground.rejected, (state, { payload }) => {
        state.isDeletingFamilyBackground = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllEducationProfiles.pending, (state) => {
        state.isFetchingEducationProfiles = true;
      })
      .addCase(fetchAllEducationProfiles.fulfilled, (state, { payload }) => {
        state.isFetchingEducationProfiles = false;
        state.education_profiles = payload.educations;
      })
      .addCase(fetchAllEducationProfiles.rejected, (state, { payload }) => {
        state.isFetchingEducationProfiles = false;
        toast.error(payload.msg);
      })
      .addCase(createEducationProfile.pending, (state) => {
        state.isCreatingEducationProfile = true;
      })
      .addCase(createEducationProfile.fulfilled, (state) => {
        state.isCreatingEducationProfile = false;
        toast.success('Education Profile successfully created');
      })
      .addCase(createEducationProfile.rejected, (state, { payload }) => {
        state.isCreatingEducationProfile = false;
        toast.error(payload.msg);
      })
      .addCase(updateEducationProfile.pending, (state) => {
        state.isUpdatingEducationProfile = true;
      })
      .addCase(updateEducationProfile.fulfilled, (state) => {
        state.isUpdatingEducationProfile = false;
        state.editEducationProfile = false;
        toast.success('Education Profile successfully updated');
      })
      .addCase(updateEducationProfile.rejected, (state, { payload }) => {
        state.isUpdatingEducationProfile = false;
        toast.error(payload.msg);
      })
      .addCase(deleteEducationProfile.pending, (state) => {
        state.isDeletingEducationProfile = true;
      })
      .addCase(deleteEducationProfile.fulfilled, (state) => {
        state.isDeletingEducationProfile = false;
        toast.success('Education Profile successfully deleted');
      })
      .addCase(deleteEducationProfile.rejected, (state, { payload }) => {
        state.isDeletingEducationProfile = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllLicenseAndCertifications.pending, (state) => {
        state.isFetchingLicenseAndCertifications = true;
      })
      .addCase(
        fetchAllLicenseAndCertifications.fulfilled,
        (state, { payload }) => {
          state.isFetchingLicenseAndCertifications = false;
          state.license_and_certifications = payload.licenseAndCertifications;
        }
      )
      .addCase(
        fetchAllLicenseAndCertifications.rejected,
        (state, { payload }) => {
          state.isFetchingLicenseAndCertifications = false;
          toast.error(payload.msg);
        }
      )
      .addCase(createLicenseAndCertification.pending, (state) => {
        state.isCreatingLicenseAndCertification = true;
      })
      .addCase(createLicenseAndCertification.fulfilled, (state) => {
        state.isCreatingLicenseAndCertification = false;
        toast.success('License and Certification successfully created');
      })
      .addCase(createLicenseAndCertification.rejected, (state, { payload }) => {
        state.isCreatingLicenseAndCertification = false;
        toast.error(payload.msg);
      })
      .addCase(updateLicenseAndCertification.pending, (state) => {
        state.isUpdatingLicenseAndCertification = true;
      })
      .addCase(updateLicenseAndCertification.fulfilled, (state) => {
        state.isUpdatingLicenseAndCertification = false;
        state.editLicenseAndCertification = false;
        toast.success('License and Certification successfully updated');
      })
      .addCase(updateLicenseAndCertification.rejected, (state, { payload }) => {
        state.isUpdatingLicenseAndCertification = false;
        toast.error(payload.msg);
      })
      .addCase(deleteLicenseAndCertification.pending, (state) => {
        state.isDeletingLicenseAndCertification = true;
      })
      .addCase(deleteLicenseAndCertification.fulfilled, (state) => {
        state.isDeletingLicenseAndCertification = false;
        toast.success('License and Certification successfully deleted');
      })
      .addCase(deleteLicenseAndCertification.rejected, (state, { payload }) => {
        state.isDeletingLicenseAndCertification = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllHealthBackgrounds.pending, (state) => {
        state.isFetchingHealthBackgrounds = true;
      })
      .addCase(fetchAllHealthBackgrounds.fulfilled, (state, { payload }) => {
        state.isFetchingHealthBackgrounds = false;
        state.health_backgrounds = payload.healthBackgrounds;
      })
      .addCase(fetchAllHealthBackgrounds.rejected, (state, { payload }) => {
        state.isFetchingHealthBackgrounds = false;
        toast.error(payload.msg);
      })
      .addCase(createHealthBackground.pending, (state) => {
        state.isCreatingHealthBackground = true;
      })
      .addCase(createHealthBackground.fulfilled, (state) => {
        state.isCreatingHealthBackground = false;
        toast.success('Health Background successfully created');
      })
      .addCase(createHealthBackground.rejected, (state, { payload }) => {
        state.isCreatingHealthBackground = false;
        toast.error(payload.msg);
      })
      .addCase(updateHealthBackground.pending, (state) => {
        state.isUpdatingHealthBackground = true;
      })
      .addCase(updateHealthBackground.fulfilled, (state) => {
        state.isUpdatingHealthBackground = false;
        state.editHealthBackground = false;
        toast.success('Health Background successfully updated');
      })
      .addCase(updateHealthBackground.rejected, (state, { payload }) => {
        state.isUpdatingHealthBackground = false;
        toast.error(payload.msg);
      })
      .addCase(deleteHealthBackground.pending, (state) => {
        state.isDeletingHealthBackground = true;
      })
      .addCase(deleteHealthBackground.fulfilled, (state) => {
        state.isDeletingHealthBackground = false;
        toast.success('Health Background successfully deleted');
      })
      .addCase(deleteHealthBackground.rejected, (state, { payload }) => {
        state.isDeletingHealthBackground = false;
        toast.error(payload.msg);
      })
      .addCase(fetchPrincipal.pending, (state) => {
        state.isFetchingPrincipal = true;
      })
      .addCase(fetchPrincipal.fulfilled, (state, { payload }) => {
        state.isFetchingPrincipal = false;
        state.principal = payload.principal;
      })
      .addCase(fetchPrincipal.rejected, (state, { payload }) => {
        state.isFetchingPrincipal = false;
        toast.error(payload.msg);
      });
  },
});

export const {
  handleChange,
  clearForm,
  logoutUser,
  changePage,
  toggleAddFamilyBackgroundModal,
  toggleEditFamilyBackgroundModal,
  toggleAddEducationProfileModal,
  toggleEditEducationProfileModal,
  toggleAddLicenseAndCertificationModal,
  toggleEditLicenseAndCertificationModal,
  toggleEditHealthBackgroundModal,
  toggleAddHealthBackgroundModal,
  setFamilyBackground,
  setEducationProfile,
  setLicenseAndCertification,
  setHealthBackground,
  clearFamilyBackground,
  clearEducationProfile,
  clearLicenseAndCertification,
  clearHealthBackground,
} = userSlice.actions;

export default userSlice.reducer;
