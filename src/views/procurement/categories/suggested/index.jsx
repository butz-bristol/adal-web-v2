import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationButtons from 'src/components/procurement/PaginationButtons';
import {
  changePage,
  createCategory,
  getAllCategories,
  getSuggestedCategories,
} from 'src/features/procurementFeatures/categories/categoriesSlice';
import {
  getItem,
  updateItem,
} from 'src/features/procurementFeatures/items/itemsSlice';

const SuggestedCategories = () => {
  const {
    isCreatingCategory,
    isEditingCategory,
    isDeletingCategory,
    createCategoryStatus,
    categories,
    totalPages,
    page,
    categoriesPerPage,
    suggestedCategories,
    suggestedCategoriesperPage,
  } = useSelector((state) => state.categories);

  const {
    isEditingItem,
    isCreatingItem,
    editItem,
    createItemStatus,
    item_id,
    item_name,
    supplier,
    item_price,
    item_image,
    item_status,
    quantity,
    model_no,
    brand,
    item_serial_no,
    date_purchased,
    type,
    editItemId,
    suggestedCategory,
    category,
    item,
  } = useSelector((state) => state.items);
  const [query, setQuery] = useState('');
  const [declineCategoryId, setDeclineCategoryId] = useState(null);
  const [newCategoryEntered, setNewCategoryEntered] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleDecline = (categoryId) => {
    setDeclineCategoryId(categoryId);
  };

  const handleChangeOfficialCategory = async (event, categoryId) => {
    event.preventDefault();
    if (event.target.value === '*Enter New Category') {
      setNewCategoryEntered(true);
    } else {
      dispatch(
        updateItem({
          item_id: categoryId,
          suggestedCategory: '',
          category: event.target.value,
        })
      ).then(() => {
        setDeclineCategoryId(null);
        dispatch(getSuggestedCategories());
      });
    }
  };

  const handleNewCategorySubmit = (categoryId) => {
    if (newCategory.trim()) {
      dispatch(createCategory({ categoryName: newCategory }))
        .then(() => {
          return dispatch(
            updateItem({
              item_id: categoryId,
              suggestedCategory: '',
              category: newCategory,
            })
          );
        })
        .then(() => {
          setNewCategoryEntered(false);
          setNewCategory('');
          return dispatch(getSuggestedCategories());
        })
        .catch((error) => {
          console.error('Error updating suggestedCategory:', error);
        });
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getSuggestedCategories());
  }, [dispatch, page]);

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 100 }} aria-label="categories table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestedCategories &&
                suggestedCategories.length > 0 &&
                suggestedCategories
                  .filter((category) => category.category.trim() !== '')
                  .map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{category.category}</TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            minWidth: '0',
                            width: '20px',
                            marginRight: '0.5rem',
                          }}
                          variant="contained"
                          color="success"
                          onClick={async () => {
                            dispatch(
                              createCategory({
                                categoryName: category.category,
                              })
                            )
                              .then(() => dispatch(getItem(category.id)))
                              .then(() =>
                                dispatch(
                                  updateItem({
                                    item_id: category.id,
                                    category: category.category,
                                    suggestedCategory: '',
                                  })
                                )
                              )
                              .then(() => dispatch(getSuggestedCategories()));
                          }}
                        >
                          <ThumbUpOffAltIcon fontSize="10px" />
                        </Button>
                        <Button
                          sx={{ minWidth: '0', width: '20px' }}
                          variant="contained"
                          color="error"
                          onClick={() => handleDecline(category.id)}
                        >
                          <ThumbDownOffAltIcon fontSize="10px" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        {declineCategoryId === category.id && (
                          <FormControl style={{ width: '15vw' }}>
                            <InputLabel>Official Category</InputLabel>
                            <Select
                              value={category.category}
                              style={{ height: 40, marginTop: 5 }}
                              onChange={(event) =>
                                handleChangeOfficialCategory(event, category.id)
                              }
                            >
                              {categories.map((officialCategory, index) => (
                                <MenuItem
                                  key={index}
                                  value={officialCategory.categoryName}
                                >
                                  {officialCategory.categoryName}
                                </MenuItem>
                              ))}
                              <MenuItem value={'*Enter New Category'}>
                                *Enter New Category
                              </MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                      <TableCell>
                        {newCategoryEntered && (
                          <Box>
                            <TextField
                              label="New Category"
                              value={newCategory}
                              onChange={(event) =>
                                setNewCategory(event.target.value)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginTop: 5 }}
                            />
                            <IconButton
                              onClick={() =>
                                handleNewCategorySubmit(category.id)
                              }
                              size="small"
                              edge="end"
                              color="primary"
                              style={{ marginLeft: 5 }}
                            >
                              <CheckCircleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <PaginationButtons
        page={page}
        count={totalPages}
        changePage={changePage}
      />
    </Stack>
  );
};

export default SuggestedCategories;
