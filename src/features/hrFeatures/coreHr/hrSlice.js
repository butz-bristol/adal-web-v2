import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createDepartmentThunk,
  createDesignationThunk,
  createEventThunk,
  createHolidayThunk,
  createLeaveApplicationThunk,
  createLeaveAssignThunk,
  createLeaveCategoryThunk,
  createNoticeThunk,
  createTeacherDesignationThunk,
  deleteDepartmentThunk,
  deleteDesignationThunk,
  deleteEventThunk,
  deleteHandbookThunk,
  deleteHolidayThunk,
  deleteLeaveApplicationThunk,
  deleteLeaveAssignThunk,
  deleteLeaveCategoryThunk,
  deleteNoticeThunk,
  deleteOrganizationalStructureFileThunk,
  deletePolicyThunk,
  deleteTeacherDesignationByIdThunk,
  fetchAllDepartmentsThunk,
  fetchAllDesignationsThunk,
  fetchAllEventsThunk,
  fetchAllHandbooksThunk,
  fetchAllHolidaysThunk,
  fetchAllLeaveApplicationsThunk,
  fetchAllLeaveAssignsThunk,
  fetchAllLeaveCategoriesThunk,
  fetchAllNoticesThunk,
  fetchAllOrganizationalStructureFilesThunk,
  fetchAllPoliciesThunk,
  fetchAllRolesThunk,
  getDataThunk,
  updateDepartmentThunk,
  updateDesignationThunk,
  updateEventThunk,
  updateHolidayThunk,
  updateLeaveApplicationThunk,
  updateLeaveAssignThunk,
  updateLeaveCategoryThunk,
  updateNoticeThunk,
  updateTeacherDesignationByIdThunk,
  uploadFileThunk,
  uploadHandBookThunk,
  uploadOrganizationalStructureFileThunk,
  uploadPolicyThunk
} from './hrThunk';

const initialState = {
  employees: [],
  roles: [],
  loading: false,
  userId: '',
  page: 1,

  // ** Department **

  departments: [],
  department_name: '',
  department_id: '',
  isCreatingDepartment: false,
  isDeletingDepartment: false,
  editDepartment: false,
  isEditingDepartment: false,
  isFetchingDepartments: false,

  // ** Designation **

  designations: [],
  designation_name: '',
  designation_id: '',
  isCreatingDesignation: false,
  isDeletingDesignation: false,
  editDesignation: false,
  isEditingDesignation: false,
  isFetchingDesignations: false,

  teacherDesignations: [],
  isFetchingTeacherDesignations: false,
  teacherDesignation: {},
  isFetchingTeacherDesignation: false,
  isCreatingTeacherDesignation: false,
  isUpdatingTeacherDesignation: false,
  isDeletingTeacherDesignation: false,
  isAddingTeacherDesignation: false,
  isEditingTeacherDesignation: false,



  file: '',
  image: '',
  isUploadinFile: false,
  isProcessingFile: false,
  createAnnouncement: false,
  editAnnouncement: false,
  viewAnnouncement: false,
  openFileUploadModal: false,

  // ** Handbooks **

  handbooks: [],
  isProcessingFile: false,
  isFetchingHandbooks: false,
  isDeletingHandbook: false,

  // ** Policies **

  policies: [],
  isUploadingPolicy: false,
  isFetchingPolicies: false,
  isDeletingPolicy: false,

  // ** Organizational Structure **

  organizationalCharts: [],
  isUploadingOrganizationalStructureFile: false,
  isFetchingOrganizationalStructureFiles: false,
  isDeletingOrganizationalStructureFile: false,

  // ** Notice **

  notices: [],
  notice_title: '',
  notice_description: '',
  notice_date: '',
  notice_image: '',
  editNoticeId: '',
  isCreatingNotice: false,
  isDeletingNotice: false,
  editNotice: false,
  isEditingNotice: false,
  isFetchingNotices: false,
  viewNotice: false,
  createNotice: false,
  totalNotices: 0,
  totalNoticesPages: 0,

  // ** Event **

  events: [],
  event_title: '',
  event_details: '',
  event_start_date: '',
  event_end_date: '',
  event_image: '',
  editEventId: '',
  isCreatingEvent: false,
  isDeletingEvent: false,
  editEvent: false,
  isEditingEvent: false,
  isFetchingEvents: false,
  viewEvent: false,
  createEvent: false,
  totalEvents: 0,
  totalEventsPages: 0,

  // ** Holiday **

  holidays: [],
  holiday_title: '',
  holiday_details: '',
  holiday_start_date: '',
  holiday_end_date: '',
  holiday_image: '',
  editHolidayId: '',
  isCreatingHoliday: false,
  isDeletingHoliday: false,
  editHoliday: false,
  isEditingHoliday: false,
  isFetchingHolidays: false,
  viewHoliday: false,
  createHoliday: false,
  totalHolidays: 0,
  totalHolidaysPages: 0,

  // ** Leave **

  leave_categories: [],
  leave_category_name: '',
  editLeaveCategoryId: '',
  editLeaveCategory: false,
  isCreatingLeaveCategory: false,
  isDeletingLeaveCategory: false,
  editLeaveCategory: false,
  isEditingLeaveCategory: false,
  isFetchingLeaveCategories: false,

  leave_assigns: [],
  number_of_days: '',
  editLeaveAssign: false,
  isEditingLeaveAssign: false,
  isCreatingLeaveAssign: false,
  isDeletingLeaveAssign: false,
  isFetchingLeaveAssigns: false,
  editLeaveAssignId: '',

  leave_applications: [],
  totalApplications: 0,
  totalLeaveApplicationPages: 0,
  editLeaveApplication: false,
  isEditingLeaveApplication: false,
  isCreatingLeaveApplication: false,
  isDeletingLeaveApplication: false,
  editLeaveApplicationId: '',
  isFetchingLeaveApplications: false,
  viewLeaveApplication: false,
  createLeaveApplicationModal: false,
  leave_type: '',
  leave_start_date: '',
  leave_end_date: '',
  leave_reason: '',
  leave_days: '',
  leave_status: '',
  supervisor_id: '',
  leave_reject_reason: '',

  viewLeaveBalance: false
};

// Role

export const fetchAllRoles = createAsyncThunk('hr/fetchAllRoles', async (thunkAPI) => {
  return fetchAllRolesThunk('/roles', thunkAPI);
});

// Department

export const fetchAllDepartments = createAsyncThunk('coreHr/fetchAllDepartments', async (_, thunkAPI) => {
  return fetchAllDepartmentsThunk('/departments', thunkAPI);
});

export const createDepartment = createAsyncThunk('coreHr/createDepartment', async (department, thunkAPI) => {
  return createDepartmentThunk('/departments', department, thunkAPI);
});

export const deleteDepartment = createAsyncThunk('coreHr/deleteDepartment', async (departmentId, thunkAPI) => {
  return deleteDepartmentThunk(`/departments/${departmentId}`, thunkAPI);
});

export const updateDepartment = createAsyncThunk('coreHr/updateDepartment', async (department, thunkAPI) => {
  return updateDepartmentThunk(`/departments/${department.department_id}`, department, thunkAPI);
});

// Designation

export const fetchAllDesignations = createAsyncThunk('coreHr/fetchAllDesignations', async (_, thunkAPI) => {
  return fetchAllDesignationsThunk('/designations', thunkAPI);
});

export const createDesignation = createAsyncThunk('coreHr/createDesignation', async (designation, thunkAPI) => {
  return createDesignationThunk('/designations', designation, thunkAPI);
});

export const deleteDesignation = createAsyncThunk('coreHr/deleteDesignation', async (designationId, thunkAPI) => {
  return deleteDesignationThunk(`/designations/${designationId}`, thunkAPI);
});

export const updateDesignation = createAsyncThunk('coreHr/updateDesignation', async (designation, thunkAPI) => {
  return updateDesignationThunk(`/designations/${designation.designation_id}`, designation, thunkAPI);
});

export const createTeacherDesignation = createAsyncThunk('coreHr/createTeacherDesignation', async (designation, thunkAPI) => {
  return createTeacherDesignationThunk('/teacher-designations', designation, thunkAPI);
});

export const getAllTeacherDesignations = createAsyncThunk('coreHr/getAllTeacherDesignations', async (_, thunkAPI) => {
  return getDataThunk('/teacher-designations', thunkAPI);
});

export const updateTeacherDesignationById = createAsyncThunk('coreHr/updateTeacherDesignationById', async (designation, thunkAPI) => {
  return updateTeacherDesignationByIdThunk(`/teacher-designations/${designation._id}`, designation, thunkAPI);
});

export const getTeacherDesignationById = createAsyncThunk('coreHr/getTeacherDesignationById', async (id, thunkAPI) => {
  return getDataThunk(`/teacher-designations/${id}`, thunkAPI);
});

export const deleteTeacherDesignationById = createAsyncThunk('coreHr/deleteTeacherDesignationById', async (id, thunkAPI) => {
  return deleteTeacherDesignationByIdThunk(`/teacher-designations/${id}`, thunkAPI);
});

// File Upload

export const uploadFile = createAsyncThunk('coreHr/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const uploadImage = createAsyncThunk('coreHr/uploadImage', async (formData, thunkAPI) => {
  return uploadFileThunk('/image-upload', formData, thunkAPI);
});

// HandBook

export const fetchAllHandbooks = createAsyncThunk('coreHr/fetchAllHandbooks', async (_, thunkAPI) => {
  return fetchAllHandbooksThunk('/employee-handbook', thunkAPI);
});

export const uploadHandBook = createAsyncThunk('coreHr/uploadHandBook', async (handbook, thunkAPI) => {
  return uploadHandBookThunk('/employee-handbook', handbook, thunkAPI);
});

export const deleteHandBook = createAsyncThunk('coreHr/deleteHandBook', async (handbookId, thunkAPI) => {
  return deleteHandbookThunk(`/employee-handbook/${handbookId}`, thunkAPI);
});

// Policy

export const fetchAllPolicies = createAsyncThunk('coreHr/fetchAllPolicies', async (_, thunkAPI) => {
  return fetchAllPoliciesThunk('/policies', thunkAPI);
});

export const uploadPolicy = createAsyncThunk('coreHr/uploadPolicy', async (policy, thunkAPI) => {
  return uploadPolicyThunk('/policies', policy, thunkAPI);
});

export const deletePolicy = createAsyncThunk('coreHr/deletePolicy', async (policyId, thunkAPI) => {
  return deletePolicyThunk(`/policies/${policyId}`, thunkAPI);
});

// Organizational Structure

export const fetchAllOrganizationalStructureFiles = createAsyncThunk('coreHr/fetchAllOrganizationalStructureFiles', async (_, thunkAPI) => {
  return fetchAllOrganizationalStructureFilesThunk('/organizational-chart', thunkAPI);
});

export const uploadOrganizationalStructureFile = createAsyncThunk('coreHr/uploadOrganizationalStructureFile', async (file, thunkAPI) => {
  return uploadOrganizationalStructureFileThunk('/organizational-chart', file, thunkAPI);
});

export const deleteOrganizationalStructureFile = createAsyncThunk('coreHr/deleteOrganizationalStructureFile', async (fileId, thunkAPI) => {
  return deleteOrganizationalStructureFileThunk(`/organizational-chart/${fileId}`, thunkAPI);
});

// Announcements

export const fetchAllNotices = createAsyncThunk('coreHr/fetchAllNotices', async (_, thunkAPI) => {
  return fetchAllNoticesThunk('/announcements/notices', thunkAPI);
});

export const createNotice = createAsyncThunk('coreHr/createNotice', async (notice, thunkAPI) => {
  return createNoticeThunk('/announcements/notices', notice, thunkAPI);
});

export const deleteNotice = createAsyncThunk('coreHr/deleteNotice', async (noticeId, thunkAPI) => {
  return deleteNoticeThunk(`/announcements/notices/${noticeId}`, thunkAPI);
});

export const updateNotice = createAsyncThunk('coreHr/updateNotice', async (notice, thunkAPI) => {
  return updateNoticeThunk(`/announcements/notices/${notice.editNoticeId}`, notice, thunkAPI);
});

// Events

export const fetchAllEvents = createAsyncThunk('coreHr/fetchAllEvents', async (_, thunkAPI) => {
  return fetchAllEventsThunk('/announcements/events', thunkAPI);
});

export const createEvent = createAsyncThunk('coreHr/createEvent', async (event, thunkAPI) => {
  return createEventThunk('/announcements/events', event, thunkAPI);
});

export const deleteEvent = createAsyncThunk('coreHr/deleteEvent', async (eventId, thunkAPI) => {
  return deleteEventThunk(`/announcements/events/${eventId}`, thunkAPI);
});

export const updateEvent = createAsyncThunk('coreHr/updateEvent', async (event, thunkAPI) => {
  return updateEventThunk(`/announcements/events/${event.editEventId}`, event, thunkAPI);
});

// Holidays

export const fetchAllHolidays = createAsyncThunk('coreHr/fetchAllHolidays', async (_, thunkAPI) => {
  return fetchAllHolidaysThunk('/announcements/holidays', thunkAPI);
});

export const createHoliday = createAsyncThunk('coreHr/createHoliday', async (holiday, thunkAPI) => {
  return createHolidayThunk('/announcements/holidays', holiday, thunkAPI);
});

export const deleteHoliday = createAsyncThunk('coreHr/deleteHoliday', async (holidayId, thunkAPI) => {
  return deleteHolidayThunk(`/announcements/holidays/${holidayId}`, thunkAPI);
});

export const updateHoliday = createAsyncThunk('coreHr/updateHoliday', async (holiday, thunkAPI) => {
  return updateHolidayThunk(`/announcements/holidays/${holiday.editHolidayId}`, holiday, thunkAPI);
});

// Leave

export const fetchAllLeaveApplications = createAsyncThunk('coreHr/fetchAllLeaves', async (_, thunkAPI) => {
  return fetchAllLeaveApplicationsThunk(`/leaves/application?page=${thunkAPI.getState().coreHr.page}`, thunkAPI);
});

export const fetchAllLeaveCategories = createAsyncThunk('coreHr/fetchAllLeaveCategories', async (_, thunkAPI) => {
  return fetchAllLeaveCategoriesThunk('/leaves/category', thunkAPI);
});

export const fetchAllLeaveAssigns = createAsyncThunk('coreHr/fetchAllLeaveAssigns', async (_, thunkAPI) => {
  return fetchAllLeaveAssignsThunk('/leaves/assign', thunkAPI);
});

// ** Leave Categories

export const createLeaveCategory = createAsyncThunk('coreHr/createLeaveCategory', async (leaveCategory, thunkAPI) => {
  return createLeaveCategoryThunk('/leaves/category', leaveCategory, thunkAPI);
});

export const deleteLeaveCategory = createAsyncThunk('coreHr/deleteLeaveCategory', async (leaveCategoryId, thunkAPI) => {
  return deleteLeaveCategoryThunk(`/leaves/category/${leaveCategoryId}`, thunkAPI);
});

export const updateLeaveCategory = createAsyncThunk('coreHr/updateLeaveCategory', async (leaveCategory, thunkAPI) => {
  return updateLeaveCategoryThunk(`/leaves/category/${leaveCategory.leaveCategoryId}`, leaveCategory, thunkAPI);
});

// ** Leave Assigns

export const createLeaveAssign = createAsyncThunk('coreHr/createLeaveAssign', async (leaveAssign, thunkAPI) => {
  return createLeaveAssignThunk('/leaves/assign', leaveAssign, thunkAPI);
});

export const deleteLeaveAssign = createAsyncThunk('coreHr/deleteLeaveAssign', async (leaveAssignId, thunkAPI) => {
  return deleteLeaveAssignThunk(`/leaves/assign/${leaveAssignId}`, thunkAPI);
});

export const updateLeaveAssign = createAsyncThunk('coreHr/updateLeaveAssign', async (leaveAssign, thunkAPI) => {
  return updateLeaveAssignThunk(`/leaves/assign/${leaveAssign.leaveAssignId}`, leaveAssign, thunkAPI);
});

// ** Leave Applications

export const createLeaveApplication = createAsyncThunk('coreHr/createLeaveApplication', async (leaveApplication, thunkAPI) => {
  return createLeaveApplicationThunk('/leaves/application', leaveApplication, thunkAPI);
});

export const deleteLeaveApplication = createAsyncThunk('coreHr/deleteLeaveApplication', async (leaveApplicationId, thunkAPI) => {
  return deleteLeaveApplicationThunk(`/leaves/application/${leaveApplicationId}`, thunkAPI);
});

export const updateLeaveApplication = createAsyncThunk('coreHr/updateLeaveApplication', async (leaveApplication, thunkAPI) => {
  return updateLeaveApplicationThunk(`/leaves/application/${leaveApplication.leaveApplicationId}`, leaveApplication, thunkAPI);
});

const hrSlice = createSlice({
  name: 'coreHr',
  initialState,
  reducers: {
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    resetDepartmentName: (state) => {
      state.department_name = '';
    },
    setDepartment: (state, action) => {
      state.department_id = action.payload._id;
      state.department_name = action.payload.department_name;
    },
    toggleEditingDepartment: (state) => {
      state.editDepartment = !state.editDepartment;
    },
    setDesignation: (state, action) => {
      state.designation_id = action.payload._id;
      state.department_id = action.payload.department_id?._id;
      state.designation_name = action.payload.designation_name;
    },
    toggleEditingDesignation: (state) => {
      state.editDesignation = !state.editDesignation;
    },
    clearDepartmentValues: (state) => {
      state.department_id = '';
      state.department_name = '';
      state.editDepartment = false;
    },
    clearDesignationValues: (state) => {
      state.department_id = '';
      state.designation_name = '';
      state.editDesignation = false;
    },
    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    clearFile: (state) => {
      state.file = '';
      state.image = '';
    },
    toggleCreateAnnouncementModal: (state) => {
      state.createAnnouncement = !state.createAnnouncement;
    },
    toggleEditAnnouncementModal: (state) => {
      state.editAnnouncement = !state.editAnnouncement;
    },
    toggleViewAnnouncementModal: (state) => {
      state.viewAnnouncement = !state.viewAnnouncement;
    },
    closeAnnouncementModal: (state) => {
      state.createAnnouncement = false;
      state.editAnnouncement = false;
    },
    setEvent: (state, action) => {
      state.editEventId = action.payload._id;
      state.event_title = action.payload.event_title;
      state.event_details = action.payload.event_details;
      state.event_start_date = action.payload.event_start_date;
      state.event_end_date = action.payload.event_end_date;
      state.department_id = action.payload.department_id?._id;
      state.image = action.payload.event_image;
    },
    setHoliday: (state, action) => {
      state.editHolidayId = action.payload._id;
      state.holiday_title = action.payload.holiday_title;
      state.holiday_details = action.payload.holiday_details;
      state.holiday_start_date = action.payload.holiday_start_date;
      state.holiday_end_date = action.payload.holiday_end_date;
      state.department_id = action.payload.department_id?._id;
      state.image = action.payload.holiday_image;
    },
    setNotice: (state, action) => {
      state.editNoticeId = action.payload._id;
      state.notice_title = action.payload.notice_title;
      state.notice_description = action.payload.notice_description;
      state.notice_date = action.payload.notice_date;
      state.department_id = action.payload.department_id?._id;
      state.image = action.payload.notice_image;
    },
    clearAnnouncementValues: (state) => {
      state.event_title = '';
      state.event_details = '';
      state.event_start_date = '';
      state.event_end_date = '';
      state.holiday_title = '';
      state.holiday_details = '';
      state.holiday_start_date = '';
      state.holiday_end_date = '';
      state.notice_title = '';
      state.notice_description = '';
      state.notice_date = '';
      state.department_id = '';
      state.image = '';
    },
    toggleEditingLeaveCategory: (state) => {
      state.editLeaveCategory = !state.editLeaveCategory;
    },
    toggleEditingLeaveAssign: (state) => {
      state.editLeaveAssign = !state.editLeaveAssign;
    },
    toggleCreateLeaveApplicationModal: (state) => {
      state.createLeaveApplicationModal = !state.createLeaveApplicationModal;
    },
    toggleEditingLeaveApplication: (state) => {
      state.editLeaveApplication = !state.editLeaveApplication;
    },
    clearLeaveValues: (state) => {
      state.leave_category_name = '';
      state.number_of_days = '';
      state.isEditingLeaveAssign = false;
      state.isEditingLeaveApplication = false;
      state.isEditingLeaveCategory = false;
      state.editLeaveAssign = false;
      state.editLeaveApplication = false;
      state.editLeaveCategory = false;
      state.createLeaveApplicationModal = false;
      state.leave_reject_reason = '';
      state.leave_days = '';
      state.leave_start_date = '';
      state.leave_end_date = '';
      state.leave_reason = '';
      state.leave_type = '';
      state.editLeaveApplicationId = '';
      state.supervisor_id = '';
      state.userId = '';
    },
    setLeaveCategory: (state, action) => {
      state.editLeaveCategoryId = action.payload._id;
      state.leave_category_name = action.payload.leave_category_name;
    },
    setLeaveAssign: (state, action) => {
      state.editLeaveAssignId = action.payload._id;
      state.leave_category_name = action.payload.leave_category_name;
      state.number_of_days = action.payload.number_of_days;
    },
    setLeaveApplication: (state, action) => {
      state.editLeaveApplicationId = action.payload._id;
      state.leave_type = action.payload.leave_type?._id;
      state.leave_days = action.payload.leave_days;
      state.leave_start_date = action.payload.leave_start_date;
      state.leave_end_date = action.payload.leave_end_date;
      state.leave_reason = action.payload.leave_reason;
      state.leave_status = action.payload.leave_status;
      state.supervisor_id = action.payload.supervisor_id?._id;
      state.userId = action.payload.userId?._id;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    toggleLeaveBalance: (state) => {
      state.viewLeaveBalance = !state.viewLeaveBalance;
    },
    toggleAddTeacherDesignation(state) {
      state.isAddingTeacherDesignation = !state.isAddingTeacherDesignation;
      state.teacherDesignation = initialState.teacherDesignation;
    },
    toggleEditTeacherDesignation(state) {
      state.isEditingTeacherDesignation = !state.isEditingTeacherDesignation;
    },
    setTeacherDesignation(state, action) {
      state.teacherDesignation = action.payload;
    },
    clearTeacherDesignation(state) {
      state.teacherDesignation = initialState.teacherDesignation;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllRoles.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload.roles;
    })
    .addCase(fetchAllRoles.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchAllDepartments.pending, (state) => {
      state.isFetchingDepartments = true;
    })
    .addCase(fetchAllDepartments.fulfilled, (state, { payload }) => {
      state.departments = payload.departments;
      state.isFetchingDepartments = false;
    })
    .addCase(fetchAllDepartments.rejected, (state) => {
      state.isFetchingDepartments = false;
    })
    .addCase(createDepartment.pending, (state) => {
      state.isCreatingDepartment = true;
    })
    .addCase(createDepartment.fulfilled, (state) => {
      state.isCreatingDepartment = false;
      toast.success('Department created successfully');
    })
    .addCase(createDepartment.rejected, (state, { payload }) => {
      state.isCreatingDepartment = false;
      toast.error(payload.msg);
    })
    .addCase(deleteDepartment.pending, (state) => {
      state.isDeletingDepartment = true;
    })
    .addCase(deleteDepartment.fulfilled, (state) => {
      state.isDeletingDepartment = false;
      toast.success('Department deleted successfully');
    })
    .addCase(deleteDepartment.rejected, (state, { payload }) => {
      state.isDeletingDepartment = false;
      toast.error(payload.msg);
    })
    .addCase(updateDepartment.pending, (state) => {
      state.isEditingDepartment = true;
    })
    .addCase(updateDepartment.fulfilled, (state) => {
      state.isEditingDepartment = false;
      state.editDepartment = false;
      state.department_name = '';
      state.department_id = '';
      toast.success('Department updated successfully');
    })
    .addCase(updateDepartment.rejected, (state, { payload }) => {
      state.isEditingDepartment = false;
      toast.error(payload);
    })
    .addCase(fetchAllDesignations.pending, (state) => {
      state.isFetchingDesignations = true;
    })
    .addCase(fetchAllDesignations.fulfilled, (state, { payload }) => {
      state.designations = payload.designations;
      state.isFetchingDesignations = false;
    })
    .addCase(fetchAllDesignations.rejected, (state) => {
      state.isFetchingDesignations = false;
    })
    .addCase(createDesignation.pending, (state) => {
      state.isCreatingDesignation = true;
    })
    .addCase(createDesignation.fulfilled, (state) => {
      state.isCreatingDesignation = false;
      state.designation_name = '';
      state.designation_id = '';
      toast.success('Designation created successfully');
    })
    .addCase(createDesignation.rejected, (state, { payload }) => {
      state.isCreatingDesignation = false;
      toast.error(payload.msg);
    })
    .addCase(deleteDesignation.pending, (state) => {
      state.isDeletingDesignation = true;
    })
    .addCase(deleteDesignation.fulfilled, (state) => {
      state.isDeletingDesignation = false;
      toast.success('Designation deleted successfully');
    })
    .addCase(deleteDesignation.rejected, (state, { payload }) => {
      state.isDeletingDesignation = false;
      toast.error(payload.msg);
    })
    .addCase(updateDesignation.pending, (state) => {
      state.isEditingDesignation = true;
    })
    .addCase(updateDesignation.fulfilled, (state) => {
      state.isEditingDesignation = false;
      state.editDesignation = false;
      state.designation_name = '';
      state.designation_id = '';
      toast.success('Designation updated successfully');
    })
    .addCase(updateDesignation.rejected, (state, { payload }) => {
      state.isEditingDesignation = false;
      toast.error(payload.msg);
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
    .addCase(uploadImage.pending, (state) => {
      state.isUploadingFile = true;
    })
    .addCase(uploadImage.fulfilled, (state, { payload }) => {
      state.isUploadingFile = false;
      state.image = payload.data;
      toast.success('Image uploaded successfully');
    })
    .addCase(uploadImage.rejected, (state, { payload }) => {
      state.isUploadingFile = false;
      toast.error(payload.msg);
    })
    .addCase(uploadHandBook.pending, (state) => {
      state.isProcessingFile = true;
    })
    .addCase(uploadHandBook.fulfilled, (state) => {
      state.openFileUploadModal = false;
      state.isProcessingFile = false;
      state.file = '';
      toast.success('Handbook uploaded successfully');
    })
    .addCase(uploadHandBook.rejected, (state, { payload }) => {
      state.isProcessingFile = false;
      toast.error(payload);
    })
    .addCase(fetchAllHandbooks.pending, (state) => {
      state.isFetchingHandbooks = true;
    })
    .addCase(fetchAllHandbooks.fulfilled, (state, { payload }) => {
      state.isFetchingHandbooks = false;
      state.handbooks = payload.employeeHandbooks;
    })
    .addCase(fetchAllHandbooks.rejected, (state, { payload }) => {
      state.isFetchingHandbooks = false;
      toast.error(payload.msg);
    })
    .addCase(deleteHandBook.pending, (state) => {
      state.isDeletingHandbook = true;
      toast.info('Deleting handbook...');
    })
    .addCase(deleteHandBook.fulfilled, (state) => {
      state.isDeletingHandbook = false;
      toast.success('Handbook deleted successfully');
    })
    .addCase(deleteHandBook.rejected, (state, { payload }) => {
      state.isDeletingHandbook = false;
      toast.error(payload.msg);
    })
    .addCase(uploadPolicy.pending, (state) => {
      state.isUploadingPolicy = true;
    })
    .addCase(uploadPolicy.fulfilled, (state) => {
      state.openPolicyModal = false;
      state.isProcessingFile = false;
    
      state.file = '';
      toast.success('Policy uploaded successfully');
    })
    .addCase(uploadPolicy.rejected, (state, { payload }) => {
      state.isProcessingFile = false;
    
      toast.error(payload);
    })
    .addCase(fetchAllPolicies.pending, (state) => {
      state.isFetchingPolicies = true;
    })
    .addCase(fetchAllPolicies.fulfilled, (state, { payload }) => {
      state.isFetchingPolicies = false;
      state.policies = payload.policies;
    })
    .addCase(fetchAllPolicies.rejected, (state, { payload }) => {
      state.isFetchingPolicies = false;
      toast.error(payload.msg);
    })
    .addCase(deletePolicy.pending, (state) => {
      state.isDeletingPolicy = true;
      toast.info('Deleting policy...');
    })
    .addCase(deletePolicy.fulfilled, (state) => {
      state.isDeletingPolicy = false;
      toast.success('Policy deleted successfully');
    })
    .addCase(deletePolicy.rejected, (state, { payload }) => {
      state.isDeletingPolicy = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllOrganizationalStructureFiles.pending, (state) => {
      state.isFetchingOrganizationalStructureFiles = true;
    })
    .addCase(fetchAllOrganizationalStructureFiles.fulfilled, (state, { payload }) => {
      state.isFetchingOrganizationalStructureFiles = false;
      state.organizationalCharts = payload.organizationalCharts;
    })
    .addCase(fetchAllOrganizationalStructureFiles.rejected, (state, { payload }) => {
      state.isFetchingOrganizationalStructureFiles = false;
      toast.error(payload.msg);
    })
    .addCase(uploadOrganizationalStructureFile.pending, (state) => {
      state.isUploadingOrganizationalStructureFile = true;
    })
    .addCase(uploadOrganizationalStructureFile.fulfilled, (state) => {
      state.openOrganizationalStructureFileModal = false;
      state.isProcessingFile = false;
      state.file = '';
      toast.success('Organizational Chart uploaded successfully');
    })
    .addCase(uploadOrganizationalStructureFile.rejected, (state, { payload }) => {
      state.isUploadingOrganizationalStructureFile = false;
      toast.error(payload);
    })
    .addCase(deleteOrganizationalStructureFile.pending, (state) => {
      state.isDeletingOrganizationalStructureFile = true;
      toast.info('Deleting file...');
    })
    .addCase(deleteOrganizationalStructureFile.fulfilled, (state) => {
      state.isDeletingOrganizationalStructureFile = false;
      toast.success('Organizational Chart deleted successfully');
    })
    .addCase(deleteOrganizationalStructureFile.rejected, (state, { payload }) => {
      state.isDeletingOrganizationalStructureFile = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllNotices.pending, (state) => {
      state.isFetchingNotices = true;
    })
    .addCase(fetchAllNotices.fulfilled, (state, { payload }) => {
      state.isFetchingNotices = false;
      state.notices = payload.notices;
      state.totalNotices = payload.totalNotices;
      state.totalNoticesPages = payload.totalPages;
    })
    .addCase(fetchAllNotices.rejected, (state, { payload }) => {
      state.isFetchingNotices = false;
      toast.error(payload.msg);
    })
    .addCase(createNotice.pending, (state) => {
      state.isCreatingNotice = true;
    })
    .addCase(createNotice.fulfilled, (state) => {
      state.isCreatingNotice = false;
      state.notice_title = '';
      state.notice_date = '';
      state.notice_description = '';
      state.notice_image = '';
      state.image = '';
      state.createAnnouncement = false;
      toast.success('Notice created successfully');
    })
    .addCase(createNotice.rejected, (state, { payload }) => {
      state.isCreatingNotice = false;
      toast.error(payload.msg);
    })
    .addCase(deleteNotice.pending, (state) => {
      state.isDeletingNotice = true;
      toast.info('Deleting notice...');
    })
    .addCase(deleteNotice.fulfilled, (state) => {
      state.isDeletingNotice = false;
      toast.success('Notice deleted successfully');
    })
    .addCase(deleteNotice.rejected, (state, { payload }) => {
      state.isDeletingNotice = false;
      toast.error(payload.msg);
    })
    .addCase(updateNotice.pending, (state) => {
      state.isEditingNotice = true;
    })
    .addCase(updateNotice.fulfilled, (state) => {
      state.isEditingNotice = false;
      state.editNotice = false;
      state.notice_title = '';
      state.notice_date = '';
      state.notice_description = '';
      state.notice_image = '';
      state.notice_id = '';
      state.image = '';
      state.createAnnouncement = false;
      state.editAnnouncement = false;
      toast.success('Notice updated successfully');
    })
    .addCase(updateNotice.rejected, (state, { payload }) => {
      state.isEditingNotice = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllEvents.pending, (state) => {
      state.isFetchingEvents = true;
    })
    .addCase(fetchAllEvents.fulfilled, (state, { payload }) => {
      state.isFetchingEvents = false;
      state.events = payload.events;
      state.totalEvents = payload.totalEvents;
      state.totalEventsPages = payload.totalPages;
    })
    .addCase(fetchAllEvents.rejected, (state, { payload }) => {
      state.isFetchingEvents = false;
      toast.error(payload.msg);
    })
    .addCase(createEvent.pending, (state) => {
      state.isCreatingEvent = true;
    })
    .addCase(createEvent.fulfilled, (state) => {
      state.isCreatingEvent = false;
      state.event_title = '';
      state.event_start_date = '';
      state.event_end_date = '';
      state.event_details = '';
      state.event_image = '';
      state.image = '';
      state.createAnnouncement = false;
      toast.success('Event created successfully');
    })
    .addCase(createEvent.rejected, (state, { payload }) => {
      state.isCreatingEvent = false;
      toast.error(payload.msg);
    })
    .addCase(deleteEvent.pending, (state) => {
      state.isDeletingEvent = true;
      toast.info('Deleting event...');
    })
    .addCase(deleteEvent.fulfilled, (state) => {
      state.isDeletingEvent = false;
      toast.success('Event deleted successfully');
    })
    .addCase(deleteEvent.rejected, (state, { payload }) => {
      state.isDeletingEvent = false;
      toast.error(payload.msg);
    })
    .addCase(updateEvent.pending, (state) => {
      state.isEditingEvent = true;
    })
    .addCase(updateEvent.fulfilled, (state) => {
      state.isEditingEvent = false;
      state.editEvent = false;
      state.event_title = '';
      state.event_start_date = '';
      state.event_end_date = '';
      state.event_details = '';
      state.event_image = '';
      state.event_id = '';
      state.image = '';
      state.editAnnouncement = false;
      toast.success('Event updated successfully');
    })
    .addCase(updateEvent.rejected, (state, { payload }) => {
      state.isEditingEvent = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllHolidays.pending, (state) => {
      state.isFetchingHolidays = true;
    })
    .addCase(fetchAllHolidays.fulfilled, (state, { payload }) => {
      state.isFetchingHolidays = false;
      state.holidays = payload.holidays;
      state.totalHolidays = payload.totalHolidays;
      state.totalHolidaysPages = payload.totalPages;
    })
    .addCase(fetchAllHolidays.rejected, (state, { payload }) => {
      state.isFetchingHolidays = false;
      toast.error(payload.msg);
    })
    .addCase(createHoliday.pending, (state) => {
      state.isCreatingHoliday = true;
    })
    .addCase(createHoliday.fulfilled, (state) => {
      state.isCreatingHoliday = false;
      state.holiday_title = '';
      state.holiday_start_date = '';
      state.holiday_end_date = '';
      state.holiday_details = '';
      state.holiday_image = '';
      state.image = '';
      state.createAnnouncement = false;
      toast.success('Holiday created successfully');
    })
    .addCase(createHoliday.rejected, (state, { payload }) => {
      state.isCreatingHoliday = false;
      toast.error(payload.msg);
    })
    .addCase(deleteHoliday.pending, (state) => {
      state.isDeletingHoliday = true;
      toast.info('Deleting holiday...');
    })
    .addCase(deleteHoliday.fulfilled, (state) => {
      state.isDeletingHoliday = false;
      toast.success('Holiday deleted successfully');
    })
    .addCase(deleteHoliday.rejected, (state, { payload }) => {
      state.isDeletingHoliday = false;
      toast.error(payload.msg);
    })
    .addCase(updateHoliday.pending, (state) => {
      state.isEditingHoliday = true;
    })
    .addCase(updateHoliday.fulfilled, (state) => {
      state.isEditingHoliday = false;
      state.editHoliday = false;
      state.holiday_title = '';
      state.holiday_start_date = '';
      state.holiday_end_date = '';
      state.holiday_details = '';
      state.holiday_image = '';
      state.image = '';
      state.editAnnouncement = false;
      toast.success('Holiday updated successfully');
    })
    .addCase(updateHoliday.rejected, (state, { payload }) => {
      state.isEditingHoliday = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllLeaveCategories.pending, (state) => {
      state.isFetchingLeaveCategories = true;
    })
    .addCase(fetchAllLeaveCategories.fulfilled, (state, { payload }) => {
      state.isFetchingLeaveCategories = false;
      state.leave_categories = payload.leaveCategories;
    })
    .addCase(fetchAllLeaveCategories.rejected, (state, { payload }) => {
      state.isFetchingLeaveCategories = false;
      toast.error(payload.msg);
    })
    .addCase(createLeaveCategory.pending, (state) => {
      state.isCreatingLeaveCategory = true;
    })
    .addCase(createLeaveCategory.fulfilled, (state) => {
      state.isCreatingLeaveCategory = false;
      state.leave_category_name = '';
      toast.success('Leave category created successfully');
    })
    .addCase(createLeaveCategory.rejected, (state, { payload }) => {
      state.isCreatingLeaveCategory = false;
      toast.error(payload.msg);
    })
    .addCase(deleteLeaveCategory.pending, (state) => {
      state.isDeletingLeaveCategory = true;
      toast.info('Deleting leave category...');
    })
    .addCase(deleteLeaveCategory.fulfilled, (state) => {
      state.isDeletingLeaveCategory = false;
      toast.success('Leave category deleted successfully');
    })
    .addCase(deleteLeaveCategory.rejected, (state, { payload }) => {
      state.isDeletingLeaveCategory = false;
      toast.error(payload.msg);
    })
    .addCase(updateLeaveCategory.pending, (state) => {
      state.isEditingLeaveCategory = true;
    })
    .addCase(updateLeaveCategory.fulfilled, (state) => {
      state.isEditingLeaveCategory = false;
      state.editLeaveCategory = false;
      state.leave_category_name = '';
      toast.success('Leave category updated successfully');
    })
    .addCase(updateLeaveCategory.rejected, (state, { payload }) => {
      state.isEditingLeaveCategory = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllLeaveAssigns.pending, (state) => {
      state.isFetchingLeaveAssigns = true;
    })
    .addCase(fetchAllLeaveAssigns.fulfilled, (state, { payload }) => {
      state.isFetchingLeaveAssigns = false;
      state.leave_assigns = payload.leaves;
    })
    .addCase(fetchAllLeaveAssigns.rejected, (state, { payload }) => {
      state.isFetchingLeaveAssigns = false;
      toast.error(payload.msg);
    })
    .addCase(createLeaveAssign.pending, (state) => {
      state.isCreatingLeaveAssign = true;
    })
    .addCase(createLeaveAssign.fulfilled, (state) => {
      state.isCreatingLeaveAssign = false;
      state.leave_assign_name = '';
      state.number_of_days = '';
      toast.success('Leave assign created successfully');
    })
    .addCase(createLeaveAssign.rejected, (state, { payload }) => {
      state.isCreatingLeaveAssign = false;
      toast.error(payload.msg);
    })
    .addCase(deleteLeaveAssign.pending, (state) => {
      state.isDeletingLeaveAssign = true;
      toast.info('Deleting leave assign...');
    })
    .addCase(deleteLeaveAssign.fulfilled, (state) => {
      state.isDeletingLeaveAssign = false;
      toast.success('Leave assign deleted successfully');
    })
    .addCase(deleteLeaveAssign.rejected, (state, { payload }) => {
      state.isDeletingLeaveAssign = false;
      toast.error(payload.msg);
    })
    .addCase(updateLeaveAssign.pending, (state) => {
      state.isEditingLeaveAssign = true;
    })
    .addCase(updateLeaveAssign.fulfilled, (state) => {
      state.isEditingLeaveAssign = false;
      state.editLeaveAssign = false;
      state.leave_assign_name = '';
      state.number_of_days = '';
      toast.success('Leave assign updated successfully');
    })
    .addCase(updateLeaveAssign.rejected, (state, { payload }) => {
      state.isEditingLeaveAssign = false;
      toast.error(payload.msg);
    })
    .addCase(fetchAllLeaveApplications.pending, (state) => {
      state.isFetchingLeaveApplications = true;
    })
    .addCase(fetchAllLeaveApplications.fulfilled, (state, { payload }) => {
      state.isFetchingLeaveApplications = false;
      state.leave_applications = payload.leaveApplications;
      state.totalApplications = payload.totalApplications;
      state.totalLeaveApplicationPages = payload.totalPages;
    })
    .addCase(fetchAllLeaveApplications.rejected, (state, { payload }) => {
      state.isFetchingLeaveApplications = false;
      toast.error(payload.msg);
    })
    .addCase(createLeaveApplication.pending, (state) => {
      state.isCreatingLeaveApplication = true;
    })
    .addCase(createLeaveApplication.fulfilled, (state) => {
      state.isCreatingLeaveApplication = false;
      state.leave_type = '';
      state.leave_start_date = '';
      state.leave_end_date = '';
      state.leave_reason = '';
      state.leave_days = '';
      state.createLeaveApplicationModal = false;
      toast.success('Leave application created successfully');
    })
    .addCase(createLeaveApplication.rejected, (state, { payload }) => {
      state.isCreatingLeaveApplication = false;
      toast.error(payload.msg);
    })
    .addCase(deleteLeaveApplication.pending, (state) => {
      state.isDeletingLeaveApplication = true;
      toast.info('Deleting leave application...');
    })
    .addCase(deleteLeaveApplication.fulfilled, (state) => {
      state.isDeletingLeaveApplication = false;
      toast.success('Leave application deleted successfully');
    })
    .addCase(deleteLeaveApplication.rejected, (state, { payload }) => {
      state.isDeletingLeaveApplication = false;
      toast.error(payload.msg);
    })
    .addCase(updateLeaveApplication.pending, (state) => {
      state.isEditingLeaveApplication = true;
    })
    .addCase(updateLeaveApplication.fulfilled, (state) => {
      state.isEditingLeaveApplication = false;
      state.editLeaveApplication = false;
      state.leave_type = '';
      state.leave_start_date = '';
      state.leave_end_date = '';
      state.leave_reason = '';
      state.leave_days = '';
      state.leave_reject_reason = '';
      toast.success('Leave application updated successfully');
    })
    .addCase(updateLeaveApplication.rejected, (state, { payload }) => {
      state.isEditingLeaveApplication = false;
      toast.error(payload.msg);
    })
    .addCase(getAllTeacherDesignations.pending, (state) => {
      state.isFetchingTeacherDesignations = true;
    })
    .addCase(getAllTeacherDesignations.fulfilled, (state, { payload }) => {
      state.isFetchingTeacherDesignations = false;
      state.teacherDesignations = payload.teacherDesignations;
    })
    .addCase(getAllTeacherDesignations.rejected, (state) => {
      state.isFetchingTeacherDesignations = false;
    })
    .addCase(getTeacherDesignationById.pending, (state) => {
      state.isFetchingTeacherDesignation = true;
    })
    .addCase(getTeacherDesignationById.fulfilled, (state, { payload }) => {
      state.isFetchingTeacherDesignation = false;
      state.teacherDesignation = payload.teacherDesignation;
    })
    .addCase(getTeacherDesignationById.rejected, (state) => {
      state.isFetchingTeacherDesignation = false;
    })
    .addCase(createTeacherDesignation.pending, (state) => {
      state.isCreatingTeacherDesignation = true;
    })
    .addCase(createTeacherDesignation.fulfilled, (state) => {
      state.isCreatingTeacherDesignation = false;
      state.teacherDesignation = initialState.teacherDesignation;
      toast.success('Designation successfully added!');
    })
    .addCase(createTeacherDesignation.rejected, (state, { payload }) => {
      state.isCreatingTeacherDesignation = false;
      toast.error(payload);
    })
    .addCase(updateTeacherDesignationById.pending, (state) => {
      state.isUpdatingTeacherDesignation = true;
    })
    .addCase(updateTeacherDesignationById.fulfilled, (state, { payload }) => {
      state.isUpdatingTeacherDesignation = false;
      toast.success('Designation successfully updated!');
    })
    .addCase(updateTeacherDesignationById.rejected, (state, { payload }) => {
      state.isUpdatingTeacherDesignation = false;
      toast.error(payload);
    })
    .addCase(deleteTeacherDesignationById.pending, (state) => {
      state.isDeletingTeacherDesignation = true;
    })
    .addCase(deleteTeacherDesignationById.fulfilled, (state) => {
      state.isDeletingTeacherDesignation = false;
      toast.success('Designation successfully deleted!');
    })
    .addCase(deleteTeacherDesignationById.rejected, (state, { payload }) => {
      state.isDeletingTeacherDesignation = false;
      toast.error(payload);
    })
  }
});

export const {
  handleChange,
  clearDepartmentValues,
  resetDepartmentName,
  toggleEditingDepartment,
  setDepartment,
  toggleEditingDesignation,
  setDesignation,
  clearDesignationValues,
  toggleFileUploadModal,
  changePage,
  clearFile,
  toggleCreateAnnouncementModal,
  toggleEditAnnouncementModal,
  closeAnnouncementModal,
  setEvent,
  setHoliday,
  setNotice,
  clearAnnouncementValues,
  toggleViewAnnouncementModal,
  clearLeaveValues,
  setLeaveCategory,
  setLeaveAssign,
  setLeaveApplication,
  toggleEditingLeaveCategory,
  toggleEditingLeaveAssign,
  toggleCreateLeaveApplicationModal,
  toggleEditingLeaveApplication,
  toggleLeaveBalance,
  setTeacherDesignation,
  clearTeacherDesignation,
  toggleAddTeacherDesignation,
  toggleEditTeacherDesignation,
} = hrSlice.actions;

export default hrSlice.reducer;
