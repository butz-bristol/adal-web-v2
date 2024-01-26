import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  addCollegeSubjectThunk,
  addSubjectGradeThunk,
  archiveSectionThunk,
  createCurriculumThunk,
  createGradingScheduleThunk,
  createK12SubjectThunk,
  createProgramThunk,
  createRoomThunk,
  createRoomTypeThunk,
  createScheduleThunk,
  createSectionThunk,
  createSubjectAssignmentThunk,
  createTesdaCourseThunk,
  //Users
  createUserThunk,
  createVerificationScheduleThunk,
  createViewingScheduleThunk,
  deleteCollegeSubjectThunk,
  deleteCurriculumThunk,
  deleteGradingScheduleThunk,
  deleteK12SubjectThunk,
  deleteProgramThunk,
  deleteRoomThunk,
  deleteRoomTypeThunk,
  deleteScheduleThunk,
  deleteSectionThunk,
  deleteStudentRecordThunk,
  deleteSubjectAssignmentThunk,
  deleteTesdaCourseThunk,
  deleteUserThunk,
  deleteVerificationScheduleThunk,
  deleteViewingScheduleThunk,
  generateStudentRecordThunk,
  getAllCollegeSubjectsThunk,
  getAllCurriculumsThunk,
  getAllK12SubjectsThunk,
  getAllProgramsThunk,
  // K12Schedules
  getAllSchedulesThunk,
  //Sections
  getAllSectionsThunk,
  // Students
  getAllStudentsBySectionThunk,
  // Subject Assignments
  getAllSubjectAssignmentsThunk,
  getAllTesdaCoursesThunk,
  getCollegeSubjectThunk,
  getCurriculumThunk,
  getDataThunk,
  getInstructorsThunk,
  getK12SubjectThunk,
  getProgramThunk,
  getScheduleThunk,
  getSectionByDepartmentThunk,
  getSubjectAssignmentThunk,
  getTesdaCourseThunk,
  updateCollegeBulkGradesThunk,
  updateCollegeSubjectThunk,
  updateCurriculumThunk,
  updateGradingScheduleThunk,
  updateInstructorThunk,
  updateK12BulkGradesThunk,
  updateK12EnrollmentReportThunk,
  updateK12EnrollmentThunk,
  updateK12SubjectThunk,
  updateProgramThunk,
  updateRoomThunk,
  updateRoomTypeThunk,
  updateScheduleThunk,
  updateSectionThunk,
  updateSubjectAssignmentThunk,
  updateTesdaCourseThunk,
  updateUserThunk,
  updateVerificationScheduleThunk,
  updateViewingScheduleThunk
} from './academicThunk';

const initialState = {
  query: '',

  // Curriculum
  curriculums: [],
  isFetchingCurriculums: false,
  curriculum: {},
  isFetchingCurriculum: false,
  isCreatingCurriculum: false,
  isUpdatingCurriculum: false,
  isDeletingCurriculum: false,
  isAddingCurriculum: false,
  isEditingCurriculum: false,

  // Programs

  programs: [],
  isFetchingPrograms: false,
  program: {},
  isFetchingProgram: false,
  isCreatingProgram: false,
  isUpdatingProgram: false,
  isDeletingProgram: false,
  isAddingProgram: false,
  isEditingProgram: false,

  // K12 Subjects

  k12Subjects: [],
  k12Subject: {},
  isFetchingK12Subjects: false,
  isFetchingK12Subject: false,
  isAddingK12Subject: false,
  isEditingK12Subject: false,
  isCreatingK12Subject: false,
  isUpdatingK12Subject: false,
  isDeletingK12Subject: false,

  totalK12Subjects: 0,
  totalK12SubjectsPages: 0,
  k12SubjectPageNumber: 1,
  filteredSubjectsPageNumber: 1,
  filteredK12Subjects: [],
  totalFilteredK12Subjects: 0,
  totalFilteredK12SubjectsPages: 0,
  k12SubjectsByProgram: [],
  isFetchingK12SubjectsByProgram: false,
  k12SubjectsByYearLevel: [],
  isFetchingK12SubjectsByYearLevel: false,

  // College Subjects

  collegeSubjects: [],
  collegeSubject: {
    pre_requisites: [],
    co_requisites: [],
    hasPreRequisites: false,
    hasCoRequisites: false,
    isPreRequisite: false,
    isCoRequisite: false
  },
  pre_requisites: [],
  isAddingCollegeSubject: false,
  isUpdatingCollegeSubject: false,
  isDeletingCollegeSubject: false,
  isFetchingCollegeSubjects: false,
  isFetchingCollegeSubject: false,
  isEditingCollegeSubject: false,
  totalCollegeSubjects: 0,
  totalCollegeSubjectsPages: 0,
  collegeSubjectPageNumber: 1,
  filteredCollegeSubjects: [],
  totalFilteredCollegeSubjects: 0,
  totalFilteredCollegeSubjectsPages: 0,
  collegeSubjectsByProgram: [],
  isFetchingCollegeSubjectsByProgram: false,

  // Tesda Courses

  tesdaCourses: [],
  isFetchingTesdaCourses: false,
  tesdaCourse: {},
  isFetchingTesdaCourse: false,
  isCreatingTesdaCourse: false,
  isUpdatingTesdaCourse: false,
  isDeletingTesdaCourse: false,
  isAddingTesdaCourse: false,
  isEditingTesdaCourse: false,

  // Subject Details
  isFilteringSubjects: false,
  isFetchingSubject: false,
  isFetchingTesdaCourse: false,
  subject_name: '',
  subject_description: '',
  subject_code: '',
  subject_unit: '',
  level: '',
  subject_id: '',
  subject_type: '',
  course_total_hours: '',
  remarks: '',
  semester: '',
  year_level: '',
  isEditingSubject: false,
  isDeletingSubject: false,
  isAddingSubject: false,
  isUpdatingSubject: false,
  pre_requisite_toggle: false,
  isViewingSubject: false,

  // Sections

  sections: [],
  availableStudents: [],
  isFetchingSections: false,
  section: { students: [] },
  isFetchingSection: false,
  isCreatingSection: false,
  isUpdatingSection: false,
  isDeletingSection: false,
  isAddingSection: false,
  isEditingSection: false,
  filterSectionByAcademicYear: {},

  // K12Schedules
  schedules: [],
  K12Schedules: [],
  CollegeSchedules: [],
  TESDASchedules: [],
  schedule: { schedule: [] },
  isFetchingSchedules: false,
  isFetchingSchedule: false,
  isAddingSchedule: false,
  isEditingSchedule: false,
  isDeletingSchedule: false,
  isCreatingSchedule: false,
  isUpdatingSchedule: false,

  // Subject Assignments
  subjectAssignments: [],
  K12SubjectAssignments: [],
  CollegeSubjectAssignments: [],
  TESDASubjectAssignments: [],
  subjectAssignment: {},
  isFetchingSubjectAssignments: false,
  isFetchingSubjectAssignment: false,
  isAddingSubjectAssignment: false,
  isEditingSubjectAssignment: false,
  isDeletingSubjectAssignment: false,
  isCreatingSubjectAssignment: false,
  isUpdatingSubjectAssignment: false,

  // Rooms
  rooms: [],
  room: { departments: [] },
  isFetchingRooms: false,
  isFetchingRoom: false,
  isEditingRoom: false,
  isUpdatingRoom: false,
  isDeletingRoom: false,
  isAddingRoom: false,
  isCreatingRoom: false,

  //K12 Grade & Report Card
  student_report: null,
  isFetchingStudentReportCard: false,
  isUpdatingStudentReportCard: false,
  isEditingK12Grade: false,
  isEditingCollegeGrade: false,
  isEditingReportCard: false,

  //Room Types
  roomTypes: [],
  roomType: {},
  isFetchingRoomTypes: false,
  isFetchingRoomType: false,
  isEditingRoomType: false,
  isUpdatingRoomType: false,
  isDeletingRoomType: false,
  isAddingRoomType: false,
  isCreatingRoomType: false,

  //Subject Types
  subjectTypes: [],
  subjectType: null,
  isFetchingSubjectTypes: false,
  isFetchingSubjectType: false,
  isEditingSubjectType: false,
  isUpdatingSubjectType: false,
  isDeletingSubjectType: false,
  isAddingSubjectType: false,
  isCreatingSubjectType: false,

  // Instructors
  instructors: [],
  isFetchingInstructors: false,

  //Students
  student: null,
  isAddingStudent: false,
  isEditingStudent: false,
  studentsBySection: [],
  studentsByLevel: [],
  selectedStudents: [],
  isAddingStudentInSection: false,
  isEditingStudentInSection: false,
  isCreatingStudentInSection: false,
  isUpdatingStudentInSection: false,
  isDeletingStudentInSection: false,
  isFetchingStudentsBySection: false,
  isFetchingStudentsByLevel: false,
  grade: {},
  isAddingGrade: false,
  isEditingGrade: false,
  isCreatingGrade: false,
  isUpdatingGrade: false,
  filterAcademicRecord: {},
  studentRecords: [],
  studentRecord: {},
  isFetchingStudentRecords: false,
  isFetchingStudentRecord: false,
  isCreatingStudentRecord: false,
  isUpdatingStudentRecord: false,
  isDeletingStudentRecord: false,
  isAddingStudentRecord: false,
  isEditingStudentRecord: false,

  //Users
  users: [],
  supervisors: [],
  user: {
    same_address_toggle: false,
    admin_designation_toggle: false,
    teaching_designation_toggle: false,
    special_designation_toggle: false,
    birth_date: '1960-01-01',
    teaching_department: [],
    teaching_designation: [],
    supervisor: false
  },
  userProfile: {},
  isFetchingUsers: false,
  isFetchingUser: false,
  isCreatingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,
  isAddingUser: false,
  isEditingUser: false,

  // Grading Setup
  start_date_time: '',
  end_date_time: '',
  schedule_status: '',

  gradingSchedules: [],
  isFetchingGradingSchedules: false,
  gradingSchedule: {},
  grade_schedule_id: '',
  addGradingSchedule: false,
  editGradingSchedule: false,
  isFetchingGradingSchedule: false,
  isCreatingGradingSchedule: false,
  isDeletingGradingSchedule: false,
  isUpdatingGradingSchedule: false,

  verificationSchedules: [],
  isFetchingVerificationSchedules: false,
  verificationSchedule: {},
  verification_schedule_id: '',
  addVerificationSchedule: false,
  editVerificationSchedule: false,
  isFetchingVerificationSchedule: false,
  isCreatingVerificationSchedule: false,
  isDeletingVerificationSchedule: false,
  isUpdatingVerificationSchedule: false,

  viewingSchedules: [],
  isFetchingViewingSchedules: false,
  viewingSchedule: {},
  viewing_schedule_id: '',
  addViewingSchedule: false,
  editViewingSchedule: false,
  isFetchingViewingSchedule: false,
  isCreatingViewingSchedule: false,
  isDeletingViewingSchedule: false,
  isUpdatingViewingSchedule: false,

  //Teaching Loads
  teaching_loads: [],
  enrolledStudents: [],
  isFetchingStudentsFromEnrollment: false,

  //Search and Filter
  selectedAcademicYear: null,
  selectedDepartment: null
};

export const getAllCurriculums = createAsyncThunk('academics/getAllCurriculums', async (_, thunkAPI) => {
  return getAllCurriculumsThunk('/curriculums', thunkAPI);
});

export const getCurriculum = createAsyncThunk('academics/getCurriculum', async (curriculumId, thunkAPI) => {
  return getCurriculumThunk(`/curriculums/${curriculumId}`, thunkAPI);
});

export const createCurriculum = createAsyncThunk('academics/createCurriculum', async (curriculum, thunkAPI) => {
  return createCurriculumThunk('/curriculums', curriculum, thunkAPI);
});

export const updateCurriculum = createAsyncThunk('academics/updateCurriculum', async (curriculum, thunkAPI) => {
  return updateCurriculumThunk(`/curriculums/${curriculum._id}`, curriculum, thunkAPI);
});

export const deleteCurriculum = createAsyncThunk('academics/deleteCurriculum', async (curriculumId, thunkAPI) => {
  return deleteCurriculumThunk(`/curriculums/${curriculumId}`, thunkAPI);
});

export const getAllPrograms = createAsyncThunk('academics/getAllPrograms', async (_, thunkAPI) => {
  return getAllProgramsThunk('/programs', thunkAPI);
});

export const getProgram = createAsyncThunk('academics/getProgram', async (programId, thunkAPI) => {
  return getProgramThunk(`/programs/${programId}`, thunkAPI);
});

export const createProgram = createAsyncThunk('academics/createProgram', async (program, thunkAPI) => {
  return createProgramThunk('/programs', program, thunkAPI);
});

export const updateProgram = createAsyncThunk('academics/updateProgram', async (program, thunkAPI) => {
  return updateProgramThunk(`/programs/${program._id}`, program, thunkAPI);
});

export const deleteProgram = createAsyncThunk('academics/deleteProgram', async (programId, thunkAPI) => {
  return deleteProgramThunk(`/programs/${programId}`, thunkAPI);
});

// K12 Subjects
export const getAllK12Subjects = createAsyncThunk('academics/getAllK12Subjects', async (_, thunkAPI) => {
  return getAllK12SubjectsThunk('/subjects/k12', thunkAPI);
});

export const getK12Subject = createAsyncThunk('academics/getK12Subject', async (subjectId, thunkAPI) => {
  return getK12SubjectThunk(`/subjects/k12/${subjectId}`, thunkAPI);
});

export const getK12SubjectsByQuery = createAsyncThunk('academics/getK12SubjectsByQuery', async (_, thunkAPI) => {
  return getAllK12SubjectsThunk(
    `/subjects/k12/search/${thunkAPI.getState().academics.query}?page=${thunkAPI.getState().academics.filteredSubjectsPageNumber}`,
    thunkAPI
  );
});

export const getK12SubjectsByProgram = createAsyncThunk('academics/getK12SubjectsByProgram', async ({ level, program }, thunkAPI) => {
  return getAllK12SubjectsThunk(`/subjects/k12/level/${level}/${program}`, thunkAPI);
});

export const getK12SubjectsByYearLevel = createAsyncThunk('academics/getK12SubjectsByYearLevel', async ({ level }, thunkAPI) => {
  return getAllK12SubjectsThunk(`/subjects/k12/level/${level}`, thunkAPI);
});

export const createK12Subject = createAsyncThunk('academics/createK12Subject', async (subject, thunkAPI) => {
  return createK12SubjectThunk('/subjects/k12', subject, thunkAPI);
});

export const updateK12Subject = createAsyncThunk('academics/updateK12Subject', async (subject, thunkAPI) => {
  return updateK12SubjectThunk(`/subjects/k12/${subject._id}`, subject, thunkAPI);
});

export const deleteK12Subject = createAsyncThunk('academics/deleteK12Subject', async (subjectId, thunkAPI) => {
  return deleteK12SubjectThunk(`/subjects/k12/${subjectId}`, thunkAPI);
});

// College Subjects

export const getAllCollegeSubjects = createAsyncThunk('academics/getAllCollegeSubjects', async (_, thunkAPI) => {
  return getAllCollegeSubjectsThunk('/subjects/college', thunkAPI);
});

export const getCollegeSubject = createAsyncThunk('academics/getCollegeSubject', async (subjectId, thunkAPI) => {
  return getCollegeSubjectThunk(`/subjects/college/${subjectId}`, thunkAPI);
});

export const getCollegeSubjectsByQuery = createAsyncThunk('academics/getCollegeSubjectsByQuery', async (_, thunkAPI) => {
  return getAllCollegeSubjectsThunk(
    `/subjects/college/search/${thunkAPI.getState().academics.query}?page=${thunkAPI.getState().academics.filteredSubjectsPageNumber}`,
    thunkAPI
  );
});

export const getCollegeSubjectsByProgram = createAsyncThunk(
  'academics/getCollegeSubjectsByProgram',
  async ({ year_level, semester, program }, thunkAPI) => {
    return getAllCollegeSubjectsThunk(`/subjects/college/${year_level}/${semester}/${program}`, thunkAPI);
  }
);

export const addCollegeSubject = createAsyncThunk('academics/addCollegeSubject', async (subject, thunkAPI) => {
  return addCollegeSubjectThunk('/subjects/college', subject, thunkAPI);
});

export const updateCollegeSubject = createAsyncThunk('academics/updateCollegeSubject', async (subject, thunkAPI) => {
  return updateCollegeSubjectThunk(`/subjects/college/${subject._id}`, subject, thunkAPI);
});

export const deleteCollegeSubject = createAsyncThunk('academics/deleteCollegeSubject', async (subjectId, thunkAPI) => {
  return deleteCollegeSubjectThunk(`/subjects/college/${subjectId}`, thunkAPI);
});

// TESDA Courses

export const getAllTesdaCourses = createAsyncThunk('academics/getAllTesdaCourses', async (_, thunkAPI) => {
  return getAllTesdaCoursesThunk('/subjects/tesda', thunkAPI);
});

export const getTesdaCourse = createAsyncThunk('academics/getTesdaCourse', async (courseId, thunkAPI) => {
  return getTesdaCourseThunk(`/subjects/tesda/${courseId}`, thunkAPI);
});

export const getTesdaCoursesByQuery = createAsyncThunk('academics/getTesdaCoursesByQuery', async (_, thunkAPI) => {
  return getAllTesdaCoursesThunk(
    `/subjects/tesda/search/${thunkAPI.getState().academics.query}?page=${thunkAPI.getState().academics.filteredSubjectsPageNumber}`,
    thunkAPI
  );
});

export const getTESDACoursesByProgram = createAsyncThunk('academics/getTESDACoursesByProgram', async ({ program }, thunkAPI) => {
  return getAllTesdaCoursesThunk(`/subjects/tesda/program/${program}`, thunkAPI);
});

export const createTesdaCourse = createAsyncThunk('academics/createTesdaCourse', async (subject, thunkAPI) => {
  return createTesdaCourseThunk('/subjects/tesda', subject, thunkAPI);
});

export const updateTesdaCourse = createAsyncThunk('academics/updateTesdaCourse', async (subject, thunkAPI) => {
  return updateTesdaCourseThunk(`/subjects/tesda/${subject._id}`, subject, thunkAPI);
});

export const deleteTesdaCourse = createAsyncThunk('academics/deleteTesdaCourse', async (subjectId, thunkAPI) => {
  return deleteTesdaCourseThunk(`/subjects/tesda/${subjectId}`, thunkAPI);
});

// Sections

export const getAllSections = createAsyncThunk('academics/getAllSections', async (_, thunkAPI) => {
  return getAllSectionsThunk('/sections', thunkAPI);
});

export const getAvailableStudents = createAsyncThunk('academics/getAvailableStudents', async (section, thunkAPI) => {
  return getAllSectionsThunk('/sections/students', section, thunkAPI);
});

export const getSectionByDepartment = createAsyncThunk('academics/getSectionByDepartment', async (departmentIds, thunkAPI) => {
  return getSectionByDepartmentThunk('/sections/department', departmentIds, thunkAPI);
});

export const getSection = createAsyncThunk('academics/getSection', async (id, thunkAPI) => {
  return getDataThunk(`/sections/${id}`, thunkAPI);
});

export const createSection = createAsyncThunk('academics/createSection', async (section, thunkAPI) => {
  return createSectionThunk('/sections', section, thunkAPI);
});

export const updateSection = createAsyncThunk('academics/updateSection', async (section, thunkAPI) => {
  return updateSectionThunk(`/sections/${section._id}`, section, thunkAPI);
});

export const addStudentsInSection = createAsyncThunk('academics/addStudentsInSection', async (section, thunkAPI) => {
  return updateSectionThunk(`/sections/bulk`, section, thunkAPI);
});

export const removeStudentFromSection = createAsyncThunk('academics/removeStudentFromSection', async (section, thunkAPI) => {
  return updateSectionThunk(`/sections/remove`, section, thunkAPI);
});

export const deleteSection = createAsyncThunk('academics/deleteSection', async (id, thunkAPI) => {
  return deleteSectionThunk(`/sections/${id}`, thunkAPI);
});

export const archiveSection = createAsyncThunk('academics/archiveSection', async (id, thunkAPI) => {
  return archiveSectionThunk(`/sections/archive/${id}`, thunkAPI);
});

export const unarchiveSection = createAsyncThunk('academics/unarchiveSection', async (id, thunkAPI) => {
  return archiveSectionThunk(`/sections/unarchive/${id}`, thunkAPI);
});

// Instructors

export const getAllInstructors = createAsyncThunk('academics/getAllInstructors', async (_, thunkAPI) => {
  return getInstructorsThunk('/users/teachers', thunkAPI);
});

// Rooms

export const getAllRooms = createAsyncThunk('academics/getAllRooms', async (_, thunkAPI) => {
  return getDataThunk('/rooms', thunkAPI);
});

export const getRoom = createAsyncThunk('academics/getRoom', async (roomId, thunkAPI) => {
  return getDataThunk(`/rooms/${roomId}`, thunkAPI);
});

export const createRoom = createAsyncThunk('academics/createRoom', async (room, thunkAPI) => {
  return createRoomThunk('/rooms', room, thunkAPI);
});

export const updateRoom = createAsyncThunk('academics/updateRoom', async (room, thunkAPI) => {
  return updateRoomThunk(`/rooms/${room._id}`, room, thunkAPI);
});

export const deleteRoom = createAsyncThunk('academics/deleteRoom', async (id, thunkAPI) => {
  return deleteRoomThunk(`/rooms/${id}`, thunkAPI);
});

export const getAllRoomTypes = createAsyncThunk('academics/getAllRoomTypes', async (_, thunkAPI) => {
  return getDataThunk('/room-types', thunkAPI);
});

export const getRoomType = createAsyncThunk('academics/getRoomType', async (id, thunkAPI) => {
  return getDataThunk(`/room-types/${id}`, thunkAPI);
});

export const createRoomType = createAsyncThunk('academics/createRoomType', async (room, thunkAPI) => {
  return createRoomTypeThunk('/room-types', room, thunkAPI);
});

export const updateRoomType = createAsyncThunk('academics/updateRoomType', async (room, thunkAPI) => {
  return updateRoomTypeThunk(`/room-types/${room._id}`, room, thunkAPI);
});

export const deleteRoomType = createAsyncThunk('academics/deleteRoomType', async (id, thunkAPI) => {
  return deleteRoomTypeThunk(`/room-types/${id}`, thunkAPI);
});

// Subject Types
export const getAllSubjectTypes = createAsyncThunk('academics/getAllSubjectTypes', async (_, thunkAPI) => {
  return getDataThunk('/subjects/types', thunkAPI);
});

export const getSubjectTypeById = createAsyncThunk('academics/getSubjectTypeById', async (id, thunkAPI) => {
  return getDataThunk(`/subjects/types/${id}`, thunkAPI);
});

export const createSubjectType = createAsyncThunk('academics/createSubjectType', async (data, thunkAPI) => {
  return createSubjectTypeByIdThunk('/subjects/types/', data, thunkAPI);
});

export const updateSubjectTypeById = createAsyncThunk('academics/updateSubjectTypeById', async (data, thunkAPI) => {
  return updateSubjectTypeByIdThunk(`/subjects/types/${data._id}`, data, thunkAPI);
});

export const deleteSubjectTypeById = createAsyncThunk('academics/deleteSubjectTypeById', async (id, thunkAPI) => {
  return deleteSubjectTypeByIdThunk(`/subjects/types/${id}`, thunkAPI);
});

// Schedules

export const getAllSchedules = createAsyncThunk('academics/getAllSchedules', async (_, thunkAPI) => {
  return getAllSchedulesThunk('/schedules', thunkAPI);
});

export const getSchedule = createAsyncThunk('academics/getSchedule', async (scheduleId, thunkAPI) => {
  return getScheduleThunk(`/schedules/${scheduleId}`, thunkAPI);
});

export const createSchedule = createAsyncThunk('academics/createSchedule', async (schedule, thunkAPI) => {
  return createScheduleThunk('/schedules', schedule, thunkAPI);
});

export const updateSchedule = createAsyncThunk('academics/updateSchedule', async (schedule, thunkAPI) => {
  return updateScheduleThunk(`/schedules/${schedule._id}`, schedule, thunkAPI);
});

export const deleteSchedule = createAsyncThunk('academics/deleteSchedule', async (scheduleId, thunkAPI) => {
  return deleteScheduleThunk(`/schedules/${scheduleId}`, thunkAPI);
});

// Subject Assignments

export const getAllSubjectAssignments = createAsyncThunk('academics/getAllSubjectAssignments', async (_, thunkAPI) => {
  return getAllSubjectAssignmentsThunk('/subject-assignments', thunkAPI);
});

export const getSubjectAssignment = createAsyncThunk('academics/getSubjectAssignment', async (subjectId, thunkAPI) => {
  return getSubjectAssignmentThunk(`/subject-assignments/${subjectId}`, thunkAPI);
});

export const createSubjectAssignment = createAsyncThunk('academics/createSubjectAssignment', async (assignment, thunkAPI) => {
  return createSubjectAssignmentThunk('/subject-assignments', assignment, thunkAPI);
});

export const updateSubjectAssignment = createAsyncThunk('academics/updateSubjectAssignment', async (assignment, thunkAPI) => {
  return updateSubjectAssignmentThunk(`/subject-assignments/${assignment._id}`, assignment, thunkAPI);
});

export const deleteSubjectAssignment = createAsyncThunk('academics/deleteSubjectAssignment', async (subjectId, thunkAPI) => {
  return deleteSubjectAssignmentThunk(`/subject-assignments/${subjectId}`, thunkAPI);
});

// Students

export const getAllStudentsBySection = createAsyncThunk('academics/getAllStudentsBySection', async (sectionId, thunkAPI) => {
  return getAllStudentsBySectionThunk(`/registered-students/section/${sectionId}`, thunkAPI);
});

export const getAllStudentsByLevel = createAsyncThunk('academics/getAllStudentsByLevel', async (levelId, thunkAPI) => {
  return getAllStudentsBySectionThunk(`/registered-students/level/${levelId}`, thunkAPI);
});

export const generateStudentRecord = createAsyncThunk('academics/generateStudentRecord', async (record, thunkAPI) => {
  return generateStudentRecordThunk(`/student-record`, record, thunkAPI);
});

export const deleteStudentRecord = createAsyncThunk('academics/deleteStudentRecord', async (record, thunkAPI) => {
  return deleteStudentRecordThunk(`/student-record/${record._id}`, record, thunkAPI);
});

export const getAllStudentRecordsByStudentId = createAsyncThunk(
  'academics/getAllStudentRecordsByStudentId',
  async (studentId, thunkAPI) => {
    return getDataThunk(`/student-record/${studentId}`, thunkAPI);
  }
);

export const getStudentRecordById = createAsyncThunk('academics/getStudentRecordById', async (studentId, thunkAPI) => {
  return getDataThunk(`/student-record/view/${studentId}`, thunkAPI);
});

export const addSubjectGrade = createAsyncThunk('academics/addSubjectGrade', async (grade, thunkAPI) => {
  return addSubjectGradeThunk(`/student-record/${grade._id}`, grade, thunkAPI);
});

export const updateSubjectGrade = createAsyncThunk('academics/updateSubjectGrade', async (enrollment, thunkAPI) => {
  return updateK12EnrollmentThunk(`/enrollment/k-12/${enrollment._id}`, enrollment, thunkAPI);
});

export const getStudentReportCard = createAsyncThunk('academics/getStudentReportCard', async ({ student_id, academic_year }, thunkAPI) => {
  return getDataThunk(`/enrollment/k-12/report/${student_id}/${academic_year}`, thunkAPI);
});

export const getCollegeStudentReportCard = createAsyncThunk(
  'academics/getCollegeStudentReportCard',
  async ({ student_id, academic_year }, thunkAPI) => {
    return getDataThunk(`/enrollment/college/report/${student_id}/${academic_year}`, thunkAPI);
  }
);

export const saveDraftK12Grade = createAsyncThunk('academics/saveDraftK12Grade', async (enrollment, thunkAPI) => {
  return updateK12EnrollmentReportThunk(`/enrollment/k-12/${enrollment._id}`, enrollment, thunkAPI);
});

export const updateK12Grade = createAsyncThunk('academics/updateK12Grade', async (enrollment, thunkAPI) => {
  return updateK12EnrollmentReportThunk(`/enrollment/k-12/${enrollment._id}`, enrollment, thunkAPI);
});

export const saveDraftCollegeGrade = createAsyncThunk('academics/saveDraftK12Grade', async (enrollment, thunkAPI) => {
  return updateK12EnrollmentReportThunk(`/enrollment/college/${enrollment._id}`, enrollment, thunkAPI);
});

export const updateCollegeGrade = createAsyncThunk('academics/updateK12Grade', async (enrollment, thunkAPI) => {
  return updateK12EnrollmentReportThunk(`/enrollment/college/${enrollment._id}`, enrollment, thunkAPI);
});

//User
export const getAllUsers = createAsyncThunk('employee/getAllUsers', async (users, thunkAPI) => {
  return getDataThunk('/users', users, thunkAPI);
});

export const getUserById = createAsyncThunk('employee/getUserById', async (id, thunkAPI) => {
  return getDataThunk(`/users/view/${id}`, thunkAPI);
});

export const createUser = createAsyncThunk('employee/createUser', async (user, thunkAPI) => {
  return createUserThunk('/auth/register', user, thunkAPI);
});

export const updateUser = createAsyncThunk('employee/updateUser', async (user, thunkAPI) => {
  return updateUserThunk(`/users/${user._id}`, user, thunkAPI);
});

export const updateInstructor = createAsyncThunk('employee/updateInstructor', async (user, thunkAPI) => {
  return updateInstructorThunk(`/users/${user._id}`, user, thunkAPI);
});

export const deleteUser = createAsyncThunk('employee/deleteUser', async (employeeId, thunkAPI) => {
  return deleteUserThunk(`/users/${employeeId}`, thunkAPI);
});

export const getUserProfile = createAsyncThunk('employee/getUserProfile', async (_, thunkAPI) => {
  return getDataThunk(`/users/view/${thunkAPI.getState().users.user.userId}`, thunkAPI);
});

// Grading Setup

export const getAllGradingSchedules = createAsyncThunk('academics/getAllGradingSchedules', async (_, thunkAPI) => {
  return getDataThunk('/grading-schedule', thunkAPI);
});

export const getGradingSchedule = createAsyncThunk('academics/getGradingSchedule', async (id, thunkAPI) => {
  return getDataThunk(`/grading-schedule/${id}`, thunkAPI);
});

export const createGradingSchedule = createAsyncThunk('academics/createGradingSchedule', async (schedule, thunkAPI) => {
  return createGradingScheduleThunk('/grading-schedule', schedule, thunkAPI);
});

export const updateGradingSchedule = createAsyncThunk('academics/updateGradingSchedule', async (schedule, thunkAPI) => {
  return updateGradingScheduleThunk(`/grading-schedule/${schedule.id}`, schedule, thunkAPI);
});

export const deleteGradingSchedule = createAsyncThunk('academics/deleteGradingSchedule', async (id, thunkAPI) => {
  return deleteGradingScheduleThunk(`/grading-schedule/${id}`, thunkAPI);
});

export const getAllVerificationSchedules = createAsyncThunk('academics/getAllVerificationSchedules', async (_, thunkAPI) => {
  return getDataThunk('/verification-schedule', thunkAPI);
});

export const getVerificationSchedule = createAsyncThunk('academics/getVerificationSchedule', async (id, thunkAPI) => {
  return getDataThunk(`/verification-schedule/${id}`, thunkAPI);
});

export const createVerificationSchedule = createAsyncThunk('academics/createVerificationSchedule', async (schedule, thunkAPI) => {
  return createVerificationScheduleThunk('/verification-schedule', schedule, thunkAPI);
});

export const updateVerificationSchedule = createAsyncThunk('academics/updateVerificationSchedule', async (schedule, thunkAPI) => {
  return updateVerificationScheduleThunk(`/verification-schedule/${schedule.id}`, schedule, thunkAPI);
});

export const deleteVerificationSchedule = createAsyncThunk('academics/deleteVerificationSchedule', async (id, thunkAPI) => {
  return deleteVerificationScheduleThunk(`/verification-schedule/${id}`, thunkAPI);
});

export const getAllViewingSchedules = createAsyncThunk('academics/getAllViewingSchedules', async (_, thunkAPI) => {
  return getDataThunk('/viewing-schedule', thunkAPI);
});

export const getViewingSchedule = createAsyncThunk('academics/getViewingSchedule', async (id, thunkAPI) => {
  return getDataThunk(`/viewing-schedule/${id}`, thunkAPI);
});

export const createViewingSchedule = createAsyncThunk('academics/createViewingSchedule', async (schedule, thunkAPI) => {
  return createViewingScheduleThunk('/viewing-schedule', schedule, thunkAPI);
});

export const updateViewingSchedule = createAsyncThunk('academics/updateViewingSchedule', async (schedule, thunkAPI) => {
  return updateViewingScheduleThunk(`/viewing-schedule/${schedule.id}`, schedule, thunkAPI);
});

export const deleteViewingSchedule = createAsyncThunk('academics/deleteViewingSchedule', async (id, thunkAPI) => {
  return deleteViewingScheduleThunk(`/viewing-schedule/${id}`, thunkAPI);
});

//Teaching Loads
export const getAllTeachingLoadByUserId = createAsyncThunk('academics/getAllTeachingLoadByUserId', async (_, thunkAPI) => {
  return getDataThunk('/teaching-load', thunkAPI);
});

export const getK12StudentsFromSection = createAsyncThunk('academics/getK12StudentsFromSection', async (data, thunkAPI) => {
  return getDataThunk(`/enrollment/k-12/students/${data.section}/${data.subject}`, thunkAPI);
});

export const getCollegeStudentsFromSection = createAsyncThunk('academics/getCollegeStudentsFromSection', async (data, thunkAPI) => {
  return getDataThunk(`/enrollment/college/students/${data.section}/${data.subject}`, thunkAPI);
});

export const updateK12BulkGrades = createAsyncThunk('academics/updateK12BulkGrades', async (data, thunkAPI) => {
  return updateK12BulkGradesThunk(`/enrollment/k-12/update/bulkGrades`, data, thunkAPI);
});

export const submitK12BulkGrades = createAsyncThunk('academics/submitK12BulkGrades', async (data, thunkAPI) => {
  return updateK12BulkGradesThunk(`/enrollment/k-12/update/bulkGrades`, data, thunkAPI);
});

export const updateCollegeBulkGrades = createAsyncThunk('academics/updateCollegeBulkGrades', async (data, thunkAPI) => {
  return updateCollegeBulkGradesThunk(`/enrollment/college/update/bulkGrades`, data, thunkAPI);
});

export const submitCollegeBulkGrades = createAsyncThunk('academics/submitCollegeBulkGrades', async (data, thunkAPI) => {
  return updateCollegeBulkGradesThunk(`/enrollment/college/update/bulkGrades`, data, thunkAPI);
});

const academicSlice = createSlice({
  name: 'academics',
  initialState,
  reducers: {
    handleChange(state, { payload }) {
      state[payload.name] = payload.value;
    },
    toggleAddCurriculum(state) {
      state.isAddingCurriculum = !state.isAddingCurriculum;
    },
    toggleEditCurriculum(state) {
      state.isEditingCurriculum = !state.isEditingCurriculum;
    },
    setCurriculum: (state, action) => {
      state.curriculum = action.payload;
    },
    clearCurriculum(state) {
      state.curriculum = initialState.curriculum;
    },
    toggleAddProgram(state) {
      state.isAddingProgram = !state.isAddingProgram;
    },
    toggleEditProgram(state) {
      state.isEditingProgram = !state.isEditingProgram;
    },
    setProgram: (state, action) => {
      state.program = action.payload;
    },
    clearProgram(state) {
      state.program = initialState.program;
    },
    toggleAddK12Subject(state) {
      state.isAddingK12Subject = !state.isAddingK12Subject;
    },
    toggleEditK12Subject(state) {
      state.isEditingK12Subject = !state.isEditingK12Subject;
    },
    setK12Subject(state, { payload }) {
      state.k12Subject = payload;
    },
    clearK12Subject(state) {
      state.k12Subject = initialState.k12Subject;
    },
    toggleAddCollegeSubject(state) {
      state.isAddingCollegeSubject = !state.isAddingCollegeSubject;
    },
    toggleEditCollegeSubject(state) {
      state.isEditingCollegeSubject = !state.isEditingCollegeSubject;
    },
    setCollegeSubject(state, { payload }) {
      state.collegeSubject = payload;
    },
    clearCollegeSubject(state) {
      state.collegeSubject = initialState.collegeSubject;
    },
    toggleAddTesdaCourse(state) {
      state.isAddingTesdaCourse = !state.isAddingTesdaCourse;
    },
    toggleEditTesdaCourse(state) {
      state.isEditingTesdaCourse = !state.isEditingTesdaCourse;
    },
    setTesdaCourse(state, { payload }) {
      state.tesdaCourse = payload;
    },
    clearTesdaCourse(state) {
      state.tesdaCourse = initialState.tesdaCourse;
    },
    toggleViewSubject(state) {
      state.isViewingSubject = !state.isViewingSubject;
    },
    toggleAddRoom(state) {
      state.isAddingRoom = !state.isAddingRoom;
      state.room = initialState.room;
    },
    toggleEditRoom(state) {
      state.isEditingRoom = !state.isEditingRoom;
    },
    setRoom(state, action) {
      state.room = action.payload;
    },
    clearRoom(state) {
      state.room = initialState.room;
    },
    toggleAddRoomType(state) {
      state.isAddingRoomType = !state.isAddingRoomType;
      state.roomType = initialState.roomType;
    },
    toggleEditRoomType(state) {
      state.isEditingRoomType = !state.isEditingRoomType;
    },
    setRoomType(state, action) {
      state.roomType = action.payload;
    },
    clearRoomType(state) {
      state.roomType = initialState.roomType;
    },
    toggleAddSubjectType(state) {
      state.isAddingSubjectType = !state.isAddingSubjectType;
      state.subjectType = initialState.subjectType;
    },
    toggleEditSubjectType(state) {
      state.isEditingSubjectType = !state.isEditingSubjectType;
    },
    setSubjectType(state, action) {
      state.subjectType = action.payload;
    },
    clearSubjectType(state) {
      state.subjectType = initialState.subjectType;
    },
    setDynamicData(state, { payload }) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    clearDynamicData(state, { payload }) {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
    toggleAddSection(state) {
      state.isAddingSection = !state.isAddingSection;
    },
    toggleEditSection(state) {
      state.isEditingSection = !state.isEditingSection;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    clearSection(state) {
      state.section = initialState.section;
    },
    clearSchedule(state) {
      state.schedule = initialState.schedule;
    },
    toggleAddSchedule(state) {
      state.isAddingSchedule = !state.isAddingSchedule;
      state.schedule = initialState.schedule;
    },
    toggleEditSchedule(state) {
      state.isEditingSchedule = !state.isEditingSchedule;
    },
    toggleEditReportCard(state) {
      state.isEditingReportCard = !state.isEditingReportCard;
    },
    toggleEditK12Grade(state) {
      state.isEditingK12Grade = !state.isEditingK12Grade;
    },
    toggleEditCollegeGrade(state) {
      state.isEditingCollegeGrade = !state.isEditingCollegeGrade;
    },
    setSubjectAssignment: (state, action) => {
      state.subjectAssignment = action.payload;
    },
    clearSubjectAssignment(state) {
      state.subjectAssignment = initialState.subjectAssignment;
    },
    toggleAddSubjectAssignment(state) {
      state.isAddingSubjectAssignment = !state.isAddingSubjectAssignment;
      state.subjectAssignment = initialState.subjectAssignment;
    },
    toggleEditSubjectAssignment(state) {
      state.isEditingSubjectAssignment = !state.isEditingSubjectAssignment;
    },
    setSelectedStudents: (state, action) => {
      state.selectedStudents = action.payload;
    },
    toggleAddBulkStudentInSection(state) {
      state.isAddingStudentInSection = !state.isAddingStudentInSection;
      state.subjectAssignment = initialState.subjectAssignment;
    },
    toggleEditBulkStudentInSection(state) {
      state.isEditingStudentInSection = !state.isEditingStudentInSection;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
    clearGrade: (state, action) => {
      state.grade = initialState.grade;
    },
    toggleAddGrade(state) {
      state.isAddingGrade = !state.isAddingGrade;
      state.grade = initialState.grade;
    },
    toggleEditGrade(state) {
      state.isEditingGrade = !state.isEditingGrade;
    },
    setFilterAcademicRecord: (state, action) => {
      state.filterAcademicRecord = action.payload;
    },
    clearFilterAcademicRecord: (state, action) => {
      state.filterAcademicRecord = initialState.filterAcademicRecord;
    },
    setFilterSectionByAcademicYear: (state, action) => {
      state.filterSectionByAcademicYear = action.payload;
    },
    clearFilterSectionByAcademicYear: (state, action) => {
      state.filterSectionByAcademicYear = initialState.filterSectionByAcademicYear;
    },
    setStudentRecord: (state, action) => {
      state.studentRecord = action.payload;
    },
    clearStudentRecord: (state, action) => {
      state.studentRecord = initialState.studentRecord;
    },
    toggleAddStudentRecord(state) {
      state.isAddingStudentRecord = !state.isAddingStudentRecord;
      state.studentRecord = initialState.studentRecord;
    },
    toggleEditStudentRecord(state) {
      state.isEditingStudentRecord = !state.isEditingStudentRecord;
    },
    toggleAddUser(state) {
      state.isAddingUser = !state.isAddingUser;
      state.user = initialState.user;
    },
    toggleEditUser(state) {
      state.isEditingUser = !state.isEditingUser;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
    setStudentReport(state, action) {
      state.student_report = action.payload;
    },
    clearStudentReport(state) {
      state.student_report = null;
    },
    toggleAddGradingSchedule(state) {
      state.addGradingSchedule = !state.addGradingSchedule;
    },
    toggleEditGradingSchedule(state) {
      state.editGradingSchedule = !state.editGradingSchedule;
    },
    toggleAddVerificationSchedule(state) {
      state.addVerificationSchedule = !state.addVerificationSchedule;
    },
    toggleEditVerificationSchedule(state) {
      state.editVerificationSchedule = !state.editVerificationSchedule;
    },
    toggleAddViewingSchedule(state) {
      state.addViewingSchedule = !state.addViewingSchedule;
    },
    toggleEditViewingSchedule(state) {
      state.editViewingSchedule = !state.editViewingSchedule;
    },
    setSubjectsFromEnrollmentLoad: (state, action) => {
      state.enrolledStudents = action.payload;
    },
    //Student
    toggleAddStudent(state) {
      state.isAddingStudent = !state.isAddingStudent;
      state.student = initialState.student;
    },
    toggleEditStudent(state) {
      state.isEditingStudent = !state.isEditingStudent;
    },
    setStudent(state, action) {
      state.student = action.payload;
    },
    clearStudent(state) {
      state.student = initialState.student;
    }
  },
  extraReducers: (builder) => {
    builder
      /** Curriculums **/
      .addCase(getAllCurriculums.pending, (state) => {
        state.isFetchingCurriculums = true;
      })
      .addCase(getAllCurriculums.fulfilled, (state, { payload }) => {
        state.isFetchingCurriculums = false;
        state.curriculums = payload.curricula;
      })
      .addCase(getAllCurriculums.rejected, (state) => {
        state.isFetchingCurriculums = false;
      })
      .addCase(getCurriculum.pending, (state) => {
        state.isFetchingCurriculum = true;
      })
      .addCase(getCurriculum.fulfilled, (state, { payload }) => {
        state.isFetchingCurriculum = false;
        state.curriculum = payload.curriculum;
      })
      .addCase(getCurriculum.rejected, (state) => {
        state.isFetchingCurriculum = false;
      })
      .addCase(createCurriculum.pending, (state) => {
        state.isCreatingCurriculum = true;
      })
      .addCase(createCurriculum.fulfilled, (state) => {
        state.isCreatingCurriculum = false;
        toast.success('Curriculum has been added!');
      })
      .addCase(createCurriculum.rejected, (state, { payload }) => {
        state.isCreatingCurriculum = false;
        toast.error(payload.message);
      })
      .addCase(updateCurriculum.pending, (state) => {
        state.isUpdatingCurriculum = true;
      })
      .addCase(updateCurriculum.fulfilled, (state) => {
        state.isUpdatingCurriculum = false;
        toast.success('Curriculum has been updated!');
      })
      .addCase(updateCurriculum.rejected, (state, { payload }) => {
        state.isUpdatingCurriculum = false;
        toast.error(payload.message);
      })
      .addCase(deleteCurriculum.pending, (state) => {
        state.isDeletingCurriculum = true;
      })
      .addCase(deleteCurriculum.fulfilled, (state) => {
        state.isDeletingCurriculum = false;
        toast.success('Curriculum has been deleted!');
      })
      .addCase(deleteCurriculum.rejected, (state, { payload }) => {
        state.isDeletingCurriculum = false;
        toast.error(payload.message);
      })

      /** Programs **/
      .addCase(getAllPrograms.pending, (state) => {
        state.isFetchingPrograms = true;
      })
      .addCase(getAllPrograms.fulfilled, (state, { payload }) => {
        state.isFetchingPrograms = false;
        state.programs = payload.programs;
      })
      .addCase(getAllPrograms.rejected, (state) => {
        state.isFetchingPrograms = false;
      })
      .addCase(getProgram.pending, (state) => {
        state.isFetchingProgram = true;
      })
      .addCase(getProgram.fulfilled, (state, { payload }) => {
        state.isFetchingProgram = false;
        state.program = payload.program;
      })
      .addCase(getProgram.rejected, (state) => {
        state.isFetchingProgram = false;
      })
      .addCase(createProgram.pending, (state) => {
        state.isCreatingProgram = true;
      })
      .addCase(createProgram.fulfilled, (state, { payload }) => {
        state.isCreatingProgram = false;
        toast.success(payload.msg);
      })
      .addCase(createProgram.rejected, (state, { payload }) => {
        state.isCreatingProgram = false;
        toast.error(payload.msg);
      })
      .addCase(updateProgram.pending, (state) => {
        state.isUpdatingProgram = true;
      })
      .addCase(updateProgram.fulfilled, (state) => {
        state.isUpdatingProgram = false;
        state.isEditingProgram = false;
        toast.success('Program has been updated!');
      })
      .addCase(updateProgram.rejected, (state, { payload }) => {
        state.isUpdatingProgram = false;
        toast.error(payload);
      })
      .addCase(deleteProgram.pending, (state) => {
        state.isDeletingProgram = true;
      })
      .addCase(deleteProgram.fulfilled, (state) => {
        state.isDeletingProgram = false;
        toast.success('Program has been deleted!');
      })
      .addCase(deleteProgram.rejected, (state, { payload }) => {
        state.isDeletingProgram = false;
        toast.error(payload);
      })

      /** K12 Subjects **/
      .addCase(getAllK12Subjects.pending, (state) => {
        state.isFetchingK12Subjects = true;
      })
      .addCase(getAllK12Subjects.fulfilled, (state, { payload }) => {
        state.isFetchingK12Subjects = false;
        state.k12Subjects = payload.k12Subjects;
      })
      .addCase(getAllK12Subjects.rejected, (state) => {
        state.isFetchingK12Subjects = false;
      })
      .addCase(getK12SubjectsByProgram.pending, (state) => {
        state.isFetchingK12SubjectsByProgram = true;
      })
      .addCase(getK12SubjectsByProgram.fulfilled, (state, { payload }) => {
        state.isFetchingK12SubjectsByProgram = false;
        state.k12SubjectsByProgram = payload.subjects;
      })
      .addCase(getK12SubjectsByProgram.rejected, (state) => {
        state.isFetchingK12SubjectsByProgram = false;
      })
      .addCase(getK12SubjectsByYearLevel.pending, (state) => {
        state.isFetchingK12SubjectsByYearLevel = true;
      })
      .addCase(getK12SubjectsByYearLevel.fulfilled, (state, { payload }) => {
        state.isFetchingK12SubjectsByYearLevel = false;
        state.k12SubjectsByYearLevel = payload.subjects;
      })
      .addCase(getK12SubjectsByYearLevel.rejected, (state) => {
        state.isFetchingK12SubjectsByYearLevel = false;
      })
      .addCase(getK12Subject.pending, (state) => {
        state.isFetchingK12Subject = true;
      })
      .addCase(getK12Subject.fulfilled, (state, { payload }) => {
        state.isFetchingK12Subject = false;
        state.k12Subject = payload.k12Subject;
      })
      .addCase(getK12Subject.rejected, (state) => {
        state.isFetchingK12Subject = false;
      })
      .addCase(createK12Subject.pending, (state) => {
        state.isAddingK12Subject = true;
      })
      .addCase(createK12Subject.fulfilled, (state, { payload }) => {
        state.isAddingK12Subject = false;
        toast.success(payload.msg);
      })
      .addCase(createK12Subject.rejected, (state, { payload }) => {
        state.isAddingK12Subject = false;
        toast.error(payload.msg);
      })
      .addCase(updateK12Subject.pending, (state) => {
        state.isUpdatingK12Subject = true;
      })
      .addCase(updateK12Subject.fulfilled, (state, { payload }) => {
        state.isUpdatingK12Subject = false;
        toast.success(payload.msg);
      })
      .addCase(updateK12Subject.rejected, (state, { payload }) => {
        state.isUpdatingK12Subject = false;
        toast.error(payload.msg);
      })
      .addCase(deleteK12Subject.pending, (state) => {
        state.isDeletingK12Subject = true;
      })
      .addCase(deleteK12Subject.fulfilled, (state, { payload }) => {
        state.isDeletingK12Subject = false;
        toast.success(payload.msg);
      })
      .addCase(deleteK12Subject.rejected, (state, { payload }) => {
        state.isDeletingK12Subject = false;
        toast.error(payload.msg);
      })

      /** College Subjects **/
      .addCase(getAllCollegeSubjects.pending, (state) => {
        state.isFetchingCollegeSubjects = true;
      })
      .addCase(getAllCollegeSubjects.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeSubjects = false;
        state.collegeSubjects = payload.collegeSubjects;
      })
      .addCase(getAllCollegeSubjects.rejected, (state) => {
        state.isFetchingCollegeSubjects = false;
      })
      .addCase(getCollegeSubject.pending, (state) => {
        state.isFetchingCollegeSubject = true;
      })
      .addCase(getCollegeSubject.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeSubject = false;
        state.collegeSubject = payload.collegeSubject;
      })
      .addCase(getCollegeSubject.rejected, (state) => {
        state.isFetchingCollegeSubject = false;
      })
      .addCase(getCollegeSubjectsByQuery.pending, (state) => {
        state.isFilteringSubjects = true;
      })
      .addCase(getCollegeSubjectsByQuery.fulfilled, (state, { payload }) => {
        state.filteredCollegeSubjects = payload.collegeSubjects;
        state.isFilteringSubjects = false;
        state.totalFilteredCollegeSubjects = payload.totalFilteredCollegeSubjects;
        state.totalFilteredCollegeSubjectsPages = payload.totalFilteredCollegeSubjectsPages;
      })
      .addCase(getCollegeSubjectsByQuery.rejected, (state) => {
        state.isFilteringSubjects = false;
      })
      .addCase(getCollegeSubjectsByProgram.pending, (state) => {
        state.isFetchingCollegeSubjects = true;
      })
      .addCase(getCollegeSubjectsByProgram.fulfilled, (state, { payload }) => {
        state.isFetchingCollegeSubjectsByProgram = false;
        state.collegeSubjectsByProgram = payload.collegeSubjects;
      })
      .addCase(getCollegeSubjectsByProgram.rejected, (state) => {
        state.isFetchingCollegeSubjectsByProgram = false;
      })
      .addCase(addCollegeSubject.pending, (state) => {
        state.isAddingCollegeSubject = true;
      })
      .addCase(addCollegeSubject.fulfilled, (state, { payload }) => {
        state.isAddingCollegeSubject = false;
        toast.success(payload.msg);
      })
      .addCase(addCollegeSubject.rejected, (state, { payload }) => {
        state.isAddingCollegeSubject = false;
        toast.error(payload.msg);
      })
      .addCase(updateCollegeSubject.pending, (state) => {
        state.isUpdatingCollegeSubject = true;
      })
      .addCase(updateCollegeSubject.fulfilled, (state, { payload }) => {
        state.isUpdatingCollegeSubject = false;
        toast.success(payload.msg);
      })
      .addCase(updateCollegeSubject.rejected, (state, { payload }) => {
        state.isUpdatingCollegeSubject = false;
        toast.error(payload.msg);
      })
      .addCase(deleteCollegeSubject.pending, (state) => {
        state.isDeletingCollegeSubject = true;
      })
      .addCase(deleteCollegeSubject.fulfilled, (state, { payload }) => {
        state.isDeletingCollegeSubject = false;
        toast.success(payload.msg);
      })
      .addCase(deleteCollegeSubject.rejected, (state, { payload }) => {
        state.isDeletingCollegeSubject = false;
        toast.error(payload.msg);
      })

      /** TESDA Courses **/
      .addCase(getAllTesdaCourses.pending, (state) => {
        state.isFetchingTesdaCourses = true;
      })
      .addCase(getAllTesdaCourses.fulfilled, (state, { payload }) => {
        state.isFetchingTesdaCourses = false;
        state.tesdaCourses = payload.tesdaCourses;
      })
      .addCase(getAllTesdaCourses.rejected, (state) => {
        state.isFetchingTesdaCourses = false;
      })
      .addCase(getTESDACoursesByProgram.pending, (state) => {
        state.isFetchingTesdaCourse = true;
      })
      .addCase(getTESDACoursesByProgram.fulfilled, (state, { payload }) => {
        state.isFetchingTesdaCourse = false;
        state.tesdaCoursesByProgram = payload.tesdaCourses;
      })
      .addCase(getTESDACoursesByProgram.rejected, (state) => {
        state.isFetchingTesdaCourse = false;
      })
      .addCase(getTesdaCourse.pending, (state) => {
        state.isFetchingTesdaCourse = true;
      })
      .addCase(getTesdaCourse.fulfilled, (state, { payload }) => {
        state.isFetchingTesdaCourse = false;
        state.tesdaCourse = payload.tesdaCourse;
      })
      .addCase(getTesdaCourse.rejected, (state) => {
        state.isFetchingTesdaCourse = false;
      })
      .addCase(getTesdaCoursesByQuery.fulfilled, (state, { payload }) => {
        state.filteredTesdaCourses = payload.tesdaCourses;
        state.isFilteringSubjects = false;
        state.totalFilteredTesdaCourses = payload.totalFilteredTesdaCourses;
        state.totalFilteredTesdaCoursesPages = payload.totalFilteredTesdaCoursesPages;
      })
      .addCase(getTesdaCoursesByQuery.rejected, (state) => {
        state.isFilteringSubjects = false;
      })
      .addCase(createTesdaCourse.pending, (state) => {
        state.isCreatingTesdaCourse = true;
      })
      .addCase(createTesdaCourse.fulfilled, (state, { payload }) => {
        state.isCreatingTesdaCourse = false;
        toast.success(payload.msg);
      })
      .addCase(createTesdaCourse.rejected, (state, { payload }) => {
        state.isCreatingTesdaCourse = false;
        toast.error(payload.msg);
      })
      .addCase(updateTesdaCourse.pending, (state) => {
        state.isUpdatingTesdaCourse = true;
      })
      .addCase(updateTesdaCourse.fulfilled, (state, { payload }) => {
        state.isUpdatingTesdaCourse = false;
        toast.success(payload.msg);
      })
      .addCase(updateTesdaCourse.rejected, (state, { payload }) => {
        state.isUpdatingTesdaCourse = false;
        toast.error(payload.msg);
      })
      .addCase(deleteTesdaCourse.pending, (state) => {
        state.isDeletingTesdaCourse = true;
      })
      .addCase(deleteTesdaCourse.fulfilled, (state, { payload }) => {
        state.isDeletingTesdaCourse = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTesdaCourse.rejected, (state, { payload }) => {
        state.isDeletingTesdaCourse = false;
        toast.error(payload.msg);
      })

      /** Instructors **/
      .addCase(getAllInstructors.pending, (state) => {
        state.isFetchingInstructors = true;
      })
      .addCase(getAllInstructors.fulfilled, (state, { payload }) => {
        state.isFetchingInstructors = false;
        state.instructors = payload.teachers;
      })
      .addCase(getAllInstructors.rejected, (state) => {
        state.isFetchingInstructors = false;
      })
      .addCase(updateInstructor.pending, (state) => {
        state.isUpdatingUser = true;
      })
      .addCase(updateInstructor.fulfilled, (state, { payload }) => {
        state.isUpdatingUser = false;
        toast.success(payload.msg);
      })
      .addCase(updateInstructor.rejected, (state, { payload }) => {
        state.isUpdatingUser = false;
        toast.error(payload.msg);
      })

      /** Sections **/
      .addCase(getAllSections.pending, (state) => {
        state.isFetchingSections = true;
      })
      .addCase(getAllSections.fulfilled, (state, { payload }) => {
        state.isFetchingSections = false;
        state.sections = payload.sections;
      })
      .addCase(getAllSections.rejected, (state) => {
        state.isFetchingSections = false;
      })
      .addCase(getSectionByDepartment.pending, (state) => {
        state.isFetchingSections = true;
      })
      .addCase(getSectionByDepartment.fulfilled, (state, { payload }) => {
        state.isFetchingSections = false;
        state.sections = payload.sections;
      })
      .addCase(getSectionByDepartment.rejected, (state) => {
        state.isFetchingSections = false;
      })
      .addCase(getSection.pending, (state) => {
        state.isFetchingSection = true;
      })
      .addCase(getSection.fulfilled, (state, { payload }) => {
        state.isFetchingSection = false;
        state.section = payload.section;
      })
      .addCase(getSection.rejected, (state) => {
        state.isFetchingSection = false;
      })
      .addCase(createSection.pending, (state) => {
        state.isCreatingSection = true;
      })
      .addCase(createSection.fulfilled, (state, { payload }) => {
        state.isCreatingSection = false;
        toast.success(payload.msg);
      })
      .addCase(createSection.rejected, (state, { payload }) => {
        state.isCreatingSection = false;
        toast.error(payload.msg);
      })
      .addCase(updateSection.pending, (state) => {
        state.isUpdatingSection = true;
      })
      .addCase(updateSection.fulfilled, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.success(payload.msg);
      })
      .addCase(updateSection.rejected, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.error(payload);
      })
      .addCase(deleteSection.pending, (state) => {
        state.isDeletingSection = true;
      })
      .addCase(deleteSection.fulfilled, (state, { payload }) => {
        state.isDeletingSection = false;
        toast.success(payload.msg);
      })
      .addCase(deleteSection.rejected, (state, { payload }) => {
        state.isDeletingSection = false;
        toast.error(payload);
      })
      .addCase(archiveSection.pending, (state) => {
        state.isUpdatingSection = true;
      })
      .addCase(archiveSection.fulfilled, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.success(payload.msg);
      })
      .addCase(archiveSection.rejected, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.error(payload);
      })
      .addCase(unarchiveSection.pending, (state) => {
        state.isUpdatingSection = true;
      })
      .addCase(unarchiveSection.fulfilled, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.success(payload.msg);
      })
      .addCase(unarchiveSection.rejected, (state, { payload }) => {
        state.isUpdatingSection = false;
        toast.error(payload);
      })

      /** Rooms **/
      .addCase(getAllRooms.pending, (state) => {
        state.isFetchingRooms = true;
      })
      .addCase(getAllRooms.fulfilled, (state, { payload }) => {
        state.isFetchingRooms = false;
        state.rooms = payload.rooms;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.isFetchingRooms = false;
      })
      .addCase(getRoom.pending, (state) => {
        state.isFetchingRoom = true;
      })
      .addCase(getRoom.fulfilled, (state, { payload }) => {
        state.isFetchingRoom = false;
        state.room = payload.room;
      })
      .addCase(getRoom.rejected, (state) => {
        state.isFetchingRoom = false;
      })
      .addCase(createRoom.pending, (state) => {
        state.isCreatingRoom = true;
      })
      .addCase(createRoom.fulfilled, (state) => {
        state.isCreatingRoom = false;
        state.room = initialState.room;
        toast.success('Room successfully added!');
      })
      .addCase(createRoom.rejected, (state, { payload }) => {
        state.isCreatingRoom = false;
        toast.error(payload);
      })
      .addCase(updateRoom.pending, (state) => {
        state.isUpdatingRoom = true;
      })
      .addCase(updateRoom.fulfilled, (state) => {
        state.isUpdatingRoom = false;
        state.room = initialState.room;
        toast.success('Room successfully updated!');
      })
      .addCase(updateRoom.rejected, (state, { payload }) => {
        state.isUpdatingRoom = false;
        toast.error(payload);
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isDeletingRoom = true;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.isDeletingRoom = false;
        toast.success('Room successfully deleted!');
      })
      .addCase(deleteRoom.rejected, (state, { payload }) => {
        state.isDeletingRoom = false;
        toast.error(payload);
      })
      .addCase(getAllRoomTypes.pending, (state) => {
        state.isFetchingRoomTypes = true;
      })
      .addCase(getAllRoomTypes.fulfilled, (state, { payload }) => {
        state.isFetchingRoomTypes = false;
        state.roomTypes = payload.roomTypes;
      })
      .addCase(getAllRoomTypes.rejected, (state) => {
        state.isFetchingRoomTypes = false;
      })
      .addCase(getRoomType.pending, (state) => {
        state.isFetchingRoomType = true;
      })
      .addCase(getRoomType.fulfilled, (state, { payload }) => {
        state.isFetchingRoomType = false;
        state.roomType = payload.roomType;
      })
      .addCase(getRoomType.rejected, (state) => {
        state.isFetchingRoomType = false;
      })
      .addCase(createRoomType.pending, (state) => {
        state.isCreatingRoomType = true;
      })
      .addCase(createRoomType.fulfilled, (state) => {
        state.isCreatingRoomType = false;
        state.roomType = initialState.roomType;
        toast.success('Room Type successfully added!');
      })
      .addCase(createRoomType.rejected, (state, { payload }) => {
        state.isCreatingRoomType = false;
        toast.error(payload);
      })
      .addCase(updateRoomType.pending, (state) => {
        state.isUpdatingRoomType = true;
      })
      .addCase(updateRoomType.fulfilled, (state) => {
        state.isUpdatingRoomType = false;
        state.roomType = initialState.roomType;
        toast.success('Room Type successfully updated!');
      })
      .addCase(updateRoomType.rejected, (state, { payload }) => {
        state.isUpdatingRoomType = false;
        toast.error(payload);
      })
      .addCase(deleteRoomType.pending, (state) => {
        state.isDeletingRoomType = true;
      })
      .addCase(deleteRoomType.fulfilled, (state) => {
        state.isDeletingRoomType = false;
        toast.success('Room Type successfully deleted!');
      })
      .addCase(deleteRoomType.rejected, (state, { payload }) => {
        state.isDeletingRoomType = false;
        toast.error(payload);
      })

      /* Subject Types */
      .addCase(getAllSubjectTypes.pending, (state) => {
        state.isFetchingSubjectTypes = true;
      })
      .addCase(getAllSubjectTypes.fulfilled, (state, { payload }) => {
        state.isFetchingSubjectTypes = false;
        state.subjectTypes = payload.subjectTypes;
      })
      .addCase(getAllSubjectTypes.rejected, (state) => {
        state.isFetchingSubjectTypes = false;
      })
      .addCase(getSubjectTypeById.pending, (state) => {
        state.isFetchingSubjectType = true;
      })
      .addCase(getSubjectTypeById.fulfilled, (state, { payload }) => {
        state.isFetchingSubjectType = false;
        state.subjectType = payload.subjectType;
      })
      .addCase(getSubjectTypeById.rejected, (state) => {
        state.isFetchingSubjectType = false;
      })
      .addCase(createSubjectType.pending, (state) => {
        state.isCreatingSubjectType = true;
      })
      .addCase(createSubjectType.fulfilled, (state) => {
        state.isCreatingSubjectType = false;
        state.subjectType = null;
        toast.success('Subject Type successfully added!');
      })
      .addCase(createSubjectType.rejected, (state, { payload }) => {
        state.isCreatingSubjectType = false;
        toast.error(payload);
      })
      .addCase(updateSubjectTypeById.pending, (state) => {
        state.isUpdatingSubjectType = true;
      })
      .addCase(updateSubjectTypeById.fulfilled, (state) => {
        state.isUpdatingSubjectType = false;
        state.subjectType = null;
        toast.success('Subject Type successfully updated!');
      })
      .addCase(updateSubjectTypeById.rejected, (state, { payload }) => {
        state.isUpdatingSubjectType = false;
        toast.error(payload);
      })
      .addCase(deleteSubjectTypeById.pending, (state) => {
        state.isDeletingSubjectType = true;
      })
      .addCase(deleteSubjectTypeById.fulfilled, (state) => {
        state.isDeletingSubjectType = false;
        toast.success('Subject Type successfully deleted!');
      })
      .addCase(deleteSubjectTypeById.rejected, (state, { payload }) => {
        state.isDeletingSubjectType = false;
        toast.error(payload);
      })

      /** Class Schedules **/
      .addCase(getAllSchedules.pending, (state) => {
        state.isFetchingSchedules = true;
      })
      .addCase(getAllSchedules.fulfilled, (state, { payload }) => {
        state.isFetchingSchedules = false;
        state.schedules = payload.schedules;
      })
      .addCase(getAllSchedules.rejected, (state) => {
        state.isFetchingSchedules = false;
      })
      .addCase(getSchedule.pending, (state) => {
        state.isFetchingSchedule = true;
      })
      .addCase(getSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingSchedule = false;
        state.schedule = payload.schedule;
      })
      .addCase(getSchedule.rejected, (state) => {
        state.isFetchingSchedule = false;
      })
      .addCase(createSchedule.pending, (state) => {
        state.isCreatingSchedule = true;
      })
      .addCase(createSchedule.fulfilled, (state) => {
        state.isCreatingSchedule = false;
        state.isAddingSchedule = !state.isAddingSchedule;
        toast.success('Schedule successfully added!');
      })
      .addCase(createSchedule.rejected, (state, { payload }) => {
        state.isCreatingSchedule = false;
        toast.error(payload);
      })
      .addCase(updateSchedule.pending, (state) => {
        state.isUpdatingSchedule = true;
      })
      .addCase(updateSchedule.fulfilled, (state) => {
        state.isUpdatingSchedule = false;
        state.isEditingSchedule = !state.isEditingSchedule;
        state.schedule = initialState.schedule;
        toast.success('Schedule successfully updated!');
      })
      .addCase(updateSchedule.rejected, (state, { payload }) => {
        state.isUpdatingSchedule = false;
        toast.error(payload);
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.isDeletingSchedule = true;
      })
      .addCase(deleteSchedule.fulfilled, (state) => {
        state.isDeletingSchedule = false;
        toast.success('Schedule successfully deleted!');
      })
      .addCase(deleteSchedule.rejected, (state, { payload }) => {
        state.isDeletingSchedule = false;
        toast.error(payload);
      })

      /* Teaching Loads */
      .addCase(getAllTeachingLoadByUserId.pending, (state) => {
        state.isFetchingSubjectAssignments = true;
      })
      .addCase(getAllTeachingLoadByUserId.fulfilled, (state, { payload }) => {
        state.isFetchingSubjectAssignments = false;
        state.subjectAssignments = payload.subjects;
      })
      .addCase(getAllTeachingLoadByUserId.rejected, (state) => {
        state.isFetchingSubjectAssignments = false;
      })
      .addCase(getK12StudentsFromSection.pending, (state) => {
        state.isFetchingStudentsFromEnrollment = true;
      })
      .addCase(getK12StudentsFromSection.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsFromEnrollment = false;
        state.enrolledStudents = payload.students;
      })
      .addCase(getK12StudentsFromSection.rejected, (state) => {
        state.isFetchingStudentsFromEnrollment = false;
      })
      .addCase(getCollegeStudentsFromSection.pending, (state) => {
        state.isFetchingStudentsFromEnrollment = true;
      })
      .addCase(getCollegeStudentsFromSection.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsFromEnrollment = false;
        state.enrolledStudents = payload.students;
      })
      .addCase(getCollegeStudentsFromSection.rejected, (state) => {
        state.isFetchingStudentsFromEnrollment = false;
      })
      .addCase(updateK12BulkGrades.pending, (state) => {
        state.isUpdatingGrade = true;
      })
      .addCase(updateK12BulkGrades.fulfilled, (state) => {
        state.isUpdatingGrade = false;
        toast.success('Draft saved successfully!');
      })
      .addCase(updateK12BulkGrades.rejected, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.error(payload);
      })
      .addCase(updateCollegeBulkGrades.pending, (state) => {
        state.isUpdatingGrade = true;
      })
      .addCase(updateCollegeBulkGrades.fulfilled, (state) => {
        state.isUpdatingGrade = false;
        toast.success('Draft saved successfully!');
      })
      .addCase(updateCollegeBulkGrades.rejected, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.error(payload);
      })
      .addCase(submitK12BulkGrades.pending, (state) => {
        state.isUpdatingGrade = true;
      })
      .addCase(submitK12BulkGrades.fulfilled, (state) => {
        state.isUpdatingGrade = false;
        toast.success('Grades has been submitted');
      })
      .addCase(submitK12BulkGrades.rejected, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.error(payload);
      })
      .addCase(submitCollegeBulkGrades.pending, (state) => {
        state.isUpdatingGrade = true;
      })
      .addCase(submitCollegeBulkGrades.fulfilled, (state) => {
        state.isUpdatingGrade = false;
        toast.success('Grades has been submitted');
      })
      .addCase(submitCollegeBulkGrades.rejected, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.error(payload);
      })
      .addCase(getAllSubjectAssignments.pending, (state) => {
        state.isFetchingSubjectAssignments = true;
      })
      .addCase(getAllSubjectAssignments.fulfilled, (state, { payload }) => {
        state.isFetchingSubjectAssignments = false;
        state.subjectAssignments = payload.subjects;
      })
      .addCase(getAllSubjectAssignments.rejected, (state) => {
        state.isFetchingSubjectAssignments = false;
      })
      .addCase(getSubjectAssignment.pending, (state) => {
        state.isFetchingSubjectAssignment = true;
      })
      .addCase(getSubjectAssignment.fulfilled, (state, { payload }) => {
        state.isFetchingSubjectAssignment = false;
        state.subjectAssignment = payload.subject;
      })
      .addCase(getSubjectAssignment.rejected, (state) => {
        state.isFetchingSubjectAssignment = false;
      })
      .addCase(createSubjectAssignment.pending, (state) => {
        state.isCreatingSubjectAssignment = true;
      })
      .addCase(createSubjectAssignment.fulfilled, (state) => {
        state.isCreatingSubjectAssignment = false;
        state.isAddingSubjectAssignment = !state.isAddingSubjectAssignment;
        state.subjectAssignment = initialState.subjectAssignment;
        toast.success('Subject has been set!');
      })
      .addCase(createSubjectAssignment.rejected, (state, { payload }) => {
        state.isCreatingSubjectAssignment = false;
        toast.error(payload);
      })
      .addCase(updateSubjectAssignment.pending, (state) => {
        state.isUpdatingSubjectAssignment = true;
      })
      .addCase(updateSubjectAssignment.fulfilled, (state) => {
        state.isUpdatingSubjectAssignment = false;
        state.isEditingSubjectAssignment = !state.isEditingSubjectAssignment;
        state.subjectAssignment = initialState.subjectAssignment;
        toast.success('Subject has been updated!');
      })
      .addCase(updateSubjectAssignment.rejected, (state, { payload }) => {
        state.isUpdatingSubjectAssignment = false;
        toast.error(payload);
      })
      .addCase(deleteSubjectAssignment.pending, (state) => {
        state.isDeletingSubjectAssignment = true;
      })
      .addCase(deleteSubjectAssignment.fulfilled, (state) => {
        state.isDeletingSubjectAssignment = false;
        toast.success('Subject has been deleted!');
      })
      .addCase(deleteSubjectAssignment.rejected, (state, { payload }) => {
        state.isDeletingSubjectAssignment = false;
        toast.error(payload);
      })

      /** Students **/
      .addCase(getAllStudentsBySection.pending, (state) => {
        state.isFetchingStudentsBySection = true;
      })
      .addCase(getAllStudentsBySection.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsBySection = false;
        state.studentsBySection = payload.students;
      })
      .addCase(getAllStudentsBySection.rejected, (state) => {
        state.isFetchingStudentsBySection = false;
      })
      .addCase(getAllStudentsByLevel.pending, (state) => {
        state.isFetchingStudentsByLevel = true;
      })
      .addCase(getAllStudentsByLevel.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsByLevel = false;
        state.studentsByLevel = payload.students;
      })
      .addCase(getAllStudentsByLevel.rejected, (state) => {
        state.isFetchingStudentsByLevel = false;
      })
      .addCase(getAvailableStudents.pending, (state) => {
        state.isFetchingStudentsByLevel = true;
      })
      .addCase(getAvailableStudents.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsByLevel = false;
        state.availableStudents = payload.availableStudents;
      })
      .addCase(getAvailableStudents.rejected, (state) => {
        state.isFetchingStudentsByLevel = false;
      })
      .addCase(addStudentsInSection.pending, (state) => {
        state.isUpdatingStudentInSection = true;
      })
      .addCase(addStudentsInSection.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentInSection = false;
        state.selectedStudents = initialState.selectedStudents;
        toast.success(payload.msg);
      })
      .addCase(addStudentsInSection.rejected, (state, { payload }) => {
        state.isUpdatingStudentInSection = false;
        toast.error(payload);
      })
      .addCase(removeStudentFromSection.pending, (state) => {
        state.isDeletingStudentInSection = true;
      })
      .addCase(removeStudentFromSection.fulfilled, (state, { payload }) => {
        state.isDeletingStudentInSection = false;
        state.selectedStudents = initialState.selectedStudents;
        toast.success(payload.msg);
      })
      .addCase(removeStudentFromSection.rejected, (state, { payload }) => {
        state.isDeletingStudentInSection = false;
        toast.error(payload);
      })

      .addCase(addSubjectGrade.pending, (state) => {
        state.isAddingGrade = true;
      })
      .addCase(addSubjectGrade.fulfilled, (state, { payload }) => {
        state.isAddingGrade = false;
        toast.success(payload.msg);
      })
      .addCase(addSubjectGrade.rejected, (state, { payload }) => {
        state.isAddingGrade = false;
        toast.error(payload.msg);
      })
      .addCase(updateSubjectGrade.pending, (state) => {
        state.isUpdatingGrade = true;
      })
      .addCase(updateSubjectGrade.fulfilled, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.success('Draft saved successfully');
      })
      .addCase(updateSubjectGrade.rejected, (state, { payload }) => {
        state.isUpdatingGrade = false;
        toast.error(payload);
      })
      .addCase(getAllStudentRecordsByStudentId.pending, (state) => {
        state.isFetchingStudentRecords = true;
      })
      .addCase(getAllStudentRecordsByStudentId.fulfilled, (state, { payload }) => {
        state.isFetchingStudentRecords = false;
        state.studentRecords = payload.studentRecords;
      })
      .addCase(getAllStudentRecordsByStudentId.rejected, (state) => {
        state.isFetchingStudentRecords = false;
      })
      .addCase(getStudentRecordById.pending, (state) => {
        state.isFetchingStudentRecord = true;
      })
      .addCase(getStudentRecordById.fulfilled, (state, { payload }) => {
        state.isFetchingStudentRecord = false;
        state.studentRecord = payload.studentRecord;
      })
      .addCase(getStudentRecordById.rejected, (state) => {
        state.isFetchingStudentRecord = false;
      })
      .addCase(generateStudentRecord.pending, (state) => {
        state.isCreatingStudentRecord = true;
      })
      .addCase(generateStudentRecord.fulfilled, (state) => {
        state.isCreatingStudentRecord = false;
        state.studentRecord = initialState.studentRecord;
        toast.success('Student Record Generated!');
      })
      .addCase(generateStudentRecord.rejected, (state, { payload }) => {
        state.isCreatingStudentRecord = false;
        toast.error(payload);
      })
      .addCase(deleteStudentRecord.pending, (state) => {
        state.isDeletingStudentRecord = true;
      })
      .addCase(deleteStudentRecord.fulfilled, (state) => {
        state.isDeletingStudentRecord = false;
        toast.success('Student Record Deleted!');
      })
      .addCase(deleteStudentRecord.rejected, (state, { payload }) => {
        state.isDeletingStudentRecord = false;
        toast.error(payload);
      })

      /** Report Card **/
      .addCase(getStudentReportCard.pending, (state) => {
        state.isFetchingStudentReportCard = true;
      })
      .addCase(getStudentReportCard.fulfilled, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        state.student_report = payload.existingStudentLoad;
      })
      .addCase(getStudentReportCard.rejected, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        toast.error(payload);
      })
      .addCase(getCollegeStudentReportCard.pending, (state) => {
        state.isFetchingStudentReportCard = true;
      })
      .addCase(getCollegeStudentReportCard.fulfilled, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        state.student_report = payload.existingStudentLoad;
      })
      .addCase(getCollegeStudentReportCard.rejected, (state, { payload }) => {
        state.isFetchingStudentReportCard = false;
        toast.error(payload);
      })
      .addCase(saveDraftK12Grade.pending, (state) => {
        state.isUpdatingStudentReportCard = true;
      })
      .addCase(saveDraftK12Grade.fulfilled, (state) => {
        state.isUpdatingStudentReportCard = false;
        toast.success('Draft saved successfully!');
      })
      .addCase(saveDraftK12Grade.rejected, (state, { payload }) => {
        state.isUpdatingStudentReportCard = false;
        toast.error(payload);
      })
      .addCase(updateK12Grade.pending, (state) => {
        state.isUpdatingStudentReportCard = true;
      })
      .addCase(updateK12Grade.fulfilled, (state) => {
        state.isUpdatingStudentReportCard = false;
        toast.success('Updated successfully!');
      })
      .addCase(updateK12Grade.rejected, (state, { payload }) => {
        state.isUpdatingStudentReportCard = false;
        toast.error(payload);
      })
      /** Users **/
      .addCase(getAllUsers.pending, (state) => {
        state.isFetchingUsers = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isFetchingUsers = false;
        state.users = payload.users;
        state.supervisors = payload.users.filter((user) => user.supervisor === true);
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isFetchingUsers = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.isFetchingUser = false;
        state.user = payload.user;
      })
      .addCase(getUserById.rejected, (state) => {
        state.isFetchingUser = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isFetchingUser = false;
        state.userProfile = payload.user;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isFetchingUser = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isCreatingUser = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isCreatingUser = false;
        state.user = initialState.user;
        toast.success('User created successfully');
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isCreatingUser = false;
        toast.error(payload.msg);
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdatingUser = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isUpdatingUser = false;
        state.user = initialState.user;
        toast.success(payload.msg);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isUpdatingUser = false;
        toast.error(payload.msg);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isDeletingUser = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isDeletingUser = false;
        state.user = initialState.user;
        toast.success(payload.msg);
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isDeletingUser = false;
        toast.error(payload.msg);
      })

      // ** Grading Schedule **

      .addCase(getAllGradingSchedules.pending, (state) => {
        state.isFetchingGradingSchedules = true;
      })
      .addCase(getAllGradingSchedules.fulfilled, (state, { payload }) => {
        state.isFetchingGradingSchedules = false;
        state.gradingSchedules = payload.schedules;
      })
      .addCase(getAllGradingSchedules.rejected, (state) => {
        state.isFetchingGradingSchedules = false;
      })
      .addCase(getGradingSchedule.pending, (state) => {
        state.isFetchingGradingSchedule = true;
      })
      .addCase(getGradingSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingGradingSchedule = false;
        state.gradingSchedule = payload.schedule;
      })
      .addCase(getGradingSchedule.rejected, (state) => {
        state.isFetchingGradingSchedule = false;
      })
      .addCase(createGradingSchedule.pending, (state) => {
        state.isCreatingGradingSchedule = true;
      })
      .addCase(createGradingSchedule.fulfilled, (state, { payload }) => {
        state.isCreatingGradingSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(createGradingSchedule.rejected, (state) => {
        state.isCreatingGradingSchedule = false;
      })
      .addCase(updateGradingSchedule.pending, (state) => {
        state.isFetchingGradingSchedules = true;
      })
      .addCase(updateGradingSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingGradingSchedules = false;
        toast.success(payload.msg);
      })
      .addCase(updateGradingSchedule.rejected, (state) => {
        state.isFetchingGradingSchedules = false;
      })
      .addCase(deleteGradingSchedule.pending, (state) => {
        state.isDeletingGradingSchedule = true;
      })
      .addCase(deleteGradingSchedule.fulfilled, (state, { payload }) => {
        state.isDeletingGradingSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(deleteGradingSchedule.rejected, (state) => {
        state.isDeletingGradingSchedule = false;
      })

      // Verification Schedule

      .addCase(getAllVerificationSchedules.pending, (state) => {
        state.isFetchingVerificationSchedules = true;
      })
      .addCase(getAllVerificationSchedules.fulfilled, (state, { payload }) => {
        state.isFetchingVerificationSchedules = false;
        state.verificationSchedules = payload.schedules;
      })
      .addCase(getAllVerificationSchedules.rejected, (state) => {
        state.isFetchingVerificationSchedules = false;
      })
      .addCase(getVerificationSchedule.pending, (state) => {
        state.isFetchingVerificationSchedule = true;
      })
      .addCase(getVerificationSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingVerificationSchedule = false;
        state.verificationSchedule = payload.schedule;
      })
      .addCase(getVerificationSchedule.rejected, (state) => {
        state.isFetchingVerificationSchedule = false;
      })
      .addCase(createVerificationSchedule.pending, (state) => {
        state.isCreatingVerificationSchedule = true;
      })
      .addCase(createVerificationSchedule.fulfilled, (state, { payload }) => {
        state.isCreatingVerificationSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(createVerificationSchedule.rejected, (state) => {
        state.isCreatingVerificationSchedule = false;
      })
      .addCase(updateVerificationSchedule.pending, (state) => {
        state.isFetchingVerificationSchedules = true;
      })
      .addCase(updateVerificationSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingVerificationSchedules = false;
        toast.success(payload.msg);
      })
      .addCase(updateVerificationSchedule.rejected, (state) => {
        state.isFetchingVerificationSchedules = false;
      })
      .addCase(deleteVerificationSchedule.pending, (state) => {
        state.isDeletingVerificationSchedule = true;
      })
      .addCase(deleteVerificationSchedule.fulfilled, (state, { payload }) => {
        state.isDeletingVerificationSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(deleteVerificationSchedule.rejected, (state) => {
        state.isDeletingVerificationSchedule = false;
      })

      // Viewing Schedule

      .addCase(getAllViewingSchedules.pending, (state) => {
        state.isFetchingViewingSchedules = true;
      })
      .addCase(getAllViewingSchedules.fulfilled, (state, { payload }) => {
        state.isFetchingViewingSchedules = false;
        state.viewingSchedules = payload.schedules;
      })
      .addCase(getAllViewingSchedules.rejected, (state) => {
        state.isFetchingViewingSchedules = false;
      })
      .addCase(getViewingSchedule.pending, (state) => {
        state.isFetchingViewingSchedule = true;
      })
      .addCase(getViewingSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingViewingSchedule = false;
        state.viewingSchedule = payload.schedule;
      })
      .addCase(getViewingSchedule.rejected, (state) => {
        state.isFetchingViewingSchedule = false;
      })
      .addCase(createViewingSchedule.pending, (state) => {
        state.isCreatingViewingSchedule = true;
      })
      .addCase(createViewingSchedule.fulfilled, (state, { payload }) => {
        state.isCreatingViewingSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(createViewingSchedule.rejected, (state) => {
        state.isCreatingViewingSchedule = false;
      })
      .addCase(updateViewingSchedule.pending, (state) => {
        state.isFetchingViewingSchedules = true;
      })
      .addCase(updateViewingSchedule.fulfilled, (state, { payload }) => {
        state.isFetchingViewingSchedules = false;
        toast.success(payload.msg);
      })
      .addCase(updateViewingSchedule.rejected, (state) => {
        state.isFetchingViewingSchedules = false;
      })
      .addCase(deleteViewingSchedule.pending, (state) => {
        state.isDeletingViewingSchedule = true;
      })
      .addCase(deleteViewingSchedule.fulfilled, (state, { payload }) => {
        state.isDeletingViewingSchedule = false;
        toast.success(payload.msg);
      })
      .addCase(deleteViewingSchedule.rejected, (state) => {
        state.isDeletingViewingSchedule = false;
      });
  }
});

export const {
  handleChange,
  toggleAddCurriculum,
  toggleEditCurriculum,
  clearCurriculum,
  setCurriculum,
  toggleAddProgram,
  toggleEditProgram,
  clearProgram,
  setProgram,
  toggleAddK12Subject,
  toggleEditK12Subject,
  clearK12Subject,
  setK12Subject,
  toggleAddCollegeSubject,
  toggleEditCollegeSubject,
  clearCollegeSubject,
  setCollegeSubject,
  toggleAddTesdaCourse,
  toggleEditTesdaCourse,
  setTesdaCourse,
  clearTesdaCourse,
  toggleViewSubject,
  clearGeneralEducationSubject,
  setGeneralEducationSubject,
  setDynamicData,
  clearDynamicData,
  toggleAddSection,
  toggleEditSection,
  toggleEditReportCard,
  toggleAddRoom,
  toggleEditRoom,
  clearRoom,
  setRoom,
  toggleAddRoomType,
  toggleEditRoomType,
  clearRoomType,
  setRoomType,
  setSection,
  clearSection,
  toggleAddSchedule,
  toggleEditSchedule,
  setSchedule,
  clearSchedule,
  setSubjectAssignment,
  clearSubjectAssignment,
  toggleAddSubjectAssignment,
  toggleEditSubjectAssignment,
  setSelectedStudents,
  toggleAddBulkStudentInSection,
  toggleEditBulkStudentInSection,
  setGrade,
  clearGrade,
  toggleAddGrade,
  toggleEditGrade,
  setFilterAcademicRecord,
  clearFilterAcademicRecord,
  setFilterSectionByAcademicYear,
  clearFilterSectionByAcademicYear,
  setStudentRecord,
  clearStudentRecord,
  toggleAddStudentRecord,
  toggleEditStudentRecord,
  toggleAddUser,
  toggleEditUser,
  setUser,
  clearUser,
  setStudentReport,
  toggleEditK12Grade,
  toggleEditCollegeGrade,
  clearStudentReport,
  toggleAddGradingSchedule,
  toggleEditGradingSchedule,
  toggleAddVerificationSchedule,
  toggleEditVerificationSchedule,
  toggleAddViewingSchedule,
  toggleEditViewingSchedule,
  setSubjectsFromEnrollmentLoad,
  toggleAddSubjectType,
  toggleEditSubjectType,
  clearSubjectType,
  setSubjectType,

  //Student
  toggleAddStudent,
  toggleEditStudent,
  setStudent,
  clearStudent
} = academicSlice.actions;

export default academicSlice.reducer;
