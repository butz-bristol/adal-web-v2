import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllBooksThunk,
  createBookThunk,
  updateBookThunk,
  deleteBookThunk,
  uploadExcelFileThunk,
  getOverdueParametersThunk,
  updateOverdueParametersThunk,
  uploadFileThunk,
  getSingleBookThunk
} from './booksThunk';

const initialState = {
  // Book
  books: [],
  book: {},
  bookCopies: {},
  book_id: '',
  book_title: '',
  book_author: '',
  type: 'Textbook',
  borrowingHistory: [],
  book_price: '',
  book_image: '',
  book_status: 'Available',
  book_rack_no: '',
  subject_code: '',
  ISBN: '',
  publication_date: '',
  quantity: '',
  book_quantity: '',
  createBookStatus: false,
  overdue_fine: '',
  book_rack_no: '',
  borrowing_duration: '',
  // Added new data
  borrowed_copies: '',
  reserved_copies: '',
  book_call_number: '',
  availability_status: 'Available',
  book_reference_id: '',
  available_copies: '',
  book_returned_on: '',
  book_same_copy: [],
  book_borrowed_by: '',
  subject_code: '',
  book_Id: '',
  book_borrowed_on: '',
  book_due_date: '',
  user_type: '',

  // function
  totalBooks: 0,
  overduePaymentFiled: false,
  bulkUploadStatus: false,
  editBookId: '',
  totalPages: 0,
  file: '',
  image: '',
  editBook: false,
  openFileUploadModal: false,

  // process
  isArchive: false,
  isFetchingBooks: false,
  isCreatingBook: false,
  isDeletingBook: false,
  isUpdatingOverdueParams: false,
  isUploadingFile: false,
  loading: false,
  isPenaltyExisting: false,
  isEditingOverdueParams: false,
  isViewingHistory: '',
  isEditingBook: false
};

export const getAllBooks = createAsyncThunk('books/getAllBooks', async (_, thunkAPI) => {
  return getAllBooksThunk(`/books`, thunkAPI);
});

export const getSingleBook = createAsyncThunk('books/', async (bookId, thunkAPI) => {
  return getSingleBookThunk(`/books/${bookId}`, thunkAPI);
});

export const createBook = createAsyncThunk('books/createBook', async (books, thunkAPI) => {
  return createBookThunk('/books', books, thunkAPI);
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId, thunkAPI) => {
  return deleteBookThunk(`/books/${bookId}`, thunkAPI);
});

export const updateBook = createAsyncThunk('books/updateBook', async (book, thunkAPI) => {
  return updateBookThunk(`/books/${book.book_id}`, book, thunkAPI);
});

export const updateSameBook = createAsyncThunk('books/updateSameBook', async (book, thunkAPI) => {
  return updateBookThunk(`/books/${book.book_id}`, book, thunkAPI);
});

export const uploadExcelFile = createAsyncThunk('books/uploadExcelFile', async (formData, thunkAPI) => {
  return uploadExcelFileThunk('/books/uploadExcelFile', formData, thunkAPI);
});

export const getOverdueParameters = createAsyncThunk('books/getOverdueParameters', async (_, thunkAPI) => {
  return getOverdueParametersThunk('/overdue_parameters', thunkAPI);
});

export const updateOverdueParameters = createAsyncThunk('books/updateOverdueParameters', async (overdueParams, thunkAPI) => {
  return updateOverdueParametersThunk('/overdue_parameters', overdueParams, thunkAPI);
});

export const uploadFile = createAsyncThunk('books/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const uploadPaymentFile = createAsyncThunk('books/uploadPaymentFile', async (formData, thunkAPI) => {
  const response = await uploadFileThunk('/file-upload', formData, thunkAPI);
  return response.data;
});

export const uploadImage = createAsyncThunk('books/uploadImage', async (formData, thunkAPI) => {
  return uploadFileThunk('/image-upload', formData, thunkAPI);
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    toggleEditOverdueParams: (state) => {
      state.isEditingOverdueParams = !state.isEditingOverdueParams;
    },
    toggleCreateBook: (state) => {
      state.createBookStatus = !state.createBookStatus;
    },
    toggleBulkUpload: (state) => {
      state.bulkUploadStatus = !state.bulkUploadStatus;
    },
    setBook: (state, { payload }) => {
      state.book = payload;
    },
    clearForm: (state) => {
      // state.book = '';
      state.book_title = '';
      state.book_author = '';
      state.type = 'Textbook';
      state.subject_code = '';
      state.ISBN = '';
      state.publication_date = '';
      state.book_rack_no = '';
      state.overdue_fine = '';
      state.borrowing_duration = '';
      state.book_quantity = '';
      state.book_status = 'Available';
      state.book_borrowed_on = '';
      state.book_borrowed_by = '';
      state.book_returned_on = '';
    },
    toggleEditBook: (state) => {
      state.editBook = !state.editBook;
    },
    setBookValues: (state, action) => {
      state.book = action.payload.book;
      state.book_id = action.payload._id;
      state.book_Id = action.payload.book_Id;
      state.book_title = action.payload.book_title;
      state.book_author = action.payload.book_author;
      state.book_rack_no = action.payload.book_rack_no;
      state.subject_code = action.payload.subject_code;
      state.book_quantity = action.payload.book_quantity;
      state.borrowingHistory = action.payload.borrowingHistory;
      state.ISBN = action.payload.ISBN;
      state.publication_date = action.payload.publication_date;
      state.overdue_fine = action.payload.overdue_fine;
      state.borrowing_duration = action.payload.borrowing_duration;
      state.book_status = action.payload.book_status;
      state.type = action.payload.type;
      state.book_call_number = action.payload.book_call_number;
      state.availability_status = action.payload.availability_status;
      state.available_copies = action.payload.book_quantity;
      state.reserved_copies = action.payload.reserved_copies;
      state.borrowed_copies = action.payload.borrowed_copies;
      state.book_transaction_reference = action.payload.book_transaction_reference;
      state.book_due_date = action.payload.book_due_date;
      state.user_type = action.payload.user_type;
      state.book_same_copy = action.payload.book_same_copy;
      state.book_borrowed_by = action.payload.book_borrowed_by;
      state.book_borrowed_on = action.payload.book_borrowed_on;
    },

    clearFile: (state) => {
      state.file = '';
      state.image = '';
    },
    toggleViewingHistory: (state) => {
      state.isViewingHistory = !state.isViewingHistory;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    setRequestedCopies: (state, action) => {
      const { bookCopyId, requestedCopies } = action.payload;
      state.bookCopies[bookCopyId] = requestedCopies;
    },
    handleBorrowingHistory: (state, action) => {
      const newBorrowingRecord = action.payload;
      state.borrowingHistory.push(newBorrowingRecord);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingleBook.pending, (state) => {
        state.loading = true;
        state.isFetchingBooks = true;
      })
      .addCase(getSingleBook.fulfilled, (state, { payload }) => {
        state.book = payload.book;
        state.loading = true;
        state.isFetchingBooks = false;
      })
      .addCase(getSingleBook.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.isFetchingBooks = true;
      })
      .addCase(getAllBooks.fulfilled, (state, { payload }) => {
        state.books = payload.books;
        state.loading = false;
        state.isFetchingBooks = false;

        state.borrowingHistory = payload.borrowingHistory;
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBook.pending, (state) => {
        state.isCreatingBook = true;
      })
      .addCase(createBook.fulfilled, (state) => {
        state.isCreatingBook = false;
        toast.success('Book created successfully');
      })
      .addCase(createBook.rejected, (state, { payload }) => {
        state.isCreatingBook = false;
        toast.error(payload.msg);
      })
      .addCase(deleteBook.pending, (state) => {
        state.isDeletingBook = true;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.isDeletingBook = false;
        toast.success('Book deleted successfully');
      })
      .addCase(deleteBook.rejected, (state, { payload }) => {
        state.isDeletingBook = false;
        toast.error(payload.msg);
      })
      .addCase(updateBook.pending, (state) => {
        state.isEditingBook = true;
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.isEditingBook = false;
        state.editBook = false;
        state.book_title = '';
        state.book_id = '';
        state.book_returned_on = '';
        toast.success('Book updated successfully');
      })
      .addCase(updateBook.rejected, (state, { payload }) => {
        state.isEditingBook = false;
        toast.error(payload.msg);
      })

      .addCase(getOverdueParameters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOverdueParameters.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.overdueParams = payload.overdueParams;
      })
      .addCase(getOverdueParameters.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateOverdueParameters.pending, (state) => {
        state.isUpdatingOverdueParams = true;
      })
      .addCase(updateOverdueParameters.fulfilled, (state) => {
        state.isUpdatingOverdueParams = false;
        state.isEditingOverdueParams = false;
        toast.success('Overdue parameters updated successfully');
      })
      .addCase(updateOverdueParameters.rejected, (state, { payload }) => {
        state.isUpdatingOverdueParams = false;
        toast.error(payload.msg);
      })
      .addCase(uploadExcelFile.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadExcelFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.file = payload.data;
        toast.success('File uploaded successfully');
      })
      .addCase(uploadExcelFile.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      })
      .addCase(uploadFile.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.file = payload.data;

        toast.success('File uploaded successfully');
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      })
      .addCase(uploadImage.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.image = payload.data;
        toast.success('Image uploaded successfully');
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      })
      .addCase(uploadPaymentFile.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadPaymentFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.file = payload.data;
        toast.success('File uploaded successfully');
      })
      .addCase(uploadPaymentFile.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      });
  }
});

export const {
  toggleCreateBook,
  toggleBulkUpload,
  handleChange,
  changePage,
  clearForm,
  toggleViewingHistory,
  toggleEditBook,
  toggleEditOverdueParams,
  setBookValues,
  handleOverdueParamsChange,
  handleBorrowingHistory,
  toggleFileUploadModal,
  clearFile,
  setBorrowingHistory,
  updateBorrowingHistory,
  updateAvailabilityStatus,
  setBook,
  setRequestedCopies
} = booksSlice.actions;

export default booksSlice.reducer;
