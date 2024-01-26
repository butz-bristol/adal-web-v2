import {
  Button,
  FormControl,
  Grid,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from 'src/components/modalBoxStyle';
import {
  addVoidORNo,
  clearDynamicData,
  handleChange,
  toggleAddVoidORNo,
  toggleEditVoidORNo,
  updateVoidORNo,
} from 'src/features/financeFeatures/financeSlice';

const AddVoidORNo = () => {
  const dispatch = useDispatch();
  const {
    createVoidORNo,
    editVoidORNo,
    or_no,
    void_reason,
    voidORNoId,
    isAddingVoidORNo,
    isEditingVoidORNo,
  } = useSelector((state) => state.finance);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!or_no) return toast.error('OR No is required');

    if (editVoidORNo) {
      return dispatch(updateVoidORNo({ or_no, void_reason, id: voidORNoId }));
    }

    dispatch(addVoidORNo({ or_no, void_reason }));
  };

  const clearData = () => {
    dispatch(
      clearDynamicData({
        or_no,
        void_reason,
        voidORNoId,
      })
    );

    if (createVoidORNo) {
      dispatch(toggleAddVoidORNo());
    } else {
      dispatch(toggleEditVoidORNo());
    }
  };

  return (
    <Modal open={createVoidORNo || editVoidORNo} onClose={clearData}>
      <Paper sx={{ ...styles }}>
        <Typography variant="h4" mb={2}>
          {createVoidORNo ? 'Add Void OR No' : 'Edit Void OR No'}
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="OR No"
                  value={or_no}
                  name="or_no"
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!or_no}
                  type="number"
                  helperText={!or_no ? 'This field is required' : ' '}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Void Reason"
                  value={void_reason}
                  name="void_reason"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction={'row'}
                justifyContent={'flex-end'}
                alignItems={'center'}
                spacing={1}
              >
                <Button
                  type="submit"
                  onClick={clearData}
                  variant="outlined"
                  color="primary"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondary"
                >
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddVoidORNo;
