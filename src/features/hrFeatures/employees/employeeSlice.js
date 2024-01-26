import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addAttendanceIdToLocalStorage,
  addBreakIdToLocalStorage,
  getAttendanceIdFromLocalStorage,
  getBreakIdFromLocalStorage,
  getClockInStatusFromLocalStorage,
  getStartBreakStatusFromLocalStorage,
  removeAttendanceIdFromLocalStorage,
  removeBreakIdFromLocalStorage,
  updateLocalStorageBreakEndState,
  updateLocalStorageClockOutState,
} from 'src/utils/localStorage';
import {
  calculateBreaksThunk,
  calculateTotalHoursThunk,
  clockInThunk,
  clockOutThunk,
  createAdminCompensationThunk,
  createEmployeeThunk,
  createSpecialCompensationThunk,
  createTeachingCompensationThunk,
  deleteAdminCompensationThunk,
  deleteAttendanceThunk,
  deleteBreakThunk,
  deleteEmployeeThunk,
  deleteSpecialCompensationThunk,
  deleteTeachingCompensationThunk,
  endBreakThunk,
  fetchAllAdminCompensationsThunk,
  fetchAllAttendancesThunk,
  fetchAllBreaksThunk,
  fetchAllSpecialCompensationsThunk,
  fetchAllTeachingCompensationsThunk,
  startBreakThunk,
  updateAdminCompensationThunk,
  updateAttendanceThunk,
  updateBreakThunk,
  updateEmployeeThunk,
  updateSpecialCompensationThunk,
  updateTeachingCompensationThunk,
} from './employeeThunk';

const clockedInStatus = getClockInStatusFromLocalStorage();
const startBreakStatus = getStartBreakStatusFromLocalStorage();
const attendanceId = getAttendanceIdFromLocalStorage();
const breakId = getBreakIdFromLocalStorage();

const initialState = {
  employees: [],
  userDesignations: [],
  first_name: '',
  last_name: '',
  middle_name: '',
  email: '',
  employee_id: '',
  username: '',
  birth_date: '',
  age: '',
  gender: '',
  phone: '',
  religion: '',
  civil_status: '',
  role_id: '',
  civil_statusOptions: [
    'single',
    'married',
    'separated',
    'widower',
    'single parent',
  ],
  blood_typeOptions: ['A', 'B', 'AB', 'O'],
  nationality: '',
  blood_type: '',
  address: '',
  joining_date: '',
  supervisors: [],
  department_name: '',
  department_id: '',
  supervisor_id: null,
  personal_email: '',
  skills_and_competencies: '',
  secondary_phone: '',
  supervisor: 'no',
  password: '',
  isViewingUser: '',
  employeeID: '',
  createEmployeeStatus: false,
  isCreatingEmployee: false,
  isFetchingEmployees: false,
  isEditingEmployee: false,
  editEmployee: false,
  isDeletingEmployee: false,
  page: 1,

  admin_designation_toggle: false,
  admin_department: null,
  admin_designation: null,
  admin_designation_year: '',
  admin_designation_semester: '',

  teaching_designation_toggle: false,
  teaching_department: null,
  teaching_designation: null,
  teaching_designation_year: '',
  teaching_designation_semester: '',
  teaching_designation_specialization: '',

  special_designation_toggle: false,
  special_department: null,
  special_designation: null,
  special_designation_year: '',
  special_designation_semester: '',

  // Compensation

  adminCompensations: [],
  teachingCompensations: [],
  specialCompensations: [],

  isFetchingAdminCompensations: false,
  isFetchingTeachingCompensations: false,
  isFetchingSpecialCompensations: false,

  isCreatingAdminCompensation: false,
  isCreatingTeachingCompensation: false,
  isCreatingSpecialCompensation: false,

  isEditingAdminCompensation: false,
  isEditingTeachingCompensation: false,
  isEditingSpecialCompensation: false,

  isDeletingAdminCompensation: false,
  isDeletingTeachingCompensation: false,
  isDeletingSpecialCompensation: false,

  viewAdminCompensation: false,
  viewTeachingCompensation: false,
  viewSpecialCompensation: false,

  editAdminCompensation: false,
  editTeachingCompensation: false,
  editSpecialCompensation: false,

  editAdminCompensationId: '',
  editTeachingCompensationId: '',
  editSpecialCompensationId: '',

  createAdminCompensationStatus: false,
  createTeachingCompensationStatus: false,
  createSpecialCompensationStatus: false,

  salary_rate: '',
  salary_grade: '',
  computed_hourly_rate: '',
  cutOffPeriod: '',
  userId: '',
  sss: '',
  philhealth: '',
  pag_ibig: '',
  tax_salary_category: '',
  tax_withheld: '',
  total_earnings: '',
  total_deductions: '',
  take_home_pay: '',
  other_allowances: [
    {
      other_allowance_type: '',
      other_allowance_amount: 0,
    },
  ],

  // Attendance

  attendances: [],
  isFetchingAttendances: false,
  attendanceId: attendanceId ? attendanceId : '',
  editAttendanceId: '',
  isClockingIn: false,
  isClockingOut: false,
  clock_in: '',
  clock_out: '',
  total_hours_worked: '',
  attendance_date: '',
  clockedIn: clockedInStatus ? clockedInStatus : false,
  clockedOut: clockedInStatus ? false : true,
  editAttendance: false,
  isUpdatingAttendance: false,
  isDeletingAttendance: false,
  attendancePage: 1,
  totalAttendances: 0,
  totalAttendancesPage: 0,

  breaks: [],
  isFetchingBreaks: false,
  breakId: breakId ? breakId : '',
  editBreak: false,
  editBreakId: '',
  isStartingBreak: false,
  isEndingBreak: false,
  breakStarted: startBreakStatus ? startBreakStatus : false,
  breakEnded: startBreakStatus ? false : true,
  break_attendance_date: '',
  isCalculatingTotalBreakHours: false,
  isUpdatingBreak: false,
  isDeletingBreak: false,
  total_break_time: '',
  break_start: '',
  break_end: '',
  breakPage: 1,
  totalBreaks: 0,
  totalBreaksPage: 0,
};

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employee, thunkAPI) => {
    return createEmployeeThunk('/auth/register', employee, thunkAPI);
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (employee, thunkAPI) => {
    return updateEmployeeThunk(
      `/users/${employee.employeeID}`,
      employee,
      thunkAPI
    );
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (employeeId, thunkAPI) => {
    return deleteEmployeeThunk(`/users/${employeeId}`, thunkAPI);
  }
);

// **** Compensations ****

// Admin

export const fetchAllAdminCompensations = createAsyncThunk(
  'employee/fetchAllAdminCompensations',
  async (_, thunkAPI) => {
    return fetchAllAdminCompensationsThunk('/admin-compensations', thunkAPI);
  }
);

export const createAdminCompensation = createAsyncThunk(
  'employee/createAdminCompensation',
  async (compensation, thunkAPI) => {
    return createAdminCompensationThunk(
      '/admin-compensations',
      compensation,
      thunkAPI
    );
  }
);

export const updateAdminCompensation = createAsyncThunk(
  'employee/updateAdminCompensation',
  async (compensation, thunkAPI) => {
    return updateAdminCompensationThunk(
      `/admin-compensations/${compensation.editCompensationId}`,
      compensation,
      thunkAPI
    );
  }
);

export const deleteAdminCompensation = createAsyncThunk(
  'employee/deleteAdminCompensation',
  async (compensationId, thunkAPI) => {
    return deleteAdminCompensationThunk(
      `/admin-compensations/${compensationId}`,
      thunkAPI
    );
  }
);

// Teaching

export const fetchAllTeachingCompensations = createAsyncThunk(
  'employee/fetchAllTeachingCompensations',
  async (_, thunkAPI) => {
    return fetchAllTeachingCompensationsThunk(
      '/teaching-compensations',
      thunkAPI
    );
  }
);

export const createTeachingCompensation = createAsyncThunk(
  'employee/createTeachingCompensation',
  async (compensation, thunkAPI) => {
    return createTeachingCompensationThunk(
      '/teaching-compensations',
      compensation,
      thunkAPI
    );
  }
);

export const updateTeachingCompensation = createAsyncThunk(
  'employee/updateTeachingCompensation',
  async (compensation, thunkAPI) => {
    return updateTeachingCompensationThunk(
      `/teaching-compensations/${compensation.editCompensationId}`,
      compensation,
      thunkAPI
    );
  }
);

export const deleteTeachingCompensation = createAsyncThunk(
  'employee/deleteTeachingCompensation',
  async (compensationId, thunkAPI) => {
    return deleteTeachingCompensationThunk(
      `/teaching-compensations/${compensationId}`,
      thunkAPI
    );
  }
);

// Special

export const fetchAllSpecialCompensations = createAsyncThunk(
  'employee/fetchAllSpecialCompensations',
  async (_, thunkAPI) => {
    return fetchAllSpecialCompensationsThunk(
      '/special-compensations',
      thunkAPI
    );
  }
);

export const createSpecialCompensation = createAsyncThunk(
  'employee/createSpecialCompensation',
  async (compensation, thunkAPI) => {
    return createSpecialCompensationThunk(
      '/special-compensations',
      compensation,
      thunkAPI
    );
  }
);

export const updateSpecialCompensation = createAsyncThunk(
  'employee/updateSpecialCompensation',
  async (compensation, thunkAPI) => {
    return updateSpecialCompensationThunk(
      `/special-compensations/${compensation.editCompensationId}`,
      compensation,
      thunkAPI
    );
  }
);

export const deleteSpecialCompensation = createAsyncThunk(
  'employee/deleteSpecialCompensation',
  async (compensationId, thunkAPI) => {
    return deleteSpecialCompensationThunk(
      `/special-compensations/${compensationId}`,
      thunkAPI
    );
  }
);
// Attendance

export const fetchAllAttendances = createAsyncThunk(
  'employee/fetchAllAttendances',
  async (_, thunkAPI) => {
    return fetchAllAttendancesThunk(
      `/attendance?page=${thunkAPI.getState().employees.attendancePage}`,
      thunkAPI
    );
  }
);

export const fetchAllBreaks = createAsyncThunk(
  'employee/fetchAllBreaks',
  async (_, thunkAPI) => {
    return fetchAllBreaksThunk(
      `/breaks?page=${thunkAPI.getState().employees.breakPage}`,
      thunkAPI
    );
  }
);

export const clockIn = createAsyncThunk(
  'employee/clockIn',
  async (_, thunkAPI) => {
    return clockInThunk('/attendance/clockin', thunkAPI);
  }
);

export const clockOut = createAsyncThunk(
  'employee/clockOut',
  async (_, thunkAPI) => {
    return clockOutThunk(
      `/attendance/clockout/${localStorage.getItem('attendanceId')}`,
      thunkAPI
    );
  }
);

export const calculateTotalHours = createAsyncThunk(
  'employee/calculateTotalHours',
  async (_, thunkAPI) => {
    return calculateTotalHoursThunk(
      `/attendance/calculate/${localStorage.getItem('attendanceId')}`,
      thunkAPI
    );
  }
);

export const updateAttendance = createAsyncThunk(
  'employee/updateAttendance',
  async (attendance, thunkAPI) => {
    return updateAttendanceThunk(
      `/attendance/${attendance.editAttendanceId}`,
      attendance,
      thunkAPI
    );
  }
);

export const deleteAttendance = createAsyncThunk(
  'employee/deleteAttendance',
  async (attendanceId, thunkAPI) => {
    return deleteAttendanceThunk(`/attendance/${attendanceId}`, thunkAPI);
  }
);

export const startBreak = createAsyncThunk(
  'employee/startBreak',
  async (_, thunkAPI) => {
    return startBreakThunk('/breaks/startbreak', thunkAPI);
  }
);

export const endBreak = createAsyncThunk(
  'employee/endBreak',
  async (_, thunkAPI) => {
    return endBreakThunk(
      `/breaks/endbreak/${localStorage.getItem('breakId')}`,
      thunkAPI
    );
  }
);

export const calculateBreaks = createAsyncThunk(
  'employee/calculateBreaks',
  async (_, thunkAPI) => {
    return calculateBreaksThunk(
      `/breaks/calculatebreak/${localStorage.getItem('breakId')}`,
      thunkAPI
    );
  }
);

export const updateBreak = createAsyncThunk(
  'employee/updateBreak',
  async (breaks, thunkAPI) => {
    return updateBreakThunk(`/breaks/${breaks.editBreakId}`, breaks, thunkAPI);
  }
);

export const deleteBreak = createAsyncThunk(
  'employee/deleteBreak',
  async (breakId, thunkAPI) => {
    return deleteBreakThunk(`/breaks/${breakId}`, thunkAPI);
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    toggleViewingUser: (state) => {
      state.isViewingUser = !state.isViewingUser;
    },
    toggleCreateEmployee: (state) => {
      state.createEmployeeStatus = !state.createEmployeeStatus;
    },
    toggleEditEmployee: (state) => {
      state.editEmployee = !state.editEmployee;
    },
    setEmployeeValues: (state, { payload }) => {
      state.employeeID = payload._id;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.middle_name = payload.middle_name;
      state.username = payload.username;
      state.email = payload.email;
      state.employee_id = payload.employee_id;
      state.personal_email = payload.personal_email;
      state.gender = payload.gender;
      state.religion = payload.religion;
      state.birth_date = payload.birth_date;
      state.age = payload.age;
      state.phone = payload.phone;
      state.secondary_phone = payload.secondary_phone;
      state.civil_status = payload.civil_status;
      state.blood_type = payload.blood_type;
      state.address = payload.address;
      state.skills_and_competencies = payload.skills_and_competencies;
      state.nationality = payload.nationality;
      state.joining_date = payload.joining_date;
      state.role_id = payload.role_id;
      state.supervisor = payload.supervisor;
      state.supervisor_id = payload.supervisor_id;
      state.admin_designation_toggle = payload.admin_designation_toggle;
      state.admin_department = payload.admin_department;
      state.admin_designation = payload.admin_designation;
      state.admin_designation_year = payload.admin_designation_year;
      state.admin_designation_semester = payload.admin_designation_semester;
      state.teaching_designation_toggle = payload.teaching_designation_toggle;
      state.teaching_department = payload.teaching_department;
      state.teaching_designation = payload.teaching_designation;
      state.teaching_designation_year = payload.teaching_designation_year;
      state.teaching_designation_semester =
        payload.teaching_designation_semester;
      state.teaching_designation_specialization =
        payload.teaching_designation_specialization;
      state.special_designation_toggle = payload.special_designation_toggle;
      state.special_department = payload.special_department;
      state.special_designation = payload.special_designation;
      state.special_designation_year = payload.special_designation_year;
      state.special_designation_semester = payload.special_designation_semester;
    },
    clearDynamicFields: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    // *** Admin Compensation ***

    toggleViewAdminCompensation: (state) => {
      state.viewAdminCompensation = !state.viewAdminCompensation;
    },
    toggleEditAdminCompensation: (state) => {
      state.editAdminCompensation = !state.editAdminCompensation;
    },
    toggleCreateAdminCompensation: (state) => {
      state.createAdminCompensationStatus =
        !state.createAdminCompensationStatus;
    },
    setAdminCompensationValues: (state, action) => {
      state.editAdminCompensationId = action.payload._id;
      state.userId = action.payload.userId;
      state.salary_rate = action.payload.salary_rate;
      state.salary_grade = action.payload.salary_grade;
      state.computed_hourly_rate = action.payload.computed_hourly_rate;
      state.sss = action.payload.sss;
      state.philhealth = action.payload.philhealth;
      state.pag_ibig = action.payload.pag_ibig;
      state.tax_salary_category = action.payload.tax_salary_category;
      state.tax_withheld = action.payload.tax_withheld;
      state.total_earnings = action.payload.total_earnings;
      state.total_deductions = action.payload.total_deductions;
      state.take_home_pay = action.payload.take_home_pay;
      state.other_allowances = action.payload.other_allowances;
    },
    clearAdminCompensation: (state) => {
      state.editAdminCompensationId = '';
      state.salary_rate = '';
      state.salary_grade = '';
      state.computed_hourly_rate = '';
      state.sss = '';
      state.philhealth = '';
      state.pag_ibig = '';
      state.tax_salary_category = '';
      state.tax_withheld = '';
      state.total_earnings = '';
      state.total_deductions = '';
      state.take_home_pay = '';
      state.other_allowances = [
        {
          other_allowance_type: '',
          other_allowance_amount: 0,
        },
      ];
      state.createAdminCompensationStatus = false;
      state.editAdminCompensation = false;
      state.viewAdminCompensation = false;
      state.userId = '';
    },

    // *** Teaching Compensation ***

    toggleViewTeachingCompensation: (state) => {
      state.viewTeachingCompensation = !state.viewTeachingCompensation;
    },
    toggleEditTeachingCompensation: (state) => {
      state.editTeachingCompensation = !state.editTeachingCompensation;
    },
    toggleCreateTeachingCompensation: (state) => {
      state.createTeachingCompensationStatus =
        !state.createTeachingCompensationStatus;
    },
    setTeachingCompensationValues: (state, action) => {
      state.editTeachingCompensationId = action.payload._id;
      state.userId = action.payload.userId;
      state.salary_rate = action.payload.salary_rate;
      state.salary_grade = action.payload.salary_grade;
      state.computed_hourly_rate = action.payload.computed_hourly_rate;
      state.sss = action.payload.sss;
      state.philhealth = action.payload.philhealth;
      state.pag_ibig = action.payload.pag_ibig;
      state.tax_salary_category = action.payload.tax_salary_category;
      state.tax_withheld = action.payload.tax_withheld;
      state.total_earnings = action.payload.total_earnings;
      state.total_deductions = action.payload.total_deductions;
      state.take_home_pay = action.payload.take_home_pay;
      state.other_allowances = action.payload.other_allowances;
    },
    clearTeachingCompensation: (state) => {
      state.editTeachingCompensationId = '';
      state.salary_rate = '';
      state.salary_grade = '';
      state.computed_hourly_rate = '';
      state.sss = '';
      state.philhealth = '';
      state.pag_ibig = '';
      state.tax_salary_category = '';
      state.tax_withheld = '';
      state.total_earnings = '';
      state.total_deductions = '';
      state.take_home_pay = '';
      state.other_allowances = [
        {
          other_allowance_type: '',
          other_allowance_amount: 0,
        },
      ];
      state.createTeachingCompensationStatus = false;
      state.editTeachingCompensation = false;
      state.viewTeachingCompensation = false;
      state.userId = '';
    },

    // *** Special Compensation ***

    toggleViewSpecialCompensation: (state) => {
      state.viewSpecialCompensation = !state.viewSpecialCompensation;
    },
    toggleEditSpecialCompensation: (state) => {
      state.editSpecialCompensation = !state.editSpecialCompensation;
    },
    toggleCreateSpecialCompensation: (state) => {
      state.createSpecialCompensationStatus =
        !state.createSpecialCompensationStatus;
    },
    setSpecialCompensationValues: (state, action) => {
      state.editSpecialCompensationId = action.payload._id;
      state.userId = action.payload.userId;
      state.salary_rate = action.payload.salary_rate;
      state.salary_grade = action.payload.salary_grade;
      state.computed_hourly_rate = action.payload.computed_hourly_rate;
      state.sss = action.payload.sss;
      state.philhealth = action.payload.philhealth;
      state.pag_ibig = action.payload.pag_ibig;
      state.tax_salary_category = action.payload.tax_salary_category;
      state.tax_withheld = action.payload.tax_withheld;
      state.total_earnings = action.payload.total_earnings;
      state.total_deductions = action.payload.total_deductions;
      state.take_home_pay = action.payload.take_home_pay;
      state.other_allowances = action.payload.other_allowances;
    },
    clearSpecialCompensation: (state) => {
      state.editSpecialCompensationId = '';
      state.salary_rate = '';
      state.salary_grade = '';
      state.computed_hourly_rate = '';
      state.sss = '';
      state.philhealth = '';
      state.pag_ibig = '';
      state.tax_salary_category = '';
      state.tax_withheld = '';
      state.total_earnings = '';
      state.total_deductions = '';
      state.take_home_pay = '';
      state.other_allowances = [
        {
          other_allowance_type: '',
          other_allowance_amount: 0,
        },
      ];
      state.createSpecialCompensationStatus = false;
      state.editSpecialCompensation = false;
      state.viewSpecialCompensation = false;
      state.userId = '';
    },
    toggleEditAttendance: (state) => {
      state.editAttendance = !state.editAttendance;
    },
    setAttendanceValues: (state, { payload }) => {
      state.editAttendanceId = payload._id;
      state.attendance_date = payload.attendance_date;
      state.clock_in = payload.start;
      state.clock_out = payload.end;
      state.total_hours_worked = payload.total_hours_worked;
      state.employeeID = payload.userId?._id;
    },
    clearAttendance: (state) => {
      state.editAttendanceId = '';
      state.attendance_date = '';
      state.clock_in = '';
      state.clock_out = '';
      state.editAttendance = false;
      state.employeeID = '';
    },
    toggleEditBreak: (state) => {
      state.editBreak = !state.editBreak;
    },
    setBreakValues: (state, { payload }) => {
      state.editBreakId = payload._id;
      state.break_attendance_date = payload.attendance_date;
      state.break_start = payload.start;
      state.break_end = payload.end;
      state.total_break_time = payload.total_break_time;
    },
    clearBreak: (state) => {
      state.editBreakId = '';
      state.break_attendance_date = '';
      state.break_start = '';
      state.break_end = '';
      state.editBreak = false;
      state.employeeID = '';
    },
    changeAttendancePage: (state, action) => {
      state.attendancePage = action.payload;
    },
    changeBreakPage: (state, action) => {
      state.breakPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isCreatingEmployee = true;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.isCreatingEmployee = false;
        state.createEmployeeStatus = false;
        toast.success('Employee created successfully');
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isCreatingEmployee = false;
        toast.error(action.payload.msg);
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isEditingEmployee = true;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.isEditingEmployee = false;
        toast.success('Employee updated successfully');
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isEditingEmployee = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isDeletingEmployee = true;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.isDeletingEmployee = false;
        toast.success('Employee deleted successfully');
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isDeletingEmployee = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllTeachingCompensations.pending, (state) => {
        state.isFetchingTeachingCompensations = true;
      })
      .addCase(fetchAllTeachingCompensations.fulfilled, (state, action) => {
        state.isFetchingCompensations = false;
        state.teachingCompensations = action.payload.compensations;
      })
      .addCase(fetchAllTeachingCompensations.rejected, (state, action) => {
        state.isFetchingTeachingCompensations = false;
        toast.error(action.payload.msg);
      })
      .addCase(createTeachingCompensation.pending, (state) => {
        state.isCreatingTeachingCompensation = true;
      })
      .addCase(createTeachingCompensation.fulfilled, (state) => {
        state.isCreatingTeachingCompensation = false;
        state.createTeachingCompensationStatus = false;
        toast.success('Compensation created successfully');
      })
      .addCase(createTeachingCompensation.rejected, (state, action) => {
        state.isCreatingTeachingCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(updateTeachingCompensation.pending, (state) => {
        state.isEditingTeachingCompensation = true;
      })
      .addCase(updateTeachingCompensation.fulfilled, (state) => {
        state.isEditingTeachingCompensation = false;
        state.editTeachingCompensation = false;
        toast.success('Compensation updated successfully');
      })
      .addCase(updateTeachingCompensation.rejected, (state, action) => {
        state.isEditingTeachingCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteTeachingCompensation.pending, (state) => {
        state.isDeletingTeachingCompensation = true;
        toast.info('Deleting compensation...');
      })
      .addCase(deleteTeachingCompensation.fulfilled, (state) => {
        state.isDeletingTeachingCompensation = false;
        toast.success('Compensation deleted successfully');
      })
      .addCase(deleteTeachingCompensation.rejected, (state, action) => {
        state.isDeletingTeachingCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllAdminCompensations.pending, (state) => {
        state.isFetchingAdminCompensations = true;
      })
      .addCase(fetchAllAdminCompensations.fulfilled, (state, action) => {
        state.isFetchingAdminCompensations = false;
        state.adminCompensations = action.payload.compensations;
      })
      .addCase(fetchAllAdminCompensations.rejected, (state, action) => {
        state.isFetchingAdminCompensations = false;
        toast.error(action.payload.msg);
      })
      .addCase(createAdminCompensation.pending, (state) => {
        state.isCreatingAdminCompensation = true;
      })
      .addCase(createAdminCompensation.fulfilled, (state) => {
        state.isCreatingAdminCompensation = false;
        state.createAdminCompensationStatus = false;
        toast.success('Compensation created successfully');
      })
      .addCase(createAdminCompensation.rejected, (state, action) => {
        state.isCreatingAdminCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(updateAdminCompensation.pending, (state) => {
        state.isEditingAdminCompensation = true;
      })
      .addCase(updateAdminCompensation.fulfilled, (state) => {
        state.isEditingAdminCompensation = false;
        state.editAdminCompensation = false;
        toast.success('Compensation updated successfully');
      })
      .addCase(updateAdminCompensation.rejected, (state, action) => {
        state.isEditingAdminCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteAdminCompensation.pending, (state) => {
        state.isDeletingAdminCompensation = true;
        toast.info('Deleting compensation...');
      })
      .addCase(deleteAdminCompensation.fulfilled, (state) => {
        state.isDeletingAdminCompensation = false;
        toast.success('Compensation deleted successfully');
      })
      .addCase(deleteAdminCompensation.rejected, (state, action) => {
        state.isDeletingAdminCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllSpecialCompensations.pending, (state) => {
        state.isFetchingCompensations = true;
      })
      .addCase(fetchAllSpecialCompensations.fulfilled, (state, action) => {
        state.isFetchingSpecialCompensations = false;
        state.specialCompensations = action.payload.compensations;
      })
      .addCase(fetchAllSpecialCompensations.rejected, (state, action) => {
        state.isFetchingSpecialCompensations = false;
        toast.error(action.payload.msg);
      })
      .addCase(createSpecialCompensation.pending, (state) => {
        state.isCreatingSpecialCompensation = true;
      })
      .addCase(createSpecialCompensation.fulfilled, (state) => {
        state.isCreatingSpecialCompensation = false;
        state.createSpecialCompensationStatus = false;
        toast.success('Compensation created successfully');
      })
      .addCase(createSpecialCompensation.rejected, (state, action) => {
        state.isCreatingSpecialCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(updateSpecialCompensation.pending, (state) => {
        state.isEditingSpecialCompensation = true;
      })
      .addCase(updateSpecialCompensation.fulfilled, (state) => {
        state.isEditingSpecialCompensation = false;
        state.editSpecialCompensation = false;
        toast.success('Compensation updated successfully');
      })
      .addCase(updateSpecialCompensation.rejected, (state, action) => {
        state.isEditingSpecialCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteSpecialCompensation.pending, (state) => {
        state.isDeletingSpecialCompensation = true;
        toast.info('Deleting compensation...');
      })
      .addCase(deleteSpecialCompensation.fulfilled, (state) => {
        state.isDeletingSpecialCompensation = false;
        toast.success('Compensation deleted successfully');
      })
      .addCase(deleteSpecialCompensation.rejected, (state, action) => {
        state.isDeletingSpecialCompensation = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllAttendances.pending, (state) => {
        state.isFetchingAttendances = true;
      })
      .addCase(fetchAllAttendances.fulfilled, (state, action) => {
        state.isFetchingAttendances = false;
        state.attendances = action.payload.attendances;
        state.totalAttendances = action.payload.totalAttendances;
        state.totalAttendancesPage = action.payload.totalPages;
      })
      .addCase(fetchAllAttendances.rejected, (state, action) => {
        state.isFetchingAttendances = false;
        toast.error(action.payload.msg);
      })
      .addCase(clockIn.pending, (state) => {
        state.isClockingIn = true;
      })
      .addCase(clockIn.fulfilled, (state, { payload }) => {
        state.isClockingIn = false;
        addAttendanceIdToLocalStorage(payload.attendance._id);
        state.clockedIn = true;
        state.clockedOut = false;
        toast.success('Clocked in successfully');
      })
      .addCase(clockIn.rejected, (state, action) => {
        state.isClockingIn = false;
        console.log(action.payload);
        toast.error(action.payload.msg);
      })
      .addCase(clockOut.pending, (state) => {
        state.isClockingOut = true;
        toast.info('Clocking out...');
      })
      .addCase(clockOut.fulfilled, (state) => {
        state.isClockingOut = false;
        updateLocalStorageClockOutState();
        state.clockedIn = false;
        state.clockedOut = true;
        getAttendanceIdFromLocalStorage();
        toast.success('Clocked out successfully');
      })
      .addCase(clockOut.rejected, (state, action) => {
        state.isClockingOut = false;
        toast.error(action.payload.msg);
      })
      .addCase(calculateTotalHours.pending, (state) => {
        state.isCalculatingTotalHours = true;
      })
      .addCase(calculateTotalHours.fulfilled, (state) => {
        state.isCalculatingTotalHours = false;
        state.attendanceId = '';
        removeAttendanceIdFromLocalStorage();
      })
      .addCase(calculateTotalHours.rejected, (state, action) => {
        state.isCalculatingTotalHours = false;
        console.log(action);
        console.log(action.payload);
        toast.error('An Error Occurred!');
      })
      .addCase(updateAttendance.pending, (state) => {
        state.isUpdatingAttendance = true;
      })
      .addCase(updateAttendance.fulfilled, (state) => {
        state.isUpdatingAttendance = false;
        state.editAttendance = false;
        toast.success('Attendance updated successfully');
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.isUpdatingAttendance = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteAttendance.pending, (state) => {
        state.isDeletingAttendance = true;
      })
      .addCase(deleteAttendance.fulfilled, (state) => {
        state.isDeletingAttendance = false;
        toast.success('Attendance deleted successfully');
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.isDeletingAttendance = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllBreaks.pending, (state) => {
        state.isFetchingBreaks = true;
      })
      .addCase(fetchAllBreaks.fulfilled, (state, action) => {
        state.isFetchingBreaks = false;
        state.breaks = action.payload.breaks;
        state.totalBreaks = action.payload.totalBreaks;
        state.totalBreaksPage = action.payload.totalPages;
      })
      .addCase(fetchAllBreaks.rejected, (state, action) => {
        state.isFetchingBreaks = false;
        toast.error(action.payload.msg);
      })
      .addCase(startBreak.pending, (state) => {
        state.isStartingBreak = true;
      })
      .addCase(startBreak.fulfilled, (state, { payload }) => {
        state.isStartingBreak = false;
        addBreakIdToLocalStorage(payload.breakTime._id);
        state.breakStarted = true;
        state.breakEnded = false;
        toast.success('Break started successfully');
      })
      .addCase(startBreak.rejected, (state, action) => {
        state.isStartingBreak = false;
        toast.error(action.payload.msg);
      })
      .addCase(endBreak.pending, (state) => {
        state.isEndingBreak = true;
        toast.info('Ending break...');
      })
      .addCase(endBreak.fulfilled, (state) => {
        state.isEndingBreak = false;
        updateLocalStorageBreakEndState();
        state.breakStarted = false;
        state.breakEnded = true;
        getBreakIdFromLocalStorage();
        toast.success('Break ended successfully');
      })
      .addCase(endBreak.rejected, (state, action) => {
        state.isEndingBreak = false;
        toast.error(action.payload.msg);
      })
      .addCase(calculateBreaks.pending, (state) => {
        state.isCalculatingTotalBreakHours = true;
      })
      .addCase(calculateBreaks.fulfilled, (state) => {
        state.isCalculatingTotalBreakHours = false;
        state.breakId = '';
        removeBreakIdFromLocalStorage();
      })
      .addCase(calculateBreaks.rejected, (state, action) => {
        state.isCalculatingTotalBreakHours = false;
        console.log(action);
        console.log(action.payload);
        toast.error('An Error Occurred!');
      })
      .addCase(updateBreak.pending, (state) => {
        state.isUpdatingBreak = true;
      })
      .addCase(updateBreak.fulfilled, (state) => {
        state.isUpdatingBreak = false;
        state.editBreak = false;
        toast.success('Break updated successfully');
      })
      .addCase(updateBreak.rejected, (state, action) => {
        state.isUpdatingBreak = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteBreak.pending, (state) => {
        state.isDeletingBreak = true;
      })
      .addCase(deleteBreak.fulfilled, (state) => {
        state.isDeletingBreak = false;
        toast.success('Break deleted successfully');
      })
      .addCase(deleteBreak.rejected, (state, action) => {
        state.isDeletingBreak = false;
        toast.error(action.payload.msg);
      });
  },
});

export const {
  toggleViewingUser,
  toggleCreateEmployee,
  toggleEditEmployee,
  setEmployeeValues,
  handleChange,
  clearDynamicFields,
  toggleViewAdminCompensation,
  toggleEditAdminCompensation,
  setAdminCompensationValues,
  clearAdminCompensation,
  toggleCreateAdminCompensation,

  toggleViewTeachingCompensation,
  toggleEditTeachingCompensation,
  setTeachingCompensationValues,
  clearTeachingCompensation,
  toggleCreateTeachingCompensation,

  toggleViewSpecialCompensation,
  toggleEditSpecialCompensation,
  setSpecialCompensationValues,
  clearSpecialCompensation,
  toggleCreateSpecialCompensation,

  toggleViewingCompensation,
  toggleEditAttendance,
  toggleEditBreak,
  clearAttendance,
  setAttendanceValues,
  setBreakValues,
  clearBreak,

  changeAttendancePage,
  changeBreakPage,
} = employeeSlice.actions;

export default employeeSlice.reducer;
