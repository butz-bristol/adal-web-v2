import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import File from 'src/components/hr/File';
import {
  deleteOrganizationalStructureFile,
  fetchAllOrganizationalStructureFiles,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const OrganizationalStructureFiles = () => {
  const [file, setFile] = useState(null);
  const { organizationalCharts } = useSelector((state) => state.coreHr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrganizationalStructureFiles());
  }, []);

  return (
    <Stack>
      <h1>Organitional Structures</h1>
      <h3>Downloadable Files</h3>

      <Grid container gap={2}>
        {organizationalCharts?.map((orgFile) => {
          const { _id, file_name, orgChart_filePath } = orgFile;
          return (
            <File
              key={_id}
              _id={_id}
              file_name={file_name}
              file_path={orgChart_filePath}
              deleteFile={deleteOrganizationalStructureFile}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default OrganizationalStructureFiles;
