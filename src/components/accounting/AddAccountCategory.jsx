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
  createAccountCategory,
  resetCategoryType,
  setCategoryType,
  toggleCreateCategoryType,
  toggleEditCategoryType,
  updateAccountCategory,
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
    createAccountCategoryStatus,
    editAccountCategory,

    account_categories,
    account_category,
  } = useSelector((state) => state.accounting);
  const dispatch = useDispatch();

  const accountCategoryExists = account_categories?.find((category) => {
    return (
      !category.isArchived &&
      category?.account_category_name ===
        account_category?.account_category_name
    );
  });

  const handleInput = (e) => {
    dispatch(
      setCategoryType({ ...account_category, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!account_category?.account_category_name) {
        toast.error('Account Category Name Type is required');
        return;
      }

      if (!account_category?.account_category_status) {
        toast.error('Account Category Status Type is required');
        return;
      }

      if (!editAccountCategory && accountCategoryExists) {
        toast.error('Category Type already exists');
        return;
      }

      if (editAccountCategory) {
        dispatch(updateAccountCategory({ ...account_category }));
        handleClose();
        return;
      }

      dispatch(
        createAccountCategory({
          ...account_category,
        })
      );
      return handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    createAccountCategoryStatus
      ? dispatch(toggleCreateCategoryType())
      : dispatch(toggleEditCategoryType());
    dispatch(resetCategoryType());
  };

  return (
    <Modal
      open={createAccountCategoryStatus || editAccountCategory}
      onClose={handleClose}
    >
      <Paper sx={{ ...styles, maxHeight: '90vh', overflowY: 'scroll' }}>
        <Typography variant="h4" gutterBottom>
          {editAccount ? 'Edit Category' : 'Add Category'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Category Name"
                  id="account_category_name"
                  variant="outlined"
                  value={account_category?.account_category_name || ''}
                  name="account_category_name"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <TextField
                  label="Category Description"
                  id="category_details"
                  variant="outlined"
                  value={account_category?.account_category_description || ''}
                  name="account_category_description"
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
                  value={account_category?.account_category_status || ''}
                  name="account_category_status"
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
                    !editAccountCategory &&
                    !account_category?.account_category_name
                  }
                >
                  {createAccountCategoryStatus ? 'Submit' : 'Update'}
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
