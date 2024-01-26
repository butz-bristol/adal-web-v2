import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { fetchStudentsByQueryThunk } from 'src/features/cashierFeatures/cashierThunk';
import {
  addAcademicYearThunk,
  addCollegeTrackThunk,
  addDepartmentThunk,
  addSemesterThunk,
  addYearLevelThunk,
  approveStudentRegistrationThunk,
  archiveGrantsAndVouchersThunk,
  bulkCreateStudentGrantThunk,
  cancelStudentGrantThunk,
  conditionalStudentRegistrationThunk,
  createCollegeEnrollmentThunk,
  createGrantNumberFormatThunk,
  createGrantsAndVouchersThunk,
  createK12EnrollmentThunk,
  createStudentGrantThunk,
  createTESDAEnrollmentThunk,
  deleteAcademicYearThunk,
  deleteCollegeEnrollmentThunk,
  deleteCollegeTrackThunk,
  deleteDepartmentThunk,
  deleteGrantNumberFormatThunk,
  deleteGrantsAndVouchersThunk,
  deleteK12EnrollmentThunk,
  deleteSemesterThunk,
  deleteStudentGrantThunk,
  deleteTESDAEnrollmentThunk,
  deleteYearLevelThunk,
  fetchAllStudentGrantsThunk,
  fetchStudentGrantByStudentThunk,
  getAllAcademicYearThunk,
  getAllCollegeTracksThunk,
  getAllDepartmentsThunk,
  getAllSemestersThunk,
  getAllYearLevelsThunk,
  getApplicantsThunk,
  getCollegeEnrollmentsThunk,
  getGrantAndVoucherThunk,
  getGrantsAndVouchersThunk,
  getGrantsNumberFormatsThunk,
  getK12EnrollmentsThunk,
  getStudentThunk,
  getStudentsThunk,
  getTESDAEnrollmentsThunk,
  setCurrentAcademicYearThunk,
  updateAcademicYearThunk,
  updateCollegeEnrollmentThunk,
  updateCollegeTrackThunk,
  updateDepartmentThunk,
  updateGrantNumberFormatThunk,
  updateGrantsAndVouchersThunk,
  updateK12EnrollmentThunk,
  updateSemesterThunk,
  updateStudentGrantThunk,
  updateStudentThunk,
  updateTESDAEnrollmentThunk,
  updateYearLevelThunk,
} from './registrarThunk';

const initialState = {
  students: [],
  applicants: [],
  isFetchingApplicants: false,
  isFetchingStudents: false,
  isUpdatingStudent: false,
  student: {},
  studentData: {},
  studentProfile: {},
  isFetchingStudentProfile: false,
  isOpenPasswordModal: false,
  student_id: '',
  student_first_name: '',
  student_last_name: '',
  student_middle_name: '',
  student_personal_email: '',
  student_number: '',
  student_contact_number: '',
  student_permanent_address: '',
  student_birthdate: '',
  student_nationality: '',
  student_gender: '',
  student_civil_status: '',
  student_father_name: '',
  student_father_contact_number: '',
  student_father_occupation: '',
  student_mother_name: '',
  student_mother_contact_number: '',
  student_mother_occupation: '',
  student_guardian_name: '',
  student_guardian_contact_number: '',
  student_guardian_occupation: '',
  student_registration_status: '',
  student_department: '',
  student_college_track: '',
  student_program: '',
  student_yearlevel: '',
  student_registration_date: '',
  student_level: '',
  irregular_status: false,
  totalStudents: 0,
  totalStudentsPages: 0,
  studentPageNumber: 1,
  applicantsPageNumber: 1,
  totalApplicants: 0,
  totalApplicantsPages: 0,
  query: '',
  searchQuery: '',
  open: false,
  filteredStudents: [],
  isFilteringStudents: false,
  filteredStudentsPageNumber: 1,
  totalFilteredStudents: 0,
  totalFilteredStudentsPages: 0,
  filteredApplicants: [],
  isFilteringApplicants: false,
  filteredApplicantsPageNumber: 1,
  totalFilteredApplicants: 0,
  totalFilteredApplicantsPages: 0,
  isApprovingRegistration: false,
  isRejectingRegistration: false,
  isSuccessfulRegistration: false,

  //levels
  year_levels: [],
  year_level: {},
  year_level_id: '',
  isFetchingYearLevels: false,
  isFetchingYearLevel: false,
  isAddingYearLevel: false,
  isEditingYearLevel: false,
  isCreatingYearLevel: false,
  isUpdatingYearLevel: false,
  isDeletingYearLevel: false,

  //academic year
  academic_years: [],
  academic_year: {},
  academic_year_id: '',
  activeAcademicYear: {},
  nextAcademicYear: {},
  isFetchingAcademicYears: false,
  isFetchingAcademicYear: false,
  isAddingAcademicYear: false,
  isEditingAcademicYear: false,
  isCreatingAcademicYear: false,
  isUpdatingAcademicYear: false,
  isDeletingAcademicYear: false,

  //semesters
  semesters: [],
  semester: { remarks: 'Active' },
  activeSemester: {},
  isFetchingSemesters: false,
  isFetchingSemester: false,
  isAddingSemester: false,
  isEditingSemester: false,
  isCreatingSemester: false,
  isUpdatingSemester: false,
  isDeletingSemester: false,

  //college or track
  college_tracks: [],
  college_track: {},
  college_track_id: '',
  isFetchingCollegeTracks: false,
  isFetchingCollegeTrack: false,
  isAddingCollegeTrack: false,
  isEditingCollegeTrack: false,
  isCreatingCollegeTrack: false,
  isUpdatingCollegeTrack: false,
  isDeletingCollegeTrack: false,

  //department
  departments: [],
  department: {},
  department_id: '',
  isFetchingDepartments: false,
  isFetchingDepartment: false,
  isAddingDepartment: false,
  isEditingDepartment: false,
  isCreatingDepartment: false,
  isUpdatingDepartment: false,
  isDeletingDepartment: false,

  // Student Load
  fees: [],
  isFetchingFees: false,
  k12Enrollments: [],
  isFetchingK12Enrollments: false,
  isSavingStudentLoad: false,
  isDeletingStudentLoad: false,
  showModal: false,
  isFetchingK12Enrollment: false,
  k12StudentLoad: {},

  isFetchingCollegeEnrollments: false,
  isFetchingCollegeEnrollment: false,
  collegeEnrollments: [],
  collegeStudentLoad: {},

  isFetchingTESDAEnrollments: false,
  isFetchingTESDAEnrollment: false,
  tesdaEnrollments: [],
  tesdaStudentLoad: {},
  collegeAndTESDAEnrollments: [],
  isFetchingCollegeAndTESDAEnrollments: false,

  checked_full_payment: false,

  // Grants and Vouchers
  grantsAndVouchers: [],
  isFetchingGrantsAndVouchers: false,
  isSavingGrantsAndVouchers: false,
  isFetchingGrantAndVoucher: false,
  isUpdatingGrantsAndVouchers: false,
  isDeletingGrantsAndVouchers: false,
  isArchivingGrantsAndVouchers: false,
  grantAndVoucher: {},
  editGrantAndVoucher: false,
  grant_or_voucher: '',
  grant_or_voucher_amount: '',
  grant_or_voucher_status: '',
  grant_or_voucher_type: '',
  grant_or_voucher_id: '',

  studentGrantsAndVouchers: [],
  studentGrantOrVoucher: {},
  isFetchingStudentGrantsAndVouchers: false,
  isSavingStudentGrantsAndVouchers: false,
  isUpdatingStudentGrantsAndVouchers: false,
  isDeletingStudentGrantAndVoucher: false,
  isCancellingStudentGrantAndVoucher: false,
  student_grant_or_voucher_status: '',
  student_grant_or_voucher_amount: '',
  student_grant_or_voucher_type: '',
  student_grant_or_voucher: '',
  student_grant_or_voucher_id: '',
  date_issued: '',
  voucher_status: 'Active',

  grant_number_format: '',
  grantNumberFormats: [],
  editGrantNumberFormat: false,
  editGrantNumberFormatId: '',
  isFetchingGrantNumberFormats: false,
  isSavingGrantNumberFormat: false,
  isDeletingGrantNumberFormat: false,
  isUpdatingGrantNumberFormat: false,
  grantNumberFormat: {},
  isEnrollmentError: false,
  isSuccessfulEnrollment: false,
  enlistedSubjects: [],
};

export const getStudents = createAsyncThunk(
  'registrar/getStudents',
  async (_, thunkAPI) => {
    return getStudentsThunk('/registered-students/all', thunkAPI);
  }
);

export const getStudentApplicants = createAsyncThunk(
  'registrar/getStudentApplicants',
  async (_, thunkAPI) => {
    return getStudentsThunk(
      `/applicants?page=${thunkAPI.getState().registrar.applicantsPageNumber}`,
      thunkAPI
    );
  }
);

export const getAdmittedApplicants = createAsyncThunk(
  'registrar/getAdmittedApplicants',
  async (_, thunkAPI) => {
    return getStudentsThunk(
      `/applicants/admitted?page=${
        thunkAPI.getState().registrar.applicantsPageNumber
      }`,
      thunkAPI
    );
  }
);

export const getRegisteredStudents = createAsyncThunk(
  'registrar/getRegisteredStudents',
  async (_, thunkAPI) => {
    return getStudentsThunk(
      `/registered-students?page=${
        thunkAPI.getState().registrar.studentPageNumber
      }`,
      thunkAPI
    );
  }
);

export const getStudentsWithPendingRequirements = createAsyncThunk(
  'registrar/getStudentsWithPendingRequirements',
  async (_, thunkAPI) => {
    return getStudentsThunk(
      `/registered-students/pending-requirements?page=${
        thunkAPI.getState().registrar.studentPageNumber
      }`,
      thunkAPI
    );
  }
);

export const getStudent = createAsyncThunk(
  'registrar/getStudent',
  async (id, thunkAPI) => {
    return getStudentThunk(`/registered-students/${id}`, thunkAPI);
  }
);

export const fetchStudentsByQuery = createAsyncThunk(
  'registrar/fetchStudentsByQuery',
  async (_, thunkAPI) => {
    return fetchStudentsByQueryThunk(
      `/registered-students/search/${
        thunkAPI.getState().registrar.query
      }?page=${thunkAPI.getState().registrar.filteredStudentsPageNumber}`,
      thunkAPI
    );
  }
);

export const fetchApplicantsByQuery = createAsyncThunk(
  'registrar/fetchApplicantsByQuery',
  async (_, thunkAPI) => {
    return fetchStudentsByQueryThunk(
      `/applicants/search/${thunkAPI.getState().registrar.query}?page=${
        thunkAPI.getState().registrar.filteredStudentsPageNumber
      }`,
      thunkAPI
    );
  }
);

export const updateStudent = createAsyncThunk(
  'registrar/updateStudent',
  async (student, thunkAPI) => {
    return updateStudentThunk(
      `/registered-students/${student._id}`,
      student,
      thunkAPI
    );
  }
);

export const approveStudentRegistration = createAsyncThunk(
  'registrar/approveStudentRegistration',
  async (id, thunkAPI) => {
    return approveStudentRegistrationThunk(
      `/applicants/approve/${id}`,
      thunkAPI
    );
  }
);

export const conditionalStudentRegistration = createAsyncThunk(
  'registrar/conditionalStudentRegistration',
  async (data, thunkAPI) => {
    return conditionalStudentRegistrationThunk(
      `/applicants/approve/${data.id}`,
      data,
      thunkAPI
    );
  }
);

export const getApplicants = createAsyncThunk(
  'registrar/getApplicants',
  async (_, thunkAPI) => {
    return getApplicantsThunk('/applicants', thunkAPI);
  }
);

export const getAllYearLevels = createAsyncThunk(
  'registrar/getAllYearLevels',
  async (_, thunkAPI) => {
    return getAllYearLevelsThunk('/year-grade-level', thunkAPI);
  }
);

export const getYearLevel = createAsyncThunk(
  'registrar/getYearLevel',
  async (yearLevelId, thunkAPI) => {
    return getAllYearLevelsThunk(`/year-grade-level/${yearLevelId}`, thunkAPI);
  }
);

export const addYearLevel = createAsyncThunk(
  'registrar/addYearLevel',
  async (year_level, thunkAPI) => {
    return addYearLevelThunk('/year-grade-level', year_level, thunkAPI);
  }
);

export const updateYearLevel = createAsyncThunk(
  'registrar/updateYearLevel',
  async (year_level, thunkAPI) => {
    return updateYearLevelThunk(
      `/year-grade-level/${year_level._id}`,
      year_level,
      thunkAPI
    );
  }
);

export const deleteYearLevel = createAsyncThunk(
  'registrar/deleteYearLevel',
  async (id, thunkAPI) => {
    return deleteYearLevelThunk(`/year-grade-level/${id}`, thunkAPI);
  }
);

export const getAllAcademicYears = createAsyncThunk(
  'registrar/getAllAcademicYears',
  async (_, thunkAPI) => {
    return getAllAcademicYearThunk('/academic/year', thunkAPI);
  }
);

export const getAcademicYear = createAsyncThunk(
  'registrar/getAcademicYear',
  async (academicYearId, thunkAPI) => {
    return getAllAcademicYearThunk(
      `/academic/year/${academicYearId}`,
      thunkAPI
    );
  }
);

export const addAcademicYear = createAsyncThunk(
  'registrar/addAcademicYear',
  async (academic_year, thunkAPI) => {
    return addAcademicYearThunk('/academic/year', academic_year, thunkAPI);
  }
);

export const updateAcademicYear = createAsyncThunk(
  'registrar/updateAcademicYear',
  async (academic_year, thunkAPI) => {
    return updateAcademicYearThunk(
      `/academic/year/${academic_year._id}`,
      academic_year,
      thunkAPI
    );
  }
);

export const setCurrentAcademicYear = createAsyncThunk(
  'registrar/setCurrent',
  async (academic_year, thunkAPI) => {
    return setCurrentAcademicYearThunk(
      `/academic/year/set-current`,
      academic_year,
      thunkAPI
    );
  }
);

export const deleteAcademicYear = createAsyncThunk(
  'registrar/deleteAcademicYear',
  async (academicYearId, thunkAPI) => {
    return deleteAcademicYearThunk(
      `/academic/year/${academicYearId}`,
      thunkAPI
    );
  }
);

export const getAllSemesters = createAsyncThunk(
  'registrar/getAllSemesters',
  async (_, thunkAPI) => {
    return getAllSemestersThunk('/semesters', thunkAPI);
  }
);

export const getSemester = createAsyncThunk(
  'registrar/getSemester',
  async (semesterId, thunkAPI) => {
    return getAllSemestersThunk(`/semesters/${semesterId}`, thunkAPI);
  }
);

export const addSemester = createAsyncThunk(
  'registrar/addSemester',
  async (semester, thunkAPI) => {
    return addSemesterThunk('/semesters', semester, thunkAPI);
  }
);

export const updateSemester = createAsyncThunk(
  'registrar/updateSemester',
  async (semester, thunkAPI) => {
    return updateSemesterThunk(
      `/semesters/${semester._id}`,
      semester,
      thunkAPI
    );
  }
);

export const deleteSemester = createAsyncThunk(
  'registrar/deleteSemester',
  async (semesterId, thunkAPI) => {
    return deleteSemesterThunk(`/semesters/${semesterId}`, thunkAPI);
  }
);

export const getAllCollegeTracks = createAsyncThunk(
  'registrar/getAllCollegeTracks',
  async (_, thunkAPI) => {
    return getAllCollegeTracksThunk('/college/track', thunkAPI);
  }
);

export const getCollegeTrack = createAsyncThunk(
  'registrar/getCollegeTrack',
  async (college_trackId, thunkAPI) => {
    return getAllCollegeTracksThunk(
      `/college/track/${college_trackId}`,
      thunkAPI
    );
  }
);

export const addCollegeTrack = createAsyncThunk(
  'registrar/addCollegeTrack',
  async (college_track, thunkAPI) => {
    return addCollegeTrackThunk('/college/track', college_track, thunkAPI);
  }
);

export const updateCollegeTrack = createAsyncThunk(
  'registrar/updateCollegeTrack',
  async (college_track, thunkAPI) => {
    return updateCollegeTrackThunk(
      `/college/track/${college_track._id}`,
      college_track,
      thunkAPI
    );
  }
);

export const deleteCollegeTrack = createAsyncThunk(
  'registrar/deleteCollegeTrack',
  async (college_trackId, thunkAPI) => {
    return deleteCollegeTrackThunk(
      `/college/track/${college_trackId}`,
      thunkAPI
    );
  }
);
export const getAllDepartments = createAsyncThunk(
  'registrar/getAllDepartments',
  async (_, thunkAPI) => {
    return getAllDepartmentsThunk('/level/department', thunkAPI);
  }
);

export const getDepartment = createAsyncThunk(
  'registrar/getDepartment',
  async (departmentId, thunkAPI) => {
    return getAllDepartmentsThunk(
      `/level/department/${departmentId}`,
      thunkAPI
    );
  }
);

export const addDepartment = createAsyncThunk(
  'registrar/addDepartment',
  async (department, thunkAPI) => {
    return addDepartmentThunk('/level/department', department, thunkAPI);
  }
);

export const updateDepartment = createAsyncThunk(
  'registrar/updateDepartment',
  async (department, thunkAPI) => {
    return updateDepartmentThunk(
      `/level/department/${department._id}`,
      department,
      thunkAPI
    );
  }
);

export const deleteDepartment = createAsyncThunk(
  'registrar/deleteDepartment',
  async (departmentId, thunkAPI) => {
    return deleteDepartmentThunk(`/level/department/${departmentId}`, thunkAPI);
  }
);

export const getK12Enrollments = createAsyncThunk(
  'registrar/getK12Enrollments',
  async (_, thunkAPI) => {
    return getK12EnrollmentsThunk('/enrollment/k-12', thunkAPI);
  }
);

export const getK12StudentEnrollmentLoad = createAsyncThunk(
  'registrar/getK12StudentEnrollmentLoad',
  async ({ student_id, academic_year }, thunkAPI) => {
    return getK12EnrollmentsThunk(
      `/enrollment/k-12/student/${student_id}/${academic_year}`,
      thunkAPI
    );
  }
);

export const createK12Enrollment = createAsyncThunk(
  'registrar/createK12Enrollment',
  async (enrollment, thunkAPI) => {
    return createK12EnrollmentThunk('/enrollment/k-12', enrollment, thunkAPI);
  }
);

export const updateK12Enrollment = createAsyncThunk(
  'registrar/updateK12Enrollment',
  async (enrollment, thunkAPI) => {
    return updateK12EnrollmentThunk(
      `/enrollment/k-12/${enrollment._id}`,
      enrollment,
      thunkAPI
    );
  }
);

export const deleteK12Enrollment = createAsyncThunk(
  'registrar/deleteK12Enrollment',
  async (id, thunkAPI) => {
    return deleteK12EnrollmentThunk(`/enrollment/k-12/${id}`, thunkAPI);
  }
);

export const getCollegeEnrollments = createAsyncThunk(
  'registrar/getCollegeEnrollments',
  async (_, thunkAPI) => {
    return getCollegeEnrollmentsThunk('/enrollment/college', thunkAPI);
  }
);

export const getCollegeAndTESDAEnrollments = createAsyncThunk(
  'registrar/getCollegeAndTESDAEnrollments',
  async (_, thunkAPI) => {
    return getCollegeEnrollmentsThunk('/enrollment/college/all', thunkAPI);
  }
);

export const getCollegeStudentEnrollmentLoad = createAsyncThunk(
  'registrar/getCollegeStudentEnrollmentLoad',
  async ({ student_id, academic_year, semester }, thunkAPI) => {
    return getCollegeEnrollmentsThunk(
      `/enrollment/college/${student_id}/${academic_year}/${semester}`,
      thunkAPI
    );
  }
);

export const createCollegeEnrollment = createAsyncThunk(
  'registrar/createCollegeEnrollment',
  async (enrollment, thunkAPI) => {
    return createCollegeEnrollmentThunk(
      '/enrollment/college',
      enrollment,
      thunkAPI
    );
  }
);

export const updateCollegeEnrollment = createAsyncThunk(
  'registrar/updateCollegeEnrollment',
  async (enrollment, thunkAPI) => {
    return updateCollegeEnrollmentThunk(
      `/enrollment/college/${enrollment._id}`,
      enrollment,
      thunkAPI
    );
  }
);

export const deleteCollegeEnrollment = createAsyncThunk(
  'registrar/deleteCollegeEnrollment',
  async (id, thunkAPI) => {
    return deleteCollegeEnrollmentThunk(`/enrollment/college/${id}`, thunkAPI);
  }
);

export const getTESDAEnrollments = createAsyncThunk(
  'registrar/getTESDAEnrollments',
  async (_, thunkAPI) => {
    return getTESDAEnrollmentsThunk('/enrollment/tesda', thunkAPI);
  }
);

export const getTESDAStudentEnrollmentLoad = createAsyncThunk(
  'registrar/getTESDAStudentEnrollmentLoad',
  async ({ student_id, academic_year, semester }, thunkAPI) => {
    return getTESDAEnrollmentsThunk(
      `/enrollment/tesda/${student_id}/${academic_year}/${semester}`,
      thunkAPI
    );
  }
);

export const createTESDAEnrollment = createAsyncThunk(
  'registrar/createTESDAEnrollment',
  async (enrollment, thunkAPI) => {
    return createTESDAEnrollmentThunk(
      '/enrollment/tesda',
      enrollment,
      thunkAPI
    );
  }
);

export const updateTESDAEnrollment = createAsyncThunk(
  'registrar/updateTESDAEnrollment',
  async (enrollment, thunkAPI) => {
    return updateTESDAEnrollmentThunk(
      `/enrollment/tesda/${enrollment._id}`,
      enrollment,
      thunkAPI
    );
  }
);

export const deleteTESDAEnrollment = createAsyncThunk(
  'registrar/deleteTESDAEnrollment',
  async (id, thunkAPI) => {
    return deleteTESDAEnrollmentThunk(`/enrollment/tesda/${id}`, thunkAPI);
  }
);

// Grants and Vouchers

export const getGrantsAndVouchers = createAsyncThunk(
  'registrar/getGrantsAndVouchers',
  async (_, thunkAPI) => {
    return getGrantsAndVouchersThunk('/grants-and-vouchers', thunkAPI);
  }
);

export const createGrantsAndVouchers = createAsyncThunk(
  'registrar/createGrantsAndVouchers',
  async (grant_or_voucher, thunkAPI) => {
    return createGrantsAndVouchersThunk(
      '/grants-and-vouchers',
      grant_or_voucher,
      thunkAPI
    );
  }
);

export const getGrantAndVoucher = createAsyncThunk(
  'registrar/getGrantAndVoucher',
  async (id, thunkAPI) => {
    return getGrantAndVoucherThunk(`/grants-and-vouchers/${id}`, thunkAPI);
  }
);

export const deleteGrantsAndVouchers = createAsyncThunk(
  'registrar/deleteGrantsAndVouchers',
  async (id, thunkAPI) => {
    return deleteGrantsAndVouchersThunk(`/grants-and-vouchers/${id}`, thunkAPI);
  }
);

export const updateGrantsAndVouchers = createAsyncThunk(
  'registrar/updateGrantsAndVouchers',
  async (grant_or_voucher, thunkAPI) => {
    return updateGrantsAndVouchersThunk(
      `/grants-and-vouchers/${grant_or_voucher.id}`,
      grant_or_voucher,
      thunkAPI
    );
  }
);

export const archiveGrantsAndVouchers = createAsyncThunk(
  'registrar/archiveGrantsAndVouchers',
  async (id, thunkAPI) => {
    return archiveGrantsAndVouchersThunk(
      `/grants-and-vouchers/archive/${id}`,
      thunkAPI
    );
  }
);

export const unarchiveGrantsAndVouchers = createAsyncThunk(
  'registrar/unarchiveGrantsAndVouchers',
  async (id, thunkAPI) => {
    return archiveGrantsAndVouchersThunk(
      `/grants-and-vouchers/unarchive/${id}`,
      thunkAPI
    );
  }
);

export const getGrantsNumberFormats = createAsyncThunk(
  'registrar/fetchAllGrantsFormats',
  async (_, thunkAPI) => {
    return getGrantsNumberFormatsThunk('/grant-number-format', thunkAPI);
  }
);

export const createGrantsNumberFormat = createAsyncThunk(
  'registrar/createGrantsFormat',
  async (format, thunkAPI) => {
    return createGrantNumberFormatThunk(
      '/grant-number-format',
      format,
      thunkAPI
    );
  }
);

export const updateGrantsNumberFormat = createAsyncThunk(
  'registrar/updateGrantsFormat',
  async (format, thunkAPI) => {
    return updateGrantNumberFormatThunk(
      `/grant-number-format/${format.id}`,
      format,
      thunkAPI
    );
  }
);

export const deleteGrantsNumberFormat = createAsyncThunk(
  'registrar/deleteGrantsFormat',
  async (id, thunkAPI) => {
    return deleteGrantNumberFormatThunk(`/grant-number-format/${id}`, thunkAPI);
  }
);

export const fetchAllStudentGrants = createAsyncThunk(
  'registrar/fetchAllStudentGrants',
  async (_, thunkAPI) => {
    return fetchAllStudentGrantsThunk('/student-grants-and-vouchers', thunkAPI);
  }
);

export const createStudentGrant = createAsyncThunk(
  'registrar/createStudentGrant',
  async (studentGrant, thunkAPI) => {
    return createStudentGrantThunk(
      '/student-grants-and-vouchers',
      studentGrant,
      thunkAPI
    );
  }
);

export const bulkCreateStudentGrant = createAsyncThunk(
  'registrar/bulkCreateStudentGrant',
  async (studentGrants, thunkAPI) => {
    return bulkCreateStudentGrantThunk(
      '/student-grants-and-vouchers/bulk',
      studentGrants,
      thunkAPI
    );
  }
);

export const fetchStudentGrantByStudent = createAsyncThunk(
  'registrar/fetchStudentGrantByStudent',
  async (studentId, thunkAPI) => {
    return fetchStudentGrantByStudentThunk(
      `/student-grants-and-vouchers/student/${studentId}`,
      thunkAPI
    );
  }
);

export const updateStudentGrant = createAsyncThunk(
  'registrar/updateStudentGrant',
  async (studentGrant, thunkAPI) => {
    return updateStudentGrantThunk(
      `/student-grants-and-vouchers/${studentGrant._id}`,
      studentGrant,
      thunkAPI
    );
  }
);

export const deleteStudentGrant = createAsyncThunk(
  'registrar/deleteStudentGrant',
  async (id, thunkAPI) => {
    return deleteStudentGrantThunk(
      `/student-grants-and-vouchers/${id}`,
      thunkAPI
    );
  }
);

export const cancelStudentGrant = createAsyncThunk(
  'registrar/cancelStudentGrant',
  async (id, thunkAPI) => {
    return cancelStudentGrantThunk(
      `/student-grants-and-vouchers/cancel/${id}`,
      thunkAPI
    );
  }
);

export const archiveStudentGrant = createAsyncThunk(
  'registrar/archiveStudentGrant',
  async (id, thunkAPI) => {
    return cancelStudentGrantThunk(
      `/student-grants-and-vouchers/archive/${id}`,
      thunkAPI
    );
  }
);

export const unarchiveStudentGrant = createAsyncThunk(
  'registrar/unarchiveStudentGrant',
  async (id, thunkAPI) => {
    return cancelStudentGrantThunk(
      `/student-grants-and-vouchers/unarchive/${id}`,
      thunkAPI
    );
  }
);

const registrarSlice = createSlice({
  name: 'registrar',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setStudentData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    changeStudentPageNumber: (state, { payload }) => {
      state.studentPageNumber = payload;
    },
    changefilteredStudentsPageNumber: (state, { payload }) => {
      state.filteredStudentsPageNumber = payload;
    },
    changeApplicantsPageNumber: (state, { payload }) => {
      state.applicantsPageNumber = payload;
    },
    clearStudentData: (state, action) => {
      state.studentData = {};
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setOpen: (state) => {
      state.open = !state.open;
    },
    setYearLevel: (state, action) => {
      state.year_level = action.payload;
    },
    clearYearLevel: (state) => {
      state.year_level = {};
    },
    toggleAddYearLevel(state) {
      state.isAddingYearLevel = !state.isAddingYearLevel;
    },
    toggleEditYearLevel(state) {
      state.isEditingYearLevel = !state.isEditingYearLevel;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    clearDepartment: (state) => {
      state.department = initialState.department;
    },
    toggleAddDepartment(state) {
      state.isAddingDepartment = !state.isAddingDepartment;
      state.department = initialState.department;
    },
    toggleEditDepartment(state) {
      state.isEditingDepartment = !state.isEditingDepartment;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    clearSemester: (state) => {
      state.department = initialState.department;
    },
    setK12Enrollment: (state, action) => {
      state.k12StudentLoad = action.payload;
    },
    clearK12Enrollment: (state) => {
      state.k12StudentLoad = initialState.k12StudentLoad;
    },
    toggleAddSemester(state) {
      state.isAddingSemester = !state.isAddingSemester;
      state.semester = initialState.semester;
    },
    toggleEditSemester(state) {
      state.isEditingSemester = !state.isEditingSemester;
    },
    setAcademicYear: (state, action) => {
      state.academic_year = action.payload;
    },
    clearAcademicYear: (state) => {
      state.academic_year = initialState.academic_year;
    },
    toggleAddAcademicYear(state) {
      state.isAddingAcademicYear = !state.isAddingAcademicYear;
      state.academic_year = initialState.academic_year;
    },
    toggleEditAcademicYear(state) {
      state.isEditingAcademicYear = !state.isEditingAcademicYear;
      state.academic_year = initialState.academic_year;
    },
    setCollegeTrack: (state, action) => {
      state.college_track = action.payload;
    },
    clearCollegeTrack: (state) => {
      state.college_track = initialState.college_track;
    },
    toggleAddCollegeTrack(state) {
      state.isAddingCollegeTrack = !state.isAddingCollegeTrack;
      state.college_track = initialState.college_track;
    },
    toggleEditCollegeTrack(state) {
      state.isEditingCollegeTrack = !state.isEditingCollegeTrack;
    },
    setStudentRecord: (state, action) => {
      state.studentRecord = action.payload;
    },
    setInstructor: (state, action) => {
      state.instructor = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    clearStudentInfo: (state) => {
      state.student_id = '';
      state.studentProfile = {};
      // state.academic_year = '';
      state.student_yearlevel = '';
      // state.semester = '';
      state.enlistedSubjects = [];
    },
    clearPreEnrollmentSetup: (state) => {
      state.department_id = '';
      state.academic_year = '';
      state.semester = '';
    },
    setGrantAndVoucher: (state, { payload }) => {
      state.grant_or_voucher = payload.grant_or_voucher;
      state.grant_or_voucher_id = payload._id;
      state.grant_or_voucher_amount = payload.grant_or_voucher_amount;
      state.grant_or_voucher_status = payload.grant_or_voucher_status;
      state.grant_or_voucher_type = payload.grant_or_voucher_type;
      state.academic_year_id = payload.academic_year_id;
      state.editGrantAndVoucher = true;
    },
    clearGrantAndVoucher: (state) => {
      state.grant_or_voucher = '';
      state.grant_or_voucher_amount = '';
      state.grant_or_voucher_status = '';
      state.grant_number_format = '';
      state.grant_or_voucher_type = '';
      state.academic_year_id = '';
      state.editGrantAndVoucher = false;
    },
    setGrantNumberFormat: (state, { payload }) => {
      state.grant_number_format = payload.format;
      state.editGrantNumberFormat = true;
      state.editGrantNumberFormatId = payload._id;
    },
    resetGrantNumberFormat: (state) => {
      state.grant_number_format = '';
      state.editGrantNumberFormat = false;
      state.editGrantNumberFormatId = '';
    },
    setDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    clearDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(getStudents.fulfilled, (state, { payload }) => {
        state.isFetchingStudents = false;
        state.students = payload.students;
      })
      .addCase(getStudents.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(getRegisteredStudents.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(getRegisteredStudents.fulfilled, (state, { payload }) => {
        state.isFetchingStudents = false;
        state.students = payload.students;
        state.totalStudents = payload.totalStudents;
        state.totalStudentsPages = payload.totalStudentsPages;
      })
      .addCase(getRegisteredStudents.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(getStudentsWithPendingRequirements.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(
        getStudentsWithPendingRequirements.fulfilled,
        (state, { payload }) => {
          state.isFetchingStudents = false;
          state.students = payload.students;
          state.totalStudents = payload.totalStudents;
          state.totalStudentsPages = payload.totalStudentsPages;
        }
      )
      .addCase(getStudentsWithPendingRequirements.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(getStudentApplicants.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(getStudentApplicants.fulfilled, (state, { payload }) => {
        state.isFetchingStudents = false;
        state.students = payload.applicants;
        state.totalApplicants = payload.totalApplicants;
        state.totalApplicantsPages = payload.totalApplicantsPages;
      })
      .addCase(getStudentApplicants.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(getAdmittedApplicants.pending, (state) => {
        state.isFetchingApplicants = true;
      })
      .addCase(getAdmittedApplicants.fulfilled, (state, { payload }) => {
        state.isFetchingApplicants = false;
        state.applicants = payload.applicants;
        state.totalApplicants = payload.totalApplicants;
        state.totalApplicantsPages = payload.totalApplicantsPages;
      })
      .addCase(getAdmittedApplicants.rejected, (state) => {
        state.isFetchingApplicants = false;
      })
      .addCase(fetchStudentsByQuery.pending, (state) => {
        state.isFilteringStudents = true;
      })
      .addCase(fetchStudentsByQuery.fulfilled, (state, { payload }) => {
        state.filteredStudents = payload.students;
        state.isFilteringStudents = false;
        state.totalFilteredStudents = payload.totalFilteredStudents;
        state.totalFilteredStudentsPages = payload.totalFilteredStudentsPages;
      })
      .addCase(fetchStudentsByQuery.rejected, (state) => {
        state.isFilteringStudents = false;
      })
      .addCase(fetchApplicantsByQuery.pending, (state) => {
        state.isFilteringApplicants = true;
      })
      .addCase(fetchApplicantsByQuery.fulfilled, (state, { payload }) => {
        state.filteredApplicants = payload.applicants;
        state.isFilteringApplicants = false;
        state.totalFilteredApplicants = payload.totalFilteredApplicants;
        state.totalFilteredApplicantsPages =
          payload.totalFilteredApplicantsPages;
      })
      .addCase(fetchApplicantsByQuery.rejected, (state) => {
        state.isFilteringApplicants = false;
      })
      .addCase(getStudent.pending, (state) => {
        state.isFetchingStudentProfile = true;
      })
      .addCase(getStudent.fulfilled, (state, { payload }) => {
        state.isFetchingStudentProfile = false;
        state.studentProfile = payload.student;
      })
      .addCase(getStudent.rejected, (state) => {
        state.isFetchingStudentProfile = false;
      })
      .addCase(updateStudent.pending, (state) => {
        state.isUpdatingStudent = true;
      })
      .addCase(updateStudent.fulfilled, (state, { payload }) => {
        state.isUpdatingStudent = false;
        toast.success(payload.msg);
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isUpdatingStudent = false;
        toast.error('Something went wrong');
      })
      .addCase(approveStudentRegistration.pending, (state) => {
        state.isApprovingRegistration = true;
      })
      .addCase(approveStudentRegistration.fulfilled, (state, { payload }) => {
        state.isApprovingRegistration = false;
        state.isSuccessfulRegistration = true;
        toast.success(payload.msg);
      })
      .addCase(approveStudentRegistration.rejected, (state, { payload }) => {
        state.isApprovingRegistration = false;
        state.isSuccessfulRegistration = false;
        toast.error(payload.msg);
      })
      .addCase(conditionalStudentRegistration.pending, (state) => {
        state.isRejectingRegistration = true;
      })
      .addCase(
        conditionalStudentRegistration.fulfilled,
        (state, { payload }) => {
          state.isRejectingRegistration = false;
          toast.success(payload.msg);
        }
      )
      .addCase(
        conditionalStudentRegistration.rejected,
        (state, { payload }) => {
          state.isRejectingRegistration = false;
          toast.error(payload.msg);
        }
      )
      .addCase(getApplicants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicants.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.students = payload.students;
      })
      .addCase(getApplicants.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllYearLevels.pending, (state) => {
        state.isFetchingYearLevels = true;
      })
      .addCase(getAllYearLevels.fulfilled, (state, { payload }) => {
        state.isFetchingYearLevels = false;
        state.year_levels = payload.yearLevels;
      })
      .addCase(getAllYearLevels.rejected, (state) => {
        state.isFetchingYearLevels = false;
      })
      .addCase(getYearLevel.pending, (state) => {
        state.isFetchingYearLevel = true;
      })
      .addCase(getYearLevel.fulfilled, (state, { payload }) => {
        state.isFetchingYearLevel = false;
        state.year_level = payload.yearLevel;
      })
      .addCase(getYearLevel.rejected, (state) => {
        state.isFetchingYearLevel = false;
      })
      .addCase(addYearLevel.pending, (state) => {
        state.isCreatingYearLevel = true;
      })
      .addCase(addYearLevel.fulfilled, (state) => {
        state.isCreatingYearLevel = false;
        state.isAddingYearLevel = !state.isAddingYearLevel;
        state.year_level = initialState.year_level;
        toast.success('Year or Level has been added!');
      })
      .addCase(addYearLevel.rejected, (state, { payload }) => {
        state.isCreatingYearLevel = false;
        toast.error(payload.msg);
      })
      .addCase(updateYearLevel.pending, (state) => {
        state.isUpdatingYearLevel = true;
      })
      .addCase(updateYearLevel.fulfilled, (state) => {
        state.isUpdatingYearLevel = false;
        state.isEditingYearLevel = !state.isEditingYearLevel;
        state.year_level = initialState.year_level;
        toast.success('Year or Level has been updated!');
      })
      .addCase(updateYearLevel.rejected, (state, { payload }) => {
        state.isUpdatingYearLevel = false;
        toast.error(payload);
      })
      .addCase(deleteYearLevel.pending, (state) => {
        state.isDeletingYearLevel = true;
      })
      .addCase(deleteYearLevel.fulfilled, (state) => {
        state.isDeletingYearLevel = false;
        toast.success('Year or Level has been deleted!');
      })
      .addCase(deleteYearLevel.rejected, (state, { payload }) => {
        state.isDeletingYearLevel = false;
        toast.error(payload);
      })
      .addCase(getAllCollegeTracks.pending, (state) => {
        state.isFetchingCollegeTracks = true;
      })
      .addCase(getAllCollegeTracks.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeTracks = false;
        state.college_tracks = payload.collegeTracks;
      })
      .addCase(getAllCollegeTracks.rejected, (state) => {
        state.isFetchingCollegeTracks = false;
      })
      .addCase(getCollegeTrack.pending, (state) => {
        state.isFetchingCollegeTrack = true;
      })
      .addCase(getCollegeTrack.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeTrack = false;
        state.college_track = payload.collegeTrack;
      })
      .addCase(getCollegeTrack.rejected, (state) => {
        state.isFetchingCollegeTrack = false;
      })
      .addCase(addCollegeTrack.pending, (state) => {
        state.isCreatingCollegeTrack = true;
      })
      .addCase(addCollegeTrack.fulfilled, (state) => {
        state.isCreatingCollegeTrack = false;
        state.isAddingCollegeTrack = !state.isAddingCollegeTrack;
        state.college_track = initialState.college_track;
        toast.success('College or Track Successfully Added!');
      })
      .addCase(addCollegeTrack.rejected, (state, { payload }) => {
        state.isCreatingCollegeTrack = false;
        toast.error(payload);
      })
      .addCase(updateCollegeTrack.pending, (state) => {
        state.isUpdatingCollegeTrack = true;
      })
      .addCase(updateCollegeTrack.fulfilled, (state) => {
        state.isUpdatingCollegeTrack = false;
        state.isEditingCollegeTrack = !state.isEditingCollegeTrack;
        state.college_track = initialState.college_track;
        toast.success('College or Track Successfully Updated!');
      })
      .addCase(updateCollegeTrack.rejected, (state, { payload }) => {
        state.isUpdatingCollegeTrack = false;
        toast.error(payload);
      })
      .addCase(deleteCollegeTrack.pending, (state) => {
        state.isDeletingCollegeTrack = true;
      })
      .addCase(deleteCollegeTrack.fulfilled, (state) => {
        state.isDeletingCollegeTrack = false;
        toast.success('College or Track Successfully Deleted!');
      })
      .addCase(deleteCollegeTrack.rejected, (state, { payload }) => {
        state.isDeletingCollegeTrack = false;
        toast.error(payload);
      })
      .addCase(getAllDepartments.pending, (state) => {
        state.isFetchingDepartments = true;
      })
      .addCase(getAllDepartments.fulfilled, (state, { payload }) => {
        state.isFetchingDepartments = false;
        state.departments = payload.departments;
      })
      .addCase(getAllDepartments.rejected, (state, { payload }) => {
        state.isFetchingDepartments = false;
        toast.error(payload);
      })
      .addCase(getDepartment.pending, (state) => {
        state.isFetchingDepartment = true;
      })
      .addCase(getDepartment.fulfilled, (state, { payload }) => {
        state.isFetchingDepartment = false;
        state.department = payload.department;
      })
      .addCase(getDepartment.rejected, (state, { payload }) => {
        state.isFetchingDepartment = false;
        toast.error(payload);
      })
      .addCase(addDepartment.pending, (state) => {
        state.isCreatingDepartment = true;
      })
      .addCase(addDepartment.fulfilled, (state) => {
        state.isCreatingDepartment = false;
        state.isAddingDepartment = !state.isAddingDepartment;
        state.department = initialState.department;
        toast.success('Department Successfully Added!');
      })
      .addCase(addDepartment.rejected, (state, { payload }) => {
        state.isCreatingDepartment = false;
        toast.error(payload);
      })
      .addCase(updateDepartment.pending, (state) => {
        state.isUpdatingDepartment = true;
      })
      .addCase(updateDepartment.fulfilled, (state) => {
        state.isUpdatingDepartment = false;
        state.isEditingDepartment = !state.isEditingDepartment;
        state.department = initialState.department;
        toast.success('Department Successfully Updated!');
      })
      .addCase(updateDepartment.rejected, (state, { payload }) => {
        state.isUpdatingDepartment = false;
        toast.error(payload);
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.isDeletingDepartment = true;
      })
      .addCase(deleteDepartment.fulfilled, (state) => {
        state.isDeletingDepartment = false;
        toast.success('Department Successfully Deleted!');
      })
      .addCase(deleteDepartment.rejected, (state, { payload }) => {
        state.isDeletingDepartment = false;
        toast.error(payload);
      })
      .addCase(getAllSemesters.pending, (state) => {
        state.isFetchingSemesters = true;
      })
      .addCase(getAllSemesters.fulfilled, (state, { payload }) => {
        state.isFetchingSemesters = false;
        state.activeSemester = payload.semesters.find(
          (item) => item?.remarks === 'Current'
        );
        state.semesters = payload.semesters;
      })
      .addCase(getAllSemesters.rejected, (state, { payload }) => {
        state.isFetchingSemesters = false;
        toast.error(payload);
      })
      .addCase(getSemester.pending, (state) => {
        state.isFetchingSemester = true;
      })
      .addCase(getSemester.fulfilled, (state, { payload }) => {
        state.isFetchingSemester = false;
        state.semester = payload.semester;
      })
      .addCase(getSemester.rejected, (state, { payload }) => {
        state.isFetchingSemester = false;
        toast.error(payload);
      })
      .addCase(addSemester.pending, (state) => {
        state.isCreatingSemester = true;
      })
      .addCase(addSemester.fulfilled, (state) => {
        state.isCreatingSemester = false;
        state.isAddingSemester = !state.isAddingSemester;
        state.semester = initialState.semester;
        toast.success('Semester Successfully Added!');
      })
      .addCase(addSemester.rejected, (state, { payload }) => {
        state.isCreatingSemester = false;
        toast.error(payload);
      })
      .addCase(updateSemester.pending, (state) => {
        state.isUpdatingSemester = true;
      })
      .addCase(updateSemester.fulfilled, (state) => {
        state.isUpdatingSemester = false;
        state.semester = initialState.semester;
        toast.success('Semester successfully updated!');
      })
      .addCase(updateSemester.rejected, (state, { payload }) => {
        state.isUpdatingSemester = false;
        toast.error(payload);
      })
      .addCase(deleteSemester.pending, (state) => {
        state.isDeletingSemester = true;
      })
      .addCase(deleteSemester.fulfilled, (state) => {
        state.isDeletingSemester = false;
        toast.success('Semester successfully deleted!');
      })
      .addCase(deleteSemester.rejected, (state, { payload }) => {
        state.isDeletingSemester = false;
        toast.error(payload);
      })
      .addCase(getAllAcademicYears.pending, (state) => {
        state.isFetchingAcademicYears = true;
      })
      .addCase(getAllAcademicYears.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicYears = false;
        state.academic_years = payload.academic_years;
        state.activeAcademicYear = payload.academic_years.find(
          (academic_year) => academic_year?.remarks === 'Current'
        );
        state.nextAcademicYear = payload.academic_years.find(
          (academic_year) => academic_year?.remarks === 'Next Term'
        );
      })
      .addCase(getAllAcademicYears.rejected, (state) => {
        state.isFetchingAcademicYears = false;
      })
      .addCase(getAcademicYear.pending, (state) => {
        state.isFetchingAcademicYear = true;
      })
      .addCase(getAcademicYear.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicYear = false;
        state.academic_year = payload.academic_year;
      })
      .addCase(getAcademicYear.rejected, (state) => {
        state.isFetchingAcademicYear = false;
      })
      .addCase(addAcademicYear.pending, (state) => {
        state.isCreatingAcademicYear = true;
      })
      .addCase(addAcademicYear.fulfilled, (state) => {
        state.isCreatingAcademicYear = false;
        state.isAddingAcademicYear = !state.isAddingAcademicYear;
        state.academic_year = initialState.academic_year;
        toast.success('Academic Year successfully added!');
      })
      .addCase(addAcademicYear.rejected, (state, { payload }) => {
        state.isCreatingAcademicYear = false;
        toast.error(payload);
      })
      .addCase(updateAcademicYear.pending, (state) => {
        state.isUpdatingAcademicYear = true;
      })
      .addCase(updateAcademicYear.fulfilled, (state) => {
        state.isUpdatingAcademicYear = false;
        state.isEditingAcademicYear = !state.isEditingAcademicYear;
        state.academic_year = initialState.academic_year;
        toast.success('Academic Year successfully updated!');
      })
      .addCase(updateAcademicYear.rejected, (state, { payload }) => {
        state.isUpdatingAcademicYear = false;
        toast.error(payload);
      })
      .addCase(setCurrentAcademicYear.pending, (state) => {
        state.isUpdatingAcademicYear = true;
      })
      .addCase(setCurrentAcademicYear.fulfilled, (state) => {
        state.isUpdatingAcademicYear = false;
        toast.success('Academic Year has been set!');
      })
      .addCase(setCurrentAcademicYear.rejected, (state, { payload }) => {
        state.isUpdatingAcademicYear = false;
        toast.error(payload);
      })
      .addCase(deleteAcademicYear.pending, (state) => {
        state.isDeletingAcademicYear = true;
      })
      .addCase(deleteAcademicYear.fulfilled, (state) => {
        state.isDeletingAcademicYear = false;
        toast.success('Academic Year successfully deleted!');
      })
      .addCase(deleteAcademicYear.rejected, (state, { payload }) => {
        state.isDeletingAcademicYear = false;
        toast.error(payload);
      })
      .addCase(getK12Enrollments.pending, (state) => {
        state.isFetchingK12Enrollments = true;
      })
      .addCase(getK12Enrollments.fulfilled, (state, { payload }) => {
        state.isFetchingK12Enrollments = false;
        state.k12Enrollments = payload.k12EnrollmentLoads;
      })
      .addCase(getK12Enrollments.rejected, (state) => {
        state.isFetchingK12Enrollments = false;
      })
      .addCase(getK12StudentEnrollmentLoad.pending, (state) => {
        state.isFetchingK12Enrollment = true;
      })
      .addCase(getK12StudentEnrollmentLoad.fulfilled, (state, { payload }) => {
        state.isFetchingK12Enrollment = false;
        state.k12StudentLoad = payload.existingStudentLoad;
      })
      .addCase(getK12StudentEnrollmentLoad.rejected, (state) => {
        state.isFetchingK12Enrollment = false;
      })
      .addCase(createK12Enrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = false;
      })
      .addCase(createK12Enrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = true;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = true;
        toast.success(payload.msg);
      })
      .addCase(createK12Enrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = false;
        state.isEnrollmentError = true;
        state.isSuccessfulEnrollment = false;
        toast.error(payload.msg);
      })
      .addCase(updateK12Enrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
      })
      .addCase(updateK12Enrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
      })
      .addCase(updateK12Enrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
      })
      .addCase(deleteK12Enrollment.pending, (state) => {
        state.isDeletingStudentLoad = true;
      })
      .addCase(deleteK12Enrollment.fulfilled, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.success(payload.msg);
      })
      .addCase(deleteK12Enrollment.rejected, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.error(payload.msg);
      })
      .addCase(getCollegeEnrollments.pending, (state) => {
        state.isFetchingCollegeEnrollments = true;
      })
      .addCase(getCollegeEnrollments.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeEnrollments = false;
        state.collegeEnrollments = payload.collegeEnrollmentLoads;
      })
      .addCase(getCollegeEnrollments.rejected, (state) => {
        state.isFetchingCollegeEnrollments = false;
      })
      .addCase(getCollegeAndTESDAEnrollments.pending, (state) => {
        state.isFetchingCollegeAndTESDAEnrollments = true;
      })
      .addCase(
        getCollegeAndTESDAEnrollments.fulfilled,
        (state, { payload }) => {
          state.isFetchingCollegeAndTESDAEnrollments = false;
          state.collegeAndTESDAEnrollments = payload.collegeEnrollmentLoads;
        }
      )
      .addCase(getCollegeAndTESDAEnrollments.rejected, (state) => {
        state.isFetchingCollegeAndTESDAEnrollments = false;
      })
      .addCase(getCollegeStudentEnrollmentLoad.pending, (state) => {
        state.isFetchingCollegeEnrollment = true;
      })
      .addCase(
        getCollegeStudentEnrollmentLoad.fulfilled,
        (state, { payload }) => {
          state.isFetchingCollegeEnrollment = false;
          state.collegeStudentLoad = payload.existingStudentLoad;
        }
      )
      .addCase(getCollegeStudentEnrollmentLoad.rejected, (state) => {
        state.isFetchingCollegeEnrollment = false;
      })
      .addCase(createCollegeEnrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = false;
      })
      .addCase(createCollegeEnrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = true;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = true;
        toast.success(payload.msg);
      })
      .addCase(createCollegeEnrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = false;
        state.isEnrollmentError = true;
        state.isSuccessfulEnrollment = false;
        toast.error(payload.msg);
      })
      .addCase(updateCollegeEnrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
      })
      .addCase(updateCollegeEnrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        toast.success(payload.msg);
      })
      .addCase(updateCollegeEnrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        toast.error(payload.msg);
      })
      .addCase(deleteCollegeEnrollment.pending, (state) => {
        state.isDeletingStudentLoad = true;
      })
      .addCase(deleteCollegeEnrollment.fulfilled, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.success(payload.msg);
      })
      .addCase(deleteCollegeEnrollment.rejected, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.error(payload.msg);
      })
      .addCase(getTESDAEnrollments.pending, (state) => {
        state.isFetchingTESDAEnrollments = true;
      })
      .addCase(getTESDAEnrollments.fulfilled, (state, { payload }) => {
        state.isFetchingTESDAEnrollments = false;
        state.tesdaEnrollments = payload.tesdaEnrollmentLoads;
      })
      .addCase(getTESDAEnrollments.rejected, (state) => {
        state.isFetchingTESDAEnrollments = false;
      })
      .addCase(getTESDAStudentEnrollmentLoad.pending, (state) => {
        state.isFetchingTESDAEnrollment = true;
      })
      .addCase(
        getTESDAStudentEnrollmentLoad.fulfilled,
        (state, { payload }) => {
          state.isFetchingTESDAEnrollment = false;
          state.tesdaStudentLoad = payload.existingStudentLoad;
        }
      )
      .addCase(getTESDAStudentEnrollmentLoad.rejected, (state) => {
        state.isFetchingTESDAEnrollment = false;
      })
      .addCase(createTESDAEnrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = false;
      })
      .addCase(createTESDAEnrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = true;
        state.isEnrollmentError = false;
        state.isSuccessfulEnrollment = true;
        toast.success(payload.msg);
      })
      .addCase(createTESDAEnrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        state.showModal = false;
        state.isEnrollmentError = true;
        state.isSuccessfulEnrollment = false;
        toast.error(payload.msg);
      })
      .addCase(updateTESDAEnrollment.pending, (state) => {
        state.isSavingStudentLoad = true;
        state.showModal = false;
      })
      .addCase(updateTESDAEnrollment.fulfilled, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        toast.success(payload.msg);
      })
      .addCase(updateTESDAEnrollment.rejected, (state, { payload }) => {
        state.isSavingStudentLoad = false;
        toast.error(payload.msg);
      })
      .addCase(deleteTESDAEnrollment.pending, (state) => {
        state.isDeletingStudentLoad = true;
      })
      .addCase(deleteTESDAEnrollment.fulfilled, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTESDAEnrollment.rejected, (state, { payload }) => {
        state.isDeletingStudentLoad = false;
        toast.error(payload.msg);
      })
      .addCase(getGrantsAndVouchers.pending, (state) => {
        state.isFetchingGrantsAndVouchers = true;
      })
      .addCase(getGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isFetchingGrantsAndVouchers = false;
        state.grantsAndVouchers = payload.grantsAndVouchers;
      })
      .addCase(getGrantsAndVouchers.rejected, (state) => {
        state.isFetchingGrantsAndVouchers = false;
      })
      .addCase(createGrantsAndVouchers.pending, (state) => {
        state.isSavingGrantsAndVouchers = true;
      })
      .addCase(createGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isSavingGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(createGrantsAndVouchers.rejected, (state, { payload }) => {
        state.isSavingGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(getGrantAndVoucher.pending, (state) => {
        state.isFetchingGrantAndVoucher = true;
      })
      .addCase(getGrantAndVoucher.fulfilled, (state, { payload }) => {
        state.isFetchingGrantAndVoucher = false;
        state.grantAndVoucher = payload.grantAndVoucher;
      })
      .addCase(getGrantAndVoucher.rejected, (state) => {
        state.isFetchingGrantAndVoucher = false;
      })
      .addCase(updateGrantsAndVouchers.pending, (state) => {
        state.isUpdatingGrantsAndVouchers = true;
      })
      .addCase(updateGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isUpdatingGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(updateGrantsAndVouchers.rejected, (state, { payload }) => {
        state.isUpdatingGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(deleteGrantsAndVouchers.pending, (state) => {
        state.isDeletingGrantsAndVouchers = true;
      })
      .addCase(deleteGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isDeletingGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(deleteGrantsAndVouchers.rejected, (state, { payload }) => {
        state.isDeletingGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(archiveGrantsAndVouchers.pending, (state) => {
        state.isArchivingGrantsAndVouchers = true;
      })
      .addCase(archiveGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isArchivingGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(archiveGrantsAndVouchers.rejected, (state, { payload }) => {
        state.isArchivingGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(unarchiveGrantsAndVouchers.pending, (state) => {
        state.isArchivingGrantsAndVouchers = true;
      })
      .addCase(unarchiveGrantsAndVouchers.fulfilled, (state, { payload }) => {
        state.isArchivingGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(unarchiveGrantsAndVouchers.rejected, (state, { payload }) => {
        state.isArchivingGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(getGrantsNumberFormats.pending, (state) => {
        state.isFetchingGrantNumberFormats = true;
      })
      .addCase(getGrantsNumberFormats.fulfilled, (state, { payload }) => {
        state.isFetchingGrantNumberFormats = false;
        state.grantNumberFormats = payload.grantNumberFormats;
      })
      .addCase(getGrantsNumberFormats.rejected, (state) => {
        state.isFetchingGrantNumberFormats = false;
      })
      .addCase(createGrantsNumberFormat.pending, (state) => {
        state.isSavingGrantNumberFormat = true;
      })
      .addCase(createGrantsNumberFormat.fulfilled, (state, { payload }) => {
        state.isSavingGrantNumberFormat = false;
        toast.success(payload.msg);
      })
      .addCase(createGrantsNumberFormat.rejected, (state, { payload }) => {
        state.isSavingGrantNumberFormat = false;
        toast.error(payload);
      })
      .addCase(updateGrantsNumberFormat.pending, (state) => {
        state.isUpdatingGrantNumberFormat = true;
      })
      .addCase(updateGrantsNumberFormat.fulfilled, (state, { payload }) => {
        state.isUpdatingGrantNumberFormat = false;
        toast.success(payload.msg);
      })
      .addCase(updateGrantsNumberFormat.rejected, (state, { payload }) => {
        state.isUpdatingGrantNumberFormat = false;
        toast.error(payload);
      })
      .addCase(deleteGrantsNumberFormat.pending, (state) => {
        state.isDeletingGrantNumberFormat = true;
      })
      .addCase(deleteGrantsNumberFormat.fulfilled, (state, { payload }) => {
        state.isDeletingGrantNumberFormat = false;
        toast.success(payload.msg);
      })
      .addCase(deleteGrantsNumberFormat.rejected, (state, { payload }) => {
        state.isDeletingGrantNumberFormat = false;
        toast.error(payload);
      })
      .addCase(fetchAllStudentGrants.pending, (state) => {
        state.isFetchingStudentGrantsAndVouchers = true;
      })
      .addCase(fetchAllStudentGrants.fulfilled, (state, { payload }) => {
        state.isFetchingStudentGrantsAndVouchers = false;
        state.studentGrantsAndVouchers = payload.studentGrantsAndVouchers;
      })
      .addCase(fetchAllStudentGrants.rejected, (state, { payload }) => {
        state.isFetchingStudentGrantsAndVouchers = false;
        toast.error(payload.msg);
      })
      .addCase(createStudentGrant.pending, (state) => {
        state.isSavingStudentGrantsAndVouchers = true;
      })
      .addCase(createStudentGrant.fulfilled, (state, { payload }) => {
        state.isSavingStudentGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(createStudentGrant.rejected, (state, { payload }) => {
        state.isSavingStudentGrantsAndVouchers = false;
        toast.error(payload.msg);
      })
      .addCase(updateStudentGrant.pending, (state) => {
        state.isUpdatingStudentGrantsAndVouchers = true;
      })
      .addCase(updateStudentGrant.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(updateStudentGrant.rejected, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(bulkCreateStudentGrant.pending, (state) => {
        state.isSavingStudentGrantsAndVouchers = true;
      })
      .addCase(bulkCreateStudentGrant.fulfilled, (state, { payload }) => {
        state.isSavingStudentGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(bulkCreateStudentGrant.rejected, (state, { payload }) => {
        state.isSavingStudentGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(fetchStudentGrantByStudent.pending, (state) => {
        state.isFetchingStudentGrantsAndVouchers = true;
      })
      .addCase(fetchStudentGrantByStudent.fulfilled, (state, { payload }) => {
        state.isFetchingStudentGrantsAndVouchers = false;
        state.studentGrantsAndVouchers = payload.studentGrantsAndVouchers;
      })
      .addCase(fetchStudentGrantByStudent.rejected, (state) => {
        state.isFetchingStudentGrantsAndVouchers = false;
      })
      .addCase(deleteStudentGrant.pending, (state) => {
        state.isDeletingStudentGrantAndVoucher = true;
      })
      .addCase(deleteStudentGrant.fulfilled, (state, { payload }) => {
        state.isDeletingStudentGrantAndVoucher = false;
        toast.success(payload.msg);
      })
      .addCase(deleteStudentGrant.rejected, (state, { payload }) => {
        state.isDeletingStudentGrantAndVoucher = false;
        toast.error(payload);
      })
      .addCase(cancelStudentGrant.pending, (state) => {
        state.isCancellingStudentGrantAndVoucher = true;
      })
      .addCase(cancelStudentGrant.fulfilled, (state, { payload }) => {
        state.isCancellingStudentGrantAndVoucher = false;
        toast.success(payload.msg);
      })
      .addCase(cancelStudentGrant.rejected, (state, { payload }) => {
        state.isCancellingStudentGrantAndVoucher = false;
        toast.error(payload);
      })
      .addCase(archiveStudentGrant.pending, (state) => {
        state.isUpdatingStudentGrantsAndVouchers = true;
      })
      .addCase(archiveStudentGrant.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(archiveStudentGrant.rejected, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.error(payload);
      })
      .addCase(unarchiveStudentGrant.pending, (state) => {
        state.isUpdatingStudentGrantsAndVouchers = true;
      })
      .addCase(unarchiveStudentGrant.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.success(payload.msg);
      })
      .addCase(unarchiveStudentGrant.rejected, (state, { payload }) => {
        state.isUpdatingStudentGrantsAndVouchers = false;
        toast.error(payload);
      });
  },
});

export const {
  setStudent,
  setStudentData,
  clearStudentData,
  handleChange,
  setOpen,
  setMode,
  //Academic Year
  setAcademicYear,
  clearAcademicYear,
  toggleAddAcademicYear,
  toggleEditAcademicYear,
  //Semester
  setSemester,
  clearSemester,
  toggleAddSemester,
  toggleEditSemester,
  //College or Track
  setCollegeTrack,
  clearCollegeTrack,
  toggleAddCollegeTrack,
  toggleEditCollegeTrack,
  //Department
  setDepartment,
  clearDepartment,
  toggleAddDepartment,
  toggleEditDepartment,
  //Year Levels
  setYearLevel,
  toggleAddYearLevel,
  toggleEditYearLevel,
  clearYearLevel,
  //K12Enrollment
  setK12Enrollment,
  clearK12Enrollment,
  //Students
  setStudentRecord,
  clearStudentInfo,
  clearGrantAndVoucher,
  setGrantNumberFormat,
  resetGrantNumberFormat,
  setGrantAndVoucher,
  clearDynamicData,
  setDynamicData,
  changeStudentPageNumber,
  changefilteredStudentsPageNumber,
  changeApplicantsPageNumber,
} = registrarSlice.actions;

export default registrarSlice.reducer;
