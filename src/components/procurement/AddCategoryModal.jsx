import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForm,
  createCategory,
  getAllCategories,
  handleChange,
  toggleCreateCategory,
  toggleEditCategory,
  updateCategory,
} from 'src/features/procurementFeatures/categories/categoriesSlice';

import { useEffect } from 'react';

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const {
    categoryName,
    categories,
    isCreatingCategory,
    editCategory,
    createCategoryStatus,
    categoryId,
    isEditingCategory,
  } = useSelector((state) => state.categories);
  const { departments } = useSelector((state) => state.coreHr);
  const { userProfile } = useSelector((state) => state.users);
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user).userId;
  const department = departments.find(
    (department) => department._id === userProfile.admin_department
  );

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCategory) {
      dispatch(
        updateCategory({
          categoryId,
          categoryName,
        })
      );
      dispatch(toggleEditCategory());
      setTimeout(() => {
        dispatch(clearForm());
      }, 1500);
      return;
    }

    dispatch(
      createCategory({
        categoryName,
        categoryId,
      })
    );

    setTimeout(() => {
      dispatch(clearForm());
      dispatch(toggleCreateCategory());
    }, 1500);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <Modal
      open={createCategoryStatus || editCategory}
      onClose={() => {
        createCategoryStatus
          ? dispatch(toggleCreateCategory())
          : dispatch(toggleEditCategory());
        dispatch(clearForm());
      }}
      container={() => document.getElementById('root')}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '95%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        <form>
          <Grid container spacing={2} p={2} columns={1}>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  label="Name"
                  id="categoryName"
                  variant="outlined"
                  value={categoryName}
                  name="categoryName"
                  onChange={handleInput}
                  required
                  style={{ width: '30vw' }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: editCategory ? 1 : 2 }}
                  onClick={handleSubmit}
                  disabled={isCreatingCategory || isEditingCategory}
                  fullWidth
                >
                  {editCategory ? 'Update Category' : 'Register Category'}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
};

export default AddCategoryModal;
