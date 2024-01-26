import { handleChange } from 'src/features//cashierFeatures/cashierSlice';
import adalFetch from 'src/utils/axios';
import { getTuitionAndFeeIdFromLocalStorage } from 'src/utils/localStorage';
import {
  fetchAllFeeTypes,
  fetchAllFees,
  fetchAllOtherFees,
  fetchAllPromissoryNotes,
  fetchAllStudentInvoices,
  fetchAllTuitionAndFees,
  fetchAllVoidORNos,
  fetchBankAccountNumbers,
  fetchInvoiceNumberFormats,
  fetchPaymentSchemes,
} from './financeSlice';

// ** Fee Types **

export const fetchAllFeeTypesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createFeeTypeThunk = async (url, feeType, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, feeType);
    thunkAPI.dispatch(fetchAllFeeTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateFeeTypeThunk = async (url, feeType, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, feeType);
    thunkAPI.dispatch(fetchAllFeeTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteFeeTypeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllFeeTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// ** Other Fees **

export const fetchAllOtherFeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchOtherFeeByIdThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createOtherFeeThunk = async (url, otherFee, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, otherFee);
    thunkAPI.dispatch(fetchAllOtherFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateOtherFeeThunk = async (url, otherFee, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, otherFee);
    thunkAPI.dispatch(fetchAllOtherFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteOtherFeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllOtherFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// ** Tuition and Fee **

export const fetchAllTuitionAndFeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createTuitionAndFeeThunk = async (
  url,
  tuitionAndFee,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, tuitionAndFee);
    thunkAPI.dispatch(fetchAllTuitionAndFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateTuitionAndFeeThunk = async (
  url,
  tuitionAndFee,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, tuitionAndFee);
    thunkAPI.dispatch(fetchAllTuitionAndFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteTuitionAndFeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllTuitionAndFees());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// ** Fee **

export const fetchAllFeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchFeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchFeeByIdThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createFeeThunk = async (url, fee, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, fee);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateFeeThunk = async (url, fee, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, fee);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const approveFeeThunk = async (url, fees, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, fees);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const disapproveFeeThunk = async (url, fees, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, fees);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const rejectFeeThunk = async (url, fees, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, fees);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteFeeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// Level Fees

export const fetchAllLevelFeesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// ** Assign Student Invoice **

export const fetchAllStudentInvoicesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentInvoiceByStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    thunkAPI.dispatch(
      handleChange({
        name: 'studentInvoices',
        value: response.data.studentInvoices,
      })
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentInvoiceThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createStudentInvoiceThunk = async (
  url,
  studentInvoice,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, studentInvoice);
    thunkAPI.dispatch(fetchAllStudentInvoices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const bulkCreateStudentInvoiceThunk = async (
  url,
  studentInvoice,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, studentInvoice);
    thunkAPI.dispatch(fetchAllStudentInvoices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateStudentInvoiceThunk = async (
  url,
  studentInvoice,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, studentInvoice);
    const { student, academic_year, year_level, semester } = response.data;
    // if (student && academic_year && year_level) {
    //   thunkAPI.dispatch(fetchK12StudentLedger({ student_id: student, academic_year, year_level }));
    // }

    // if (student && semester && academic_year && year_level) {
    //   thunkAPI.dispatch(fetchCollegeStudentLedger({ student_id: student, semester, academic_year, year_level }));
    // }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const cancelStudentInvoiceThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllStudentInvoices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteStudentInvoiceThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllStudentInvoices());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchInvoiceNumberFormatsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createInvoiceNumberFormatThunk = async (
  url,
  invoiceFormat,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, invoiceFormat);
    thunkAPI.dispatch(fetchInvoiceNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateInvoiceNumberFormatThunk = async (
  url,
  invoiceFormat,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, invoiceFormat);
    thunkAPI.dispatch(fetchInvoiceNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteInvoiceNumberFormatThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchInvoiceNumberFormats());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// ** Academic Year & Semester **

export const fetchAllAcademicYearsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllSemestersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// Academic Departments and Levels

export const fetchAllAcademicDepartmentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllAcademicLevelsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// College Tracks

export const fetchAllCollegeTracksThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

// College Courses/Programs

export const fetchAllCollegeProgramsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchFeesForEnrollmentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// Payment Schemes

export const createPaymentSchemeThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchPaymentSchemes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchPaymentSchemeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updatePaymentSchemeThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(fetchPaymentSchemes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deletePaymentSchemeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchPaymentSchemes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentLedgerThunk = async (url, student_ids, thunkAPI) => {
  try {
    const response = await adalFetch.get(url, { params: { student_ids } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchBankAccountNumbersThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createBankAccountNumberThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchBankAccountNumbers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBankAccountNumberThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(fetchBankAccountNumbers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBankAccountNumberThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchBankAccountNumbers());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// VOID OR No

export const fetchAllVoidORNosThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const addVoidORNoThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchAllVoidORNos());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const updateVoidORNoThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(fetchAllVoidORNos());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const deleteVoidORNoThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllVoidORNos());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const fetchAllPromissoryNotesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const addPromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchAllPromissoryNotes());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const updatePromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const updatePromissoryNoteStatusThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url);
    thunkAPI.dispatch(fetchAllPromissoryNotes());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const deletePromissoryNoteThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllPromissoryNotes());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const approvePromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchAllPromissoryNotes());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const rejectPromissoryNoteThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    thunkAPI.dispatch(fetchAllPromissoryNotes());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};
