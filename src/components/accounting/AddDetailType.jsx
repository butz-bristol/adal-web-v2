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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createDetailType,
  resetDetailType,
  setDetailType,
  toggleCreateDetailType,
  toggleEditDetailType,
  updateDetailType,
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

const AddDetailType = () => {
  const {
    editAccount,
    createDetailTypeStatus,
    category_name,
    category_status,
    isUpdatingDetailType,
    isCreatingDetailType,
    category_description,
    category_code,
    detail_type,
    detail_types,
    account_types,
    account_category,
    editDetailType,
    account_categories,
  } = useSelector((state) => state.accounting);
  const [accountCategoryId, setAccountCategoryId] = useState();
  const dispatch = useDispatch();

  const detailTypeExists = detail_types?.find((detail) => {
    return (
      !detail?.isArchived &&
      detail?.detail_type_name === detail_type?.detail_type_name &&
      detail?.accountCategory_id?._id === detail_type?.accountCategory_id &&
      detail?.accountCategory_id?._id === detail_type?.accountCategory_id
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!detail_type?.detail_type_name) {
        toast.error('Detail Type Name is required');
        return;
      }

      if (!detail_type?.accountCategory_id) {
        toast.error('Detail Type Category Code is required');
        return;
      }

      if (!detail_type?.accountType_id) {
        toast.error('Detail Type Status is required');
        return;
      }

      if (!editDetailType && detailTypeExists) {
        toast.error('Detail Type already exists');
        return;
      }

      if (editDetailType) {
        dispatch(updateDetailType({ ...detail_type }));
        handleClose();
        return;
      }

      dispatch(
        createDetailType({
          ...detail_type,
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

  const filteredAccountTypes = account_types.filter((account) => {
    return (
      (account?.accountCategory_id?._id === accountCategoryId &&
        !account.isArchived) ||
      (account?.accountCategory_id?._id === detail_type?.accountCategory_id &&
        !account.isArchived)
    );
  });

  const handleInput = (e) => {
    const data = { ...detail_type };
    if (e.target.name === 'accountCategory_id') {
      setAccountCategoryId(e.target.value);
      delete data.accountType_id;
    }
    dispatch(setDetailType({ ...data, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    createDetailTypeStatus
      ? dispatch(toggleCreateDetailType())
      : dispatch(toggleEditDetailType());
    dispatch(resetDetailType());
  };

  return (
    <Modal
      open={createDetailTypeStatus || editDetailType}
      onClose={handleClose}
    >
      <Paper sx={{ ...styles, maxHeight: '90vh', overflowY: 'scroll' }}>
        <Typography variant="h4" gutterBottom>
          {editAccount ? 'Edit Detail Type' : 'Add Detail Type'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Detail Type"
                  id="account_type_name"
                  variant="outlined"
                  value={detail_type?.detail_type_name || ''}
                  name="detail_type_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-accountCategory_id">
                  Choose Account Category
                </InputLabel>
                <Select
                  labelId="choose-a-accountCategory_id"
                  id="choose-accountCategory_id"
                  value={detail_type?.accountCategory_id || ''}
                  name="accountCategory_id"
                  label="Choose Account Category"
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
              <FormControl fullWidth>
                <InputLabel id="choose-a-accountCategory_id">
                  Choose Account Type
                </InputLabel>
                <Select
                  labelId="choose-a-accountCategory_id"
                  id="choose-accountCategory_id"
                  value={detail_type?.accountType_id || ''}
                  name="accountType_id"
                  label="Choose Category Type"
                  onChange={handleInput}
                >
                  {filteredAccountTypes.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {String(type?.account_type_name)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Detail Description"
                  id="account_type_description"
                  variant="outlined"
                  value={detail_type?.detail_type_description || ''}
                  name="detail_type_description"
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
                  value={detail_type?.detail_type_status || ''}
                  name="detail_type_status"
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
                    editDetailType &&
                    !detail_type?.accountCategory_id &&
                    !detail_type?.accountType_id &&
                    !detail_type?.detail_type_name
                  }
                >
                  {createDetailTypeStatus ? 'Submit' : 'Update'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddDetailType;
