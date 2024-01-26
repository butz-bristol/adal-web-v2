import adalFetch from 'src/utils/axios';
import {
  fetchAdminPrimaryDesignation,
  fetchAdminSalary,
  fetchAllCutOffDates,
  fetchAllPaygroups,
  fetchAllSalaryCutoffs,
  fetchAllSalaryGradeGuides,
  fetchAllTimesheets,
  fetchSpecialPrimaryDesignation,
  fetchSpecialSalary,
  fetchTeachingGradeInfos,
  fetchTeachingLoads,
  fetchTeachingPrimaryDesignation,
  fetchTeachingSalary,
} from './payrollSlice';

export const fetchAllCutOffDatesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createCutOffDateThunk = async (url, cutOffDate, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, cutOffDate);
    thunkAPI.dispatch(fetchAllCutOffDates());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCutOffDateThunk = async (url, cutOffDate, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, cutOffDate);
    thunkAPI.dispatch(fetchAllCutOffDates());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteCutOffDateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllCutOffDates());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const setCurrentCutOffDateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllCutOffDates());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Timesheets

export const fetchAllTimesheetsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllTimesheetsByDateRangeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTimesheetThunk = async (url, timesheet, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, timesheet);
    thunkAPI.dispatch(fetchAllTimesheets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTimesheetThunk = async (url, timesheet, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, timesheet);
    thunkAPI.dispatch(fetchAllTimesheets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTimesheetThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllTimesheets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Salary Template

export const fetchAllSalaryGradeGuidesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSalaryGradeGuideThunk = async (
  url,
  salaryTemplate,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, salaryTemplate);
    thunkAPI.dispatch(fetchAllSalaryGradeGuides());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSalaryGradeGuideThunk = async (
  url,
  salaryTemplate,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, salaryTemplate);
    thunkAPI.dispatch(fetchAllSalaryGradeGuides());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSalaryGradeGuideThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllSalaryGradeGuides());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Salary CutOff

export const fetchAllSalaryCutoffsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSalaryCutOffThunk = async (url, salaryCutOff, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, salaryCutOff);
    thunkAPI.dispatch(fetchAllSalaryCutoffs());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSalaryCutOffThunk = async (url, salaryCutOff, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, salaryCutOff);
    thunkAPI.dispatch(fetchAllSalaryCutoffs());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSalaryCutOffThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllSalaryCutoffs());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Paygroups

export const fetchAllPaygroupsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createPaygroupThunk = async (url, paygroup, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, paygroup);
    thunkAPI.dispatch(fetchAllPaygroups());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updatePaygroupThunk = async (url, paygroup, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, paygroup);
    thunkAPI.dispatch(fetchAllPaygroups());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deletePaygroupThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllPaygroups());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Admin Salary

export const fetchAdminSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createAdminSalaryThunk = async (url, adminSalary, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, adminSalary);
    thunkAPI.dispatch(fetchAdminSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateAdminSalaryThunk = async (url, adminSalary, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, adminSalary);
    thunkAPI.dispatch(fetchAdminSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteAdminSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAdminSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Teaching Salary

export const fetchTeachingSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTeachingSalaryThunk = async (
  url,
  teachingSalary,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, teachingSalary);
    thunkAPI.dispatch(fetchTeachingSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTeachingSalaryThunk = async (
  url,
  teachingSalary,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, teachingSalary);
    thunkAPI.dispatch(fetchTeachingSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTeachingSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchTeachingSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Teaching Load

export const fetchTeachingLoadsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTeachingLoadThunk = async (url, teachingLoad, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, teachingLoad);
    thunkAPI.dispatch(fetchTeachingLoads());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTeachingLoadThunk = async (url, teachingLoad, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, teachingLoad);
    thunkAPI.dispatch(fetchTeachingLoads());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTeachingLoadThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchTeachingLoads());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Teaching Grade Info

export const fetchTeachingGradeInfosThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTeachingGradeInfoThunk = async (
  url,
  teachingGradeInfo,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, teachingGradeInfo);
    thunkAPI.dispatch(fetchTeachingGradeInfos());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTeachingGradeInfoThunk = async (
  url,
  teachingGradeInfo,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, teachingGradeInfo);
    thunkAPI.dispatch(fetchTeachingGradeInfos());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTeachingGradeInfoThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchTeachingGradeInfos());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Special Salary

export const fetchSpecialSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSpecialSalaryThunk = async (
  url,
  specialSalary,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, specialSalary);
    thunkAPI.dispatch(fetchSpecialSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSpecialSalaryThunk = async (
  url,
  specialSalary,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, specialSalary);
    thunkAPI.dispatch(fetchSpecialSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSpecialSalaryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchSpecialSalary());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAdminPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const fetchTeachingPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchSpecialPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const toggleAdminPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAdminPrimaryDesignation());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const toggleTeachingPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchTeachingPrimaryDesignation());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const toggleSpecialPrimaryDesignationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchSpecialPrimaryDesignation());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
