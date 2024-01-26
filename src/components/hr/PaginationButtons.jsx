import { Pagination, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

const PaginationButtons = ({ count, changePage, page }) => {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(changePage(value));
  };

  return (
    <Stack mt={2}>
      <Pagination count={count} page={page} onChange={handleChange} color="secondary" />
    </Stack>
  );
};

export default PaginationButtons;
