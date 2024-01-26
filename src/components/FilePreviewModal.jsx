import { Button, Modal, Paper, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExternalLinkComponent } from './OtherComponents';

const FilePreviewModal = ({ open, handleClose, url }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    const extension = getFileExtension(url);
    if (extension === 'pdf') {
      setType('pdf');
    } else {
      setType('image');
    }
  }, [url]);

  const getFileExtension = (url) => {
    if (!url) return;
    const filename = url?.split('/').pop();
    const extension = filename.split('.').pop();
    return extension.toLowerCase();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="file-preview-modal"
      aria-describedby="file-preview-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: 'auto',
          maxHeight: '80%',
          maxWidth: '700px',
          padding: 2,
          overflow: 'auto',
        }}
      >
        {type === 'image' && url ? (
          <Stack alignItems={'center'} spacing={2}>
            <img
              src={url}
              alt="preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            <ExternalLinkComponent to={url}>
              <Button variant="contained">Download file</Button>
            </ExternalLinkComponent>
          </Stack>
        ) : (
          <Stack alignItems={'center'}>
            <ExternalLinkComponent to={url}>
              <Button variant="contained">Download file</Button>
            </ExternalLinkComponent>
          </Stack>
        )}
      </Paper>
    </Modal>
  );
};

export default FilePreviewModal;
