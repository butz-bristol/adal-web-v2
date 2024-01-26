import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllItemsThunk,
  createItemThunk,
  updateItemThunk,
  deleteItemThunk,
  uploadExcelFileThunk,
  uploadFileThunk,
  getItemByIdThunk
} from './itemsThunk';

const initialState = {
  loading: false,
  item_id: '',
  item_name: '',
  supplier: '',
  type: '',
  item_price: '',
  item_image: '',
  item_status: 'On Stock',
  item_serial_no: '',
  model_no: '',
  brand: '',
  category: '',
  suggestedCategory: '',
  department: '',
  location: '',
  date_purchased: '',
  expiryDate: '',
  quantity: '',
  editItemId: '',
  itemHistory: [],
  items: [],
  item_count: 0,
  isViewingHistory: '',
  isViewingDetail: false,
  isEditingItem: false,
  editItem: false,
  createItemStatus: false,
  bulkUploadStatus: false,
  isCreatingItem: false,
  isFetchingItems: false,
  isDeletingItem: false,
  isFetchingItem: false,
  file: '',
  image: '',
  isUploadingFile: false,
  openFileUploadModal: false,
  isProcessingFile: false,
  totalItems: 0,
  totalPages: 0,
  page: 1,
  itemsPerPage: 0,
  item: {}
};

export const getAllItems = createAsyncThunk('items/getAllitems', async (_, thunkAPI) => {
  return getAllItemsThunk(`/items?page=${thunkAPI.getState().items.page}`, thunkAPI);
});

export const getItem = createAsyncThunk('items/getItem', async (itemId, thunkAPI) => {
  return getItemByIdThunk(`/items/${itemId}`, thunkAPI);
});

export const createItem = createAsyncThunk('items/createitem', async (items, thunkAPI) => {
  return createItemThunk('/items', items, thunkAPI);
});

export const deleteItem = createAsyncThunk('items/deleteitem', async (itemId, thunkAPI) => {
  return deleteItemThunk(`/items/${itemId}`, thunkAPI);
});

export const updateItem = createAsyncThunk('items/updateitem', async (item, thunkAPI) => {
  return updateItemThunk(`/items/${item.item_id}`, item, thunkAPI);
});

export const uploadExcelFile = createAsyncThunk('items/uploadExcelFile', async (formData, thunkAPI) => {
  return uploadExcelFileThunk('/items/uploadExcelFile', formData, thunkAPI);
});

export const uploadFile = createAsyncThunk('items/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const uploadImage = createAsyncThunk('items/uploadImage', async (formData, thunkAPI) => {
  return uploadFileThunk('/image-upload', formData, thunkAPI);
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleViewingDetail: (state) => {
      state.isViewingDetail = !state.isViewingDetail;
    },
    toggleCreateItem: (state) => {
      state.createItemStatus = !state.createItemStatus;
    },
    toggleBulkUpload: (state) => {
      state.bulkUploadStatus = !state.bulkUploadStatus;
    },
    toggleEditItem: (state) => {
      state.editItem = !state.editItem;
    },
    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    clearFile: (state) => {
      state.file = '';
      state.image = '';
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    setitemValues: (state, action) => {
      state.item_id = action.payload._id;
      state.location = action.payload.location;
      state.item_name = action.payload.item_name;
      state.type = action.payload.type;
      state.category = action.payload.category;
      state.supplier = action.payload.supplier;
      state.brand = action.payload.brand;
      state.model_no = action.payload.model_no;
      state.item_serial_no = action.payload.item_serial_no;
      state.item_price = action.payload.item_price;
      state.quantity = action.payload.quantity;
      state.itemHistory = action.payload.itemHistory;
      state.item_status = action.payload.item_status;
      state.date_purchased = action.payload.date_purchased;
      state.department = action.payload.department;
      state.expiryDate = action.payload.expiryDate;
    },

    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    handleItemHistory: (state, expiryDate) => {
      state.itemHistory = [
        ...state.itemHistory.slice(0, -1),
        { ...state.itemHistory[state.itemHistory.length - 1], item_expired_on: expiryDate.payload }
      ];
    },

    clearForm: (state) => {
      state.item_id = '';
      state.item_name = '';
      state.type = '';
      state.category = '';
      state.supplier = '';
      state.brand = '';
      state.model_no = '';
      state.item_serial_no = '';
      state.item_price = '';
      state.quantity = '';
      state.itemHistory = [];
      state.item_status = 'On Stock';
      state.date_purchased = '';
      state.department = '';
      state.expiryDate = '';
      state.item_image = '';
      state.location = '';
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.loading = true;
        state.isFetchingItems = true;
      })
      .addCase(getAllItems.fulfilled, (state, { payload }) => {
        state.items = payload.items;
        state.loading = false;
        state.isFetchingItems = false;
        state.totalPages = payload.totalPages;
        state.totalItems = payload.totalitems;
        state.itemsPerPage = payload.limit;
      })
      .addCase(getAllItems.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.isFetchingItem = true;
      })
      .addCase(getItem.fulfilled, (state, { payload }) => {
        state.item = payload;
        state.loading = false;
        state.isFetchingItem = false;
      })
      .addCase(getItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createItem.pending, (state) => {
        state.isCreatingItem = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.isCreatingItem = false;
        toast.success('item created successfully');
      })
      .addCase(createItem.rejected, (state, { payload }) => {
        state.isCreatingItem = false;
        toast.error(payload.msg);
      })
      .addCase(deleteItem.pending, (state) => {
        state.isDeletingItem = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.isDeletingItem = false;
        toast.success('item deleted successfully');
      })
      .addCase(deleteItem.rejected, (state, { payload }) => {
        state.isDeletingItem = false;
        toast.error(payload.msg);
      })
      .addCase(updateItem.pending, (state) => {
        state.isEditingItem = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isEditingItem = false;
        state.editItem = false;
        state.item_name = '';
        state.item_id = '';
        toast.success('item updated successfully');
      })
      .addCase(updateItem.rejected, (state, { payload }) => {
        state.isEditingItem = false;
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
      });
  }
});

export const {
  toggleCreateItem,
  toggleBulkUpload,
  handleChange,
  changePage,
  clearForm,
  toggleViewingDetail,
  toggleEditItem,
  setitemValues,
  handleItemHistory,
  toggleFileUploadModal,
  clearFile
} = itemsSlice.actions;

export default itemsSlice.reducer;
