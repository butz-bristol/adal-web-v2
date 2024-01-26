/* Student */
export const getStudentFromLocalStorage = () => {
  const result = localStorage.getItem('student');
  const student = result ? JSON.parse(result) : null;
  return student;
};
export const addStudentToLocalStorage = (student) => {
  localStorage.setItem('student', JSON.stringify(student));
};
export const removeStudentFromLocalStorage = () => {
  localStorage.removeItem('student');
};

/* Applicant */
export const getApplicantFromLocalStorage = () => {
  const result = localStorage.getItem('applicant');
  const applicant = result ? JSON.parse(result) : null;
  return applicant;
};
export const addApplicantToLocalStorage = (applicant) => {
  localStorage.setItem('applicant', JSON.stringify(applicant));
};
export const removeApplicantFromLocalStorage = () => {
  localStorage.removeItem('applicant');
};

/* User */
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};
export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

/*

*** Token ***

*/

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

export const addStudentTokenToLocalStorage = (token) => {
  localStorage.setItem('studentToken', token);
};

export const removeStudentTokenFromLocalStorage = () => {
  localStorage.removeItem('studentToken');
};

export const getStudentTokenFromLocalStorage = () => {
  const token = localStorage.getItem('studentToken');
  return token ? token : null;
};
/*

*** Attendance ID ***

*/

export const addAttendanceIdToLocalStorage = (attendanceId) => {
  localStorage.setItem('attendanceId', attendanceId);
  localStorage.setItem('clockedIn', true);
  localStorage.setItem('clockedOut', false);
};

export const removeAttendanceIdFromLocalStorage = () => {
  localStorage.removeItem('attendanceId');
};

export const getClockOutStatusFromLocalStorage = () => {
  const clockedOut = localStorage.getItem('clockedOut');
  return clockedOut ? JSON.parse(clockedOut) : null;
};

export const getClockInStatusFromLocalStorage = () => {
  const clockedIn = localStorage.getItem('clockedIn');
  return clockedIn ? JSON.parse(clockedIn) : null;
};

export const updateLocalStorageClockOutState = () => {
  localStorage.removeItem('clockedIn');
  localStorage.removeItem('clockedOut');
};

export const getAttendanceIdFromLocalStorage = () => {
  const attendanceId = localStorage.getItem('attendanceId');
  return attendanceId ? attendanceId : null;
};

/*

*** Break ID ***

*/

export const addBreakIdToLocalStorage = (breakId) => {
  localStorage.setItem('breakId', breakId);
  localStorage.setItem('breakStarted', true);
  localStorage.setItem('breakEnded', false);
};

export const getStartBreakStatusFromLocalStorage = () => {
  const breakStarted = localStorage.getItem('breakStarted');
  return breakStarted ? JSON.parse(breakStarted) : null;
};

export const getEndBreakStatusFromLocalStorage = () => {
  const breakEnded = localStorage.getItem('breakEnded');
  return breakEnded ? JSON.parse(breakEnded) : null;
};

export const removeBreakIdFromLocalStorage = () => {
  localStorage.removeItem('breakId');
};

export const getBreakIdFromLocalStorage = () => {
  const breakId = localStorage.getItem('breakId');
  return breakId ? breakId : null;
};

export const updateLocalStorageBreakEndState = () => {
  localStorage.removeItem('breakStarted');
  localStorage.removeItem('breakEnded');
};

/*

*** Tuition and Fee ID ***

*/

export const addTuitionAndFeeIdToLocalStorage = (tuitionAndFeeId) => {
  localStorage.setItem('tuitionAndFeeId', tuitionAndFeeId);
};

export const removeTuitionAndFeeIdFromLocalStorage = () => {
  localStorage.removeItem('tuitionAndFeeId');
};

export const getTuitionAndFeeIdFromLocalStorage = () => {
  const tuitionAndFeeId = localStorage.getItem('tuitionAndFeeId');
  return tuitionAndFeeId ? tuitionAndFeeId : null;
};

/*
 *** Customization ***
 */
export const getCustomizationFromLocalStorage = () => {
  const result = localStorage.getItem('customization');
  const customization = result ? JSON.parse(result) : null;
  return customization;
};

export const addCustomizationToLocalStorage = (item) => {
  localStorage.setItem('customization', JSON.stringify(item));
};

/*

*** Chart of Account ID ***

*/

export const addChartOfAccountIdToLocalStorage = (chartOfAccountId) => {
  localStorage.setItem('chartOfAccountId', chartOfAccountId);
};

export const removeChartOfAccountIdFromLocalStorage = () => {
  localStorage.removeItem('chartOfAccountId');
};

export const getChartOfAccountIdFromLocalStorage = () => {
  const chartOfAccountId = localStorage.getItem('chartOfAccountId');
  return chartOfAccountId ? chartOfAccountId : null;
};
