import { Box, styled } from '@mui/material';

const FileUploadStyles = styled(Box)({
  border: '0.13em dashed #474747',
  borderRadius: '5px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '51.13px',

  '.file-inputs': {
    position: 'relative',

    '& input': {
      position: 'relative',
      maxWidth: '200px',
      height: '90%',
      cursor: 'pointer',
      zIndex: 2,
      opacity: 0
    },

    '& button': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: 1,
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      alignItems: 'center',

      color: '#fff',
      backgroundColor: '#3f51b5',
      fontSize: '.9rem',
      cursor: 'pointer',
      borderRadius: '4px',
      border: 'none',
      outline: 'none',
      transition: 'background-color 0.4s',
      boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.5);'
    },

    '&:hover button': {
      backgroundColor: '#303f9f'
    }
  }
});

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  padding: '20px'
};

export default FileUploadStyles;
