import {
  fetchAllChartOfAccounts,
  getAllAccountCategories,
  getAllAccountTypes,
  getAllAccounts,
  getAllDetailTypes,
  getAllFiscalYears,
} from 'src/features/accountingFeatures/accountingSlice';
import { fetchAllFees } from 'src/features/financeFeatures/financeSlice';
import adalFetch from 'src/utils/axios';
import { getTuitionAndFeeIdFromLocalStorage } from 'src/utils/localStorage';

export const submitFeesForApprovalThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, data);
    const tuition_and_fee_id = getTuitionAndFeeIdFromLocalStorage();
    if (tuition_and_fee_id) thunkAPI.dispatch(fetchAllFees(tuition_and_fee_id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllFiscalYearThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addFiscalYearThunk = async (url, fiscal_year, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, fiscal_year);
    thunkAPI.dispatch(getAllFiscalYears());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteFiscalYearThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllFiscalYears());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const setFiscalYearThunk = async (url, fiscal_year, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, { id: fiscal_year });
    thunkAPI.dispatch(getAllFiscalYears());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateFiscalYearThunk = async (url, fiscal_year, thunkAPI) => {
  try {
    const response = await adalFetch.put(url, fiscal_year);
    thunkAPI.dispatch(getAllFiscalYears());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllChartOfAccountsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createChartOfAccountThunk = async (
  url,
  chartOfAccount,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, chartOfAccount);
    thunkAPI.dispatch(fetchAllChartOfAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateChartOfAccountThunk = async (
  url,
  chartOfAccount,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, chartOfAccount);
    thunkAPI.dispatch(fetchAllChartOfAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteChartOfAccountThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(fetchAllChartOfAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllAccountTypesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createAccountTypeThunk = async (url, accountType, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, accountType);
    thunkAPI.dispatch(getAllAccountTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateAccountTypeThunk = async (url, accountType, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, accountType);
    thunkAPI.dispatch(getAllAccountTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteAccountTypeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllAccountTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllAccountsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createAccountThunk = async (url, account, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, account);
    thunkAPI.dispatch(getAllAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateAccountThunk = async (url, account, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, account);
    thunkAPI.dispatch(getAllAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteAccountThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllAccounts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllCategoryTypesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createCategoryTypeThunk = async (
  url,
  account_category,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, account_category);
    thunkAPI.dispatch(getAllAccountCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCategoryTypeThunk = async (
  url,
  account_category,
  thunkAPI
) => {
  try {
    const response = await adalFetch.patch(url, account_category);
    thunkAPI.dispatch(getAllAccountCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteCategoryTypeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllAccountCategories());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const fetchAllDetailTypesThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const createDetailTypeThunk = async (url, detail_type, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, detail_type);
    thunkAPI.dispatch(getAllDetailTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateDetailTypeThunk = async (url, detail_type, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, detail_type);
    thunkAPI.dispatch(getAllDetailTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteDetailTypeThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    thunkAPI.dispatch(getAllDetailTypes());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
