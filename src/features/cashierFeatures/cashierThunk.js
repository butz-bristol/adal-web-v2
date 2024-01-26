import adalFetch from 'src/utils/axios';
import {
  fetchCollegeStudentLedger,
  fetchCollegeStudentPaymentScheme,
  fetchK12StudentLedger,
  fetchK12StudentPaymentScheme,
  fetchORSummaryList,
  fetchTESDAStudentPaymentScheme,
} from './cashierSlice';

export const fetchAllStudentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchPaymentProcessingTeamThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentsByQueryThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
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

// ** Student Ledger **

export const createStudentLedgerThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateStudentLedgerThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentLedgerThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const processEnrollmentPaymentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    const { student, academic_year, year_level, semester, student_department } =
      response.data;
    if (student && academic_year && year_level) {
      thunkAPI.dispatch(
        fetchK12StudentPaymentScheme({ student, academic_year, year_level })
      );
      thunkAPI.dispatch(
        fetchK12StudentLedger({
          student_id: student,
          academic_year,
          year_level,
        })
      );
    }

    if (student && semester && academic_year && year_level) {
      thunkAPI.dispatch(
        fetchCollegeStudentLedger({
          student_id: student,
          semester,
          academic_year,
          year_level,
        })
      );

      if (student_department === 'College') {
        thunkAPI.dispatch(
          fetchCollegeStudentPaymentScheme({
            student,
            academic_year,
            semester,
            year_level,
          })
        );
      }

      if (
        student_department ===
        'Technical Education and Skills Development Authority (TESDA)'
      ) {
        thunkAPI.dispatch(
          fetchTESDAStudentPaymentScheme({
            student,
            academic_year,
            semester,
          })
        );
      }
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchStudentPaymentSchemeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createPaymentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createPaymentCancellationThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updatePaymentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    thunkAPI.dispatch(fetchORSummaryList());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllPaymentsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createReportAccountNoThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchReportAccountNoThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchORSummaryListThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deletePaymentByOrThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchORSummaryList());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
