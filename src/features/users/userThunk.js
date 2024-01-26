import adalFetch from 'src/utils/axios';
import {
  fetchAllEducationProfiles,
  fetchAllFamilyBackgrounds,
  fetchAllHealthBackgrounds,
  fetchAllLicenseAndCertifications,
  fetchUserProfile,
  logoutUser,
} from './userSlice';

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchUsersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    thunkAPI.dispatch(fetchUserProfile());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchUserThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updatePasswordThunk = async (url, password, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, password);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Family Backrgound

export const fetchAllFamilyBackgroundsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createFamilyBackgroundThunk = async (
  url,
  familyBackground,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, familyBackground);
    thunkAPI.dispatch(fetchAllFamilyBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateFamilyBackgroundThunk = async (
  url,
  familyBackground,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, familyBackground);
    thunkAPI.dispatch(fetchAllFamilyBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteFamilyBackgroundThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllFamilyBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Education Profile

export const fetchAllEducationProfilesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createEducationProfileThunk = async (
  url,
  educationProfile,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, educationProfile);
    thunkAPI.dispatch(fetchAllEducationProfiles());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateEducationProfileThunk = async (
  url,
  educationProfile,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, educationProfile);
    thunkAPI.dispatch(fetchAllEducationProfiles());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteEducationProfileThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllEducationProfiles());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// License and Certifications

export const fetchAllLicenseAndCertificationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createLicenseAndCertificationThunk = async (
  url,
  licenseAndCertification,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, licenseAndCertification);
    thunkAPI.dispatch(fetchAllLicenseAndCertifications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateLicenseAndCertificationThunk = async (
  url,
  licenseAndCertification,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, licenseAndCertification);
    thunkAPI.dispatch(fetchAllLicenseAndCertifications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteLicenseAndCertificationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllLicenseAndCertifications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Health and Wellness

export const fetchAllHealthBackgroundsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createHealthBackgroundThunk = async (
  url,
  healthBackground,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, healthBackground);
    thunkAPI.dispatch(fetchAllHealthBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateHealthBackgroundThunk = async (
  url,
  healthBackground,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, healthBackground);
    thunkAPI.dispatch(fetchAllHealthBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteHealthBackgroundThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllHealthBackgrounds());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
