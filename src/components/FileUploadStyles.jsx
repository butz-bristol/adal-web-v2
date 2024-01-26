import styled from '@emotion/styled';
import { Box } from '@mui/material';

const FileUploadStyles = styled(Box)({
  width: 'fit-content',
  background: '#fff',
  borderRadius: '5px',
  padding: '5px',
  display: 'flex',

  '.file-inputs': {
    position: 'relative',

    '& input': {
      position: 'relative',
      maxWidth: '35px',
      cursor: 'pointer',
      zIndex: 2,
      opacity: 0,
      textAlign: 'right'
    },

    '& button': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: 1,

      color: '#fff',
      backgroundColor: '#9e1313',
      fontSize: '.85rem',
      cursor: 'pointer',
      borderRadius: '4px',
      border: 'none',
      outline: 'none',
      transition: 'background-color 0.4s',
      boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.5);'
    },

    '&:hover button': {
      backgroundColor: '#740202'
    }
  },

  '.save-btn': {
    marginTop: '1rem',
    marginRight: '0',
    marginLeft: 'auto',
    display: 'flex'
  }
});

export default FileUploadStyles;
