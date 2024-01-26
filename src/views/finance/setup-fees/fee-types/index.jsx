import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingScreen from 'src/components/LoadingScreen';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  createFeeType,
  deleteFeeType,
  fetchAllFeeTypes,
  handleChange,
  resetEditFeeType,
  setEditFeeType,
  updateFeeType,
} from 'src/features/financeFeatures/financeSlice';

const FeeTypes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [feeTypeId, setFeeTypeId] = useState('');
  const {
    fee_type,
    isCreatingFeeType,
    feeTypes,
    isFetchingFeeTypes,
    isUpdatingFeeType,
    isDeletingFeeType,
    editFeeType,
    editFeeTypeId,
  } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fee_type) {
      toast.error('Fee type is required');
      return;
    }

    if (editFeeType) {
      dispatch(updateFeeType({ fee_type, id: editFeeTypeId }));
      return;
    }

    dispatch(createFeeType({ fee_type }));
  };

  useEffect(() => {
    dispatch(fetchAllFeeTypes());
  }, [dispatch]);

  return (
    <Stack>
      <Grid container spacing={1}>
        <Grid item xs={9} md={5} style={{ maxWidth: '250px' }}>
          <FormControl fullWidth>
            <TextField
              name="fee_type"
              size="small"
              label="Fee Type"
              value={fee_type}
              onChange={handleInput}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4} alignSelf={'center'} display="flex">
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleSubmit}
          >
            {editFeeType ? (
              isUpdatingFeeType ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                'Update'
              )
            ) : isCreatingFeeType ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              'Add New'
            )}
          </Button>

          {editFeeType && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{ ml: 2 }}
              onClick={() => dispatch(resetEditFeeType())}
            >
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>

      {(isCreatingFeeType ||
        isFetchingFeeTypes ||
        isUpdatingFeeType ||
        isDeletingFeeType) && <LoadingScreen />}

      <ConfirmationModal
        isOpen={openModal}
        title="Confirm Action"
        message={'Are you sure you want to delete this fee?'}
        onCancel={() => {
          setOpenModal(false);
          setFeeTypeId('');
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(deleteFeeType(feeTypeId));
          setOpenModal(false);
          setFeeTypeId('');
        }}
      />

      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fee Type</TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell align="center">Updated By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {feeTypes
                ?.filter((feeType) => !feeType.isArchived)
                .map((feeType) => (
                  <TableRow key={feeType._id}>
                    <TableCell>{feeType.fee_type}</TableCell>
                    <TableCell align="center">
                      {feeType.createdBy
                        ? `${feeType.createdBy.first_name} ${feeType.createdBy.last_name}`
                        : ' - '}
                    </TableCell>
                    <TableCell align="center">
                      {feeType.updatedBy
                        ? `${feeType.updatedBy.first_name} ${feeType.updatedBy.last_name}`
                        : ' - '}
                    </TableCell>
                    <TableCell>
                      <Stack direction={'row'} spacing={1}>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() =>
                            dispatch(
                              setEditFeeType({
                                _id: feeType._id,
                                fee_type: feeType.fee_type,
                              })
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          onClick={() => {
                            setOpenModal(true);
                            setFeeTypeId(feeType._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default FeeTypes;
