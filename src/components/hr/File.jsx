import { Delete, Download } from '@mui/icons-material';
import { Button, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const File = ({ _id, file_path, file_name, deleteFile }) => {
  const dispatch = useDispatch();

  return (
    <div style={fileStyles}>
      <Typography margin={0} variant="h4" color="white">
        {file_name ? file_name : 'no file name assigned'}
      </Typography>
      <div style={{ display: 'grid' }}>
        <Tooltip title="Download" placement="top-start">
          <Button color="success" component={'a'} href={file_path}>
            <Download fontSize="small" />
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <Button color="error" onClick={() => dispatch(deleteFile(_id))}>
            <Delete fontSize="small" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

const fileStyles = {
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
  maxWidth: '400px'
};

export default File;
