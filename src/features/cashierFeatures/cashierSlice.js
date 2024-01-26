import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createPaymentSchemeThunk,
  fetchPaymentSchemeThunk,
} from 'src/features/financeFeatures/financeThunk';
import {
  createPaymentCancellationThunk,
  createPaymentThunk,
  createReportAccountNoThunk,
  createStudentLedgerThunk,
  deletePaymentByOrThunk,
  fetchAllOtherFeesThunk,
  fetchAllPaymentsThunk,
  fetchAllStudentsThunk,
  fetchORSummaryListThunk,
  fetchPaymentProcessingTeamThunk,
  fetchReportAccountNoThunk,
  fetchStudentLedgerThunk,
  fetchStudentThunk,
  fetchStudentsByQueryThunk,
  processEnrollmentPaymentThunk,
  updatePaymentThunk,
  updateStudentLedgerThunk,
} from './cashierThunk';

const initialState = {
  query: '',
  students: [],
  cashiers: [],
  isFetchingCashiers: false,
  cashierId: '',
  totalStudents: 0,
  totalStudentsPages: 0,
  studentPageNumber: 1,
  filteredStudents: [],
  isFilteringStudents: false,
  isFetchingStudents: false,
  student: {},
  isFetchingStudent: false,
  student_id: '',
  filteredStudentsPageNumber: 1,
  totalFilteredStudents: 0,
  totalFilteredStudentsPages: 0,
  or_no: 0,
  pad_no: 0,
  viewBreakdown: false,
  amount_received: '',
  amount_received_other_payments: '',
  change: 0,
  addOtherPaymentsModal: false,
  otherFees: [],
  otherFee1: {},
  otherFee2: {},
  otherFee3: {},
  isFetchingOtherFees: false,
  other_fee_1_id: '',
  other_fee_1: '',
  other_fee_1_amount: '',
  other_fee_1_note: '',
  other_fee_2_id: '',
  other_fee_2: '',
  other_fee_2_amount: '',
  other_fee_2_note: '',
  other_fee_3_id: '',
  other_fee_3: '',
  other_fee_3_amount: '',
  other_fee_3_note: '',
  isCreatingStudentLedger: false,
  isUpdatingStudentLedger: false,
  studentLedger: [],
  isFetchingStudentLedger: false,
  student_ledger_id: '',
  student_payment_scheme: {},
  college_payment_scheme: {},
  isCreatingPaymentScheme: false,
  isProcessingPayment: false,
  isUpdatingPayment: false,
  isFetchingPaymentScheme: false,
  month: '',
  amount_paid: 0,
  payment_mode: '',
  particulars: '',
  tuition_note: '',
  total_payment_amount: 0,
  change_amount: 0,
  isCreatingPayment: false,
  payments: [],
  isFetchingPayments: false,
  studentInvoices: [],
  accountNumbers: [
    {
      account_no: '',
      amount: 0,
      remarks: '',
      date: '',
    },
  ],
  account_no: '',
  reportAccountNos: [],
  isFetchingReportAccountNos: false,
  value_date: '',
  orSummaryList: [],
  isFetchingORSummaryList: false,
  orSummaryListId: '',
  paymentProcessingTeam: [],
  isFetchingPaymentProcessingTeam: false,
  deposit_date: '',
  isDeletingPayment: false,
};

export const fetchStudents = createAsyncThunk(
  'cashier/fetchStudents',
  async (_, thunkAPI) => {
    return fetchAllStudentsThunk(
      `/registered-students?page=${
        thunkAPI.getState().cashier.studentPageNumber
      }`,
      thunkAPI
    );
  }
);

export const fetchPaymentProcessingTeam = createAsyncThunk(
  'cashier/fetchPaymentProcessingTeam',
  async (_, thunkAPI) => {
    return fetchPaymentProcessingTeamThunk(
      `/users/employees/payment-processing-team`,
      thunkAPI
    );
  }
);

export const fetchAllOtherFees = createAsyncThunk(
  'cashier/fetchAllOtherFees',
  async (_, thunkAPI) => {
    return fetchAllOtherFeesThunk('/setup/other-fee', thunkAPI);
  }
);

export const fetchStudentsByQuery = createAsyncThunk(
  'cashier/fetchStudentsByQuery',
  async (_, thunkAPI) => {
    return fetchStudentsByQueryThunk(
      `/registered-students/search/${thunkAPI.getState().cashier.query}?page=${
        thunkAPI.getState().cashier.filteredStudentsPageNumber
      }`,
      thunkAPI
    );
  }
);

export const fetchStudent = createAsyncThunk(
  'cashier/fetchStudent',
  async (id, thunkAPI) => {
    return fetchStudentThunk(`/registered-students/${id}`, thunkAPI);
  }
);

export const createStudentLedger = createAsyncThunk(
  'cashier/createStudentLedger',
  async (data, thunkAPI) => {
    return createStudentLedgerThunk('/student-ledger', data, thunkAPI);
  }
);

export const updateStudentLedger = createAsyncThunk(
  'cashier/updateStudentLedger',
  async (data, thunkAPI) => {
    return updateStudentLedgerThunk(
      `/student-ledger/${data.id}`,
      data,
      thunkAPI
    );
  }
);

export const updateBulkLedger = createAsyncThunk(
  'cashier/updateBulkLedger',
  async (data, thunkAPI) => {
    return updateStudentLedgerThunk(`/student-ledger/update`, data, thunkAPI);
  }
);

export const fetchK12StudentLedger = createAsyncThunk(
  'cashier/fetchStudentLedger',
  async ({ student_id, academic_year }, thunkAPI) => {
    return fetchStudentLedgerThunk(
      `/student-ledger/student/k-12/${student_id}/${academic_year}`,
      thunkAPI
    );
  }
);

export const fetchCollegeStudentLedger = createAsyncThunk(
  'cashier/fetchCollegeStudentLedger',
  async ({ student_id, academic_year, semester }, thunkAPI) => {
    return fetchStudentLedgerThunk(
      `/student-ledger/student/college/${student_id}/${academic_year}/${semester}`,
      thunkAPI
    );
  }
);

export const fetchK12StudentPaymentScheme = createAsyncThunk(
  'cashier/fetchK12StudentPaymentScheme',
  async ({ student, academic_year, year_level }, thunkAPI) => {
    return fetchPaymentSchemeThunk(
      `/payment/k-12/${student}/${academic_year}/${year_level}`,
      thunkAPI
    );
  }
);

export const createK12MonthlyPaymentScheme = createAsyncThunk(
  'cashier/createK12MonthlyPaymentScheme',
  async (data, thunkAPI) => {
    return createPaymentSchemeThunk('/payment/k-12', data, thunkAPI);
  }
);

export const fetchCollegeStudentPaymentScheme = createAsyncThunk(
  'cashier/fetchCollegeStudentPaymentScheme',
  async ({ student, academic_year, semester, year_level }, thunkAPI) => {
    return fetchPaymentSchemeThunk(
      `/payment/college/${student}/${semester}/${academic_year}/${year_level}`,
      thunkAPI
    );
  }
);

export const createCollegeQuarterlyPaymentScheme = createAsyncThunk(
  'cashier/createCollegeQuarterlyPaymentScheme',
  async (data, thunkAPI) => {
    return createPaymentSchemeThunk('/payment/college', data, thunkAPI);
  }
);

export const createTESDAQuarterlyPaymentScheme = createAsyncThunk(
  'cashier/createTESDAQuarterlyPaymentScheme',
  async (data, thunkAPI) => {
    return createPaymentSchemeThunk('/payment/tesda', data, thunkAPI);
  }
);

export const fetchTESDAStudentPaymentScheme = createAsyncThunk(
  'cashier/fetchTESDAStudentPaymentScheme',
  async ({ student, academic_year, semester }, thunkAPI) => {
    return fetchPaymentSchemeThunk(
      `/payment/tesda/${student}/${academic_year}/${semester}`,
      thunkAPI
    );
  }
);

export const processEnrollmentPayment = createAsyncThunk(
  'cashier/processEnrollmentPayment',
  async (data, thunkAPI) => {
    return processEnrollmentPaymentThunk(
      '/payment/process-payment',
      data,
      thunkAPI
    );
  }
);

export const createPayment = createAsyncThunk(
  'cashier/createPayment',
  async (data, thunkAPI) => {
    return createPaymentThunk('/cashier-payments/students', data, thunkAPI);
  }
);

export const createPaymentCancellation = createAsyncThunk(
  'cashier/createPaymentCancellation',
  async (data, thunkAPI) => {
    return createPaymentCancellationThunk(
      '/cashier-payments/students/cancel',
      data,
      thunkAPI
    );
  }
);

export const updatePayment = createAsyncThunk(
  'cashier/updatePayment',
  async (data, thunkAPI) => {
    return updatePaymentThunk(
      `/cashier-payments/students/${data.id}`,
      data,
      thunkAPI
    );
  }
);

export const deletePaymentByOr = createAsyncThunk(
  'cashier/deletePaymentByOr',
  async (orNo, thunkAPI) => {
    return deletePaymentByOrThunk(
      `/cashier-payments/students/or/${orNo}`,
      thunkAPI
    );
  }
);

export const fetchAllPayments = createAsyncThunk(
  'cashier/getAllPayments',
  async (_, thunkAPI) => {
    return fetchAllPaymentsThunk('/cashier-payments/students', thunkAPI);
  }
);

export const fetchORSummaryList = createAsyncThunk(
  'cashier/fetchORSummaryList',
  async (_, thunkAPI) => {
    return fetchORSummaryListThunk(
      '/cashier-payments/students/or-summary-list',
      thunkAPI
    );
  }
);

export const createReportAccountNo = createAsyncThunk(
  'cashier/createReportAccountNo',
  async (data, thunkAPI) => {
    return createReportAccountNoThunk('/report-account-no', data, thunkAPI);
  }
);

export const fetchReportAccountNos = createAsyncThunk(
  'cashier/fetchReportAccountNos',
  async (_, thunkAPI) => {
    return fetchReportAccountNoThunk('/report-account-no', thunkAPI);
  }
);

const cashierSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    changeFilterStudentsPage: (state, { payload }) => {
      state.filteredStudentsPageNumber = payload;
    },
    changeStudentsPage: (state, { payload }) => {
      state.studentPageNumber = payload;
    },
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    setStudentValues: (state, { payload }) => {
      state.student = state.students.find(
        (student) => student._id === payload.id
      );
    },
    resetStudentValues: (state) => {
      state.student = {};
    },
    clearStudentInfo: (state) => {
      state.student_id = '';
      state.student = {};
    },
    toggleViewBreakdown: (state) => {
      state.viewBreakdown = !state.viewBreakdown;
    },
    toggleAddOtherPaymentsModal: (state) => {
      state.addOtherPaymentsModal = !state.addOtherPaymentsModal;
    },
    resetOtherPaymentsValues: (state) => {
      state.other_fee_1 = '';
      state.other_fee_1_id = '';
      state.other_fee_1_amount = 0;
      state.other_fee_2 = '';
      state.other_fee_2_id = '';
      state.other_fee_2_amount = 0;
      state.other_fee_3 = '';
      state.other_fee_3_id = '';
      state.other_fee_3_amount = 0;
      state.amount_received_other_payments = '';
      state.addOtherPaymentsModal = false;
    },
    setOtherFee1: (state, { payload }) => {
      state.otherFee1 =
        payload.type === 'invoice'
          ? state.studentInvoices.find((invoice) => invoice._id === payload.id)
          : state.otherFees.find((fee) => fee._id === payload.id);

      state.other_fee_1 =
        payload.type === 'invoice'
          ? state.otherFee1?.otherFee?.other_fee
          : state.otherFee1?.other_fee;

      state.other_fee_1_amount =
        payload.type === 'invoice'
          ? state.otherFee1?.otherFee?.fee_amount
          : state.otherFee1?.fee_amount;
    },
    setOtherFee2: (state, { payload }) => {
      state.otherFee2 =
        payload.type === 'invoice'
          ? state.studentInvoices.find((invoice) => invoice._id === payload.id)
          : state.otherFees.find((fee) => fee._id === payload.id);

      state.other_fee_2 =
        payload.type === 'invoice'
          ? state.otherFee2?.otherFee?.other_fee
          : state.otherFee2?.other_fee;

      state.other_fee_2_amount =
        payload.type === 'invoice'
          ? state.otherFee2?.otherFee?.fee_amount
          : state.otherFee2?.fee_amount;
    },
    setOtherFee3: (state, { payload }) => {
      state.otherFee3 =
        payload.type === 'invoice'
          ? state.studentInvoices.find((invoice) => invoice._id === payload.id)
          : state.otherFees.find((fee) => fee._id === payload.id);

      state.other_fee_3 =
        payload.type === 'invoice'
          ? state.otherFee3?.otherFee?.other_fee
          : state.otherFee3?.other_fee;

      state.other_fee_3_amount =
        payload.type === 'invoice'
          ? state.otherFee3?.otherFee?.fee_amount
          : state.otherFee3?.fee_amount;
    },
    clearDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = '';
      });
    },
    clearOtherFees: (state) => {
      state.otherFee1 = {};
      state.otherFee2 = {};
      state.otherFee3 = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isFetchingStudents = true;
      })
      .addCase(fetchStudents.fulfilled, (state, { payload }) => {
        state.students = payload.students;
        state.isFetchingStudents = false;
        state.totalStudents = payload.count;
        state.totalStudentsPages = payload.totalPages;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.isFetchingStudents = false;
      })
      .addCase(fetchPaymentProcessingTeam.pending, (state) => {
        state.isFetchingPaymentProcessingTeam = true;
      })
      .addCase(fetchPaymentProcessingTeam.fulfilled, (state, { payload }) => {
        state.paymentProcessingTeam = payload.paymentProcessingTeam;
        state.isFetchingPaymentProcessingTeam = false;
      })
      .addCase(fetchPaymentProcessingTeam.rejected, (state) => {
        state.isFetchingPaymentProcessingTeam = false;
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
      .addCase(fetchStudent.pending, (state) => {
        state.isFetchingStudent = true;
      })
      .addCase(fetchStudent.fulfilled, (state, { payload }) => {
        state.student = payload.student;
        state.isFetchingStudent = false;
      })
      .addCase(fetchStudent.rejected, (state) => {
        state.isFetchingStudent = false;
        toast.error('Student not found');
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
      .addCase(createStudentLedger.pending, (state) => {
        state.isCreatingStudentLedger = true;
      })
      .addCase(createStudentLedger.fulfilled, (state) => {
        state.isCreatingStudentLedger = false;
        console.log('Successfully created student ledger');
      })
      .addCase(createStudentLedger.rejected, (state, { payload }) => {
        state.isCreatingStudentLedger = false;
        toast.error(payload.msg);
      })
      .addCase(updateStudentLedger.pending, (state) => {
        state.isUpdatingStudentLedger = true;
      })
      .addCase(updateStudentLedger.fulfilled, (state) => {
        state.isUpdatingStudentLedger = false;
        console.log('Successfully updated student ledger');
      })
      .addCase(updateStudentLedger.rejected, (state, { payload }) => {
        state.isUpdatingStudentLedger = false;
        toast.error(payload.msg);
      })
      .addCase(updateBulkLedger.pending, (state) => {
        state.isUpdatingStudentLedger = true;
      })
      .addCase(updateBulkLedger.fulfilled, (state) => {
        state.isUpdatingStudentLedger = false;
        console.log('Successfully updated student ledger');
      })
      .addCase(updateBulkLedger.rejected, (state, { payload }) => {
        state.isUpdatingStudentLedger = false;
        toast.error(payload.msg);
      })
      .addCase(fetchK12StudentLedger.pending, (state) => {
        state.isFetchingStudentLedger = true;
      })
      .addCase(fetchK12StudentLedger.fulfilled, (state, { payload }) => {
        state.isFetchingStudentLedger = false;
        state.studentLedger = payload.studentLedger;
      })
      .addCase(fetchK12StudentLedger.rejected, (state) => {
        state.isFetchingStudentLedger = false;
      })
      .addCase(fetchCollegeStudentLedger.pending, (state) => {
        state.isFetchingStudentLedger = true;
      })
      .addCase(fetchCollegeStudentLedger.fulfilled, (state, { payload }) => {
        state.isFetchingStudentLedger = false;
        state.studentLedger = payload.studentLedger;
      })
      .addCase(fetchCollegeStudentLedger.rejected, (state) => {
        state.isFetchingStudentLedger = false;
      })
      .addCase(fetchK12StudentPaymentScheme.pending, (state) => {
        state.isFetchingPaymentScheme = true;
      })
      .addCase(fetchK12StudentPaymentScheme.fulfilled, (state, { payload }) => {
        state.isFetchingPaymentScheme = false;
        state.student_payment_scheme = payload.paymentScheme;
      })
      .addCase(fetchK12StudentPaymentScheme.rejected, (state) => {
        state.isFetchingPaymentScheme = false;
      })
      .addCase(fetchCollegeStudentPaymentScheme.pending, (state) => {
        state.isFetchingPaymentScheme = true;
      })
      .addCase(
        fetchCollegeStudentPaymentScheme.fulfilled,
        (state, { payload }) => {
          state.isFetchingPaymentScheme = false;
          state.college_payment_scheme = payload.paymentScheme;
        }
      )
      .addCase(fetchCollegeStudentPaymentScheme.rejected, (state) => {
        state.isFetchingPaymentScheme = false;
      })
      .addCase(fetchTESDAStudentPaymentScheme.pending, (state) => {
        state.isFetchingPaymentScheme = true;
      })
      .addCase(
        fetchTESDAStudentPaymentScheme.fulfilled,
        (state, { payload }) => {
          state.isFetchingPaymentScheme = false;
          state.college_payment_scheme = payload.paymentScheme;
        }
      )
      .addCase(fetchTESDAStudentPaymentScheme.rejected, (state) => {
        state.isFetchingPaymentScheme = false;
      })
      .addCase(processEnrollmentPayment.pending, (state) => {
        state.isProcessingPayment = true;
      })
      .addCase(processEnrollmentPayment.fulfilled, (state) => {
        state.isProcessingPayment = false;
        console.log('Successfully processed payment');
      })
      .addCase(processEnrollmentPayment.rejected, (state, { payload }) => {
        state.isProcessingPayment = false;
        toast.error(payload.msg);
      })
      .addCase(createPayment.pending, (state) => {
        state.isCreatingPayment = true;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.isCreatingPayment = false;
        console.log('Successfully created payment');
      })
      .addCase(createPayment.rejected, (state, { payload }) => {
        state.isCreatingPayment = false;
        toast.error(payload.error);
      })
      .addCase(createPaymentCancellation.pending, (state) => {
        state.isCreatingPayment = true;
      })
      .addCase(createPaymentCancellation.fulfilled, (state) => {
        state.isCreatingPayment = false;
        console.log('Successfully cancelled payment');
      })
      .addCase(createPaymentCancellation.rejected, (state, { payload }) => {
        state.isCreatingPayment = false;
        toast.error(payload.error);
      })
      .addCase(updatePayment.pending, (state) => {
        state.isUpdatingPayment = true;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.isUpdatingPayment = false;
        toast.success('Successfully updated payment(s)');
      })
      .addCase(updatePayment.rejected, (state, { payload }) => {
        state.isUpdatingPayment = false;
        toast.error(payload.error);
      })
      .addCase(deletePaymentByOr.pending, (state) => {
        state.isDeletingPayment = true;
      })
      .addCase(deletePaymentByOr.fulfilled, (state, { payload }) => {
        state.isDeletingPayment = false;
        toast.success(payload.msg);
      })
      .addCase(deletePaymentByOr.rejected, (state, { payload }) => {
        state.isDeletingPayment = false;
        toast.error(payload.msg);
      })
      .addCase(fetchAllPayments.pending, (state) => {
        state.isFetchingPayments = true;
      })
      .addCase(fetchAllPayments.fulfilled, (state, { payload }) => {
        state.isFetchingPayments = false;
        state.payments = payload.payments;
      })
      .addCase(fetchAllPayments.rejected, (state) => {
        state.isFetchingPayments = false;
      })
      .addCase(fetchORSummaryList.pending, (state) => {
        state.isFetchingORSummaryList = true;
      })
      .addCase(fetchORSummaryList.fulfilled, (state, { payload }) => {
        state.isFetchingORSummaryList = false;
        state.orSummaryList = payload.summaryListByORNumber;
      })
      .addCase(fetchORSummaryList.rejected, (state) => {
        state.isFetchingORSummaryList = false;
      })
      .addCase(fetchReportAccountNos.pending, (state) => {
        state.isFetchingReportAccountNos = true;
      })
      .addCase(fetchReportAccountNos.fulfilled, (state, { payload }) => {
        state.isFetchingReportAccountNos = false;
        state.reportAccountNos = payload.reportAccountNos;
      })
      .addCase(fetchReportAccountNos.rejected, (state) => {
        state.isFetchingReportAccountNos = false;
      });
  },
});

export const {
  handleChange,
  setStudentValues,
  resetStudentValues,
  changeStudentsPage,
  changeFilterStudentsPage,
  clearStudentInfo,
  toggleViewBreakdown,
  toggleAddOtherPaymentsModal,
  resetOtherPaymentsValues,
  setOtherFee1,
  setOtherFee2,
  setOtherFee3,
  clearDynamicData,
  clearOtherFees,
} = cashierSlice.actions;

export default cashierSlice.reducer;
