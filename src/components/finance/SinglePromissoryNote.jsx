import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconArrowNarrowLeft,
  IconCloudDownload,
  IconFiles,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FilePreviewModal from 'src/components/FilePreviewModal';
import LoadingData from 'src/components/LoadingData';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  handleChange as handleFileUploadChange,
  removeFileFromAWS,
} from 'src/features/fileUploadFeatures/fileUploadSlice';
import {
  deletePromissoryNote,
  fetchPromissoryNote,
  setDynamicData,
  toggleEditPromissoryNote,
} from 'src/features/financeFeatures/financeSlice';

import LinkComponent from '../LinkComponent';
import { ExternalLinkComponent } from '../OtherComponents';
import AddPromissoryNote from './AddPromissoryNote';

const SinglePromissoryNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { promissoryNote, isFetchingPromissoryNote } = useSelector(
    (state) => state.finance
  );

  const handleModalOpen = (url) => {
    setImageUrl(url);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (fileName) => {
    dispatch(
      removeFileFromAWS({
        key: `academic-documents/${fileName}`,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchPromissoryNote(id));
  }, [dispatch, id]);

  return (
    <Stack>
      <ConfirmationModal
        isOpen={openModal}
        title="Delete Promissory Note"
        message={'Are you sure you want to delete this promissory note?'}
        onCancel={() => {
          setOpenModal(false);
        }}
        onConfirm={() => {
          dispatch(deletePromissoryNote(promissoryNote._id)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              setOpenModal(false);
              navigate('/finance/students/promissory-notes');
            }
          });
          setOpenModal(false);
        }}
      />

      <Stack justifyContent={'flex-start'} mb={1}>
        <Box>
          <LinkComponent to="/finance/students/promissory-notes">
            <Button variant="outlined" startIcon={<IconArrowNarrowLeft />}>
              Back
            </Button>
          </LinkComponent>
        </Box>
      </Stack>

      <Paper sx={{ p: 2 }}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h4">Promissory Note Details</Typography>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(toggleEditPromissoryNote());
                dispatch(
                  setDynamicData({
                    promissory_note_id: promissoryNote._id,
                    promissory_note_reason: promissoryNote.reason,
                    promissory_note_document: promissoryNote.document,
                    promissory_note_payment_date:
                      promissoryNote.promissoryNotePaymentDate,
                    promissory_note_request_date:
                      promissoryNote.promissoryNoteDate,
                    student_id: promissoryNote.student._id,
                    promissory_note_other_reason: promissoryNote.otherReason,
                  })
                );
                dispatch(
                  handleFileUploadChange({
                    name: 'promissory_note_document',
                    value: promissoryNote.file,
                  })
                );
              }}
            >
              Edit
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <FilePreviewModal
          open={isModalOpen}
          handleClose={handleModalClose}
          url={imageUrl}
        />

        <AddPromissoryNote />

        {isFetchingPromissoryNote ? (
          <LoadingData />
        ) : (
          <Grid container spacing={1} rowGap={2}>
            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Student
              </Typography>
              <Typography>
                {promissoryNote?.student?.student_first_name}{' '}
                {promissoryNote?.student?.student_last_name}
              </Typography>

              <Typography variant="caption">
                {promissoryNote?.student?.student_number}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Reason
              </Typography>
              {promissoryNote?.reason === 'Others'
                ? promissoryNote?.otherReason
                : promissoryNote.reason}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Request Date
              </Typography>
              {DateTime.fromISO(
                promissoryNote?.promissoryNoteDate
              ).toLocaleString(DateTime.DATE_MED)}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Payment Date
              </Typography>
              {DateTime.fromISO(
                promissoryNote?.promissoryNotePaymentDate
              ).toLocaleString(DateTime.DATE_MED)}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Status
              </Typography>
              {promissoryNote?.status}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Approved By
              </Typography>
              {promissoryNote?.approvedBy?.first_name
                ? `${promissoryNote?.approvedBy?.first_name} ${promissoryNote?.approvedBy?.last_name}`
                : 'N/A'}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                Rejected By
              </Typography>
              {promissoryNote?.rejectedBy?.first_name
                ? `${promissoryNote?.rejectedBy?.first_name} ${promissoryNote?.rejectedBy?.last_name}`
                : 'N/A'}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Typography fontWeight={600} gutterBottom>
                File Upload
              </Typography>
              {promissoryNote?.file ? (
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  spacing={1}
                  alignItems="center"
                >
                  <Tooltip title="View File">
                    <IconButton
                      variant="outlined"
                      color="primary"
                      onClick={() => handleModalOpen(promissoryNote?.file)}
                    >
                      <IconFiles />
                    </IconButton>
                  </Tooltip>

                  <ExternalLinkComponent to={promissoryNote?.file}>
                    <IconCloudDownload color="#0b7a39" />
                  </ExternalLinkComponent>
                </Stack>
              ) : (
                'No file uploaded'
              )}
            </Grid>
          </Grid>
        )}
      </Paper>

      <Box mt={2}></Box>
    </Stack>
  );
};
export default SinglePromissoryNote;
