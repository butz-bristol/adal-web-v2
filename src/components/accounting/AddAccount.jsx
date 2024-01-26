import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createAccount,
  resetAccount,
  setAccount,
  toggleCreateAccount,
  toggleEditAccount,
  updateAccount,
} from 'src/features/accountingFeatures/accountingSlice';
import { formatMonthDay } from 'src/utils/dateFunctions';
import styles from '../modalBoxStyle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const AddAccount = () => {
  const {
    account_types,
    chart_of_account_id,
    chart_of_accounts,
    accountType,
    account_name,
    account_code,
    account_description,
    createAccountStatus,
    editAccount,
    account_balance,
    accountStatus,
    isCreatingAccount,
    isUpdatingAccount,
    account,
    accounts,
    detail_types,
    account_categories,
    categoryType,
    detailType,
  } = useSelector((state) => state.accounting);
  const dispatch = useDispatch();
  const chart_of_accounts_sort = chart_of_accounts.find(
    (chart_of_account) => chart_of_account._id === chart_of_account_id
  );
  const [accountTypeId, setAccountTypeId] = useState();
  const [detailTypeId, setDetailTypeId] = useState();
  const startDate = formatMonthDay(
    chart_of_accounts_sort?.fiscalYear?.start_date
  );
  const endDate = formatMonthDay(chart_of_accounts_sort?.fiscalYear?.end_date);

  const accountExists = accounts?.find((account_list) => {
    return (
      !account_list.isArchived &&
      String(account_list?.account_code) === String(account?.account_code) &&
      account_list?.account_name === account?.account_name &&
      account_list?.account_category?._id === account?.account_category &&
      account_list?.account_type?._id === account?.account_type &&
      account_list?.detail_type?._id === account?.detail_type
    );
  });

  const handleInput = (e) => {
    const data = { ...account };
    if (e.target.name === 'account_category') {
      setAccountTypeId(e.target.value);
      delete data.account_type;
      delete data.detail_type;
    }
    if (e.target.name === 'account_type') {
      setDetailTypeId(e.target.value);
      delete data.detail_type;
    }
    dispatch(setAccount({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!account?.account_code) {
        toast.error('Account Code is required');
        return;
      }

      if (!account?.account_name) {
        toast.error('Account Name is required');
        return;
      }

      if (!account?.account_category) {
        toast.error('Account Category is required');
        return;
      }

      if (!account?.account_type) {
        toast.error('Account Type is required');
        return;
      }

      if (!account?.detail_type) {
        toast.error('Detail Type is required');
        return;
      }

      if (!account?.account_status) {
        toast.error('Account Status is required');
        return;
      }

      if (!editAccount && accountExists) {
        toast.error('Account already exists');
        return;
      }

      if (editAccount) {
        dispatch(
          updateAccount({
            ...account,
          })
        );
        return handleClose();
      }
      dispatch(
        createAccount({
          ...account,
          chart_of_account_id: chart_of_account_id,
        })
      );
      return handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    createAccountStatus
      ? dispatch(toggleCreateAccount())
      : dispatch(toggleEditAccount());
    dispatch(resetAccount());
  };

  const filteredAccountType = account_types.filter((types) => {
    if (
      (types?.accountCategory_id?._id === accountTypeId ||
        types?.accountCategory_id?._id === account?.account_category) &&
      !types?.isArchived
    ) {
      return account;
    }
    return 0;
  });

  const filteredDetailType = detail_types.filter((detail) => {
    if (
      (detail?.accountType_id?._id === detailTypeId ||
        detail?._id === account?.detail_type) &&
      !detail?.isArchived
    ) {
      {
        return detail;
      }
    }
    return 0;
  });

  const filteredAccountCategory = account_categories.filter((account) => {
    return !account?.isArchived;
  });

  return (
    <Modal open={createAccountStatus || editAccount} onClose={handleClose}>
      <Paper sx={{ ...styles, maxHeight: '90vh', overflowY: 'scroll' }}>
        <Typography variant="h4" gutterBottom>
          {editAccount ? 'Edit Account' : 'Add Account'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Account Code"
                  id="account_code"
                  variant="outlined"
                  value={account?.account_code || ''}
                  name="account_code"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Account Name"
                  id="account_name"
                  variant="outlined"
                  value={account?.account_name || ''}
                  name="account_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-account_category">
                  Choose Account Category
                </InputLabel>
                <Select
                  labelId="choose-a-account_category"
                  id="choose-account_category"
                  value={account?.account_category || ''}
                  name="account_category"
                  label="Choose Account Category"
                  onChange={handleInput}
                >
                  {filteredAccountCategory.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.account_category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Start Date & End Date"
                  variant="outlined"
                  value={`${startDate} - ${endDate}` || ''}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-account_type">
                  Choose Account Type
                </InputLabel>
                <Select
                  labelId="choose-a-account_type"
                  id="choose-account_type"
                  value={account?.account_type || ''}
                  name="account_type"
                  label="Choose Account Type"
                  onChange={handleInput}
                >
                  {filteredAccountType?.map((type) => (
                    <MenuItem key={type?._id} value={type?._id}>
                      {type?.account_type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Year"
                  variant="outlined"
                  value={
                    chart_of_accounts_sort?.fiscalYear?.academic_year
                      ?.school_year || ''
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-detail_type">
                  Choose Detail Type
                </InputLabel>
                <Select
                  labelId="choose-a-detail_type"
                  id="choose-detail_type"
                  value={account?.detail_type || ''}
                  name="detail_type"
                  label="Choose Detail Type"
                  onChange={handleInput}
                >
                  {filteredDetailType?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.detail_type_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Starting Balance"
                  variant="outlined"
                  name="account_balance"
                  value={account?.account_balance || ''}
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Account Description"
                  id="account_description"
                  variant="outlined"
                  value={account?.account_description || ''}
                  name="account_description"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-accountStatus">Status</InputLabel>
                <Select
                  labelId="choose-a-accountStatus"
                  id="choose-accountStatus"
                  value={account?.account_status || ''}
                  name="account_status"
                  label="Choose Status"
                  onChange={handleInput}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  disabled={isUpdatingAccount || isCreatingAccount}
                >
                  {isUpdatingAccount || isCreatingAccount ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddAccount;
