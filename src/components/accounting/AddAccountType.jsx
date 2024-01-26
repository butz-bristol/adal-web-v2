import {
  Box,
  Button,
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createAccountType,
  resetAccountType,
  setAccountType,
  toggleCreateAccountType,
  toggleEditAccountType,
  updateAccountType,
} from 'src/features/accountingFeatures/accountingSlice';
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

const AddAccountType = () => {
  const {
    editAccount,
    createAccountTypeStatus,
    category_name,
    category_status,
    isUpdatingAccountType,
    isCreatingAccountType,
    category_description,
    category_code,
    account_type,
    account_types,
    account_category,
    editAccountType,
    account_categories,
  } = useSelector((state) => state.accounting);
  const dispatch = useDispatch();

  const accountTypeExists = account_types?.find((account) => {
    return (
      !account?.isArchived &&
      account?.account_type_name === account_type?.account_type_name &&
      account?.accountCategory_id?._id === account_type?.accountCategory_id
    );
  });

  const handleInput = (e) => {
    dispatch(
      setAccountType({ ...account_type, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!account_type?.account_type_name) {
        toast.error('Account Type Name is required');
        return;
      }

      if (!account_type?.accountCategory_id) {
        toast.error('Account Type Category Code is required');
        return;
      }

      if (!account_type?.account_type_status) {
        toast.error('Account Type Status is required');
        return;
      }

      if (!editAccountType && accountTypeExists) {
        toast.error('Account Type already exists');
        return;
      }

      if (editAccountType) {
        dispatch(updateAccountType({ ...account_type }));
        handleClose();
        return;
      }

      dispatch(
        createAccountType({
          ...account_type,
        })
      );
      return handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const filteredAccountCategories = account_categories.filter(
    (category) => !category.isArchived
  );

  const handleClose = () => {
    createAccountTypeStatus
      ? dispatch(toggleCreateAccountType())
      : dispatch(toggleEditAccountType());
    dispatch(resetAccountType());
  };

  return (
    <Modal
      open={createAccountTypeStatus || editAccountType}
      onClose={handleClose}
    >
      <Paper sx={{ ...styles, maxHeight: '90vh', overflowY: 'scroll' }}>
        <Typography variant="h4" gutterBottom>
          {editAccount ? 'Edit Account Type' : 'Add Account Type'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Account Type"
                  id="account_type_name"
                  variant="outlined"
                  value={account_type?.account_type_name || ''}
                  name="account_type_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-accountCategory_id">
                  Choose Category{' '}
                </InputLabel>
                <Select
                  labelId="choose-a-accountCategory_id"
                  id="choose-accountCategory_id"
                  value={account_type?.accountCategory_id || ''}
                  name="accountCategory_id"
                  label="Choose Category"
                  onChange={handleInput}
                >
                  {filteredAccountCategories.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type?.account_category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Account Description"
                  id="account_type_description"
                  variant="outlined"
                  value={account_type?.account_type_description || ''}
                  name="account_type_description"
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-account_category_status">
                  Status
                </InputLabel>
                <Select
                  labelId="choose-a-account_category_status"
                  id="account_category_status"
                  value={account_type?.account_type_status || ''}
                  name="account_type_status"
                  label="Status"
                  onChange={handleInput}
                  required
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
                  disabled={
                    !editAccountType &&
                    !account_type?.account_type_name &&
                    !account_type?.accountCategory_id
                  }
                >
                  {createAccountTypeStatus ? 'Submit' : 'Update'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddAccountType;
