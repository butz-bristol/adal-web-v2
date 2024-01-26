import { getK12StudentEnrollmentLoad } from 'src/features/registrarFeatures/registrarSlice';

import {
  clearCurriculum,
  clearProgram,
  getAllCollegeSubjects,
  getAllCurriculums,
  getAllGradingSchedules,
  getAllInstructors,
  getAllK12Subjects,
  getAllPrograms,
  getAllRoomTypes,
  getAllRooms,
  getAllSchedules,
  getAllSections,
  getAllStudentRecordsByStudentId,
  getAllStudentsBySection,
  getAllSubjectAssignments,
  getAllSubjectTypes,
  getAllTesdaCourses,
  getAllUsers,
  getAllVerificationSchedules,
  getAllViewingSchedules,
  getCollegeStudentsFromSection,
  getK12StudentsFromSection,
  getSection,
  getStudentReportCard,
  getUserProfile,
} from './academicSlice';

import adalFetch from 'src/utils/axios';

// Curriculums

export const getAllCurriculumsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getCurriculumThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createCurriculumThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(clearCurriculum());
    thunkAPI.dispatch(getAllCurriculums());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCurriculumThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(clearCurriculum());
    thunkAPI.dispatch(getAllCurriculums());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteCurriculumThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllCurriculums());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Programs

export const getAllProgramsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getProgramThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createProgramThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(clearProgram());
    thunkAPI.dispatch(getAllPrograms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateProgramThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(clearProgram());
    thunkAPI.dispatch(getAllPrograms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteProgramThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllPrograms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// K12 Subjects

export const getAllK12SubjectsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getK12SubjectThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createK12SubjectThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getAllK12Subjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateK12SubjectThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getAllK12Subjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteK12SubjectThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllK12Subjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// College Subjects

export const getAllCollegeSubjectsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getCollegeSubjectThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addCollegeSubjectThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getAllCollegeSubjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCollegeSubjectThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getAllCollegeSubjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteCollegeSubjectThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllCollegeSubjects());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// TESDA Courses

export const getAllTesdaCoursesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getTesdaCourseThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createTesdaCourseThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getAllTesdaCourses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTesdaCourseThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getAllTesdaCourses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTesdaCourseThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllTesdaCourses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// General Education Subjects

export const getAllGeneralEducationSubjectsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getGeneralEducationSubjectThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Sections

export const getAllSectionsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getSectionByDepartmentThunk = async (
  url,
  departmentIds,
  thunkAPI
) => {
  try {
    const response = await adalFetch.get(url, { params: { departmentIds } });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSectionThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getAllSections());
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSectionThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data) {
      data.sectionId && thunkAPI.dispatch(getSection(data.sectionId));
      thunkAPI.dispatch(getAllSections());
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSectionThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllSections());
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveSectionThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(getAllSections());
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Instructors

export const getInstructorsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Rooms

export const getAllRoomsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getRoomThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createRoomThunk = async (url, room, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, room);
    thunkAPI.dispatch(getAllRooms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateRoomThunk = async (url, room, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, room);
    thunkAPI.dispatch(getAllRooms());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteRoomThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllRooms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createRoomTypeThunk = async (url, room, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, room);
    thunkAPI.dispatch(getAllRoomTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateRoomTypeThunk = async (url, room, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, room);
    thunkAPI.dispatch(getAllRoomTypes());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteRoomTypeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllRoomTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Subject Types
export const createSubjectTypeByIdThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(getAllSubjectTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSubjectTypeByIdThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getAllSubjectTypes());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSubjectTypeByIdThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllSubjectTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Schedules
export const getAllSchedulesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getScheduleThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, schedule);
    thunkAPI.dispatch(getAllSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, schedule);
    thunkAPI.dispatch(getAllSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteScheduleThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllSubjectAssignmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getSubjectAssignmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createSubjectAssignmentThunk = async (
  url,
  subjectAssignment,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, subjectAssignment);
    thunkAPI.dispatch(getAllSubjectAssignments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSubjectAssignmentThunk = async (
  url,
  subjectAssignment,
  thunkAPI
) => {
  try {
    const response = await adalFetch.put(url, subjectAssignment);
    thunkAPI.dispatch(getAllSubjectAssignments());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteSubjectAssignmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllSubjectAssignments());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllStudentsBySectionThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBulkStudentsInSectionThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(getAllStudentsBySection(data.section));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const removeStudentFromSectionThunk = async (url, student, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, student);
    thunkAPI.dispatch(getAllStudentsBySection(student.old_section));
    thunkAPI.dispatch(getAllStudentByLevel(student.level));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const generateStudentRecordThunk = async (url, record, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, record);
    thunkAPI.dispatch(getAllStudentRecordsByStudentId(record.student));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteStudentRecordThunk = async (url, record, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllStudentRecordsByStudentId(record.student._id));
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

export const addSubjectGradeThunk = async (url, grade, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, grade);
    thunkAPI.dispatch(getAllStudentRecordsByStudentId(grade.student));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateSubjectGradeThunk = async (url, grade, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, grade);
    thunkAPI.dispatch(getAllStudentRecordsByStudentId(grade.student));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateK12EnrollmentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(
      getK12StudentEnrollmentLoad({
        student_id: data.student?._id,
        academic_year: data.academic_year,
      })
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateK12EnrollmentReportThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(
      getStudentReportCard({
        student_id: data.student?._id,
        academic_year: data.academic_year,
      })
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createUserThunk = async (url, employee, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, employee);
    thunkAPI.dispatch(getAllUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (url, employee, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, employee);
    thunkAPI.dispatch(getAllUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateInstructorThunk = async (url, employee, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, employee);
    thunkAPI.dispatch(getAllInstructors());
    thunkAPI.dispatch(getUserProfile());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteUserThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllUsers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createGradingScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, schedule);
    thunkAPI.dispatch(getAllGradingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateGradingScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, schedule);
    thunkAPI.dispatch(getAllGradingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteGradingScheduleThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllGradingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createVerificationScheduleThunk = async (
  url,
  schedule,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, schedule);
    thunkAPI.dispatch(getAllVerificationSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateVerificationScheduleThunk = async (
  url,
  schedule,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, schedule);
    thunkAPI.dispatch(getAllVerificationSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteVerificationScheduleThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllVerificationSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createViewingScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, schedule);
    thunkAPI.dispatch(getAllViewingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateViewingScheduleThunk = async (url, schedule, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, schedule);
    thunkAPI.dispatch(getAllViewingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteViewingScheduleThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllViewingSchedules());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateK12BulkGradesThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, {
      students: data.enrolledStudents,
    });
    thunkAPI.dispatch(
      getK12StudentsFromSection({
        section: data.section,
        subject: data.subject,
      })
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateCollegeBulkGradesThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, {
      students: data.enrolledStudents,
    });
    thunkAPI.dispatch(
      getCollegeStudentsFromSection({
        section: data.section,
        subject: data.subject,
      })
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
