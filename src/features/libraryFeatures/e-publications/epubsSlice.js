import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchAllEpublicationsThunk, uploadEpublicationThunk, deleteEpublicationThunk, uploadFileThunk } from './epubsThunk';

const initialState = {
  file: '',
  image: '',
  isUploadingFile: false,
  isProcessingFile: false,

  createAnnouncement: false,
  editAnnouncement: false,
  viewAnnouncement: false,

  openFileUploadModal: false,
  epublications: [],
  isFetchingEpublications: false,
  isDeletingEpublications: false
};

export const uploadFile = createAsyncThunk('epublications/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const uploadImage = createAsyncThunk('epublications/uploadImage', async (formData, thunkAPI) => {
  return uploadFileThunk('/image-upload', formData, thunkAPI);
});

export const fetchAllEpublications = createAsyncThunk('epublications/fetchAllEpublications', async (_, thunkAPI) => {
  return fetchAllEpublicationsThunk('/epublication', thunkAPI);
});

export const uploadEpublication = createAsyncThunk('epublications/uploadEpublication', async (epublication, thunkAPI) => {
  return uploadEpublicationThunk('/epublication', epublication, thunkAPI);
});

export const deleteEpublication = createAsyncThunk('epublications/deleteEpublication', async (epublicationId, thunkAPI) => {
  return deleteEpublicationThunk(`/epublication/${epublicationId}`, thunkAPI);
});

const epubsSlice = createSlice({
  name: 'epublications',
  initialState,
  reducers: {
    toggleFileUploadModal: (state) => {
      state.openFileUploadModal = !state.openFileUploadModal;
    },
    clearFile: (state) => {
      state.file = '';
      state.image = '';
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(uploadEpublication.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(uploadEpublication.fulfilled, (state) => {
        state.openFileUploadModal = false;
        state.isProcessingFile = false;
        state.file = '';
        toast.success('E-file uploaded successfully');
      })
      .addCase(uploadEpublication.rejected, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.error(payload);
      })
      .addCase(fetchAllEpublications.pending, (state) => {
        state.isFetchingEpublications = true;
      })
      .addCase(fetchAllEpublications.fulfilled, (state, { payload }) => {
        state.isFetchingEpublications = false;
        state.epublications = payload.epublications;
      })
      .addCase(fetchAllEpublications.rejected, (state, { payload }) => {
        state.isFetchingEpublications = false;
        toast.error(payload.msg);
      })
      .addCase(deleteEpublication.pending, (state) => {
        state.isDeletingEpublication = true;
        toast.info('Deleting e-file...');
      })
      .addCase(deleteEpublication.fulfilled, (state) => {
        state.isDeletingEpublication = false;
        toast.success('E-file deleted successfully');
      })
      .addCase(deleteEpublication.rejected, (state, { payload }) => {
        state.isDeletingEpublication = false;
        toast.error(payload.msg);
      });
  }
});

export const { toggleFileUploadModal, clearFile } = epubsSlice.actions;
export default epubsSlice.reducer;
