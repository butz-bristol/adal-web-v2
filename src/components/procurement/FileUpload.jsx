import { FileUploadRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Modal,
  styled,
} from '@mui/material';
import {
  clearFile,
  toggleFileUploadModal,
  updateItemRequest,
  uploadFile,
} from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FileUpload = ({ file, setFile, filePath, id }) => {
  const dispatch = useDispatch();
  const {
    isUploadingFile,
    openFileUploadModal,
    file: url,
    isProcessingFile,
  } = useSelector((state) => state.itemRequests);

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append('file', file);

    if (file) {
      dispatch(uploadFile(formData)); //nandito na ung link
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file && url !== '') {
      if (filePath === 'pR_filePath') {
        dispatch(uploadFile({ pR_filePath: url, file_name: file.name }));
        dispatch(
          updateItemRequest({
            requestId: id,
            signedForm: url,
            status: 'For Quotation',
          })
        );
        return;
      } else if (filePath === 'evaluationForm_filePath') {
        dispatch(
          uploadFile({ evaluationForm_filePath: url, file_name: file.name })
        );
        dispatch(
          updateItemRequest({
            requestId: id,
            evaluationForm: url,
            status: 'For Purchase Order',
          })
        );
        return;
      } else {
        toast.error('File path not found');
        return;
      }
    }

    setTimeout(() => {
      dispatch(clearFile());
      dispatch(toggleFileUploadModal());
    }, 1500);
  };

  return (
    <Modal
      open={openFileUploadModal}
      onClose={() => dispatch(toggleFileUploadModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FileUploadStyles>
        <Box className="file-card">
          <Box className="file-inputs">
            <Input type="file" disableUnderline onChange={uploadHandler} />
            <Button>
              <FileUploadRounded />

              {isUploadingFile ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
          <p>Supported Files : </p>
          <p>PDF</p>
        </Box>
        <Box>
          {file && (
            <Box className="file-preview">
              <p>{file.name}</p>
              <div>
                {isUploadingFile && (
                  <CircularProgress size={25} color="inherit" />
                )}
                {!isUploadingFile && (
                  <Button
                    onClick={() => {
                      setFile(null);
                      dispatch(clearFile());
                    }}
                    color="error"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Box>
          )}
        </Box>
        {file && !isUploadingFile && (
          <Button
            className="save-btn"
            disabled={isProcessingFile}
            onClick={handleSubmit}
            variant="contained"
          >
            Save
          </Button>
        )}
      </FileUploadStyles>
    </Modal>
  );
};

const FileUploadStyles = styled(Box)({
  width: '400px',
  background: '#fff',
  borderRadius: '5px',
  padding: '20px',

  '.file-card': {
    border: '0.15em dashed #474747',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
    minHeight: '100px',
    flexDirection: 'column',

    p: {
      margin: '.5rem 0',
    },
  },
  '.file-inputs': {
    position: 'relative',
    marginBottom: '1rem',

    '& input': {
      position: 'relative',
      maxWidth: '200px',
      height: '46px',
      cursor: 'pointer',
      zIndex: 2,
      opacity: 0,
      textAlign: 'right',
    },

    '& button': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: 1,
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      alignItems: 'center',

      color: '#fff',
      backgroundColor: '#3f51b5',
      fontSize: '1rem',
      cursor: 'pointer',
      borderRadius: '4px',
      border: 'none',
      outline: 'none',
      transition: 'background-color 0.4s',
      boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.5);',
    },

    '&:hover button': {
      backgroundColor: '#303f9f',
    },
  },

  '.file-preview': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '.5rem',
    border: 'transparent',
    borderRadius: '5px',
    margin: '10px 0',
    background: '#3f51b5',
    color: '#fff',
  },

  '.save-btn': {
    marginTop: '1rem',
    marginRight: '0',
    marginLeft: 'auto',
    display: 'flex',
  },
});

export default FileUpload;
