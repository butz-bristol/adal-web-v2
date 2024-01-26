import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { Document, Page } from '@react-pdf/renderer';
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
      <div style={{ display: 'inline-block' }}></div>
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
  maxWidth: '200px',
};

export default File;
