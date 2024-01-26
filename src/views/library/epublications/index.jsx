import { Grid, Stack } from '@mui/material';
import File from 'src/components/library/File';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEpublication,
  fetchAllEpublications,
} from 'src/features/libraryFeatures/e-publications/epubsSlice';

const EPublication = () => {
  const [file, setFile] = useState(null);
  const { epublications } = useSelector((state) => state.epublications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEpublications());
  }, []);

  return (
    <Stack>
      <h3>E-Book Files</h3>

      <Grid container gap={2}>
        {epublications?.map((epublication) => {
          const { _id, file_name, epublication_filePath } = epublication;

          return (
            <File
              key={epublication._id}
              _id={_id}
              file_name={file_name}
              file_path={epublication_filePath}
              deleteFile={deleteEpublication}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default EPublication;
