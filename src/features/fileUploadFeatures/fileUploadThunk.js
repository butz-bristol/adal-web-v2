import {
  fetchPWDDocument,
  fetchStudentBirthCertificate,
  fetchStudentGoodMoralCertificate,
  fetchStudentLedger,
  fetchStudentMarriageCertificate,
  fetchStudentReportCard,
  fetchStudentTranscriptOfRecords,
  fetchStudentTransferCredential,
} from 'src/features/fileUploadFeatures/fileUploadSlice';
import adalFetch from 'src/utils/axios';

export const uploadFileThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const removeFileFromAWSThunk = async (url, key, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, key);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Report Card Thunks ***

export const saveReportCardThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentReportCard(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentReportCardThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateReportCardThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentReportCard(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteReportCardThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentReportCard(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Birth Certificate Thunks ***

export const saveBirthCertificateThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentBirthCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentBirthCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateBirthCertificateThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentBirthCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteBirthCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentBirthCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Good Moral Certificate Thunks ***

export const saveGoodMoralCertificateThunk = async (
  url,
  formData,
  thunkAPI
) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentGoodMoralCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentGoodMoralCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateGoodMoralCertificateThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentGoodMoralCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteGoodMoralCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentGoodMoralCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Marriage Certificate Thunks ***

export const saveMarriageCertificateThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentMarriageCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentMarriageCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateMarriageCertificateThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentMarriageCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteMarriageCertificateThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentMarriageCertificate(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Transfer Credential Thunks ***

export const saveTranscriptOfRecordsThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTranscriptOfRecords(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentTranscriptOfRecordsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTranscriptOfRecordsThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTranscriptOfRecords(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTranscriptOfRecordsThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTranscriptOfRecords(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Transfer Credential Thunks ***

export const saveTransferCredentialThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTransferCredential(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentTransferCredentialThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateTransferCredentialThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTransferCredential(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTransferCredentialThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentTransferCredential(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** Student Ledger Thunks ***

export const saveStudentLedgerThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentLedger(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchStudentLedgerThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateStudentLedgerThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentLedger(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteStudentLedgerThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchStudentLedger(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// *** PWD Document Thunks ***

export const savePWDDocumentThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    if (response.data.id) {
      thunkAPI.dispatch(fetchPWDDocument(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchPWDDocumentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updatePWDDocumentThunk = async (url, data, thunkAPI) => {
  try {
    const response = await adalFetch.patch(url, data);
    if (response.data.id) {
      thunkAPI.dispatch(fetchPWDDocument(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deletePWDDocumentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.delete(url);
    if (response.data.id) {
      thunkAPI.dispatch(fetchPWDDocument(response.data.id));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

// ** Promissory Note Thunks **

export const savePromissoryNoteThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await adalFetch.post(url, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchPromissoryNoteDocumentThunk = async (url, thunkAPI) => {
  try {
    const response = await adalFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
