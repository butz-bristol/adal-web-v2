import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Box, Button, CircularProgress, Input, Stack } from '@mui/material';
import { IconTrashX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearFile,
  removeFileFromAWS,
  saveBirthCertificate,
  saveGoodMoralCertificate,
  saveMarriageCertificate,
  savePWDDocument,
  saveReportCard,
  saveTranscriptOfRecords,
  saveTransferCredential,
  setFilePath,
  uploadFile,
} from 'src/features/fileUploadFeatures/fileUploadSlice';
import FileUploadStyles from './FileUploadStyles';

const FileUploadComponent = ({
  path,
  file,
  setFile,
  student_id,
  hideControls = false,
  updateDocument,
}) => {
  const dispatch = useDispatch();
  const {
    isUploadingFile,
    filePath,
    report_card,
    birth_certificate,
    marriage_certificate,
    good_moral_certificate,
    transcript_of_records,
    transfer_credential,
    pwd_document,
  } = useSelector((state) => state.fileUpload);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append('file', file);

    if (file) {
      dispatch(uploadFile(formData));
    }
  };

  const handleFileDelete = (e) => {
    e.preventDefault();

    dispatch(removeFileFromAWS({ key: `academic-documents/${file.name}` }));
    dispatch(clearFile());
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      if (filePath === 'report_card') {
        dispatch(
          saveReportCard({
            studentId: student_id,
            fileName: file.name,
            filePath: report_card,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else if (filePath === 'birth_certificate') {
        dispatch(
          saveBirthCertificate({
            studentId: student_id,
            fileName: file.name,
            filePath: birth_certificate,
            status: 'Document Submitted',
          })
        );

        setFile(null);
        return;
      } else if (filePath === 'marriage_certificate') {
        dispatch(
          saveMarriageCertificate({
            studentId: student_id,
            fileName: file.name,
            filePath: marriage_certificate,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else if (filePath === 'good_moral_certificate') {
        dispatch(
          saveGoodMoralCertificate({
            studentId: student_id,
            fileName: file.name,
            filePath: good_moral_certificate,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else if (filePath === 'transcript_of_records') {
        dispatch(
          saveTranscriptOfRecords({
            studentId: student_id,
            fileName: file.name,
            filePath: transcript_of_records,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else if (filePath === 'transfer_credential') {
        dispatch(
          saveTransferCredential({
            studentId: student_id,
            fileName: file.name,
            filePath: transfer_credential,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else if (filePath === 'pwd_document') {
        dispatch(
          savePWDDocument({
            studentId: student_id,
            fileName: file.name,
            filePath: pwd_document,
            status: 'Document Submitted',
          })
        );
        setFile(null);
        return;
      } else {
        return;
      }
    } else {
      toast.error('Something went wrong. Please try again.');
    }

    setTimeout(() => {
      setFile(null);
      dispatch(clearFile());
    }, 1000);
  };

  return (
    <FileUploadStyles>
      {!file && (
        <Box className="file-inputs">
          <Input
            type="file"
            disableUnderline
            onChange={handleFileUpload}
            onClick={() => dispatch(setFilePath(path))}
            inputProps={{ accept: 'image/*, .pdf' }}
          />

          <Button sx={{ minWidth: '0' }}>
            <FileUploadRoundedIcon />
          </Button>
        </Box>
      )}

      <Box>
        {file && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <p>
              {file.name.length > 15
                ? file.name.substring(0, 15) + '...'
                : file.name}
            </p>

            <Stack spacing={0.5} direction="row">
              {isUploadingFile && (
                <CircularProgress size={25} color="inherit" />
              )}

              {!hideControls && (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ minWidth: 0 }}
                  size="small"
                  onClick={handleSubmit}
                >
                  {isUploadingFile ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : (
                    'Save'
                  )}
                </Button>
              )}

              {!isUploadingFile && (
                <Button
                  onClick={handleFileDelete}
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ minWidth: 0 }}
                >
                  <IconTrashX />
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Box>
    </FileUploadStyles>
  );
};

export default FileUploadComponent;
