import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addTuitionAndFeeIdToLocalStorage,
  getTuitionAndFeeIdFromLocalStorage,
  removeTuitionAndFeeIdFromLocalStorage,
} from 'src/utils/localStorage';
import {
  addPromissoryNoteThunk,
  addVoidORNoThunk,
  approveFeeThunk,
  bulkCreateStudentInvoiceThunk,
  cancelStudentInvoiceThunk,
  createBankAccountNumberThunk,
  createFeeThunk,
  createFeeTypeThunk,
  createInvoiceNumberFormatThunk,
  createOtherFeeThunk,
  createPaymentSchemeThunk,
  createStudentInvoiceThunk,
  createTuitionAndFeeThunk,
  deleteBankAccountNumberThunk,
  deleteFeeThunk,
  deleteFeeTypeThunk,
  deleteInvoiceNumberFormatThunk,
  deleteOtherFeeThunk,
  deletePaymentSchemeThunk,
  deletePromissoryNoteThunk,
  deleteStudentInvoiceThunk,
  deleteTuitionAndFeeThunk,
  deleteVoidORNoThunk,
  disapproveFeeThunk,
  fetchAllAcademicDepartmentsThunk,
  fetchAllAcademicLevelsThunk,
  fetchAllAcademicYearsThunk,
  fetchAllCollegeProgramsThunk,
  fetchAllCollegeTracksThunk,
  fetchAllFeeTypesThunk,
  fetchAllFeesThunk,
  fetchAllLevelFeesThunk,
  fetchAllOtherFeesThunk,
  fetchAllPromissoryNotesThunk,
  fetchAllSemestersThunk,
  fetchAllStudentInvoicesThunk,
  fetchAllTuitionAndFeesThunk,
  fetchAllVoidORNosThunk,
  fetchBankAccountNumbersThunk,
  fetchFeeByIdThunk,
  fetchFeesForEnrollmentThunk,
  fetchFeesThunk,
  fetchInvoiceNumberFormatsThunk,
  fetchOtherFeeByIdThunk,
  fetchPaymentSchemeThunk,
  fetchStudentInvoiceByStudentThunk,
  fetchStudentInvoiceThunk,
  fetchStudentLedgerThunk,
  rejectFeeThunk,
  updateBankAccountNumberThunk,
  updateFeeThunk,
  updateFeeTypeThunk,
  updateInvoiceNumberFormatThunk,
  updateOtherFeeThunk,
  updatePaymentSchemeThunk,
  updatePromissoryNoteStatusThunk,
  updatePromissoryNoteThunk,
  updateStudentInvoiceThunk,
  updateTuitionAndFeeThunk,
  updateVoidORNoThunk,
} from './financeThunk';

const initialState = {
  feeTypes: [],
  isFetchingFeeTypes: false,
  otherFees: [],
  isFetchingOtherFee: false,
  otherFee: {},
  isFetchingOtherFees: false,
  fee_type: '',
  isCreatingFeeType: false,
  isUpdatingFeeType: false,
  isDeletingFeeType: false,
  editFeeType: false,
  editFeeTypeId: '',
  other_fee: '',
  other_fee_name: '',
  other_fee_due_date: '',
  fee_amount: '',
  isCreatingOtherFee: false,
  isUpdatingOtherFee: false,
  isDeletingOtherFee: false,
  editOtherFee: false,
  editOtherFeeId: '',
  isFetchingFees: false,
  tuitionAndFees: [],
  gridView: true,
  listView: false,
  createTuitionAndFeeStatus: false,
  isFetchingTuitionAndFees: false,
  isCreatingTuitionAndFee: false,
  isUpdatingTuitionAndFee: false,
  isDeletingTuitionAndFee: false,
  editTuitionAndFee: false,
  editTuitionAndFeeId: '',
  tuition_and_fee: '',
  tuition_and_fee_id: getTuitionAndFeeIdFromLocalStorage(),
  fees: [],
  feesPage: 1,
  totalFees: 0,
  totalFeesPages: 0,
  createFeeStatus: false,
  isFetchingFees: false,
  isCreatingFee: false,
  isUpdatingFee: false,
  isDeletingFee: false,
  editFee: false,
  editFeeId: '',
  fee: 0,
  fee_label: '',
  fee_type: '',
  applies_to: '',
  sections: [],
  allFees: [],
  isFetchingAllFees: false,
  previewFee: false,
  previewFeeId: '',
  previewedFee: [],
  section: '',
  isFetchingStudentInvoices: false,
  studentInvoices: [],
  isCreatingStudentInvoice: false,
  isCancellingStudentInvoice: false,
  isFetchingStudentInvoice: false,
  isDeletingStudentInvoice: false,
  isUpdatingStudentInvoice: false,
  studentInvoice: {},
  student: '',
  invoice_date: '',
  academicDepartment: '',
  academicLevel: '',
  academic_year: '',
  semester: '',
  academicYears: [],
  isFetchingAcademicYears: false,
  semesters: [],
  isFetchingSemesters: false,
  isApprovingFee: false,
  isDisapprovingFee: false,
  isRejectingFees: false,
  approveFeeModal: false,
  academicDepartments: [],
  isFetchingAcademicDepartments: false,
  academicLevels: [],
  isFetchingAcademicLevels: false,
  other_fee_id: '',
  invoice_number_format: '',
  invoiceNumberFormats: [],
  invoiceNumberFormat: {},
  isFetchingInvoiceNumberFormats: false,
  isCreatingInvoiceNumberFormat: false,
  isUpdatingInvoiceNumberFormat: false,
  isDeletingInvoiceNumberFormat: false,
  editInvoiceNumberFormat: false,
  editInvoiceNumberFormatId: '',
  singleStudentInvoices: [],
  isFetchingStudentInvoiceByStudent: false,
  collegeTracks: [],
  collegeTrack: '',
  collegePrograms: [],
  collegeProgram: '',
  tesdaPrograms: [],
  tesdaProgram: '',
  year_grade_levels: [],
  selectedPrograms: [],
  studentFees: [],
  isFetchingStudentFees: false,
  collegeFees: [],
  isFetchingCollegeFees: false,
  isFetchingFee: false,
  collegeFee: {},
  collegeFeeId: '',
  collegeFeeMode: '',
  program_id: '',
  subject_id: '',

  // Payment Schemes

  k12PaymentSchemes: [],
  k12PaymentScheme: {},
  isFetchingK12PaymentSchemes: false,
  isFetchingK12PaymentScheme: false,
  isCreatingK12PaymentScheme: false,
  createK12PaymentScheme: false,
  isUpdatingK12PaymentScheme: false,
  editK12PaymentScheme: false,
  isDeletingK12PaymentScheme: false,
  collegePaymentSchemes: [],
  collegePaymentScheme: {},
  isFetchingCollegePaymentSchemes: false,
  isFetchingCollegePaymentScheme: false,
  isCreatingCollegePaymentScheme: false,
  createCollegePaymentScheme: false,
  isUpdatingCollegePaymentScheme: false,
  editCollegePaymentScheme: false,
  isFetchingCollegePaymentSchemes: false,
  payment_scheme_id: '',
  miscellaneous_1: 0,
  miscellaneous_2: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  first_term: 0,
  second_term: 0,
  third_term: 0,
  fourth_term: 0,

  studentsLedgers: [],
  isFetchingStudentsLedgers: false,

  // bank account numbers
  bankAccountNumbers: [],
  isFetchingBankAccountNumbers: false,
  bankAccountNumber: {},
  isFetchingBankAccountNumber: false,
  isCreatingBankAccountNumber: false,
  createBankAccountNo: false,
  isUpdatingBankAccountNumber: false,
  editBankAccountNo: false,
  isDeletingBankAccountNumber: false,
  bank_account_no: '',
  bank_account_name: '',
  bank_account_type: '',
  bank_account_id: '',

  fees: [],
  isFetchingFees: false,
  fee_id: '',
  year_level_name: '',
  program_name: '',
  isTESDA: false,

  voidORNoList: [],
  isFetchingVoidORNos: false,
  or_no: 0,
  void_reason: '',
  createVoidORNo: false,
  isAddingVoidORNo: false,
  editVoidORNo: false,
  isEditingVoidORNo: false,
  isDeletingVoidORNo: false,
  voidORNo: {},
  voidORNoId: '',

  promissory_note_reason: '',
  promissory_note_payment_date: '',
  promissory_note_request_date: '',
  promissory_note_status: '',
  promissory_note_other_reason: '',
  promissoryNotes: [],
  isFetchingPromissoryNotes: false,
  createPromissoryNote: false,
  isCreatingPromissoryNote: false,
  editPromissoryNote: false,
  isEditingPromissoryNote: false,
  isDeletingPromissoryNote: false,
  promissoryNote: {},
  isFetchingPromissoryNote: false,
  promissory_note_id: '',
  isApprovingPromissoryNote: false,
  isRejectingPromissoryNote: false,
  student_id: '',
};

// Fee Types

export const fetchAllFeeTypes = createAsyncThunk(
  'finance/fetchAllFeeTypes',
  async (_, thunkAPI) => {
    return fetchAllFeeTypesThunk('/setup/fee-type', thunkAPI);
  }
);

export const createFeeType = createAsyncThunk(
  'finance/createFeeType',
  async (feeType, thunkAPI) => {
    return createFeeTypeThunk('/setup/fee-type', feeType, thunkAPI);
  }
);

export const updateFeeType = createAsyncThunk(
  'finance/updateFeeType',
  async (feeType, thunkAPI) => {
    return updateFeeTypeThunk(
      `/setup/fee-type/${feeType.id}`,
      feeType,
      thunkAPI
    );
  }
);

export const deleteFeeType = createAsyncThunk(
  'finance/deleteFeeType',
  async (id, thunkAPI) => {
    return deleteFeeTypeThunk(`/setup/fee-type/${id}`, thunkAPI);
  }
);

// Other Fees

export const fetchAllOtherFees = createAsyncThunk(
  'finance/fetchAllOtherFees',
  async (_, thunkAPI) => {
    return fetchAllOtherFeesThunk('/setup/other-fee', thunkAPI);
  }
);

export const fetchOtherFee = createAsyncThunk(
  'finance/fetchOtherFee',
  async (id, thunkAPI) => {
    return fetchOtherFeeByIdThunk(`/setup/other-fee/${id}`, thunkAPI);
  }
);

export const createOtherFee = createAsyncThunk(
  'finance/createOtherFee',
  async (otherFee, thunkAPI) => {
    return createOtherFeeThunk('/setup/other-fee', otherFee, thunkAPI);
  }
);

export const updateOtherFee = createAsyncThunk(
  'finance/updateOtherFee',
  async (otherFee, thunkAPI) => {
    return updateOtherFeeThunk(
      `/setup/other-fee/${otherFee.id}`,
      otherFee,
      thunkAPI
    );
  }
);

export const deleteOtherFee = createAsyncThunk(
  'finance/deleteOtherFee',
  async (id, thunkAPI) => {
    return deleteOtherFeeThunk(`/setup/other-fee/${id}`, thunkAPI);
  }
);

// Tuition and Fees

export const fetchAllTuitionAndFees = createAsyncThunk(
  'finance/fetchAllTuitionAndFees',
  async (_, thunkAPI) => {
    return fetchAllTuitionAndFeesThunk('/setup/tuition-and-fee', thunkAPI);
  }
);

export const createTuitionAndFee = createAsyncThunk(
  'finance/createTuitionAndFee',
  async (tuitionAndFee, thunkAPI) => {
    return createTuitionAndFeeThunk(
      '/setup/tuition-and-fee',
      tuitionAndFee,
      thunkAPI
    );
  }
);

export const updateTuitionAndFee = createAsyncThunk(
  'finance/updateTuitionAndFee',
  async (tuitionAndFee, thunkAPI) => {
    return updateTuitionAndFeeThunk(
      `/setup/tuition-and-fee/${tuitionAndFee.id}`,
      tuitionAndFee,
      thunkAPI
    );
  }
);

export const deleteTuitionAndFee = createAsyncThunk(
  'finance/deleteTuitionAndFee',
  async (id, thunkAPI) => {
    return deleteTuitionAndFeeThunk(`/setup/tuition-and-fee/${id}`, thunkAPI);
  }
);

// Fees

export const fetchAllFees = createAsyncThunk(
  'finance/fetchAllFees',
  async (id, thunkAPI) => {
    return fetchAllFeesThunk(`/setup/fee/show-all/${id}`, thunkAPI);
  }
);

export const fetchFees = createAsyncThunk(
  'finance/fetchFees',
  async (_, thunkAPI) => {
    return fetchFeesThunk('/setup/fee', thunkAPI);
  }
);

export const fetchFee = createAsyncThunk(
  'finance/fetchFee',
  async (id, thunkAPI) => {
    return fetchFeeByIdThunk(`/setup/fee/${id}`, thunkAPI);
  }
);

export const createFee = createAsyncThunk(
  'finance/createFee',
  async (fee, thunkAPI) => {
    return createFeeThunk('/setup/fee', fee, thunkAPI);
  }
);

export const updateFee = createAsyncThunk(
  'finance/updateFee',
  async (fee, thunkAPI) => {
    return updateFeeThunk(`/setup/fee/${fee.id}`, fee, thunkAPI);
  }
);

export const approveFees = createAsyncThunk(
  'finance/approveFee',
  async (fees, thunkAPI) => {
    return approveFeeThunk('/setup/fee/approve', fees, thunkAPI);
  }
);

export const disapproveFees = createAsyncThunk(
  'finance/disapproveFee',
  async (fees, thunkAPI) => {
    return disapproveFeeThunk('/setup/fee/disapprove', fees, thunkAPI);
  }
);

export const rejectFees = createAsyncThunk(
  'finance/rejectFee',
  async (fees, thunkAPI) => {
    return rejectFeeThunk('/setup/fee/reject', fees, thunkAPI);
  }
);

export const deleteFee = createAsyncThunk(
  'finance/deleteFee',
  async (id, thunkAPI) => {
    return deleteFeeThunk(`/setup/fee/${id}`, thunkAPI);
  }
);

// Level Fees

export const fetchAllLevelFees = createAsyncThunk(
  'finance/fetchAllLevelFees',
  async (_, thunkAPI) => {
    return fetchAllLevelFeesThunk('/setup/all-fees', thunkAPI);
  }
);

export const fetchFeesForEnrollment = createAsyncThunk(
  'registrar/fetchFeesForEnrollment',
  async ({ academic_year, level }, thunkAPI) => {
    return fetchFeesForEnrollmentThunk(
      `/setup/fee/enrollment/k-12/${academic_year}/${level}`,
      thunkAPI
    );
  }
);

export const fetchFeesForEnrollmentByProgram = createAsyncThunk(
  'registrar/fetchFeesForEnrollmentByProgram',
  async ({ academic_year, program }, thunkAPI) => {
    return fetchFeesForEnrollmentThunk(
      `/setup/fee/enrollment/college/${academic_year}/${program}`,
      thunkAPI
    );
  }
);

// Assign Student Invoice

export const fetchAllStudentInvoices = createAsyncThunk(
  'finance/fetchAllStudentInvoices',
  async (_, thunkAPI) => {
    return fetchAllStudentInvoicesThunk('/student-invoice', thunkAPI);
  }
);

export const fetchAllStudentLedgers = createAsyncThunk(
  'finance/fetchAllStudentLedgers',
  async (student_ids, thunkAPI) => {
    return fetchStudentLedgerThunk(
      '/student-ledger/students',
      student_ids,
      thunkAPI
    );
  }
);

export const fetchStudentInvoice = createAsyncThunk(
  'finance/fetchStudentInvoice',
  async (id, thunkAPI) => {
    return fetchStudentInvoiceThunk(`/student-invoice/${id}`, thunkAPI);
  }
);

export const createStudentInvoice = createAsyncThunk(
  'finance/createStudentInvoice',
  async (invoice, thunkAPI) => {
    return createStudentInvoiceThunk('/student-invoice', invoice, thunkAPI);
  }
);

export const bulkCreateStudentInvoice = createAsyncThunk(
  'finance/bulkCreateStudentInvoice',
  async (invoice, thunkAPI) => {
    return bulkCreateStudentInvoiceThunk(
      '/student-invoice/bulk',
      invoice,
      thunkAPI
    );
  }
);

export const updateStudentInvoice = createAsyncThunk(
  'finance/updateStudentInvoice',
  async (invoice, thunkAPI) => {
    return updateStudentInvoiceThunk(
      `/student-invoice/${invoice.id}`,
      invoice,
      thunkAPI
    );
  }
);

export const cancelStudentInvoice = createAsyncThunk(
  'finance/cancelStudentInvoice',
  async (id, thunkAPI) => {
    return cancelStudentInvoiceThunk(`/student-invoice/cancel/${id}`, thunkAPI);
  }
);

export const deleteStudentInvoice = createAsyncThunk(
  'finance/deleteStudentInvoice',
  async (id, thunkAPI) => {
    return deleteStudentInvoiceThunk(`/student-invoice/${id}`, thunkAPI);
  }
);

export const fetchInvoiceNumberFormats = createAsyncThunk(
  'finance/fetchAllInvoiceFormats',
  async (_, thunkAPI) => {
    return fetchInvoiceNumberFormatsThunk('/invoice-format', thunkAPI);
  }
);

export const createInvoiceNumberFormat = createAsyncThunk(
  'finance/createInvoiceFormat',
  async (format, thunkAPI) => {
    return createInvoiceNumberFormatThunk('/invoice-format', format, thunkAPI);
  }
);

export const updateInvoiceNumberFormat = createAsyncThunk(
  'finance/updateInvoiceFormat',
  async (format, thunkAPI) => {
    return updateInvoiceNumberFormatThunk(
      `/invoice-format/${format.id}`,
      format,
      thunkAPI
    );
  }
);

export const deleteInvoiceNumberFormat = createAsyncThunk(
  'finance/deleteInvoiceFormat',
  async (id, thunkAPI) => {
    return deleteInvoiceNumberFormatThunk(`/invoice-format/${id}`, thunkAPI);
  }
);

export const fetchStudentInvoiceByStudent = createAsyncThunk(
  'finance/fetchStudentInvoiceByStudent',
  async (id, thunkAPI) => {
    return fetchStudentInvoiceByStudentThunk(
      `/student-invoice/student/${id}`,
      thunkAPI
    );
  }
);

// ** Academic Year & Semester **
export const fetchAllAcademicYears = createAsyncThunk(
  'finance/fetchAllAcademicYears',
  async (_, thunkAPI) => {
    return fetchAllAcademicYearsThunk('/academic/year', thunkAPI);
  }
);

export const fetchAllSemesters = createAsyncThunk(
  'finance/fetchAllSemesters',
  async (_, thunkAPI) => {
    return fetchAllSemestersThunk('/semesters', thunkAPI);
  }
);

// ** Academic Departments and Levels **

export const fetchAllAcademicDepartments = createAsyncThunk(
  'finance/fetchAllAcademicDepartments',
  async (_, thunkAPI) => {
    return fetchAllAcademicDepartmentsThunk('/level/department', thunkAPI);
  }
);

export const fetchAllAcademicLevels = createAsyncThunk(
  'finance/fetchAllAcademicLevels',
  async (_, thunkAPI) => {
    return fetchAllAcademicLevelsThunk('/levels', thunkAPI);
  }
);

// ** College Tracks **

export const fetchAllCollegeTracks = createAsyncThunk(
  'finance/fetchAllCollegeTracks',
  async (_, thunkAPI) => {
    return fetchAllCollegeTracksThunk('/college/track', thunkAPI);
  }
);

// ** College Courses/Programs **

export const fetchAllCollegePrograms = createAsyncThunk(
  'finance/fetchAllCollegePrograms',
  async (_, thunkAPI) => {
    return fetchAllCollegeProgramsThunk('/programs', thunkAPI);
  }
);

// ** Payment Schemes **

export const createPaymentScheme = createAsyncThunk(
  'finance/createPaymentScheme',
  async (data, thunkAPI) => {
    return createPaymentSchemeThunk('/payment', data, thunkAPI);
  }
);

export const fetchPaymentSchemes = createAsyncThunk(
  'finance/fetchPaymentSchemes',
  async (_, thunkAPI) => {
    return fetchPaymentSchemeThunk('/payment', thunkAPI);
  }
);

export const updateK12PaymentScheme = createAsyncThunk(
  'finance/updateK12PaymentScheme',
  async (data, thunkAPI) => {
    return updatePaymentSchemeThunk(`/payment/${data.id}`, data, thunkAPI);
  }
);

export const deleteK12PaymentScheme = createAsyncThunk(
  'finance/deleteK12PaymentScheme',
  async (id, thunkAPI) => {
    return deletePaymentSchemeThunk(`/payment/${id}`, thunkAPI);
  }
);

export const fetchPaymentSchemeByYearLevel = createAsyncThunk(
  'finance/fetchPaymentSchemeByYearLevel',
  async ({ academic_year, year_level }, thunkAPI) => {
    return fetchPaymentSchemeThunk(
      `/payment/year-level/${year_level}/${academic_year}`,
      thunkAPI
    );
  }
);

// Bank Account Numbers

export const fetchBankAccountNumbers = createAsyncThunk(
  'finance/fetchBankAccountNumbers',
  async (_, thunkAPI) => {
    return fetchBankAccountNumbersThunk('/ban', thunkAPI);
  }
);

export const createBankAccountNumber = createAsyncThunk(
  'finance/createBankAccountNumber',
  async (data, thunkAPI) => {
    return createBankAccountNumberThunk('/ban', data, thunkAPI);
  }
);

export const updateBankAccountNumber = createAsyncThunk(
  'finance/updateBankAccountNumber',
  async (data, thunkAPI) => {
    return updateBankAccountNumberThunk(`/ban/${data.id}`, data, thunkAPI);
  }
);

export const deleteBankAccountNumber = createAsyncThunk(
  'finance/deleteBankAccountNumber',
  async (id, thunkAPI) => {
    return deleteBankAccountNumberThunk(`/ban/${id}`, thunkAPI);
  }
);

// Void OR Nos

export const fetchAllVoidORNos = createAsyncThunk(
  'finance/fetchAllVoidORNos',
  async (_, thunkAPI) => {
    return fetchAllVoidORNosThunk('/void-or-no', thunkAPI);
  }
);

export const addVoidORNo = createAsyncThunk(
  'finance/addVoidORNo',
  async (data, thunkAPI) => {
    return addVoidORNoThunk('/void-or-no', data, thunkAPI);
  }
);

export const updateVoidORNo = createAsyncThunk(
  'finance/updateVoidORNo',
  async (data, thunkAPI) => {
    return updateVoidORNoThunk(`/void-or-no/${data.id}`, data, thunkAPI);
  }
);

export const deleteVoidORNo = createAsyncThunk(
  'finance/deleteVoidORNo',
  async (id, thunkAPI) => {
    return deleteVoidORNoThunk(`/void-or-no/${id}`, thunkAPI);
  }
);

export const fetchAllPromissoryNotes = createAsyncThunk(
  'finance/fetchAllPromissoryNotes',
  async (_, thunkAPI) => {
    return fetchAllPromissoryNotesThunk('/promissory-note', thunkAPI);
  }
);

export const fetchPromissoryNote = createAsyncThunk(
  'finance/fetchPromissoryNote',
  async (id, thunkAPI) => {
    return fetchAllPromissoryNotesThunk(`/promissory-note/${id}`, thunkAPI);
  }
);

export const updatePromissoryNote = createAsyncThunk(
  'finance/updatePromissoryNote',
  async (data, thunkAPI) => {
    return updatePromissoryNoteThunk(
      `/promissory-note/${data.id}`,
      data,
      thunkAPI
    );
  }
);

export const addPromissoryNote = createAsyncThunk(
  'finance/addPromissoryNote',
  async (data, thunkAPI) => {
    return addPromissoryNoteThunk('/promissory-note', data, thunkAPI);
  }
);

export const approvePromissoryNote = createAsyncThunk(
  'finance/approvePromissoryNote',
  async (id, thunkAPI) => {
    return updatePromissoryNoteStatusThunk(
      `/promissory-note/approve/${id}`,
      thunkAPI
    );
  }
);

export const approveWithPendingRequirementsPromissoryNote = createAsyncThunk(
  'finance/approveWithPendingRequirements',
  async (id, thunkAPI) => {
    return updatePromissoryNoteStatusThunk(
      `/promissory-note/approve-with-pending-requirements/${id}`,
      thunkAPI
    );
  }
);

export const rejectPromissoryNote = createAsyncThunk(
  'finance/rejectPromissoryNote',
  async (id, thunkAPI) => {
    return updatePromissoryNoteStatusThunk(
      `/promissory-note/reject/${id}`,
      thunkAPI
    );
  }
);

export const deletePromissoryNote = createAsyncThunk(
  'finance/deletePromissoryNote',
  async (id, thunkAPI) => {
    return deletePromissoryNoteThunk(`/promissory-note/${id}`, thunkAPI);
  }
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    changeFeesPage: (state, { payload }) => {
      state.feesPage = payload;
    },
    setEditFeeType: (state, { payload }) => {
      state.editFeeType = true;
      state.editFeeTypeId = payload._id;
      state.fee_type = payload.fee_type;
    },
    resetEditFeeType: (state) => {
      state.editFeeType = false;
      state.editFeeTypeId = '';
      state.fee_type = '';
    },
    setEditOtherFee: (state, { payload }) => {
      state.editOtherFee = true;
      state.editOtherFeeId = payload._id;
      state.other_fee_name = payload.other_fee;
      state.fee_amount = payload.fee_amount;
      state.other_fee_due_date = payload?.other_fee_due_date;
    },
    resetEditOtherFee: (state) => {
      state.editOtherFee = false;
      state.editOtherFeeId = '';
      state.other_fee_name = '';
      state.other_fee_due_date = '';
      state.fee_amount = '';
    },
    setOtherFee: (state, { payload }) => {
      state.other_fee_name = payload.other_fee;
      state.fee_amount = payload.fee_amount;
      state.other_fee_due_date = payload.due_date;
    },
    resetOtherFee: (state) => {
      state.other_fee = {};
    },
    toggleCreateTuitionAndFee: (state) => {
      state.createTuitionAndFeeStatus = !state.createTuitionAndFeeStatus;
    },
    toggleEditTuitionAndFee: (state) => {
      state.editTuitionAndFee = !state.editTuitionAndFee;
    },
    setTuitionAndFeeId: (state, { payload }) => {
      state.tuition_and_fee_id = payload;
      addTuitionAndFeeIdToLocalStorage(payload);
    },
    setAcademicYear: (state, { payload }) => {
      state.academic_year = payload;
    },
    resetTuitionAndFeeId: (state) => {
      state.tuition_and_fee_id = '';
      state.academic_year = '';
      removeTuitionAndFeeIdFromLocalStorage();
    },
    setTuitionAndFee: (state, { payload }) => {
      state.editTuitionAndFee = true;
      state.academic_year = payload.academic_year;
      state.editTuitionAndFeeId = payload._id;
    },
    toggleListView: (state) => {
      state.gridView = false;
      state.listView = true;
    },
    toggleGridView: (state) => {
      state.gridView = true;
      state.listView = false;
    },
    resetTuitionAndFee: (state) => {
      state.editTuitionAndFee = false;
      state.academic_year = '';
      state.editFeeId = '';
      state.createFeeStatus = false;
      state.createTuitionAndFeeStatus = false;
    },
    toggleCreateFee: (state) => {
      state.createFeeStatus = !state.createFeeStatus;
    },
    toggleApproveFeeModal: (state) => {
      state.approveFeeModal = !state.approveFeeModal;
    },
    toggleEditFee: (state) => {
      state.editFee = !state.editFee;
    },
    setFee: (state, { payload }) => {
      state.editFee = true;
      state.editFeeId = payload._id;
      state.tuition_and_fee_id = payload.tuition_and_fee_id;
      state.applies_to = payload.applies_to;
      state.fee = payload.fee;
      state.fee_type = payload.fee_type;
      state.fee_label = payload.fee_label;
      state.academic_year = payload?.academic_year;
      state.year_grade_levels = payload.year_grade_levels;
      state.collegeTrack = payload.collegeTrack;
      state.selectedPrograms = payload.selectedPrograms;
    },
    resetTuitionAndFeeId: (state) => {
      state.tuition_and_fee_id = '';
    },
    resetFee: (state) => {
      state.editFee = false;
      state.isUpdatingFee = false;
      state.editFeeId = '';
      state.fee = '';
      state.fee_type = '';
      state.fee_label = '';
      state.createFeeStatus = false;
      state.year_grade_levels = [];
      state.applies_to = '';
      state.academic_year = '';
      state.collegeTrack = '';
      state.programs = [];
      state.selectedPrograms = [];
    },
    togglePreviewFee: (state) => {
      state.previewFee = !state.previewFee;
    },
    setPreviewFee: (state, { payload }) => {
      state.previewFee = true;
      state.previewedFee = payload.fees;
      state.section = payload.section;
    },
    setInvoiceNumberFormat: (state, { payload }) => {
      state.invoice_number_format = payload.format;
      state.editInvoiceNumberFormatId = payload._id;
      state.editInvoiceNumberFormat = true;
    },
    resetInvoiceNumberFormat: (state) => {
      state.editInvoiceNumberFormat = false;
      state.editInvoiceNumberFormatId = '';
      state.invoice_number_format = '';
    },
    resetBulkAssignOtherFee: (state) => {
      state.academicDepartment = '';
      state.academicLevel = '';
      state.collegeTrack = '';
      state.collegeProgram = '';
      state.invoice_date = '';
      state.invoice_number_format = '';
    },
    clearStudentFees: (state) => {
      state.studentFees = [];
    },
    toggleCollegeFeeMode: (state, { payload }) => {
      state.collegeFeeMode = payload;
    },
    clearDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
    setDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    toggleAddK12PaymentScheme: (state) => {
      state.createK12PaymentScheme = !state.createK12PaymentScheme;
    },
    toggleAddCollegePaymentScheme: (state) => {
      state.createCollegePaymentScheme = !state.createCollegePaymentScheme;
    },
    toggleEditK12PaymentScheme: (state) => {
      state.editK12PaymentScheme = !state.editK12PaymentScheme;
    },
    toggleEditCollegePaymentScheme: (state) => {
      state.editCollegePaymentScheme = !state.editCollegePaymentScheme;
    },
    toggleAddBankNo: (state) => {
      state.createBankAccountNo = !state.createBankAccountNo;
    },
    toggleEditBankNo: (state) => {
      state.editBankAccountNo = !state.editBankAccountNo;
    },
    toggleAddVoidORNo: (state) => {
      state.createVoidORNo = !state.createVoidORNo;
    },
    toggleEditVoidORNo: (state) => {
      state.editVoidORNo = !state.editVoidORNo;
    },
    toggleCreatePromissoryNote: (state) => {
      state.createPromissoryNote = !state.createPromissoryNote;
    },
    toggleEditPromissoryNote: (state) => {
      state.editPromissoryNote = !state.editPromissoryNote;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeeTypes.pending, (state) => {
        state.isFetchingFeeTypes = true;
      })
      .addCase(fetchAllFeeTypes.fulfilled, (state, { payload }) => {
        state.isFetchingFeeTypes = false;
        state.feeTypes = payload.feeTypes;
      })
      .addCase(fetchAllFeeTypes.rejected, (state) => {
        state.isFetchingFeeTypes = false;
      })
      .addCase(createFeeType.pending, (state) => {
        state.isCreatingFeeType = true;
      })
      .addCase(createFeeType.fulfilled, (state, { payload }) => {
        state.isCreatingFeeType = false;
        state.fee_type = '';
        toast.success(payload.msg);
      })
      .addCase(createFeeType.rejected, (state) => {
        state.isCreatingFeeType = false;
        toast.error('Error creating fee type');
      })
      .addCase(updateFeeType.pending, (state) => {
        state.isUpdatingFeeType = true;
      })
      .addCase(updateFeeType.fulfilled, (state, { payload }) => {
        state.isUpdatingFeeType = false;
        state.fee_type = '';
        state.editFeeType = false;
        state.editFeeTypeId = '';
        toast.success(payload.msg);
      })
      .addCase(updateFeeType.rejected, (state, { payload }) => {
        state.isUpdatingFeeType = false;
        toast.error(payload.msg);
      })
      .addCase(deleteFeeType.pending, (state) => {
        state.isDeletingFeeType = true;
      })
      .addCase(deleteFeeType.fulfilled, (state, { payload }) => {
        state.isDeletingFeeType = false;
        toast.success(payload.msg);
      })
      .addCase(deleteFeeType.rejected, (state) => {
        state.isDeletingFeeType = false;
        toast.error('Error deleting fee type');
      })
      .addCase(fetchAllOtherFees.pending, (state) => {
        state.isFetchingOtherFees = true;
      })
      .addCase(fetchAllOtherFees.fulfilled, (state, { payload }) => {
        state.isFetchingOtherFees = false;
        state.otherFees = payload.otherFees;
      })
      .addCase(fetchAllOtherFees.rejected, (state) => {
        state.isFetchingOtherFees = false;
      })
      .addCase(fetchOtherFee.pending, (state) => {
        state.isFetchingOtherFee = true;
      })
      .addCase(fetchOtherFee.fulfilled, (state, { payload }) => {
        state.isFetchingOtherFee = false;
        state.otherFee = payload.otherFee;
      })
      .addCase(fetchOtherFee.rejected, (state) => {
        state.isFetchingOtherFee = false;
      })
      .addCase(createOtherFee.pending, (state) => {
        state.isCreatingOtherFee = true;
      })
      .addCase(createOtherFee.fulfilled, (state, { payload }) => {
        state.isCreatingOtherFee = false;
        state.other_fee = '';
        toast.success(payload.msg);
      })
      .addCase(createOtherFee.rejected, (state, { payload }) => {
        state.isCreatingOtherFee = false;
        toast.error(payload.msg);
      })
      .addCase(updateOtherFee.pending, (state) => {
        state.isUpdatingOtherFee = true;
      })
      .addCase(updateOtherFee.fulfilled, (state, { payload }) => {
        state.isUpdatingOtherFee = false;
        state.other_fee = '';
        state.editOtherFee = false;
        state.editOtherFeeId = '';
        state.other_fee_name = '';
        state.fee_amount = '';
        state.other_fee_due_date = '';
        toast.success(payload.msg);
      })
      .addCase(updateOtherFee.rejected, (state, { payload }) => {
        state.isUpdatingOtherFee = false;
        toast.error(payload.msg);
      })
      .addCase(deleteOtherFee.pending, (state) => {
        state.isDeletingOtherFee = true;
      })
      .addCase(deleteOtherFee.fulfilled, (state, { payload }) => {
        state.isDeletingOtherFee = false;
        toast.success(payload.msg);
      })
      .addCase(deleteOtherFee.rejected, (state) => {
        state.isDeletingOtherFee = false;
        toast.error('Error deleting other fee');
      })
      .addCase(fetchAllTuitionAndFees.pending, (state) => {
        state.isFetchingTuitionAndFees = true;
      })
      .addCase(fetchAllTuitionAndFees.fulfilled, (state, { payload }) => {
        state.isFetchingTuitionAndFees = false;
        state.tuitionAndFees = payload.tuitionAndFees;
      })
      .addCase(fetchAllTuitionAndFees.rejected, (state) => {
        state.isFetchingTuitionAndFees = false;
      })
      .addCase(createTuitionAndFee.pending, (state) => {
        state.isCreatingTuitionAndFee = true;
      })
      .addCase(createTuitionAndFee.fulfilled, (state, { payload }) => {
        state.isCreatingTuitionAndFee = false;
        state.tuition_and_fee = '';
        toast.success(payload.msg);
      })
      .addCase(createTuitionAndFee.rejected, (state, { payload }) => {
        state.isCreatingTuitionAndFee = false;
        toast.error(payload.msg);
      })
      .addCase(updateTuitionAndFee.pending, (state) => {
        state.isUpdatingTuitionAndFee = true;
      })
      .addCase(updateTuitionAndFee.fulfilled, (state, { payload }) => {
        state.isUpdatingTuitionAndFee = false;
        state.editTuitionAndFee = false;
        state.tuition_and_fee = '';
        state.editFeeId = '';
        toast.success(payload.msg);
      })
      .addCase(updateTuitionAndFee.rejected, (state, { payload }) => {
        state.isUpdatingTuitionAndFee = false;
        toast.error(payload.msg);
      })
      .addCase(deleteTuitionAndFee.pending, (state) => {
        state.isDeletingTuitionAndFee = true;
      })
      .addCase(deleteTuitionAndFee.fulfilled, (state, { payload }) => {
        state.isDeletingTuitionAndFee = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTuitionAndFee.rejected, (state) => {
        state.isDeletingTuitionAndFee = false;
        toast.error('Error deleting tuition');
      })
      .addCase(fetchAllFees.pending, (state) => {
        state.isFetchingFees = true;
      })
      .addCase(fetchAllFees.fulfilled, (state, { payload }) => {
        state.isFetchingFees = false;
        state.fees = payload.fees;
        state.totalFees = payload.totalFees;
        state.totalFeesPages = payload.totalPages;
      })
      .addCase(fetchAllFees.rejected, (state) => {
        state.isFetchingFees = false;
      })
      .addCase(createFee.pending, (state) => {
        state.isCreatingFee = true;
      })
      .addCase(createFee.fulfilled, (state, { payload }) => {
        state.isCreatingFee = false;
        toast.success(payload.msg);
      })
      .addCase(createFee.rejected, (state, { payload }) => {
        state.isCreatingFee = false;
        toast.error(payload.msg);
      })
      .addCase(fetchFees.pending, (state) => {
        state.isFetchingFees = true;
      })
      .addCase(fetchFees.fulfilled, (state, { payload }) => {
        state.isFetchingFees = false;
        state.fees = payload.fees;
      })
      .addCase(fetchFees.rejected, (state, { payload }) => {
        state.isFetchingFees = false;
        toast.error(payload.msg);
      })
      .addCase(updateFee.pending, (state) => {
        state.isUpdatingFee = true;
      })
      .addCase(updateFee.fulfilled, (state, { payload }) => {
        state.isUpdatingFee = false;
        state.editFee = false;
        state.editFeeId = '';
        state.fee = '';
        state.fee_type = '';
        state.fee_label = '';
        toast.success(payload.msg);
      })
      .addCase(updateFee.rejected, (state, { payload }) => {
        state.isUpdatingFee = false;
        toast.error(payload.msg);
      })
      .addCase(approveFees.pending, (state) => {
        state.isApprovingFee = true;
      })
      .addCase(approveFees.fulfilled, (state, { payload }) => {
        state.isApprovingFee = false;
        state.approveFeeModal = false;
        toast.success(payload.msg);
      })
      .addCase(approveFees.rejected, (state) => {
        state.isApprovingFee = false;
        state.approveFeeModal = false;
        toast.error('Error approving fee');
      })
      .addCase(disapproveFees.pending, (state) => {
        state.isDisapprovingFee = true;
      })
      .addCase(disapproveFees.fulfilled, (state, { payload }) => {
        state.isDisapprovingFee = false;
        state.approveFeeModal = false;
        toast.success(payload.msg);
      })
      .addCase(disapproveFees.rejected, (state) => {
        state.isDisapprovingFee = false;
        state.approveFeeModal = false;
        toast.error('Error disapproving fee');
      })
      .addCase(rejectFees.pending, (state) => {
        state.isRejectingFees = true;
      })
      .addCase(rejectFees.fulfilled, (state, { payload }) => {
        state.isRejectingFees = false;
        state.approveFeeModal = false;
        toast.success(payload.msg);
      })
      .addCase(rejectFees.rejected, (state) => {
        state.isRejectingFees = false;
        state.approveFeeModal = false;
        toast.error('Error rejecting fee');
      })
      .addCase(deleteFee.pending, (state) => {
        state.isDeletingFee = true;
      })
      .addCase(deleteFee.fulfilled, (state, { payload }) => {
        state.isDeletingFee = false;
        toast.success(payload.msg);
      })
      .addCase(deleteFee.rejected, (state) => {
        state.isDeletingFee = false;
        toast.error('Error deleting tuition fee');
      })
      .addCase(fetchAllLevelFees.pending, (state) => {
        state.isFetchingAllFees = true;
      })
      .addCase(fetchAllLevelFees.fulfilled, (state, { payload }) => {
        state.isFetchingAllFees = false;
        state.allFees = payload.allLevelFees;
      })
      .addCase(fetchAllLevelFees.rejected, (state) => {
        state.isFetchingAllFees = false;
      })
      .addCase(fetchFeesForEnrollment.pending, (state) => {
        state.isFetchingStudentFees = true;
      })
      .addCase(fetchFeesForEnrollment.fulfilled, (state, { payload }) => {
        state.isFetchingStudentFees = false;
        state.studentFees = payload.fees;
        toast.success(payload.msg);
      })
      .addCase(fetchFeesForEnrollment.rejected, (state) => {
        state.isFetchingStudentFees = false;
      })
      .addCase(fetchFeesForEnrollmentByProgram.pending, (state) => {
        state.isFetchingStudentFees = true;
      })
      .addCase(
        fetchFeesForEnrollmentByProgram.fulfilled,
        (state, { payload }) => {
          state.isFetchingStudentFees = false;
          state.studentFees = payload.fees;
          toast.success(payload.msg);
        }
      )
      .addCase(fetchFeesForEnrollmentByProgram.rejected, (state) => {
        state.isFetchingStudentFees = false;
      })
      .addCase(fetchAllStudentInvoices.pending, (state) => {
        state.isFetchingStudentInvoices = true;
      })
      .addCase(fetchAllStudentInvoices.fulfilled, (state, { payload }) => {
        state.isFetchingStudentInvoices = false;
        state.studentInvoices = payload.studentInvoices;
      })
      .addCase(fetchAllStudentInvoices.rejected, (state) => {
        state.isFetchingStudentInvoices = false;
      })
      .addCase(fetchStudentInvoice.pending, (state) => {
        state.isFetchingStudentInvoice = true;
      })
      .addCase(fetchStudentInvoice.fulfilled, (state, { payload }) => {
        state.isFetchingStudentInvoice = false;
        state.studentInvoice = payload.studentInvoice;
      })
      .addCase(fetchStudentInvoice.rejected, (state) => {
        state.isFetchingStudentInvoice = false;
      })
      .addCase(createStudentInvoice.pending, (state) => {
        state.isCreatingStudentInvoice = true;
      })
      .addCase(createStudentInvoice.fulfilled, (state, { payload }) => {
        state.isCreatingStudentInvoice = false;
        state.invoice_date = '';
        state.invoice_number_format = '';
        toast.success(payload.msg);
      })
      .addCase(createStudentInvoice.rejected, (state, { payload }) => {
        state.isCreatingStudentInvoice = false;
        toast.error(payload.msg);
      })
      .addCase(cancelStudentInvoice.pending, (state) => {
        state.isCancellingStudentInvoice = true;
      })
      .addCase(cancelStudentInvoice.fulfilled, (state, { payload }) => {
        state.isCancellingStudentInvoice = false;
        toast.success(payload.msg);
      })
      .addCase(cancelStudentInvoice.rejected, (state, { payload }) => {
        state.isCancellingStudentInvoice = false;
        toast.error(payload.msg);
      })
      .addCase(updateStudentInvoice.pending, (state) => {
        state.isUpdatingStudentInvoice = true;
      })
      .addCase(updateStudentInvoice.fulfilled, (state, { payload }) => {
        state.isUpdatingStudentInvoice = false;
        toast.success(payload.msg);
      })
      .addCase(updateStudentInvoice.rejected, (state, { payload }) => {
        state.isUpdatingStudentInvoice = false;
        toast.error(payload.msg);
      })
      .addCase(deleteStudentInvoice.pending, (state) => {
        state.isDeletingStudentInvoice = true;
      })
      .addCase(deleteStudentInvoice.fulfilled, (state, { payload }) => {
        state.isDeletingStudentInvoice = false;
        toast.success(payload.msg);
      })
      .addCase(deleteStudentInvoice.rejected, (state, { payload }) => {
        state.isDeletingStudentInvoice = false;
        toast.error(payload.msg);
      })
      .addCase(fetchInvoiceNumberFormats.pending, (state) => {
        state.isFetchingInvoiceNumberFormats = true;
      })
      .addCase(fetchInvoiceNumberFormats.fulfilled, (state, { payload }) => {
        state.isFetchingInvoiceNumberFormats = false;
        state.invoiceNumberFormats = payload.invoiceNumberFormats;
      })
      .addCase(fetchInvoiceNumberFormats.rejected, (state) => {
        state.isFetchingInvoiceNumberFormats = false;
      })
      .addCase(createInvoiceNumberFormat.pending, (state) => {
        state.isCreatingInvoiceNumberFormat = true;
      })
      .addCase(createInvoiceNumberFormat.fulfilled, (state, { payload }) => {
        state.isCreatingInvoiceNumberFormat = false;
        toast.success(payload.msg);
      })
      .addCase(createInvoiceNumberFormat.rejected, (state, { payload }) => {
        state.isCreatingInvoiceNumberFormat = false;
        toast.error(payload.response.data.msg);
      })
      .addCase(updateInvoiceNumberFormat.pending, (state) => {
        state.isUpdatingInvoiceNumberFormat = true;
      })
      .addCase(updateInvoiceNumberFormat.fulfilled, (state, { payload }) => {
        state.isUpdatingInvoiceNumberFormat = false;
        state.invoice_number_format = '';
        state.editInvoiceNumberFormat = false;
        state.editInvoiceNumberFormatId = '';
        toast.success(payload.msg);
      })
      .addCase(updateInvoiceNumberFormat.rejected, (state, { payload }) => {
        state.isUpdatingInvoiceNumberFormat = false;
        toast.error(payload.msg);
      })
      .addCase(deleteInvoiceNumberFormat.pending, (state) => {
        state.isDeletingInvoiceNumberFormat = true;
      })
      .addCase(deleteInvoiceNumberFormat.fulfilled, (state, { payload }) => {
        state.isDeletingInvoiceNumberFormat = false;
        toast.success(payload.msg);
      })
      .addCase(deleteInvoiceNumberFormat.rejected, (state, { payload }) => {
        state.isDeletingInvoiceNumberFormat = false;
        toast.error(payload.msg);
      })
      .addCase(bulkCreateStudentInvoice.pending, (state) => {
        state.isCreatingStudentInvoice = true;
      })
      .addCase(bulkCreateStudentInvoice.fulfilled, (state, { payload }) => {
        state.isCreatingStudentInvoice = false;
        state.academicDepartment = '';
        state.academicLevel = '';
        state.collegeTrack = '';
        state.collegeProgram = '';
        state.invoice_date = '';
        state.invoice_number_format = '';
        toast.success(payload.msg);
      })
      .addCase(bulkCreateStudentInvoice.rejected, (state, { payload }) => {
        state.isCreatingStudentInvoice = false;
        toast.error(payload.msg);
      })
      .addCase(fetchStudentInvoiceByStudent.pending, (state) => {
        state.isFetchingStudentInvoiceByStudent = true;
      })
      .addCase(fetchStudentInvoiceByStudent.fulfilled, (state, { payload }) => {
        state.isFetchingStudentInvoiceByStudent = false;
        state.singleStudentInvoices = payload.studentInvoices;
      })
      .addCase(fetchStudentInvoiceByStudent.rejected, (state) => {
        state.isFetchingStudentInvoiceByStudent = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllAcademicYears.pending, (state) => {
        state.isFetchingAcademicYears = true;
      })
      .addCase(fetchAllAcademicYears.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicYears = false;
        state.academicYears = payload.academic_years;
      })
      .addCase(fetchAllAcademicYears.rejected, (state) => {
        state.isFetchingAcademicYears = false;
      })
      .addCase(fetchAllSemesters.pending, (state) => {
        state.isFetchingSemesters = true;
      })
      .addCase(fetchAllSemesters.fulfilled, (state, { payload }) => {
        state.isFetchingSemesters = false;
        state.semesters = payload;
      })
      .addCase(fetchAllSemesters.rejected, (state) => {
        state.isFetchingSemesters = false;
      })
      .addCase(fetchAllAcademicDepartments.pending, (state) => {
        state.isFetchingAcademicDepartments = true;
      })
      .addCase(fetchAllAcademicDepartments.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicDepartments = false;
        state.academicDepartments = payload.departmentLevels;
      })
      .addCase(fetchAllAcademicDepartments.rejected, (state) => {
        state.isFetchingAcademicDepartments = false;
      })
      .addCase(fetchAllAcademicLevels.pending, (state) => {
        state.isFetchingAcademicLevels = true;
      })
      .addCase(fetchAllAcademicLevels.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicLevels = false;
        state.academicLevels = payload.levels;
      })
      .addCase(fetchAllAcademicLevels.rejected, (state) => {
        state.isFetchingAcademicLevels = false;
      })
      .addCase(fetchAllCollegeTracks.fulfilled, (state, { payload }) => {
        state.collegeTracks = payload.collegeTracks;
      })
      .addCase(fetchAllCollegeTracks.rejected, (state) => {
        state.isFetchingCollegeTracks = false;
      })
      .addCase(fetchAllCollegePrograms.pending, (state) => {
        state.isFetchingCollegeCourses = true;
      })
      .addCase(createPaymentScheme.fulfilled, (state, { payload }) => {
        state.isCreatingK12PaymentScheme = false;
        toast.success(payload.msg);
      })
      .addCase(
        createPaymentScheme.rejected,
        (
          state,
          {
            payload: {
              response: { data },
            },
          }
        ) => {
          state.isCreatingK12PaymentScheme = false;
          console.log(data);
          toast.error(data.msg);
        }
      )
      .addCase(fetchPaymentSchemes.pending, (state) => {
        state.isFetchingK12PaymentSchemes = true;
      })
      .addCase(fetchPaymentSchemes.fulfilled, (state, { payload }) => {
        state.isFetchingK12PaymentSchemes = false;
        state.k12PaymentSchemes = payload.paymentSchemes.filter(
          (scheme) =>
            scheme.department !== 'College' && scheme.department !== 'TESDA'
        );
        state.collegePaymentSchemes = payload.paymentSchemes.filter(
          (scheme) => scheme.department === 'College'
        );
      })
      .addCase(fetchPaymentSchemes.rejected, (state) => {
        state.isFetchingK12PaymentSchemes = false;
      })
      .addCase(fetchPaymentSchemeByYearLevel.pending, (state) => {
        state.isFetchingK12PaymentScheme = true;
      })
      .addCase(
        fetchPaymentSchemeByYearLevel.fulfilled,
        (state, { payload }) => {
          state.isFetchingK12PaymentScheme = false;
          state.k12PaymentScheme = payload.paymentScheme;
        }
      )
      .addCase(fetchPaymentSchemeByYearLevel.rejected, (state) => {
        state.isFetchingK12PaymentScheme = false;
      })
      .addCase(updateK12PaymentScheme.pending, (state) => {
        state.isUpdatingK12PaymentScheme = true;
      })
      .addCase(updateK12PaymentScheme.fulfilled, (state, { payload }) => {
        state.isUpdatingK12PaymentScheme = false;
        toast.success(payload.msg);
      })
      .addCase(updateK12PaymentScheme.rejected, (state, { payload }) => {
        state.isUpdatingK12PaymentScheme = false;
        toast.error(payload.msg);
      })
      .addCase(deleteK12PaymentScheme.pending, (state) => {
        state.isDeletingK12PaymentScheme = true;
      })
      .addCase(deleteK12PaymentScheme.fulfilled, (state, { payload }) => {
        state.isDeletingK12PaymentScheme = false;
        toast.success(payload.msg);
      })
      .addCase(deleteK12PaymentScheme.rejected, (state, { payload }) => {
        state.isDeletingK12PaymentScheme = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllStudentLedgers.pending, (state) => {
        state.isFetchingStudentsLedgers = true;
      })
      .addCase(fetchAllStudentLedgers.fulfilled, (state, { payload }) => {
        state.isFetchingStudentsLedgers = false;
        state.studentsLedgers = payload.studentLedgers;
      })
      .addCase(fetchAllStudentLedgers.rejected, (state) => {
        state.isFetchingStudentsLedgers = false;
      })
      .addCase(fetchBankAccountNumbers.pending, (state) => {
        state.isFetchingBankAccountNumbers = true;
      })
      .addCase(fetchBankAccountNumbers.fulfilled, (state, { payload }) => {
        state.isFetchingBankAccountNumbers = false;
        state.bankAccountNumbers = payload.bankAccountNumbers;
      })
      .addCase(fetchBankAccountNumbers.rejected, (state) => {
        state.isFetchingBankAccountNumbers = false;
      })
      .addCase(createBankAccountNumber.pending, (state) => {
        state.isCreatingBankAccountNumber = true;
      })
      .addCase(createBankAccountNumber.fulfilled, (state, { payload }) => {
        state.isCreatingBankAccountNumber = false;
        toast.success(payload.msg);
      })
      .addCase(createBankAccountNumber.rejected, (state, { payload }) => {
        state.isCreatingBankAccountNumber = false;
        toast.error(payload.msg);
      })
      .addCase(updateBankAccountNumber.pending, (state) => {
        state.isUpdatingBankAccountNumber = true;
      })
      .addCase(updateBankAccountNumber.fulfilled, (state, { payload }) => {
        state.isUpdatingBankAccountNumber = false;
        toast.success(payload.msg);
      })
      .addCase(updateBankAccountNumber.rejected, (state, { payload }) => {
        state.isUpdatingBankAccountNumber = false;
        toast.error(payload.msg);
      })
      .addCase(deleteBankAccountNumber.pending, (state) => {
        state.isDeletingBankAccountNumber = true;
      })
      .addCase(deleteBankAccountNumber.fulfilled, (state, { payload }) => {
        state.isDeletingBankAccountNumber = false;
        toast.success(payload.msg);
      })
      .addCase(deleteBankAccountNumber.rejected, (state, { payload }) => {
        state.isDeletingBankAccountNumber = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllVoidORNos.pending, (state) => {
        state.isFetchingVoidORNos = true;
      })
      .addCase(fetchAllVoidORNos.fulfilled, (state, { payload }) => {
        state.isFetchingVoidORNos = false;
        state.voidORNoList = payload.voidORNos;
      })
      .addCase(fetchAllVoidORNos.rejected, (state) => {
        state.isFetchingVoidORNos = false;
      })
      .addCase(addVoidORNo.pending, (state) => {
        state.isAddingVoidORNo = true;
      })
      .addCase(addVoidORNo.fulfilled, (state, { payload }) => {
        state.isAddingVoidORNo = false;
        state.createVoidORNo = false;
        toast.success(payload.msg);
      })
      .addCase(addVoidORNo.rejected, (state, { payload }) => {
        state.isAddingVoidORNo = false;
        toast.error(payload.error);
      })
      .addCase(deleteVoidORNo.pending, (state) => {
        state.isDeletingVoidORNo = true;
      })
      .addCase(deleteVoidORNo.fulfilled, (state, { payload }) => {
        state.isDeletingVoidORNo = false;
        toast.success(payload.msg);
      })
      .addCase(deleteVoidORNo.rejected, (state, { payload }) => {
        state.isDeletingVoidORNo = false;
        toast.error(payload.error);
      })
      .addCase(updateVoidORNo.pending, (state) => {
        state.isEditingVoidORNo = true;
      })
      .addCase(updateVoidORNo.fulfilled, (state, { payload }) => {
        state.isEditingVoidORNo = false;
        state.editVoidORNo = false;
        toast.success(payload.msg);
      })
      .addCase(updateVoidORNo.rejected, (state, { payload }) => {
        state.isEditingVoidORNo = false;
        toast.error(payload.error);
      })
      .addCase(fetchAllPromissoryNotes.pending, (state) => {
        state.isFetchingPromissoryNotes = true;
      })
      .addCase(fetchAllPromissoryNotes.fulfilled, (state, { payload }) => {
        state.isFetchingPromissoryNotes = false;
        state.promissoryNotes = payload.promissoryNotes;
      })
      .addCase(fetchAllPromissoryNotes.rejected, (state) => {
        state.isFetchingPromissoryNotes = false;
      })
      .addCase(fetchPromissoryNote.pending, (state) => {
        state.isFetchingPromissoryNote = true;
      })
      .addCase(fetchPromissoryNote.fulfilled, (state, { payload }) => {
        state.isFetchingPromissoryNote = false;
        state.promissoryNote = payload.promissoryNote;
      })
      .addCase(fetchPromissoryNote.rejected, (state) => {
        state.isFetchingPromissoryNote = false;
      })
      .addCase(addPromissoryNote.pending, (state) => {
        state.isCreatingPromissoryNote = true;
      })
      .addCase(addPromissoryNote.fulfilled, (state, { payload }) => {
        state.isCreatingPromissoryNote = false;
        toast.success(payload.msg);
      })
      .addCase(addPromissoryNote.rejected, (state, { payload }) => {
        state.isCreatingPromissoryNote = false;
        toast.error(payload.error);
      })
      .addCase(updatePromissoryNote.pending, (state) => {
        state.isEditingPromissoryNote = true;
      })
      .addCase(updatePromissoryNote.fulfilled, (state, { payload }) => {
        state.isEditingPromissoryNote = false;
        toast.success(payload.msg);
      })
      .addCase(updatePromissoryNote.rejected, (state, { payload }) => {
        state.isEditingPromissoryNote = false;
        toast.error(payload.error);
      })
      .addCase(deletePromissoryNote.pending, (state) => {
        state.isDeletingPromissoryNote = true;
      })
      .addCase(deletePromissoryNote.fulfilled, (state, { payload }) => {
        state.isDeletingPromissoryNote = false;
        toast.success(payload.msg);
      })
      .addCase(deletePromissoryNote.rejected, (state, { payload }) => {
        state.isDeletingPromissoryNote = false;
        toast.error(payload.error);
      })
      .addCase(approvePromissoryNote.pending, (state) => {
        state.isApprovingPromissoryNote = true;
      })
      .addCase(approvePromissoryNote.fulfilled, (state, { payload }) => {
        state.isApprovingPromissoryNote = false;
        toast.success(payload.msg);
      })
      .addCase(approvePromissoryNote.rejected, (state, { payload }) => {
        state.isApprovingPromissoryNote = false;
        toast.error(payload.error);
      })
      .addCase(rejectPromissoryNote.pending, (state) => {
        state.isRejectingPromissoryNote = true;
      })
      .addCase(rejectPromissoryNote.fulfilled, (state, { payload }) => {
        state.isRejectingPromissoryNote = false;
        toast.success(payload.msg);
      })
      .addCase(rejectPromissoryNote.rejected, (state, { payload }) => {
        state.isRejectingPromissoryNote = false;
        toast.error(payload.error);
      });
  },
});

export const {
  handleChange,
  setEditFeeType,
  setEditOtherFee,
  resetEditFeeType,
  resetEditOtherFee,
  setTuitionAndFeeId,
  setAcademicYear,
  resetTuitionAndFeeId,
  setTuitionAndFee,
  resetTuitionAndFee,
  toggleCreateTuitionAndFee,
  toggleEditTuitionAndFee,
  toggleCreateFee,
  toggleApproveFeeModal,
  toggleEditFee,
  setFee,
  resetFee,
  toggleGridView,
  toggleListView,
  togglePreviewFee,
  setPreviewFee,
  setOtherFee,
  resetOtherFee,
  setInvoiceNumberFormat,
  resetInvoiceNumberFormat,
  resetBulkAssignOtherFee,
  clearStudentFees,
  toggleCollegeFeeMode,
  clearDynamicData,
  setDynamicData,
  toggleAddK12PaymentScheme,
  toggleEditK12PaymentScheme,
  toggleAddCollegePaymentScheme,
  toggleEditCollegePaymentScheme,
  toggleAddBankNo,
  toggleEditBankNo,
  toggleAddVoidORNo,
  toggleEditVoidORNo,
  toggleEditPromissoryNote,
  toggleCreatePromissoryNote,
} = financeSlice.actions;

export default financeSlice.reducer;
