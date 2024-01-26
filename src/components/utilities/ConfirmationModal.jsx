import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = ({ isOpen, title = 'Confirm Action', message, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} TransitionComponent={Transition}>
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ letterSpacing: '0.05em', lineHeight: '1.7', maxWidth: '500px' }}>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="contained" color="warning">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
