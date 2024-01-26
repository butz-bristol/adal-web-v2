import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createAdminSalaryThunk,
  createCutOffDateThunk,
  createPaygroupThunk,
  createSalaryCutOffThunk,
  createSalaryGradeGuideThunk,
  createSpecialSalaryThunk,
  createTeachingGradeInfoThunk,
  createTeachingLoadThunk,
  createTeachingSalaryThunk,
  createTimesheetThunk,
  deleteAdminSalaryThunk,
  deleteCutOffDateThunk,
  deletePaygroupThunk,
  deleteSalaryCutOffThunk,
  deleteSalaryGradeGuideThunk,
  deleteSpecialSalaryThunk,
  deleteTeachingGradeInfoThunk,
  deleteTeachingLoadThunk,
  deleteTeachingSalaryThunk,
  deleteTimesheetThunk,
  fetchAdminPrimaryDesignationThunk,
  fetchAdminSalaryThunk,
  fetchAllCutOffDatesThunk,
  fetchAllPaygroupsThunk,
  fetchAllSalaryCutoffsThunk,
  fetchAllSalaryGradeGuidesThunk,
  fetchAllTimesheetsByDateRangeThunk,
  fetchAllTimesheetsThunk,
  fetchSpecialPrimaryDesignationThunk,
  fetchSpecialSalaryThunk,
  fetchTeachingGradeInfosThunk,
  fetchTeachingLoadsThunk,
  fetchTeachingPrimaryDesignationThunk,
  fetchTeachingSalaryThunk,
  setCurrentCutOffDateThunk,
  toggleAdminPrimaryDesignationThunk,
  toggleSpecialPrimaryDesignationThunk,
  toggleTeachingPrimaryDesignationThunk,
  updateAdminSalaryThunk,
  updateCutOffDateThunk,
  updatePaygroupThunk,
  updateSalaryCutOffThunk,
  updateSalaryGradeGuideThunk,
  updateSpecialSalaryThunk,
  updateTeachingGradeInfoThunk,
  updateTeachingLoadThunk,
  updateTeachingSalaryThunk,
  updateTimesheetThunk
} from './payrollThunk';

const initialState = {
  employeeId: '',
  // Cut Off Dates

  cutOffDates: [],
  cutOffStartDate: '',
  cutOffEndDate: '',
  currentCutOffDate: '',
  cutOffDateId: '',
  createCutOffDateStatus: false,
  isCreatingCutOffDate: false,
  isFetchingCutOffDates: false,
  isEditingCutOffDate: false,
  editCutOffDate: false,
  isDeletingCutOffDate: false,
  editCutOffDateId: '',
  isSettingCurrentCutOffDate: false,
  cutOffStartDateFilter: '',
  cutOffEndDateFilter: '',
  cutOffDateId: '',

  // Timesheets

  timesheets: [],
  isFetchingTimesheets: false,
  isCreatingTimesheet: false,
  isEditingTimesheet: false,
  isDeletingTimesheet: false,
  createTimesheetStatus: false,
  editTimesheet: false,
  editTimesheetId: '',
  deleteTimesheetId: '',
  viewTimesheet: false,
  timesheet: {},
  timesheetId: '',
  totalHours: 0,
  totalLeaves: 0,
  totalPaidHours: 0,
  otherUnpaidLeaves: 0,

  // Salary Grade Guide

  salary_grade_guides: [],
  salary_grade: '',
  basic_salary: '',
  basic_salary_min: '',
  basic_salary_max: '',
  overtime_salary: '',
  isFetchingSalaryGradeGuide: false,
  isCreatingSalaryGradeGuide: false,
  isEditingSalaryGradeGuide: false,
  isDeletingSalaryGradeGuide: false,
  createSalaryGradeGuideStatus: false,
  isFetchingSalaryGradeGuides: false,
  editSalaryGradeGuide: false,
  editSalaryGradeGuideId: '',
  deleteSalaryGradeGuideId: '',
  viewSalaryGradeGuide: false,
  salaryGradeGuide: {},
  totalSalaryGradeGuides: 0,
  totalSalaryGradeGuidesPages: 0,

  // Salary CutOff

  salary_cutoffs: [],
  designationId: '',
  cutOffPeriod: '',
  isFetchingSalaryCutoffs: false,
  isCreatingSalaryCutoff: false,
  isEditingSalaryCutoff: false,
  isDeletingSalaryCutoff: false,
  editSalaryCutoff: false,
  editSalaryCutoffId: '',
  deleteSalaryCutoffId: '',
  viewSalaryCutoff: false,
  salaryCutoff: {},

  // Paygroup

  paygroups: [],
  paygroupId: '',
  isFetchingPaygroups: false,
  isCreatingPaygroup: false,
  isEditingPaygroup: false,
  isDeletingPaygroup: false,
  paygroupDesignations: [''],
  editPaygroup: false,
  createPaygroupModal: false,
  editPaygroupId: '',
  deletePaygroupId: '',
  viewPaygroup: false,
  paygroup: {},
  paygroup_name: '',

  // Setup Salary

  school_year: '',
  semester: '',
  no_of_days_per_year: 0,
  no_of_hours_per_year: 0,
  days_per_month: 0,

  admin_salaries: [],
  admin_primary_designation: false,
  isSettingAdminPrimaryDesignation: false,
  isFetchingAdminPrimaryDesignation: false,
  createAdminSalaryModal: false,
  isCreatingAdminSalary: false,
  isFetchingAdminSalary: false,
  isEditingAdminSalary: false,
  editAdminSalary: false,
  editAdminSalaryId: '',
  deleteAdminSalaryId: '',
  isDeletingAdminSalary: false,
  totalAdminSalaries: 0,
  totalAdminSalariesPages: 0,

  teaching_salaries: [],
  teaching_primary_designation: false,
  isSettingTeachingPrimaryDesignation: false,
  isFetchingTeachingPrimaryDesignation: false,
  createTeachingSalaryModal: false,
  isCreatingTeachingSalary: false,
  isFetchingTeachingSalary: false,
  isEditingTeachingSalary: false,
  editTeachingSalary: false,
  editTeachingSalaryId: '',
  deleteTeachingSalaryId: '',
  isDeletingTeachingSalary: false,
  totalTeachingSalaries: 0,
  totalTeachingSalariesPages: 0,

  teaching_loads: [],
  full_load_college_faculty: 0,
  minimum_load_college_faculty: 0,
  full_load_tesda_faculty: 0,
  minimum_load_tesda_faculty: 0,
  createTeachingLoadModal: false,
  isCreatingTeachingLoad: false,
  isFetchingTeachingLoad: false,
  isEditingTeachingLoad: false,
  editTeachingLoad: false,
  editTeachingLoadId: '',
  deleteTeachingLoadId: '',
  isDeletingTeachingLoad: false,
  totalTeachingLoads: 0,
  totalTeachingLoadsPages: 0,

  teaching_grade_infos: [],
  available_subjects_k12: 0,
  available_grade_levels: '',
  full_load_per_subject_per_grade: 0,
  full_load_tesda_faculty: 0,
  minimum_load_per_subject_per_grade: 0,
  createTeachingGradeInfoModal: false,
  isCreatingTeachingGradeInfo: false,
  isFetchingTeachingGradeInfo: false,
  isEditingTeachingGradeInfo: false,
  editTeachingGradeInfo: false,
  editTeachingGradeInfoId: '',
  deleteTeachingGradeInfoId: '',
  isDeletingTeachingGradeInfo: false,
  totalTeachingGradeInfos: 0,
  totalTeachingGradeInfosPages: 0,

  special_salaries: [],
  special_primary_designation: false,
  isSettingSpecialPrimaryDesignation: false,
  isFetchingSpecialPrimaryDesignation: false,
  createSpecialSalaryModal: false,
  isCreatingSpecialSalary: false,
  isFetchingSpecialSalary: false,
  isEditingSpecialSalary: false,
  editSpecialSalary: false,
  editSpecialSalaryId: '',
  deleteSpecialSalaryId: '',
  isDeletingSpecialSalary: false,
  totalSpecialSalaries: 0,
  totalSpecialSalariesPages: 0
};

// Cut Off Dates

export const fetchAllCutOffDates = createAsyncThunk('cutOffDate/fetchAllCutOffDates', async (url, thunkAPI) => {
  return fetchAllCutOffDatesThunk('/cutoffdates', thunkAPI);
});

export const createCutOffDate = createAsyncThunk('cutOffDate/createCutOffDate', async (cutOffDate, thunkAPI) => {
  return createCutOffDateThunk('/cutoffdates', cutOffDate, thunkAPI);
});

export const updateCutOffDate = createAsyncThunk('cutOffDate/updateCutOffDate', async (cutOffDate, thunkAPI) => {
  return updateCutOffDateThunk(`/cutoffdates/${cutOffDate.editCutOffDateId}`, cutOffDate, thunkAPI);
});

export const deleteCutOffDate = createAsyncThunk('cutOffDate/deleteCutOffDate', async (cutOffDateId, thunkAPI) => {
  return deleteCutOffDateThunk(`/cutoffdates/${cutOffDateId}`, thunkAPI);
});

export const setCurrentCutOffDate = createAsyncThunk('cutOffDate/setCurrentCutOffDate', async (cutOffDateId, thunkAPI) => {
  return setCurrentCutOffDateThunk(`/cutoffdates/setcurrent/${cutOffDateId}`, thunkAPI);
});

// Timesheets

export const fetchAllTimesheets = createAsyncThunk('timesheet/fetchAllTimesheets', async (url, thunkAPI) => {
  return fetchAllTimesheetsThunk('/timesheets', thunkAPI);
});

export const fetchTimsheetsByDateRange = createAsyncThunk('timesheet/fetchAllTimesheetsByDateRange', async (cutOffDateId, thunkAPI) => {
  const cutOffDate = thunkAPI.getState().payroll.cutOffDates.find((cutOffDate) => cutOffDate._id === cutOffDateId);

  const startDate = cutOffDate.cutOffStartDate;
  const endDate = cutOffDate.cutOffEndDate;

  return fetchAllTimesheetsByDateRangeThunk(`/timesheets/date?cutOffStartDate=${startDate}&cutOffEndDate=${endDate}`, thunkAPI);
});

export const createTimesheet = createAsyncThunk('timesheet/createTimesheet', async (employee, thunkAPI) => {
  const { cutOffStartDate, cutOffEndDate } = thunkAPI.getState().payroll.currentCutOffDate;
  const { users } = thunkAPI.getState().users;
  const user = users.find((user) => user._id === employee._id);
  const {
    _id,
    admin_department,
    admin_designation,
    teaching_department,
    teaching_designation,
    special_department,
    special_designation,
    attendance,
    leaves
  } = user;

  const hoursWorked = attendance
    .filter(
      (attendance) =>
        new Date(attendance.start).toISOString() >= new Date(cutOffStartDate).toISOString() &&
        new Date(attendance.end) <= new Date(cutOffEndDate)
    )
    .reduce((acc, curr) => {
      acc += curr.total_hours_worked;
      return acc;
    }, 0)
    .toFixed(2);

  const leavesTaken = leaves
    .filter(
      (application) =>
        application.userId === _id &&
        application.leave_status === 'approved' &&
        application.leave_start_date >= cutOffStartDate &&
        application.leave_end_date <= cutOffEndDate
    )
    .reduce((acc, curr) => {
      acc += curr.leave_days;
      return acc;
    }, 0);

  const vacationDaysInHours = leaves
    .filter(
      (application) =>
        application.leave_type_name === 'vacation leave' &&
        application.leave_status === 'approved' &&
        application.leave_start_date >= cutOffStartDate &&
        application.leave_end_date <= cutOffEndDate
    )
    .reduce(
      (acc, curr) => {
        const { leave_days, leave_allocation } = curr;
        acc.days += leave_days;

        acc.paidLeave = (acc.days > leave_allocation ? leave_allocation : acc.days) * 8;
        acc.unpaidLeave += acc.days > leave_allocation && Math.abs(acc.days - leave_allocation) * 8;
        return acc;
      },
      {
        days: 0,
        paidLeave: 0,
        unpaidLeave: 0
      }
    );

  const sickDaysInHours = leaves
    .filter(
      (application) =>
        application.leave_type_name === 'sick leave' &&
        application.leave_status === 'approved' &&
        application.leave_start_date >= cutOffStartDate &&
        application.leave_end_date <= cutOffEndDate
    )
    .reduce(
      (acc, curr) => {
        const { leave_days, leave_allocation } = curr;
        acc.days += leave_days;

        acc.paidLeave = (acc.days > leave_allocation ? leave_allocation : acc.days) * 8;
        acc.unpaidLeave += (acc.days > leave_allocation && acc.days % leave_allocation) * 8;
        return acc;
      },
      {
        days: 0,
        paidLeave: 0,
        unpaidLeave: 0
      }
    );

  const maternityDaysInHours = leaves
    .filter(
      (application) =>
        application.leave_type_name === 'maternity leave' &&
        application.leave_status === 'approved' &&
        application.leave_start_date >= cutOffStartDate &&
        application.leave_end_date <= cutOffEndDate
    )
    .reduce(
      (acc, curr) => {
        const { leave_days, leave_allocation } = curr;
        acc.days += leave_days;

        acc.paidLeave = (acc.days > leave_allocation ? leave_allocation : acc.days) * 8;
        acc.unpaidLeave += (acc.days > leave_allocation && acc.days % leave_allocation) * 8;
        return acc;
      },
      {
        days: 0,
        paidLeave: 0,
        unpaidLeave: 0
      }
    );

  const paternityDaysInHours = leaves
    .filter(
      (application) =>
        application.leave_type_name === 'paternity leave' &&
        application.leave_status === 'approved' &&
        application.leave_start_date >= cutOffStartDate &&
        application.leave_end_date <= cutOffEndDate
    )
    .reduce(
      (acc, curr) => {
        const { leave_days, leave_allocation } = curr;
        acc.days += leave_days;

        acc.paidLeave = (acc.days > leave_allocation ? leave_allocation : acc.days) * 8;
        acc.unpaidLeave += (acc.days > leave_allocation && acc.days % leave_allocation) * 8;
        return acc;
      },
      {
        days: 0,
        paidLeave: 0,
        unpaidLeave: 0
      }
    );

  const timesheet = {
    employeeId: _id,
    admin_department,
    admin_designation,
    teaching_department,
    teaching_designation,
    special_department,
    special_designation,
    totalHours: hoursWorked,
    totalLeaves: leavesTaken,
    vacationDaysInHours,
    sickDaysInHours,
    maternityDaysInHours,
    paternityDaysInHours,
    cutOffStartDate,
    cutOffEndDate
  };

  return createTimesheetThunk('/timesheets', timesheet, thunkAPI);
});

export const updateTimesheet = createAsyncThunk('timesheet/updateTimesheet', async (timesheet, thunkAPI) => {
  return updateTimesheetThunk(`/timesheets/${timesheet.editTimesheetId}`, timesheet, thunkAPI);
});

export const deleteTimesheet = createAsyncThunk('timesheet/deleteTimesheet', async (timesheetId, thunkAPI) => {
  return deleteTimesheetThunk(`/timesheets/${timesheetId}`, thunkAPI);
});

// Salary Template

export const fetchAllSalaryGradeGuides = createAsyncThunk('payroll/fetchAllSalaryGradeGuide', async (_, thunkAPI) => {
  return fetchAllSalaryGradeGuidesThunk('/salary-gradeguide', thunkAPI);
});

export const createSalaryGradeGuide = createAsyncThunk('payroll/createSalaryGradeGuide', async (salaryGradeGuide, thunkAPI) => {
  return createSalaryGradeGuideThunk('/salary-gradeguide', salaryGradeGuide, thunkAPI);
});

export const updateSalaryGradeGuide = createAsyncThunk('payroll/updateSalaryGradeGuide', async (salaryGradeGuide, thunkAPI) => {
  return updateSalaryGradeGuideThunk(`/salary-gradeguide/${salaryGradeGuide.editSalaryGradeGuideId}`, salaryGradeGuide, thunkAPI);
});

export const deleteSalaryGradeGuide = createAsyncThunk('payroll/deleteSalaryGradeGuide', async (salaryGradeGuideId, thunkAPI) => {
  return deleteSalaryGradeGuideThunk(`/salary-gradeguide/${salaryGradeGuideId}`, thunkAPI);
});

// Salary Cutoff

export const fetchAllSalaryCutoffs = createAsyncThunk('salaryCutoff/fetchAllSalaryCutoffs', async (_, thunkAPI) => {
  return fetchAllSalaryCutoffsThunk('/salary-cutoff', thunkAPI);
});

export const createSalaryCutoff = createAsyncThunk('salaryCutoff/createSalaryCutoff', async (salaryCutoff, thunkAPI) => {
  return createSalaryCutOffThunk('/salary-cutoff', salaryCutoff, thunkAPI);
});

export const updateSalaryCutoff = createAsyncThunk('salaryCutoff/updateSalaryCutoff', async (salaryCutoff, thunkAPI) => {
  return updateSalaryCutOffThunk(`/salary-cutoff/${salaryCutoff.editSalaryCutoffId}`, salaryCutoff, thunkAPI);
});

export const deleteSalaryCutoff = createAsyncThunk('salaryCutoff/deleteSalaryCutoff', async (salaryCutoffId, thunkAPI) => {
  return deleteSalaryCutOffThunk(`/salary-cutoff/${salaryCutoffId}`, thunkAPI);
});

// Paygroups

export const fetchAllPaygroups = createAsyncThunk('paygroup/fetchAllPaygroups', async (_, thunkAPI) => {
  return fetchAllPaygroupsThunk('/paygroup', thunkAPI);
});

export const createPaygroup = createAsyncThunk('paygroup/createPaygroup', async (paygroup, thunkAPI) => {
  return createPaygroupThunk('/paygroup', paygroup, thunkAPI);
});

export const updatePaygroup = createAsyncThunk('paygroup/updatePaygroup', async (paygroup, thunkAPI) => {
  return updatePaygroupThunk(`/paygroup/${paygroup.editPaygroupId}`, paygroup, thunkAPI);
});

export const deletePaygroup = createAsyncThunk('paygroup/deletePaygroup', async (paygroupId, thunkAPI) => {
  return deletePaygroupThunk(`/paygroup/${paygroupId}`, thunkAPI);
});

// Admin Salary

export const fetchAdminSalary = createAsyncThunk('payroll/fetchAdminSalary', async (_, thunkAPI) => {
  return fetchAdminSalaryThunk('/admin-salary', thunkAPI);
});

export const createAdminSalary = createAsyncThunk('payroll/createAdminSalary', async (adminSalary, thunkAPI) => {
  return createAdminSalaryThunk('/admin-salary', adminSalary, thunkAPI);
});

export const updateAdminSalary = createAsyncThunk('payroll/updateAdminSalary', async (adminSalary, thunkAPI) => {
  return updateAdminSalaryThunk(`/admin-salary/${adminSalary.editAdminSalaryId}`, adminSalary, thunkAPI);
});

export const deleteAdminSalary = createAsyncThunk('payroll/deleteAdminSalary', async (adminSalaryId, thunkAPI) => {
  return deleteAdminSalaryThunk(`/admin-salary/${adminSalaryId}`, thunkAPI);
});

// Teaching Salary

export const fetchTeachingSalary = createAsyncThunk('payroll/fetchTeachingSalary', async (_, thunkAPI) => {
  return fetchTeachingSalaryThunk('/teaching-salary', thunkAPI);
});

export const createTeachingSalary = createAsyncThunk('payroll/createTeachingSalary', async (teachingSalary, thunkAPI) => {
  return createTeachingSalaryThunk('/teaching-salary', teachingSalary, thunkAPI);
});

export const updateTeachingSalary = createAsyncThunk('payroll/updateTeachingSalary', async (teachingSalary, thunkAPI) => {
  return updateTeachingSalaryThunk(`/teaching-salary/${teachingSalary.editTeachingSalaryId}`, teachingSalary, thunkAPI);
});

export const deleteTeachingSalary = createAsyncThunk('payroll/deleteTeachingSalary', async (teachingSalaryId, thunkAPI) => {
  return deleteTeachingSalaryThunk(`/teaching-salary/${teachingSalaryId}`, thunkAPI);
});

// Teaching Load

export const fetchTeachingLoads = createAsyncThunk('payroll/fetchTeachingLoads', async (_, thunkAPI) => {
  return fetchTeachingLoadsThunk('/teaching-load', thunkAPI);
});

export const createTeachingLoad = createAsyncThunk('payroll/createTeachingLoad', async (teachingLoad, thunkAPI) => {
  return createTeachingLoadThunk('/teaching-load', teachingLoad, thunkAPI);
});

export const updateTeachingLoad = createAsyncThunk('payroll/updateTeachingLoad', async (teachingLoad, thunkAPI) => {
  return updateTeachingLoadThunk(`/teaching-load/${teachingLoad.editTeachingLoadId}`, teachingLoad, thunkAPI);
});

export const deleteTeachingLoad = createAsyncThunk('payroll/deleteTeachingLoad', async (teachingLoadId, thunkAPI) => {
  return deleteTeachingLoadThunk(`/teaching-load/${teachingLoadId}`, thunkAPI);
});

// Teacing Grade Info

export const fetchTeachingGradeInfos = createAsyncThunk('payroll/fetchTeachingGradeInfos', async (_, thunkAPI) => {
  return fetchTeachingGradeInfosThunk('/teaching-grade', thunkAPI);
});

export const createTeachingGradeInfo = createAsyncThunk('payroll/createTeachingGradeInfo', async (teachingGradeInfo, thunkAPI) => {
  return createTeachingGradeInfoThunk('/teaching-grade', teachingGradeInfo, thunkAPI);
});

export const updateTeachingGradeInfo = createAsyncThunk('payroll/updateTeachingGradeInfo', async (teachingGradeInfo, thunkAPI) => {
  return updateTeachingGradeInfoThunk(`/teaching-grade/${teachingGradeInfo.editTeachingGradeInfoId}`, teachingGradeInfo, thunkAPI);
});

export const deleteTeachingGradeInfo = createAsyncThunk('payroll/deleteTeachingGradeInfo', async (teachingGradeInfoId, thunkAPI) => {
  return deleteTeachingGradeInfoThunk(`/teaching-grade/${teachingGradeInfoId}`, thunkAPI);
});

// Special Salary

export const fetchSpecialSalary = createAsyncThunk('payroll/fetchSpecialSalary', async (_, thunkAPI) => {
  return fetchSpecialSalaryThunk('/special-salary', thunkAPI);
});

export const createSpecialSalary = createAsyncThunk('payroll/createSpecialSalary', async (specialSalary, thunkAPI) => {
  return createSpecialSalaryThunk('/special-salary', specialSalary, thunkAPI);
});

export const updateSpecialSalary = createAsyncThunk('payroll/updateSpecialSalary', async (specialSalary, thunkAPI) => {
  return updateSpecialSalaryThunk(`/special-salary/${specialSalary.editSpecialSalaryId}`, specialSalary, thunkAPI);
});

export const deleteSpecialSalary = createAsyncThunk('payroll/deleteSpecialSalary', async (specialSalaryId, thunkAPI) => {
  return deleteSpecialSalaryThunk(`/special-salary/${specialSalaryId}`, thunkAPI);
});

// Primary Designation

export const fetchAdminPrimaryDesignation = createAsyncThunk('payroll/fetchAdminPrimaryDesignation', async (_, thunkAPI) => {
  return fetchAdminPrimaryDesignationThunk('/primary-designation/admin', thunkAPI);
});

export const toggleAdminPrimaryDesignation = createAsyncThunk('payroll/toggleAdminPrimaryDesignation', async (_, thunkAPI) => {
  return toggleAdminPrimaryDesignationThunk('/primary-designation/admin', thunkAPI);
});

export const fetchTeachingPrimaryDesignation = createAsyncThunk('payroll/fetchTeachingPrimaryDesignation', async (_, thunkAPI) => {
  return fetchTeachingPrimaryDesignationThunk('/primary-designation/teaching', thunkAPI);
});

export const toggleTeachingPrimaryDesignation = createAsyncThunk('payroll/toggleTeachingPrimaryDesignation', async (_, thunkAPI) => {
  return toggleTeachingPrimaryDesignationThunk('/primary-designation/teaching', thunkAPI);
});

export const fetchSpecialPrimaryDesignation = createAsyncThunk('payroll/fetchSpecialPrimaryDesignation', async (_, thunkAPI) => {
  return fetchSpecialPrimaryDesignationThunk('/primary-designation/special', thunkAPI);
});

export const toggleSpecialPrimaryDesignation = createAsyncThunk('payroll/toggleSpecialPrimaryDesignation', async (_, thunkAPI) => {
  return toggleSpecialPrimaryDesignationThunk('/primary-designation/special', thunkAPI);
});

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    setEmployeeId: (state, { payload }) => {
      state.employeeId = payload;
    },
    toggleEditCutOffDate: (state) => {
      state.editCutOffDate = !state.editCutOffDate;
    },
    setCutOffDate: (state, { payload }) => {
      state.editCutOffDateId = payload._id;
      state.cutOffStartDate = payload.cutOffStartDate;
      state.cutOffEndDate = payload.cutOffEndDate;
    },
    resetCutOffDate: (state) => {
      state.cutOffStartDate = '';
      state.cutOffEndDate = '';
      state.editCutOffDateId = '';
      state.isCreatingCutOffDate = false;
      state.isEditingCutOffDate = false;
      state.editCutOffDate = false;
      state.createCutOffDateStatus = false;
      state.cutOffDateId = '';
    },
    toggleViewTimesheet: (state) => {
      state.viewTimesheet = !state.viewTimesheet;
    },
    toggleEditTimesheet: (state) => {
      state.editTimesheet = !state.editTimesheet;
    },
    setTimesheetValues: (state, { payload }) => {
      state.editTimesheetId = payload._id;
      state.timesheet = payload;
      state.totalLeaves = payload.totalLeaves;
      state.totalHours = payload.totalHours;
      state.totalPaidHours = payload.totalPaidHours;
      state.otherUnpaidLeaves = payload.otherUnpaidLeaves;
    },
    setTimesheet: (state, { payload }) => {
      state.timesheet = payload;
    },
    resetTimesheetValues: (state) => {
      state.editTimesheetId = '';
      state.isCreatingTimesheet = false;
      state.isEditingTimesheet = false;
      state.editTimesheet = false;
      state.createTimesheetStatus = false;
      state.totalHours = 0;
      state.totalLeaves = 0;
      state.totalPaidHours = 0;
      state.otherUnpaidLeaves = 0;
    },
    resetTemplateDateFilters: (state) => {
      state.cutOffStartDate = '';
      state.cutOffEndDate = '';
      state.cutOffDateId = '';
    },
    toggleCreateSalaryGradeGuide: (state) => {
      state.createSalaryGradeGuideStatus = !state.createSalaryGradeGuideStatus;
    },
    toggleEditSalaryGradeGuide: (state) => {
      state.editSalaryGradeGuide = !state.editSalaryGradeGuide;
    },
    setSalaryGradeGuide: (state, { payload }) => {
      state.editSalaryGradeGuideId = payload._id;
      state.salary_grade = payload.salary_grade;
      state.basic_salary = payload.basic_salary;
      state.basic_salary_min = payload.basic_salary_min;
      state.basic_salary_max = payload.basic_salary_max;
      state.overtime_salary = payload.overtime_salary;
    },
    resetSalaryGradeGuideValues: (state) => {
      state.editSalaryGradeGuideId = '';
      state.isCreatingSalaryGradeGuide = false;
      state.isEditingSalaryGradeGuide = false;
      state.editSalaryGradeGuide = false;
      state.createSalaryGradeGuideStatus = false;
      state.salary_grade = '';
      state.basic_salary = 0;
      state.basic_salary_min = 0;
      state.basic_salary_max = 0;
      state.overtime_salary = 0;
    },
    toggleEditSalaryCutoff: (state) => {
      state.editSalaryCutoff = !state.editSalaryCutoff;
    },
    setSalaryCutoff: (state, { payload }) => {
      state.editSalaryCutoffId = payload._id;
      state.designationId = payload.designationId?._id;
      state.cutOffPeriod = payload.cutOffPeriod;
    },
    resetSalaryCutoffValues: (state) => {
      state.editSalaryCutoffId = '';
      state.isCreatingSalaryCutoff = false;
      state.isEditingSalaryCutoff = false;
      state.editSalaryCutoff = false;
      state.createSalaryCutoffStatus = false;
      state.designationId = '';
      state.cutOffPeriod = '';
    },
    toggleCreatePaygroup: (state) => {
      state.createPaygroupModal = !state.createPaygroupModal;
    },
    toggleEditPaygroup: (state) => {
      state.editPaygroup = !state.editPaygroup;
    },
    setPaygroup: (state, { payload }) => {
      state.editPaygroupId = payload._id;
      state.paygroup = payload.paygroup;
    },
    resetPaygroupValues: (state) => {
      state.editPaygroupId = '';
      state.isCreatingPaygroup = false;
      state.isEditingPaygroup = false;
      state.editPaygroup = false;
      state.createPaygroupStatus = false;
      state.paygroup = '';
      state.paygroup_name = '';
      state.cutOffPeriod = '';
      state.createPaygroupModal = false;
      state.paygroupDesignations = [
        {
          designationId: ''
        }
      ];
    },
    toggleCreateAdminSalary: (state) => {
      state.createAdminSalaryModal = !state.createAdminSalaryModal;
    },
    toggleEditAdminSalary: (state) => {
      state.editAdminSalary = !state.editAdminSalary;
    },
    setAdminSalary: (state, { payload }) => {
      state.editAdminSalaryId = payload._id;
      state.school_year = payload.school_year;
      state.semester = payload.semester;
      state.no_of_days_per_year = payload.no_of_days_per_year;
      state.days_per_month = payload.days_per_month;
      state.no_of_hours_per_year = payload.no_of_hours_per_year;
    },
    resetAdminSalaryValues: (state) => {
      state.editAdminSalaryId = '';
      state.isCreatingAdminSalary = false;
      state.isEditingAdminSalary = false;
      state.editAdminSalary = false;
      state.school_year = '';
      state.semester = '';
      state.no_of_days_per_year = 0;
      state.days_per_month = 0;
      state.no_of_hours_per_year = 0;
      state.primary_designation = '';
      state.createAdminSalaryModal = false;
    },
    toggleCreateTeachingSalary: (state) => {
      state.createTeachingSalaryModal = !state.createTeachingSalaryModal;
    },
    toggleEditTeachingSalary: (state) => {
      state.editTeachingSalary = !state.editTeachingSalary;
    },
    setTeachingSalary: (state, { payload }) => {
      state.editTeachingSalaryId = payload._id;
      state.school_year = payload.school_year;
      state.semester = payload.semester;
      state.no_of_days_per_year = payload.no_of_days_per_year;
      state.days_per_month = payload.days_per_month;
      state.no_of_hours_per_year = payload.no_of_hours_per_year;
      state.primary_designation = payload.primary_designation;
    },
    resetTeachingSalaryValues: (state) => {
      state.editTeachingSalaryId = '';
      state.isCreatingTeachingSalary = false;
      state.isEditingTeachingSalary = false;
      state.editTeachingSalary = false;
      state.semester = '';
      state.no_of_days_per_year = 0;
      state.days_per_month = 0;
      state.no_of_hours_per_year = 0;
      state.createTeachingSalaryModal = false;
    },
    toggleCreateSpecialSalary: (state) => {
      state.createSpecialSalaryModal = !state.createSpecialSalaryModal;
    },
    toggleEditSpecialSalary: (state) => {
      state.editSpecialSalary = !state.editSpecialSalary;
    },
    setSpecialSalary: (state, { payload }) => {
      state.editSpecialSalaryId = payload._id;
      state.school_year = payload.school_year;
      state.semester = payload.semester;
      state.no_of_days_per_year = payload.no_of_days_per_year;
      state.days_per_month = payload.days_per_month;
      state.no_of_hours_per_year = payload.no_of_hours_per_year;
      state.primary_designation = payload.primary_designation;
    },
    resetSpecialSalaryValues: (state) => {
      state.editSpecialSalaryId = '';
      state.isCreatingSpecialSalary = false;
      state.isEditingSpecialSalary = false;
      state.editSpecialSalary = false;
      state.school_year = '';
      state.semester = '';
      state.no_of_days_per_year = 0;
      state.days_per_month = 0;
      state.no_of_hours_per_year = 0;
      state.createSpecialSalaryModal = false;
    },
    toggleCreateTeachingLoad: (state) => {
      state.createTeachingLoadModal = !state.createTeachingLoadModal;
    },
    toggleEditTeachingLoad: (state) => {
      state.editTeachingLoad = !state.editTeachingLoad;
    },
    setTeachingLoad: (state, { payload }) => {
      state.editTeachingLoadId = payload._id;
      state.full_load_college_faculty = payload.full_load_college_faculty;
      state.minimum_load_college_faculty = payload.minimum_load_college_faculty;
      state.full_load_tesda_faculty = payload.full_load_tesda_faculty;
      state.minimum_load_tesda_faculty = payload.minimum_load_tesda_faculty;
    },
    resetTeachingLoadValues: (state) => {
      state.editTeachingLoadId = '';
      state.isCreatingTeachingLoad = false;
      state.isEditingTeachingLoad = false;
      state.editTeachingLoad = false;
      state.createTeachingLoadModal = false;
      state.isEditingTeachingLoad = false;
      state.editTeachingLoad = false;
      state.full_load_college_faculty = 0;
      state.minimum_load_college_faculty = 0;
      state.full_load_tesda_faculty = 0;
      state.minimum_load_tesda_faculty = 0;
    },
    toggleCreateTeachingGradeInfo: (state) => {
      state.createTeachingGradeInfoModal = !state.createTeachingGradeInfoModal;
    },
    toggleEditTeachingGradeInfo: (state) => {
      state.editTeachingGradeInfo = !state.editTeachingGradeInfo;
    },
    setTeachingGradeInfo: (state, { payload }) => {
      state.editTeachingGradeInfoId = payload._id;
      state.available_subjects_k12 = payload.available_subjects_k12;
      state.full_load_per_subject_per_grade = payload.full_load_per_subject_per_grade;
      state.full_load_tesda_faculty = payload.full_load_tesda_faculty;
      state.minimum_load_per_subject_per_grade = payload.minimum_load_per_subject_per_grade;
    },
    resetTeachingGradeInfoValues: (state) => {
      state.editTeachingGradeInfoId = '';
      state.isCreatingTeachingGradeInfo = false;
      state.isEditingTeachingGradeInfo = false;
      state.editTeachingGradeInfo = false;
      state.createTeachingGradeInfoModal = false;
      state.available_subjects_k12 = 0;
      state.full_load_per_subject_per_grade = 0;
      state.minimum_load_per_subject_per_grade = 0;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllCutOffDates.pending, (state) => {
      state.isFetchingCutOffDates = true;
  })
  .addCase(fetchAllCutOffDates.fulfilled, (state, action) => {
      state.isFetchingCutOffDates = false;
      state.cutOffDates = action.payload.cutOffDates;
      state.currentCutOffDate = action.payload.cutOffDates.find((cutOffDate) => cutOffDate.currentCutOffDate);
  })
  .addCase(createCutOffDate.pending, (state) => {
      state.isCreatingCutOffDate = true;
  })
  .addCase(createCutOffDate.fulfilled, (state) => {
      state.isCreatingCutOffDate = false;
      state.createCutOffDateStatus = false;
      toast.success('Cut Off Date Created Successfully');
  })
  .addCase(createCutOffDate.rejected, (state) => {
      state.isCreatingCutOffDate = false;
      toast.error('Cut Off Date Creation Failed');
  })
  .addCase(updateCutOffDate.pending, (state) => {
      state.isEditingCutOffDate = true;
  })
  .addCase(updateCutOffDate.fulfilled, (state) => {
      state.isEditingCutOffDate = false;
      state.editCutOffDate = false;
      state.cutOffStartDate = '';
      state.cutOffEndDate = '';
      state.editCutOffDateId = '';
      toast.success('Cut Off Date Updated Successfully');
  })
  .addCase(updateCutOffDate.rejected, (state) => {
      state.isEditingCutOffDate = false;
      toast.error('Cut Off Date Update Failed');
  })
  .addCase(deleteCutOffDate.pending, (state) => {
      state.isDeletingCutOffDate = true;
      toast.info('Deleting Cut Off Date...');
  })
  .addCase(deleteCutOffDate.fulfilled, (state) => {
      state.isDeletingCutOffDate = false;
      toast.success('Cut Off Date Deleted Successfully');
  })
  .addCase(deleteCutOffDate.rejected, (state) => {
      state.isDeletingCutOffDate = false;
  })
  .addCase(setCurrentCutOffDate.pending, (state) => {
      state.isSettingCurrentCutOffDate = true;
      toast.info('Setting Current Cut Off Date...');
  })
  .addCase(setCurrentCutOffDate.fulfilled, (state) => {
      state.isSettingCurrentCutOffDate = false;
      state.cutOffDateId = '';
      toast.success('Current Cut Off Date Set Successfully');
  })
  .addCase(setCurrentCutOffDate.rejected, (state) => {
      state.isSettingCurrentCutOffDate = false;
      toast.error('Current Cut Off Date Set Failed');
  })
  .addCase(fetchAllTimesheets.pending, (state) => {
      state.isFetchingTimesheets = true;
  })
  .addCase(fetchAllTimesheets.fulfilled, (state, action) => {
      state.isFetchingTimesheets = false;
      state.timesheets = action.payload.timesheets;
  })
  .addCase(fetchTimsheetsByDateRange.pending, (state) => {
      state.isFetchingTimesheets = true;
  })
  .addCase(fetchTimsheetsByDateRange.fulfilled, (state, action) => {
      state.isFetchingTimesheets = false;
      state.timesheets = action.payload.filteredTimesheets;
  })
  .addCase(fetchTimsheetsByDateRange.rejected, (state) => {
      state.isFetchingTimesheets = false;
      toast('Error Fetching Timesheets');
  })
  .addCase(createTimesheet.pending, (state) => {
      state.isCreatingTimesheet = true;
  })
  .addCase(createTimesheet.fulfilled, (state) => {
      state.isCreatingTimesheet = false;
      state.createTimesheetStatus = false;
      toast.success('Timesheet Generated Successfully');
  })
  .addCase(createTimesheet.rejected, (state, action) => {
      state.isCreatingTimesheet = false;
      toast.error('Timesheet Generation Failed');
  })
  .addCase(updateTimesheet.pending, (state) => {
      state.isEditingTimesheet = true;
  })
  .addCase(updateTimesheet.fulfilled, (state) => {
      state.isEditingTimesheet = false;
      state.editTimesheet = false;
      state.totalHours = 0;
      state.totalLeaves = 0;
      state.totalPaidHours = 0;
      state.otherUnpaidLeaves = 0;
      state.editTimesheetId = '';
      toast.success('Timesheet Updated Successfully');
  })
  .addCase(updateTimesheet.rejected, (state) => {
      state.isEditingTimesheet = false;
      toast.error('Timesheet Update Failed');
  })
  .addCase(deleteTimesheet.pending, (state) => {
      state.isDeletingTimesheet = true;
      toast.info('Deleting Timesheet...');
  })
  .addCase(deleteTimesheet.fulfilled, (state) => {
      state.isDeletingTimesheet = false;
      toast.success('Timesheet Deleted Successfully');
  })
  .addCase(deleteTimesheet.rejected, (state) => {
      state.isDeletingTimesheet = false;
  })
  .addCase(fetchAllSalaryGradeGuides.pending, (state) => {
      state.isFetchingSalaryGradeGuides = true;
  })
  .addCase(fetchAllSalaryGradeGuides.fulfilled, (state, { payload }) => {
      state.isFetchingSalaryGradeGuides = false;
      state.salary_grade_guides = payload.salaryGradeGuides;
      state.totalSalaryGradeGuides = payload.totalSalaryGradeGuides;
      state.totalSalaryGradeGuidesPages = payload.totalPages;
  })
  .addCase(createSalaryGradeGuide.pending, (state) => {
      state.isCreatingSalaryGradeGuide = true;
  })
  .addCase(createSalaryGradeGuide.fulfilled, (state) => {
      state.isCreatingSalaryGradeGuide = false;
      state.createSalaryGradeGuideStatus = false;
      toast.success('Salary Template Created Successfully');
  })
  .addCase(createSalaryGradeGuide.rejected, (state) => {
      state.isCreatingSalaryGradeGuide = false;
      toast.error('Salary Template Creation Failed');
  })
  .addCase(updateSalaryGradeGuide.pending, (state) => {
      state.isEditingSalaryGradeGuide = true;
  })
  .addCase(updateSalaryGradeGuide.fulfilled, (state) => {
      state.isEditingSalaryGradeGuide = false;
      state.editSalaryGradeGuide = false;
      state.salary_grade = '';
      state.editSalaryGradeGuideId = '';
      toast.success('Salary Template Updated Successfully');
  })
  .addCase(updateSalaryGradeGuide.rejected, (state) => {
      state.isEditingSalaryGradeGuide = false;
      toast.error('Salary Template Update Failed');
  })
  .addCase(deleteSalaryGradeGuide.pending, (state) => {
      state.isDeletingSalaryGradeGuide = true;
      toast.info('Deleting Salary Template...');
  })
  .addCase(deleteSalaryGradeGuide.fulfilled, (state) => {
      state.isDeletingSalaryGradeGuide = false;
      toast.success('Salary Template Deleted Successfully');
  })
  .addCase(deleteSalaryGradeGuide.rejected, (state) => {
      state.isDeletingSalaryGradeGuide = false;
  })
  .addCase(fetchAllSalaryCutoffs.pending, (state) => {
      state.isFetchingSalaryCutoffs = true;
  })
  .addCase(fetchAllSalaryCutoffs.fulfilled, (state, { payload }) => {
      state.isFetchingSalaryCutoffs = false;
      state.salary_cutoffs = payload.salaryCutOffs;
  })
  .addCase(createSalaryCutoff.pending, (state) => {
      state.isCreatingSalaryCutoff = true;
  })
  .addCase(createSalaryCutoff.fulfilled, (state) => {
      state.isCreatingSalaryCutoff = false;
      state.createSalaryCutoffStatus = false;
      state.cutOffPeriod = '';
      state.designationId = '';
      toast.success('Salary Cutoff Created Successfully');
  })
  .addCase(createSalaryCutoff.rejected, (state) => {
      state.isCreatingSalaryCutoff = false;
      toast.error('Salary Cutoff Creation Failed');
  })
  .addCase(updateSalaryCutoff.pending, (state) => {
      state.isEditingSalaryCutoff = true;
  })
  .addCase(updateSalaryCutoff.fulfilled, (state) => {
      state.isEditingSalaryCutoff = false;
      state.editSalaryCutoff = false;
      state.editSalaryCutoffId = '';
      toast.success('Salary Cutoff Updated Successfully');
  })
  .addCase(updateSalaryCutoff.rejected, (state) => {
      state.isEditingSalaryCutoff = false;
      toast.error('Salary Cutoff Update Failed');
  })
  .addCase(deleteSalaryCutoff.pending, (state) => {
      state.isDeletingSalaryCutoff = true;
      toast.info('Deleting Salary Cutoff...');
  })
  .addCase(deleteSalaryCutoff.fulfilled, (state) => {
      state.isDeletingSalaryCutoff = false;
      toast.success('Salary Cutoff Deleted Successfully');
  })
  .addCase(deleteSalaryCutoff.rejected, (state) => {
      state.isDeletingSalaryCutoff = false;
  })
  .addCase(fetchAllPaygroups.pending, (state) => {
      state.isFetchingPaygroups = true;
  })
  .addCase(fetchAllPaygroups.fulfilled, (state, { payload }) => {
      state.isFetchingPaygroups = false;
      state.paygroups = payload.paygroups;
  })
  .addCase(createPaygroup.pending, (state) => {
      state.isCreatingPaygroup = true;
  })
  .addCase(createPaygroup.fulfilled, (state, { payload }) => {
      state.isCreatingPaygroup = false;
      state.createPaygroupStatus = false;
      state.paygroup_name = '';
      state.designationId = '';
      toast.success(payload.msg);
  })
  .addCase(createPaygroup.rejected, (state, { payload }) => {
      state.isCreatingPaygroup = false;
      state.designationId = '';
      toast.error(payload.error);
  })
  .addCase(updatePaygroup.pending, (state) => {
      state.isEditingPaygroup = true;
  })
  .addCase(updatePaygroup.fulfilled, (state, { payload }) => {
      state.isEditingPaygroup = false;
      state.editPaygroup = false;
      state.editPaygroupId = '';
      toast.success(payload.msg);
  })
  .addCase(updatePaygroup.rejected, (state, { payload }) => {
      state.isEditingPaygroup = false;
      state.designationId = '';
      toast.error(payload.error);
  })
  .addCase(deletePaygroup.pending, (state) => {
      state.isDeletingPaygroup = true;
  })
  .addCase(deletePaygroup.fulfilled, (state, { payload }) => {
      state.isDeletingPaygroup = false;
      toast.success(payload.msg);
  })
  .addCase(deletePaygroup.rejected, (state, { payload }) => {
      state.isDeletingPaygroup = false;
      toast.error(payload.msg);
  })
  .addCase(fetchAdminSalary.pending, (state) => {
      state.isFetchingAdminSalary = true;
  })
  .addCase(fetchAdminSalary.fulfilled, (state, { payload }) => {
      state.isFetchingAdminSalary = false;
      state.admin_salaries = payload.admin_salaries;
      state.totalAdminSalaries = payload.totalAdminSalaries;
      state.totalAdminSalariesPages = payload.totalPages;
  })
  .addCase(fetchAdminSalary.rejected, (state) => {
      state.isFetchingAdminSalary = false;
  })
  .addCase(createAdminSalary.pending, (state) => {
      state.isCreatingAdminSalary = true;
  })
  .addCase(createAdminSalary.fulfilled, (state, { payload }) => {
      state.isCreatingAdminSalary = false;
      state.createAdminSalaryStatus = false;
      toast.success(payload.msg);
  })
  .addCase(createAdminSalary.rejected, (state, { payload }) => {
      state.isCreatingAdminSalary = false;
      toast.error(payload.error);
  })
  .addCase(updateAdminSalary.pending, (state) => {
      state.isEditingAdminSalary = true;
  })
  .addCase(updateAdminSalary.fulfilled, (state, { payload }) => {
      state.isEditingAdminSalary = false;
      state.editAdminSalary = false;
      state.editAdminSalaryId = '';
      toast.success(payload.msg);
  })
  .addCase(updateAdminSalary.rejected, (state, { payload }) => {
      state.isEditingAdminSalary = false;
      toast.error(payload.error);
  })
  .addCase(deleteAdminSalary.pending, (state) => {
      state.isDeletingAdminSalary = true;
  })
  .addCase(deleteAdminSalary.fulfilled, (state, { payload }) => {
      state.isDeletingAdminSalary = false;
      toast.success(payload.msg);
  })
  .addCase(deleteAdminSalary.rejected, (state, { payload }) => {
      state.isDeletingAdminSalary = false;
      toast.error(payload.msg);
  })
  .addCase(fetchTeachingSalary.pending, (state) => {
      state.isFetchingTeachingSalary = true;
  })
  .addCase(fetchTeachingSalary.fulfilled, (state, { payload }) => {
      state.isFetchingTeachingSalary = false;
      state.teaching_salaries = payload.teachingSalaries;
      state.totalTeachingSalaries = payload.totalTeachingSalaries;
      state.totalTeachingSalariesPages = payload.totalPages;
  })
  .addCase(fetchTeachingSalary.rejected, (state) => {
      state.isFetchingTeachingSalary = false;
  })
  .addCase(createTeachingSalary.pending, (state) => {
      state.isCreatingTeachingSalary = true;
  })
  .addCase(createTeachingSalary.fulfilled, (state, { payload }) => {
      state.isCreatingTeachingSalary = false;
      state.createTeachingSalaryStatus = false;
      toast.success(payload.msg);
  })
  .addCase(createTeachingSalary.rejected, (state, { payload }) => {
      state.isCreatingTeachingSalary = false;
      toast.error(payload.error);
  })
  .addCase(updateTeachingSalary.pending, (state) => {
      state.isEditingTeachingSalary = true;
  })
  .addCase(updateTeachingSalary.fulfilled, (state, { payload }) => {
      state.isEditingTeachingSalary = false;
      state.editTeachingSalary = false;
      state.editTeachingSalaryId = '';
      toast.success(payload.msg);
  })
  .addCase(updateTeachingSalary.rejected, (state, { payload }) => {
      state.isEditingTeachingSalary = false;
      toast.error(payload.error);
  })
  .addCase(deleteTeachingSalary.pending, (state) => {
      state.isDeletingTeachingSalary = true;
  })
  .addCase(deleteTeachingSalary.fulfilled, (state, { payload }) => {
      state.isDeletingTeachingSalary = false;
      toast.success(payload.msg);
  })
  .addCase(deleteTeachingSalary.rejected, (state, { payload }) => {
      state.isDeletingTeachingSalary = false;
      toast.error(payload.msg);
  })
  .addCase(fetchTeachingLoads.pending, (state) => {
      state.isFetchingTeachingLoads = true;
  })
  .addCase(fetchTeachingLoads.fulfilled, (state, { payload }) => {
      state.isFetchingTeachingLoads = false;
      state.teaching_loads = payload.teaching_loads;
      state.totalTeachingLoads = payload.totalTeachingLoads;
      state.totalTeachingLoadsPages = payload.totalPages;
  })
  .addCase(fetchTeachingLoads.rejected, (state) => {
      state.isFetchingTeachingLoads = false;
  })
  .addCase(createTeachingLoad.pending, (state) => {
      state.isCreatingTeachingLoad = true;
  })
  .addCase(createTeachingLoad.fulfilled, (state, { payload }) => {
      state.isCreatingTeachingLoad = false;
      state.createTeachingLoadStatus = false;
      toast.success(payload.msg);
  })
  .addCase(createTeachingLoad.rejected, (state, { payload }) => {
      state.isCreatingTeachingLoad = false;
      toast.error(payload.error);
  })
  .addCase(updateTeachingLoad.pending, (state) => {
      state.isEditingTeachingLoad = true;
  })
  .addCase(updateTeachingLoad.fulfilled, (state, { payload }) => {
      state.isEditingTeachingLoad = false;
      state.editTeachingLoad = false;
      state.editTeachingLoadId = '';
      toast.success(payload.msg);
  })
  .addCase(updateTeachingLoad.rejected, (state, { payload }) => {
      state.isEditingTeachingLoad = false;
      toast.error(payload.error);
  })
  .addCase(deleteTeachingLoad.pending, (state) => {
      state.isDeletingTeachingLoad = true;
  })
  .addCase(deleteTeachingLoad.fulfilled, (state, { payload }) => {
      state.isDeletingTeachingLoad = false;
      toast.success(payload.msg);
  })
  .addCase(deleteTeachingLoad.rejected, (state, { payload }) => {
      state.isDeletingTeachingLoad = false;
      toast.error(payload.msg);
  })
  .addCase(fetchTeachingGradeInfos.pending, (state) => {
      state.isFetchingTeachingGradeInfos = true;
  })
  .addCase(fetchTeachingGradeInfos.fulfilled, (state, { payload }) => {
      state.isFetchingTeachingGradeInfos = false;
      state.teaching_grade_infos = payload.teaching_grade_infos;
      state.totalTeachingGradeInfos = payload.totalTeachingGradeInfos;
      state.totalTeachingGradeInfosPages = payload.totalPages;
  })
  .addCase(fetchTeachingGradeInfos.rejected, (state) => {
      state.isFetchingTeachingGradeInfos = false;
  })
  .addCase(createTeachingGradeInfo.pending, (state) => {
      state.isCreatingTeachingGradeInfo = true;
  })
  .addCase(createTeachingGradeInfo.fulfilled, (state, { payload }) => {
      state.isCreatingTeachingGradeInfo = false;
      state.createTeachingGradeInfoStatus = false;
      toast.success(payload.msg);
  })
  .addCase(createTeachingGradeInfo.rejected, (state, { payload }) => {
      state.isCreatingTeachingGradeInfo = false;
      toast.error(payload.error);
  })
  .addCase(updateTeachingGradeInfo.pending, (state) => {
      state.isEditingTeachingGradeInfo = true;
  })
  .addCase(updateTeachingGradeInfo.fulfilled, (state, { payload }) => {
      state.isEditingTeachingGradeInfo = false;
      state.editTeachingGradeInfo = false;
      state.editTeachingGradeInfoId = '';
      toast.success(payload.msg);
  })
  .addCase(updateTeachingGradeInfo.rejected, (state, { payload }) => {
      state.isEditingTeachingGradeInfo = false;
      toast.error(payload.error);
  })
  .addCase(deleteTeachingGradeInfo.pending, (state) => {
      state.isDeletingTeachingGradeInfo = true;
  })
  .addCase(deleteTeachingGradeInfo.fulfilled, (state, { payload }) => {
      state.isDeletingTeachingGradeInfo = false;
      toast.success(payload.msg);
  })
  .addCase(deleteTeachingGradeInfo.rejected, (state, { payload }) => {
      state.isDeletingTeachingGradeInfo = false;
      toast.error(payload.msg);
  })
  .addCase(fetchSpecialSalary.pending, (state) => {
      state.isFetchingSpecialSalary = true;
  })
  .addCase(fetchSpecialSalary.fulfilled, (state, { payload }) => {
      state.isFetchingSpecialSalary = false;
      state.special_salaries = payload.specialSalary;
      state.totalSpecialSalaries = payload.totalSpecialSalaries;
      state.totalSpecialSalariesPages = payload.totalPages;
  })
  .addCase(fetchSpecialSalary.rejected, (state) => {
      state.isFetchingSpecialSalary = false;
  })
  .addCase(createSpecialSalary.pending, (state) => {
      state.isCreatingSpecialSalary = true;
  })
  .addCase(createSpecialSalary.fulfilled, (state, { payload }) => {
      state.isCreatingSpecialSalary = false;
      state.createSpecialSalaryStatus = false;
      toast.success(payload.msg);
  })
  .addCase(createSpecialSalary.rejected, (state, { payload }) => {
      state.isCreatingSpecialSalary = false;
      toast.error(payload.error);
  })
  .addCase(updateSpecialSalary.pending, (state) => {
      state.isEditingSpecialSalary = true;
  })
  .addCase(updateSpecialSalary.fulfilled, (state, { payload }) => {
      state.isEditingSpecialSalary = false;
      state.editSpecialSalary = false;
      state.editSpecialSalaryId = '';
      toast.success(payload.msg);
  })
  .addCase(updateSpecialSalary.rejected, (state, { payload }) => {
      state.isEditingSpecialSalary = false;
      toast.error(payload.error);
  })
  .addCase(deleteSpecialSalary.pending, (state) => {
      state.isDeletingSpecialSalary = true;
  })
  .addCase(deleteSpecialSalary.fulfilled, (state, { payload }) => {
      state.isDeletingSpecialSalary = false;
      toast.success(payload.msg);
  })
  .addCase(deleteSpecialSalary.rejected, (state, { payload }) => {
      state.isDeletingSpecialSalary = false;
      toast.error(payload.msg);
  })
  .addCase(fetchAdminPrimaryDesignation.pending, (state) => {
      state.isFetchingAdminPrimaryDesignation = true;
  })
  .addCase(fetchAdminPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isFetchingAdminPrimaryDesignation = false;
      state.admin_primary_designation = payload.admin_primary_designation[0].admin_primary_designation;
  })
  .addCase(fetchAdminPrimaryDesignation.rejected, (state) => {
      state.isFetchingAdminPrimaryDesignation = false;
  })
  .addCase(toggleAdminPrimaryDesignation.pending, (state) => {
      state.isSettingAdminPrimaryDesignation = true;
      toast.info('Please wait...');
  })
  .addCase(toggleAdminPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isSettingAdminPrimaryDesignation = false;
      toast.success(payload.msg);
  })
  .addCase(toggleAdminPrimaryDesignation.rejected, (state, { payload }) => {
      state.isSettingAdminPrimaryDesignation = false;
      toast.error(payload.msg);
  })
  .addCase(fetchTeachingPrimaryDesignation.pending, (state) => {
      state.isFetchingTeachingPrimaryDesignation = true;
  })
  .addCase(fetchTeachingPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isFetchingTeachingPrimaryDesignation = false;
      state.teaching_primary_designation = payload.teaching_primary_designation[0].teaching_primary_designation;
  })
  .addCase(fetchTeachingPrimaryDesignation.rejected, (state) => {
      state.isFetchingTeachingPrimaryDesignation = false;
  })
  .addCase(toggleTeachingPrimaryDesignation.pending, (state) => {
      state.isSettingTeachingPrimaryDesignation = true;
      toast.info('Please wait...');
  })
  .addCase(toggleTeachingPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isSettingTeachingPrimaryDesignation = false;
      toast.success(payload.msg);
  })
  .addCase(toggleTeachingPrimaryDesignation.rejected, (state, { payload }) => {
      state.isSettingTeachingPrimaryDesignation = false;
      toast.error(payload.msg);
  })
  .addCase(fetchSpecialPrimaryDesignation.pending, (state) => {
      state.isFetchingSpecialPrimaryDesignation = true;
  })
  .addCase(fetchSpecialPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isFetchingSpecialPrimaryDesignation = false;
      state.special_primary_designation = payload.special_primary_designation[0].special_primary_designation;
  })
  .addCase(fetchSpecialPrimaryDesignation.rejected, (state) => {
      state.isFetchingSpecialPrimaryDesignation = false;
  })
  .addCase(toggleSpecialPrimaryDesignation.pending, (state) => {
      state.isSettingSpecialPrimaryDesignation = true;
      toast.info('Please wait...');
  })
  .addCase(toggleSpecialPrimaryDesignation.fulfilled, (state, { payload }) => {
      state.isSettingSpecialPrimaryDesignation = false;
      toast.success(payload.msg);
  })
  .addCase(toggleSpecialPrimaryDesignation.rejected, (state, { payload }) => {
      state.isSettingSpecialPrimaryDesignation = false;
      toast.error(payload.msg);
    })
  }
});

export const {
  handleChange,
  toggleEditCutOffDate,
  setCutOffDate,
  resetCutOffDate,
  toggleViewTimesheet,
  resetTimesheetValues,
  setTimesheetValues,
  setTimesheet,
  toggleEditTimesheet,
  setSalaryGradeGuide,
  toggleEditSalaryGradeGuide,
  resetSalaryGradeGuideValues,
  toggleCreateSalaryGradeGuide,
  toggleCreateCutOffDate,
  toggleEditSalaryCutoff,
  setSalaryCutoff,
  resetSalaryCutoffValues,
  setEmployeeId,
  setPaygroup,
  toggleEditPaygroup,
  resetPaygroupValues,
  toggleCreatePaygroup,
  resetTemplateDateFilters,
  toggleCreateAdminSalary,
  toggleEditAdminSalary,
  setAdminSalary,
  resetAdminSalaryValues,
  toggleCreateTeachingSalary,
  toggleEditTeachingSalary,
  setTeachingSalary,
  resetTeachingSalaryValues,
  toggleCreateSpecialSalary,
  toggleEditSpecialSalary,
  setSpecialSalary,
  resetSpecialSalaryValues,
  toggleCreateTeachingLoad,
  toggleEditTeachingLoad,
  setTeachingLoad,
  resetTeachingLoadValues,
  toggleCreateTeachingGradeInfo,
  toggleEditTeachingGradeInfo,
  setTeachingGradeInfo,
  resetTeachingGradeInfoValues
} = payrollSlice.actions;

export default payrollSlice.reducer;
