import { Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import File from 'src/components/hr/File';
import FileUpload from 'src/components/hr/FileUpload';
import {
  deleteHandBook,
  fetchAllHandbooks,
  toggleFileUploadModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const HandBook = () => {
  const [file, setFile] = useState(null);
  const { handbooks } = useSelector((state) => state.coreHr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllHandbooks());
  }, []);

  return (
    <Stack>
      <h1>HandBook</h1>
      <Button
        sx={{ width: '100px' }}
        variant="contained"
        onClick={() => dispatch(toggleFileUploadModal())}
      >
        Add New
      </Button>
      <FileUpload filePath="handbook_filePath" file={file} setFile={setFile} />
      <h3>Downloadable Files</h3>

      <Grid container gap={2}>
        {handbooks?.map((handbook) => {
          const { _id, file_name, handbook_filePath } = handbook;
          return (
            <File
              key={handbook._id}
              _id={_id}
              file_name={file_name}
              file_path={handbook_filePath}
              deleteFile={deleteHandBook}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default HandBook;
