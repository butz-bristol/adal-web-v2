import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import {
  clearUser,
  createUser,
  toggleAddUser,
  toggleEditUser,
  updateUser,
} from 'src/features/academicFeatures/academicSlice';

import LoadingData from 'src/components/LoadingData';
import FormUser from './FormUser/FormUser';

const UserModal = () => {
  const dispatch = useDispatch();

  const { isAddingUser, isEditingUser, isFetchingUser, user } = useSelector(
    (state) => state.academics
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingUser) {
      dispatch(updateUser({ ...user }));
      handleClose();
      return;
    }
    dispatch(createUser({ ...user }));
    handleClose();
  };

  const handleClose = () => {
    isAddingUser ? dispatch(toggleAddUser()) : dispatch(toggleEditUser());
    dispatch(clearUser());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isAddingUser || isEditingUser}
      onClose={handleClose}
    >
      <DialogTitle fontSize={18}>
        {isAddingUser ? 'Add User' : 'Edit User'}
      </DialogTitle>
      <DialogContent dividers>
        {isFetchingUser ? (
          <LoadingData />
        ) : (
          <FormUser handleSubmit={handleSubmit} />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingUser ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
