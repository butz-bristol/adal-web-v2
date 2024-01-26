import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryModal from 'src/components/procurement/AddCategoryModal';
import PaginationButtons from 'src/components/procurement/PaginationButtons';
import {
  changePage,
  deleteCategory,
  getAllCategories,
  setCategoryValues,
  toggleCreateCategory,
  toggleEditCategory,
} from 'src/features/procurementFeatures/categories/categoriesSlice';

const Categories = () => {
  const {
    isCreatingCategory,
    isEditingCategory,
    isDeletingCategory,
    createCategoryStatus,
    categories,
    totalPages,
    page,
    categoriesPerPage,
  } = useSelector((state) => state.categories);

  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, page, query]);

  return (
    <Stack>
      <Box mb={2.5} component="span" style={{ display: 'inline-flex' }}>
        <Button
          variant="contained"
          style={{ display: 'inline-block' }}
          onClick={() => dispatch(toggleCreateCategory())}
          color="primary"
        >
          {isCreatingCategory || isEditingCategory || isDeletingCategory
            ? 'Loading...'
            : 'Add Category'}
        </Button>
      </Box>
      <AddCategoryModal />

      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search for a category"
          onChange={(event) => {
            setQuery(event.target.value);
            dispatch(getAllCategories());
          }}
          value={query}
          InputProps={{
            endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
          }}
        />
      </div>

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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {query != (null || undefined || '')
                ? categories
                    .filter((category) =>
                      category.categoryName
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    )
                    .map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell component="th" scope="row">
                          {(page - 1) * categoriesPerPage + index + 1}
                        </TableCell>
                        <TableCell>{category.categoryName}</TableCell>
                        <TableCell>
                          <Button
                            sx={{
                              minWidth: '0',
                              width: '20px',
                              marginRight: '0.5rem',
                            }}
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              console.log(category);
                              dispatch(toggleEditCategory());
                              dispatch(setCategoryValues(category));
                            }}
                          >
                            <EditIcon fontSize="10px" />
                          </Button>
                          <Button
                            sx={{ minWidth: '0', width: '20px' }}
                            variant="contained"
                            color="error"
                            onClick={() =>
                              dispatch(deleteCategory(category._id))
                            }
                          >
                            <DeleteIcon fontSize="10px" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                : categories.map((category, index) => (
                    <TableRow key={category._id}>
                      <TableCell component="th" scope="row">
                        {(page - 1) * categoriesPerPage + index + 1}
                      </TableCell>
                      <TableCell>{category.categoryName}</TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            minWidth: '0',
                            width: '20px',
                            marginRight: '0.5rem',
                          }}
                          variant="contained"
                          color="warning"
                          onClick={() => {
                            console.log(category);
                            dispatch(toggleEditCategory());
                            dispatch(setCategoryValues(category));
                          }}
                        >
                          <EditIcon fontSize="10px" />
                        </Button>
                        <Button
                          sx={{ minWidth: '0', width: '20px' }}
                          variant="contained"
                          color="error"
                          onClick={() => dispatch(deleteCategory(category._id))}
                        >
                          <DeleteIcon fontSize="10px" />
                        </Button>
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

export default Categories;
