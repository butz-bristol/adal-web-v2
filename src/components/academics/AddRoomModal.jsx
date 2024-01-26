import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  clearRoom,
  createRoom,
  setRoom,
  toggleAddRoom,
  toggleEditRoom,
  updateRoom,
} from 'src/features/academicFeatures/academicSlice';

const AddRoomModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { isAddingRoom, isEditingRoom, room, roomTypes } = useSelector(
    (state) => state.academics
  );
  const { departments } = useSelector((state) => state.registrar);
  const [newDepartments, setNewDepartments] = useState(room?.departments);

  const handleChange = (e) => {
    setNewDepartments(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room.room_number) {
      toast.error('Please enter room number');
      return;
    }
    if (!newDepartments) {
      toast.error('Please select at least one department');
      return;
    }
    if (!room.room_type) {
      toast.error('Please enter room type');
      return;
    }
    if (!room.building) {
      toast.error('Please enter a building');
      return;
    }
    if (!room.remarks) {
      toast.error('Please select a remarks');
      return;
    }
    if (isEditingRoom) {
      dispatch(updateRoom({ ...room, departments: newDepartments }));
      handleClose();
      return;
    }
    dispatch(createRoom({ ...room, departments: newDepartments }));
    handleClose();
  };

  const handleInput = (e) => {
    dispatch(setRoom({ ...room, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    isAddingRoom ? dispatch(toggleAddRoom()) : dispatch(toggleEditRoom());
    dispatch(clearRoom());
    setNewDepartments([]);
  };

  useEffect(() => {
    setNewDepartments(room?.departments);
  }, [dispatch, room?.departments]);
  return (
    <Dialog
      fullWidth
      open={isAddingRoom || isEditingRoom}
      onClose={handleClose}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={3}>
          {isAddingRoom ? 'Add Room' : 'Update Room'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="select-departments">Departments</InputLabel>
              <Select
                id="select-departments"
                label="Department"
                name="departments"
                input={<OutlinedInput label="Departments" />}
                value={newDepartments || []}
                onChange={handleChange}
                multiple
              >
                {departments
                  .filter((department) => department.remarks === 'Active')
                  .map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department?.department_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Room Number"
                placeholder="101A"
                name="room_number"
                variant="outlined"
                onChange={handleInput}
                value={room?.room_number || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Building Name"
                placeholder="Bldg A."
                name="building"
                variant="outlined"
                onChange={handleInput}
                value={room?.building || ''}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-room_type">Room Type</InputLabel>
              <Select
                id="select-room_type"
                label="Room Type"
                name="room_type"
                value={room?.room_type || ''}
                onChange={handleInput}
              >
                {roomTypes.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.room_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-remarks">Remarks</InputLabel>
              <Select
                id="select-remarks"
                label="Remarks"
                name="remarks"
                value={room?.remarks || ''}
                onChange={handleInput}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                onChange={handleInput}
                value={room?.description || ''}
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
          {isAddingRoom ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomModal;
