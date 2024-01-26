import adalFetch from 'src/utils/axios';
import {
  fetchAllDepartments,
  fetchAllDesignations,
  fetchAllEvents,
  fetchAllHandbooks,
  fetchAllHolidays,
  fetchAllLeaveApplications,
  fetchAllLeaveAssigns,
  fetchAllLeaveCategories,
  fetchAllNotices,
  fetchAllOrganizationalStructureFiles,
  fetchAllPolicies,
  getAllTeacherDesignations,
} from './hrSlice';

// Roles

export const fetchAllRolesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Department

export const fetchAllDepartmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createDepartmentThunk = async (url, department, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, department);
    thunkAPI.dispatch(fetchAllDepartments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteDepartmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllDepartments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateDepartmentThunk = async (url, department, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, department);
    thunkAPI.dispatch(fetchAllDepartments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Designation

export const fetchAllDesignationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createDesignationThunk = async (url, designation, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, designation);
    thunkAPI.dispatch(fetchAllDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateDesignationThunk = async (url, designation, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, designation);
    thunkAPI.dispatch(fetchAllDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getDataThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTeacherDesignationThunk = async (
  url,
  designation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, designation);
    thunkAPI.dispatch(getAllTeacherDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTeacherDesignationByIdThunk = async (
  url,
  designation,
  thunkAPI
) => {
  try {
    const response = await adalFetch.put(url, designation);
    thunkAPI.dispatch(getAllTeacherDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTeacherDesignationByIdThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllTeacherDesignations());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// File Upload

export const uploadFileThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Handbook

export const fetchAllHandbooksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadHandBookThunk = async (
  url,
  { handbook_filePath, file_name },
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, {
      handbook_filePath,
      file_name,
    });
    thunkAPI.dispatch(fetchAllHandbooks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteHandbookThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllHandbooks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Policy

export const fetchAllPoliciesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadPolicyThunk = async (
  url,
  { policy_filePath, file_name },
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, { policy_filePath, file_name });
    thunkAPI.dispatch(fetchAllPolicies());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deletePolicyThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllPolicies());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Organizational Structure

export const fetchAllOrganizationalStructureFilesThunk = async (
  url,
  thunkAPI
) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadOrganizationalStructureFileThunk = async (
  url,
  { orgChart_filePath, file_name },
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, {
      orgChart_filePath,
      file_name,
    });
    thunkAPI.dispatch(fetchAllOrganizationalStructureFiles());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteOrganizationalStructureFileThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllOrganizationalStructureFiles());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Announcements

export const fetchAllNoticesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createNoticeThunk = async (url, notice, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, notice);
    thunkAPI.dispatch(fetchAllNotices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteNoticeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllNotices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateNoticeThunk = async (url, notice, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, notice);
    thunkAPI.dispatch(fetchAllNotices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Events

export const fetchAllEventsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createEventThunk = async (url, event, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, event);
    thunkAPI.dispatch(fetchAllEvents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteEventThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllEvents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateEventThunk = async (url, event, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, event);
    thunkAPI.dispatch(fetchAllEvents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Holiday

export const fetchAllHolidaysThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createHolidayThunk = async (url, holiday, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, holiday);
    thunkAPI.dispatch(fetchAllHolidays());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteHolidayThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllHolidays());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateHolidayThunk = async (url, holiday, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, holiday);
    thunkAPI.dispatch(fetchAllHolidays());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Leave

export const fetchAllLeaveCategoriesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllLeaveAssignsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllLeaveApplicationsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// ** Leave Assign

export const createLeaveAssignThunk = async (url, leaveAssign, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, leaveAssign);
    thunkAPI.dispatch(fetchAllLeaveAssigns());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteLeaveAssignThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllLeaveAssigns());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateLeaveAssignThunk = async (url, leaveAssign, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, leaveAssign);
    thunkAPI.dispatch(fetchAllLeaveAssigns());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// ** Leave Category

export const createLeaveCategoryThunk = async (url, category, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, category);
    thunkAPI.dispatch(fetchAllLeaveCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteLeaveCategoryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllLeaveCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateLeaveCategoryThunk = async (url, category, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, category);
    thunkAPI.dispatch(fetchAllLeaveCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// ** Leave Application

export const createLeaveApplicationThunk = async (
  url,
  application,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, application);
    thunkAPI.dispatch(fetchAllLeaveApplications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteLeaveApplicationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllLeaveApplications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateLeaveApplicationThunk = async (
  url,
  application,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, application);
    thunkAPI.dispatch(fetchAllLeaveApplications());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
