import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllItemRequestsThunk,
  createItemRequestThunk,
  updateItemRequestThunk,
  deleteItemRequestThunk,
  uploadExcelFileThunk,
  uploadFileThunk,
  getItemRequestThunk
} from './itemRequestsThunk';

const initialState = {
  loading: false,
  requestId: '',
  status: '',
  seriesNo: '',
  department: '',
  requestDate: '',
  targetDeliveryDate: '',
  actualDeliveryDate: '',
  requestedBy: '',
  signedForm: '',
  specifications: [],
  requestHistory: [],
  itemRequests: [],
  itemRequest: {},
  isViewingHistory: '',
  isEditingItemRequest: false,
  editRequest: false,
  createRequestStatus: false,
  addDeliveryDate: false,
  addActualDeliveryDate: false,
  bulkUploadStatus: false,
  isCreatingRequest: false,
  isFetchingRequests: false,
  isDeletingRequest: false,
  file: '',
  isUploadingFile: false,
  openFileUploadModal: false,
  openQuotationUploadModal: false,
  isProcessingFile: false,
  totalItems: 0,
  totalPages: 0,
  page: 1,
  itemRequestsPerPage: 0
};

export const getAllItemRequests = createAsyncThunk('itemRequests/getAllItemRequests', async (_, thunkAPI) => {
  return getAllItemRequestsThunk(`/itemRequests?page=${thunkAPI.getState().itemRequests.page}`, thunkAPI);
});

export const getItemRequest = createAsyncThunk('itemRequests/getItemRequest', async (requestId, thunkAPI) => {
  return getItemRequestThunk(`/itemRequests/${requestId}`, thunkAPI);
});

export const createItemRequest = createAsyncThunk('itemRequests/createItemRequest', async (itemRequests, thunkAPI) => {
  return createItemRequestThunk('/itemRequests', itemRequests, thunkAPI);
});

export const deleteItemRequest = createAsyncThunk('itemRequests/deleteItemRequest', async (requestId, thunkAPI) => {
  return deleteItemRequestThunk(`/itemRequests/${requestId}`, thunkAPI);
});

export const updateItemRequest = createAsyncThunk('itemRequests/updateItemRequest', async (itemRequest, thunkAPI) => {
  return updateItemRequestThunk(`/itemRequests/${itemRequest.requestId}`, itemRequest, thunkAPI);
});

export const uploadExcelFile = createAsyncThunk('itemRequests/uploadExcelFile', async (formData, thunkAPI) => {
  return uploadExcelFileThunk('/itemRequests/uploadExcelFile', formData, thunkAPI);
});

export const uploadFile = createAsyncThunk('itemRequests/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const uploadImage = createAsyncThunk('itemRequests/uploadImage', async (formData, thunkAPI) => {
  return uploadFileThunk('/image-upload', formData, thunkAPI);
});

const itemRequestsSlice = createSlice({
  name: 'itemRequests',
  initialState,
  reducers: {
    toggleViewingHistory: (state) => {
      state.isViewingHistory = !state.isViewingHistory;
    },
    toggleCreateItemRequest: (state) => {
      state.createRequestStatus = !state.createRequestStatus;
    },
    toggleBulkUpload: (state) => {
      state.bulkUploadStatus = !state.bulkUploadStatus;
    },
    toggleEditItemRequest: (state) => {
      state.editRequest = !state.editRequest;
    },
    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    toggleQuotationUploadModal: (state) => {
      state.openQuotationUploadModal = !state.openQuotationUploadModal;
    },
    toggleAddDeliveryDateModal: (state) => {
      state.addDeliveryDate = !state.addDeliveryDate;
    },
    toggleAddActualDeliveryDateModal: (state) => {
      state.addActualDeliveryDate = !state.addActualDeliveryDate;
    },
    clearFile: (state) => {
      state.file = '';
      state.image = '';
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    setItemRequestValues: (state, action) => {
      state.requestId = action.payload._id;
      state.seriesNo = action.payload.seriesNo;
      state.department = action.payload.department;
      state.requestDate = action.payload.requestDate;
      state.requestedBy = action.payload.requestedBy;
      state.signedForm = action.payload.signedForm;
    },
    setSpecifications: (state, action) => {
      state.specifications = [...action.payload];
    },

    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    clearForm: (state) => {
      state.requestId = '';
      state.seriesNo = '';
      state.department = '';
      state.requestDate = '';
      state.requestedBy = '';
      state.signedForm = '';
      state.specifications = [];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllItemRequests.pending, (state) => {
        state.loading = true;
        state.isFetchingRequests = true;
      })
      .addCase(getAllItemRequests.fulfilled, (state, { payload }) => {
        state.itemRequests = payload.itemRequests;
        state.loading = false;
        state.isFetchingRequests = false;
        state.totalPages = payload.totalPages;
        state.totalItems = payload.totalItems;
        state.itemRequestsPerPage = payload.limit;
      })
      .addCase(getAllItemRequests.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getItemRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemRequest.fulfilled, (state, { payload }) => {
        state.itemRequest = payload;
        state.loading = false;
      })
      .addCase(getItemRequest.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createItemRequest.pending, (state) => {
        state.isCreatingRequest = true;
      })
      .addCase(createItemRequest.fulfilled, (state) => {
        state.isCreatingRequest = false;
        toast.success('PR created successfully');
      })
      .addCase(createItemRequest.rejected, (state, { payload }) => {
        state.isCreatingRequest = false;
        toast.error(payload.msg);
      })
      .addCase(deleteItemRequest.pending, (state) => {
        state.isDeletingRequest = true;
      })
      .addCase(deleteItemRequest.fulfilled, (state) => {
        state.isDeletingRequest = false;
        toast.success('item deleted successfully');
      })
      .addCase(deleteItemRequest.rejected, (state, { payload }) => {
        state.isDeletingRequest = false;
        toast.error(payload.msg);
      })
      .addCase(updateItemRequest.pending, (state) => {
        state.isEditingItemRequest = true;
      })
      .addCase(updateItemRequest.fulfilled, (state) => {
        state.isEditingItemRequest = false;
        state.editRequest = false;
        state.requestId = '';
        toast.success('purchase request updated successfully');
      })
      .addCase(updateItemRequest.rejected, (state, { payload }) => {
        state.isEditingItemRequest = false;
        toast.error(payload);
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
        console.log('uploading file');
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state.file = payload.data;
        console.log('file uploaded');
        toast.success('File uploaded successfully');
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isUploadingFile = false;
        toast.error(payload.msg);
      });
  }
});

export const {
  toggleCreateItemRequest,
  toggleBulkUpload,
  handleChange,
  changePage,
  clearForm,
  toggleViewingHistory,
  toggleEditItemRequest,
  setItemRequestValues,
  toggleFileUploadModal,
  clearFile,
  setSpecifications,
  toggleQuotationUploadModal,
  toggleAddDeliveryDateModal,
  toggleAddActualDeliveryDateModal
} = itemRequestsSlice.actions;

export default itemRequestsSlice.reducer;
