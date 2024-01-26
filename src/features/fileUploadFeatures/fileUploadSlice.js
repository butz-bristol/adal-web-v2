import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteBirthCertificateThunk,
  deleteGoodMoralCertificateThunk,
  deleteMarriageCertificateThunk,
  deleteReportCardThunk,
  deleteStudentLedgerThunk,
  deleteTranscriptOfRecordsThunk,
  deleteTransferCredentialThunk,
  deletePWDDocumentThunk,
  fetchStudentBirthCertificateThunk,
  fetchStudentGoodMoralCertificateThunk,
  fetchStudentLedgerThunk,
  fetchStudentMarriageCertificateThunk,
  fetchStudentReportCardThunk,
  fetchStudentTranscriptOfRecordsThunk,
  fetchStudentTransferCredentialThunk,
  fetchPWDDocumentThunk,
  removeFileFromAWSThunk,
  saveBirthCertificateThunk,
  saveGoodMoralCertificateThunk,
  saveMarriageCertificateThunk,
  saveReportCardThunk,
  saveStudentLedgerThunk,
  saveTranscriptOfRecordsThunk,
  saveTransferCredentialThunk,
  savePWDDocumentThunk,
  updateBirthCertificateThunk,
  updateGoodMoralCertificateThunk,
  updateMarriageCertificateThunk,
  updateReportCardThunk,
  updateStudentLedgerThunk,
  updateTranscriptOfRecordsThunk,
  updateTransferCredentialThunk,
  updatePWDDocumentThunk,
  uploadFileThunk,
  savePromissoryNoteThunk,
  fetchPromissoryNoteDocumentThunk
} from './fileUploadThunk';

const initialState = {
  file: '',
  filePath: '',
  report_card: '',
  birth_certificate: '',
  transfer_credential: '',
  good_moral_certificate: '',
  marriage_certificate: '',
  transcript_of_records: '',
  student_ledger: '',
  pwd_document: '',
  promissory_note_document: '',
  isUploadingFile: false,
  isProcessingFile: false,
  isRemovingFile: false,
  student_report_card: {},
  isFetchingReportCard: false,
  student_birth_certificate: {},
  isFetchingBirthCertificate: false,
  student_transfer_credential: {},
  isFetchingTransferCredential: false,
  student_good_moral_certificate: {},
  isFetchingGoodMoralCertificate: false,
  student_marriage_certificate: {},
  isFetchingMarriageCertificate: false,
  student_transcript_of_records: {},
  isFetchingTranscriptOfRecords: false,
  student_ledger: {},
  student_pwd_document: {},
  isFetchingPWDDocument: false,
  student_promissory_note_document: {},
  isFetchingPromissoryNoteDocument: false
};

export const uploadFile = createAsyncThunk('fileUpload/uploadFile', async (formData, thunkAPI) => {
  return uploadFileThunk('/file-upload', formData, thunkAPI);
});

export const removeFileFromAWS = createAsyncThunk('fileUpload/removeFileFromAWS', async (key, thunkAPI) => {
  return removeFileFromAWSThunk(`/file-upload/remove`, key, thunkAPI);
});

// *** Report Card Actions ***

export const saveReportCard = createAsyncThunk('fileUpload/saveReportCard', async (formData, thunkAPI) => {
  return saveReportCardThunk('/report-card', formData, thunkAPI);
});

export const fetchStudentReportCard = createAsyncThunk('fileUpload/fetchStudentReportCard', async (id, thunkAPI) => {
  return fetchStudentReportCardThunk(`/report-card/${id}`, thunkAPI);
});

export const updateReportCard = createAsyncThunk('fileUpload/updateReportCard', async (data, thunkAPI) => {
  return updateReportCardThunk(`/report-card/${data.id}`, data, thunkAPI);
});

export const deleteReportCard = createAsyncThunk('fileUpload/deleteReportCard', async (id, thunkAPI) => {
  return deleteReportCardThunk(`/report-card/${id}`, thunkAPI);
});

// *** Birth Certificate Actions ***

export const saveBirthCertificate = createAsyncThunk('fileUpload/saveBirthCertificate', async (formData, thunkAPI) => {
  return saveBirthCertificateThunk('/birth-certificate', formData, thunkAPI);
});

export const fetchStudentBirthCertificate = createAsyncThunk('fileUpload/fetchStudentBirthCertificate', async (id, thunkAPI) => {
  return fetchStudentBirthCertificateThunk(`/birth-certificate/${id}`, thunkAPI);
});

export const updateBirthCertificate = createAsyncThunk('fileUpload/updateBirthCertificate', async (data, thunkAPI) => {
  return updateBirthCertificateThunk(`/birth-certificate/${data.id}`, data, thunkAPI);
});

export const deleteBirthCertificate = createAsyncThunk('fileUpload/deleteBirthCertificate', async (id, thunkAPI) => {
  return deleteBirthCertificateThunk(`/birth-certificate/${id}`, thunkAPI);
});

// *** Good Moral Certificate Actions ***

export const saveGoodMoralCertificate = createAsyncThunk('fileUpload/saveGoodMoralCertificate', async (formData, thunkAPI) => {
  return saveGoodMoralCertificateThunk('/good-moral-certificate', formData, thunkAPI);
});

export const fetchStudentGoodMoralCertificate = createAsyncThunk('fileUpload/fetchStudentGoodMoralCertificate', async (id, thunkAPI) => {
  return fetchStudentGoodMoralCertificateThunk(`/good-moral-certificate/${id}`, thunkAPI);
});

export const updateGoodMoralCertificate = createAsyncThunk('fileUpload/updateGoodMoralCertificate', async (data, thunkAPI) => {
  return updateGoodMoralCertificateThunk(`/good-moral-certificate/${data.id}`, data, thunkAPI);
});

export const deleteGoodMoralCertificate = createAsyncThunk('fileUpload/deleteGoodMoralCertificate', async (id, thunkAPI) => {
  return deleteGoodMoralCertificateThunk(`/good-moral-certificate/${id}`, thunkAPI);
});

// *** Marriage Certificate Actions ***

export const saveMarriageCertificate = createAsyncThunk('fileUpload/saveMarriageCertificate', async (formData, thunkAPI) => {
  return saveMarriageCertificateThunk('/marriage-certificate', formData, thunkAPI);
});

export const fetchStudentMarriageCertificate = createAsyncThunk('fileUpload/fetchStudentMarriageCertificate', async (id, thunkAPI) => {
  return fetchStudentMarriageCertificateThunk(`/marriage-certificate/${id}`, thunkAPI);
});

export const updateMarriageCertificate = createAsyncThunk('fileUpload/updateMarriageCertificate', async (data, thunkAPI) => {
  return updateMarriageCertificateThunk(`/marriage-certificate/${data.id}`, data, thunkAPI);
});

export const deleteMarriageCertificate = createAsyncThunk('fileUpload/deleteMarriageCertificate', async (id, thunkAPI) => {
  return deleteMarriageCertificateThunk(`/marriage-certificate/${id}`, thunkAPI);
});

// *** Transcript of Records Actions ***

export const saveTranscriptOfRecords = createAsyncThunk('fileUpload/saveTranscriptOfRecords', async (formData, thunkAPI) => {
  return saveTranscriptOfRecordsThunk('/transcript-of-records', formData, thunkAPI);
});

export const fetchStudentTranscriptOfRecords = createAsyncThunk('fileUpload/fetchStudentTranscriptOfRecords', async (id, thunkAPI) => {
  return fetchStudentTranscriptOfRecordsThunk(`/transcript-of-records/${id}`, thunkAPI);
});

export const updateTranscriptOfRecords = createAsyncThunk('fileUpload/updateTranscriptOfRecords', async (data, thunkAPI) => {
  return updateTranscriptOfRecordsThunk(`/transcript-of-records/${data.id}`, data, thunkAPI);
});

export const deleteTranscriptOfRecords = createAsyncThunk('fileUpload/deleteTranscriptOfRecords', async (id, thunkAPI) => {
  return deleteTranscriptOfRecordsThunk(`/transcript-of-records/${id}`, thunkAPI);
});

// *** Transfer Credential Actions ***

export const saveTransferCredential = createAsyncThunk('fileUpload/saveTransferCredential', async (formData, thunkAPI) => {
  return saveTransferCredentialThunk('/transfer-credential', formData, thunkAPI);
});

export const fetchStudentTransferCredential = createAsyncThunk('fileUpload/fetchStudentTransferCredential', async (id, thunkAPI) => {
  return fetchStudentTransferCredentialThunk(`/transfer-credential/${id}`, thunkAPI);
});

export const updateTransferCredential = createAsyncThunk('fileUpload/updateTransferCredential', async (data, thunkAPI) => {
  return updateTransferCredentialThunk(`/transfer-credential/${data.id}`, data, thunkAPI);
});

export const deleteTransferCredential = createAsyncThunk('fileUpload/deleteTransferCredential', async (id, thunkAPI) => {
  return deleteTransferCredentialThunk(`/transfer-credential/${id}`, thunkAPI);
});

// *** Student Ledger Actions ***

export const saveStudentLedger = createAsyncThunk('fileUpload/saveStudentLedger', async (formData, thunkAPI) => {
  return saveStudentLedgerThunk('/student-ledger', formData, thunkAPI);
});

export const fetchStudentLedger = createAsyncThunk('fileUpload/fetchStudentLedger', async (id, thunkAPI) => {
  return fetchStudentLedgerThunk(`/student-ledger/${id}`, thunkAPI);
});

export const updateStudentLedger = createAsyncThunk('fileUpload/updateStudentLedger', async (data, thunkAPI) => {
  return updateStudentLedgerThunk(`/student-ledger/${data.id}`, data, thunkAPI);
});

export const deleteStudentLedger = createAsyncThunk('fileUpload/deleteStudentLedger', async (id, thunkAPI) => {
  return deleteStudentLedgerThunk(`/student-ledger/${id}`, thunkAPI);
});

// *** PWD Document Actions ***

export const savePWDDocument = createAsyncThunk('fileUpload/savePWDDocument', async (formData, thunkAPI) => {
  return savePWDDocumentThunk('/pwd-document', formData, thunkAPI);
});

export const fetchPWDDocument = createAsyncThunk('fileUpload/fetchPWDDocument', async (id, thunkAPI) => {
  return fetchPWDDocumentThunk(`/pwd-document/${id}`, thunkAPI);
});

export const updatePWDDocument = createAsyncThunk('fileUpload/updatePWDDocument', async (data, thunkAPI) => {
  return updatePWDDocumentThunk(`/pwd-document/${data.id}`, data, thunkAPI);
});

export const deletePWDDocument = createAsyncThunk('fileUpload/deletePWDDocument', async (id, thunkAPI) => {
  return deletePWDDocumentThunk(`/pwd-document/${id}`, thunkAPI);
});

// *** Promissory Note Document Actions ***

export const savePromissoryNote = createAsyncThunk('fileUpload/savePromissoryNote', async (formData, thunkAPI) => {
  return savePromissoryNoteThunk('/promissory-note', formData, thunkAPI);
});

export const fetchPromissoryNoteDocument = createAsyncThunk('fileUpload/fetchPromissoryNoteDocument', async (id, thunkAPI) => {
  return fetchPromissoryNoteDocumentThunk(`/promissory-note/${id}`, thunkAPI);
});

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    clearFile(state) {
      state.file = '';
      state.filePath = '';
      state.legal_document = '';
      state.birth_certificate = '';
      state.good_moral_certificate = '';
      state.marriage_certificate = '';
      state.transcript_of_records = '';
      state.transfer_credential = '';
      state.student_ledger = '';
      state.promissory_note_document = '';
    },
    handleChange(state, { payload }) {
      state[payload.name] = payload.value;
    },
    setFilePath(state, { payload }) {
      state.filePath = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploadingFile = true;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.isUploadingFile = false;
        state[state.filePath] = payload.data;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.isUploadingFile = false;
      })
      .addCase(removeFileFromAWS.pending, (state) => {
        state.isRemovingFile = true;
      })
      .addCase(removeFileFromAWS.fulfilled, (state) => {
        state.isRemovingFile = false;
      })
      .addCase(removeFileFromAWS.rejected, (state) => {
        state.isRemovingFile = false;
      })
      .addCase(saveReportCard.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveReportCard.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(saveReportCard.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentReportCard.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentReportCard.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
        state.student_report_card = payload.reportCard;
      })
      .addCase(fetchStudentReportCard.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateReportCard.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateReportCard.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
      })
      .addCase(updateReportCard.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteReportCard.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteReportCard.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteReportCard.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveBirthCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveBirthCertificate.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
      })
      .addCase(saveBirthCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentBirthCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentBirthCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        state.student_birth_certificate = payload.birthCertificate;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentBirthCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateBirthCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateBirthCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateBirthCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteBirthCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteBirthCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteBirthCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveMarriageCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveMarriageCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(saveMarriageCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentMarriageCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentMarriageCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        state.student_marriage_certificate = payload.marriageCertificate;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentMarriageCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateMarriageCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateMarriageCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateMarriageCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteMarriageCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteMarriageCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteMarriageCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveGoodMoralCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveGoodMoralCertificate.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
      })
      .addCase(saveGoodMoralCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentGoodMoralCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentGoodMoralCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        state.student_good_moral_certificate = payload.goodMoralCertificate;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentGoodMoralCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateGoodMoralCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateGoodMoralCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateGoodMoralCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteGoodMoralCertificate.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteGoodMoralCertificate.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteGoodMoralCertificate.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveTransferCredential.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveTransferCredential.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(saveTransferCredential.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentTransferCredential.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentTransferCredential.fulfilled, (state, { payload }) => {
        state.student_transfer_credential = payload.transferCredential;
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentTransferCredential.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateTransferCredential.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateTransferCredential.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateTransferCredential.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteTransferCredential.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteTransferCredential.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTransferCredential.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveTranscriptOfRecords.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveTranscriptOfRecords.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(saveTranscriptOfRecords.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentTranscriptOfRecords.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentTranscriptOfRecords.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        state.student_transcript_of_records = payload.transcriptOfRecord;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentTranscriptOfRecords.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateTranscriptOfRecords.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateTranscriptOfRecords.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateTranscriptOfRecords.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteTranscriptOfRecords.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteTranscriptOfRecords.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTranscriptOfRecords.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(saveStudentLedger.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(saveStudentLedger.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(saveStudentLedger.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchStudentLedger.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchStudentLedger.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        state.student_ledger = payload.studentLedger;
        toast.success(payload.msg);
      })
      .addCase(fetchStudentLedger.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updateStudentLedger.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updateStudentLedger.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(updateStudentLedger.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deleteStudentLedger.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deleteStudentLedger.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deleteStudentLedger.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(savePWDDocument.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(savePWDDocument.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(savePWDDocument.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchPWDDocument.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchPWDDocument.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
        state.student_pwd_document = payload.pwdDocument;
      })
      .addCase(fetchPWDDocument.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(updatePWDDocument.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(updatePWDDocument.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
      })
      .addCase(updatePWDDocument.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(deletePWDDocument.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(deletePWDDocument.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(deletePWDDocument.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(savePromissoryNote.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(savePromissoryNote.fulfilled, (state, { payload }) => {
        state.isProcessingFile = false;
        toast.success(payload.msg);
      })
      .addCase(savePromissoryNote.rejected, (state) => {
        state.isProcessingFile = false;
      })
      .addCase(fetchPromissoryNoteDocument.pending, (state) => {
        state.isProcessingFile = true;
      })
      .addCase(fetchPromissoryNoteDocument.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        state.isProcessingFile = false;
        state.student_promissory_note_document = payload.promissoryNote;
      })
      .addCase(fetchPromissoryNoteDocument.rejected, (state) => {
        state.isProcessingFile = false;
      });
  }
});

export const { clearFile, setFilePath, handleChange } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
