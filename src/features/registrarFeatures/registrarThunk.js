import adalFetch from 'src/utils/axios';
import {
  fetchAllStudentGrants,
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
  getCollegeEnrollments,
  getGrantsAndVouchers,
  getGrantsNumberFormats,
  getK12Enrollments,
  getRegisteredStudents,
  getStudent,
  getTESDAEnrollments,
} from './registrarSlice';

export const getStudentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getApplicantsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllDepartmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const addDepartmentThunk = async (url, levels, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, levels);
    thunkAPI.dispatch(getAllDepartments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteDepartmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllDepartments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateDepartmentThunk = async (url, levels, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, levels);
    thunkAPI.dispatch(getAllDepartments());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getAllCollegeTracksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const addCollegeTrackThunk = async (url, levels, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, levels);
    thunkAPI.dispatch(getAllCollegeTracks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteCollegeTrackThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllCollegeTracks());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCollegeTrackThunk = async (
  url,
  college_tracks,
  thunkAPI
) => {
  try {
    const response = await adalFetch.put(url, college_tracks);
    thunkAPI.dispatch(getAllCollegeTracks());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getAllYearLevelsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const addYearLevelThunk = async (url, levels, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, levels);
    thunkAPI.dispatch(getAllYearLevels());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteYearLevelThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllYearLevels());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateYearLevelThunk = async (url, levels, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, levels);
    thunkAPI.dispatch(getAllYearLevels());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getAllSemestersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const addSemesterThunk = async (url, semester, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, semester);
    thunkAPI.dispatch(getAllSemesters());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteSemesterThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllSemesters());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSemesterThunk = async (url, semester, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, semester);
    thunkAPI.dispatch(getAllSemesters());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllAcademicYearThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const addAcademicYearThunk = async (url, academic_year, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, academic_year);
    thunkAPI.dispatch(getAllAcademicYears());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteAcademicYearThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllAcademicYears());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateAcademicYearThunk = async (url, academic_year, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, academic_year);
    thunkAPI.dispatch(getAllAcademicYears());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const setCurrentAcademicYearThunk = async (
  url,
  academic_year,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, { id: academic_year });
    thunkAPI.dispatch(getAllAcademicYears());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const approveStudentRegistrationThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(getStudent(response.data.id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const conditionalStudentRegistrationThunk = async (
  url,
  data,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getStudent(response.data.id));
    thunkAPI.dispatch(getRegisteredStudents());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getK12EnrollmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createK12EnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getK12Enrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateK12EnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getK12Enrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteK12EnrollmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getK12Enrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getCollegeEnrollmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createCollegeEnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getCollegeEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCollegeEnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getCollegeEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteCollegeEnrollmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getCollegeEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getTESDAEnrollmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTESDAEnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getTESDAEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTESDAEnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getRegisteredStudents());
    thunkAPI.dispatch(getTESDAEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTESDAEnrollmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getTESDAEnrollments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Grants and Vouchers

export const getGrantsAndVouchersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createGrantsAndVouchersThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getGrantsAndVouchers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getGrantAndVoucherThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteGrantsAndVouchersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getGrantsAndVouchers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateGrantsAndVouchersThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getGrantsAndVouchers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveGrantsAndVouchersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(getGrantsAndVouchers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllStudentGrantsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentGrantByStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentGrantThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createStudentGrantThunk = async (url, studentGrant, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, studentGrant);
    thunkAPI.dispatch(fetchAllStudentGrants());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentGrantThunk = async (url, studentGrant, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, studentGrant);
    thunkAPI.dispatch(fetchAllStudentGrants());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const bulkCreateStudentGrantThunk = async (
  url,
  studentGrant,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, studentGrant);
    thunkAPI.dispatch(fetchAllStudentGrants());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const cancelStudentGrantThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllStudentGrants());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteStudentGrantThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllStudentGrants());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getGrantsNumberFormatsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createGrantNumberFormatThunk = async (
  url,
  invoiceFormat,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, invoiceFormat);
    thunkAPI.dispatch(getGrantsNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateGrantNumberFormatThunk = async (
  url,
  invoiceFormat,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, invoiceFormat);
    thunkAPI.dispatch(getGrantsNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteGrantNumberFormatThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getGrantsNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
