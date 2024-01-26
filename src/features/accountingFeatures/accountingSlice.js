import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addChartOfAccountIdToLocalStorage,
  getChartOfAccountIdFromLocalStorage,
  removeChartOfAccountIdFromLocalStorage,
} from 'src/utils/localStorage';
import {
  addFiscalYearThunk,
  createAccountThunk,
  createAccountTypeThunk,
  createCategoryTypeThunk,
  createChartOfAccountThunk,
  createDetailTypeThunk,
  deleteAccountThunk,
  deleteAccountTypeThunk,
  deleteCategoryTypeThunk,
  deleteChartOfAccountThunk,
  deleteDetailTypeThunk,
  deleteFiscalYearThunk,
  fetchAllAccountTypesThunk,
  fetchAllAccountsThunk,
  fetchAllCategoryTypesThunk,
  fetchAllChartOfAccountsThunk,
  fetchAllDetailTypesThunk,
  getAllFiscalYearThunk,
  setFiscalYearThunk,
  submitFeesForApprovalThunk,
  updateAccountThunk,
  updateAccountTypeThunk,
  updateCategoryTypeThunk,
  updateChartOfAccountThunk,
  updateDetailTypeThunk,
  updateFiscalYearThunk,
} from './accountingThunk';

const initialState = {
  creatingDraftFee: false,
  viewingDraftFee: false,
  fees: [],
  academic_year: '',
  academic_year_id: '',
  isSubmittingFees: false,
  fiscal_start_date: '',
  fiscal_end_date: '',
  fiscal_years: [],
  fiscal_year: {},
  fiscal_year_id: '',
  activeFiscalYear: {},
  nextFiscalYear: {},
  isFetchingFiscalYears: false,
  isFetchingFiscalYear: false,
  isAddingFiscalYear: false,
  isEditingFiscalYear: false,
  isCreatingFiscalYear: false,
  isUpdatingFiscalYear: false,
  isDeletingFiscalYear: false,
  chart_of_accounts: [],
  chart_of_account: {},
  gridView: true,
  listView: false,
  fiscalYear: '',
  chart_of_account_id: getChartOfAccountIdFromLocalStorage(),
  editChartOfAccount: false,
  editChartOfAccountId: '',
  createChartOfAccountStatus: false,
  isFetchingChartOfAccounts: false,
  isCreatingChartOfAccount: false,
  isUpdatingChartOfAccount: false,
  isDeletingChartOfAccount: false,
  // Account type
  account_types: [],
  account_type: {},
  editAccountType: false,
  createAccountTypeStatus: false,
  isFetchingAccountTypes: false,
  isFetchingAccountType: false,
  isCreatingAccountType: false,
  isUpdatingAccountType: false,
  isDeletingAccountType: false,
  // Account
  account_duplicate: [],
  accounts: [],
  account: {
    chart_of_account_id: '',
    account_type: '',
    detail_type: '',
  },
  account_id: '',
  account_name: '',
  account_code: '',
  account_category: '',
  account_description: '',
  account_type: '',
  categoryType: '',
  detailType: '',
  account_balance: '',
  editAccount: false,
  accountStatus: '',
  createAccountStatus: false,
  isFetchingAccounts: false,
  isFetchingAccount: false,
  isCreatingAccount: false,
  isUpdatingAccount: false,
  isDeletingAccount: false,
  // Category Type
  account_categories: [],
  account_category: {},
  category_name: '',
  category_status: '',
  category_id: '',
  category_code: '',
  editAccountCategory: false,
  createAccountCategoryStatus: false,
  isUpdatingAccountCategory: false,
  isCreatingAccountCategory: false,
  isFetchingAccountCategories: false,
  isFetchingAccountCategory: false,
  isDeletingAccountCategory: false,

  // Detail Type
  detail_types: [],
  detail_type: {
    detail_type_code: '',
    detail_type_name: '',
    accountType_id: '',
  },
  isFetchingDetailTypes: false,
  editDetailType: false,
  createDetailTypeStatus: false,
  isUpdatingDetailType: false,
  isCreatingDetailType: false,
  isFetchingDetailType: false,
  isDeletingDetailType: false,
};

export const submitFeesForApproval = createAsyncThunk(
  'accounting/submitFeesForApproval',
  async (fees, thunkAPI) => {
    return submitFeesForApprovalThunk(
      '/setup/fee/submit-approval',
      fees,
      thunkAPI
    );
  }
);

export const getAllFiscalYears = createAsyncThunk(
  'accounting/getAllFiscalYears',
  async (_, thunkAPI) => {
    return getAllFiscalYearThunk('/fiscal/year', thunkAPI);
  }
);

export const getFiscalYear = createAsyncThunk(
  'accounting/getFiscalYear',
  async (fiscalYearId, thunkAPI) => {
    return getAllFiscalYearThunk(`/fiscal/year/${fiscalYearId}`, thunkAPI);
  }
);

export const addFiscalYear = createAsyncThunk(
  'accounting/addFiscalYear',
  async (fiscal_year, thunkAPI) => {
    return addFiscalYearThunk('/fiscal/year', fiscal_year, thunkAPI);
  }
);

export const setCurrentFiscalYear = createAsyncThunk(
  'accounting/setCurrent',
  async (academic_year, thunkAPI) => {
    return setFiscalYearThunk(
      `/fiscal/year/set-current-year`,
      academic_year,
      thunkAPI
    );
  }
);

export const updateFiscalYear = createAsyncThunk(
  'accounting/updateFiscalYear',
  async (fiscal_year, thunkAPI) => {
    return updateFiscalYearThunk(
      `/fiscal/year/${fiscal_year._id}`,
      fiscal_year,
      thunkAPI
    );
  }
);

export const deleteFiscalYear = createAsyncThunk(
  'accounting/deleteFiscalYear',
  async (fiscalYearId, thunkAPI) => {
    return deleteFiscalYearThunk(`/fiscal/year/${fiscalYearId}`, thunkAPI);
  }
);

export const fetchAllChartOfAccounts = createAsyncThunk(
  'accounting/fetchAllChartOfAccounts',
  async (_, thunkAPI) => {
    return fetchAllChartOfAccountsThunk('/setup/chart-of-account', thunkAPI);
  }
);

export const getChartOfAccount = createAsyncThunk(
  'accounting/getChartOfAccount',
  async (chart_of_account_id, thunkAPI) => {
    return fetchAllChartOfAccountsThunk(
      `/setup/chart-of-account/${chart_of_account_id}`,
      thunkAPI
    );
  }
);

export const createChartOfAccount = createAsyncThunk(
  'accounting/createChartOfAccount',
  async (chartOfAccount, thunkAPI) => {
    return createChartOfAccountThunk(
      '/setup/chart-of-account',
      chartOfAccount,
      thunkAPI
    );
  }
);

export const updateChartOfAccount = createAsyncThunk(
  'accounting/updateChartOfAccount',
  async (chart_of_account, thunkAPI) => {
    return updateChartOfAccountThunk(
      `/setup/chart-of-account/${chart_of_account.id}`,
      chart_of_account,
      thunkAPI
    );
  }
);

export const deleteChartOfAccount = createAsyncThunk(
  'accounting/deleteChartOfAccount',
  async (id, thunkAPI) => {
    return deleteChartOfAccountThunk(`/setup/chart-of-account/${id}`, thunkAPI);
  }
);

// Category Type

export const getAllAccountCategories = createAsyncThunk(
  'accounting/getAllAccountCategories',
  async (_, thunkAPI) => {
    return fetchAllCategoryTypesThunk('/accounting-category-type', thunkAPI);
  }
);

export const getAccountCategory = createAsyncThunk(
  'accounting/getAccountCategory',
  async (categoryTypeId, thunkAPI) => {
    return fetchAllCategoryTypesThunk(
      `/accounting-category-type/${categoryTypeId}`,
      thunkAPI
    );
  }
);

export const createAccountCategory = createAsyncThunk(
  'accounting/createAccountCategory',
  async (account_category, thunkAPI) => {
    return createCategoryTypeThunk(
      '/accounting-category-type',
      account_category,
      thunkAPI
    );
  }
);

export const updateAccountCategory = createAsyncThunk(
  'accounting/updateAccountCategory',
  async (account_category, thunkAPI) => {
    return updateCategoryTypeThunk(
      `/accounting-category-type/${account_category._id}`,
      account_category,
      thunkAPI
    );
  }
);

export const deleteAccountCategory = createAsyncThunk(
  'accounting/deleteAccountCategory',
  async (id, thunkAPI) => {
    return deleteCategoryTypeThunk(`/accounting-category-type/${id}`, thunkAPI);
  }
);

// Detail Type

export const getAllDetailTypes = createAsyncThunk(
  'accounting/getAllDetailTypes',
  async (_, thunkAPI) => {
    return fetchAllDetailTypesThunk('/accounting-detail-type', thunkAPI);
  }
);

export const getDetailType = createAsyncThunk(
  'accounting/getDetailType',
  async (detailTypeId, thunkAPI) => {
    return fetchAllCategoryTypesThunk(
      `/accounting-detail-type/${detailTypeId}`,
      thunkAPI
    );
  }
);

export const createDetailType = createAsyncThunk(
  'accounting/createDetailType',
  async (detail_type, thunkAPI) => {
    return createDetailTypeThunk(
      '/accounting-detail-type',
      detail_type,
      thunkAPI
    );
  }
);

export const updateDetailType = createAsyncThunk(
  'accounting/updateDetailType',
  async (detail_type, thunkAPI) => {
    return updateDetailTypeThunk(
      `/accounting-detail-type/${detail_type._id}`,
      detail_type,
      thunkAPI
    );
  }
);

export const deleteDetailType = createAsyncThunk(
  'accounting/deleteDetailType',
  async (id, thunkAPI) => {
    return deleteDetailTypeThunk(`/accounting-detail-type/${id}`, thunkAPI);
  }
);

// Account Type

export const getAllAccountTypes = createAsyncThunk(
  'accounting/getAllAccountTypes',
  async (_, thunkAPI) => {
    return fetchAllAccountTypesThunk('/accounting-account-type', thunkAPI);
  }
);

export const getAccountType = createAsyncThunk(
  'accounting/getAccountType',
  async (accountTypeId, thunkAPI) => {
    return fetchAllAccountTypesThunk(
      `/accounting-account-type/${accountTypeId}`,
      thunkAPI
    );
  }
);

export const createAccountType = createAsyncThunk(
  'accounting/createAccountType',
  async (account_type, thunkAPI) => {
    return createAccountTypeThunk(
      '/accounting-account-type',
      account_type,
      thunkAPI
    );
  }
);

export const updateAccountType = createAsyncThunk(
  'accounting/updateAccountType',
  async (account_type, thunkAPI) => {
    return updateAccountTypeThunk(
      `/accounting-account-type/${account_type._id}`,
      account_type,
      thunkAPI
    );
  }
);

export const deleteAccountType = createAsyncThunk(
  'accounting/deleteAccountType',
  async (accountTypeId, thunkAPI) => {
    return deleteAccountTypeThunk(
      `/accounting-account-type/${accountTypeId}`,
      thunkAPI
    );
  }
);

export const getAllAccounts = createAsyncThunk(
  'accounting/getAllAccounts',
  async (_, thunkAPI) => {
    return fetchAllAccountsThunk('/accounting-account', thunkAPI);
  }
);

export const getAccount = createAsyncThunk(
  'accounting/getAccount',
  async (accountId, thunkAPI) => {
    return fetchAllAccountsThunk(`/accounting-account/${accountId}`, thunkAPI);
  }
);

export const createAccount = createAsyncThunk(
  'accounting/createAccount',
  async (account, thunkAPI) => {
    return createAccountThunk('/accounting-account', account, thunkAPI);
  }
);

export const updateAccount = createAsyncThunk(
  'accounting/updateAccount',
  async (account, thunkAPI) => {
    return updateAccountThunk(
      `/accounting-account/${account._id}`,
      account,
      thunkAPI
    );
  }
);

export const deleteAccount = createAsyncThunk(
  'accounting/deleteAccount',
  async (accountId, thunkAPI) => {
    return deleteAccountThunk(`/accounting-account/${accountId}`, thunkAPI);
  }
);

const accountingSlice = createSlice({
  name: 'accounting',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    toggleAddDraftFee: (state) => {
      state.creatingDraftFee = !state.creatingDraftFee;
    },
    toggleViewDraftFee: (state) => {
      state.viewingDraftFee = !state.viewingDraftFee;
    },
    setFiscalYear: (state, action) => {
      state.fiscal_year = action.payload;
    },
    clearFiscalYear: (state) => {
      state.fiscal_year = initialState.fiscal_year;
      (state.fiscal_start_date = ''),
        (state.fiscal_end_date = ''),
        (state.academic_year_id = '');
    },
    toggleAddFiscalYear(state) {
      state.isAddingFiscalYear = !state.isAddingFiscalYear;
      state.fiscal_year = initialState.fiscal_year;
    },
    toggleEditFiscalYear(state) {
      state.isEditingFiscalYear = !state.isEditingFiscalYear;
      state.fiscal_year = initialState.fiscal_year;
    },
    setDynamicData: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    toggleCreateChartOfAccount: (state) => {
      state.createChartOfAccountStatus = !state.createChartOfAccountStatus;
    },
    setChartOfAccount: (state, { payload }) => {
      state.fiscalYear = payload.fiscalYear;
      state.editChartOfAccountId = payload._id;
      state.chart_of_account = initialState.chart_of_account;
      state.chart_of_account = payload;
    },
    setChartAccount: (state, { payload }) => {
      state.chart_of_account = payload;
    },
    toggleListView: (state) => {
      state.gridView = false;
      state.listView = true;
    },
    toggleGridView: (state) => {
      state.gridView = true;
      state.listView = false;
    },
    toggleEditChartOfAccount: (state) => {
      state.editChartOfAccount = !state.editChartOfAccount;
    },
    clearChartOfAccount: (state) => {
      state.chart_of_account = initialState.chart_of_account;
      state.chart_of_account = '';
      state.fiscalYear = '';
      state.editChartOfAccountId = '';
    },
    setChartOfAccountId: (state, { payload }) => {
      state.chart_of_account_id = payload;
      addChartOfAccountIdToLocalStorage(payload);
    },
    resetChartOfAccountId: (state) => {
      state.chart_of_account_id = '';
      removeChartOfAccountIdFromLocalStorage();
    },
    toggleCreateAccount: (state) => {
      state.createAccountStatus = !state.createAccountStatus;
    },
    toggleEditAccount: (state) => {
      state.editAccount = !state.editAccount;
    },
    resetAccount: (state) => {
      state.account = initialState.account;
    },
    setAccountDuplicate: (state, payload) => {
      state.account_duplicate = payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    // Account Type
    toggleCreateAccountType: (state) => {
      state.createAccountTypeStatus = !state.createAccountTypeStatus;
    },
    getAccountType: (state, action) => {
      state.account_type = action.payload;
    },
    setAccountType: (state, action) => {
      state.account_type = action.payload;
    },
    toggleEditAccountType: (state) => {
      state.editAccountType = !state.editAccountType;
    },
    resetAccountType: (state) => {
      state.account_type = initialState.account_type;
    },
    // category
    resetCategory: (state) => {
      state.detailType = '';
    },
    toggleCreateCategoryType: (state) => {
      state.createAccountCategoryStatus = !state.createAccountCategoryStatus;
    },
    toggleEditCategoryType: (state) => {
      state.editAccountCategory = !state.editAccountCategory;
    },
    resetCategoryType: (state) => {
      state.account_category = initialState.account_category;
    },

    setCategoryType: (state, action) => {
      state.account_category = action.payload;
    },
    // Detail
    toggleCreateDetailType: (state) => {
      state.createDetailTypeStatus = !state.createDetailTypeStatus;
    },
    toggleEditDetailType: (state) => {
      state.editDetailType = !state.editDetailType;
    },
    resetDetailType: (state) => {
      state.detail_type = initialState.detail_type;
    },
    setDetailType: (state, action) => {
      state.detail_type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeesForApproval.pending, (state) => {
        state.isSubmittingFees = true;
      })
      .addCase(submitFeesForApproval.fulfilled, (state, { payload }) => {
        state.isSubmittingFees = false;
        state.viewingDraftFee = false;
        state.fees = [];
        state.academic_year = '';
        toast.success(payload.msg);
      })
      .addCase(submitFeesForApproval.rejected, (state, { payload }) => {
        state.isSubmittingFees = false;
        toast.error(payload.msg);
      })
      .addCase(getAllFiscalYears.pending, (state) => {
        state.isFetchingFiscalYears = true;
      })
      .addCase(getAllFiscalYears.fulfilled, (state, { payload }) => {
        state.isFetchingFiscalYears = false;
        state.fiscal_years = payload.fiscal_years;
        state.activeFiscalYear = payload.fiscal_years.find(
          (fiscal_year) => fiscal_year?.remarks === 'Current'
        );
        state.nextFiscalYear = payload.fiscal_years.find(
          (fiscal_year) => fiscal_year?.remarks === 'Next Term'
        );
      })
      .addCase(getAllFiscalYears.rejected, (state) => {
        state.isFetchingFiscalYears = false;
      })
      .addCase(getFiscalYear.pending, (state) => {
        state.isFetchingAcademicYear = true;
      })
      .addCase(getFiscalYear.fulfilled, (state, { payload }) => {
        state.isFetchingAcademicYear = false;
        state.fiscal_year = payload.fiscal_year;
      })
      .addCase(getFiscalYear.rejected, (state) => {
        state.isFetchingAcademicYear = false;
      })
      .addCase(addFiscalYear.pending, (state) => {
        state.isCreatingFiscalYear = true;
      })
      .addCase(addFiscalYear.fulfilled, (state) => {
        state.isCreatingFiscalYear = false;
        state.isAddingFiscalYear = false;
        state.fiscal_year = initialState.fiscal_year;
        toast.success('Fiscal Year successfully added!');
      })
      .addCase(addFiscalYear.rejected, (state, { payload }) => {
        state.isCreatingFiscalYear = false;
        toast.error(payload);
      })
      .addCase(setCurrentFiscalYear.pending, (state) => {
        state.isUpdatingFiscalYear = true;
      })
      .addCase(setCurrentFiscalYear.fulfilled, (state) => {
        state.isUpdatingFiscalYear = false;
        toast.success('Fiscal Year has been set!');
      })
      .addCase(setCurrentFiscalYear.rejected, (state, { payload }) => {
        state.isUpdatingFiscalYear = false;
        toast.error(payload);
      })
      .addCase(updateFiscalYear.pending, (state) => {
        state.isUpdatingFiscalYear = true;
      })
      .addCase(updateFiscalYear.fulfilled, (state) => {
        state.isUpdatingFiscalYear = false;
        state.isAddingFiscalYear = false;
        state.fiscal_year = initialState.fiscal_year;
        toast.success('Fiscal Year successfully updated!');
      })
      .addCase(updateFiscalYear.rejected, (state, { payload }) => {
        state.isUpdatingFiscalYear = false;
        toast.error(payload);
      })
      .addCase(fetchAllChartOfAccounts.pending, (state) => {
        state.isFetchingChartOfAccounts = true;
      })
      .addCase(fetchAllChartOfAccounts.fulfilled, (state, { payload }) => {
        state.isFetchingChartOfAccounts = false;
        state.chart_of_accounts = payload.chart_of_accounts;
      })
      .addCase(fetchAllChartOfAccounts.rejected, (state) => {
        state.isFetchingChartOfAccounts = false;
      })
      .addCase(createChartOfAccount.pending, (state) => {
        state.isCreatingChartOfAccount = true;
      })
      .addCase(createChartOfAccount.fulfilled, (state, { payload }) => {
        state.isCreatingChartOfAccount = false;
        state.chart_of_account = '';
        toast.success(payload.msg);
      })
      .addCase(createChartOfAccount.rejected, (state, { payload }) => {
        state.isCreatingChartOfAccount = false;
        toast.error(payload.msg);
      })
      .addCase(updateChartOfAccount.pending, (state) => {
        state.isUpdatingChartOfAccount = true;
      })
      .addCase(updateChartOfAccount.fulfilled, (state, { payload }) => {
        state.isUpdatingChartOfAccount = false;
        state.editChartOfAccount = false;
        state.fiscalYear = '';
        state.chart_of_account = payload.chart_of_account;
        toast.success('Chart of Account is successfully updated!');
      })
      .addCase(updateChartOfAccount.rejected, (state, { payload }) => {
        state.isUpdatingChartOfAccount = false;
        toast.error(payload.msg);
      })
      .addCase(getChartOfAccount.pending, (state) => {
        state.isUpdatingChartOfAccount = true;
      })
      .addCase(getChartOfAccount.fulfilled, (state, { payload }) => {
        state.isFetchingChartOfAccounts = false;
        state.chart_of_account = payload.chart_of_account;
        state.chart_of_account = initialState.chart_of_account;
      })
      .addCase(getChartOfAccount.rejected, (state) => {
        state.isFetchingChartOfAccounts = false;
      })
      .addCase(deleteChartOfAccount.pending, (state) => {
        state.isDeletingChartOfAccount = true;
      })
      .addCase(deleteChartOfAccount.fulfilled, (state, { payload }) => {
        state.isDeletingChartOfAccount = false;
        toast.success(payload.msg);
      })
      .addCase(deleteChartOfAccount.rejected, (state) => {
        state.isDeletingChartOfAccount = false;
        toast.error('Error deleting Chart of Account');
      })
      .addCase(getAllAccountTypes.pending, (state) => {
        state.isFetchingAccountTypes = true;
      })
      .addCase(getAllAccountTypes.fulfilled, (state, { payload }) => {
        state.isFetchingAccountTypes = false;
        state.account_types = payload.account_types;
      })
      .addCase(getAllAccountTypes.rejected, (state) => {
        state.isFetchingAccountTypes = false;
      })
      .addCase(getAccountType.pending, (state) => {
        state.isFetchingAccountType = true;
      })
      .addCase(getAccountType.fulfilled, (state, { payload }) => {
        state.isFetchingAccountType = false;
        state.account_type = payload.account_type;
      })
      .addCase(getAccountType.rejected, (state) => {
        state.isFetchingAccountType = false;
      })
      .addCase(createAccountType.pending, (state) => {
        state.isCreatingAccountType = true;
      })
      .addCase(createAccountType.fulfilled, (state, { payload }) => {
        state.isCreatingAccountType = false;
        state.account_type = '';
        toast.success(payload.msg);
      })
      .addCase(createAccountType.rejected, (state, { payload }) => {
        state.isCreatingAccountType = false;
        toast.error(payload.msg);
      })
      .addCase(updateAccountType.pending, (state) => {
        state.isUpdatingAccountType = true;
      })
      .addCase(updateAccountType.fulfilled, (state, { payload }) => {
        state.isUpdatingAccountType = false;
        state.account_type = initialState.account_type;
        toast.success(payload.msg);
      })
      .addCase(updateAccountType.rejected, (state, { payload }) => {
        state.isUpdatingAccountType = false;
        toast.error(payload.msg);
      })
      .addCase(deleteAccountType.pending, (state) => {
        state.isDeletingAccountType = true;
      })
      .addCase(deleteAccountType.fulfilled, (state, { payload }) => {
        state.isDeletingAccountType = false;
        toast.success(payload.msg);
      })
      .addCase(deleteAccountType.rejected, (state, { payload }) => {
        state.isDeletingAccountType = false;
        toast.error(payload.msg);
      })
      .addCase(createAccount.pending, (state) => {
        state.isCreatingAccount = true;
      })
      .addCase(createAccount.fulfilled, (state, { payload }) => {
        state.isCreatingAccount = false;
        state.account = '';
        toast.success(payload.msg);
      })
      .addCase(createAccount.rejected, (state, { payload }) => {
        state.isCreatingAccount = false;
        toast.error(payload.msg);
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.isFetchingAccounts = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, { payload }) => {
        state.isFetchingAccounts = false;
        state.accounts = payload.accounts;
      })
      .addCase(getAllAccounts.rejected, (state) => {
        state.isFetchingAccounts = false;
      })
      .addCase(getAccount.pending, (state) => {
        state.isFetchingAccount = true;
      })
      .addCase(getAccount.fulfilled, (state, { payload }) => {
        state.isFetchingAccount = false;
        state.account = payload.account;
      })
      .addCase(getAccount.rejected, (state) => {
        state.isFetchingAccount = false;
      })
      .addCase(updateAccount.pending, (state) => {
        state.isUpdatingAccount = true;
      })
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        state.isUpdatingAccount = false;
        state.account = initialState.account;
        toast.success('Account successfully updated!');
      })
      .addCase(updateAccount.rejected, (state, { payload }) => {
        state.isUpdatingAccount = false;
        toast.error(payload.msg);
      })
      .addCase(getAllAccountCategories.pending, (state) => {
        state.isFetchingAccountCategory = true;
      })
      .addCase(getAllAccountCategories.fulfilled, (state, { payload }) => {
        state.isFetchingAccountCategory = false;
        state.account_categories = payload.account_categories;
      })
      .addCase(getAllAccountCategories.rejected, (state) => {
        state.isFetchingAccountCategory = false;
      })
      .addCase(deleteAccountCategory.pending, (state) => {
        state.isDeletingAccountCategory = true;
      })
      .addCase(deleteAccountCategory.fulfilled, (state, { payload }) => {
        state.isDeletingAccountCategory = false;
        toast.success(payload.msg);
      })
      .addCase(deleteAccountCategory.rejected, (state, { payload }) => {
        state.isDeletingAccountCategory = false;
        toast.error(payload.msg);
      })
      .addCase(getAccountCategory.pending, (state) => {
        state.isFetchingAccountCategory = true;
      })
      .addCase(getAccountCategory.fulfilled, (state, { payload }) => {
        state.isFetchingAccountCategory = false;
        state.account_category = payload.account_category;
      })
      .addCase(getAccountCategory.rejected, (state) => {
        state.isFetchingAccountCategory = false;
      })
      .addCase(createAccountCategory.pending, (state) => {
        state.isCreatingAccountCategory = true;
      })
      .addCase(createAccountCategory.fulfilled, (state, { payload }) => {
        state.isCreatingAccountCategory = false;
        state.account_category = '';
        toast.success(payload.msg);
      })
      .addCase(createAccountCategory.rejected, (state, { payload }) => {
        state.isCreatingAccountCategory = false;
        toast.error(payload.msg);
      })
      .addCase(updateAccountCategory.pending, (state) => {
        state.isUpdatingAccountCategory = true;
      })
      .addCase(updateAccountCategory.fulfilled, (state, { payload }) => {
        state.isUpdatingAccountCategory = false;
        state.account_category = initialState.account_category;
        toast.success(payload.msg);
      })
      .addCase(updateAccountCategory.rejected, (state, { payload }) => {
        state.isUpdatingAccountCategory = false;
        toast.error(payload.msg);
      })

      .addCase(deleteAccount.pending, (state) => {
        state.isDeletingAccount = true;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.isDeletingAccount = false;
        toast.success(payload.msg);
      })
      .addCase(deleteAccount.rejected, (state, { payload }) => {
        state.isDeletingAccount = false;
        toast.error(payload.msg);
      })
      .addCase(getAllDetailTypes.pending, (state) => {
        state.isFetchingDetailTypes = true;
      })
      .addCase(getAllDetailTypes.fulfilled, (state, { payload }) => {
        state.isFetchingDetailTypes = false;
        state.detail_types = payload.detail_types;
      })
      .addCase(getAllDetailTypes.rejected, (state) => {
        state.isFetchingDetailTypes = false;
      })
      .addCase(getDetailType.pending, (state) => {
        state.isFetchingDetailTypes = true;
      })
      .addCase(getDetailType.fulfilled, (state, { payload }) => {
        state.isFetchingDetailTypes = false;
        state.detail_type = payload.detail_type;
      })
      .addCase(getDetailType.rejected, (state) => {
        state.isFetchingDetailTypes = false;
      })
      .addCase(createDetailType.pending, (state) => {
        state.isCreatingDetailType = true;
      })
      .addCase(createDetailType.fulfilled, (state, { payload }) => {
        state.isCreatingDetailType = false;
        state.detail_type = '';
        toast.success(payload.msg);
      })
      .addCase(createDetailType.rejected, (state, { payload }) => {
        state.isCreatingDetailType = false;
        toast.error(payload.msg);
      })
      .addCase(updateDetailType.pending, (state) => {
        state.isUpdatingDetailType = true;
      })
      .addCase(updateDetailType.fulfilled, (state, { payload }) => {
        state.isUpdatingDetailType = false;
        state.detail_type = initialState.detail_type;
        toast.success(payload.msg);
      })
      .addCase(updateDetailType.rejected, (state, { payload }) => {
        state.isUpdatingDetailType = false;
        toast.error(payload.msg);
      })

      .addCase(deleteDetailType.pending, (state) => {
        state.isDeletingDetailType = true;
      })
      .addCase(deleteDetailType.fulfilled, (state, { payload }) => {
        state.isDeletingDetailType = false;
        toast.success(payload.msg);
      })
      .addCase(deleteDetailType.rejected, (state, { payload }) => {
        state.isDeletingDetailType = false;
        toast.error(payload.msg);
      });
  },
});

export const {
  handleChange,
  toggleAddDraftFee,
  toggleViewDraftFee,
  setFiscalYear,
  clearFiscalYear,
  toggleAddFiscalYear,
  toggleEditFiscalYear,
  setDynamicData,
  toggleGridView,
  toggleListView,
  toggleCreateChartOfAccount,
  toggleEditChartOfAccount,
  clearChartOfAccount,
  setChartOfAccount,
  toggleCreateAccount,
  toggleEditAccount,
  setChartAccount,
  setChartOfAccountId,
  resetChartOfAccountId,
  resetAccount,
  resetCategory,
  setAccountDuplicate,
  resetAccountType,
  toggleCreateCategoryType,
  toggleEditCategoryType,
  resetCategoryType,
  setCategoryType,
  toggleCreateAccountType,
  setAccountType,
  toggleEditAccountType,
  toggleCreateDetailType,
  toggleEditDetailType,
  resetDetailType,
  setDetailType,
  setAccount,
} = accountingSlice.actions;

export default accountingSlice.reducer;
