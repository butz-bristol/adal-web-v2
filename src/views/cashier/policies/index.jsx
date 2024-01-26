import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import File from 'src/components/hr/File';
import {
  deletePolicy,
  fetchAllPolicies,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Policies = () => {
  const [file, setFile] = useState(null);
  const { policies } = useSelector((state) => state.coreHr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPolicies());
  }, []);

  return (
    <Stack>
      <h1>Policies</h1>
      <h3>Downloadable Files</h3>

      <Grid container gap={2}>
        {policies?.map((policy) => {
          const { _id, file_name, policy_filePath } = policy;
          return (
            <File
              key={policy._id}
              _id={_id}
              file_name={file_name}
              file_path={policy_filePath}
              deleteFile={deletePolicy}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Policies;
