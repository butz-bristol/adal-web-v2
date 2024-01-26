import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EPublication from '..'; //

import LoadingScreen from 'src/components/LoadingScreen';
import { getAllBooks } from 'src/features/libraryFeatures/books/booksSlice';

const Books = () => {
  const { books, isFetchingBooks } = useSelector((state) => state.books);

  const { isCreatingBook, isEditingBook, isDeletingBook } = useSelector(
    (state) => state.books
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <Stack>
      {isFetchingBooks && <LoadingScreen />}
      <EPublication />
    </Stack>
  );
};

export default Books;
