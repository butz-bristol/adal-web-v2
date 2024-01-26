import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import {
  clearRoomType,
  createRoomType,
  setRoomType,
  toggleAddRoomType,
  toggleEditRoomType,
  updateRoomType,
} from 'src/features/academicFeatures/academicSlice';

const AddRoomTypeModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { isAddingRoomType, isEditingRoomType, roomType } = useSelector(
    (state) => state.academics
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomType.room_type) {
      toast.error('Please enter building name');
      return;
    }
    if (isEditingRoomType) {
      dispatch(updateRoomType({ ...roomType }));
      handleClose();
      return;
    }
    dispatch(createRoomType({ ...roomType }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(setRoomType({ ...roomType, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    isAddingRoomType
      ? dispatch(toggleAddRoomType())
      : dispatch(toggleEditRoomType());
    dispatch(clearRoomType());
  };
  return (
    <Dialog
      fullWidth
      open={isAddingRoomType || isEditingRoomType}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingRoomType ? 'Add Room Type' : 'Update Room Type'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Room Type"
                placeholder="Standard Classroom"
                name="room_type"
                variant="outlined"
                onChange={handleInput}
                value={roomType?.room_type || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                onChange={handleInput}
                value={roomType?.description || ''}
                rows={3}
                multiline
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          {isAddingRoomType ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomTypeModal;
