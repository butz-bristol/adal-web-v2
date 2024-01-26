import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormControl,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { IconCloudDownload, IconTrash } from '@tabler/icons-react';
import { removeFileFromAWS } from 'src/features/fileUploadFeatures/fileUploadSlice';
import { updatePromissoryNote } from 'src/features/financeFeatures/financeSlice';
import { setPromissoryNote } from 'src/features/studentFeatures/studentSlice';

import FileUploadComponent from 'src/components/FileUploadComponent';
import { ExternalLinkComponent } from 'src/components/OtherComponents';

const StudentPromissoryNoteForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { promissory_note_document } = useSelector((state) => state.fileUpload);
  const { studentProfile, promissoryNote, isEditingPromissoryNote } =
    useSelector((state) => state.students);

  const handleInput = (e) => {
    dispatch(
      setPromissoryNote({ ...promissoryNote, [e.target.name]: e.target.value })
    );
  };

  const handleDelete = (fileName) => {
    dispatch(
      removeFileFromAWS({
        key: `academic-documents/${fileName}`,
      })
    );
  };

  useEffect(() => {
    dispatch(
      setPromissoryNote({ ...promissoryNote, file: promissory_note_document })
    );
  }, [promissory_note_document]);

  console.log(promissoryNote?.file);

  return (
    <form>
      <Grid container spacing={2}>
        {promissoryNote.status !== 'pending' && (
          <>
            {promissoryNote?.file ? (
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={1}
                alignItems="center"
              >
                {isEditingPromissoryNote ? (
                  <ExternalLinkComponent to={promissoryNote?.file}>
                    <IconCloudDownload color="#0b7a39" />
                  </ExternalLinkComponent>
                ) : (
                  <ExternalLinkComponent to={promissory_note_document}>
                    <IconCloudDownload color="#0b7a39" />
                  </ExternalLinkComponent>
                )}

                <IconButton
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleDelete(promissory_note_document.fileName);
                    dispatch(
                      updatePromissoryNote({
                        id: promissoryNote._id,
                        file: '',
                      })
                    );
                  }}
                >
                  <IconTrash />
                </IconButton>
              </Stack>
            ) : (
              <FormControl fullWidth>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5">File Upload</Typography>

                  <FileUploadComponent
                    student_id={studentProfile.student?._id}
                    file={file}
                    setFile={setFile}
                    path={'promissory_note_document'}
                    hideControls={true}
                  />
                </Stack>
              </FormControl>
            )}
          </>
        )}
        <Grid item xs={12} textAlign="center">
          {promissoryNote.status === 'approved with pending requirements' && (
            <Typography variant="overline">
              Please upload a copy of your Approved Promissory Note
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentPromissoryNoteForm;
