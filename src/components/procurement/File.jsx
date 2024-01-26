import { Delete, Download } from '@mui/icons-material';
import { Button, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useState } from 'react';

const File = ({ _id, file_path, file_name, deleteFile }) => {
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div style={fileStyles}>
      <div>
        <Document file={file_path} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>

      <Typography margin={0} variant="h4" color="white">
        {file_name ? file_name : 'no file name assigned'}
      </Typography>
      <div style={{ display: 'inline-block' }}>
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
  display: 'block',
  //justifyContent: 'space-between',
  textAlign: 'center',
  alignItems: 'center',
  gap: '1rem',
  padding: '.5rem',
  border: 'transparent',
  borderRadius: '5px',
  margin: '10px 0',
  background: '#3f51b5',
  color: '#fff',
  maxWidth: '200px'
};

export default File;
